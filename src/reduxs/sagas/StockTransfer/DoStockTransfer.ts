import { IAction, IResponse } from 'interfaces/common';
import { put, takeLeading, call } from 'redux-saga/effects';
import APIList from 'config/api';
import { IPostDoStockTransferParams, IPostDoStockTransferResponse } from '../../../interfaces/stockTransfer';
import { STOCK_TRANSFER_DO_TRANSFER_STOCK } from '../../actions';
import { queryKis, alertMessage } from 'utils';

function* doStockTransfer(request: IAction<IPostDoStockTransferParams>) {
  try {
    const response: IResponse<IPostDoStockTransferResponse> = yield call(
      queryKis,
      APIList.postDoStockTransfer,
      request.payload
    );

    if (request.response != null) {
      if (response.data.result === 'success') {
        yield put({
          type: request.response.success,
        });
      }
      alertMessage('success', 'Stock Transfer', 'Stock Transfer Success');
    }
  } catch (error) {
    if (request.response != null) {
      yield put({
        type: request.response.fail,
        hideLoading: true,
      });
    }
    // alertMessage('danger', 'do fund transfer', error.code ?? error.message);
  }
}

export default function* watchDoStockTransfer() {
  yield takeLeading(STOCK_TRANSFER_DO_TRANSFER_STOCK, doStockTransfer);
}
