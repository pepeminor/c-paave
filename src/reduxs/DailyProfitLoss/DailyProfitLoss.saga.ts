import APIList from 'config/api';
import { put, takeEvery, select } from 'redux-saga/effects';
import { formatDateToString, mapV2, query } from 'utils';
import { DailyProfitLossActions } from './DailyProfitLoss.redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { formatDailyProfitLossList, mapVNIndexReturnToChartData } from './DailyProfitLoss.helper';
import {
  IPayloadGetDailyProfitLossListRequest,
  IDailyProfitLossResponse,
  IVNIndexResponse,
} from './DailyProfitLoss.type';
import { IState } from 'reduxs/global-reducers';
import { SYSTEM_TYPE } from 'global';
import { subDays } from 'date-fns';

function* doGetDailyProfitLoss(request: PayloadAction<IPayloadGetDailyProfitLossListRequest>) {
  try {
    const isSubD: boolean = yield select(
      (state: IState) =>
        state.selectedAccount.selectedSubAccount != null &&
        state.selectedAccount.selectedSubAccount.accountSubs[0] != null &&
        state.selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
    );

    const username: number = yield select((state: IState) => state.selectedAccount.username);

    const response: IDailyProfitLossResponse = yield query(
      isSubD ? APIList.getDerDailyProfitLossForKis : APIList.getDailyProfitLoss,
      request.payload
    );
    yield put(
      DailyProfitLossActions.getDailyProfitLossListSuccess({
        accountCreatedDate: response.data.accountCreatedDate!,
        accountLinkedDate: response.data.accountLinkedDate!,
        dataProfitLoss: formatDailyProfitLossList(response.data.dailyProfitLosses, response.data.accountCreatedDate!),
        days: request.payload.days,
        accountNumber: username?.toString(),
      })
    );
  } catch (err) {
    yield put(DailyProfitLossActions.getDailyProfitLossListFailure());
  }
}

function* doGetDailyProfitLossForKis(request: PayloadAction<IPayloadGetDailyProfitLossListRequest>) {
  try {
    // Get Profit Loss
    const isSubD: boolean = yield select(
      (state: IState) =>
        state.selectedAccount.selectedSubAccount != null &&
        state.selectedAccount.selectedSubAccount.accountSubs[0] != null &&
        state.selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
    );
    const accountNumber: number = yield select(
      (state: IState) => state.selectedAccount.selectedSubAccount?.accountNumber
    );

    const response: IDailyProfitLossResponse = yield query(
      isSubD ? APIList.getDerDailyProfitLossForKis : APIList.getDailyProfitLossForKis,
      request.payload
    );
    yield put(
      DailyProfitLossActions.getDailyProfitLossKISSuccess({
        accountCreatedDate: response.data.accountCreatedDate!,
        accountLinkedDate: response.data.accountLinkedDate!,
        dataProfitLoss: formatDailyProfitLossList(response.data.dailyProfitLosses, response.data.accountCreatedDate!),
        days: request.payload.days,
        accountNumber: accountNumber?.toString(),
      })
    );

    // Get VNIndex Return
    try {
      const { fromDate, pageSize, pageNumber, days } = request.payload;
      const { data }: IVNIndexResponse = yield query(APIList.vnindexReturn, {
        fromDate: getLatestDate(fromDate, response.data.accountLinkedDate),
        pageSize,
        pageNumber,
      });
      yield put(
        DailyProfitLossActions.getVNIndexReturnSuccess({
          [days]: {
            normalizedRate: mapV2(data, mapVNIndexReturnToChartData),
          },
        })
      );
    } catch (error) {
      // Do nothing
    }
  } catch (err) {
    yield put(DailyProfitLossActions.getDailyProfitLossKISFailure());
  }
}

function* getVNIndexReturnDemo(request: PayloadAction<number>) {
  try {
    const fromDate = formatDateToString(subDays(new Date(), request.payload));
    const { data }: IVNIndexResponse = yield query(APIList.vnindexReturn, {
      fromDate,
      pageSize: 500,
      pageNumber: 0,
    });
    yield put(
      DailyProfitLossActions.getVNIndexReturnSuccess({
        [request.payload]: {
          normalizedRate: mapV2(data, mapVNIndexReturnToChartData),
        },
      })
    );
  } catch (err) {
    //
  }
}

export function* DailyProfitLossSagas() {
  yield takeEvery(DailyProfitLossActions.getDailyProfitLossListRequest.type, doGetDailyProfitLoss);
  yield takeEvery(DailyProfitLossActions.getDailyProfitLossKISRequest.type, doGetDailyProfitLossForKis);
  yield takeEvery(DailyProfitLossActions.getDailyProfitLossDemoRequest.type, getVNIndexReturnDemo);
}

function getLatestDate(date?: string, anotherDate?: string) {
  if (date == null) return anotherDate;
  if (anotherDate == null) return date;
  return date > anotherDate ? date : anotherDate;
}
