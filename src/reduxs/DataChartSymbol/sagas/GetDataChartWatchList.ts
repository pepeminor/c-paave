import { call, put } from 'redux-saga/effects';
import { query } from 'utils';
import APIList from 'config/api';
import { PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { DataChartSymbolActions, IGetChartDataRequest, IGetChartDataResponse } from 'reduxs/DataChartSymbol';
import { formatDataChart } from '../DataChartSymbol.helper';

export function* doGetDataChartSymbol(action: PayloadAction<IGetChartDataRequest>) {
  try {
    const currentDate = new Date(moment().startOf('isoWeek').format('YYYY-MM-DD').toString()).getTime() / 1000; //Monday

    const endDate = new Date(moment().endOf('isoWeek').format('YYYY-MM-DD').toString()).getTime() / 1000; //Sunday

    const response: IGetChartDataResponse = yield call(query, APIList.tradingViewHistory, {
      symbol: action.payload.symbol,
      resolution: action.payload.resolution,
      from: currentDate,
      to: endDate,
    });
    if (response) {
      yield put(
        DataChartSymbolActions.getChartDataSuccess({
          symbolCode: action.payload.symbol,
          dataPoint: formatDataChart({
            ignoreLunchTime: action.payload.ignoreLunchTime,
            firstPoint: response.data.o[0],
            dataPoint: response.data.c,
            dataTime: response.data.t,
            resolution: parseInt(action.payload.resolution, 10),
          }),
          resolution: action.payload.resolution,
        })
      );

      action.payload.callback?.();
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('GetQuoteListError', error);

    action.payload.callback?.(error);
  }
}
