import APIList from 'config/api';
import { ACCOUNT_TYPE } from 'global';
import { IAction } from 'interfaces/common';
import { IGetSymbolIncludeWatchlistParams } from 'interfaces/favorite';
import { ReducerStatus } from 'interfaces/reducer';
import { call, put, select } from 'redux-saga/effects';
import { WatchListActions } from '../WatchList.redux';
import { IState } from 'reduxs/global-reducers';
import { query } from 'utils';
import { IAccount } from '../../../interfaces/common';
import { IWatchListModule } from '../WatchList.type';

function* getSymbolIncludeWatchlist(action: IAction<IGetSymbolIncludeWatchlistParams>, accountType: ACCOUNT_TYPE) {
  switch (accountType) {
    case ACCOUNT_TYPE.VIRTUAL: {
      const response: { data: number[] } = yield call(query, APIList.getSymbolIncludeWatchlist, action.payload);
      return response.data ?? [];
    }
    case ACCOUNT_TYPE.DEMO: {
      const watchlist: IWatchListModule = yield select((state: IState) => state.WatchListReducer);

      const result = watchlist.watchListNonLogin.stocks.includes(action.payload.code);
      if (result) {
        return [0];
      }
      throw new Error('Symbol not found in watchlist');
    }
    default:
      return [];
  }
}

export function* onGetSymbolIncludeWatchlist(action: IAction<IGetSymbolIncludeWatchlistParams>) {
  if (action.payload != null) {
    const watchlist: IWatchListModule = yield select((state: IState) => state.WatchListReducer);
    const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
    if (selectedAccount.type !== ACCOUNT_TYPE.VIRTUAL && selectedAccount.type !== ACCOUNT_TYPE.DEMO) {
      yield put(
        WatchListActions.updateWatchList({
          ...watchlist,
          watchlistIncludeItem: { status: ReducerStatus.FAILED, data: [] },
        })
      );
      return;
    }
    try {
      const response: number[] = yield getSymbolIncludeWatchlist(action, selectedAccount.type);
      yield put(
        WatchListActions.updateWatchList({
          ...watchlist,
          watchlistIncludeItem: { status: ReducerStatus.SUCCESS, data: response },
        })
      );

      action.callBack?.handleSuccess?.();
    } catch (e) {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.error('fail to get all symbol include watch list', e);
      }
      yield put(
        WatchListActions.updateWatchList({
          ...watchlist,
          watchlistIncludeItem: { status: ReducerStatus.FAILED, data: [] },
        })
      );
      action.callBack?.handleFail?.();
    }
  }
}
