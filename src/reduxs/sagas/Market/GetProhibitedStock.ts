import { put, takeLeading } from 'redux-saga/effects';
import { MARKET_PROHIBITED_STOCK } from 'reduxs/actions';
import { SUCCESS } from 'reduxs/action-type-utils';
import { callQuery } from 'utils';
import APIList from 'config/api';
import { IProhibitedStockResponse } from 'interfaces/market';

function* doQuery() {
  try {
    const response: IProhibitedStockResponse = yield callQuery(APIList.getProhibitedStock, {});
    yield put({
      type: SUCCESS(MARKET_PROHIBITED_STOCK),
      payload: response.listOfLimitedStockCodes ?? [],
    });
  } catch (e) {
    // console.error('query failed', e);
  }
}

export default function* watchGetProhibitedStock() {
  yield takeLeading(MARKET_PROHIBITED_STOCK, doQuery);
}
