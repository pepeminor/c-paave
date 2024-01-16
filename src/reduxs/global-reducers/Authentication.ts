import {
  AUTHENTICATION_GET_OTP_SUCCESS,
  AUTHENTICATION_REGISTER_PARAMS,
  AUTHENTICATION_RESET_PASSWORD_PARAMS,
  AUTHENTICATION_SET_OTP_PARAMS,
  AUTHENTICATION_AUTH_TOKEN,
  AUTHENTICATION_REMOVE_TOKEN,
  AUTHENTICATION_KIS_AUTH_TOKEN,
  AUTHENTICATION_KIS_REMOVE_TOKEN,
  GET_LINKED_ACCOUNTS,
  GENERATE_NEW_KIS_CARD,
  KIS_CLOSE_MODAL_OTP,
  KIS_OPEN_MODAL_OTP,
  AUTO_SIGNUP_OTP,
  OPEN_MODAL_UPDATE_APP,
  CLOSE_MODAL_UPDATE_APP,
  AUTHENTICATION_LOGIN_BY_BIOMETRIC,
  SUGGEST_BIOMETRIC,
  AUTHENTICATION_RE_LOGIN_BY_BIOMETRIC,
  LOGIN_WITH_SOCIAL_ACCOUNT,
} from 'reduxs/actions';
import { IAction, IGenerateNewKisCardResponse, IGetLinkedAccountsResponse } from 'interfaces/common';
import {
  GetOTPIdType,
  GetOTPTxType,
  IAutoSignupOTPResponse,
  IGetOTPParams,
  IRegisterUserParams,
  IResetPasswordParams,
} from 'interfaces/authentication';
import { IAuthTokenReducer } from 'interfaces/reducers/IAuthTokenReducer';
import { ILoadingReducer, ReducerStatus } from '../../interfaces/reducer';
import {
  CHECK_EMAIL_EXIST,
  CHECK_USERNAME_EXIST,
  AUTHENTICATION_VERIFY_OTP,
  AUTHENTICATION_CHECK_USER_EXIST,
} from '../actions';
import { SUCCESS, FAILURE, RESET } from '../action-type-utils';
import { ICheckUserExistResponse, IVerifyOTPResponse } from '../../interfaces/authentication';
import {
  ITriggerReLoginBiometricModal,
  ITriggerReLoginBiometricModalAction,
} from 'interfaces/reducers/ITriggerReLoginBiometricModal';

export function GenerateKisCardResult(
  state: IGenerateNewKisCardResponse | null = null,
  action: IAction<IGenerateNewKisCardResponse>
) {
  switch (action.type) {
    case SUCCESS(GENERATE_NEW_KIS_CARD):
      return action.payload;
    case RESET(GENERATE_NEW_KIS_CARD):
      return null;
    case FAILURE(GENERATE_NEW_KIS_CARD):
      return null;
    case KIS_CLOSE_MODAL_OTP:
      return null;
    default:
      return state;
  }
}

export function GenerateKisCardFailedTrigger(state = false, action: IAction<null>) {
  switch (action.type) {
    case FAILURE(GENERATE_NEW_KIS_CARD):
      return !state;
    default:
      return state;
  }
}

export function ShowModalUpdate(state = false, action: IAction<null>) {
  switch (action.type) {
    case OPEN_MODAL_UPDATE_APP:
      return true;
    case CLOSE_MODAL_UPDATE_APP:
      return false;
    default:
      return state;
  }
}

export function LinkedAccounts(state: string[] = [], action: IAction<IGetLinkedAccountsResponse[]>): string[] {
  switch (action.type) {
    case SUCCESS(GET_LINKED_ACCOUNTS):
      return action.payload.map(item => item.partnerId);
    case RESET(GET_LINKED_ACCOUNTS):
      return [];
    default:
      return state;
  }
}

