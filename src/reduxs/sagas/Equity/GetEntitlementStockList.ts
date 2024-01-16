import APIList from 'config/api';
import { IAction } from 'interfaces/common';
import { IGetEntitlementStockListParams, IGetEntitlementStockListResponse } from 'interfaces/equity';
import { put, takeLeading } from 'redux-saga/effects';
import { EQUITY_GET_ENTITLEMENT_STOCK_LIST } from 'reduxs/actions';
import { callQueryKis } from 'utils';

function* doGetEntitlementStockList(action: IAction<IGetEntitlementStockListParams>) {
  try {
    const response: IGetEntitlementStockListResponse[] = yield callQueryKis(
      APIList.getEntitlementStockList,
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

export default function* watchGetEntitlementStockList() {
  yield takeLeading(EQUITY_GET_ENTITLEMENT_STOCK_LIST, doGetEntitlementStockList);
}
