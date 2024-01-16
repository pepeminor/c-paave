import { ILinkAccountsLoginRequest, ILinkAccountsRequest } from 'interfaces/common';
import { LINK_ACCOUNTS, LINK_ACCOUNTS_LOGIN } from 'reduxs/actions';
import { HIDE_MODAL_OTP_PORTFOLIO } from '../actions';
import { generateAction } from 'utils';

export const linkAccounts = generateAction<ILinkAccountsRequest>(LINK_ACCOUNTS);

export const linkAccountsLogin = generateAction<ILinkAccountsLoginRequest>(LINK_ACCOUNTS_LOGIN);

export const showedOTPModalKis = () => ({
  type: HIDE_MODAL_OTP_PORTFOLIO,
});
