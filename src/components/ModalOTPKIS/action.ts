import { INotifyOtpPartner } from 'interfaces/notification';
import { NOTIFY_KIS_MOBILE_OTP } from 'reduxs/actions';
import { NOTIFY_KIS_MOBILE_OTP_FAILED, NOTIFY_KIS_MOBILE_OTP_SUCCESS } from './reducers';

export const notifyKisMobileOtp = (payload: INotifyOtpPartner) => ({
  type: NOTIFY_KIS_MOBILE_OTP,
  response: {
    success: NOTIFY_KIS_MOBILE_OTP_SUCCESS,
    fail: NOTIFY_KIS_MOBILE_OTP_FAILED,
  },
  payload,
});
