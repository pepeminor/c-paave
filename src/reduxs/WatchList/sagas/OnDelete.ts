import APIList from 'config/api';
import { IAction } from 'interfaces/common';
import { IDeleteWatchlistParams, IGetAllWatchlistResponse } from 'interfaces/favorite';
import { IWatchListModule } from 'interfaces/reducers/IWatchListModule';
import { call, select } from 'redux-saga/effects';
import { IState } from 'reduxs/global-reducers';
import { query, queryKis } from 'utils';
import { queryWatchListDetail } from './OnInitWatchList';
import { IAccount } from '../../../interfaces/common';
import { ACCOUNT_TYPE } from '../../../global/index';
import { IKisDeleteWatchListParams } from '../../../interfaces/favorite';

export function* onDelete(action: IAction<IGetAllWatchlistResponse>) {
  try {
    const watchList: IWatchListModule = yield select((state: IState) => state.WatchListReducer);
    const params: IDeleteWatchlistParams = {
      watchListId: action.payload.watchListId,
    };

    const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
    switch (selectedAccount.type) {
      case ACCOUNT_TYPE.VIRTUAL:
        yield call(query, APIList.deleteWatchlist, params);
        break;
      case ACCOUNT_TYPE.KIS: {
        const paramsKis: IKisDeleteWatchListParams = {
          items: [action.payload.watchListId],
        };
        yield call(queryKis, APIList.deleteKisFavorite, paramsKis);
        break;
      }
      case ACCOUNT_TYPE.DEMO:
        break;
      default:
        break;
    }

    if (watchList.selectedWatchList?.watchListId === action.payload.watchListId) {
      const newList =
        watchList.watchListList?.data?.[0].watchListId === action.payload.watchListId // if delete first item, select second item
          ? watchList.watchListList?.data?.[1] // if delete first item, select second item
          : watchList.watchListList?.data?.[0];
      if (newList) {
        yield queryWatchListDetail({ params: { watchListId: newList?.watchListId } });
      }
    }
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('failt to delete watch list', e);
    }
    return;
  }
}
