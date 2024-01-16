import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import { IDeleteSymbolParams, IDeleteSymbolResponse, IGetAllWatchlistResponse } from 'interfaces/favorite';
import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import { ISelectedWatchlistSymbolList } from 'interfaces/reducers/IWatchListModule';
import { put, select } from 'redux-saga/effects';
import { IState } from 'reduxs/global-reducers';
import { IWatchListModule, WatchListActions } from 'reduxs/WatchList';
import { createNormalApiQuerySaga } from 'utils';

export function* handleSuccess(response: IResponse<IDeleteSymbolResponse>, action: IAction<IDeleteSymbolParams>) {
  if (response.data) {
    const watchList: IWatchListModule = yield select((state: IState) => state.WatchListReducer);
    const updatePayload: {
      watchListList?: ILoadingReducer<IGetAllWatchlistResponse[]>;
      watchlistIncludeItem?: ILoadingReducer<number[]>;
      selectedWatchlistSymbolList?: ISelectedWatchlistSymbolList;
    } = {};

    if (
      watchList.selectedWatchList != null &&
      watchList.selectedWatchList.watchListId != null &&
      response.data.watchListIds.includes(watchList.selectedWatchList.watchListId)
    ) {
      updatePayload.selectedWatchlistSymbolList = {
        ...watchList.selectedWatchlistSymbolList,
        status: ReducerStatus.SUCCESS,
        data: watchList.selectedWatchlistSymbolList.data.filter(item => item.code !== action.payload.code),
      };
    }

    if (watchList.watchListList.status === ReducerStatus.SUCCESS && watchList.watchListList.data != null) {
      const watchListList = watchList.watchListList.data;
      response.data.watchListIds.forEach(el => {
        const updateWatchlistIndex = watchListList.findIndex(item => el === item.watchListId);
        if (updateWatchlistIndex > -1) {
          watchListList[updateWatchlistIndex].numberOfStocks -= 1;
        }
      });

      updatePayload.watchListList = {
        data: watchListList,
        status: ReducerStatus.SUCCESS,
      };

      updatePayload.watchlistIncludeItem = {
        data: watchList.watchlistIncludeItem.data.filter(item => !response.data.watchListIds.includes(item)),
        status: ReducerStatus.SUCCESS,
      };
    }

    if (Object.entries(updatePayload).length > 0) {
      yield put(WatchListActions.updateWatchList(updatePayload));
    }
    yield action.payload.callback?.handleSuccess?.();
  }
}

export function* handleFailed(action: IAction<IDeleteSymbolParams>) {
  if (action.response) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }

  yield action.payload.callback?.handleFail?.();
}

export default createNormalApiQuerySaga<IDeleteSymbolParams, IDeleteSymbolResponse>(
  APIList.deleteFavoriteSymbol,
  WatchListActions.onDeleteSymbolMulti.type,
  handleSuccess,
  handleFailed
);
