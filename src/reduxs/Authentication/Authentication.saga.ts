import { takeLeading } from 'redux-saga/effects';

import {
  onLoginSocial,
  createPassword,
  linkSocialAccount,
  onContinueLoginSocial,
  unlinkSocialAccount,
  doCheckLinkedAccounts,
} from './sagas';
import { AuthenticationActions } from './Authentication.redux';

export function* AuthenticationSagas() {
  yield takeLeading(AuthenticationActions.loginSocialRequest.type, onLoginSocial);
  yield takeLeading(AuthenticationActions.createPassword.type, createPassword);
  yield takeLeading(AuthenticationActions.linkSocialRequest.type, linkSocialAccount);
  yield takeLeading(AuthenticationActions.continueLoginSocialRequest.type, onContinueLoginSocial);
  yield takeLeading(AuthenticationActions.unlinkSocialRequest.type, unlinkSocialAccount);
  yield takeLeading(AuthenticationActions.checkLinkedAccounts.type, doCheckLinkedAccounts);
}
