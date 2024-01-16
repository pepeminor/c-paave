import { put, select } from 'redux-saga/effects';
import {
  AUTHENTICATION_REMOVE_TOKEN,
  MARKET_GET_AI_RATING_CHART_DATA_INDEX,
  MARKET_GET_AI_RATING_CHART_DATA_RATING,
  NOTIFICATION_GET_ACCOUNT_NOTIFICATION,
  ORDERBOOK_RESET_FILTER,
  ORDERBOOK_RESET_ORDERBOOK,
  DISPLAY_MODAL_OTP_PORTFOLIO,
  SERVICE_GET_EQUITY_ENQUIRY_ORDER_RESET,
  SERVICE_GET_EQUITY_ENQUIRY_HISTORY_ORDER_RESET,
  LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST,
  LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_LISTED,
  LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING,
  LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED,
  LEADER_BOARD_GET_CURRENT_INVESTING_INFO,
  PORTFOLIO_CLEAN_SCREEN_DATA,
  AUTHENTICATION_LOGIN,
  LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING,
  SERVICE_GET_DER_ENQUIRY_ORDER,
  EQUITY_GET_CASH_BALANCE_AND_STOCK_BALANCE,
  PORTFOLIO_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING,
  AUTHENTICATION_RE_LOGIN_BY_BIOMETRIC,
  LOGIN_WITH_SOCIAL_ACCOUNT,
  SEARCH_GET_RECENT_VIEWED,
  AUTHENTICATION_KIS_REMOVE_TOKEN,
  USER_ACCOUNT_INFO,
  USER_KIS_ACCOUNT_INFO,
  STOCK_TRANSFER_LIST_INSTRUMENT_PORTFOLIO,
  KIS_VERIFY_AND_SAVE_OTP,
  LOGIN_REAL_ACCOUNT,
  TRADE_TAB_OPTION,
  MARKET_SET_SELL_BUY_TYPE,
  CURRENT_USER_INFO,
  QUERY_BIOMETRIC_STATUS,
  AUTHENTICATION_LOGIN_BY_BIOMETRIC,
  HIDE_MODAL_OTP_PORTFOLIO,
  GET_LINKED_ACCOUNTS,
  SIGNOUT,
} from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { OneSignalUtils, query } from 'utils';
import { RESET_GLOBAL_ACCOUNT_LIST } from 'reduxs/global-reducers/AccountList';
import { Global } from 'constants/main';
import { SELECTED_ACCOUNT } from 'components/AccountPicker/reducers';
import { KIS_CLEAR_OTP_TOKEN } from 'screens/LoginRealAccount/reducers';
import { updateCurrentUserSetting } from 'reduxs/global-actions/UserInfo';
import { WatchListActions } from 'reduxs/WatchList';
import { CopyTradeAction } from 'reduxs/CopyTrade';
import { RESET } from 'reduxs/action-type-utils';
import { IUserSetting } from 'interfaces/user';
import { IAuthTokenResponse } from 'interfaces/authentication';
import { call } from 'ramda';
import APIList from 'config/api';

