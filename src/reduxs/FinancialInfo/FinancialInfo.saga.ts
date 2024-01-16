import { takeLatest } from 'redux-saga/effects';
import { getFinancialInfo } from './FinancialInfo.action';
import { handleGetFinancialInfo } from './sagas/GetFinancialInfo';

export function* FinancialInfoSagas() {
  yield takeLatest(getFinancialInfo.type, handleGetFinancialInfo);
}
