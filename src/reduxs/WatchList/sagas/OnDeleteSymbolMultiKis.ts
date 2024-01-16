import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import { call, put, select } from 'redux-saga/effects';
import { IState } from 'reduxs/global-reducers';
import {
  IKisWatchListResponse,
  IKisAddSymbolsFavoriteParams,
  IGetAllWatchlistResponse,
} from '../../../interfaces/favorite';
import { ReducerStatus, ILoadingReducer } from '../../../interfaces/reducer';
import { queryKis } from 'utils';
import { IKisWatchListDetail, IDeleteSymbolParams } from '../../../interfaces/favorite';
import { ISelectedWatchlistSymbolList } from '../../../interfaces/reducers/IWatchListModule';
import { IWatchListModule, WatchListActions } from 'reduxs/WatchList';

export function* onDeleteSymbolMultiKis(action: IAction<IDeleteSymbolParams>) {
  try {
    const watchList: IWatchListModule = yield select((state: IState) => state.WatchListReducer);
    const updatePayload: {
      watchListList?: ILoadingReducer<IGetAllWatchlistResponse[]>;
      watchlistIncludeItem?: ILoadingReducer<number[]>;
      selectedWatchlistSymbolList?: ISelectedWatchlistSymbolList;
    } = {};
    interface IRemoveSymbol {
      watchListId: number[];
      code: string[];
      success: boolean;
    }
    const deleteResponse: IResponse<IRemoveSymbol> = {
      data: { success: false, watchListId: action.payload.watchListIds, code: [action.payload.code] },
    };
    // call to get current symbols in watchList
    const kisWatchListSymbolsResponse: IResponse<IKisWatchListResponse[]> = yield call(
      queryKis,
      APIList.getKisFavorite
    );
    if (kisWatchListSymbolsResponse.data == null) return;
    const arrayParams: IKisWatchListDetail[] = [];
    // create params with list watchList
    deleteResponse.data.watchListId.forEach(id => arrayParams.push({ id: id, itemList: [] }));
    // params delete symbols need old symbols
    arrayParams.forEach(item =>
      kisWatchListSymbolsResponse.data.map(
        watchList => watchList.id === item.id && watchList.itemList.map(itemInList => item.itemList.push(itemInList))
      )
    );
    // params delete symbols need to remove
    deleteResponse.data.code.forEach(code =>
      arrayParams.map(item => (item.itemList = item.itemList.filter(item => item.data != code)))
    );
    const paramsKis: IKisAddSymbolsFavoriteParams = {
      items: arrayParams,
    };
    const deleteResponseKis: IResponse<IKisWatchListResponse[]> = yield call(
      queryKis,
      APIList.putKisFavorite,
      paramsKis
    );
    deleteResponseKis != null && (deleteResponse.data.success = true);

    if (
      watchList.selectedWatchList != null &&
      watchList.selectedWatchList.watchListId != null &&
      deleteResponse.data.watchListId.includes(watchList.selectedWatchList.watchListId)
    ) {
      updatePayload.selectedWatchlistSymbolList = {
        ...watchList.selectedWatchlistSymbolList,
        status: ReducerStatus.SUCCESS,
        data: watchList.selectedWatchlistSymbolList.data.filter(item => item.code !== action.payload.code),
      };
    }

    if (
      watchList.watchListList.status === ReducerStatus.SUCCESS &&
      watchList.watchListList.data != null &&
      watchList.selectedWatchList != null
    ) {
      const watchListList = watchList.watchListList.data;
      watchListList != null &&
        deleteResponse.data.watchListId.forEach(el => {
          const updateWatchlistIndex = watchListList.findIndex(item => el === item.watchListId);
          if (updateWatchlistIndex > -1) {
            watchListList[updateWatchlistIndex].numberOfStocks -= 1;
          }
        });
      yield put(
        WatchListActions.updateWatchList({
          watchListList: {
            data: watchListList,
            status: ReducerStatus.SUCCESS,
          },
          watchlistIncludeItem: {
            data: [...watchList.watchlistIncludeItem.data, ...deleteResponse.data.watchListId],
            status: ReducerStatus.SUCCESS,
          },
          selectedWatchList: watchListList.filter(
            item => item.watchListId === watchList.selectedWatchList?.watchListId
          )[0],
        })
      );
    }
    if (Object.entries(updatePayload).length > 0) {
      yield put(WatchListActions.updateWatchList(updatePayload));
    }
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('fail to delete symbol to watch list', e);
    }
    if (action.callBack != null && action.callBack.handleFail != null) yield action.callBack.handleFail();
  }
}