export function otpId(state = '', action: IAction<string>) {
  switch (action.type) {
    case AUTHENTICATION_GET_OTP_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export function otpKey(
  state: ILoadingReducer<IVerifyOTPResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IVerifyOTPResponse>
): ILoadingReducer<IVerifyOTPResponse | null> {
  switch (action.type) {
    case RESET(AUTHENTICATION_VERIFY_OTP):
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(AUTHENTICATION_VERIFY_OTP):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(AUTHENTICATION_VERIFY_OTP):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function registerParams(state: IRegisterUserParams = {}, action: IAction<IRegisterUserParams>) {
  switch (action.type) {
    case AUTHENTICATION_REGISTER_PARAMS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const defaultAuthTokenState: IAuthTokenReducer = {
  accessToken: '',
  refreshToken: '',
  accExpiredTime: 0,
  refExpiredTime: 0,
  rememberMe: false,
  // version: undefined, // backward compatible. so version should be undefined
};

export function authToken(
  state: IAuthTokenReducer = defaultAuthTokenState,
  action: IAction<IAuthTokenReducer>
): IAuthTokenReducer {
  switch (action.type) {
    case AUTHENTICATION_AUTH_TOKEN: {
      let sessionVersion: number = state.version || 0;
      if (
        !action.payload.unChangeSession &&
        action.payload.refreshToken != null &&
        action.payload.refreshToken != state.refreshToken
      ) {
        // a new session
        sessionVersion += 1;
      }
      if (action.payload.accessToken !== '') {
        return { ...state, lastLoggedInAt: new Date().getTime(), ...action.payload, version: sessionVersion };
      }
      return { ...state, ...action.payload, version: sessionVersion };
    }
    case AUTHENTICATION_REMOVE_TOKEN:
      // check this carefully. now it's intended to keep value of lastLoggedInAt
      return { ...state, ...defaultAuthTokenState };
    default:
      return state;
  }
}

export function kisAuthToken(
  state: IAuthTokenReducer = defaultAuthTokenState,
  action: IAction<IAuthTokenReducer>
): IAuthTokenReducer {
  switch (action.type) {
    case AUTHENTICATION_KIS_AUTH_TOKEN: {
      const newData = action.payload;
      if (action.payload.accessToken !== '') {
        newData.lastLoggedInAt = new Date().getTime();
      }
      return { ...state, ...newData };
    }
    case AUTHENTICATION_KIS_REMOVE_TOKEN:
      // check this carefully. now it's intended to keep value of lastLoggedInAt
      return { ...state, ...defaultAuthTokenState };
    default:
      return state;
  }
}

export function otpParams(
  state: IGetOTPParams = { id: '', idType: GetOTPIdType.EMAIL, txType: GetOTPTxType.REGISTER },
  action: IAction<IGetOTPParams>
) {
  switch (action.type) {
    case AUTHENTICATION_SET_OTP_PARAMS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function resetPasswordParams(state: IResetPasswordParams = {}, action: IAction<IResetPasswordParams>) {
  switch (action.type) {
    case AUTHENTICATION_RESET_PASSWORD_PARAMS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function CheckExistUserEmail(
  state: ILoadingReducer<ICheckUserExistResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<ICheckUserExistResponse>
): ILoadingReducer<ICheckUserExistResponse | null> {
  switch (action.type) {
    case AUTHENTICATION_CHECK_USER_EXIST:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(CHECK_EMAIL_EXIST):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(CHECK_EMAIL_EXIST):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function CheckUsernameExist(
  state: ILoadingReducer<ICheckUserExistResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<ICheckUserExistResponse>
): ILoadingReducer<ICheckUserExistResponse | null> {
  switch (action.type) {
    case AUTHENTICATION_CHECK_USER_EXIST:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(CHECK_USERNAME_EXIST):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(CHECK_USERNAME_EXIST):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function OnModalOTPKIS(state = false, action: IAction<null>) {
  switch (action.type) {
    case KIS_CLOSE_MODAL_OTP:
      return false;
    case KIS_OPEN_MODAL_OTP:
      return true;
    default:
      return state;
  }
}

export function AutoSignupOTP(
  state: ILoadingReducer<IAutoSignupOTPResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IAutoSignupOTPResponse>
): ILoadingReducer<IAutoSignupOTPResponse | null> {
  switch (action.type) {
    case AUTO_SIGNUP_OTP:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(AUTO_SIGNUP_OTP):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(AUTO_SIGNUP_OTP):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function IsLoginWithBiometric(state = false, action: IAction<null>) {
  switch (action.type) {
    case AUTHENTICATION_LOGIN_BY_BIOMETRIC:
      return true;
    case RESET(AUTHENTICATION_LOGIN_BY_BIOMETRIC):
      return false;
    default:
      return state;
  }
}

export function SuggestBiometric(state = false, action: IAction<null>) {
  switch (action.type) {
    case SUGGEST_BIOMETRIC:
      return true;
    case RESET(SUGGEST_BIOMETRIC):
      return false;
    default:
      return state;
  }
}

const defaultTriggerReLoginBiometricModal: ITriggerReLoginBiometricModal = {
  showModal: false,
};

export function TriggerReLoginBiometricModal(
  state = defaultTriggerReLoginBiometricModal,
  action: IAction<ITriggerReLoginBiometricModalAction>
): ITriggerReLoginBiometricModal {
  switch (action.type) {
    case AUTHENTICATION_RE_LOGIN_BY_BIOMETRIC:
      return {
        showModal: true,
      };
    case RESET(AUTHENTICATION_RE_LOGIN_BY_BIOMETRIC):
      return {
        showModal: false,
      };
    default:
      return state;
  }
}

export function LoginWithSocialAccount(state = false, action: IAction<null>) {
  switch (action.type) {
    case LOGIN_WITH_SOCIAL_ACCOUNT:
      return true;
    case RESET(LOGIN_WITH_SOCIAL_ACCOUNT):
      return false;
    default:
      return state;
  }
}
