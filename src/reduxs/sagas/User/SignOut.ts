/* eslint-disable no-console */
import { put, select } from 'redux-saga/effects';
import { IState } from 'reduxs/global-reducers';
import { ACCOUNT_TYPE } from 'global';
import { loginNonUser } from 'reduxs/global-actions';
import { clearHistoryAndNavigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { cleanOnSignOut } from '../CleanOnSignOut';

export function* doSignOut() {
  const accountType: ACCOUNT_TYPE = yield select((state: IState) => state.selectedAccount.type);
  if (accountType === ACCOUNT_TYPE.DEMO) {
    yield put(loginNonUser(null));
    return;
  }

  clearHistoryAndNavigate({
    key: ScreenNames.SignIn,
  });

  try {
    yield cleanOnSignOut();
  } catch (error) {
    //
  }
}
