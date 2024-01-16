import { MARKET_GET_SYMBOL_QUOTE_MINUTES } from './../../actions';
import { IAction, IResponse } from 'interfaces/common';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { ISymbolQuoteMinutes, ISymbolQuoteMinutesParams } from 'interfaces/market';

function* handleSuccess(response: IResponse<ISymbolQuoteMinutes>, action: IAction<ISymbolQuoteMinutesParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: { ...response.data, code: action.payload.symbol },
    });
  }
}

function* handleFail(action: IAction<ISymbolQuoteMinutesParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
      payload: { code: action.payload.symbol },
    });
  }
}

export default createNormalApiQuerySaga<ISymbolQuoteMinutesParams, ISymbolQuoteMinutes>(
  APIList.symbolQuoteMinutes,
  MARKET_GET_SYMBOL_QUOTE_MINUTES,
  handleSuccess,
  handleFail,
  true
);
