/* eslint-disable no-console */
import { put, call, takeLeading, select } from 'redux-saga/effects';
import { IAction, IResponse } from 'interfaces/common';
import { ILoginBiometricRequest, ILoginResponse, IRawLoginBiometricRequest } from 'interfaces/authentication';
import APIList from 'config/api';
import { LOGIN_BIOMETRIC, AUTHENTICATION_LOGIN_BY_BIOMETRIC } from '../../actions';
import { query } from 'utils';
import config from 'config';
import { Platform } from 'react-native';
import { CHANNEL } from 'constants/enum';
import { handleLoginSuccess, handleLoginFailed } from 'reduxs/Authentication/helpers';
import { SelectKisSessionTimeout } from 'reduxs/global-reducers/KisSessionTimeout';

function* doLoginBiometric(request: IAction<IRawLoginBiometricRequest>) {
  try {
    const dataRequest: ILoginBiometricRequest = {
      ...request.payload,
      grant_type: 'biometric',
      client_id: config.authentication.clientId,
      client_secret: config.authentication.clientSecret,
      device_id: config.uniqueId,
      appVersion: config.appVersion,
      platform: Platform.OS === 'ios' ? CHANNEL.MTS_PAAVE_IOS : CHANNEL.MTS_PAAVE_ANDROID,
      session_time_in_minute: SelectKisSessionTimeout(yield select(), request.payload.username),
    };
    const response: IResponse<ILoginResponse> = yield call(query, APIList.login, dataRequest);

    if (response.data && response.data.userInfo) {
      yield put({ type: AUTHENTICATION_LOGIN_BY_BIOMETRIC });

      yield handleLoginSuccess(response, request, {
        api: APIList.login,
        params: dataRequest,
      });
    }

    request.callBack?.handleSuccess?.();
  } catch (error) {
    if (__DEV__) console.log('loginBiometricError', error);
    if (request.response != null) {
      yield put({
        type: request.response.fail,
        hideLoading: true,
      });
    }
    yield handleLoginFailed(error);
    request.callBack?.handleFail?.();
    // alertMessage('danger', 'do fund transfer', error.code ?? error.message);
  }
}

export default function* watchLoginBiometric() {
  yield takeLeading(LOGIN_BIOMETRIC, doLoginBiometric);
}
