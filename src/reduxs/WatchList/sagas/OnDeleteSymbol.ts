import APIList from 'config/api';
import { IAction } from 'interfaces/common';
import { IDeleteSymbolParams } from 'interfaces/favorite';
import { IWatchListModule } from 'interfaces/reducers/IWatchListModule';
import { call, select } from 'redux-saga/effects';
import { IState } from 'reduxs/global-reducers';
import { query, alertMessage } from 'utils';

export function* onDeleteSymbol(action: IAction<string>) {
  try {
    const symbol = action.payload.trim();
    const watchList: IWatchListModule = yield select((state: IState) => state.WatchListReducer);

    if (symbol === '' || watchList.selectedWatchList == null) {
      alertMessage('danger', 'Delete Symbol', 'There is no selected watch list');
      return;
    }

    const matchIndex = watchList.selectedWatchlistSymbolList.data?.findIndex(item => item.code === symbol);
    if (matchIndex == null || matchIndex < 0) {
      alertMessage('danger', 'Delete Symbol', 'Symbol does not exist in watch list');
      return;
    }

    if (watchList.watchListList.data != null && watchList.watchListList.data.length >= 1) {
      const params: IDeleteSymbolParams = {
        code: symbol,
        watchListIds: [watchList.selectedWatchList.watchListId],
      };
      yield call(query, APIList.deleteFavoriteSymbol, params);

      yield action.callBack?.handleSuccess != null && action.callBack.handleSuccess();
    }
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('fail to delete symbol in watch list', e);
    }
    yield action.callBack?.handleFail != null && action.callBack.handleFail();
  }
}
