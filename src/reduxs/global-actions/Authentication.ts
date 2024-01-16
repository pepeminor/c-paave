import {
  IAuthTokenResponse,
  IAutoSignupOTPParams,
  IChangePINParams,
  IChangePasswordForKisParams,
  IChangePasswordParams,
  ICheckUserExistParams,
  IGetOTPParams,
  ILoginParams,
  ILoginSECParams,
  IRawLoginBiometricRequest,
  IRefreshAuthTokenParams,
  IRegisterUserParams,
  IResetPasswordParams,
  IVerifyOTPParams,
} from 'interfaces/authentication';
import { IAction, INotifyMessage } from 'interfaces/common';
import {
  AUTHENTICATION_AUTH_TOKEN,
  AUTHENTICATION_CHANGE_PASSWORD,
  AUTHENTICATION_GET_OTP,
  AUTHENTICATION_GET_OTP_FAIL,
  AUTHENTICATION_GET_OTP_SUCCESS,
  AUTHENTICATION_KIS_AUTH_TOKEN,
  AUTHENTICATION_LOGIN,
  AUTHENTICATION_LOGIN_NON_USER,
  AUTHENTICATION_LOGIN_SEC,
  AUTHENTICATION_REFRESH_TOKEN,
  AUTHENTICATION_REGISTER_PARAMS,
  AUTHENTICATION_REMOVE_TOKEN,
  AUTHENTICATION_RESET_PASSWORD,
  AUTHENTICATION_RESET_PASSWORD_PARAMS,
  AUTHENTICATION_SET_OTP_PARAMS,
  AUTHENTICATION_VERIFY_OTP,
  AUTO_SIGNUP_OTP,
  CLOSE_MODAL_UPDATE_APP,
  GENERATE_NEW_KIS_CARD,
  KIS_AUTHENTICATION_CHANGE_PASSWORD,
  KIS_CHANGE_PIN,
  KIS_CLOSE_MODAL_OTP,
  KIS_OPEN_MODAL_OTP,
  LOGIN_BIOMETRIC,
  LOGIN_BIOMETRIC_AFTER_TIME_OUT,
  OPEN_MODAL_UPDATE_APP,
  SUGGEST_BIOMETRIC,
  AUTHENTICATION_CHECK_USER_EXIST,
  AUTHENTICATION_REGISTER_USER,
  RE_LOGIN_BIOMETRIC,
  UPDATE_PAAVE_ONLY_USERS,
} from 'reduxs/actions';
import { generateAction, generateActionObject } from 'utils';
import { RESET } from 'reduxs/action-type-utils';
import { IUpdatePaaveOnlyUsers } from 'interfaces/user';

export enum linkedAccountFrom {
  SIGNUP = 'SIGNUP',
  LOGIN = 'LOGIN',
  CONNECT_ACCOUNT = 'CONNECT_ACCOUNT',
}

export enum generateKisCardFrom {
  LOGIN = 'LOGIN3',
  NOT_LOGIN = 'NOT_LOGIN',
  CONNECT_ACCOUNT = 'CONNECT_ACCOUNT3',
  TRADE = 'TRADE',
  CANCEL_ORDER = 'CANCEL_ORDER',
  MODIFY_ORDER = 'MODIFY_ORDER',
  CASH_IN_ADVANCE = 'CASH_IN_ADVANCE',
}

export const registerUser = generateAction<IRegisterUserParams>(AUTHENTICATION_REGISTER_USER);

export const checkUserExist = generateAction<ICheckUserExistParams>(AUTHENTICATION_CHECK_USER_EXIST);

export const getOTP = (payload: IGetOTPParams, showMessage?: INotifyMessage): IAction<IGetOTPParams> => {
  return {
    type: AUTHENTICATION_GET_OTP,
    payload,
    response: {
      success: AUTHENTICATION_GET_OTP_SUCCESS,
      fail: AUTHENTICATION_GET_OTP_FAIL,
    },
    showLoading: true,
    showMessage,
    navigation: payload.navigation,
  };
};

