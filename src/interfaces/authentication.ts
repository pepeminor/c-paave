import { CheckUserExistType } from 'constants/enum';
import { SYSTEM_TYPE } from 'global';
import { IParams } from './common';

export interface IRegisterUserParams extends IParams {
  readonly email?: string;
  readonly password?: string;
  readonly otpKey?: string;
  readonly registeredUsername?: string;
  readonly fullname?: string;
  readonly deviceId?: string;
}

export interface IAuthTokenResponse extends IParams {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly accExpiredTime: number;
  readonly refExpiredTime: number;
}

export interface IRawLoginBiometricRequest {
  readonly signatureValue: string;
  readonly username: string;
  readonly rememberMe: boolean;
  readonly fullName?: string;
}

export interface ILoginBiometricRequest extends IRawLoginBiometricRequest {
  readonly grant_type: string;
  readonly client_id: string;
  readonly client_secret: string;
  readonly device_id: string;
  readonly appVersion: string;
  readonly platform: string;
  session_time_in_minute?: number;
}

export enum GetOTPIdType {
  EMAIL = 'EMAIL',
}

export enum GetOTPTxType {
  REGISTER = 'REGISTER',
  RESET_PASSWORD = 'RESET_PASSWORD',
  UPDATE_PROFILE = 'UPDATE_PROFILE',
}

export enum kisVerifyAndSaveOTPFrom {
  LOGIN = 'LOGIN',
  NOT_LOGIN = 'NOT_LOGIN',
  TRADE = 'TRADE2',
  CANCEL_ORDER = 'CANCEL_ORDER2',
  MODIFY_ORDER = 'MODIFY_ORDER2',
  LOGIN_REAL_ACCOUNT = 'LOGIN_REAL_ACCOUNT',
  CASH_IN_ADVANCE = 'CASH_IN_ADVANCE',
}
export interface IGetOTPParams extends IParams {
  readonly id: string; // email
  readonly idType: GetOTPIdType;
  readonly txType: GetOTPTxType;
}

export interface IGetOTPResponse {
  readonly otpId: string;
  readonly expiredTime: string;
}

export interface IVerifyOTPParams extends IParams {
  readonly otpId: string;
  readonly otpValue: string;
  readonly txType?: string;
}

export interface IVerifyOTPResponse {
  readonly expiredTime: string;
  readonly keyToken: string;
  readonly statusCodeValue?: number;
}

export interface ICheckUserExistParams extends IParams {
  readonly type: CheckUserExistType;
  readonly value: string;
  readonly getOTPParams?: IGetOTPParams;
}

export interface ILoginParams extends IParams {
  readonly platform: string;
  readonly appVersion: string;
  readonly grant_type: string; // Defind login type (with password or FB...)
  readonly client_id: string; // Prevent too many login requests
  readonly client_secret: string; // Prevent too many login requests
  readonly username?: string;
  readonly password?: string;
  readonly device_id: string;
  readonly rememberMe?: boolean;
  readonly sec_code?: string;
  readonly login_social_token?: string;
  readonly login_social_type?: 'GOOGLE' | 'FACEBOOK' | 'APPLE';
  session_time_in_minute?: number;
}

export interface ILoginResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly accExpiredTime: number;
  readonly refExpiredTime: number;
  readonly userInfo?: {
    readonly avatar: string;
    readonly email: string;
    readonly emailVerified: boolean;
    readonly firstLogin: boolean;
    readonly id: number;
    readonly username: string;
    readonly password: string;
    readonly body?: {
      readonly errorCode: string;
      readonly errorMsg: string;
      readonly status: number;
      readonly timestamp: string;
    };
    readonly headers?: object;
    readonly statusCode?: string;
    readonly statusCodeValue?: number;
  };
}

export interface ILoginSECParams extends IParams {
  platform: string;
  partnerId: string;
  partner: {
    clientId: string;
    clientSecret: string;
    grantType: string;
    username: string;
    password: string;
  };
  paave: {
    clientId: string;
    clientSecret: string;
    grantType: string;
  };
  session_time_in_minute?: number;
  rememberMe: boolean;
  appVersion: string;
  infoAccessGranted?: boolean;
}

export interface ILoginSECResponse {
  paave: {
    accessToken: string;
    refreshToken: string;
    userInfo: {
      id: number;
      username: string;
      email: string;
      emailVerified: boolean;
      firstLogin: boolean;
    };
    accExpiredTime: number;
    refExpiredTime: number;
  };
  partner: {
    accessToken: string;
    refreshToken: string;
    userInfo: {
      username: string;
      id: number;
      avatar: string;
      birthday: string;
      email: string;
      phoneCode: number;
      phoneNumber: number;
      accounts: [
        {
          accountNumber: string;
          accountName: string;
          accountSubs: [
            {
              type: SYSTEM_TYPE;
              bankAccounts: number;
            }
          ];
        }
      ];
    };
    accExpiredTime: number;
    refExpiredTime: number;
  };
}

export interface ICheckUserExistResponse {
  readonly exist: boolean;
  readonly verified: boolean;
}

export interface IChangePasswordParams extends IParams {
  readonly oldPassword: string;
  readonly newPassword: string;
}

export interface IChangePINParams {
  readonly currentPassword: string;
  readonly newPassword: string;
}

export interface IChangePasswordForKisParams {
  readonly clientID: string;
  readonly oldPassword: string;
  readonly newPassword: string;
}
export interface IResetPasswordParams extends IParams {
  readonly otpKey?: string;
  readonly username?: string;
  readonly newPassword?: string;
}

export interface IResetPasswordResponse {
  readonly status: boolean;
}

export interface INewsParams extends IParams {
  readonly fetchCount: number;
}

export interface IRefreshAuthTokenParams {
  grant_type: string;
  client_id: string;
  client_secret: string;
  refresh_token: string;
}

export interface IRegisterUserResponse {
  userId: number;
  username: string;
  email: string;
  isEmailVerified: boolean;
}

export interface IAutoSignupOTPParams {
  readonly email: string;
  readonly otpKey: string;
  readonly grant_type: string;
  readonly client_id: string;
  readonly client_secret: string;
}

export interface IAutoSignupOTPResponse {
  readonly loginResult: {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly userInfo: {
      readonly username: string;
      readonly id: number;
      readonly avatar: string;
      readonly birthday: number;
      readonly email: string;
      readonly phoneCode: number;
      readonly phoneNumber: number;
      readonly emailVerified: boolean;
      readonly firstLogin: boolean;
    };
    readonly otpIndex: number;
    readonly userLevel: number;
    readonly accExpiredTime: number;
    readonly refExpiredTime: number;
    readonly registerMobileOtp: number;
    readonly error: string;
  };
}
