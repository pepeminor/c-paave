import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import {
  IKisGetDerEnquiryClientStockStatementResponse,
  IKisGetDerEnquiryClientStockStatementParams,
} from 'interfaces/services';
import { call, put, takeLeading } from 'redux-saga/effects';
import { SERVICE_GET_DER_ENQUIRY_CLIENT_STOCK_STATEMENT } from 'reduxs/actions';
import { queryKis } from 'utils';

function* sagaHandling(action: IAction<IKisGetDerEnquiryClientStockStatementParams>) {
  const response: IResponse<IKisGetDerEnquiryClientStockStatementResponse[]> = yield call(
    queryKis,
    APIList.getClientStockStatementEnquiry,
    action.payload
  );

  try {
    if (action.response != null) {
      yield put({
        type: action.response.success,
        payload: response.data,
      });
    }
  } catch (error) {
    if (action.response != null) {
      yield put({
        type: action.response.fail,
        hideLoading: true,
      });
    }
  }
}

export default function* watchOnGetDerEnquiryClientStockStatement() {
  yield takeLeading(SERVICE_GET_DER_ENQUIRY_CLIENT_STOCK_STATEMENT, sagaHandling);
}
