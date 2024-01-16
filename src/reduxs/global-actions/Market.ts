import { IAction } from 'interfaces/common';
import {
  IIndexStockRankingUpDownParams,
  IGetSymbolPeriodParams,
  ISymbolQuoteMinutesParams,
  IAccountBuyableParams,
  IAccountSellableParams,
  IGetAIRatingScoreParams,
  IGetSymbolPeriodMasParams,
  IMarketStatisticRequest,
} from 'interfaces/market';
import {
  MARKET_GET_AI_RATING_SCORE,
  MARKET_GET_SYMBOL_QUOTE_MINUTES,
  MARKET_INDEX_STOCKS_RANKING_UP_DOWN,
  MARKET_GET_SYMBOL_PERIOD,
  MARKET_GET_SYMBOL_QUOTE_MINUTES_SUCCESS,
  MARKET_GET_SYMBOL_QUOTE_MINUTES_FAIL,
  MARKET_GET_LAST_TRADING_DATE,
  MARKET_GET_LAST_TRADING_DATE_SUCCESS,
  MARKET_GET_LAST_TRADING_DATE_FAIL,
  MARKET_GET_AI_RATING_SCORE_SUCCESS,
  MARKET_GET_AI_RATING_SCORE_FAIL,
  ORDER_QUERY_EQUITY_BUYABLE_INFO,
  ORDER_QUERY_EQUITY_BUYABLE_INFO_SUCCESS,
  ORDER_QUERY_EQUITY_BUYABLE_INFO_FAIL,
  ORDER_QUERY_EQUITY_SELLABLE_INFO,
  MARKET_GET_SYMBOL_PERIOD_MAS,
  MARKET_PROHIBITED_STOCK,
  ORDER_QUERY_EQUITY_BUYABLE_INFO_ORDER_BOOK,
  ORDER_QUERY_EQUITY_SELLABLE_INFO_ORDER_BOOK,
  MARKET_GET_STATISTIC,
} from 'reduxs/actions';
import { INotifyMessage } from 'interfaces/common';
import { generateAction } from 'utils';
import { SUCCESS } from '../action-type-utils';
import { ITradeTabOption, SELL_BUY_TYPE } from '../../global/index';
import { TRADE_TAB_OPTION, MARKET_SET_SELL_BUY_TYPE } from '../actions';

export const queryAIRatingScore = (
  params: IGetAIRatingScoreParams,
  showMessage?: INotifyMessage
): IAction<IGetAIRatingScoreParams> => {
  return {
    type: MARKET_GET_AI_RATING_SCORE,
    response: {
      success: MARKET_GET_AI_RATING_SCORE_SUCCESS,
      fail: MARKET_GET_AI_RATING_SCORE_FAIL,
    },
    payload: params,
    showMessage,
  };
};

export const queryEquityBuyable = (
  params: IAccountBuyableParams,
  showMessage?: INotifyMessage
): IAction<IAccountBuyableParams> => {
  return {
    type: ORDER_QUERY_EQUITY_BUYABLE_INFO,
    response: {
      success: ORDER_QUERY_EQUITY_BUYABLE_INFO_SUCCESS,
      fail: ORDER_QUERY_EQUITY_BUYABLE_INFO_FAIL,
    },
    payload: params,
    showMessage,
  };
};

export const queryEquityBuyableOrderBook = generateAction<IAccountSellableParams>(
  ORDER_QUERY_EQUITY_BUYABLE_INFO_ORDER_BOOK
);

export const queryEquitySellableOrderBook = generateAction<IAccountSellableParams>(
  ORDER_QUERY_EQUITY_SELLABLE_INFO_ORDER_BOOK
);

export const queryEquitySellable = generateAction<IAccountSellableParams>(ORDER_QUERY_EQUITY_SELLABLE_INFO);

export const getSymbolQuoteMinutes = (params: ISymbolQuoteMinutesParams): IAction<ISymbolQuoteMinutesParams> => {
  return {
    type: MARKET_GET_SYMBOL_QUOTE_MINUTES,
    payload: params,
    response: {
      success: MARKET_GET_SYMBOL_QUOTE_MINUTES_SUCCESS,
      fail: MARKET_GET_SYMBOL_QUOTE_MINUTES_FAIL,
    },
  };
};

export const getIndexStockRankingUpDown = (
  params: IIndexStockRankingUpDownParams
): IAction<IIndexStockRankingUpDownParams> => {
  return {
    type: MARKET_INDEX_STOCKS_RANKING_UP_DOWN,
    payload: params,
  };
};

export const getSymbolPeriod = (params: IGetSymbolPeriodParams): IAction<IGetSymbolPeriodParams> => {
  return {
    type: MARKET_GET_SYMBOL_PERIOD,
    payload: params,
  };
};

export const getLastTradingDate = (): IAction<null> => {
  return {
    type: MARKET_GET_LAST_TRADING_DATE,
    payload: null,
    response: {
      success: MARKET_GET_LAST_TRADING_DATE_SUCCESS,
      fail: MARKET_GET_LAST_TRADING_DATE_FAIL,
    },
  };
};

export const getSymbolPeriodMas = generateAction<IGetSymbolPeriodMasParams>(MARKET_GET_SYMBOL_PERIOD_MAS);

export const getProhibitedStock = generateAction<null>(MARKET_PROHIBITED_STOCK);

export const setTradeTabOption = generateAction<ITradeTabOption>(SUCCESS(TRADE_TAB_OPTION));

export const setSellBuyType = generateAction<SELL_BUY_TYPE>(SUCCESS(MARKET_SET_SELL_BUY_TYPE));

export const getMarketStatistic = generateAction<IMarketStatisticRequest>(MARKET_GET_STATISTIC);
