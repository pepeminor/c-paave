import { ORDER_QUERY_EQUITY_SELLABLE_INFO_ORDER_BOOK } from '../../actions';
import { IAction, IResponse } from 'interfaces/common';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import APIList from 'config/api';
import { IAccountSellable, IAccountSellableParams } from 'interfaces/market';
import { ACCOUNT_TYPE } from 'global';
import { IState } from 'reduxs/global-reducers';
import { query } from 'utils';

function* queryEquitySellable(action: IAction<IAccountSellableParams>) {
  const accountType: ACCOUNT_TYPE = yield select((state: IState) => state.selectedAccount.type);
  if (accountType === ACCOUNT_TYPE.DEMO) {
    yield put({
      type: action.response?.success,
      payload: {
        sellableQuantity: 0,
      },
    });
    return;
  }

  try {
    const response: IResponse<IAccountSellable> = yield call(query, APIList.equitySellable, action.payload);
    yield put({
      type: action.response?.success,
      payload: { ...response.data },
    });
  } catch (error) {
    yield put({
      type: action.response?.fail,
    });
  }
}

export default function* watchQueryEquitySellableOrderBook() {
  yield takeLeading(ORDER_QUERY_EQUITY_SELLABLE_INFO_ORDER_BOOK, queryEquitySellable);
}
