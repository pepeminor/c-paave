import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import { ICreateWatchlistParams, ICreateWatchlistResponse } from 'interfaces/favorite';
import { ReducerStatus } from 'interfaces/reducer';
import { IWatchListModule } from 'interfaces/reducers/IWatchListModule';
import { ICreateNewWatchListAction } from 'interfaces/sagas/ICreateNewWatchListAction';
import { call, put, select } from 'redux-saga/effects';
import { IState } from 'reduxs/global-reducers';
import { query, queryKis } from 'utils';
import { IGetAllWatchlistResponse, IKisWatchListResponse } from '../../../interfaces/favorite';
import { IAccount } from '../../../interfaces/common';
import { ACCOUNT_TYPE } from '../../../global/index';
import { WatchListActions } from 'reduxs/WatchList';

export function* onCreateNew(action: IAction<ICreateNewWatchListAction>) {
  try {
    const name = action.payload.name.trim();
    const watchList: IWatchListModule = yield select((state: IState) => state.WatchListReducer);
    const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
    if (watchList.watchListList.data?.find(item => item.watchListName === name) != null) {
      throw new Error('WATCH_LIST_EXIST');
    }

    const params: ICreateWatchlistParams = {
      watchListName: name,
    };

    interface ICreateWatchlist {
      watchListId: number;
    }

    const createResponse: IResponse<ICreateWatchlist> = { data: { watchListId: 0 } };
    try {
      switch (selectedAccount.type) {
        case ACCOUNT_TYPE.KIS: {
          const paramKis = {
            name: params.watchListName,
          };
          const kisWatchListSymbolsResponse: IResponse<IKisWatchListResponse> = yield call(
            queryKis,
            APIList.postKisFavorite,
            paramKis
          );
          createResponse.data.watchListId = kisWatchListSymbolsResponse.data.id;
          break;
        }
        case ACCOUNT_TYPE.VIRTUAL: {
          const createWatchlistResponse: IResponse<ICreateWatchlistResponse> = yield call(
            query,
            APIList.createWatchlist,
            params
          );
          createResponse.data.watchListId = createWatchlistResponse.data.watchListId;
          break;
        }
        case ACCOUNT_TYPE.DEMO: {
          break;
        }
        default:
          break;
      }
    } catch (e) {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.error('fail to create watch list', e);
      }
      return;
    }
    if (createResponse.data.watchListId === 0) return;
    const newWatchList: IGetAllWatchlistResponse = {
      watchListId: createResponse.data.watchListId,
      watchListName: name,
      numberOfStocks: 0,
    };
    yield put(
      WatchListActions.updateWatchList({
        watchListList: {
          data: watchList.watchListList.data != null ? [...watchList.watchListList.data, newWatchList] : [newWatchList],
          status: ReducerStatus.SUCCESS,
        },
        selectedWatchList: newWatchList,
      })
    );
  } catch (err) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('fail to create watch list', err);
    }
  }
}
