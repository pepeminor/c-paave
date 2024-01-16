import { generateAction } from 'utils';
import { VERIFY_OTP_KIS_FORGOT_PASSWORD, VERIFY_OTP_KIS_RESET_FORGOT_PASSWORD } from 'reduxs/actions';
import { IKisVerifyForgotPasswordRequest, IResetKisPasswordParams } from 'interfaces/kisForgotPassword';

export const verifyKisForgotPw = generateAction<IKisVerifyForgotPasswordRequest>(VERIFY_OTP_KIS_FORGOT_PASSWORD);
export const resetKisPassword = generateAction<IResetKisPasswordParams>(VERIFY_OTP_KIS_RESET_FORGOT_PASSWORD);
