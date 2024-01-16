import { SOCIAL_LINK } from 'constants/main';
import { HomeScreenOption, LANG } from '../global/index';

export interface IUserUpdateFullNameParams {
  readonly fullname: string;
}

export interface IUserUpdateUserNameParams {
  readonly username: string;
}

export interface IUserUpdateEmailParams {
  readonly email: string;
  readonly otpKey: string;
}

export interface IUserUpdateResponse {
  readonly status: string;
}

export interface ISearchUserParams {
  readonly name: string;
  readonly pageSize: number;
  readonly pageNumber: number;
}

export interface ISearchUserResponse {
  readonly userId: number;
  readonly username: string;
  readonly fullname: string;
  readonly bio: string | null;
}

export interface ISocialLink {
  avatar: string;
  name: string;
  email: string;
  socialType: SOCIAL_LINK;
}

export interface IGetAccountInfoResponse {
  readonly username: string;
  readonly fullname: string;
  readonly email: string;
  readonly bio: string;
  readonly id: number;
  readonly socialLinkAccounts: ISocialLink[];
}

export interface IGetAccountInfo {
  readonly username: string;
  readonly fullname: string;
  readonly email: string;
  readonly bio: string;
  readonly id: number;
  readonly isPasswordCreated?: boolean;
}

export interface IGetKisAccountInfoRequest {
  readonly clientID: string;
}
export interface IGetKisAccountInfoResponse {
  authorizedPerson: IAuthorizedPersonDetail;
  customerProfile: ICustomerProfileDetail;
}

export interface IAuthorizedPersonDetail {
  readonly exist: boolean;
  readonly authorizedPersonsName: string;
  readonly authorizedPersonsID: string;
  readonly email: string;
}

export interface ICustomerProfileDetail {
  readonly accountNo: string;
  readonly customerID: string;
  readonly userName: string;
  readonly IDNumberPassport: string;
  readonly address: string;
  readonly telephone: string;
  readonly mobilePhone: string;
  readonly email: string;
  readonly authorizedPerson: boolean;
}

export interface IPutUpdateUserBioParams {
  readonly bio: string;
}

export interface IConfirmUser {
  readonly password: string;
}

export interface IConfirmUserResponse {
  readonly value: boolean;
  readonly message: string;
}

export interface IDisableUser {
  readonly reason: string;
}

export interface IDisableUserResponse {
  readonly status: boolean;
}

export interface IUserInfoFromLoginParams {
  readonly userId: number;
  readonly kisUsername?: string;
  readonly paaveUsername?: string;
}

export interface IUserInfoFromLogin {
  readonly userId: number;
  readonly kisUsername: string;
  readonly paaveUsername: string;
  readonly email: string;
}

// usersSetting flow
export interface IUserSetting {
  accountNo: number;
  mobileOTP: boolean; // this option is for user to switchable between OTP and sms when true and only sms when false
  notification: boolean;
  language: LANG;
  alreadyDoneSmsOTP: boolean;
  vibrate: boolean;
  isSms: boolean;
  darkMode: boolean;
  paaveUsername: string;
  kisUsername: string;
  isBiometric: boolean;
  email: string;
  homeScreen: HomeScreenOption;
}

export interface IUsersSetting {
  listUsers: IUserSetting[];
  currentBiometricUsername: {
    kisUsername: string;
    paaveUsername: string;
    email: string;
  };
}

export interface IUpdateBiometricUsernameParams {
  kisUsername: string;
  paaveUsername: string;
  email: string;
}

// usersSetting flow
export type IUserSettingParams = Partial<IUserSetting>;

export interface IUpdatePaaveOnlyUsers {
  username: string;
  value: boolean;
}
