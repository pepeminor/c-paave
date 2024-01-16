import { call, put, takeLeading } from 'redux-saga/effects';
import { OVERVIEW_FOREIGN_TRADE } from 'reduxs/actions';
import { IAction, IResponse } from 'interfaces/common';
import { IForeignTradeParams, IForeignTradeResponse } from 'interfaces/finance';
import { query } from 'utils';
import APIList from 'config/api';

function* queryForeignTradeData(action: IAction<IForeignTradeParams>) {
  try {
    const response: IResponse<IForeignTradeResponse> = yield call(query, APIList.getForeignTrade, action.payload);
    yield put({
      type: action.response?.success,
      payload: {
        foreignTradeDtoList: response.data.foreignTradeDtoList.slice(0, 9).reverse(),
        foreignTradeDtoListForLast29Days: response.data.foreignTradeDtoList.slice(0, 29).reverse(),
      },
    });
  } catch (e) {
    yield put({
      type: action.response?.fail,
    });
  }
}

export default function* watchGetForeignTrade() {
  yield takeLeading(OVERVIEW_FOREIGN_TRADE, queryForeignTradeData);
}
