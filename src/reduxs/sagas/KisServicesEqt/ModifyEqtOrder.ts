import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import { IKisModifyEqtOrderResponses, IKisModifyEqtOrderParams } from 'interfaces/services';
import { call, put, takeLeading } from 'redux-saga/effects';
import { SERVICE_PUT_EQUITY_MODIFY_ORDER } from 'reduxs/actions';
import { updateActiveFilter } from 'reduxs/global-actions';
import { handleCommonSagaEffect, queryKis } from 'utils';
import { MODIFY_ORDERBOOK_SUCCESS_TRIGGER } from '../../actions';

function* sagaHandling(action: IAction<IKisModifyEqtOrderParams>) {
  try {
    const response: IResponse<IKisModifyEqtOrderResponses> = yield call(
      queryKis,
      APIList.putKisModifyEqtOrder,
      action.payload
    );

    yield response != null &&
      put({
        type: MODIFY_ORDERBOOK_SUCCESS_TRIGGER,
      });
    yield put(updateActiveFilter({ pageNumber: 0 }));
    yield action.response != null &&
      put({
        type: action.response.success,
        payload: response.data,
      });
    yield action.callBack?.handleSuccess?.();
    handleCommonSagaEffect(action);
  } catch (err) {
    yield action.response != null && put({ type: action.response.fail });
  }
}

export default function* watchOnModifyEquityOrder() {
  yield takeLeading(SERVICE_PUT_EQUITY_MODIFY_ORDER, sagaHandling);
}
