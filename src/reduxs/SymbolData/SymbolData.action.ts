import { createAction } from '@reduxjs/toolkit';
import { IMarketStatisticRequest, ISymbolQuoteListParams } from 'interfaces/market';
import { generateToolkitAction } from 'utils';

/**
 * Action to init market data
 * @action Get market data and dispatch to reducer via initMarketSuccess action
 * @sideEffect Subscribe current symbol
 */
export const initMarket = generateToolkitAction('SymbolData/INIT_MARKET');

/**
 * Action to get latest market data
 */
export const getSymbolLatest = generateToolkitAction<(string | undefined)[]>('SymbolData/GET_SYMBOL_LATEST');

/**
 * Action to get latest market data but take latest instead of take every
 */
export const getSymbolLatestTakeLatest = generateToolkitAction<(string | undefined)[]>(
  'SymbolData/GET_SYMBOL_LATEST_TAKE_LATEST'
);

/**
 * Action to get quote list of current symbol
 */
export const getQuoteList = generateToolkitAction<ISymbolQuoteListParams>('SymbolData/GET_QUOTE_LIST');

/**
 * Action to set current symbol
 * @sideEffect Unsubscribe old symbol and subscribe new symbol
 * @sideEffect Change sub account (to Equity or Derivative) depend on current symbol
 */
export const setCurrentSymbol = createAction(
  'SymbolData/SET_CURRENT_SYMBOL',
  (symbol: string | string[], updateSubAccount?: boolean) => ({
    payload: {
      symbol,
    },
    meta: {
      updateSubAccount: updateSubAccount ?? true,
    },
  })
);

export const getCurrentSymbolStatistic = generateToolkitAction<IMarketStatisticRequest>(
  'SymbolData/GET_CURRENT_SYMBOL_STATISTIC'
);

/**
 * Action to get latest symbol data from current subscribed symbol when app is active
 * @action Dispatch getSymbolLatest action with current subscribed symbols
 * @sideEffect Clean up current subscribed symbols data
 */
export const getLatestOnAppActive = generateToolkitAction('SymbolData/GET_LATEST_ON_APP_ACTIVE');

/**
 * Action to get indices stock list
 *
 * Ex: List symbol in VN30, HNX30
 */
export const getIndicesStockList = generateToolkitAction('SymbolData/GET_INDICES_STOCK_LIST');

/**
 *
 */
export const refreshSubscribedSymbols = generateToolkitAction('SymbolData/REFRESH_SUBSCRIBED_SYMBOLS');