export const setOTPParams = (payload: IGetOTPParams, showMessage?: INotifyMessage): IAction<IGetOTPParams> => {
  return {
    type: AUTHENTICATION_SET_OTP_PARAMS,
    payload,
    showMessage,
  };
};

export const verifyOTP = generateAction<IVerifyOTPParams>(AUTHENTICATION_VERIFY_OTP);
export const autoSignupOTP = generateAction<IAutoSignupOTPParams>(AUTO_SIGNUP_OTP);

export const login = generateAction<ILoginParams>(AUTHENTICATION_LOGIN);
export const loginNonUser = generateAction(AUTHENTICATION_LOGIN_NON_USER);
export const loginSEC = generateAction<ILoginSECParams>(AUTHENTICATION_LOGIN_SEC);

export const changePassword = generateAction<IChangePasswordParams>(AUTHENTICATION_CHANGE_PASSWORD);

export const changePasswordForKis = generateAction<IChangePasswordForKisParams>(KIS_AUTHENTICATION_CHANGE_PASSWORD);
export const changePIN = generateAction<IChangePINParams>(KIS_CHANGE_PIN);

export const resetPassword = (
  payload: IResetPasswordParams,
  showMessage?: INotifyMessage
): IAction<IResetPasswordParams> => {
  return {
    type: AUTHENTICATION_RESET_PASSWORD,
    payload,
    showMessage,
    navigation: payload.navigation,
  };
};

export const changeResetPasswordParams = (
  payload: IResetPasswordParams,
  showMessage?: INotifyMessage
): IAction<IResetPasswordParams> => {
  return {
    type: AUTHENTICATION_RESET_PASSWORD_PARAMS,
    payload,
    showMessage,
  };
};

export const changeRegisterParams = generateAction<IRegisterUserParams>(AUTHENTICATION_REGISTER_PARAMS);

export const setAuthToken = (
  payload: IAuthTokenResponse,
  showMessage?: INotifyMessage
): IAction<IAuthTokenResponse> => {
  return {
    type: AUTHENTICATION_AUTH_TOKEN,
    payload,
    showMessage,
  };
};

export const loginBiometric = generateAction<IRawLoginBiometricRequest>(LOGIN_BIOMETRIC);

export const setKisAuthToken = (
  payload: IAuthTokenResponse,
  showMessage?: INotifyMessage
): IAction<IAuthTokenResponse> => {
  return {
    type: AUTHENTICATION_KIS_AUTH_TOKEN,
    payload,
    showMessage,
  };
};

export const generateNewKisCard = generateAction<{ username: string; from: generateKisCardFrom }>(
  GENERATE_NEW_KIS_CARD
);

export const resetGenerateNewKisCard = () => ({
  type: RESET(GENERATE_NEW_KIS_CARD),
});

export const refreshAuthToken = generateAction<IRefreshAuthTokenParams>(AUTHENTICATION_REFRESH_TOKEN);

export const removeAuthToken = () => {
  return {
    type: AUTHENTICATION_REMOVE_TOKEN,
  };
};

export const onCloseModalOTPKIS = generateAction(KIS_CLOSE_MODAL_OTP);

export const onOpenModalOTPKIS = generateAction(KIS_OPEN_MODAL_OTP);

export const onOpenModalUpdateApp = () => ({
  type: OPEN_MODAL_UPDATE_APP,
});

export const onCloseModalUpdateApp = () => ({
  type: CLOSE_MODAL_UPDATE_APP,
});

export const loginBiometricAfterTimeOut = generateActionObject<{ signature: string; username: string }>(
  LOGIN_BIOMETRIC_AFTER_TIME_OUT
);

export const reLoginBiometric = generateActionObject<{ signature: string; username: string }>(RE_LOGIN_BIOMETRIC);

export const suggestBiometric = generateAction(SUGGEST_BIOMETRIC);

export const updatePaaveOnlyUsers = generateAction<IUpdatePaaveOnlyUsers>(UPDATE_PAAVE_ONLY_USERS);
