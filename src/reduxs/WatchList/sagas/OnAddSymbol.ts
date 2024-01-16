import APIList from 'config/api';
import { IResponse } from 'interfaces/common';
import { call, put, select } from 'redux-saga/effects';
import { IState } from 'reduxs/global-reducers';
import { query, queryKis } from 'utils';
import {
  IAddSymbolParams,
  IAddSymbolResponse,
  IKisWatchListResponse,
  IKisAddSymbolsFavoriteParams,
} from '../../../interfaces/favorite';
import { queryWatchListDetail } from './OnInitWatchList';
import { ReducerStatus } from '../../../interfaces/reducer';
import { ACCOUNT_TYPE } from '../../../global/index';
import { IKisWatchListDetail } from '../../../interfaces/favorite';
import { PayloadAction } from '@reduxjs/toolkit';
import { WatchListActions } from '../WatchList.redux';
import { IWatchListModule } from '../WatchList.type';

interface IAddSymbol {
  watchListId: number[];
  code: string[];
  success: boolean;
}

export function* onAddSymbol(action: PayloadAction<IAddSymbolParams>) {
  try {
    const watchList: IWatchListModule = yield select((state: IState) => state.WatchListReducer);

    const addResponse: IResponse<IAddSymbol> = {
      data: { success: false, watchListId: action.payload.watchListId, code: action.payload.code },
    };
    const accountType: ACCOUNT_TYPE = yield select((state: IState) => state.selectedAccount.type);
    switch (accountType) {
      case ACCOUNT_TYPE.VIRTUAL: {
        const addResponseVirtual: IResponse<IAddSymbolResponse> = yield call(
          query,
          APIList.addFavoriteSymbol,
          action.payload
        );

        if (addResponseVirtual == null) return;
        addResponse.data.success = true;

        // handle numberOfStock in PAAVE watchList
        if (watchList.watchListList.data != null) {
          const watchListList = watchList.watchListList.data;
          addResponse.data.watchListId.forEach((el, index) => {
            const updateWatchlistIndex = watchListList.findIndex(item => el === item.watchListId);
            if (updateWatchlistIndex > -1 && watchListList[updateWatchlistIndex].numberOfStocks < 500) {
              watchListList[updateWatchlistIndex].numberOfStocks += 1;
            }

            if (index === addResponse.data.watchListId.length - 1) {
              watchList.selectedWatchList = {
                watchListName: watchListList[updateWatchlistIndex].watchListName,
                watchListId: watchListList[updateWatchlistIndex].watchListId,
                numberOfStocks: watchListList[updateWatchlistIndex].numberOfStocks,
              };
            }
          });
        }
        break;
      }
      case ACCOUNT_TYPE.KIS: {
        // call to get current symbols in watchList
        const kisWatchListSymbolsResponse: IResponse<IKisWatchListResponse[]> = yield call(
          queryKis,
          APIList.getKisFavorite
        );
        if (kisWatchListSymbolsResponse.data == null) return;
        const arrayParams: IKisWatchListDetail[] = [];
        // create params with list watchList
        addResponse.data.watchListId.forEach(id => arrayParams.push({ id: id, itemList: [] }));
        // params add symbols need old symbols
        arrayParams.forEach(item =>
          kisWatchListSymbolsResponse.data.map(
            watchList =>
              watchList.id === item.id && watchList.itemList.map(itemInList => item.itemList.push(itemInList))
          )
        );
        // params add symbols need new symbols
        addResponse.data.code.forEach(code =>
          arrayParams.map(
            item => item.itemList.every(item => item.data !== code) && item.itemList.push({ data: code, isNote: false })
          )
        );
        const paramsKis: IKisAddSymbolsFavoriteParams = {
          items: arrayParams,
        };
        const addResponseKis: IResponse<unknown> = yield call(queryKis, APIList.putKisFavorite, paramsKis);

        if (addResponseKis == null) return;
        addResponse.data.success = true;

        // handle numberOfStock in KIS watchList
        if (watchList.watchListList.data != null && addResponseKis != null) {
          const watchListList = watchList.watchListList.data;
          addResponse.data.watchListId.forEach((el, index) => {
            const updateWatchlistIndex = watchListList.findIndex(item => el === item.watchListId);
            const updateWatchlistIndexResponse = arrayParams.findIndex(item => el === item.id);
            if (updateWatchlistIndex > -1 && watchListList[updateWatchlistIndex].numberOfStocks < 500) {
              watchListList[updateWatchlistIndex].numberOfStocks =
                arrayParams[updateWatchlistIndexResponse].itemList.length;
            }

            if (index === addResponse.data.watchListId.length - 1) {
              watchList.selectedWatchList = {
                watchListName: watchListList[updateWatchlistIndex].watchListName,
                watchListId: watchListList[updateWatchlistIndex].watchListId,
                numberOfStocks: watchListList[updateWatchlistIndex].numberOfStocks,
              };
            }
          });
        }
        break;
      }
      case ACCOUNT_TYPE.DEMO: {
        yield put(WatchListActions.onAddSymbolNonLogin(action.payload.code[0]));
        addResponse.data.success = true;
        // handle numberOfStock in DEMO/PAAVE watchList
        if (watchList.watchListList.data != null) {
          const watchListList = watchList.watchListList.data;
          addResponse.data.watchListId.forEach((el, index) => {
            const updateWatchlistIndex = watchListList.findIndex(item => el === item.watchListId);
            if (updateWatchlistIndex > -1 && watchListList[updateWatchlistIndex].numberOfStocks < 500) {
              watchListList[updateWatchlistIndex].numberOfStocks += 1;
            }

            if (index === addResponse.data.watchListId.length - 1) {
              watchList.selectedWatchList = {
                watchListName: watchListList[updateWatchlistIndex].watchListName,
                watchListId: watchListList[updateWatchlistIndex].watchListId,
                numberOfStocks: watchListList[updateWatchlistIndex].numberOfStocks,
              };
            }
          });
        }
        break;
      }
      default:
        break;
    }

    if (addResponse.data.success === false) return;

    if (watchList.selectedWatchList != null && watchList.selectedWatchList.watchListId != null && addResponse != null) {
      yield addResponse.data.watchListId.includes(watchList.selectedWatchList.watchListId)
        ? queryWatchListDetail({
            params: { watchListId: watchList.selectedWatchList.watchListId },
            isLoading: false,
            handleSuccess: action.payload.callback?.handleSuccess,
          })
        : action.payload.callback?.handleSuccess?.();
    }

    if (watchList.watchListList.status === ReducerStatus.SUCCESS && watchList.watchListList.data != null) {
      const watchListList = watchList.watchListList.data;

      yield put(
        WatchListActions.updateWatchList({
          watchListList: {
            data: watchListList,
            status: ReducerStatus.SUCCESS,
          },
          selectedWatchList: watchList.selectedWatchList,
        })
      );

      if (accountType === ACCOUNT_TYPE.VIRTUAL) {
        yield put(
          WatchListActions.updateWatchList({
            watchlistIncludeItem: {
              data: [...watchList.watchlistIncludeItem.data, ...addResponse.data.watchListId],
              status: ReducerStatus.SUCCESS,
            },
          })
        );
      }
    }
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('fail to add symbol to watch list', e);
    }
    action.payload.callback?.handleFail?.();
  }
}
