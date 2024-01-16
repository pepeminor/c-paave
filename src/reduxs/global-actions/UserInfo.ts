import { IUserUpdateFullNameParams, IUserUpdateUserNameParams, IUserUpdateEmailParams } from 'interfaces/user';
import {
  USER_ACCOUNT_INFO,
  USER_ACCOUNT_BIO,
  USER_UPDATE_FULLNAME,
  USER_UPDATE_USERNAME,
  USER_UPDATE_EMAIL,
  USER_KIS_ACCOUNT_INFO,
  CURRENT_USERS_INFO_SUB_ACCOUNT,
} from 'reduxs/actions';

import { generateAction } from 'utils';
import { IUserSettingParams, IUpdateBiometricUsernameParams } from '../../interfaces/user';
import { CURRENT_USERS_SETTING, USERS_SETTING, UPDATE_CURRENT_USERS_SETTING } from '../actions';

export const updateFullNameParams = generateAction<IUserUpdateFullNameParams>(USER_UPDATE_FULLNAME);

export const updateUsernameParams = generateAction<IUserUpdateUserNameParams>(USER_UPDATE_USERNAME);

export const updateEmailParams = generateAction<IUserUpdateEmailParams>(USER_UPDATE_EMAIL);

export const getUserAccountInfo = generateAction(USER_ACCOUNT_INFO);

export const getUserKisAccountInfo = generateAction(USER_KIS_ACCOUNT_INFO);

export const putUserBio = generateAction(USER_ACCOUNT_BIO);

// usersSetting flow
export const getCurrentUserSetting = generateAction(CURRENT_USERS_SETTING);

// usersSetting flow
export const updateCurrentUserSetting = generateAction<IUserSettingParams>(UPDATE_CURRENT_USERS_SETTING);

// usersSetting flow
export const updateUsersSetting = generateAction<IUpdateBiometricUsernameParams | null>(USERS_SETTING);

export const setCurrentUserSubAccount = generateAction(CURRENT_USERS_INFO_SUB_ACCOUNT);
