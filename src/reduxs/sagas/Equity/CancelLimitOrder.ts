import { CANCEL_ORDERBOOK_SUCCESS_TRIGGER, EQUITY_CANCEL_LO } from './../../actions';
import { IAction, IResponse } from 'interfaces/common';
import { ICancelLOResponse, ICancelLOParams } from 'interfaces/equity';
import { put, select } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { ALL_ORDER_STATUS_FILTER_VALUE } from 'global';
import { IOrderHistoryResponse } from '../../../interfaces/equity';
import { IState } from '../../global-reducers/index';
import { SUCCESS } from '../../action-type-utils';
import { EQUITY_GET_ACTIVE_ORDER } from '../../actions';
import { resetSelectedCancelList } from 'reduxs/global-actions';

function* handlePostCancelLOSuccess(_response: IResponse<ICancelLOResponse>, action: IAction<ICancelLOParams>) {
  const olderOrderHistoryList: IOrderHistoryResponse[] = yield select((state: IState) => state.ActiveOrder.data);
  if (olderOrderHistoryList != null) {
    const orderModifiedItemIndex = olderOrderHistoryList.findIndex(
      item => Number(item.orderID) === action.payload.orderId
    );
    olderOrderHistoryList[orderModifiedItemIndex] = {
      ...olderOrderHistoryList[orderModifiedItemIndex],
      orderStatus: ALL_ORDER_STATUS_FILTER_VALUE.CANCELLED,
      cancellable: false,
      modifiable: false,
    };
    yield put({
      type: SUCCESS(EQUITY_GET_ACTIVE_ORDER),
      payload: olderOrderHistoryList.slice(),
    });
    yield put({
      type: CANCEL_ORDERBOOK_SUCCESS_TRIGGER,
    });
    yield put(resetSelectedCancelList({ reset: true }));
  }
}

function* handlePostCancelLOFail(action: IAction<ICancelLOParams>) {
  yield put({
    type: action.response?.fail,
  });
}

export default createNormalApiQuerySaga<ICancelLOParams, ICancelLOResponse>(
  APIList.cancelLO,
  EQUITY_CANCEL_LO,
  handlePostCancelLOSuccess,
  handlePostCancelLOFail
);
