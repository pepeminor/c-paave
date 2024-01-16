import { IAction, INavigationAction, IResponse } from 'interfaces/common';
import { put, select, take } from 'redux-saga/effects';
import { changeRegisterParams, setAuthToken } from 'reduxs/global-actions/Authentication';
import { ILoginParams as ISocialLoginParams, ReLoginRequest } from '../Authentication.type';
import { OneSignalUtils, navigateClean, removeKey, setKey } from 'utils';
import { PayloadAction } from '@reduxjs/toolkit';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import {
  AUTHENTICATION_LOGIN,
  CURRENT_USERS_SETTING,
  CURRENT_USER_INFO,
  DISPLAY_MODAL_OTP_PORTFOLIO,
  GET_CONTEST_LIST,
  LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED,
  SEARCH_GET_RECENT_VIEWED,
} from 'reduxs/actions';
import { WatchListActions } from 'reduxs/WatchList';
import { SELECTED_ACCOUNT } from 'components/AccountPicker/reducers';
import { Global } from 'constants/main';
import { getAccountContestRegistered, getCurrentUserSetting, getSearchRecentViewed } from 'reduxs/global-actions';
import { CopyTradeAction } from 'reduxs/CopyTrade';
import { ILoginParams, ILoginResponse, IRawLoginBiometricRequest } from 'interfaces/authentication';
import { storageKey } from 'constants/enum';
import { temporarilyBiometricStatus } from 'screens/Security/actions';
import { ACCOUNT_TYPE } from 'global';
import { IState } from 'reduxs/global-reducers';
import { openNotice } from 'reduxs/global-actions/Notice';
import { getLinkedAccounts } from './GetLinkedAccounts';
import { MarketSymbol, setCurrentSymbol } from 'reduxs/SymbolData';
import config from 'config';

export function* handleLoginSuccess(
  response: IResponse<ILoginResponse>,
  action: PayloadAction<ISocialLoginParams> | IAction<IRawLoginBiometricRequest> | IAction<ILoginParams>,
  reLoginRequest: ReLoginRequest
) {
  if (response.data && response.data.userInfo) {
    action.payload.rememberMe
      ? setKey(storageKey.LASTED_USER_NAME, response.data.userInfo.username)
      : removeKey(storageKey.LASTED_USER_NAME);
    yield put({
      type: SUCCESS(CURRENT_USER_INFO),
      payload: {
        userId: response.data.userInfo.id,
        paaveUsername: response.data.userInfo.username,
        kisUsername: '',
        email: response.data.userInfo.email,
      },
    });
    yield put(WatchListActions.clearData());
    yield put({
      type: SELECTED_ACCOUNT,
      payload: Global.paaveDefaultAccount,
    });
    yield put({
      type: SUCCESS(AUTHENTICATION_LOGIN),
      payload: { ...action.payload, ...response.data },
    });
    const authToken = {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      accExpiredTime: response.data.accExpiredTime,
      refExpiredTime: response.data.refExpiredTime,
    };

    yield put(setAuthToken(authToken));

    OneSignalUtils.sendLoginTag({
      userid: response.data.userInfo.id != null ? response.data.userInfo.id.toString() : '',
      username: response.data.userInfo.username ?? '',
    });

    if (response.data.userInfo.firstLogin) {
      yield put(openNotice({}));
      yield action.payload?.fullName && put(changeRegisterParams({ fullname: action.payload?.fullName }));
      navigateClean({ key: 'SignupCongratulation' } as INavigationAction);
    } else {
      // Handle get linked accounts and Navigate to HomeTab after get linked accounts success
      yield getLinkedAccounts(reLoginRequest);
    }

    yield put(temporarilyBiometricStatus({ payload: false }));

    // usersSetting flow
    yield put(getCurrentUserSetting({}));
    // put effect is non-blocking => using take to wait for the response
    yield take([SUCCESS(CURRENT_USERS_SETTING), FAILURE(CURRENT_USERS_SETTING)]);

    // 1890 - contest
    yield put(getAccountContestRegistered({}));
    yield take([
      SUCCESS(LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED),
      FAILURE(LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED),
    ]);
    yield put({ type: GET_CONTEST_LIST });
    yield take([SUCCESS(GET_CONTEST_LIST), FAILURE(GET_CONTEST_LIST)]);

    yield put({ type: DISPLAY_MODAL_OTP_PORTFOLIO });

    yield put(CopyTradeAction.openCopyTradeBanner());
    yield put(CopyTradeAction.getCopyTradeSubscription());

    // Update default WatchList
    const selectedAccount: ACCOUNT_TYPE = yield select((state: IState) => state.selectedAccount.type);
    const newWatchListId: number = yield select(
      (state: IState) => state.userBasedReducer.data.favoriteWatchlist?.[selectedAccount] ?? -1
    );
    yield put(
      WatchListActions.onChangeAccount({
        newType: selectedAccount,
        newWatchListId,
      })
    );

    // Load last seen symbol to currentSymbol when log in
    yield put(getSearchRecentViewed(null));
    yield take([SUCCESS(SEARCH_GET_RECENT_VIEWED), FAILURE(SEARCH_GET_RECENT_VIEWED)]);
    const getRecentSymbols = (state: IState) => state.getRecentViewed.data;
    const recentViewedSymbols = getRecentSymbols(yield select());
    if (recentViewedSymbols && recentViewedSymbols.recentlySearches.length > 0) {
      const lastSeenSymbolCode = recentViewedSymbols.recentlySearches.find(item => item.rank === 1)?.code;
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
    }
  }
}
