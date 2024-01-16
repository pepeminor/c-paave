import APIList from 'config/api';
import { ACCOUNT_TYPE } from 'global';
import { IAction } from 'interfaces/common';
import { IModifyWatchlistParams } from 'interfaces/favorite';
import { call, select } from 'redux-saga/effects';
import { IState } from 'reduxs/global-reducers';
import { query, queryKis } from 'utils';
import { IAccount } from '../../../interfaces/common';
import { IKisEditFavoriteParams } from '../../../interfaces/favorite';

export function* onModify(action: IAction<IModifyWatchlistParams>) {
  try {
    const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
    switch (selectedAccount.type) {
      case ACCOUNT_TYPE.VIRTUAL:
        yield call(query, APIList.modifyWatchlist, action.payload);
        break;
      case ACCOUNT_TYPE.KIS: {
        const paramsKis: IKisEditFavoriteParams = {
          items: [{ id: action.payload.watchListId, name: action.payload.watchListName }],
        };
        yield call(queryKis, APIList.putKisFavorite, paramsKis);
        break;
      }
      default:
        break;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.error('fail to modify watch list name', e);
  }
}
