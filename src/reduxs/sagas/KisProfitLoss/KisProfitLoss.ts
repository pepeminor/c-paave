import { KIS_GET_PROFIT_LOSS, EQUITY_GET_PROFIT_LOSS } from '../../actions';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { put } from 'redux-saga/effects';
import { IKisProfitLossParams, IProfitLossResponse } from '../../../interfaces/equity';
import { SUCCESS, FAILURE } from '../../action-type-utils';

function* handleSuccess(response: IResponse<IProfitLossResponse>, action: IAction<IKisProfitLossParams>) {
  if (action.response != null && response.data != null) {
    yield put({
      type: SUCCESS(EQUITY_GET_PROFIT_LOSS),
      payload: response.data,
      hideLoading: true,
    });
  }
}

function* handleFailed(action: IAction<IKisProfitLossParams>) {
  if (action.response != null) {
    yield put({
      type: FAILURE(EQUITY_GET_PROFIT_LOSS),
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<IKisProfitLossParams, IProfitLossResponse>(
  APIList.getKisProfitLoss,
  KIS_GET_PROFIT_LOSS,
  handleSuccess,
  handleFailed
);
