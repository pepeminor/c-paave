import { ILoginParams, ILoginResponse } from 'interfaces/authentication';
import { IAction } from 'interfaces/common';
import { IUpdatePaaveOnlyUsers, IUserInfoFromLogin, IUserUpdateUserNameParams } from 'interfaces/user';
import { SUCCESS } from 'reduxs/action-type-utils';
import {
  AUTHENTICATION_LOGIN,
  CURRENT_USER_INFO,
  KIS_SESSION_TIMEOUT,
  UPDATE_PAAVE_ONLY_USERS,
  USER_UPDATE_USERNAME,
} from 'reduxs/actions';
import { SESSION_TIMEOUT, SESSION_TIMEOUT_ENUM } from 'constants/sessionTimeout';
import { IState } from '.';

type SessionTimeoutType = {
  current: {
    user: string;
    value: SESSION_TIMEOUT_ENUM;
  };
  data: { [s: string]: SESSION_TIMEOUT_ENUM };
  savedPaaveOnlyUsers: {
    [s: string]: boolean;
  };
  kisToPaaveUsernameMap: {
    [s: string]: string;
  };
  tempUsername?: string; // Become real username if SUCCESS(USER_UPDATE_USERNAME) is dispatched
};

export function SelectKisSessionTimeout(state: IState, username?: string, kisUsername?: string) {
  if (kisUsername != null) {
    username = state.kisSessionTimeout.kisToPaaveUsernameMap?.[kisUsername];
  }
  if (username == null) {
    const timeOut = state.kisSessionTimeout.current.value;
    return SESSION_TIMEOUT[timeOut]?.value;
  }
  if (state.kisSessionTimeout.savedPaaveOnlyUsers?.[username]) {
    return undefined;
  }
  const timeOut = state.kisSessionTimeout.data[username] ?? SESSION_TIMEOUT_ENUM.EIGHT_HOURS;
  return SESSION_TIMEOUT[timeOut]?.value;
}

export function KisSessionTimeout(
  state: SessionTimeoutType = {
    current: {
      user: 'default',
      value: SESSION_TIMEOUT_ENUM.EIGHT_HOURS,
    },
    data: {},
    savedPaaveOnlyUsers: {},
    kisToPaaveUsernameMap: {},
  },
  action: IAction<unknown>
  // Action type:
  // case: KIS_SESSION_TIMEOUT
  //   SESSION_TIMEOUT_ENUM
  // case: SUCCESS(AUTHENTICATION_LOGIN)
  //   (ILoginResponse & ILoginParams)
  // case: USER_UPDATE_USERNAME
  //   IUserUpdateUserNameParams
  // case: UPDATE_PAAVE_ONLY_USERS
  //   IUpdatePaaveOnlyUsers
  // case: SUCCESS(CURRENT_USER_INFO)
  //   IUserInfoFromLogin
): SessionTimeoutType {
  switch (action.type) {
    case KIS_SESSION_TIMEOUT: {
      const newTimeout = action.payload as SESSION_TIMEOUT_ENUM;
      return {
        ...state,
        current: {
          user: state.current.user,
          value: newTimeout,
        },
        data: { ...state.data, [state.current.user]: newTimeout },
      };
    }
    case SUCCESS(AUTHENTICATION_LOGIN): {
      const loginData = action.payload as ILoginResponse & ILoginParams;
      const username = loginData.userInfo?.username ?? 'Demo account';
      if (!state.data[username]) {
        state.data[username] = SESSION_TIMEOUT_ENUM.EIGHT_HOURS;
      }
      return {
        ...state,
        current: {
          user: username,
          value: state.data[username],
        },
      };
    }
    case USER_UPDATE_USERNAME: {
      const tempUsername = action.payload as IUserUpdateUserNameParams;
      return { ...state, tempUsername: tempUsername.username };
    }
    case SUCCESS(USER_UPDATE_USERNAME):
      if (state.tempUsername == null) {
        return state;
      }
      delete state.data[state.current.user];
      return {
        ...state,
        current: { ...state.current, user: state.tempUsername },
        data: { ...state.data, [state.tempUsername]: state.current.value },
      };
    case UPDATE_PAAVE_ONLY_USERS: {
      const { username, value } = action.payload as IUpdatePaaveOnlyUsers;
      return {
        ...state,
        savedPaaveOnlyUsers: {
          ...state.savedPaaveOnlyUsers,
          [username]: value,
        },
      };
    }
    case SUCCESS(CURRENT_USER_INFO): {
      const payload = action.payload as IUserInfoFromLogin;
      if (payload.kisUsername == null || payload.kisUsername === '') {
        return state;
      }
      return {
        ...state,
        kisToPaaveUsernameMap: {
          ...state.kisToPaaveUsernameMap,
          [payload.kisUsername]: payload.paaveUsername,
        },
      };
    }
    default:
      return state;
  }
}
