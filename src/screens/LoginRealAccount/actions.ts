import { IKisVerifyAndSaveOTPRequest, ILoginRealAccountRequest } from '../../interfaces/common';
import { KIS_VERIFY_AND_SAVE_OTP, LOGIN_REAL_ACCOUNT } from 'reduxs/actions';
import {
  KIS_VERIFY_AND_SAVE_OTP_FAILED,
  KIS_VERIFY_AND_SAVE_OTP_SUCCESS,
  LOGIN_REAL_ACCOUNT_FAILED,
  LOGIN_REAL_ACCOUNT_SUCCESS,
} from './reducers';
import { kisVerifyAndSaveOTPFrom } from 'interfaces/authentication';

export const loginRealAccount = (payload: ILoginRealAccountRequest) => ({
  type: LOGIN_REAL_ACCOUNT,
  response: {
    success: LOGIN_REAL_ACCOUNT_SUCCESS,
    fail: LOGIN_REAL_ACCOUNT_FAILED,
  },
  payload,
  showLoading: true,
});

export const kisVerifyAndSaveOTP = (
  payload: IKisVerifyAndSaveOTPRequest,
  from: kisVerifyAndSaveOTPFrom,
  onSuccess?: () => void
) => ({
  type: KIS_VERIFY_AND_SAVE_OTP,
  response: {
    success: KIS_VERIFY_AND_SAVE_OTP_SUCCESS,
    fail: KIS_VERIFY_AND_SAVE_OTP_FAILED,
  },
  payload,
  showLoading: true,
  from,
  callBack: {
    handleSuccess: onSuccess,
  },
});
