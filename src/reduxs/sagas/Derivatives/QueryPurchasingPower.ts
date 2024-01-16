import { QUERY_DERIVATIVES_PURCHASING_POWER } from '../../actions';
import {
  IDerivativesPurchasingPowerRequest,
  IDerivativesPurchasingPowerResponse,
  IRequest,
  IResponse,
} from 'interfaces/common';
import APIList from 'config/api';
import { call, put, takeEvery } from 'redux-saga/effects';
import { queryKis } from 'utils';

const queryPurchasingPower = (params: IDerivativesPurchasingPowerRequest) => {
  return queryKis(APIList.getDerivativesPurchasingPower, params);
};

function* doQueryPurchasingPower(request: IRequest<IDerivativesPurchasingPowerRequest>) {
  try {
    const response: IResponse<IDerivativesPurchasingPowerResponse> = yield call(queryPurchasingPower, request.payload);
    yield put({
      type: request.response.success,
      payload: Math.min(response.data.cashInformation.exchange.EE, response.data.cashInformation.internal.EE),
    });
  } catch (err) {
    yield put({
      type: request.response.fail,
    });
  }
}

export default function* watchQueryDailyProfitLoss() {
  yield takeEvery(QUERY_DERIVATIVES_PURCHASING_POWER, doQueryPurchasingPower);
}
