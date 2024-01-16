import APIList from 'config/api';
import { IResponse, ToolkitAction } from 'interfaces/common';
import { GetCopySubscriptionResponse } from 'interfaces/CopyTrade';
import { call, put } from 'redux-saga/effects';
import { query } from 'utils';
import { CopyTradeAction } from '../CopyTrade.redux';

export function* getCopyTradeSubscription(action: ToolkitAction<null>) {
  try {
    const data: IResponse<GetCopySubscriptionResponse[]> = yield call(query, APIList.getCopyTradeSubscription);
    yield put({ type: CopyTradeAction.getCopyTradeSubscription.fulfilled, payload: data.data });
    action.meta.callBack?.handleSuccess?.(data);
  } catch (error) {
    yield put({ type: CopyTradeAction.getCopyTradeSubscription.rejected });
    action.meta.callBack?.handleFail?.();
  }
}
