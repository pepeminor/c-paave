import APIList from 'config/api';
import { ISpecialPriceType } from 'constants/enum';
import { OrderBookScreenInitOption } from 'global';
import { IRealTradingEqtOrderParams } from 'interfaces/RealTrading';
import { IAction } from 'interfaces/common';
import { all, call, put, takeLeading } from 'redux-saga/effects';
import { RESET } from 'reduxs/action-type-utils';
import {
  REAL_TRADING_POST_EQT_ORDER_LO_STATUS,
  REAL_TRADING_POST_EQT_ORDER_ODD_LOT,
  REAL_TRADING_POST_EQT_ORDER_ODD_LOT_STATUS,
  REAL_TRADING_POST_EQT_ORDER_ODD_LOT_MODAL,
} from 'reduxs/actions';
import { setOrderBookScreenOption } from 'reduxs/global-actions';
import { query, handleCommonSagaEffect } from 'utils';

function* handleCallOddLot(props: IRealTradingEqtOrderParams) {
  try {
    yield call(query, APIList.postKisForwardEqtEnterOrder, props);
    yield put({
      payload: { quantity: props.orderQuantity, status: true },
      type: REAL_TRADING_POST_EQT_ORDER_ODD_LOT_STATUS,
    });
  } catch {
    yield put({
      payload: { quantity: props.orderQuantity, status: false },
      type: REAL_TRADING_POST_EQT_ORDER_ODD_LOT_STATUS,
    });
    yield put({
      type: REAL_TRADING_POST_EQT_ORDER_ODD_LOT_MODAL,
    });
  }
}

function* handleCallLo(props: IRealTradingEqtOrderParams) {
  try {
    yield call(query, APIList.postKisForwardEqtEnterOrder, props);
    yield put({
      payload: { quantity: props.orderQuantity, status: true },
      type: REAL_TRADING_POST_EQT_ORDER_LO_STATUS,
    });
  } catch {
    yield put({
      payload: { quantity: props.orderQuantity, status: false },
      type: REAL_TRADING_POST_EQT_ORDER_LO_STATUS,
    });
    yield put({
      type: REAL_TRADING_POST_EQT_ORDER_ODD_LOT_MODAL,
    });
  }
}

function* handleOnOrderEquityOddLot(action: IAction<IRealTradingEqtOrderParams>) {
  try {
    const oddLotQuantity = action.payload.orderQuantity % 100;
    const paramsOddLot = {
      ...action.payload,
      orderQuantity: oddLotQuantity,
    };
    if (action.payload.orderQuantity > 100) {
      const paramsLo = {
        ...action.payload,
        orderQuantity: action.payload.orderQuantity - oddLotQuantity,
        orderType: ISpecialPriceType.LO,
      };
      // wait for all api call to let the saga catch the error on which one failed or both
      yield all([handleCallOddLot(paramsOddLot), handleCallLo(paramsLo)]);
    } else {
      yield call(query, APIList.postKisForwardEqtEnterOrder, paramsOddLot);
    }

    yield action.response != null &&
      put({
        type: action.response.success,
      });
    yield put(setOrderBookScreenOption(OrderBookScreenInitOption.ORDER_BOOK));

    yield put({
      type: RESET(REAL_TRADING_POST_EQT_ORDER_ODD_LOT_MODAL),
    });

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

export default function* watchOnOrderEquityOddLot() {
  yield takeLeading(REAL_TRADING_POST_EQT_ORDER_ODD_LOT, handleOnOrderEquityOddLot);
}
