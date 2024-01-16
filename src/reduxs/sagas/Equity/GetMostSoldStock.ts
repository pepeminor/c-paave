import { EQUITY_GET_MOST_SOLD_STOCK } from 'reduxs/actions';
import { IAction, IResponse } from 'interfaces/common';
import { IMostSoldStockParams, IMostSoldStockResponse } from 'interfaces/equity';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';

function* handleSuccess(response: IResponse<IMostSoldStockResponse>, action: IAction<IMostSoldStockParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
}

function* handleFailed(action: IAction<IMostSoldStockParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<IMostSoldStockParams, IMostSoldStockResponse>(
  APIList.getMostSoldStock,
  EQUITY_GET_MOST_SOLD_STOCK,
  handleSuccess,
  handleFailed
);