export function* cleanOnSignOut() {
  try {
    const authToken: IAuthTokenResponse = yield select((state: IState) => state.authToken);
    if (authToken != null && authToken.refreshToken !== '') {
      yield call(query, APIList.revokeToken, {
        refresh_token: authToken.refreshToken,
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error logout', error);
  }

  yield put({
    type: SIGNOUT,
  });

  yield put({
    type: AUTHENTICATION_REMOVE_TOKEN,
  });

  yield put({
    type: RESET_GLOBAL_ACCOUNT_LIST,
  });
  yield put({
    type: SELECTED_ACCOUNT,
    payload: Global.paaveDefaultAccount,
  });

  yield put({
    type: RESET(SEARCH_GET_RECENT_VIEWED),
    payload: null,
  });

  yield put({
    type: RESET(GET_LINKED_ACCOUNTS),
  });

  // Clean Portfolio
  yield put({
    type: RESET(NOTIFICATION_GET_ACCOUNT_NOTIFICATION),
    payload: [],
  });
  yield put({
    type: PORTFOLIO_CLEAN_SCREEN_DATA,
  });

  // Clean AI Rating
  yield put({
    type: MARKET_GET_AI_RATING_CHART_DATA_RATING,
    payload: null,
  });

  yield put({
    type: MARKET_GET_AI_RATING_CHART_DATA_INDEX,
    payload: null,
  });

  yield put(CopyTradeAction.resetCopyTradeSubscription());

  yield put({ type: HIDE_MODAL_OTP_PORTFOLIO });

  // Clean Orderbook
  yield put({
    type: ORDERBOOK_RESET_FILTER,
  });
  yield put({
    type: ORDERBOOK_RESET_ORDERBOOK,
  });
  yield put({
    type: SERVICE_GET_EQUITY_ENQUIRY_ORDER_RESET,
  });
  yield put({
    type: SERVICE_GET_EQUITY_ENQUIRY_HISTORY_ORDER_RESET,
  });

  yield put({
    type: RESET(SERVICE_GET_DER_ENQUIRY_ORDER),
  });

  // Reset state displayOTPPortfolio
  yield put({
    type: DISPLAY_MODAL_OTP_PORTFOLIO,
  });

  // Reset state OTP kis token
  yield put({
    type: KIS_CLEAR_OTP_TOKEN,
  });

  // Reset kis access token
  yield put({
    type: AUTHENTICATION_KIS_REMOVE_TOKEN,
  });

  // Reset user paave info
  yield put({
    type: RESET(USER_ACCOUNT_INFO),
  });

  // Reset user kis info
  yield put({
    type: RESET(USER_KIS_ACCOUNT_INFO),
  });

  // Reset stock list transfer
  yield put({
    type: RESET(STOCK_TRANSFER_LIST_INSTRUMENT_PORTFOLIO),
  });

  yield put({
    type: RESET(KIS_VERIFY_AND_SAVE_OTP),
  });

  yield put({
    type: RESET(LOGIN_REAL_ACCOUNT),
  });

  // Reset leaderboard contest
  yield put({
    type: RESET(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST),
  });

  yield put({
    type: RESET(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_LISTED),
  });

  yield put({
    type: RESET(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING),
  });

  yield put({
    type: RESET(LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED),
  });

  yield put({
    type: RESET(LEADER_BOARD_GET_CURRENT_INVESTING_INFO),
  });

  yield put({
    type: RESET(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING),
  });

  yield put({
    type: TRADE_TAB_OPTION,
  });

  yield put({
    type: MARKET_SET_SELL_BUY_TYPE,
  });

  yield put({
    type: RESET(AUTHENTICATION_LOGIN),
  });

  yield put(WatchListActions.clearData());

  // usersSetting flow update usersSetting
  const currentUserSetting: IUserSetting = yield select((state: IState) => state.currentUserSetting);
  if (currentUserSetting?.alreadyDoneSmsOTP != null) {
    yield put(updateCurrentUserSetting({ isSms: currentUserSetting.alreadyDoneSmsOTP }));
  }

  yield put({
    type: RESET(CURRENT_USER_INFO),
  });

  yield put({
    type: RESET(QUERY_BIOMETRIC_STATUS),
  });

  yield put({
    type: RESET(EQUITY_GET_CASH_BALANCE_AND_STOCK_BALANCE),
  });

  yield put({
    type: RESET(PORTFOLIO_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING),
  });

  yield put({
    type: RESET(AUTHENTICATION_LOGIN_BY_BIOMETRIC),
  });

  yield put({ type: RESET(AUTHENTICATION_RE_LOGIN_BY_BIOMETRIC) });

  yield put({ type: RESET(LOGIN_WITH_SOCIAL_ACCOUNT) });

  OneSignalUtils.unSubscribeOneSignal();
}
