import { Platform } from 'react-native';
import { takeLeading, call, put, select, take } from 'redux-saga/effects';

import { ILoginBiometricRequest, ILoginResponse } from 'interfaces/authentication';
import { CHANNEL } from 'constants/enum';
import config from 'config';
import { IAction, IResponse } from 'interfaces/common';
import { OneSignalUtils, query } from 'utils';
import APIList from 'config/api';
import { LINK_ACCOUNTS_LOGIN, AUTHENTICATION_LOGIN_BY_BIOMETRIC, RE_LOGIN_BIOMETRIC } from 'reduxs/actions';
import { setAuthToken } from 'reduxs/global-actions';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import { IState } from 'reduxs/global-reducers';
import { SelectKisSessionTimeout } from 'reduxs/global-reducers/KisSessionTimeout';
import { linkAccountsLogin } from 'reduxs/global-actions/LinkAccounts';

function* loginBiometricSaga(action: IAction<{ signature: string; username: string }>) {
  const dataRequest: ILoginBiometricRequest = {
    signatureValue: action.payload.signature,
    username: action.payload.username,
    grant_type: 'biometric',
    client_id: config.authentication.clientId,
    client_secret: config.authentication.clientSecret,
    device_id: config.uniqueId,
    appVersion: config.appVersion,
    platform: Platform.OS === 'ios' ? CHANNEL.MTS_PAAVE_IOS : CHANNEL.MTS_PAAVE_ANDROID,
    rememberMe: true,
    session_time_in_minute: SelectKisSessionTimeout(yield select(), action.payload.username),
  };
  try {
    const response: IResponse<ILoginResponse> = yield call(query, APIList.login, dataRequest);
    if (response.data && response.data.userInfo) {
      const authToken = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        accExpiredTime: response.data.accExpiredTime,
        refExpiredTime: response.data.refExpiredTime,
      };
      yield put(setAuthToken(authToken));
      yield put({ type: AUTHENTICATION_LOGIN_BY_BIOMETRIC });

      // Kim Wonhyung: I'm not sure about whether there is a case Paave only account has timeout. but anyway I just handled it
      const kisAccountName: string | undefined = yield select((state: IState) => state.accountList.KIS?.username);
      try {
        if (kisAccountName) {
          OneSignalUtils.sendLoginTag({
            // status: 'signin-partner',
            userid: response.data.userInfo.id != null ? response.data.userInfo.id.toString() : '',
            username: response.data.userInfo.username ?? '',
            partner_kis: kisAccountName.toLowerCase(),
          });
          yield put(
            linkAccountsLogin({
              partnerId: 'kis',
              session_time_in_minute: SelectKisSessionTimeout(yield select(), action.payload.username),
              notNavigate: true,
            })
          );
          yield take([SUCCESS(LINK_ACCOUNTS_LOGIN), FAILURE(LINK_ACCOUNTS_LOGIN)]);
        } else {
          OneSignalUtils.sendLoginTag({
            // status: 'signin-paave',
            userid: response.data.userInfo.id != null ? response.data.userInfo.id.toString() : '',
            username: response.data.userInfo.username ?? '',
          });
        }
      } finally {
        yield action.callBack?.handleSuccess?.();
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('fail to re-login with biometric', error);
    yield action.callBack?.handleFail?.();
  }
}

export default function* watchReLoginBiometricSaga() {
  yield takeLeading(RE_LOGIN_BIOMETRIC, loginBiometricSaga);
}
