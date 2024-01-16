import { EQUITY_GET_FOLLOWING_PROFIT_LOSS } from '../../actions';
import { IResponse, IRequest } from 'interfaces/common';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { IProfitLossResponse } from 'interfaces/equity';
import { FulfilledRequestError, alertMessage, query } from 'utils';
import { call, takeLeading } from 'redux-saga/effects';
import { ERROR } from 'constants/error';

const getFollowingProfitLoss = (params: null) => {
  return query(APIList.getFollowingProfitLoss, params);
};

function* doGetFollowingProfitLoss(request: IRequest<null>) {
  try {
    const response: IResponse<IProfitLossResponse> = yield call(getFollowingProfitLoss, request.payload);
    yield put({
      type: request.response.success,
      payload: response.data,
    });
  } catch (err: any) {
    yield put({
      type: request.response.fail,
      hideLoading: true,
    });
    if (err instanceof FulfilledRequestError) {
      if (err.data.code === ERROR.NET_ASSET_NOT_FOUND) {
        alertMessage('warning', ERROR.NET_ASSET_NOT_FOUND);
      }
    }
  }
}

export default function* watchGetFollowingProfitLoss() {
  yield takeLeading(EQUITY_GET_FOLLOWING_PROFIT_LOSS, doGetFollowingProfitLoss);
}
