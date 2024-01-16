import { IAction } from 'interfaces/common';
import { IChangeSelectedWatchListParams } from 'interfaces/favorite';
import { ReducerStatus } from 'interfaces/reducer';
import { put, select } from 'redux-saga/effects';
import { queryWatchListDetail } from './OnInitWatchList';
import { WatchListActions } from '../WatchList.redux';
import { InvestmentSelectors } from 'reduxs/Investment';
import { IProfitLossItems } from 'interfaces/equity';
import { mapV2 } from 'utils';

export function* changeSelectedWatchList(action: IAction<IChangeSelectedWatchListParams>) {
  try {
    if (action.payload.selectedWatchList.watchListId === -1) {
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
        watchListId: action.payload.selectedWatchList.watchListId,
        pageNumber: action.payload.getAllSymbolFavorite?.pageNumber,
        pageSize: action.payload.getAllSymbolFavorite?.pageSize,
      },
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('fail in query watchlist', e);
  }
}
