/* eslint-disable no-console */
import { MARKET_GET_SYMBOL_PERIOD } from './../../actions';
import { IAction, IResponse, ISymbolPeriod } from 'interfaces/common';
import { IGetSymbolPeriodParams } from 'interfaces/market';
import { query } from 'utils';
import { takeLatest, call } from 'redux-saga/effects';
import APIList from 'config/api';

const getSymbolPeriod = (params: IGetSymbolPeriodParams) => {
  return query(APIList.indexSymbolPeriod, params);
};

function* doGetSymbolPeriod(action: IAction<IGetSymbolPeriodParams>) {
  try {
    const response: IResponse<ISymbolPeriod> = yield call(getSymbolPeriod, action.payload);
    console.log(' get symbol period', response.data);
  } catch (error) {
    console.log('error get symbol period', error);
  }
}

export default function* watchGetSymbolPeriod() {
  yield takeLatest(MARKET_GET_SYMBOL_PERIOD, doGetSymbolPeriod);
}
