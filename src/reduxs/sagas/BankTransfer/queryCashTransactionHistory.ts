import { BANK_TRANSFER_QUERY_CASH_TRANSACTION_HISTORY } from '../../actions';
import { createNormalApiQuerySaga } from 'utils';
import { put } from 'redux-saga/effects';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { cashTransactionHistoryParams, cashTransactionHistoryResponse } from '../../../interfaces/bankTransfer';

function* handleSuccess(
  response: IResponse<cashTransactionHistoryResponse>,
  action: IAction<cashTransactionHistoryParams>
) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
}

function* handleFailed(action: IAction<cashTransactionHistoryParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<cashTransactionHistoryParams, cashTransactionHistoryResponse>(
  APIList.getKisEqtHksCashTransactionHistory,
  BANK_TRANSFER_QUERY_CASH_TRANSACTION_HISTORY,
  handleSuccess,
  handleFailed,
  undefined,
  true
);
