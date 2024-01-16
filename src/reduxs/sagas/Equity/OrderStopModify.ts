import { EQUITY_GET_ORDER_STOP_HISTORY, EQUITY_ORDER_STOP_MODIFY } from 'reduxs/actions';
import { IAction, IResponse } from 'interfaces/common';
import { IEquityOrderStopModify, IEquityOrderStopResponse, IEquityOrderStopResponseKIS } from 'interfaces/equity';
import { put, select } from 'redux-saga/effects';
import APIList from 'config/api';
import { SUCCESS } from 'reduxs/action-type-utils';
import { IOrderStopHistoryResponse } from '../../../interfaces/equity';
import { IState } from '../../global-reducers/index';
import { createApiQuerySaga } from 'utils';
import { updateCondOrderFilter } from 'reduxs/global-actions';
import { getOrderStopHistory } from '../../global-actions/Equity';
import { DOMAIN_KIS, DOMAIN_PAAVE } from 'interfaces/apis/Domain';

export default createApiQuerySaga(EQUITY_ORDER_STOP_MODIFY, {
  [DOMAIN_PAAVE]: {
    api: APIList.orderStopModify,
    callbackSuccess: handleSuccess,
    callbackFail: handleFailed,
  },
  [DOMAIN_KIS]: {
    api: APIList.orderStopModifyKIS,
    callbackSuccess: handleSuccessKIS,
    callbackFail: handleFailed,
    mapSchema: {
      newStopPrice: 'stopPrice',
      newOrderQuantity: 'orderQuantity',
      newFromDate: 'fromDate',
      newToDate: 'toDate',
    },
    otpTokenRequired: true,
  },
});

function* updateLocalStopOrder(action: IAction<IEquityOrderStopModify>) {
  const olderOrderStopHistoryList: IOrderStopHistoryResponse[] = yield select(
    (state: IState) => state.OrderStopHistory.data
  );
  if (olderOrderStopHistoryList != null) {
    const orderModifiedItemIndex = olderOrderStopHistoryList.findIndex(
      item => item.stopOrderID == action.payload.stopOrderId
    );
    olderOrderStopHistoryList[orderModifiedItemIndex] = {
      ...olderOrderStopHistoryList[orderModifiedItemIndex],
      stopPrice: action.payload.newStopPrice,
      orderPrice: action.payload.orderPrice,
      orderQuantity: action.payload.newOrderQuantity,
      fromDate: action.payload.newFromDate,
      toDate: action.payload.newToDate,
    };
    yield put({
      type: SUCCESS(EQUITY_GET_ORDER_STOP_HISTORY),
      payload: olderOrderStopHistoryList.slice(),
    });
  }
}

function* handleSuccess(_response: IResponse<IEquityOrderStopResponse>, action: IAction<IEquityOrderStopModify>) {
  yield updateLocalStopOrder(action);
}

function* handleSuccessKIS(response: IResponse<IEquityOrderStopResponseKIS>, _action: IAction<IEquityOrderStopModify>) {
  if (response.data.success) yield put(updateCondOrderFilter({ pageNumber: 0 }));
  yield put(getOrderStopHistory({}));
}

function* handleFailed(action: IAction<IEquityOrderStopModify>, _error: any) {
  if (action.response) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
    // if (error.code) alertMessage('danger', error.code);
  }
}
