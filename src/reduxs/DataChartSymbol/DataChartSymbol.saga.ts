import { takeEvery } from 'redux-saga/effects';
import { DataChartSymbolActions } from './DataChartSymbol.redux';
import { doGetDataChartSymbol } from './sagas/GetDataChartWatchList';

export function* DataChartSymbolSagas() {
  yield takeEvery(DataChartSymbolActions.getDataChartSymbol.type, doGetDataChartSymbol);
}
