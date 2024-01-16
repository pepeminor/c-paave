import { BANK_TRANSFER_QUERY_GEN_FUND_TRANSFER } from '../../actions';
import { createNormalApiQuerySaga } from 'utils';
import { put } from 'redux-saga/effects';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { queryGenFundTransferParams, queryGenFundTransferResponse } from '../../../interfaces/bankTransfer';

function* handleSuccess(
  response: IResponse<queryGenFundTransferResponse>,
  action: IAction<queryGenFundTransferParams>
) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
}

function* handleFailed(action: IAction<queryGenFundTransferParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<queryGenFundTransferParams, queryGenFundTransferResponse>(
  APIList.getKisEqtGenFundTransfer,
  BANK_TRANSFER_QUERY_GEN_FUND_TRANSFER,
  handleSuccess,
  handleFailed,
  undefined,
  true
);
