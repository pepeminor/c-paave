import APIList from 'config/api';
import { IAction } from 'interfaces/common';
import { IGetEntitlementHistoryParams, IGetEntitlementHistoryResponse } from 'interfaces/equity';
import { put, takeLeading } from 'redux-saga/effects';
import { EQUITY_GET_ENTITLEMENT_HISTORY } from 'reduxs/actions';
import { callQueryKis } from 'utils';

function* doGetEntitlementHistory(action: IAction<IGetEntitlementHistoryParams>) {
  try {
    const response: IGetEntitlementHistoryResponse[] = yield callQueryKis(
      APIList.getEntitlementHistory,
      action.payload
    );

    yield put({
      type: action.response?.success,
      payload: response,
    });
  } catch (error: any) {
    yield put({
      type: action.response?.fail,
    });
  }
}

export default function* watchGetEntitlementHistory() {
  yield takeLeading(EQUITY_GET_ENTITLEMENT_HISTORY, doGetEntitlementHistory);
}
