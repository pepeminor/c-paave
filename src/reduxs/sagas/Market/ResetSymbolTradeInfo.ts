import {
  RESET_SYMBOL_TRADE_INFO,
  ORDER_QUERY_EQUITY_BUYABLE_INFO,
  ORDER_QUERY_EQUITY_SELLABLE_INFO,
  SERVICE_GET_EQUITY_STOCK_INFO,
  SERVICE_GET_EQUITY_ASSET_INFO,
  SERVICE_GET_EQUITY_GEN_BUY_ALL,
  SERVICE_GET_EQUITY_ASSET_INFO_ORDER_BOOK,
  SERVICE_GET_EQUITY_STOCK_INFO_ORDER_BOOK,
  SERVICE_GET_EQUITY_GEN_BUY_ALL_ORDER_BOOK,
} from '../../actions';
import { put, takeLeading } from 'redux-saga/effects';
import { RESET } from '../../action-type-utils';

function* resetSymbolTradeInfo() {
  yield put({
    type: RESET(ORDER_QUERY_EQUITY_BUYABLE_INFO),
  });

  yield put({
    type: RESET(ORDER_QUERY_EQUITY_SELLABLE_INFO),
  });

  yield put({
    type: RESET(SERVICE_GET_EQUITY_STOCK_INFO),
  });

  yield put({
    type: RESET(SERVICE_GET_EQUITY_ASSET_INFO),
  });

  yield put({
    type: RESET(SERVICE_GET_EQUITY_GEN_BUY_ALL),
  });

  yield put({
    type: RESET(SERVICE_GET_EQUITY_ASSET_INFO_ORDER_BOOK),
  });

  yield put({
    type: RESET(SERVICE_GET_EQUITY_STOCK_INFO_ORDER_BOOK),
  });

  yield put({
    type: RESET(SERVICE_GET_EQUITY_GEN_BUY_ALL_ORDER_BOOK),
  });
}

export default function* watchResetSymbolTradeInfo() {
  yield takeLeading(RESET_SYMBOL_TRADE_INFO, resetSymbolTradeInfo);
}
