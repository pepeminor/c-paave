import { ACCOUNT_TYPE } from 'global';
import { ILoginParams, ILoginResponse } from 'interfaces/authentication';
import { IAction } from 'interfaces/common';
import { INotificationMarkAsReadParams } from 'interfaces/notification';
import { IUserUpdateUserNameParams } from 'interfaces/user';
import { merge } from 'lodash';
import { SUCCESS } from 'reduxs/action-type-utils';
import {
  AUTHENTICATION_LOGIN,
  AUTHENTICATION_LOGIN_NON_USER,
  DISCOVER_WATCHLIST_SET_DEFAULT,
  LEADER_BOARD_CONTEST_MODAL,
  NOTIFICATION_PUT_MARK_AS_READ_LOCAL,
  USER_UPDATE_USERNAME,
} from 'reduxs/actions';

const DEMO_ACCOUNT = 'Demo account';

type UserBasedReducerData = {
  contestModal: boolean;
  favoriteWatchlist?: {
    [s in ACCOUNT_TYPE]?: number;
  };
  readNotification?: Record<number, boolean>;
  latestReadNotificationId?: number;
};

type UserBasedReducerType = {
  currentUser: string;
  data: UserBasedReducerData;
  userList: { [s: string]: UserBasedReducerData };
  tempUsername?: string; // Become real username if SUCCESS(USER_UPDATE_USERNAME) is dispatched
};

function getInitState(): UserBasedReducerData {
  return {
    contestModal: false,
    favoriteWatchlist: {},
    readNotification: {},
  };
}

function getDemoUserInitState(): UserBasedReducerData {
  return {
    contestModal: false,
    favoriteWatchlist: {},
    readNotification: {},
  };
}

export function UserBasedReducer(
  state: UserBasedReducerType = {
    currentUser: 'default',
    data: getInitState(),
    userList: { [DEMO_ACCOUNT]: getDemoUserInitState() },
  },
  action: IAction<unknown>
): UserBasedReducerType {
  switch (action.type) {
    case LEADER_BOARD_CONTEST_MODAL:
      return updateUserBasedData(state, { contestModal: action.payload as boolean });
    case DISCOVER_WATCHLIST_SET_DEFAULT:
      return updateUserBasedData(state, { favoriteWatchlist: merge(state.data.favoriteWatchlist, action.payload) });
    case NOTIFICATION_PUT_MARK_AS_READ_LOCAL: {
      const payload = action.payload as INotificationMarkAsReadParams;
      if (payload.notificationId == null) {
        return updateUserBasedData(state, { latestReadNotificationId: payload.lastId });
      }
      const readNotification = state.data.readNotification ?? {};
      payload.notificationId.forEach(id => {
        readNotification[id] = true;
      });
      return updateUserBasedData(state, { readNotification });
    }
    // Cases below: Manage UserBasedReducer
    case SUCCESS(AUTHENTICATION_LOGIN_NON_USER):
    case SUCCESS(AUTHENTICATION_LOGIN): {
      const loginData = action.payload as ILoginResponse & ILoginParams;
      const username = loginData.userInfo?.username ?? DEMO_ACCOUNT;
      if (!state.userList[username]) {
        state.userList[username] = getInitState();
      }
      return {
        ...state,
        currentUser: username,
        data: state.userList[username],
      };
    }
    case USER_UPDATE_USERNAME: {
      const tempUsername = action.payload as IUserUpdateUserNameParams;
      return { ...state, tempUsername: tempUsername.username };
    }
    case SUCCESS(USER_UPDATE_USERNAME):
      if (!state.tempUsername) return state;
      delete state.userList[state.currentUser];
      return {
        ...state,
        currentUser: state.tempUsername,
        userList: { ...state.userList, [state.tempUsername]: state.data },
      };
    default:
      return state;
  }
}

function updateUserBasedData(state: UserBasedReducerType, data: Partial<UserBasedReducerData>): UserBasedReducerType {
  const newData = { ...state.data, ...data };
  return {
    ...state,
    data: newData,
    userList: { ...state.userList, [state.currentUser]: newData },
  };
}
