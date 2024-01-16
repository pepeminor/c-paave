import { IAction } from 'interfaces/common';
import { DISPLAY_MODAL_OTP_PORTFOLIO, HIDE_MODAL_OTP_PORTFOLIO, LINK_ACCOUNTS } from '../actions';
import { SUCCESS } from 'reduxs/action-type-utils';

export function LinkAccountsSuccessTrigger(state = false, action: IAction<null>) {
  switch (action.type) {
    case SUCCESS(LINK_ACCOUNTS):
      return !state;
    default:
      return state;
  }
}

export function displayModalOTPPortfolio(state = false, action: IAction<null>) {
  switch (action.type) {
    case HIDE_MODAL_OTP_PORTFOLIO:
      return false;
    case DISPLAY_MODAL_OTP_PORTFOLIO:
      return true;
    default:
      return state;
  }
}
