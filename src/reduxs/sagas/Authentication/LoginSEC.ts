/* eslint-disable no-console */
import { SELECTED_ACCOUNT } from 'components/AccountPicker/reducers';
import APIList from 'config/api';
import { storageKey } from 'constants/enum';
import { ACCOUNT_TYPE } from 'global';
import { ILoginSECParams, ILoginSECResponse } from 'interfaces/authentication';
import { IAction, INavigationAction } from 'interfaces/common';
import { isNilOrEmpty } from 'ramda-adjunct';
import { put, select, take, takeEvery } from 'redux-saga/effects';
import { CopyTradeAction } from 'reduxs/CopyTrade';
import { SettingActions, SettingSelectors } from 'reduxs/Setting';
import { WatchListActions } from 'reduxs/WatchList';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import { setAuthToken, setKisAuthToken } from 'reduxs/global-actions/Authentication';
import { OneSignalUtils, callQuery, navigateClean, removeKey, setKey } from 'utils';
import {
  AUTHENTICATION_LOGIN,
  AUTHENTICATION_LOGIN_SEC,
  CURRENT_USERS_SETTING,
  CURRENT_USER_INFO,
  DISPLAY_MODAL_OTP_PORTFOLIO,
  GET_CONTEST_LIST,
  GET_LINKED_ACCOUNTS,
  LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED,
  SEARCH_GET_RECENT_VIEWED,
} from '../../actions';
import { getAccountContestRegistered } from '../../global-actions/LeaderBoard';
import { getCurrentUserSetting } from '../../global-actions/UserInfo';
import { setGlobalAccountList } from '../LinkAccounts/LinkAccounts';
import { handleLoginFailed } from 'reduxs/Authentication/helpers';
import { getSearchRecentViewed } from 'reduxs/global-actions';
import { IState } from 'reduxs/global-reducers';
import { MarketSymbol, setCurrentSymbol } from 'reduxs/SymbolData';
import config from 'config';

function* handleLoginSEC(action: IAction<ILoginSECParams>) {
  try {
    action.payload.rememberMe
      ? setKey(storageKey.LASTED_KIS_NAME, action.payload.partner.username)
      : removeKey(storageKey.LASTED_KIS_NAME);

    const response: ILoginSECResponse = yield callQuery(APIList.loginSEC, action.payload);
    if (response) {
      const { paave, partner } = response;
      yield put({
        type: SUCCESS(CURRENT_USER_INFO),
        payload: {
          userId: paave.userInfo.id,
          paaveUsername: paave.userInfo.username,
          kisUsername: partner.userInfo.username,
          email: paave.userInfo.email,
        },
      });
      // Save Paave Info
      yield put(WatchListActions.clearData());
      yield put({
        type: SUCCESS(AUTHENTICATION_LOGIN),
        payload: { ...action.payload, ...paave },
      });
      const paaveAuthToken = {
        accessToken: paave.accessToken,
        refreshToken: paave.refreshToken,
        accExpiredTime: paave.accExpiredTime,
        refExpiredTime: paave.refExpiredTime,
      };
      yield put(setAuthToken(paaveAuthToken));
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

      const kisAuthToken = {
        accessToken: partner.accessToken,
        refreshToken: partner.refreshToken,
        accExpiredTime: partner.accExpiredTime,
        refExpiredTime: partner.refExpiredTime,
      };

      // Save SEC Info
      switch (action.payload.partnerId) {
        case 'kis':
          yield put(setKisAuthToken(kisAuthToken));
          yield setGlobalAccountList(partner.userInfo.accounts, ACCOUNT_TYPE.KIS, false, partner.userInfo.username);
          break;
      }

      yield put({
        type: SUCCESS(GET_LINKED_ACCOUNTS),
        payload: [{ partnerId: action.payload.partnerId, partnerUsername: partner.userInfo.username }],
      });

      // Update OneSignal
      OneSignalUtils.sendLoginTag({
        // status: 'signin-partner',
        userid: paave.userInfo.id != null ? paave.userInfo.id.toString() : '',
        username: paave.userInfo.username ?? '',
        partner_kis: paave.userInfo.username != null ? partner.userInfo?.username.toLowerCase() : '',
      });

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

      if (partner.userInfo.accounts.length > 0) {
        const accountDefault: string = yield select(SettingSelectors.selectedAccountDefault(partner.userInfo.username));

        if (isNilOrEmpty(accountDefault)) {
          yield put(
            SettingActions.setAccountDefault({
              userId: partner.userInfo.username,
              sub: partner.userInfo.accounts[0].accountNumber,
            })
          );

          yield put({
            type: SELECTED_ACCOUNT,
            payload: {
              type: ACCOUNT_TYPE.KIS,
              username: partner.userInfo.username,
              subAccounts: partner.userInfo.accounts,
              selectedSubAccount: partner.userInfo.accounts[0],
            },
          });
        } else {
          const account = partner.userInfo.accounts.find(item => item.accountNumber === accountDefault);

          yield put({
            type: SELECTED_ACCOUNT,
            payload: {
              id: partner.userInfo.id,
              type: ACCOUNT_TYPE.KIS,
              username: partner.userInfo.username,
              subAccounts: partner.userInfo.accounts,
              selectedSubAccount: account,
            },
          });
        }
      }
      yield put({ type: DISPLAY_MODAL_OTP_PORTFOLIO });

      navigateClean({ key: 'HomeTab', clean: true } as INavigationAction);

      // Copy Trade flow: Get subscription on login
      yield put(CopyTradeAction.getCopyTradeSubscription());
      yield put(CopyTradeAction.openCopyTradeBanner());
    }
    action.callBack?.handleSuccess?.();
  } catch (error: any) {
    if (action.response) {
      yield put({
        type: action.response.fail,
        hideLoading: true,
      });
    }
    yield handleLoginFailed(error);

    yield action.callBack?.handleFail?.(error);
  }
}

export default function* watchLoginSEC() {
  yield takeEvery(AUTHENTICATION_LOGIN_SEC, handleLoginSEC);
}
