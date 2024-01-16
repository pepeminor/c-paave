import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import { IKisModifyDerOrderParams, IKisModifyDerEnquiryOrderResponse } from 'interfaces/services';
import { call, put, takeLeading } from 'redux-saga/effects';
import { SERVICE_PUT_DER_MODIFY_ORDER } from 'reduxs/actions';
import { updateActiveFilter } from 'reduxs/global-actions';
import { handleCommonSagaEffect, queryKis } from 'utils';
function* sagaHandling(action: IAction<IKisModifyDerOrderParams>) {
  try {
    const response: IResponse<IKisModifyDerEnquiryOrderResponse> = yield call(
      queryKis,
      APIList.putKisDerModifyOrder,
      action.payload
    );
    yield put(updateActiveFilter({ pageNumber: 0 }));
    yield action.response != null &&
      put({
        type: action.response.success,
        payload: response.data,
      });
    handleCommonSagaEffect(action);
  } catch (err) {
    yield action.response != null && put({ type: action.response.fail });
  }
}
export default function* watchOnModifyDerOrder() {
  yield takeLeading(SERVICE_PUT_DER_MODIFY_ORDER, sagaHandling);
}
