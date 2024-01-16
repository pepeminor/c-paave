import APIList from 'config/api';
import { IAction } from 'interfaces/common';
import {
  IGetEnquirySignOrderResponse,
  ISubmitEnquirySignOrderParams,
  ISubmitEnquirySignOrderResponse,
} from 'interfaces/equity';
import { put, select, takeLatest } from 'redux-saga/effects';
import { SUCCESS } from 'reduxs/action-type-utils';
import { EQUITY_GET_SIGN_ORDER, EQUITY_SUBMIT_SIGN_ORDER } from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { alertMessage, callQueryKis } from 'utils';

function* doSubmitEnquirySignOrder(action: IAction<ISubmitEnquirySignOrderParams>) {
  try {
    const response: ISubmitEnquirySignOrderResponse = yield callQueryKis(
      APIList.submitEnquirySignOrder,
      action.payload
    );

    if (response.success === 'true') {
      const refIDList = action.payload.mvOrderList.map(item => item[2]);
      const orderConfirmation: IGetEnquirySignOrderResponse[] = yield select(
        (state: IState) => state.orderConfirmation.data
      );
      const newOrderList = orderConfirmation.filter(item => !refIDList.includes(item.refID));
      yield put({
        type: SUCCESS(EQUITY_GET_SIGN_ORDER),
        payload: newOrderList,
        loadMore: false,
      });
      alertMessage('success', 'Chosen orders have been successfully confirmed');
    }
    action.callBack?.handleSuccess?.();
  } catch (error) {
    yield put({
      type: action.response?.fail,
    });
  }
}

export default function* watchSubmitEnquirySignOrder() {
  yield takeLatest(EQUITY_SUBMIT_SIGN_ORDER, doSubmitEnquirySignOrder);
}
