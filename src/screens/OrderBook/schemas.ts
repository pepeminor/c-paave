import ErrorMessage from 'constants/message';
import { ACCOUNT_TYPE, OrderBookScreenInitOption, SELL_BUY_TYPE, SYSTEM_TYPE } from 'global';
import { IAccount } from 'interfaces/common';
import { IOrderBook, IOrderHistoryResponse, IOrderStopHistoryResponse } from 'interfaces/equity';
import { IAccountBuyable, IAccountSellable } from 'interfaces/market';
import { ILoadingReducer } from 'interfaces/reducer';
import {
  IEqtEnquiryPortfolioResponse,
  IEqtOrderHistoryMappingResponse,
  IKisGetEqtGenBuyAllResponses,
} from 'interfaces/services';
import { MergeMarketSymbol } from 'reduxs/SymbolData';
import { isBeforeOrEqualDate, getContext, mergeYupSchema, priceStep } from 'utils';
import { lazy, number, object, string, TestContext } from 'yup';
import { AnyObject } from 'yup/lib/types';

type OrderBookFormikContext = {
  price: number;
  currentSymbol: MergeMarketSymbol;
  symbol: IOrderHistoryResponse | IOrderStopHistoryResponse;
  fromDate: Date;
  sellBuyType: SELL_BUY_TYPE;
  currentMarketPrice: MergeMarketSymbol;
  optionSelecting: OrderBookScreenInitOption;
  buyableInfo: ILoadingReducer<IAccountBuyable>;
  sellableInfo: ILoadingReducer<IAccountSellable>;
  getAvlQty: () => number;
  selectedAccount: IAccount;
  kisEqtGenBuyAll: ILoadingReducer<IKisGetEqtGenBuyAllResponses | null>;
  kisEquityEnquiryPortfolio: IOrderBook<IEqtEnquiryPortfolioResponse[]>;
};

const verifyPriceStep = (value: number | undefined, context: TestContext<AnyObject>) => {
  const currentSymbol: MergeMarketSymbol = context.options.context?.currentSymbol;
  if (!value) return false;
  if (currentSymbol?.symbolType === 'FUTURES') {
    if (!Number.isInteger(value * 10) || value <= 0) {
      return false;
    } else {
      return true;
    }
  }
  if (currentSymbol != null && currentSymbol.market != null && value % priceStep(value, currentSymbol.market) !== 0)
    return false;
  return true;
};

const isNumber = (value: unknown): value is number => {
  return !isNaN(Number(value));
};

const priceSchema = object({
  price: lazy((value: unknown) =>
    isNumber(value)
      ? // Numeric price
        number()
          .required(ErrorMessage.ORDER_PRICE_RANGE_INVALID)
          .test('', ErrorMessage.WRONG_PRICE_STEP, verifyPriceStep)
          .test('', ErrorMessage.ORDER_PRICE_RANGE_INVALID, (value, context) => {
            const { currentSymbol } = getContext<OrderBookFormikContext>(context);
            if (!value) return false;
            if (currentSymbol.floorPrice == null || currentSymbol.ceilingPrice == null) return false;
            if (value < currentSymbol.floorPrice || value > currentSymbol.ceilingPrice) return false;
            return true;
          })
      : // Special price
        string().required(ErrorMessage.ORDER_PRICE_RANGE_INVALID)
  ),
});

