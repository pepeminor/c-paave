import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import { IKisGetDerMaxLongShortEnquiryResponse, IKisGetDerMaxLongShortEnquiryParams } from 'interfaces/services';
import { call, put, takeEvery } from 'redux-saga/effects';
import { SERVICE_GET_DER_MAX_LONG_SHORT_ENQUIRY } from 'reduxs/actions';
import { queryKis } from 'utils';
function* sagaHandling(action: IAction<IKisGetDerMaxLongShortEnquiryParams>) {
  try {
    const response: IResponse<IKisGetDerMaxLongShortEnquiryResponse> = yield call(
      queryKis,
      APIList.getKisDerMaxLongShortEnquiry,
      action.payload
    );
    yield action.response != null &&
      put({
        type: action.response.success,
        payload: response.data,
      });
  } catch (err) {
    yield action.response != null && put({ type: action.response.fail });
  }
}
export default function* watchOnGetDerMaxLongShort() {
  yield takeEvery(SERVICE_GET_DER_MAX_LONG_SHORT_ENQUIRY, sagaHandling);
}
