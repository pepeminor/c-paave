import { EQUITY_GET_PROFIT_LOSS } from '../../actions';
import { IAction, IResponse } from 'interfaces/common';
import { IProfitLossResponse } from 'interfaces/equity';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';

function* handleGetProfitLossSuccess(response: IResponse<IProfitLossResponse>, action: IAction<null>) {
  if (action.response && response.data) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
}

export default createNormalApiQuerySaga<null, IProfitLossResponse>(
  APIList.getProfitLoss,
  EQUITY_GET_PROFIT_LOSS,
  handleGetProfitLossSuccess
);
