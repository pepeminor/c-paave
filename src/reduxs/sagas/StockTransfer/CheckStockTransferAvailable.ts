import { IAction, IResponse } from 'interfaces/common';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { STOCK_TRANSFER_CHECK_TRANSFER_TIME } from '../../actions';
import {
  ICheckTimeStockTransferAvailableParams,
  ICheckTimeStockTransferAvailableResponse,
} from '../../../interfaces/stockTransfer';

function* handleSuccess(
  response: IResponse<ICheckTimeStockTransferAvailableResponse>,
  action: IAction<ICheckTimeStockTransferAvailableParams>
) {
  if (action.response != null) {
    if (response.data.result === 'SUCCESS')
      yield put({
        type: action.response.success,
      });
  }
}

function* handleFailed(action: IAction<ICheckTimeStockTransferAvailableParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<
  ICheckTimeStockTransferAvailableParams,
  ICheckTimeStockTransferAvailableResponse
>(
  APIList.getTimeStockTransferAvailable,
  STOCK_TRANSFER_CHECK_TRANSFER_TIME,
  handleSuccess,
  handleFailed,
  undefined,
  true
);
