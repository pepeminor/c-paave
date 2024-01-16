import { IAction } from 'interfaces/common';
import {
  CURRENT_USERS_SETTING,
  CURRENT_USERS_INFO_SUB_ACCOUNT,
  SEARCH_GET_USER_SUB_ACCOUNT,
  USERS_SETTING,
  CURRENT_USER_INFO,
} from '../actions';
import { IUserSetting, IUserInfoFromLogin, IUsersSetting } from '../../interfaces/user';
import { SUCCESS, RESET } from '../action-type-utils';

// usersSetting flow
export function UserInfoFromLogin(state: IUserInfoFromLogin | null = null, action: IAction<IUserInfoFromLogin>) {
  switch (action.type) {
    case SUCCESS(CURRENT_USER_INFO):
      return action.payload;
    case RESET(CURRENT_USER_INFO):
      return null;
    default:
      return state;
  }
}

// usersSetting flow
export function UsersSetting(
  state: IUsersSetting = {
    listUsers: [],
    currentBiometricUsername: {
      kisUsername: '',
      paaveUsername: '',
      email: '',
    },
  },
  action: IAction<IUsersSetting>
) {
  switch (action.type) {
    case SUCCESS(USERS_SETTING):
      return action.payload;
    default:
      return state;
  }
}

// usersSetting flow
export function CurrentUserSetting(state: IUserSetting | null = null, action: IAction<IUserSetting>) {
  switch (action.type) {
    case SUCCESS(CURRENT_USERS_SETTING):
      return { ...state, ...action.payload };
    case RESET(CURRENT_USERS_SETTING):
      return null;
    default:
      return state;
  }
}

// usersSetting flow
export function CurrentSubContestUser(state: string | null = null, action: IAction<string>) {
  switch (action.type) {
    case CURRENT_USERS_INFO_SUB_ACCOUNT:
      return null;
    case SEARCH_GET_USER_SUB_ACCOUNT:
      return null;
    case SUCCESS(SEARCH_GET_USER_SUB_ACCOUNT):
      return action.payload;
    case SUCCESS(CURRENT_USERS_INFO_SUB_ACCOUNT):
      return action.payload;
    case RESET(CURRENT_USERS_INFO_SUB_ACCOUNT):
      return null;
    default:
      return state;
  }
}
