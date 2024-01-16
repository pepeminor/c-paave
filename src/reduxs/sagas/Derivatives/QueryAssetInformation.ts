import { QUERRY_ASSET_INFO_DER_DATA } from '../../actions';
import {
  IDerivativesPurchasingPowerRequest,
  IDerivativesPurchasingPowerResponse,
  IRequest,
  IResponse,
} from 'interfaces/common';
import APIList from 'config/api';
import { call, put, takeEvery } from 'redux-saga/effects';
import { queryKis } from 'utils';

const queryAssetInforMation = (params: IDerivativesPurchasingPowerRequest) => {
  return queryKis(APIList.getDerivativesPurchasingPower, params);
};

function* doQueryAssetInformation(request: IRequest<IDerivativesPurchasingPowerRequest>) {
  try {
    const response: IResponse<IDerivativesPurchasingPowerResponse> = yield call(queryAssetInforMation, request.payload);

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
  yield takeEvery(QUERRY_ASSET_INFO_DER_DATA, doQueryAssetInformation);
}
