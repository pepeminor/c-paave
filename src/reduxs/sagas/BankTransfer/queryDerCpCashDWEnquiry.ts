import { put, call, takeLeading } from 'redux-saga/effects';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { queryKis } from 'utils';
import { IDerCpCashDWEnquiryParams, IDerCpCashDWEnquiryResponse } from '../../../interfaces/bankTransfer';
import { BANK_TRANSFER_QUERY_CP_CASH_DW_ENQUIRY } from '../../actions';

function* queryCpCashDWEquiry(request: IAction<IDerCpCashDWEnquiryParams>) {
  try {
    const response: IResponse<IDerCpCashDWEnquiryResponse[]> = yield call(
      queryKis,
      APIList.getKisDerCpCashDWEnquiry,
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

export default function* watchQueryCpCashDWEquiry() {
  yield takeLeading(BANK_TRANSFER_QUERY_CP_CASH_DW_ENQUIRY, queryCpCashDWEquiry);
}
