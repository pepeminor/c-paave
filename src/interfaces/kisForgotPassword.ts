export interface IKisVerifyForgotPasswordRequest {
  clientID: string;
  idCardNo: string;
  isResendOTP: boolean;
}

export interface IKisVerifyForgotPasswordResponse {
  matrixKey: string;
}

export interface IResetKisPasswordParams {
  clientID: string;
  newPassword: string;
  otpValue: string;
}
