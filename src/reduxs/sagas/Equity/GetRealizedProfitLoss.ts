import { EQUITY_GET_REALIZED_PROFIT_LOSS } from '../../actions';
import { IRequest, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { IGetRealizedProfitLossParams, IGetRealizedProfitLossResponse } from 'interfaces/equity';
import { call, put, takeLatest } from 'redux-saga/effects';
import { query } from 'utils';
const getRealizedProfitLoss = (params: IGetRealizedProfitLossParams) => {
  return query(APIList.getRealizedProfitLoss, params);
};

function* doGetRealizedProfitLoss(request: IRequest<IGetRealizedProfitLossParams>) {
  try {
    const response: IResponse<IGetRealizedProfitLossResponse[]> = yield call(getRealizedProfitLoss, request.payload);
    yield put({
      type: request.response.success,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: request.response.fail,
      hideLoading: true,
    });
  }
}

export default function* watchGetDailyProfitLoss() {
  yield takeLatest(EQUITY_GET_REALIZED_PROFIT_LOSS, doGetRealizedProfitLoss);
}
