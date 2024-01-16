import { put, call, takeLeading, select } from 'redux-saga/effects';
import { IAccount, IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { alertMessage, queryKis } from 'utils';
import { IDerCashTransferParams, IDerCashTransferResponse } from '../../../interfaces/bankTransfer';
import { BANK_TRANSFER_POST_CASH_TRANSFER } from '../../actions';
import { IState } from 'reduxs/global-reducers';
import { queryDerClientCashBalanceShortver, queryGenFundTransfer } from 'reduxs/global-actions';
import { SYSTEM_TYPE } from 'global';

function* postCashTransfer(request: IAction<IDerCashTransferParams>) {
  try {
    const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
    const response: IResponse<IDerCashTransferResponse> = yield call(
      queryKis,
      APIList.postKisDerCashTransfer,
      request.payload
    );
    if (request.response != null) {
      yield put({
        type: request.response.success,
        payload: response.data,
        hideLoading: true,
      });
      yield alertMessage('success', 'INTERNAL_TRANSFER_SUCCESS');
      if (
        selectedAccount.selectedSubAccount != null &&
        selectedAccount.selectedSubAccount.accountSubs[0] != null &&
        selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
      ) {
        yield put(queryDerClientCashBalanceShortver({ accountNo: selectedAccount.selectedSubAccount.accountNumber }));
      } else if (
        selectedAccount.selectedSubAccount != null &&
        selectedAccount.selectedSubAccount.accountSubs[0] != null &&
        selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY
      ) {
        const accountNoParams = {
          accountNo: selectedAccount.selectedSubAccount.accountNumber,
          clientID: selectedAccount.username,
        };
        yield put(queryGenFundTransfer(accountNoParams));
      }
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

export default function* watchPostCashTransfer() {
  yield takeLeading(BANK_TRANSFER_POST_CASH_TRANSFER, postCashTransfer);
}
