import { EQUITY_GET_ORDER_STOP_HISTORY, EQUITY_ORDER_STOP_CANCEL_MULTI } from 'reduxs/actions';
import { IAction, IResponse } from 'interfaces/common';
import { IEquityOrderStopCancelMulti, IEquityOrderStopCancelMultiResponse } from 'interfaces/equity';
import { put, select } from 'redux-saga/effects';
import APIList from 'config/api';
import { SUCCESS } from 'reduxs/action-type-utils';
import { ALL_ORDER_STATUS_FILTER_VALUE } from 'global';
import { IOrderStopHistoryResponse } from '../../../interfaces/equity';
import { IState } from '../../global-reducers/index';
import { createApiQuerySaga } from 'utils';
import { resetSelectedCancelList, updateCondOrderFilter } from 'reduxs/global-actions';
import { DOMAIN_KIS, DOMAIN_PAAVE } from 'interfaces/apis/Domain';

export default createApiQuerySaga(EQUITY_ORDER_STOP_CANCEL_MULTI, {
  [DOMAIN_PAAVE]: {
    api: APIList.orderStopCancelMulti,
    callbackSuccess: handleSuccess,
    callbackFail: handleFailed,
  },
  [DOMAIN_KIS]: {
    api: APIList.orderStopCancelMultiKIS,
    callbackSuccess: handleSuccessKIS,
    callbackFail: handleFailed,
    mapSchema: {
      stopOrderIds: 'idList',
    },
    otpTokenRequired: true,
  },
});

function* handleSuccess(
  _response: IResponse<IEquityOrderStopCancelMultiResponse>, // wait to use with update message
  action: IAction<IEquityOrderStopCancelMulti>
) {
  const olderOrderStopHistoryList: IOrderStopHistoryResponse[] = yield select(
    (state: IState) => state.OrderStopHistory.data
  );

  action.payload.stopOrderIds.forEach(item => {
    const orderStopIndex = olderOrderStopHistoryList.findIndex(data => item === Number(data.stopOrderID));
    olderOrderStopHistoryList[orderStopIndex] = {
      ...olderOrderStopHistoryList[orderStopIndex],
      status: ALL_ORDER_STATUS_FILTER_VALUE.CANCELLED,
      cancellable: false,
      modifiable: false,
    };
  });

  yield put({
    type: SUCCESS(EQUITY_GET_ORDER_STOP_HISTORY),
    payload: olderOrderStopHistoryList,
  });
  yield put(resetSelectedCancelList({ reset: true }));
}

function* handleSuccessKIS(
  _response: IResponse<IEquityOrderStopCancelMultiResponse>, // wait to use with update message
  _action: IAction<IEquityOrderStopCancelMulti>
) {
  yield put(updateCondOrderFilter({ pageNumber: 0 }));
  yield put(resetSelectedCancelList({ reset: true }));
}

function* handleFailed(action: IAction<IEquityOrderStopCancelMulti>, _error: any) {
  if (action.response) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
    // if (error.code) alertMessage('danger', error.code);
  }
}
