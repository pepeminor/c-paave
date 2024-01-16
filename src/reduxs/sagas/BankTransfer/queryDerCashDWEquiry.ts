import { put, call, takeLeading } from 'redux-saga/effects';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { queryKis } from 'utils';
import { IDerCashDWEnquiryParams, IDerCashDWEnquiryResponse } from '../../../interfaces/bankTransfer';
import { BANK_TRANSFER_QUERY_CASH_DW_ENQUIRY } from '../../actions';

function* queryCashDWEquiry(request: IAction<IDerCashDWEnquiryParams>) {
  try {
    const response: IResponse<IDerCashDWEnquiryResponse> = yield call(
      queryKis,
      APIList.getKisDerCashDWEnquiry,
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

export default function* watchQueryCashDWEquiry() {
  yield takeLeading(BANK_TRANSFER_QUERY_CASH_DW_ENQUIRY, queryCashDWEquiry);
}
