import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import { KIS_VERIFY_AND_SAVE_OTP, LOGIN_REAL_ACCOUNT } from 'reduxs/actions';
import { OTP_ERROR_VALUE } from '../../reduxs/actions';
import {
  IAction,
  IKisVerifyAndSaveOTPResponse,
  ILoginRealAccountKisResult,
  ILoginRealAccountRequest,
} from '../../interfaces/common';
import { RESET } from 'reduxs/action-type-utils';

export const LOGIN_REAL_ACCOUNT_FAILED = 'LOGIN_REAL_ACCOUNT_FAILED';
export const LOGIN_REAL_ACCOUNT_SUCCESS = 'LOGIN_REAL_ACCOUNT_SUCCESS';
export const LOGIN_REAL_ACCOUNT_KIS_SUCCESS = 'LOGIN_REAL_ACCOUNT_KIS_SUCCESS';
export const KIS_VERIFY_AND_SAVE_OTP_SUCCESS = 'KIS_VERIFY_AND_SAVE_OTP_SUCCESS';
export const KIS_CLEAR_OTP_TOKEN = 'KIS_CLEAR_OTP_TOKEN';
export const KIS_VERIFY_AND_SAVE_OTP_FAILED = 'KIS_VERIFY_AND_SAVE_OTP_FAILED';

export function KisVerifyAndSaveOTPSuccessTrigger(state = false, action: IAction<null>) {
  switch (action.type) {
    case KIS_VERIFY_AND_SAVE_OTP_SUCCESS:
      return !state;
    default:
      return state;
  }
}

export function KisOTPToken(state: string | null = null, action: IAction<IKisVerifyAndSaveOTPResponse>) {
  switch (action.type) {
    case KIS_CLEAR_OTP_TOKEN:
      return null;
    case KIS_VERIFY_AND_SAVE_OTP_SUCCESS:
      return action.payload.otpToken;
    case KIS_VERIFY_AND_SAVE_OTP_FAILED:
      return null;
    default:
      return state;
  }
}

export function KisOTPErrorValue(state: string | null = null, action: IAction<string>) {
  switch (action.type) {
    case KIS_VERIFY_AND_SAVE_OTP:
      return null;
    case OTP_ERROR_VALUE:
      return action.payload;
    default:
      return state;
  }
}

export function KisCheckOTP(
  state: ILoadingReducer<ReducerStatus | string | null> = {
    data: null,
    status: ReducerStatus.SUCCESS,
  },
  action: IAction<IKisVerifyAndSaveOTPResponse | null>
): ILoadingReducer<ReducerStatus | string | null> {
  switch (action.type) {
    case KIS_VERIFY_AND_SAVE_OTP:
      return { data: null, status: ReducerStatus.LOADING };
    case KIS_VERIFY_AND_SAVE_OTP_SUCCESS:
      return { data: action.payload != null ? action.payload.otpToken : null, status: ReducerStatus.SUCCESS };
    case KIS_VERIFY_AND_SAVE_OTP_FAILED:
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

// export function SignupStatusFailedTrigger(state: boolean = false, action: IAction<null>) {
//   switch (action.type) {
//     case SIGNUP_FAILED:
//       return !state;
//     default:
//       return state;
//   }
// }

export function LoginRealAccountParams(
  state: ILoginRealAccountRequest | null = null,
  action: IAction<ILoginRealAccountRequest>
) {
  switch (action.type) {
    case RESET(LOGIN_REAL_ACCOUNT):
      return null;
    case LOGIN_REAL_ACCOUNT:
      return action.payload;
    default:
      return state;
  }
}

export function LoginRealAccountKISresult(
  state: ILoginRealAccountKisResult | null = null,
  action: IAction<ILoginRealAccountKisResult>
) {
  switch (action.type) {
    case LOGIN_REAL_ACCOUNT_KIS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
