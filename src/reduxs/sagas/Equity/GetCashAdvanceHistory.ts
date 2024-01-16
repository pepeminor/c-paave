import APIList from 'config/api';
import { IAction } from 'interfaces/common';
import { IGetCashAdvanceHistoryParams, IGetCashAdvanceHistoryResponse } from 'interfaces/equity';
import { put, takeLeading } from 'redux-saga/effects';
import { EQUITY_GET_CASH_ADVANCE_HISTORY } from 'reduxs/actions';
import { callQueryKis } from 'utils';

function* doGetCashAdvanceHistory(action: IAction<IGetCashAdvanceHistoryParams>) {
  try {
    const response: IGetCashAdvanceHistoryResponse[] = yield callQueryKis(
      APIList.getCashAdvanceHistory,
      action.payload
    );

    yield put({
      type: action.response?.success,
      payload: response,
    });
  } catch (error: any) {
    yield put({
      type: action.response?.fail,
    });
  }
}

export default function* watchGetCashAdvanceHistory() {
  yield takeLeading(EQUITY_GET_CASH_ADVANCE_HISTORY, doGetCashAdvanceHistory);
}
