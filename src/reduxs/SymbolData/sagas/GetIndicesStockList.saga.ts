import { put, takeLatest } from 'redux-saga/effects';
import { getIndicesStockList } from '../SymbolData.action';
import { query } from 'utils';
import APIList from 'config/api';
import { SymbolDataAction } from '../SymbolData.reducer';
import { DiscoverActions } from 'reduxs/Discover';

function* doGetIndicesStockList() {
  try {
    const [listVN30, listHNX30, listUPCOM] = (yield Promise.all([
      query(APIList.getIndexStockList, {
        indexCode: 'VN30',
      })
        .then(res => res.data)
        .catch(() => undefined),
      query(APIList.getIndexStockList, {
        indexCode: 'HNX30',
      })
        .then(res => res.data)
        .catch(() => undefined),
      query(APIList.getIndexStockList, {
        indexCode: 'UPCOM',
      })
        .then(res => res.data)
        .catch(() => undefined),
    ])) as [string[], string[], string[]];

    yield put(SymbolDataAction.updateIndicesStockList({ VN30: listVN30, HNX30: listHNX30, UPCOM: listUPCOM }));
  } catch (error) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('GetIndicesStockListError', error);
  }
  yield put(DiscoverActions.refreshDiscoverScreenFinish({ refreshMarketFinish: true }));
}

export function* watchGetIndicesStockList() {
  yield takeLatest(getIndicesStockList.type, doGetIndicesStockList);
}
