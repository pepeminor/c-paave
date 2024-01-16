import { IAction, IResponse } from 'interfaces/common';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { STOCK_TRANSFER_HISTORY_TRANSFER } from '../../actions';
import {
  IQueryStockTransferHistoryResponse,
  IQueryStockTransferHistoryParams,
} from '../../../interfaces/stockTransfer';

function* handleSuccess(
  response: IResponse<IQueryStockTransferHistoryResponse[]>,
  action: IAction<IQueryStockTransferHistoryParams>
) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
}

function* handleFailed(action: IAction<IQueryStockTransferHistoryParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<IQueryStockTransferHistoryParams, IQueryStockTransferHistoryResponse[]>(
  APIList.getStockTransferHistory,
  STOCK_TRANSFER_HISTORY_TRANSFER,
  handleSuccess,
  handleFailed,
  undefined,
  true
);
