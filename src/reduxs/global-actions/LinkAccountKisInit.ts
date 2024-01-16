import { ILinkAccountKisInitRequest } from 'interfaces/common';
import { LINK_ACCOUNT_KIS_INIT } from 'reduxs/actions';
import { LINK_ACCOUNT_KIS_INIT_FAILED, LINK_ACCOUNT_KIS_INIT_SUCCESS } from 'reduxs/global-reducers/LinkAccountKisInit';

export const linkAccountInit = (payload: ILinkAccountKisInitRequest) => ({
  type: LINK_ACCOUNT_KIS_INIT,
  response: {
    success: LINK_ACCOUNT_KIS_INIT_SUCCESS,
    fail: LINK_ACCOUNT_KIS_INIT_FAILED,
  },
  payload,
});
