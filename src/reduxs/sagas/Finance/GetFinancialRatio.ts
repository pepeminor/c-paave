import { FINANCE_GET_FINANCIAL_RATIO } from '../../actions';
import { IAction, IResponse } from 'interfaces/common';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { IFinancialRatioResponse, IFinancialRatioParams } from '../../../interfaces/finance';

function* handleSuccess(response: IResponse<IFinancialRatioResponse>, action: IAction<IFinancialRatioParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
}

function* handleFail(action: IAction<IFinancialRatioParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
    });
  }
}

export default createNormalApiQuerySaga<IFinancialRatioParams, IFinancialRatioResponse>(
  APIList.getFinancialRatio,
  FINANCE_GET_FINANCIAL_RATIO,
  handleSuccess,
  handleFail
);
