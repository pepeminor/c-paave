import { put, call, takeLeading } from 'redux-saga/effects';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { queryKis } from 'utils';
import {
  IDerClientCashBalanceShortverParams,
  IDerClientCashBalanceShortverResponse,
} from '../../../interfaces/bankTransfer';
import { BANK_TRANSFER_QUERY_CLIENT_CASH_BALANCE_SHORTVER } from '../../actions';

function* queryClientCashBalanceShortver(request: IAction<IDerClientCashBalanceShortverParams>) {
  try {
    const response: IResponse<IDerClientCashBalanceShortverResponse> = yield call(
      queryKis,
      APIList.getKisDerClientBalanceShortver,
      request.payload
    );
    if (request.response != null) {
      yield put({
        type: request.response.success,
        payload: response.data,
        hideLoading: true,
      });
    }
  } catch (error: any) {
    if (request.response != null) {
      yield put({
        type: request.response.fail,
        hideLoading: true,
      });
    }
  }
}

export default function* watchQueryClientCashBalanceShortver() {
  yield takeLeading(BANK_TRANSFER_QUERY_CLIENT_CASH_BALANCE_SHORTVER, queryClientCashBalanceShortver);
}
