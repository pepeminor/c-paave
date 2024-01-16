import { SEARCH_PUT_INCREASE } from 'reduxs/actions';
import { IAction, IResponse } from 'interfaces/common';
import { IIncreaseSearchResponse, IIncreaseSearchParams } from 'interfaces/search';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';

function* handleSuccess(response: IResponse<IIncreaseSearchResponse>, action: IAction<IIncreaseSearchParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
}

function* handleFailed(action: IAction<IIncreaseSearchParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<IIncreaseSearchParams, IIncreaseSearchResponse>(
  APIList.putIncrease,
  SEARCH_PUT_INCREASE,
  handleSuccess,
  handleFailed
);
