import { put, call, takeLeading } from 'redux-saga/effects';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { queryKis } from 'utils';
import { querySubAccountRetrieveParams, querySubAccountRetrieveResponse } from '../../../interfaces/bankTransfer';
import { BANK_TRANSFER_SUB_ACCOUNT_RETRIEVE } from '../../actions';

function* getAccessibleAccount(request: IAction<querySubAccountRetrieveParams>) {
  try {
    const response: IResponse<querySubAccountRetrieveResponse> = yield call(
      queryKis,
      APIList.getKisSubAccountRetrieve,
      request.payload
      // `${config[RealAccountSec.KIS].baseURI}/api/v2`
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

export default function* querySubAccountRetrieve() {
  yield takeLeading(BANK_TRANSFER_SUB_ACCOUNT_RETRIEVE, getAccessibleAccount);
}
