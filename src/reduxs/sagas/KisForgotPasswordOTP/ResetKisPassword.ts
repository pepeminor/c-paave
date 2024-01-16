import { takeLatest, put, call } from 'redux-saga/effects';
import { IRequest, IResponse } from 'interfaces/common';
import { VERIFY_OTP_KIS_RESET_FORGOT_PASSWORD } from 'reduxs/actions';
import { queryKis, alertMessage, FulfilledRequestError } from 'utils';
import APIList from 'config/api';
import { IResetKisPasswordParams } from 'interfaces/kisForgotPassword';

const resetKisPassword = (params: IResetKisPasswordParams) => {
  return queryKis(APIList.resetKisPassword, params);
};

function* doResetKisPassword(request: IRequest<IResetKisPasswordParams>) {
  try {
    const response: IResponse<any> = yield call(resetKisPassword, request.payload);
    yield put({
      type: request.response.success,
      payload: response.data,
      hideLoading: true,
    });
    alertMessage('success', `RESET_PW_SUCCESS`);
  } catch (error: any) {
    if (error instanceof FulfilledRequestError) {
      if (error.data.params) {
        alertMessage(
          'danger',
          `Incorrect OTP code. You have ${error.data.params[0].leftAttempts} remaining attempts.`,
          '',
          error.requester.rid
        );
      }
    }
    yield put({
      type: request.response.fail,
      hideLoading: true,
    });
  }
}

export default function* watchVerifyKisForgotPw() {
  yield takeLatest(VERIFY_OTP_KIS_RESET_FORGOT_PASSWORD, doResetKisPassword);
}
