import { IAction, IResponse } from 'interfaces/common';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { STOCK_TRANSFER_LIST_INSTRUMENT_PORTFOLIO } from '../../actions';
import {
  IQueryListInstrumentPortfolioParams,
  IQueryListInstrumentPortfolioResponse,
} from '../../../interfaces/stockTransfer';

function* handleSuccess(
  response: IResponse<IQueryListInstrumentPortfolioResponse[]>,
  action: IAction<IQueryListInstrumentPortfolioParams>
) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
}

function* handleFailed(action: IAction<IQueryListInstrumentPortfolioParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<IQueryListInstrumentPortfolioParams, IQueryListInstrumentPortfolioResponse[]>(
  APIList.getListInstrumentPortfolio,
  STOCK_TRANSFER_LIST_INSTRUMENT_PORTFOLIO,
  handleSuccess,
  handleFailed,
  undefined,
  true
);
