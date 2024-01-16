/* eslint-disable no-console */
import { ILoginResponse, ILoginParams } from 'interfaces/authentication';
import { AUTHENTICATION_LOGIN_NON_USER, GET_CONTEST_LIST } from 'reduxs/actions';
import { IAction, INavigationAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { setAuthToken } from 'reduxs/global-actions/Authentication';
import { SELECTED_ACCOUNT } from 'components/AccountPicker/reducers';
import { IState } from 'reduxs/global-reducers';
import { OneSignalUtils, navigateClean, query } from 'utils';
import { ACCOUNT_TYPE } from 'global';
import config from 'config';
import { MarketSymbol, setCurrentSymbol } from 'reduxs/SymbolData';
import { Platform } from 'react-native';
import { CHANNEL } from 'constants/enum';
import { CopyTradeAction } from 'reduxs/CopyTrade';

function* loginNonUser(action: IAction<undefined>) {
  try {
    const params: ILoginParams = {
      platform: Platform.OS === 'ios' ? CHANNEL.MTS_PAAVE_IOS : CHANNEL.MTS_PAAVE_ANDROID,
      grant_type: config.nonLoginAuthentication.grantType,
      client_id: config.nonLoginAuthentication.clientId,
      client_secret: config.nonLoginAuthentication.clientSecret, // client secret env PROD
      // client_secret: config.nonLoginAuthentication.clientId, // client secret env UAT
      device_id: config.uniqueId,
      rememberMe: false,
      appVersion: config.appVersion,
    };
    const response: IResponse<ILoginResponse> = yield call(query, APIList.login, params);
    if (response.data) {
      yield put({
        type: SELECTED_ACCOUNT,
        payload: {
          username: 'Demo Account',
          type: ACCOUNT_TYPE.DEMO,
        },
      });
      if (action.response != null) {
        yield put({
          type: action.response.success,
          payload: { ...params, ...response.data },
        });
      }
      const authToken = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        accExpiredTime: response.data.accExpiredTime,
        refExpiredTime: response.data.refExpiredTime,
        lastLoggedInAt: undefined,
      };

      yield put(setAuthToken(authToken));

      yield put({ type: GET_CONTEST_LIST });

      OneSignalUtils.sendNonLoginTag();

      // Load last seen symbol to currentSymbol when log in
      const nonLoginRecentViewed: string[] = yield select((state: IState) => state.nonLoginRecentViewed);
      const lastSeenSymbolCode =
        nonLoginRecentViewed.length > 0 ? nonLoginRecentViewed[0] : config.defaultCurrentSymbol;
      const isSymbolExist: MarketSymbol | undefined = yield select(
        (state: IState) => state.SymbolData.marketData.symbolMap[lastSeenSymbolCode ?? config.defaultCurrentSymbol]
      );
      if (isSymbolExist) {
        yield put(setCurrentSymbol(lastSeenSymbolCode ?? config.defaultCurrentSymbol));
      } else {
        const firstSymbol: string = yield select(
          (state: IState) => state.SymbolData.marketData.stockList?.[0]?.symbolCode
        );
        yield put(setCurrentSymbol(firstSymbol));
      }

      navigateClean({ key: 'HomeTab', clean: true } as INavigationAction);
      yield put(CopyTradeAction.openCopyTradeBanner());
    }
  } catch (error) {
    yield put({
      type: action.response?.fail,
      hideLoading: true,
    });
  }
}

export default function* watchLoginNonUser() {
  yield takeLeading(AUTHENTICATION_LOGIN_NON_USER, loginNonUser);
}
