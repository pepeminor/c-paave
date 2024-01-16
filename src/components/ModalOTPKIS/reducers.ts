import { IAction } from 'interfaces/common';
import { ReducerStatus } from 'interfaces/reducer';
import { NOTIFY_KIS_MOBILE_OTP } from 'reduxs/actions';

export const NOTIFY_KIS_MOBILE_OTP_FAILED = 'NOTIFY_KIS_MOBILE_OTP_FAILED';
export const NOTIFY_KIS_MOBILE_OTP_SUCCESS = 'NOTIFY_KIS_MOBILE_OTP_SUCCESS';

export function NotifyKisMobileOtpStatus(
  state: ReducerStatus = ReducerStatus.LOADING,
  action: IAction<null>
): ReducerStatus {
  switch (action.type) {
    case NOTIFY_KIS_MOBILE_OTP:
      return ReducerStatus.LOADING;
    case NOTIFY_KIS_MOBILE_OTP_SUCCESS:
      return ReducerStatus.SUCCESS;
    case NOTIFY_KIS_MOBILE_OTP_FAILED:
      return ReducerStatus.FAILED;
    default:
      return state;
  }
}
