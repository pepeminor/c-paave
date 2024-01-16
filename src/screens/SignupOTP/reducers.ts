import { IAction } from '../../interfaces/common';

export const VERIFY_OTP_SIGNUP_SUCCESS = 'VERIFY_OTP_SIGNUP_SUCCESS';
export const VERIFY_OTP_SIGNUP_FAILED = 'VERIFY_OTP_SIGNUP_FAILED';
export const VERIFY_OTP_FORGOT_PASSWORD_SUCCESS = 'VERIFY_OTP_FORGOT_PASSWORD_SUCCESS';
export const VERIFY_OTP_FORGOT_PASSWORD_FAILED = 'VERIFY_OTP_FORGOT_PASSWORD_FAILED';

export function VerifyOTPSignupStatusSuccessTrigger(state = false, action: IAction<null>) {
  switch (action.type) {
    case VERIFY_OTP_SIGNUP_SUCCESS:
      return !state;
    default:
      return state;
  }
}

export function VerifyOTPSignupStatusFailedTrigger(state = false, action: IAction<null>) {
  switch (action.type) {
    case VERIFY_OTP_SIGNUP_FAILED:
      return !state;
    default:
      return state;
  }
}

export function VerifyOTPFotgotPasswordStatusSuccessTrigger(state = false, action: IAction<null>) {
  switch (action.type) {
    case VERIFY_OTP_FORGOT_PASSWORD_SUCCESS:
      return !state;
    default:
      return state;
  }
}

export function VerifyOTPFotgotPasswordStatusFailedTrigger(state = false, action: IAction<null>) {
  switch (action.type) {
    case VERIFY_OTP_FORGOT_PASSWORD_FAILED:
      return !state;
    default:
      return state;
  }
}
