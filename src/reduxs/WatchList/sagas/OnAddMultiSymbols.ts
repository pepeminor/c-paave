import APIList from 'config/api';
import { IAction } from 'interfaces/common';
import { IWatchListModule } from 'interfaces/reducers/IWatchListModule';
import { call, put, select, all } from 'redux-saga/effects';
import { IState } from 'reduxs/global-reducers';
import { query, queryKis } from 'utils';
import { IAddSymbolParams } from '../../../interfaces/favorite';
import { ACCOUNT_TYPE } from '../../../global/index';
import { queryWatchListDetail } from './OnInitWatchList';
import { WatchListActions } from '../WatchList.redux';

export function* onAddSymbolsMultiSymbols(action: IAction<IAddSymbolParams>) {
  try {
    const watchList: IWatchListModule = yield select((state: IState) => state.WatchListReducer);
    const currentWatchListId: number = yield select(
      (state: IState) => state.WatchListReducer.selectedWatchList?.watchListId
    );
    const accountType: ACCOUNT_TYPE = yield select((state: IState) => state.selectedAccount.type);
    const listDeletedSymbol: string[] = [];
    watchList.selectedWatchlistSymbolList.data.forEach(
      item => !action.payload.code.includes(item.code) && listDeletedSymbol.push(item.code)
    );
    switch (accountType) {
      case ACCOUNT_TYPE.VIRTUAL:
        yield action.payload.code.length > 0 && call(query, APIList.addFavoriteSymbol, action.payload);
        yield watchList.selectedWatchList != null && // delete 1 by 1 waiting for BE update API
          all(
            [...listDeletedSymbol].map(item =>
              call(query, APIList.deleteFavoriteSymbol, {
                code: item,
                watchListIds: [currentWatchListId],
              })
            )
          );
        break;
      case ACCOUNT_TYPE.KIS:
        yield watchList.selectedWatchList != null &&
          call(queryKis, APIList.putKisFavorite, {
            items: [
              {
                id: currentWatchListId,
                itemList:
                  action.payload.code.length > 0
                    ? action.payload.code.map(item => ({ data: item, isNote: false }))
                    : [],
              },
            ],
          });
        break;
      case ACCOUNT_TYPE.DEMO: {
        yield put(WatchListActions.onDeleteSymbolNonLogin(action.payload.code));
        break;
      }
      default:
        break;
    }
    yield put(
      WatchListActions.onAddMultiSymbolsSuccess({
        numberStocks: action.payload.code.length,
        listCode: action.payload.code,
      })
    );

    if (watchList.selectedWatchList != null && currentWatchListId != null) {
      yield queryWatchListDetail({
        params: { watchListId: watchList.selectedWatchList.watchListId },
        handleSuccess: action.payload.callback?.handleSuccess,
      });
    }
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('fail to add symbols to current watchList', e);
    }
    yield action.payload.callback?.handleFail?.();
  }
}
