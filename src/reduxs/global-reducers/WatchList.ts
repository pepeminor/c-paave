import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import { NON_LOGIN_WATCH_LIST, NON_LOGIN_WATCH_LIST_ADD_SYMBOL, NON_LOGIN_WATCH_LIST_REMOVE_SYMBOL } from '../actions';
import { IAction } from '../../interfaces/common';

import { ISymbolData } from '../../interfaces/market';
import { SUCCESS, FAILURE } from '../action-type-utils';
import { DISCOVER_WATCHLIST_SYMBOLS_LATEST_VISIBLE_LIST } from '../actions';
import { IAddSymbolParams, IDeleteSymbolParams } from 'interfaces/favorite';

export function GetSymbolLatestVisibleList(
  state: ILoadingReducer<ISymbolData[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<ISymbolData[]>
): ILoadingReducer<ISymbolData[] | null> {
  switch (action.type) {
    case DISCOVER_WATCHLIST_SYMBOLS_LATEST_VISIBLE_LIST:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(DISCOVER_WATCHLIST_SYMBOLS_LATEST_VISIBLE_LIST):
      return { data: action.payload != null ? action.payload.slice(0) : null, status: ReducerStatus.SUCCESS };
    case FAILURE(DISCOVER_WATCHLIST_SYMBOLS_LATEST_VISIBLE_LIST):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export type NonLoginWatchList = {
  index: number;
  name: string;
  stocks: string[];
};

export function NonLoginWatchList(
  state: NonLoginWatchList[] = [
    {
      index: 0,
      name: 'My Watchlist',
      stocks: [],
    },
  ],
  action: IAction<unknown>
): NonLoginWatchList[] {
  switch (action.type) {
    case NON_LOGIN_WATCH_LIST: {
      if (typeof action.payload === 'string') {
        return state.filter(item => item.name !== action.payload);
      }
      const updateInfo = action.payload as NonLoginWatchList;
      const isNewWatchList = state.findIndex(item => item.index === updateInfo.index) === -1;
      if (isNewWatchList) {
        return [...state, updateInfo];
      }
      return state.map(item => (item.index === updateInfo.index ? { ...item, ...updateInfo } : item));
    }
    case NON_LOGIN_WATCH_LIST_ADD_SYMBOL: {
      const { code, watchListId } = action.payload as IAddSymbolParams;
      return state.map(item => {
        if (watchListId.includes(item.index)) {
          item.stocks = [...new Set([...code, ...item.stocks])];
        }
        return item;
      });
    }
    case NON_LOGIN_WATCH_LIST_REMOVE_SYMBOL: {
      const { code, watchListIds } = action.payload as IDeleteSymbolParams;
      return state.map(item => {
        if (watchListIds.includes(item.index)) {
          item.stocks = item.stocks.filter(stock => !code.includes(stock));
        }
        return item;
      });
    }
    default:
      return state;
  }
}
