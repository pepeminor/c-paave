import { EQUITY_GET_EVENT_BY_STOCK } from '../../actions';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { IEventByStockResponse, IEventByStockParams } from 'interfaces/equity';
import { createNormalApiQuerySaga } from 'utils';
import { put } from 'redux-saga/effects';

function* handleSuccess(response: IResponse<IEventByStockResponse>, action: IAction<IEventByStockParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
}

function* handleFailed(action: IAction<IEventByStockParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<IEventByStockParams, IEventByStockResponse>(
  APIList.getEventByStock,
  EQUITY_GET_EVENT_BY_STOCK,
  handleSuccess,
  handleFailed
);
