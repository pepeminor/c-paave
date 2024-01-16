import { put, call, takeLeading, select } from 'redux-saga/effects';
import { IAccount, IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { handleCommonSagaEffect, queryKis } from 'utils';
import { IDerCashTransferParams, IDerCashTransferResponse } from '../../../interfaces/bankTransfer';
import { BANK_TRANSFER_POST_CP_CASH_DW } from '../../actions';
import { IState } from 'reduxs/global-reducers';
import { queryDerClientCashBalanceShortver } from 'reduxs/global-actions';

function* queryCashTransfer(request: IAction<IDerCashTransferParams>) {
  try {
    const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
    const response: IResponse<IDerCashTransferResponse> = yield call(
      queryKis,
      APIList.postKisDerCpCashDW,
      request.payload
    );

    if (request.response != null) {
      yield put({
        type: request.response.success,
        payload: response.data,
        hideLoading: true,
      });
      if (selectedAccount.selectedSubAccount != null) {
        yield put(queryDerClientCashBalanceShortver({ accountNo: selectedAccount.selectedSubAccount.accountNumber }));
      }
    }
    handleCommonSagaEffect(request);
    yield request.callBack?.handleSuccess != null && request.callBack.handleSuccess();
  } catch (error: any) {
    if (request.response != null) {
      yield put({
        type: request.response.fail,
        hideLoading: true,
      });
      yield request.callBack?.handleFail != null && request.callBack.handleFail();
    }
  }
}

export default function* watchQueryCashTransfer() {
  yield takeLeading(BANK_TRANSFER_POST_CP_CASH_DW, queryCashTransfer);
}
