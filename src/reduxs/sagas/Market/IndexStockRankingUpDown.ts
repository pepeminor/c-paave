import { MARKET_INDEX_STOCKS_RANKING_UP_DOWN } from './../../actions';
import { IAction } from 'interfaces/common';
import { IIndexStockRankingUpDownParams } from 'interfaces/market';
import { query } from 'utils';
import { takeLatest, call } from 'redux-saga/effects';
import APIList from 'config/api';

const getIndexStockRankingUpDown = (params: IIndexStockRankingUpDownParams) => {
  return query(APIList.IndexStockRankingUpDown, params);
};

function* doGetIndexStockRankingUpDown(action: IAction<IIndexStockRankingUpDownParams>) {
  try {
    yield call(getIndexStockRankingUpDown, action.payload);
  } catch (error) {} // eslint-disable-line
}

export default function* watchGetIndexStockRankingUpDown() {
  yield takeLatest(MARKET_INDEX_STOCKS_RANKING_UP_DOWN, doGetIndexStockRankingUpDown);
}
