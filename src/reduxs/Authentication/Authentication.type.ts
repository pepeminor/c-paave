import { PayloadAction } from '@reduxjs/toolkit';
import { SOCIAL_LINK } from 'constants/main';
import { ILoginBiometricRequest, ILoginParams as ILoginParamsPaave, ILoginResponse } from 'interfaces/authentication';
import { IAPI, IResponse } from 'interfaces/common';

export interface ICheckUserNameParams {
  userName: string;
  callback?(error?: any, result?: boolean): void;
}

export interface ICheckUserNameResponse {
  exist: boolean;
  verified: boolean;
}

export interface ILoginParams {
  data: {
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
  };
  rememberMe: boolean;
  fullName: string;
  accessToken: string;
  callback: (params: {
    error?: any;
    data?: any;
    callbackData?: {
      responseData: IResponse<ILoginResponse>;
      action: PayloadAction<ILoginParams>;
    };
  }) => void;
  isSignIn: boolean;
}

export interface IContinueLoginSocialParams {
  data: {
    responseData: IResponse<ILoginResponse>;
    action: PayloadAction<ILoginParams>;
  };
}

export interface ICreatePasswordParams {
  params: {
    password: string;
  };
  callback: (error?: any, res?: any) => void;
}

export interface ISocialLinkItem {
  avatar: string;
  name: string;
  email: string;
  socialType: SOCIAL_LINK;
  isLoading: boolean;
  isLinked: boolean;
}

export interface ILinkSocialParams {
  params: {
    socialType: SOCIAL_LINK;
    socialToken: string;
    secCode: string;
  };
  callback: (error?: any, res?: any) => void;
}

export interface IUnlinkSocialParams {
  params: {
    socialType: SOCIAL_LINK;
  };
}

export type ReLoginRequest = {
  api: IAPI;
  params: Partial<ILoginParamsPaave | ILoginBiometricRequest>;
};
