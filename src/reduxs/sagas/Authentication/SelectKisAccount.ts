import { PayloadAction } from '@reduxjs/toolkit';
import { SELECTED_ACCOUNT } from 'components/AccountPicker/reducers';
import { ACCOUNT_TYPE } from 'global';
import { IAccount, IAccountList } from 'interfaces/common';
import { isNilOrEmpty } from 'ramda-adjunct';
import { put, select, takeLeading } from 'redux-saga/effects';
import { IState } from 'reduxs/global-reducers';
import { SettingActions } from 'reduxs/Setting';

export const SELECT_KIS_ACCOUNT = 'SELECT_KIS_ACCOUNT';

function* doSelectKisAccount(
  action: PayloadAction<{
    accountDefault?: string;
  }>
) {
  const accessToken: string = yield select((state: IState) => state.authToken.accessToken);
  if (accessToken === '') return;
  const accountList: IAccountList = yield select((state: IState) => state.accountList);
  const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
  if (accountList.KIS != null && accountList.KIS.subAccounts != null && accountList.KIS.subAccounts.length > 0) {
    const accountDefault = action?.payload?.accountDefault;
    if (isNilOrEmpty(accountDefault)) {
      yield put(
        SettingActions.setAccountDefault({
          userId: accountList.KIS.username!,
          sub: accountList.KIS?.subAccounts?.[0].accountNumber,
        })
      );
      yield put({
        type: SELECTED_ACCOUNT,
        payload: {
          type: ACCOUNT_TYPE.KIS,
          username: accountList.KIS.username!,
          subAccounts: accountList.KIS?.subAccounts,
          selectedSubAccount: accountList.KIS?.subAccounts?.[0],
          oldType: selectedAccount.type,
        },
      });
    } else {
      const account = accountList.KIS.subAccounts.find(item => item.accountNumber === accountDefault);
      yield put({
        type: SELECTED_ACCOUNT,
        payload: {
          type: ACCOUNT_TYPE.KIS,
          username: account?.accountName,
          subAccounts: accountList.KIS?.subAccounts,
          selectedSubAccount: account,
          oldType: selectedAccount.type,
        },
      });
    }
  }
}

export default function* watchSelectKisAccount() {
  yield takeLeading(SELECT_KIS_ACCOUNT, doSelectKisAccount);
}
