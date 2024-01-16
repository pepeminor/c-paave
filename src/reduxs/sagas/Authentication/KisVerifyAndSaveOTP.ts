import { put, call, takeLeading, select, take } from 'redux-saga/effects';
import {
  IAction,
  IKisVerifyAndSaveOTPRequest,
  IKisVerifyAndSaveOTPResponse,
  ILoginRealAccountKisResult,
  IResponse,
} from 'interfaces/common';
import APIList from 'config/api';
import { FulfilledRequestError, queryKis } from 'utils';
import {
  HIDE_MODAL_OTP_PORTFOLIO,
  KIS_CLOSE_MODAL_OTP,
  KIS_VERIFY_AND_SAVE_OTP,
  OTP_ERROR_VALUE,
  USER_KIS_ACCOUNT_INFO,
} from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { getUserKisAccountInfo, updateCurrentUserSetting } from 'reduxs/global-actions';
import { checkNotifications } from 'react-native-permissions';
import { PermissionStatus } from 'screens/SettingNotification';
import { kisVerifyAndSaveOTPFrom } from 'interfaces/authentication';
import { getAllPartner } from 'reduxs/global-actions/Partner';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';

export enum ERROR_TYPE {
  VERIFY_MATRIX_ID_FAIL = 'VERIFY_MATRIX_ID_FAIL',
  MATRIX_ID_IS_USED = 'MATRIX_ID_IS_USED',
  NO_MATRIX_CARD_ID_FOUND = 'NO_MATRIX_CARD_ID_FOUND',
}

const kisVerifyAndSaveOTP = (params: IKisVerifyAndSaveOTPRequest) => {
  return queryKis(APIList.kisVerifyAndSaveOTP, params);
};

function* doKisVerifyAndSaveOTP(action: IAction<IKisVerifyAndSaveOTPRequest>) {
  try {
    const response: IResponse<IKisVerifyAndSaveOTPResponse> = yield call(kisVerifyAndSaveOTP, action.payload);
    const alreadyDoneSmsOTP: boolean = yield select((state: IState) => state.currentUserSetting?.alreadyDoneSmsOTP);
    if (!alreadyDoneSmsOTP) {
      const newCurrentUserSetting: Record<string, boolean> = { alreadyDoneSmsOTP: true };
      yield checkNotifications().then(({ status }) => {
        // check device is allow notification then auto turn on mobileOTP and notification setting
        if (status === PermissionStatus.GRANTED) {
          newCurrentUserSetting.notification = true;
          newCurrentUserSetting.mobileOTP = true;
        }
      });
      yield put(updateCurrentUserSetting(newCurrentUserSetting));
    }
    yield put({
      type: action.response?.success,
      payload: response.data,
    });
    yield put({
      type: HIDE_MODAL_OTP_PORTFOLIO,
    });
    if (action.from === kisVerifyAndSaveOTPFrom.LOGIN_REAL_ACCOUNT) {
      const loginRealAccountKISresult: ILoginRealAccountKisResult = yield select(
        (state: IState) => state.loginRealAccountKISresult
      );
      yield put(getAllPartner(loginRealAccountKISresult.userInfo.username));
      yield put(getUserKisAccountInfo({ clientID: loginRealAccountKISresult.userInfo.username }));
      yield take([SUCCESS(USER_KIS_ACCOUNT_INFO), FAILURE(USER_KIS_ACCOUNT_INFO)]);
      yield put({
        type: KIS_CLOSE_MODAL_OTP,
      });
    }
    action.callBack?.handleSuccess?.();
  } catch (error: any) {
    if (error instanceof FulfilledRequestError) {
      yield put({
        type: OTP_ERROR_VALUE,
        payload: error.data.code,
      });
    }
    yield put({
      type: action.response?.fail,
      hideLoading: true,
    });
  }
}

export default function* watchKisVerifyAndSaveOTP() {
  yield takeLeading(KIS_VERIFY_AND_SAVE_OTP, doKisVerifyAndSaveOTP);
}
