import APIList from 'config/api';
import ErrorMessage from 'constants/message';
import { ALL_ORDER_STATUS_FILTER_VALUE } from 'global';
import { IAction, IResponse } from 'interfaces/common';
import {
  IDerOrderHistoryMappingResponse,
  IKisCancelDerOrderParams,
  IKisCancelEqtOrderResponses,
} from 'interfaces/services';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { SUCCESS } from 'reduxs/action-type-utils';
import { SERVICE_GET_DER_ENQUIRY_ORDER, SERVICE_PUT_DER_CANCEL_ORDER } from 'reduxs/actions';
import { resetSelectedCancelList } from 'reduxs/global-actions';
import { IState } from 'reduxs/global-reducers';
import { alertMessage, handleCommonSagaEffect, queryKis } from 'utils';

function* sagaHandling(action: IAction<IKisCancelDerOrderParams>) {
  try {
    const response: IResponse<IKisCancelEqtOrderResponses[]> = yield call(
      queryKis,
      APIList.putKisDerCancelOrder,
      action.payload
    );

    if (response.data == null || response.data.length === 0) {
      yield action.response != null && put({ type: action.response.fail });
      yield action.callBack?.handleFail?.();
      return;
    }

    const cancelSuccessList = response.data.filter(item => item.success);

    if (cancelSuccessList == null || cancelSuccessList.length === 0) {
      alertMessage('danger', ErrorMessage.LO_CANCEL_FAILED, response.data[0].rejectCause);
      yield action.response != null && put({ type: action.response.fail });
      yield action.callBack?.handleFail?.();
      return;
    }

    const olderEnquiryOrderList: IDerOrderHistoryMappingResponse[] = yield select(
      (state: IState) => state.kisDerEnquiryOrder.data
    );

    if (olderEnquiryOrderList.length === 0) return;

    cancelSuccessList.forEach(el => {
      const orderModifiedItemIndex = olderEnquiryOrderList.findIndex(item => item.orderGroupID === el.orderGroupNo);
      if (orderModifiedItemIndex !== -1 && olderEnquiryOrderList[orderModifiedItemIndex] != null) {
        olderEnquiryOrderList[orderModifiedItemIndex].orderStatus = ALL_ORDER_STATUS_FILTER_VALUE.CANCELLED;
        olderEnquiryOrderList[orderModifiedItemIndex].cancellable = false;
        olderEnquiryOrderList[orderModifiedItemIndex].modifiable = false;
      }
    });

    handleCommonSagaEffect(action);

    yield put({
      type: SUCCESS(SERVICE_GET_DER_ENQUIRY_ORDER),
      payload: olderEnquiryOrderList,
    });

    yield action.response != null && put({ type: action.response.success });

    yield put(resetSelectedCancelList({ reset: true }));

    yield action.callBack?.handleSuccess?.();
  } catch (err) {
    yield action.response != null && put({ type: action.response.fail });

    yield action.callBack?.handleFail?.();
  }
}

export default function* watchOnCancelDerOrder() {
  yield takeLeading(SERVICE_PUT_DER_CANCEL_ORDER, sagaHandling);
}
