/* eslint-disable no-console */
import { IAction } from 'interfaces/common';
import { IRefreshTokenInvalidAction } from 'interfaces/sagas/IRefreshTokenInvalidAction';
import { IUserSetting } from 'interfaces/user';
import { call, put, select } from 'redux-saga/effects';
import { AUTHENTICATION_RE_LOGIN_BY_BIOMETRIC, ON_REFRESH_TOKEN_INVALID } from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { takeEverySequential, waitForNextData } from 'utils';
import { doSignOut } from './SignOut';
import { RESET } from 'reduxs/action-type-utils';
import { loginNonUser } from 'reduxs/global-actions';
import { ReloadControllerAction } from 'reduxs/ReloadController';

let currentVersion: number | undefined = undefined;

const UNKNOWN = 'UNKNOWN';
const SHOW_MODAL = 'SHOW_MODAL';
const SHOW_LOGIN = 'SHOW_LOGIN';

type State = typeof UNKNOWN | typeof SHOW_LOGIN | typeof SHOW_MODAL;

let currentVersionState: State = UNKNOWN;

function* closeReLoginModalAndSignOut() {
  yield put({ type: RESET(AUTHENTICATION_RE_LOGIN_BY_BIOMETRIC) });
  yield doSignOut();
}

function* checkVersionAndState(version: number, state: State, func: () => Generator) {
  if (isNotHandle(version, state)) {
    currentVersion = version;
    currentVersionState = state;
    yield func();
  }
}
function isNotHandle(version: number, state: State) {
  if (currentVersion == null) {
    return true;
  }
  if (currentVersion < version) {
    return true;
  }
  if (currentVersion === version) {
    switch (currentVersionState) {
      case UNKNOWN:
        return true;
      case SHOW_LOGIN:
        return false;
      case SHOW_MODAL:
        // current is show modal. if state is login then we should process
        return state === SHOW_LOGIN;
    }
  }
  return false;
}

function* loginDemo() {
  yield put(loginNonUser(null));
}

function* showModalBiometric() {
  yield put({
    type: AUTHENTICATION_RE_LOGIN_BY_BIOMETRIC,
  });
}

/**
 * this function handle event when session expired in a sequence. check takeEverySequential
 * it will control the session version
 * if the processed version > version of event. do nothing
 * if the processed version == version of event. check the state unknown or show modal or show login
 * if the processed version < version of event. show what we want
 * @param action
 * @returns
 */
export function* handleRefreshTokenInvalid(action: IAction<IRefreshTokenInvalidAction>) {
  if (__DEV__) {
    console.log('handleRefreshTokenInvalid', {
      currentVersion,
      currentVersionState,
      ...action.payload,
    });
  }
  if (action.payload.closeReloginModal === true) {
    yield checkVersionAndState(action.payload.version, SHOW_LOGIN, closeReLoginModalAndSignOut);
    return;
  }
  if (action.payload.userLogout) {
    yield checkVersionAndState(action.payload.version, SHOW_LOGIN, closeReLoginModalAndSignOut);
    return;
  }
  if (action.payload.isDemoAccount === true) {
    yield checkVersionAndState(action.payload.version, UNKNOWN, loginDemo);
    return;
  }
  if (currentVersion == null || currentVersion <= action.payload.version) {
    // alertMessage('warning', `${i18next.t('Expired Token')}`, i18next.t('Please login again'));
    let currentUserSetting: IUserSetting | null = yield select((state: IState) => state.currentUserSetting);
    while (currentUserSetting == null) {
      currentUserSetting = yield call(
        waitForNextData,
        (state: IState) => state.usersSetting,
        3000,
        (newValue, _) => newValue != null
      );
    }
    if (currentUserSetting == null) {
      yield checkVersionAndState(action.payload.version, SHOW_LOGIN, closeReLoginModalAndSignOut);
      return;
    }
    if (currentUserSetting?.isBiometric === true) {
      // only for user turn on biometric
      yield checkVersionAndState(action.payload.version, SHOW_MODAL, showModalBiometric);
    } else {
      yield checkVersionAndState(action.payload.version, SHOW_LOGIN, function* () {
        yield put(ReloadControllerAction.setSavedRoutesForPassword());
        yield closeReLoginModalAndSignOut();
      });
    }
  } else {
    if (__DEV__) {
      console.log('ignore check refresh token invalid', currentVersion, action.payload.version);
    }
  }
}

export function* watchRefreshTokenInvalid() {
  yield takeEverySequential(ON_REFRESH_TOKEN_INVALID, handleRefreshTokenInvalid);
}
