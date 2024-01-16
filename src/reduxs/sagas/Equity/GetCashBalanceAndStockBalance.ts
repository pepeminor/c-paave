import { put, call, takeLatest } from 'redux-saga/effects';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { queryKis } from 'utils';
import { EQUITY_GET_CASH_BALANCE_AND_STOCK_BALANCE } from 'reduxs/actions';
import { IGetCashAndStockBalanceParams, IGetCashAndStockBalanceResponse } from 'interfaces/equity';
const getCashAndStockBalance = (params: IGetCashAndStockBalanceParams) => {
  return queryKis(APIList.getCashBalanceAndStockBalanceForKis, params);
};

function* doGetCashBalanceAndStockBalance(request: IAction<IGetCashAndStockBalanceParams>) {
  try {
    const response: IResponse<IGetCashAndStockBalanceResponse> = yield call(getCashAndStockBalance, request.payload);

    if (request.response != null) {
      yield put({
        type: request.response.success,
        payload: response.data,
        hideLoading: true,
      });
    }
  } catch (error) {
    if (request.response != null) {
      yield put({
        type: request.response.fail,
        hideLoading: true,
      });
    }
    // alertMessage('danger', 'get cash balance and stock balance', error.code ?? error.message);
  }
}

export default function* watchGetCashBalanceAndStockBalance() {
  yield takeLatest(EQUITY_GET_CASH_BALANCE_AND_STOCK_BALANCE, doGetCashBalanceAndStockBalance);
}