const stopPriceSchema = object({
  stopPrice: number()
    .required(ErrorMessage.STOP_PRICE_RANGE_INVALID)
    .test('', ErrorMessage.WRONG_PRICE_STEP, verifyPriceStep)
    .test('', ErrorMessage.STOP_PRICE_RANGE_INVALID, (value, context) => {
      const { currentSymbol, fromDate } = getContext<OrderBookFormikContext>(context);
      if (!value) return false;
      if (currentSymbol == null) return false;
      if (currentSymbol.floorPrice == null || currentSymbol.ceilingPrice == null) return false;
      if (
        isBeforeOrEqualDate(fromDate, new Date()) &&
        (value < currentSymbol.floorPrice || value > currentSymbol.ceilingPrice)
      ) {
        return false;
      }
      return true;
    })
    .when('$sellBuyType', {
      is: (value: SELL_BUY_TYPE) => value === SELL_BUY_TYPE.BUY,
      then: schema =>
        schema.test('', ErrorMessage.BUY_STOP_PRICE_INVALID, (value, context) => {
          const { fromDate, currentMarketPrice } = getContext<OrderBookFormikContext>(context);
          if (!value) return false;
          if (isBeforeOrEqualDate(fromDate, new Date())) {
            if (
              currentMarketPrice == null ||
              currentMarketPrice.currentPrice == null ||
              value <= currentMarketPrice.currentPrice
            )
              return false;
          }
          return true;
        }),
      otherwise: schema =>
        schema.test('', ErrorMessage.SELL_STOP_PRICE_INVALID, (value, context) => {
          const { fromDate, currentMarketPrice } = getContext<OrderBookFormikContext>(context);
          if (!value) return false;
          if (isBeforeOrEqualDate(fromDate, new Date())) {
            if (
              currentMarketPrice == null ||
              currentMarketPrice.currentPrice == null ||
              value >= currentMarketPrice.currentPrice
            )
              return false;
          }
          return true;
        }),
    }),
});

const limitPriceSchema = object({
  limitPrice: lazy((value: unknown) =>
    isNumber(value)
      ? // Numeric price
        number()
          .test('', ErrorMessage.WRONG_PRICE_STEP, verifyPriceStep)
          .test('', ErrorMessage.ORDER_PRICE_RANGE_INVALID, (value, context) => {
            const { currentSymbol, fromDate } = getContext<OrderBookFormikContext>(context);
            if (fromDate > new Date()) return true;
            if (!value) return false;
            if (currentSymbol == null) return false;
            if (currentSymbol.floorPrice == null || currentSymbol.ceilingPrice == null) return false;
            if (value < currentSymbol.floorPrice || value > currentSymbol.ceilingPrice) return false;
            return true;
          })
      : // Special price
        string().required(ErrorMessage.ORDER_PRICE_RANGE_INVALID)
  ),
});

const quantitySchema = object({
  quantity: number()
    .required(ErrorMessage.ORDER_QUANTITY_BATCH_INVALID)
    .test('', ErrorMessage.ORDER_QUANTITY_LOTS_INVALID, value => {
      if (!value) return false;
      if (value > 500000) {
        return false;
      }
      return true;
    })
    .test('', ErrorMessage.ORDER_QUANTITY_BATCH_INVALID, (value, context) => {
      const { currentSymbol, selectedAccount, optionSelecting, price } = getContext<OrderBookFormikContext>(context);
      if (!value) return false;
      if (currentSymbol == null) return false;
      if (
        selectedAccount.selectedSubAccount != null &&
        selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES &&
        typeof price === 'string' &&
        value % 1 === 0
      ) {
        return true;
      } else if (
        !(
          selectedAccount.type !== ACCOUNT_TYPE.VIRTUAL &&
          optionSelecting === OrderBookScreenInitOption.ORDER_BOOK &&
          typeof price === 'number'
        ) &&
        value % 100 !== 0
      ) {
        return false;
      }
      return true;
    })
    .when('price', {
      is: (value: unknown) => value != null,
      // Normal order quantity
      then: schema =>
        schema.test('', ErrorMessage.OVER_AVAILABLE, (value, context) => {
          const { optionSelecting, getAvlQty } = getContext<OrderBookFormikContext>(context);
          if (!value) return false;
          if (optionSelecting !== OrderBookScreenInitOption.ORDER_BOOK) return true;
          return value <= getAvlQty();
        }),
      // Stop order quantity
      otherwise: schema => schema,
    }),
});

const getSchema = (
  orderType: OrderBookScreenInitOption,
  accountType: ACCOUNT_TYPE,
  symbol: IEqtOrderHistoryMappingResponse | IOrderStopHistoryResponse
) => {
  switch (orderType) {
    case OrderBookScreenInitOption.CONDITION_ORDER: {
      const baseSchema = mergeYupSchema(stopPriceSchema, quantitySchema);
      switch (accountType) {
        case ACCOUNT_TYPE.KIS:
          return symbol.orderPrice ? mergeYupSchema(baseSchema, limitPriceSchema) : baseSchema;
        default:
          return baseSchema;
      }
    }
    default:
      return mergeYupSchema(priceSchema, quantitySchema);
  }
};

export default getSchema;
