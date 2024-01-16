import APIList from 'config/api';
import { ACCOUNT_TYPE, SELL_BUY_TYPE } from 'global';
import { IAccount, IAction, IResponse } from 'interfaces/common';
import { IKisGetEqtStockInfoResponse, IKisGetEqtStockInfoParams } from 'interfaces/services';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { SERVICE_GET_EQUITY_STOCK_INFO } from 'reduxs/actions';
import { kisGetEqtEnquiryPortfolio } from 'reduxs/global-actions';
import { IState } from 'reduxs/global-reducers';
import { queryKis } from 'utils';

function* sagaHandling(action: IAction<IKisGetEqtStockInfoParams>) {
  const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);

  if (
    selectedAccount.type === ACCOUNT_TYPE.KIS &&
    selectedAccount.username != null &&
    selectedAccount.selectedSubAccount != null
  ) {
    try {
      const response: IResponse<IKisGetEqtStockInfoResponse> = yield call(
        queryKis,
        APIList.getKisEqtStockInfo,
        action.payload
      );

      if (response.data != null) {
        if (action.payload.sellBuyType !== SELL_BUY_TYPE.BUY) {
          yield put(
            kisGetEqtEnquiryPortfolio({
              accountNumber: action.payload.accountNumber,
            })
          );
        }
        yield action.response != null &&
          put({
            type: action.response.success,
            payload: response.data,
          });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Query eqt stock info failed', error);
      yield action.response != null && put({ type: action.response.fail });
    }
  }
}

export default function* watchOnGetEquityStockInfo() {
  yield takeLeading(SERVICE_GET_EQUITY_STOCK_INFO, sagaHandling);
}