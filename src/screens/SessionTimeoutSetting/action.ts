import { KIS_SESSION_TIMEOUT } from 'reduxs/actions';
import { SESSION_TIMEOUT_ENUM } from 'constants/sessionTimeout';

export const setKISSessionTimeOut = (payload: SESSION_TIMEOUT_ENUM) => ({
  type: KIS_SESSION_TIMEOUT,
  payload,
});
