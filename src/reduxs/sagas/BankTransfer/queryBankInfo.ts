import { BANK_TRANSFER_QUERY_BANK_INFO } from '../../actions';
import { createNormalApiQuerySaga } from 'utils';
import { put } from 'redux-saga/effects';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { queryBankInfoResponse, queryBankInfoParams } from '../../../interfaces/bankTransfer';

function* handleSuccess(response: IResponse<queryBankInfoResponse[]>, action: IAction<queryBankInfoParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
}

function* handleFailed(action: IAction<queryBankInfoParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<queryBankInfoParams, queryBankInfoResponse[]>(
  APIList.getKisEqtQueryBankInfo,
  BANK_TRANSFER_QUERY_BANK_INFO,
  handleSuccess,
  handleFailed,
  undefined,
  true
);
