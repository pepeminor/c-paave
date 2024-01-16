import APIList from 'config/api';
import { SubscribeCopyTradeParam, SubscribeCopyTradeResponse } from 'interfaces/CopyTrade';
import { IAccount, IAccountList, IResponse, ToolkitAction } from 'interfaces/common';
import { call } from 'ramda';
import { put, select } from 'redux-saga/effects';
import { SUCCESS } from 'reduxs/action-type-utils';
import { query } from 'utils';
import { alertMessage } from 'utils';
import { CopyTradeAction } from '../CopyTrade.redux';
import { IState } from 'reduxs/global-reducers';
import { setSelectedAccount } from 'components/AccountPicker/actions';

export function* EditCopyTradeSubscription(action: ToolkitAction<SubscribeCopyTradeParam>) {
  try {
    const data: IResponse<SubscribeCopyTradeResponse> = yield call(
      query,
      APIList.editCopyTradeSubscription,
      action.payload
    );
    alertMessage('success', data.data.message);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accountPin, ...rest } = action.payload;
    yield put({
      type: SUCCESS(CopyTradeAction.editCopyTradeSubscription.type),
      payload: { ...rest, status: 'ACTIVE' },
    });

    const accountList: IAccountList = yield select((state: IState) => state.accountList);
    const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
    if (accountList.KIS != null && accountList.KIS.subAccounts != null && accountList.KIS.subAccounts.length > 0) {
      yield put(
        setSelectedAccount({
          ...accountList.KIS,
          selectedSubAccount: accountList.KIS.subAccounts.find(
            subAccount => subAccount.accountNumber === action.payload.subAccount
          ),
          oldType: selectedAccount.type,
          oldSelectedSubAccount: selectedAccount.oldSelectedSubAccount,
        })
      );
    }
    action.meta.callBack?.handleSuccess?.();
  } catch (error) {
    action.meta.callBack?.handleFail?.(error);
  }
}
