import { EQUITY_GET_MOST_BOUGHT_STOCK } from 'reduxs/actions';
import { IAction, IResponse } from 'interfaces/common';
import { IMostBoughtStockParams, IMostBoughtStockResponse } from 'interfaces/equity';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';

function* handleSuccess(response: IResponse<IMostBoughtStockResponse>, action: IAction<IMostBoughtStockParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
}

function* handleFailed(action: IAction<IMostBoughtStockParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<IMostBoughtStockParams, IMostBoughtStockResponse>(
  APIList.getMostBoughtStock,
  EQUITY_GET_MOST_BOUGHT_STOCK,
  handleSuccess,
  handleFailed
);
