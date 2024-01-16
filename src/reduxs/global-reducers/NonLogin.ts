import { IAction } from 'interfaces/common';
import { RESET } from 'reduxs/action-type-utils';
import { NON_LOGIN_MODAL, NON_LOGIN_RECENT_VIEWED } from 'reduxs/actions';

export function NonLoginModal(state = false, action: IAction<boolean>) {
  switch (action.type) {
    case NON_LOGIN_MODAL:
      return action.payload;
    default:
      return state;
  }
}

export function NonLoginRecentViewed(state: string[] = [], action: IAction<string>): string[] {
  switch (action.type) {
    case NON_LOGIN_RECENT_VIEWED:
      return [...new Set([action.payload, ...state])].slice(0, 8);
    case RESET(NON_LOGIN_RECENT_VIEWED):
      return [];
    default:
      return state;
  }
}
