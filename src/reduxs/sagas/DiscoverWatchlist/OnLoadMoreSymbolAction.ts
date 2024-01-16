import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import { IGetAllSymbolFavoriteResponse, ILoadMoreWatchlistSymbol } from 'interfaces/favorite';
import { ReducerStatus } from 'interfaces/reducer';
import { IWatchListModule } from 'interfaces/reducers/IWatchListModule';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { DISCOVER_WATCHLIST_LOAD_MORE_SYMBOL_ACTION } from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { query } from 'utils';
import { IAccount } from '../../../interfaces/common';
import { ACCOUNT_TYPE, LANG } from 'global';
import { NonLoginWatchList } from 'reduxs/global-reducers/WatchList';
import { MarketSymbol } from 'reduxs/SymbolData';
import { WatchListActions } from 'reduxs/WatchList';

function* onLoadMoreWatchlistSymbol(action: IAction<ILoadMoreWatchlistSymbol>) {
  const watchList: IWatchListModule = yield select((state: IState) => state.WatchListReducer);
  const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
  if (selectedAccount.type !== ACCOUNT_TYPE.VIRTUAL && selectedAccount.type !== ACCOUNT_TYPE.DEMO) return;

  yield put(
    WatchListActions.updateWatchList({
      selectedWatchlistSymbolList: {
        ...watchList.selectedWatchlistSymbolList,
        hasMoreLoading: true,
      },
    })
  );

  try {
    if (watchList.selectedWatchList != null) {
      let addWatchListSymbolsResponse: IGetAllSymbolFavoriteResponse[] = [];
      let watchListSymbolsResponse: IGetAllSymbolFavoriteResponse[] = [];
      switch (selectedAccount.type) {
        case ACCOUNT_TYPE.VIRTUAL: {
          watchListSymbolsResponse = (
            (yield call(query, APIList.getAllFavoriteSymbol, {
              watchListId: watchList.selectedWatchList.watchListId,
              pageNumber: action.payload.pageNumber,
              pageSize: action.payload.pageSize,
            })) as IResponse<IGetAllSymbolFavoriteResponse[]>
          ).data;

          const listSymbol = watchList.selectedWatchlistSymbolList.data.map(symbol => symbol.code);

          addWatchListSymbolsResponse = watchListSymbolsResponse.filter(symbol => !listSymbol.includes(symbol.code));
          yield put(
            WatchListActions.updateWatchList({
              selectedWatchlistSymbolList: {
                data: [...watchList.selectedWatchlistSymbolList.data, ...addWatchListSymbolsResponse],
                status: ReducerStatus.SUCCESS,
                hasMore: !(
                  !action.payload.ignoreHasMore && !(watchListSymbolsResponse.length >= action.payload.pageSize)
                ),
                hasMoreLoading: false,
              },
            })
          );

          break;
        }
        case ACCOUNT_TYPE.DEMO: {
          const nonLoginWatchList: NonLoginWatchList = yield select(
            (state: IState) =>
              state.nonLoginWatchList.find(w => w.index === watchList.selectedWatchList?.watchListId) ?? null
          );
          const selectedLanguage: LANG = yield select((state: IState) => state.lang);
          const dataMap: { readonly [s: string]: MarketSymbol } = yield select(
            (state: IState) => state.SymbolData.marketData.symbolMap
          );
          nonLoginWatchList?.stocks?.forEach(symbol =>
            watchListSymbolsResponse.push({
              code: symbol,
              name: (selectedLanguage === LANG.VI ? dataMap[symbol].vietnameseName : dataMap[symbol].englishName) ?? '',
            })
          );
          const listSymbol = watchList.selectedWatchlistSymbolList.data.map(symbol => symbol.code);
          addWatchListSymbolsResponse = watchListSymbolsResponse.filter(symbol => !listSymbol.includes(symbol.code));
          break;
        }
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Load more symbol in watchlist failed', error);
    yield put(
      WatchListActions.updateWatchList({
        selectedWatchlistSymbolList: {
          ...watchList.selectedWatchlistSymbolList,
          hasMore: false,
          hasMoreLoading: true,
        },
      })
    );
  }
}

export default function* watchOnLoadMoreSymbolAction() {
  yield takeEvery(DISCOVER_WATCHLIST_LOAD_MORE_SYMBOL_ACTION, onLoadMoreWatchlistSymbol);
}
