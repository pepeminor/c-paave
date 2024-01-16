import APIList from 'config/api';
import { UnsubscribeCopyTradeResponse } from 'interfaces/CopyTrade';
import { IResponse, ToolkitAction } from 'interfaces/common';
import { call } from 'ramda';
import { put, select } from 'redux-saga/effects';
import { SUCCESS } from 'reduxs/action-type-utils';
import { IState } from 'reduxs/global-reducers';
import { query, alertMessage } from 'utils';
import { CopyTradeAction } from '../CopyTrade.redux';

export function* UnsubscribeCopyTrade(action: ToolkitAction<null>) {
  try {
    const subAccount: string = yield select(
      (state: IState) => state.selectedAccount.selectedSubAccount?.accountNumber ?? ''
    );
    const data: IResponse<UnsubscribeCopyTradeResponse> = yield call(query, APIList.unsubscribeCopyTrade, {
      subAccount,
    });
    alertMessage('success', data.data.message);
    yield put({ type: SUCCESS(CopyTradeAction.unSubscribeCopyTrade.type), payload: subAccount });
    action.meta.callBack?.handleSuccess?.();
  } catch (error) {
    //
  }
}
