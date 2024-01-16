import { call, put, select, takeLatest } from 'redux-saga/effects';
import { query } from 'utils';
import APIList from 'config/api';
import { getTop100Stocks } from '../Top100Stocks.action';
import { PayloadAction } from '@reduxjs/toolkit';
import { FinancialRatioRankingItem, FinancialRatioRankingParams } from '../Top100Stocks.type';
import { Top100StocksActions, Top100StocksSelector } from '../Top100Stocks.redux';
import { IResponse } from 'interfaces/common';
import { DiscoverActions } from 'reduxs';
import { IState } from 'reduxs/global-reducers';
import { ACCOUNT_TYPE } from 'global';

function* doGetTop100Stocks(action: PayloadAction<FinancialRatioRankingParams>) {
  try {
    const isDemo: boolean = yield select((state: IState) => state.selectedAccount.type === ACCOUNT_TYPE.DEMO);
    if (isDemo) return;
    const currentData = Top100StocksSelector.selectFullData(
      action.payload.market,
      action.payload.financialRatio
    )(yield select());
    const currentPageNumber = Math.floor(currentData.length / (action.payload.pageSize || 20));
    if (currentPageNumber > (action.payload.pageNumber ?? 0)) {
      return;
    }
    yield put(Top100StocksActions.updateLoading(true));
    const response: IResponse<FinancialRatioRankingItem[]> = yield call(
      query,
      APIList.getFinancialRatioRanking,
      action.payload
    );
    yield put(Top100StocksActions.updateTopStockData({ ...action.payload, data: response.data }));
    yield put(Top100StocksActions.updateLoading(false));
    yield put(DiscoverActions.refreshDiscoverScreenFinish({ refreshTop100StocksFinish: true }));
  } catch (error) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('GetTop100StocksError', error);
  }
}

export default function* watchGetTop100Stocks() {
  yield takeLatest(getTop100Stocks.type, doGetTop100Stocks);
}
