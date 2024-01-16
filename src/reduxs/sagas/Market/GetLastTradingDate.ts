import { MARKET_GET_LAST_TRADING_DATE } from './../../actions';
import { IAction, IResponse } from 'interfaces/common';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { ILastTradingDate } from 'interfaces/market';

function* handleSuccess(response: IResponse<ILastTradingDate>, action: IAction<null>) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
}

function* handleFail(action: IAction<null>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
    });
  }
}

export const watchGetLastTradingDate = createNormalApiQuerySaga<null, ILastTradingDate>(
  APIList.lastTradingDate,
  MARKET_GET_LAST_TRADING_DATE,
  handleSuccess,
  handleFail
);
