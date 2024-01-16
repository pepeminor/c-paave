import {
  MARKET_GET_LAST_TRADING_DATE,
  MARKET_GET_LAST_TRADING_DATE_FAIL,
  MARKET_GET_LAST_TRADING_DATE_SUCCESS,
  MARKET_GET_SYMBOL_PERIOD_MAS,
  MARKET_GET_SYMBOL_QUOTE_MINUTES,
  MARKET_GET_SYMBOL_QUOTE_MINUTES_FAIL,
  ORDER_QUERY_EQUITY_BUYABLE_INFO,
  ORDER_QUERY_EQUITY_BUYABLE_INFO_FAIL,
  ORDER_QUERY_EQUITY_BUYABLE_INFO_SUCCESS,
  ORDER_QUERY_EQUITY_SELLABLE_INFO,
  MARKET_GET_SYMBOL_QUOTE_MINUTES_SUCCESS,
  MARKET_GET_AI_RATING_IN_OUT,
  MARKET_GET_AI_RATING_SCORE_FAIL,
  MARKET_GET_AI_RATING_SCORE_SUCCESS,
  MARKET_GET_AI_RATING_LIST,
  MARKET_GET_AI_RATING_SCORE,
  MARKET_PROHIBITED_STOCK,
  ORDER_QUERY_EQUITY_BUYABLE_INFO_ORDER_BOOK,
  ORDER_QUERY_EQUITY_SELLABLE_INFO_ORDER_BOOK,
} from './../actions';
import { IAction } from 'interfaces/common';
import {
  IAccountBuyable,
  IAccountSellable,
  IGetSymbolPeriodMasResponse,
  ILastTradingDate,
  ISymbolData,
  ISymbolQuoteMinutes,
  ISymbolQuoteMinutesParams,
  IAIRatingScore,
  IInOutAIRatingResponse,
} from 'interfaces/market';
import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import { ACCOUNT_TYPE } from 'global';
import { ITradeTabOption, SELL_BUY_TYPE } from '../../global/index';
import { TRADE_TAB_OPTION, MARKET_SET_SELL_BUY_TYPE } from '../actions';
import { RESET } from '../action-type-utils';

export const GLOBAL_CURRENT_SYMBOL_QUOTE = 'GLOBAL_CURRENT_SYMBOL_QUOTE';
export const GLOBAL_CURRENT_SYMBOL_QUOTE_FAILED = 'GLOBAL_CURRENT_SYMBOL_QUOTE_FAILED';
export const GLOBAL_CURRENT_SYMBOL_BID_OFFER_FAILED = 'GLOBAL_CURRENT_SYMBOL_BID_OFFER_FAILED';

