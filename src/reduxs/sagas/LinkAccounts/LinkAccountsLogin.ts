/* eslint-disable no-console */
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { LINK_ACCOUNTS_LOGIN } from '../../actions';
import {
  IAction,
  ILinkAccountsLoginRequest,
  ILinkAccountsLoginResponse,
  INavigationAction,
  IResponse,
} from 'interfaces/common';
import APIList from 'config/api';
import { query, navigateClean, OneSignalUtils } from 'utils';
import { ACCOUNT_TYPE } from 'global';
import { onOpenModalOTPKIS, setAuthToken, setKisAuthToken } from 'reduxs/global-actions/Authentication';
import { setGlobalAccountList } from './LinkAccounts';
import { defaultAuthTokenState } from 'reduxs/global-reducers/Authentication';
import { IState } from 'reduxs/global-reducers';
import { ILoginParams, ILoginResponse } from 'interfaces/authentication';
import { SELECTED_ACCOUNT } from 'components/AccountPicker/reducers';
import { SettingActions, SettingSelectors } from 'reduxs/Setting';
import { isNilOrEmpty } from 'ramda-adjunct';

const linkAccountsLogin = (params: ILinkAccountsLoginRequest) => {
  return query(APIList.linkAccountsLogin, params);
};

function* doLinkAccountsLogin(action: IAction<ILinkAccountsLoginRequest>) {
  try {
    const { notNavigate, ...params } = action.payload;
    const response: IResponse<ILinkAccountsLoginResponse> = yield call(linkAccountsLogin, params);
    if (action.payload.partnerId === 'kis') {
      const authToken = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        accExpiredTime: response.data.accExpiredTime,
        refExpiredTime: response.data.refExpiredTime,
      };
      yield put(setKisAuthToken(authToken));
      yield setGlobalAccountList(
        response.data.userInfo.accounts,
        ACCOUNT_TYPE.KIS,
        false,
        response.data.userInfo.username
      );
    }
    const loginData: (ILoginResponse & ILoginParams) | null = yield select((state: IState) => state.loginData);

    const userInfo = response.data.userInfo;
    const accountDefault: string = yield select(SettingSelectors.selectedAccountDefault(userInfo.username));
    if (isNilOrEmpty(accountDefault)) {
      yield put(
        SettingActions.setAccountDefault({
          userId: userInfo.username,
          sub: userInfo.accounts[0].accountNumber,
        })
      );
      yield put({
        type: SELECTED_ACCOUNT,
        payload: {
          type: ACCOUNT_TYPE.KIS,
          username: userInfo.username,
          subAccounts: userInfo.accounts,
          selectedSubAccount: userInfo.accounts[0],
        },
      });
    } else {
      const account = userInfo.accounts.find(item => item.accountNumber === accountDefault);
      yield put({
        type: SELECTED_ACCOUNT,
        payload: {
          type: ACCOUNT_TYPE.KIS,
          username: userInfo.username,
          subAccounts: userInfo.accounts,
          selectedSubAccount: account,
        },
      });
    }
    yield !notNavigate && navigateClean({ key: 'HomeTab', clean: true } as INavigationAction);
    yield put(onOpenModalOTPKIS({}));

    if (loginData != null && loginData.userInfo != null) {
      OneSignalUtils.sendLoginTag({
        // status: 'signin-partner',
        userid: loginData.userInfo.id != null ? loginData.userInfo.id.toString() : '',
        username: loginData.username != null ? loginData.username : '',
        partner_kis: response.data != null ? response.data.userInfo.username.toLowerCase() : '',
      });
    }

    yield put({
      type: action.response?.success,
      payload: response.data,
      hideLoading: false,
    });
  } catch (error) {
    yield put(setAuthToken(defaultAuthTokenState));
    // alertMessage('danger', 'Link Account Login', error.code ?? error.message);
    yield put({
      type: action.response?.fail,
      hideLoading: true,
    });
  }
}

export default function* watchLinkAccountsLogin() {
  yield takeLeading(LINK_ACCOUNTS_LOGIN, doLinkAccountsLogin);
}
