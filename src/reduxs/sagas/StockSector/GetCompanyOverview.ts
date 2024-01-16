import { STOCKSECTOR_GET_COMPANY_OVERVIEW } from 'reduxs/actions';
import { IAction, IResponse } from 'interfaces/common';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { ICompanyOverviewResponse, ICompanyOverviewParams } from 'interfaces/stockSector';

function* handleSuccess(response: IResponse<ICompanyOverviewResponse>, action: IAction<ICompanyOverviewParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
}

function* handleFailed(action: IAction<ICompanyOverviewParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<ICompanyOverviewParams, ICompanyOverviewResponse>(
  APIList.getCompanyOverview,
  STOCKSECTOR_GET_COMPANY_OVERVIEW,
  handleSuccess,
  handleFailed
);
