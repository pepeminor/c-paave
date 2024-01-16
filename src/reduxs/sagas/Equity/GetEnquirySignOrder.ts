import APIList from 'config/api';
import { IAction } from 'interfaces/common';
import { IGetEnquirySignOrderParams, IGetEnquirySignOrderResponse } from 'interfaces/equity';
import { put, takeEvery } from 'redux-saga/effects';
import { EQUITY_GET_SIGN_ORDER } from 'reduxs/actions';
import { callQueryKis } from 'utils';

function* doGetEnquirySignOrder(action: IAction<IGetEnquirySignOrderParams>) {
  try {
    const response: IGetEnquirySignOrderResponse[] = yield callQueryKis(APIList.getEnquirySignOrder, action.payload);

    yield put({
      type: action.response?.success,
      payload: response,
      loadMore: (action.payload.offset ?? 0) > 0,
    });
  } catch (error) {
    yield put({
      type: action.response?.fail,
    });
  }
}

export default function* watchGetEnquirySignOrder() {
  yield takeEvery(EQUITY_GET_SIGN_ORDER, doGetEnquirySignOrder);
}
