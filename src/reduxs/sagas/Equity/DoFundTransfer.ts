import { put, call, takeLeading } from 'redux-saga/effects';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { queryKis, alertMessage } from 'utils';
import { EQUITY_DO_FUND_TRANSFER } from 'reduxs/actions';
import { doFundTransferParams, doFundTransferResponse } from '../../../interfaces/bankTransfer';

function* doFundTransfer(request: IAction<doFundTransferParams>) {
  try {
    const response: IResponse<doFundTransferResponse> = yield call(
      queryKis,
      APIList.postKisEqtDoFundTransfer,
      request.payload
    );

    if (request.response != null) {
      yield put({
        type: request.response.success,
        payload: response.data,
        hideLoading: true,
      });
    }
    alertMessage('success', 'Internal Transfer', 'Internal Transfer Success');
  } catch (error) {
    if (request.response != null) {
      yield put({
        type: request.response.fail,
        hideLoading: true,
      });
    }
    // alertMessage('danger', 'do fund transfer', error.code ?? error.message);
  }
}

export default function* watchDoFunTransfer() {
  yield takeLeading(EQUITY_DO_FUND_TRANSFER, doFundTransfer);
}
