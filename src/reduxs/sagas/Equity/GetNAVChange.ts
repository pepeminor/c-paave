import { EQUITY_GET_NAV_CHANGE } from '../../actions';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { IDailyProfitLossResponse, IGetDailyProfitLossParams } from 'interfaces/equity';
import { createApiQuerySaga } from 'utils';
import { put } from 'redux-saga/effects';
import { ACCOUNT_TYPE } from 'global';

export default createApiQuerySaga(EQUITY_GET_NAV_CHANGE, {
  [ACCOUNT_TYPE.VIRTUAL]: {
    api: APIList.getDailyProfitLoss,
    callbackSuccess: handleGetNAVChangeSuccess,
    callbackFail: handleGetNAVChangeFailed,
  },
  [ACCOUNT_TYPE.KIS]: {
    api: APIList.getDailyProfitLossForKis,
    provider: ACCOUNT_TYPE.VIRTUAL,
    callbackSuccess: handleGetNAVChangeSuccess,
    callbackFail: handleGetNAVChangeFailed,
    subAccountRequired: true,
  },
});

function* handleGetNAVChangeSuccess(
  response: IResponse<IDailyProfitLossResponse>,
  action: IAction<IGetDailyProfitLossParams>
) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: { ...response.data, dailyProfitLosses: response.data.dailyProfitLosses.reverse() },
    });
  }
}

function* handleGetNAVChangeFailed(action: IAction<IGetDailyProfitLossParams>) {
  if (action.response) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}
