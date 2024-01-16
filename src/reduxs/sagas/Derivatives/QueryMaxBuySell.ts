import { QUERY_MAX_BUY_SELL } from '../../actions';
import { IMaxBuySellRequest, IRequest, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { IMaxBuySellResponse } from 'interfaces/derivatives';
import { call, put, takeLeading } from 'redux-saga/effects';
import { queryKis } from 'utils';

const queryMaxBuySell = (params: IMaxBuySellRequest) => {
  return queryKis(APIList.getMaxBuySell, params);
};

function* doQueryMaxBuySell(request: IRequest<IMaxBuySellRequest>) {
  try {
    const response: IResponse<IMaxBuySellResponse> = yield call(queryMaxBuySell, request.payload);
    yield put({
      type: request.response.success,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: request.response.fail,
    });
  }
}

export default function* watchQueryDailyProfitLoss() {
  yield takeLeading(QUERY_MAX_BUY_SELL, doQueryMaxBuySell);
}
