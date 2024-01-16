import { EQUITY_CANCEL_MULTI_LO } from '../../actions';
import { IAction, IResponse } from 'interfaces/common';
import { ICancelMultiLOResponse, ICancelMultiLOParams } from 'interfaces/equity';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { put, select } from 'redux-saga/effects';
import { ALL_ORDER_STATUS_FILTER_VALUE } from 'global';
import { IOrderHistoryResponse } from '../../../interfaces/equity';
import { IState } from '../../global-reducers/index';
import { resetSelectedCancelList } from 'reduxs/global-actions';

function* handleCancelMultiLOSuccess(
  _response: IResponse<ICancelMultiLOResponse>, // wait to use with update message
  action: IAction<ICancelMultiLOParams>
) {
  const olderOrderHistoryList: IOrderHistoryResponse[] = yield select((state: IState) => state.ActiveOrder.data);

  action.payload.orderIds.forEach(item => {
    const orderStopIndex = olderOrderHistoryList.findIndex(data => item === Number(data.orderID));
    olderOrderHistoryList[orderStopIndex] = {
      ...olderOrderHistoryList[orderStopIndex],
      orderStatus: ALL_ORDER_STATUS_FILTER_VALUE.CANCELLED,
      cancellable: false,
      modifiable: false,
    };
  });

  yield action.response != null && put({ type: action.response.success });
  yield put(resetSelectedCancelList({ reset: true }));
  yield action.callBack?.handleSuccess && action.callBack.handleSuccess();
}

function* handleCancelMultiLOFailed(action: IAction<ICancelMultiLOParams>) {
  yield action.response != null && put({ type: action.response.fail });

  yield action.callBack?.handleFail && action.callBack.handleFail();
}

export default createNormalApiQuerySaga<ICancelMultiLOParams, ICancelMultiLOResponse>(
  APIList.cancelMultiLO,
  EQUITY_CANCEL_MULTI_LO,
  handleCancelMultiLOSuccess,
  handleCancelMultiLOFailed
);
