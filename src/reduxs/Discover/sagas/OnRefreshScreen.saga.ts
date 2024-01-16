import { FinancialRatioConfig, IndicesConfig } from 'components/Top100Stocks/Top100Stocks.type';
import config from 'config';
import { put, select } from 'redux-saga/effects';
import { ForeignTradingActions } from 'reduxs/ForeignTrading';
import { HotStockAction } from 'reduxs/HotStock';
import { NewsActions, PAGE_SIZE_NEWS } from 'reduxs/News';
import { StockThemeActions } from 'reduxs/StockTheme';
import { SymbolDataAction, refreshSubscribedSymbols } from 'reduxs/SymbolData';
import { Top100StocksActions } from 'reduxs/Top100Stocks';
import { WatchListActions } from 'reduxs/WatchList';
import { IState } from 'reduxs/global-reducers';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

export default function* doRefreshDiscoverScreen() {
  try {
    yield put(refreshSubscribedSymbols());
    yield put(SymbolDataAction.getIndicesStockList());
    yield put(HotStockAction.updateHotStockParams({}));
    yield put(
      NewsActions.getNewsRequest({
        pageNumber: 0,
        pageSize: PAGE_SIZE_NEWS,
      })
    );
    yield put(
      WatchListActions.initWatchList({
        screenId: ScreenNames.Discover,
        pageSize: config.pageSize,
        refresh: true,
      })
    );
    const selectedIndex: IndicesConfig = yield select((state: IState) => state.top100Stocks.index);
    const selectedFinancialRatio: FinancialRatioConfig = yield select(
      (state: IState) => state.top100Stocks.financialRatio
    );
    yield put(
      Top100StocksActions.getTop100Stocks({
        payload: {
          market: selectedIndex,
          financialRatio: selectedFinancialRatio,
          pageNumber: 1,
          pageSize: 20,
        },
      })
    );
    yield put(
      StockThemeActions.getThemeList({
        payload: {
          sortAsc: false,
        },
      })
    );
    yield put(StockThemeActions.updatePeriod('1D'));
    yield put(
      ForeignTradingActions.getData({
        marketType: 'ALL',
        refresh: true,
      })
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    __DEV__ && console.log('Error at doRefreshDiscoverScreen: ', error);
  }
}