export function BuyableInfo(
  state: ILoadingReducer<IAccountBuyable | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IAccountBuyable>
): ILoadingReducer<IAccountBuyable | null> {
  switch (action.type) {
    case RESET(ORDER_QUERY_EQUITY_BUYABLE_INFO):
      return { data: null, status: ReducerStatus.LOADING };
    case ORDER_QUERY_EQUITY_BUYABLE_INFO_SUCCESS:
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case ORDER_QUERY_EQUITY_BUYABLE_INFO_FAIL:
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function SellableInfo(
  state: ILoadingReducer<IAccountSellable | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IAccountSellable>
): ILoadingReducer<IAccountSellable | null> {
  switch (action.type) {
    case RESET(ORDER_QUERY_EQUITY_SELLABLE_INFO):
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(ORDER_QUERY_EQUITY_SELLABLE_INFO):
      return { data: action.payload || null, status: ReducerStatus.SUCCESS };
    case FAILURE(ORDER_QUERY_EQUITY_SELLABLE_INFO):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function BuyableInfoOrderBook(
  state: ILoadingReducer<IAccountBuyable | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IAccountBuyable>
): ILoadingReducer<IAccountBuyable | null> {
  switch (action.type) {
    case RESET(ORDER_QUERY_EQUITY_BUYABLE_INFO_ORDER_BOOK):
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(ORDER_QUERY_EQUITY_BUYABLE_INFO_ORDER_BOOK):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(ORDER_QUERY_EQUITY_BUYABLE_INFO_ORDER_BOOK):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function SellableInfoOrderBook(
  state: ILoadingReducer<IAccountSellable | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IAccountSellable>
): ILoadingReducer<IAccountSellable | null> {
  switch (action.type) {
    case RESET(ORDER_QUERY_EQUITY_SELLABLE_INFO_ORDER_BOOK):
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(ORDER_QUERY_EQUITY_SELLABLE_INFO_ORDER_BOOK):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(ORDER_QUERY_EQUITY_SELLABLE_INFO_ORDER_BOOK):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export type ISymbolDataMap = {
  [s: string]: ILoadingReducer<ISymbolData | null> | undefined;
};

export type ISymbolQuoteMinutesMap = {
  [s: string]: ILoadingReducer<ISymbolQuoteMinutesFinalResponse | null> | undefined;
};

type ISymbolQuoteMinutesFinalResponse = ISymbolQuoteMinutes & { code: string };

export function SymbolQuoteMinutes(
  state: ISymbolQuoteMinutesMap = {},
  action: IAction<ISymbolQuoteMinutesFinalResponse | ISymbolQuoteMinutesParams>
): ISymbolQuoteMinutesMap {
  switch (action.type) {
    case MARKET_GET_SYMBOL_QUOTE_MINUTES:
      return {
        ...state,
        [(action.payload as ISymbolQuoteMinutesParams).symbol]: { data: null, status: ReducerStatus.LOADING },
      };
    case MARKET_GET_SYMBOL_QUOTE_MINUTES_SUCCESS:
      return { ...state, [action.payload.code]: { data: { ...action.payload }, status: ReducerStatus.SUCCESS } };
    case MARKET_GET_SYMBOL_QUOTE_MINUTES_FAIL:
      return { ...state, [action.payload.code]: { data: null, status: ReducerStatus.FAILED } };
    default:
      return state;
  }
}

export function LastTradingDate(
  state: ILoadingReducer<ILastTradingDate | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<ILastTradingDate>
): ILoadingReducer<ILastTradingDate | null> {
  switch (action.type) {
    case MARKET_GET_LAST_TRADING_DATE:
      return { data: null, status: ReducerStatus.LOADING };
    case MARKET_GET_LAST_TRADING_DATE_SUCCESS:
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case MARKET_GET_LAST_TRADING_DATE_FAIL:
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function AIRatingData(
  state: ILoadingReducer<IAIRatingScore[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IAIRatingScore[]>
): ILoadingReducer<IAIRatingScore[] | null> {
  switch (action.type) {
    case MARKET_GET_AI_RATING_SCORE:
      return { data: null, status: ReducerStatus.LOADING };
    case MARKET_GET_AI_RATING_SCORE_SUCCESS:
      return { data: action.payload != null ? action.payload.slice(0) : null, status: ReducerStatus.SUCCESS };
    case MARKET_GET_AI_RATING_SCORE_FAIL:
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function AIRatingDataList(
  state: ILoadingReducer<IAIRatingScore[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IAIRatingScore[]>
): ILoadingReducer<IAIRatingScore[] | null> {
  switch (action.type) {
    case MARKET_GET_AI_RATING_LIST:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(MARKET_GET_AI_RATING_LIST):
      return { data: action.payload != null ? action.payload.slice(0) : null, status: ReducerStatus.SUCCESS };
    case FAILURE(MARKET_GET_AI_RATING_LIST):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function SymbolPeriodMas(
  state: ILoadingReducer<IGetSymbolPeriodMasResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IGetSymbolPeriodMasResponse[]>
): ILoadingReducer<IGetSymbolPeriodMasResponse[] | null> {
  switch (action.type) {
    case MARKET_GET_SYMBOL_PERIOD_MAS:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(MARKET_GET_SYMBOL_PERIOD_MAS):
      return { data: action.payload != null ? action.payload.slice(0) : null, status: ReducerStatus.SUCCESS };
    case FAILURE(MARKET_GET_SYMBOL_PERIOD_MAS):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function AIRatingInOut(
  state: ILoadingReducer<IInOutAIRatingResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IInOutAIRatingResponse>
): ILoadingReducer<IInOutAIRatingResponse | null> {
  switch (action.type) {
    case MARKET_GET_AI_RATING_IN_OUT:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(MARKET_GET_AI_RATING_IN_OUT):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(MARKET_GET_AI_RATING_IN_OUT):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

type IProhibitedStock = {
  [type in ACCOUNT_TYPE]?: string[];
};

export function ProhibitedStock(
  state: IProhibitedStock = {
    [ACCOUNT_TYPE.VIRTUAL]: [],
  },
  action: IAction<string[]>
): IProhibitedStock {
  switch (action.type) {
    case SUCCESS(MARKET_PROHIBITED_STOCK):
      return { ...state, [ACCOUNT_TYPE.VIRTUAL]: action.payload };
    default:
      return state;
  }
}

export function TradeTabOption(state = ITradeTabOption.PORTFOLIO, action: IAction<ITradeTabOption>): ITradeTabOption {
  switch (action.type) {
    case SUCCESS(TRADE_TAB_OPTION):
      return action.payload;
    default:
      return state;
  }
}

export function SellBuyType(state = SELL_BUY_TYPE.BUY, action: IAction<SELL_BUY_TYPE>): SELL_BUY_TYPE {
  switch (action.type) {
    case SUCCESS(MARKET_SET_SELL_BUY_TYPE):
      return action.payload;
    default:
      return state;
  }
}
