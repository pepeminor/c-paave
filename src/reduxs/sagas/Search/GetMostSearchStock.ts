import { SEARCH_GET_MOST_SEARCH_STOCK } from 'reduxs/actions';
import { IAction, IResponse } from 'interfaces/common';
import { IMostSearchStockResponse, IMostSearchStockParams } from 'interfaces/search';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';

function* handleSuccess(response: IResponse<IMostSearchStockResponse>, action: IAction<IMostSearchStockParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
}

function* handleFailed(action: IAction<IMostSearchStockParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<IMostSearchStockParams, IMostSearchStockResponse>(
  APIList.getMostSearchedStock,
  SEARCH_GET_MOST_SEARCH_STOCK,
  handleSuccess,
  handleFailed
);
