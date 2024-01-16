import { EQUITY_GET_ORDER_STOP_HISTORY, EQUITY_ORDER_STOP_CANCEL } from 'reduxs/actions';
import { IAction, IResponse } from 'interfaces/common';
import {
  IEquityOrderStopCancel,
  IEquityOrderStopResponse,
  IEquityOrderStopResponseKIS,
  IOrderStopHistoryResponse,
} from 'interfaces/equity';
import { put, select } from 'redux-saga/effects';
import APIList from 'config/api';
import { createApiQuerySaga } from 'utils';
import { SUCCESS } from 'reduxs/action-type-utils';
import { ALL_ORDER_STATUS_FILTER_VALUE } from 'global';
import { resetSelectedCancelList, updateCondOrderFilter } from 'reduxs/global-actions';
import { getOrderStopHistory } from '../../global-actions/Equity';
import { IState } from 'reduxs/global-reducers';
import { DOMAIN_KIS, DOMAIN_PAAVE } from 'interfaces/apis/Domain';

export default createApiQuerySaga(EQUITY_ORDER_STOP_CANCEL, {
  [DOMAIN_PAAVE]: {
    api: APIList.orderStopCancel,
    callbackSuccess: handleSuccess,
    callbackFail: handleFailed,
  },
  [DOMAIN_KIS]: {
    api: APIList.orderStopCancelKIS,
    callbackSuccess: handleSuccessKIS,
    callbackFail: handleFailed,
    otpTokenRequired: true,
  },
});

function* updateLocalStopOrder(action: IAction<IEquityOrderStopCancel>) {
  const olderOrderStopHistoryList: IOrderStopHistoryResponse[] = yield select(
    (state: IState) => state.OrderStopHistory.data
  );
  if (olderOrderStopHistoryList != null) {
    const orderModifiedItemIndex = olderOrderStopHistoryList.findIndex(
      item => item.stopOrderID === action.payload.stopOrderId
    );
    olderOrderStopHistoryList[orderModifiedItemIndex] = {
      ...olderOrderStopHistoryList[orderModifiedItemIndex],
      status: ALL_ORDER_STATUS_FILTER_VALUE.CANCELLED,
      cancellable: false,
      modifiable: false,
    };
    yield put({
      type: SUCCESS(EQUITY_GET_ORDER_STOP_HISTORY),
      payload: olderOrderStopHistoryList.slice(),
    });
  }
}

function* handleSuccess(response: IResponse<IEquityOrderStopResponse>, action: IAction<IEquityOrderStopCancel>) {
  if (action.response) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
  yield updateLocalStopOrder(action);
  yield put(resetSelectedCancelList({ reset: true }));
}

function* handleSuccessKIS(response: IResponse<IEquityOrderStopResponseKIS>, action: IAction<IEquityOrderStopCancel>) {
  if (action.response) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
  if (response.data.success) yield put(updateCondOrderFilter({ pageNumber: 0 }));
  yield put(getOrderStopHistory({}));
  yield put(resetSelectedCancelList({ reset: true }));
}

function* handleFailed(action: IAction<IEquityOrderStopCancel>) {
  if (action.response) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
    // if (error.code) alertMessage('danger', error.code);
  }
}
