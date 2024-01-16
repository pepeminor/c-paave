import { EQUITY_ORDER, EQUITY_ORDER_SUCCESS } from '../../actions';
import { IAction, IResponse } from 'interfaces/common';
import { IEquityOrderResponse, IEquityOrderParams } from 'interfaces/equity';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { put, select } from 'redux-saga/effects';
import { setOrderBookScreenOption } from 'reduxs/global-actions';
import { ACCOUNT_TYPE, ITradeTabOption, OrderBookScreenInitOption } from 'global';
import { IState } from 'reduxs/global-reducers';
import { kisGetEqtEnquiryOrder } from 'reduxs/global-actions/KisServicesEqt';
import { getActiveOrder } from 'reduxs/global-actions';
import { setTradeTabOption } from '../../global-actions/Market';

function* handleSuccess(_response: IResponse<IEquityOrderResponse>, action: IAction<IEquityOrderParams>) {
  if (action.response) {
    yield put({
      type: action.response.success,
      hideLoading: true,
    });
  }
  yield put({
    type: EQUITY_ORDER_SUCCESS,
    hideLoading: true,
  });
  yield put(setOrderBookScreenOption(OrderBookScreenInitOption.ORDER_BOOK));
  const tradeTabOption: ITradeTabOption = yield select((state: IState) => state.tradeTabOption);
  const accountType: ACCOUNT_TYPE = yield select((state: IState) => state.selectedAccount.type);
  if (tradeTabOption === ITradeTabOption.ORDER_BOOK) {
    if (accountType === ACCOUNT_TYPE.KIS) {
      yield put(kisGetEqtEnquiryOrder(null));
    } else {
      yield put(getActiveOrder(null));
    }
  } else {
    yield put(setTradeTabOption(ITradeTabOption.ORDER_BOOK));
  }
  yield action.callBack?.handleSuccess && action.callBack.handleSuccess();
}

function* handleOrderLOFailed(action: IAction<IEquityOrderParams>) {
  if (action.response) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
  yield action.callBack?.handleFail && action.callBack.handleFail();
}

export default createNormalApiQuerySaga<IEquityOrderParams, IEquityOrderResponse>(
  APIList.orderLO,
  EQUITY_ORDER,
  handleSuccess,
  handleOrderLOFailed
);
