import { ILoginResponse } from './../../../interfaces/authentication';
import { IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { call, put } from 'redux-saga/effects';
import { IContinueLoginSocialParams, ILoginParams as ISocialLoginParams } from '../Authentication.type';
import { query } from 'utils';
import { PayloadAction } from '@reduxjs/toolkit';
import { LOGIN_WITH_SOCIAL_ACCOUNT } from 'reduxs/actions';
import { ERROR } from 'constants/error';
import { handleLoginFailed, handleLoginSuccess } from '../helpers';

export function* onLoginSocial(action: PayloadAction<ISocialLoginParams>) {
  try {
    const response: IResponse<ILoginResponse> = yield call(query, APIList.loginSocial, action.payload.data);

    if (response.data) {
      if (!action.payload.isSignIn && response.data.userInfo && !response.data.userInfo.firstLogin) {
        yield action.payload.callback({
          error: ERROR.USER_EXIST,
          callbackData: {
            responseData: response,
            action,
          },
        });

        return;
      }
      yield handleLoginSuccess(response, action, {
        api: APIList.loginSocial,
        params: action.payload.data,
      });
      yield put({ type: LOGIN_WITH_SOCIAL_ACCOUNT });

      yield action.payload?.callback?.({ data: response.data?.userInfo?.username });
    }
  } catch (e: any) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('fail to login social', e);
    }
    yield handleLoginFailed(e);

    yield action.payload.callback({ error: e });
  }
}

export function* onContinueLoginSocial(action: PayloadAction<IContinueLoginSocialParams>) {
  const { responseData, action: actionPayload } = action.payload.data;

  try {
    if (responseData.data) {
      yield handleLoginSuccess(responseData, actionPayload, {
        api: APIList.loginSocial,
        params: action.payload.data.action.payload.data,
      });
    }
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('fail to login social', e);
    }

    actionPayload.payload.callback({ error: e });
  }
}
