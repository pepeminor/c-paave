import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { getCurrentSymbolStatistic } from '../SymbolData.action';
import { IMarketStatisticRequest } from 'interfaces/market';
import { IResponse } from 'interfaces/common';
import { query, deepMapFields } from 'utils';
import APIList from 'config/api';
import { MapSymbolFieldSchema, statisticDataSchema } from '../SymbolData.schema';

function* handleGetCurrentSymbolStatistic(action: PayloadAction<IMarketStatisticRequest>) {
  try {
    const response: IResponse<unknown> = yield call(query, APIList.getMarketStatistic, action.payload);

    const item = deepMapFields(response.data, MapSymbolFieldSchema.SocketData);
    const isSymbolStatistic = statisticDataSchema.safeParse(item);

    if (isSymbolStatistic.success) {
      yield put({
        type: getCurrentSymbolStatistic.fulfilled,
        payload: item,
      });
    } else {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log(`[${getCurrentSymbolStatistic.type}] - [FAILED]:`, item, isSymbolStatistic.error.errors);
      }

      yield put({
        type: getCurrentSymbolStatistic.rejected,
        payload: item,
      });
    }
  } catch (error) {
    yield put({
      type: getCurrentSymbolStatistic.rejected,
    });
  }
}

export default function* watchGetCurrentSymbolStatistic() {
  yield takeLatest(getCurrentSymbolStatistic.type, handleGetCurrentSymbolStatistic);
}
