import { ORDER_QUERY_EQUITY_BUYABLE_INFO_ORDER_BOOK } from '../../actions';
import { IAction, IResponse } from 'interfaces/common';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import APIList from 'config/api';
import { IAccountBuyable, IAccountBuyableParams } from 'interfaces/market';
import { query } from 'utils';
import { ACCOUNT_TYPE } from 'global';
import { IState } from 'reduxs/global-reducers';

function* queryEquityBuyable(action: IAction<IAccountBuyableParams>) {
  const accountType: ACCOUNT_TYPE = yield select((state: IState) => state.selectedAccount.type);
  if (accountType === ACCOUNT_TYPE.DEMO) {
    yield put({
      type: action.response?.success,
      payload: {
        buyingPower: 500000000,
        buyableQuantity: 500000000,
      },
    });
    return;
  }

  try {
    const response: IResponse<IAccountBuyable> = yield call(query, APIList.equityBuyable, action.payload);
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

export default function* watchQueryEquityBuyableOrderBook() {
  yield takeLeading(ORDER_QUERY_EQUITY_BUYABLE_INFO_ORDER_BOOK, queryEquityBuyable);
}
