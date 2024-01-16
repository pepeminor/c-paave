import { EQUITY_GET_ACCUMULATIVE_NAV } from 'reduxs/actions';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { IDailyProfitLossResponse, IGetDailyProfitLossParams } from 'interfaces/equity';
import { createApiQuerySaga } from 'utils';
import { put } from 'redux-saga/effects';
import { ACCOUNT_TYPE } from 'global';

export default createApiQuerySaga(EQUITY_GET_ACCUMULATIVE_NAV, {
  [ACCOUNT_TYPE.VIRTUAL]: {
    api: APIList.getAccumulatedProfitLoss,
    callbackSuccess: handleAccumulativeNAVSuccess,
    callbackFail: handleAccumulativeNAVFailed,
  },
  [ACCOUNT_TYPE.KIS]: {
    api: APIList.getKisAccumulatedProfitLoss,
    provider: ACCOUNT_TYPE.VIRTUAL,
    callbackSuccess: handleAccumulativeNAVSuccess,
    callbackFail: handleAccumulativeNAVFailed,
  },
});

function* handleAccumulativeNAVSuccess(
  response: IResponse<IDailyProfitLossResponse>,
  action: IAction<IGetDailyProfitLossParams>
) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
}

function* handleAccumulativeNAVFailed(action: IAction<IGetDailyProfitLossParams>) {
  if (action.response) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}
