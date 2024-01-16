import { put, call, takeLeading } from 'redux-saga/effects';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { queryKis } from 'utils';
import { queryBankInfoParams, queryBankInfoResponse } from '../../../interfaces/bankTransfer';
import { BANK_TRANSFER_QUERY_BANK_INFO_DER } from '../../actions';

function* queryDerBankInfo(request: IAction<queryBankInfoParams>) {
  try {
    const response: IResponse<queryBankInfoResponse[]> = yield call(
      queryKis,
      APIList.getKisDerQueryBankInfo,
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

export default function* watchQueryDerBankInfo() {
  yield takeLeading(BANK_TRANSFER_QUERY_BANK_INFO_DER, queryDerBankInfo);
}
