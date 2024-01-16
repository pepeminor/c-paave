import { takeLatest, put } from 'redux-saga/effects';
import { IAction } from 'interfaces/common';
import { NOTIFY_KIS_MOBILE_OTP } from 'reduxs/actions';
import APIList from 'config/api';
import { INotifyOtpPartner } from 'interfaces/notification';
import { query } from 'utils';

const notifyKisMobileOTP = (params: INotifyOtpPartner) => {
  return query(APIList.notifyKisMobileOTP, params);
};

function* doNotifyKisMobileOTP(request: IAction<INotifyOtpPartner>) {
  try {
    if (request.response != null) {
      yield notifyKisMobileOTP(request.payload);
      yield put({
        type: request.response.success,
        hideLoading: true,
      });
    }
  } catch (error) {
    if (request.response != null) {
      yield put({
        type: request.response.fail,
        hideLoading: true,
      });
    }

    // alertMessage('danger', 'Notify Mobile OTP', error.code ?? error.message);
    // yield put({
    //   type: COMMON_SHOW_NOTIFICATION,
    //   payload: {
    //     type: NOTIFICATION_TYPE.ERROR,
    //     title: 'Resend login otp',
    //     content: 'Resend failed',
    //     time: new Date(),
    //   },
    //   hideLoading: true,
    // });
  }
}

export default function* watchNotifyKisMobileOTP() {
  yield takeLatest(NOTIFY_KIS_MOBILE_OTP, doNotifyKisMobileOTP);
}
