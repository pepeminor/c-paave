import {
  ICheckUserExistParams,
  ICheckUserExistResponse,
  ILoginParams,
  IRegisterUserParams,
} from 'interfaces/authentication';
import { AUTHENTICATION_REGISTER_USER_EXIST, SIGNUP_ENTER_NAME_SUBMIT_ACTION } from 'reduxs/actions';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { query, navigate, alertMessage } from 'utils';
import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import { AUTHENTICATION_REGISTER_PARAMS } from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { CHANNEL, CheckUserExistType } from 'constants/enum';
import { ISignupEnterNameSubmitAction } from 'interfaces/sagas/ISignupEnterNameSubmitAction';
import { IVerifyOTPResponse } from '../../../interfaces/authentication';
import { ILoadingReducer } from '../../../interfaces/reducer';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { CONNECT_SEC_FLOW } from 'global';
import { login } from 'reduxs/global-actions/Authentication';
import config from 'config';
import { Platform } from 'react-native';

function* doAction(request: IAction<ISignupEnterNameSubmitAction>) {
  // first check if user exist
  try {
    const checkUserExist: ICheckUserExistParams = {
      type: CheckUserExistType.USERNAME,
      value: request.payload.registeredUsername,
    };
    const checkUserResponse: IResponse<ICheckUserExistResponse> = yield call(
      query,
      APIList.checkUserExist,
      checkUserExist
    );

    if (checkUserResponse.data.exist && checkUserResponse.data.verified) {
      // username already exist
      // alertMessage('danger', 'USERNAME_EXISTS');
      yield put({
        type: AUTHENTICATION_REGISTER_USER_EXIST,
      });
      return;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('fail to check user exist', e);
    // allow to pass because register function will check again
  }

  // now change user params for congratulations screen
  yield put({
    type: AUTHENTICATION_REGISTER_PARAMS,
    payload: request.payload,
  });

  // now call register
  const registerParam: IRegisterUserParams = yield select((state: IState) => state.registerParams);
  const otpKey: ILoadingReducer<IVerifyOTPResponse | null> = yield select((state: IState) => state.otpKey);
  try {
    if (otpKey.data != null) {
      const apiParams: IRegisterUserParams = { ...registerParam, otpKey: otpKey.data.keyToken };
      yield call(query, APIList.registerUser, apiParams);
      const params: ILoginParams = {
        platform: Platform.OS === 'ios' ? CHANNEL.MTS_PAAVE_IOS : CHANNEL.MTS_PAAVE_ANDROID,
        grant_type: config.authentication.grantType,
        client_id: config.authentication.clientId,
        client_secret: config.authentication.clientSecret,
        username: registerParam.email,
        password: registerParam.password,
        device_id: config.uniqueId,
        rememberMe: true,
        appVersion: config.appVersion,
        osVersion: config.systemVersion,
        session_time_in_minute: 480, // 8h
      };
      yield put(login(params, undefined, undefined, true));

      navigate({
        key: ScreenNames.LoginRealAccount,
        params: { sec: 'KIS', flow: CONNECT_SEC_FLOW.SIGNUP },
      });
    }
  } catch (e: any) {
    // Error handling if wrong params are entered on BE's side
    const invalidUsernameValue = e.params.filter((item: any) => item.param === 'username');
    const invalidFullnameValue = e.params.filter((item: any) => item.param === 'fullname');
    if ((invalidUsernameValue.length && invalidFullnameValue.length) > 0 || invalidUsernameValue.length > 0) {
      alertMessage('danger', 'INVALID_VALUE username', '', e.rid);
    } else if (invalidFullnameValue.length > 0) {
      alertMessage('danger', 'INVALID_VALUE fullname', '', e.rid);
    }
  }
}

export default function* watchSignupEnterNameSubmit() {
  yield takeLeading(SIGNUP_ENTER_NAME_SUBMIT_ACTION, doAction);
}
