import { put, call, takeLeading } from 'redux-saga/effects';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { queryKis } from 'utils';
import { EQUITY_GET_ACCOUNT_BALANCE } from 'reduxs/actions';
import { IGetCashAndStockBalanceParams, IGetAccountBalanceResponse } from 'interfaces/equity';

const getAccountBalanceForKis = (params: IGetCashAndStockBalanceParams) => {
  return queryKis(APIList.getAccountBalanceForKis, params);
};

function* doGetAccountBalance(request: IAction<IGetCashAndStockBalanceParams>) {
  try {
    const response: IResponse<IGetAccountBalanceResponse> = yield call(getAccountBalanceForKis, request.payload);

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
    // alertMessage('danger', 'get account balance', error.code ?? error.message);
  }
}

export default function* watchGetAccountBalance() {
  yield takeLeading(EQUITY_GET_ACCOUNT_BALANCE, doGetAccountBalance);
}
