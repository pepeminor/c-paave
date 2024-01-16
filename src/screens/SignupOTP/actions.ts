import { IVerifyOTPForgotPasswordRequest, IVerifyOTPSignupRequest } from '../../interfaces/common';
import { VERIFY_OTP_FORGOT_PASSWORD, VERIFY_OTP_SIGNUP } from 'reduxs/actions';
import {
  VERIFY_OTP_SIGNUP_SUCCESS,
  VERIFY_OTP_SIGNUP_FAILED,
  VERIFY_OTP_FORGOT_PASSWORD_SUCCESS,
  VERIFY_OTP_FORGOT_PASSWORD_FAILED,
} from './reducers';

export const verifyOTPSignup = (payload: IVerifyOTPSignupRequest) => ({
  type: VERIFY_OTP_SIGNUP,
  response: {
    success: VERIFY_OTP_SIGNUP_SUCCESS,
    fail: VERIFY_OTP_SIGNUP_FAILED,
  },
  payload,
});

export const verifyOTPForgotPassword = (payload: IVerifyOTPForgotPasswordRequest) => ({
  type: VERIFY_OTP_FORGOT_PASSWORD,
  response: {
    success: VERIFY_OTP_FORGOT_PASSWORD_SUCCESS,
    fail: VERIFY_OTP_FORGOT_PASSWORD_FAILED,
  },
  payload,
});
