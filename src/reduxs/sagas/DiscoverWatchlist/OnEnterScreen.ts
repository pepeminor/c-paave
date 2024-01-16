import { put, select, takeLeading } from 'redux-saga/effects';
import { DISCOVER_WATCHLIST_ENTER_SCREEN } from 'reduxs/actions';
import { queryWatchListDetail } from 'reduxs/WatchList/sagas';
import { IWatchListModule } from 'interfaces/reducers/IWatchListModule';
import { IState } from 'reduxs/global-reducers';
import { IAction } from 'interfaces/common';
import { IProfitLossItems } from 'interfaces/equity';
import { InvestmentSelectors } from 'reduxs/Investment';
import { mapV2 } from 'utils';
import { WatchListActions } from 'reduxs/WatchList';
import { ReducerStatus } from 'interfaces/reducer';

interface IOnEnterDiscoverWatchListScreen {
  refresh: boolean;
  pageNumber: number;
  pageSize: number;
}

function* handleOnEnterScreen(action: IAction<IOnEnterDiscoverWatchListScreen>) {
  const watchList: IWatchListModule = yield select((state: IState) => state.WatchListReducer);
  const { selectedWatchList } = watchList;

  if (selectedWatchList?.watchListId === -1) {
    const profitLossStockCodes: IProfitLossItems[] = yield select(InvestmentSelectors.selectedProfitLossItems(false));

    const data = mapV2(profitLossStockCodes, item => {
      return {
        code: item.stockCode,
        name: '',
      };
    });

    yield put(
      WatchListActions.updateWatchList({
        selectedWatchlistSymbolList: {
          data: data,
          status: ReducerStatus.SUCCESS,
          hasMore: false,
          hasMoreLoading: false,
        },
      })
    );
    return;
  }

  yield queryWatchListDetail({
    params: {
      watchListId: selectedWatchList?.watchListId ?? 0,
      pageNumber: action.payload.pageNumber,
      pageSize: action.payload.pageSize,
    },
    isLoading: action.payload.refresh,
  });
}

export default function* watchOnEnterScreen() {
  yield takeLeading(DISCOVER_WATCHLIST_ENTER_SCREEN, handleOnEnterScreen);
}
