import APIList from 'config/api';
import { OrderBookScreenInitOption } from 'global';
import { IRealTradingEqtOrderParams } from 'interfaces/RealTrading';
import { IAction } from 'interfaces/common';
import { call, put, takeLeading } from 'redux-saga/effects';
import { REAL_TRADING_POST_EQT_ORDER } from 'reduxs/actions';
import { setOrderBookScreenOption } from 'reduxs/global-actions';
import { query, handleCommonSagaEffect } from 'utils';

function* handleOnOrderEquity(action: IAction<IRealTradingEqtOrderParams>) {
  try {
    yield action.payload.orderQuantity > 0 && call(query, APIList.postKisForwardEqtEnterOrder, action.payload);
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

export default function* watchOnOrderEquity() {
  yield takeLeading(REAL_TRADING_POST_EQT_ORDER, handleOnOrderEquity);
}
