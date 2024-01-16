import APIList from 'config/api';
import ErrorMessage from 'constants/message';
import { ALL_ORDER_STATUS_FILTER_VALUE } from 'global';
import { IAction, IResponse } from 'interfaces/common';
import {
  IEqtOrderHistoryMappingResponse,
  IKisCancelEqtOrderParams,
  IKisCancelEqtOrderResponses,
} from 'interfaces/services';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { SUCCESS } from 'reduxs/action-type-utils';
import { SERVICE_GET_EQUITY_ENQUIRY_ORDER, SERVICE_PUT_EQUITY_CANCEL_ORDER } from 'reduxs/actions';
import { resetSelectedCancelList } from 'reduxs/global-actions';
import { IState } from 'reduxs/global-reducers';
import { alertMessage, handleCommonSagaEffect, queryKis } from 'utils';
import { CANCEL_ORDERBOOK_SUCCESS_TRIGGER } from '../../actions';

function* sagaHandling(action: IAction<IKisCancelEqtOrderParams>) {
  try {
    const response: IResponse<IKisCancelEqtOrderResponses[]> = yield call(
      queryKis,
      APIList.putKisEqtCancelOrder,
      action.payload
    );
    yield response != null &&
      put({
        type: CANCEL_ORDERBOOK_SUCCESS_TRIGGER,
      });
    if (response.data != null && response.data.length > 0) {
      const cancelSuccessList = response.data.filter(item => item.success);

      if (cancelSuccessList !== null && cancelSuccessList.length > 0) {
        const olderOrderHistoryList: IEqtOrderHistoryMappingResponse[] = yield select(
          (state: IState) => state.kisEquityEnquiryOrder.data
        );

        if (olderOrderHistoryList.length > 0) {
          cancelSuccessList.forEach(el => {
            const orderModifiedItemIndex = olderOrderHistoryList.findIndex(item => item.orderID === el.orderNo);

            if (orderModifiedItemIndex !== -1 && olderOrderHistoryList[orderModifiedItemIndex] != null) {
              olderOrderHistoryList[orderModifiedItemIndex].orderStatus = ALL_ORDER_STATUS_FILTER_VALUE.CANCELLED;
              olderOrderHistoryList[orderModifiedItemIndex].cancellable = false;
              olderOrderHistoryList[orderModifiedItemIndex].modifiable = false;
            }
          });
          handleCommonSagaEffect(action);
          yield put({
            type: SUCCESS(SERVICE_GET_EQUITY_ENQUIRY_ORDER),
            payload: olderOrderHistoryList,
          });
          yield action.response != null && put({ type: action.response.success });
          yield put(resetSelectedCancelList({ reset: true }));
          yield action.callBack?.handleSuccess && action.callBack.handleSuccess();
        }
      } else {
        alertMessage('danger', ErrorMessage.LO_CANCEL_FAILED, response.data[0].rejectCause);
        yield action.response != null && put({ type: action.response.fail });
        yield action.callBack?.handleFail && action.callBack.handleFail();
        // const cancelFailList = response.data.filter(item => !item.success);
        // if (cancelFailList.length > 0) {
        //   const firstRejectCause = cancelFailList[0].rejectCause;
        //   const messageDetail = [
        //     {
        //       message: firstRejectCause,
        //       orderNo: cancelFailList.filter(item => item.rejectCause === firstRejectCause).map(item => item.orderNo),
        //     },
        //   ];
        //   cancelFailList
        //     .filter(item => !messageDetail.find(el => el.message === item.rejectCause))
        //     .forEach(item => {
        //       messageDetail.push({
        //         message: item.rejectCause,
        //         orderNo: cancelFailList.filter(el => el.rejectCause === item.rejectCause).map(val => val.orderNo),
        //       });
        //     });
        //   alertMessage('danger', 'Cancel order fail', `Order no [${cancelFailList.map(item => item.orderNo).join(', ')}] `);
        // }
      }
    } else {
      alertMessage(
        'danger',
        ErrorMessage.LO_CANCEL_FAILED,
        `Order [${action.payload.orders.map(el => el.orderNo).join(', ')}] rejected for modify request`
      );
      yield action.response != null && put({ type: action.response.fail });
      yield action.callBack?.handleFail && action.callBack.handleFail();
    }
  } catch (err) {
    yield action.response != null && put({ type: action.response.fail });
    yield action.callBack?.handleFail && action.callBack.handleFail();
  }
}

export default function* watchOnCancelEquityOrder() {
  yield takeLeading(SERVICE_PUT_EQUITY_CANCEL_ORDER, sagaHandling);
}
