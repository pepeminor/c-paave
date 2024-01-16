import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import { IKisGetEqtGenBuyAllResponses, IKisGetEqtGenBuyAllParams } from 'interfaces/services';
import { call, put, takeEvery } from 'redux-saga/effects';
import { SERVICE_GET_EQUITY_GEN_BUY_ALL_ORDER_BOOK } from 'reduxs/actions';
import { queryKis } from 'utils';

function* sagaHandling(action: IAction<IKisGetEqtGenBuyAllParams>) {
  try {
    const response: IResponse<IKisGetEqtGenBuyAllResponses> = yield call(
      queryKis,
      APIList.getKisEqtGenBuyAll,
      action.payload
    );

    yield action.response != null &&
      put({
        type: action.response.success,
        payload: response.data,
      });
  } catch (err) {
    // const error: IError = err as IError;
    // console.error('Query eqt gen buy all failed', error);
    // alertMessage('danger', 'Get enquiry available quantity failed', error.code);
    yield action.response != null && put({ type: action.response.fail });
  }
}

export default function* watchOnGetEquityGenBuyAllOrderBook() {
  yield takeEvery(SERVICE_GET_EQUITY_GEN_BUY_ALL_ORDER_BOOK, sagaHandling);
}
