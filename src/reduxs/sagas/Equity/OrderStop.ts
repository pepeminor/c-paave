import { EQUITY_ORDER_STOP } from 'reduxs/actions';
import { IAction, IResponse } from 'interfaces/common';
import { IEquityOrderStopParams, IEquityOrderStopResponse } from 'interfaces/equity';
import APIList from 'config/api';
import { createApiQuerySaga } from 'utils';
import { getOrderStopHistory } from 'reduxs/global-actions/Equity';
import { put, select } from 'redux-saga/effects';
import { setOrderBookScreenOption } from 'reduxs/global-actions';
import { ACCOUNT_TYPE, OrderBookScreenInitOption } from 'global';
import { ITradeTabOption } from '../../../global/index';
import { setTradeTabOption } from '../../global-actions/Market';
import { IState } from 'reduxs/global-reducers';
import { DOMAIN_KIS, DOMAIN_PAAVE } from 'interfaces/apis/Domain';

export default createApiQuerySaga(EQUITY_ORDER_STOP, {
  [DOMAIN_PAAVE]: {
    api: APIList.orderStop,
    callbackSuccess: handleSuccess,
    callbackFail: handleFailed,
  },
  [DOMAIN_KIS]: {
    api: APIList.orderStopKIS,
    provider: ACCOUNT_TYPE.VIRTUAL,
    callbackSuccess: handleSuccess,
    callbackFail: handleFailed,
    accountNumberRequired: true,
    otpTokenRequired: true,
    mapSchema: {
      stockCode: 'code',
    },
  },
});

function* handleSuccess(_response: IResponse<IEquityOrderStopResponse>, action: IAction<IEquityOrderStopParams>) {
  if (action.response) {
    yield put({
      type: action.response.success,
      hideLoading: true,
    });
  }
  yield put(setOrderBookScreenOption(OrderBookScreenInitOption.CONDITION_ORDER));
  const tradeTabOption: ITradeTabOption = yield select((state: IState) => state.tradeTabOption);
  if (tradeTabOption === ITradeTabOption.CONDITION_ORDER) {
    yield put(getOrderStopHistory(null));
  } else {
    yield put(setTradeTabOption(ITradeTabOption.CONDITION_ORDER));
  }
  yield action.callBack?.handleSuccess && action.callBack.handleSuccess();
}

function* handleFailed(action: IAction<IEquityOrderStopParams>) {
  if (action.response) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
  yield action.callBack?.handleFail && action.callBack.handleFail();
}
