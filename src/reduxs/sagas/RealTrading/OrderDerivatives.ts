import APIList from 'config/api';
import { OrderBookScreenInitOption } from 'global';
import { IAction } from 'interfaces/common';
import { IRealTradingDerOrderParams } from 'interfaces/RealTrading';
import { call, put, takeLeading } from 'redux-saga/effects';
import { REAL_TRADING_POST_DER_ORDER } from 'reduxs/actions';
import { setOrderBookScreenOption } from 'reduxs/global-actions';
import { query, handleCommonSagaEffect } from 'utils';

function* handleOnOrderDerivatives(action: IAction<IRealTradingDerOrderParams>) {
  try {
    const params = action.payload;
    yield call(query, APIList.postKisForwardDerEnterOrder, params);
    yield action.response != null &&
      put({
        type: action.response.success,
      });
    yield put(setOrderBookScreenOption(OrderBookScreenInitOption.ORDER_BOOK));

    handleCommonSagaEffect(action);
    yield action.callBack?.handleSuccess != null && action.callBack.handleSuccess();
  } catch (err) {
    yield action.response != null &&
      put({
        type: action.response.fail,
      });
    yield action.callBack?.handleFail != null && action.callBack.handleFail();
  }
}

export default function* watchOnOrderDerivatives() {
  yield takeLeading(REAL_TRADING_POST_DER_ORDER, handleOnOrderDerivatives);
}
