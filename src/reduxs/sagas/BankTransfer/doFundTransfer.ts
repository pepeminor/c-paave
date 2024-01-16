import { put, call, takeLeading } from 'redux-saga/effects';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { queryKis, alertMessage } from 'utils';
import { doFundTransferParams, doFundTransferResponse } from '../../../interfaces/bankTransfer';
import { BANK_TRANSFER_DO_FUND_TRANSFER } from '../../actions';
import { CashTransferType } from 'constants/enum';

function* doFundTransfer(request: IAction<doFundTransferParams>) {
  try {
    const response: IResponse<doFundTransferResponse> = yield call(
      queryKis,
      APIList.postKisEqtDoFundTransfer,
      request.payload
    );

    if (request.response != null) {
      if (response.data.result === 'success') {
        yield put({
          type: request.response.success,
        });
      }
      if (request.payload.transferType === CashTransferType.TO_BANK) {
        alertMessage('success', 'Bank Transfer', 'Transfer Successful');
      } else {
        alertMessage('success', 'Internal Transfer', 'Transfer Successful');
      }
    }
  } catch (error) {
    if (request.response != null) {
      yield put({
        type: request.response.fail,
        hideLoading: true,
      });
      yield request.callBack?.handleFail?.(error);
    }
    // alertMessage('danger', 'do fund transfer', error.code ?? error.message);
  }
}

export default function* watchDoFunTransfer() {
  yield takeLeading(BANK_TRANSFER_DO_FUND_TRANSFER, doFundTransfer);
}
