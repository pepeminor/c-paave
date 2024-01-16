/* eslint-disable no-console */
import { call, put, select, take } from 'redux-saga/effects';
import { CURRENT_USER_INFO, GET_LINKED_ACCOUNTS, LINK_ACCOUNTS_LOGIN } from 'reduxs/actions';
import { IGetLinkedAccountsResponse, INavigationAction, IResponse } from 'interfaces/common';
import { updateCurrentUserSetting } from 'reduxs/global-actions';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import { IUserInfoFromLogin } from 'interfaces/user';
import APIList from 'config/api';
import { query, navigateClean, OneSignalUtils } from 'utils';
import { linkAccountsLogin } from 'reduxs/global-actions/LinkAccounts';
import { setAuthToken, updatePaaveOnlyUsers } from 'reduxs/global-actions/Authentication';
import { IState } from 'reduxs/global-reducers';
import { defaultAuthTokenState } from 'reduxs/global-reducers/Authentication';
import { ReLoginRequest } from '../Authentication.type';
import { ILoginResponse } from 'interfaces/authentication';

export function* getLinkedAccounts(reLoginRequest: ReLoginRequest) {
  try {
    const response: IResponse<IGetLinkedAccountsResponse[]> = yield call(query, APIList.getLinkedAccounts);
    const username: string = yield select((state: IState) => state.userInfoFromLogin?.paaveUsername);

    if (response.data.length === 0) {
      if (reLoginRequest.params.session_time_in_minute != null) {
        // If user has no linked account, we need to re-login to get new refresh token with 1 Year expired time
        const { data: reLoginData }: IResponse<ILoginResponse> = yield call(query, reLoginRequest.api, {
          ...reLoginRequest.params,
          session_time_in_minute: undefined,
        });
        const authToken = {
          accessToken: reLoginData.accessToken,
          refreshToken: reLoginData.refreshToken,
          accExpiredTime: reLoginData.accExpiredTime,
          refExpiredTime: reLoginData.refExpiredTime,
          unChangeSession: true,
        };
        yield put(setAuthToken(authToken));
        yield put(
          updatePaaveOnlyUsers({
            username: username ?? '',
            value: true,
          })
        );
      }
      yield navigateClean({ key: 'HomeTab', clean: true } as INavigationAction);
      return;
    } else {
      yield put(
        updatePaaveOnlyUsers({
          username: username ?? '',
          value: false,
        })
      );
    }

    yield put({
      type: SUCCESS(GET_LINKED_ACCOUNTS),
      payload: response.data,
    });

    if (response.data.find(item => item.partnerId === 'kis') != null) {
      yield put(
        linkAccountsLogin({ partnerId: 'kis', session_time_in_minute: reLoginRequest.params.session_time_in_minute })
      );
      const userInfoFromLogin: IUserInfoFromLogin = yield select((state: IState) => state.userInfoFromLogin);
      yield put({
        type: SUCCESS(CURRENT_USER_INFO),
        payload: { ...userInfoFromLogin, kisUsername: response.data[0].partnerUsername },
      });
      yield put(updateCurrentUserSetting({ kisUsername: response.data[0].partnerUsername }));
      if (response.data[0].partnerUsername != null) {
        OneSignalUtils.sendLoginTag({
          partner_kis: response.data[0].partnerUsername.toLowerCase(),
        });
      }
      yield take([SUCCESS(LINK_ACCOUNTS_LOGIN), FAILURE(LINK_ACCOUNTS_LOGIN)]);
    }
  } catch (error) {
    yield put(setAuthToken(defaultAuthTokenState));
  }
}
