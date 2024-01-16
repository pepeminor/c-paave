import { IAction } from 'interfaces/common';
import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import { SUCCESS, FAILURE } from 'reduxs/action-type-utils';
import { VERIFY_OTP_KIS_FORGOT_PASSWORD, VERIFY_OTP_KIS_RESET_FORGOT_PASSWORD } from 'reduxs/actions';
import { IKisVerifyForgotPasswordResponse } from 'interfaces/kisForgotPassword';

export function KisVerifyForgotPw(
  state: ILoadingReducer<IKisVerifyForgotPasswordResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IKisVerifyForgotPasswordResponse>
): ILoadingReducer<IKisVerifyForgotPasswordResponse | null> {
  switch (action.type) {
    case VERIFY_OTP_KIS_FORGOT_PASSWORD:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(VERIFY_OTP_KIS_FORGOT_PASSWORD):
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case FAILURE(VERIFY_OTP_KIS_FORGOT_PASSWORD):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function KisResetPassword(
  state: ILoadingReducer<any> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IKisVerifyForgotPasswordResponse>
): ILoadingReducer<any> {
  switch (action.type) {
    case VERIFY_OTP_KIS_RESET_FORGOT_PASSWORD:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(VERIFY_OTP_KIS_RESET_FORGOT_PASSWORD):
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case FAILURE(VERIFY_OTP_KIS_RESET_FORGOT_PASSWORD):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}
