import { takeLatest, put, call } from 'redux-saga/effects';
import { IRequest, IResponse } from 'interfaces/common';
import { VERIFY_OTP_KIS_FORGOT_PASSWORD } from 'reduxs/actions';
import { queryKis } from 'utils';
import APIList from 'config/api';
import { IKisVerifyForgotPasswordRequest, IKisVerifyForgotPasswordResponse } from 'interfaces/kisForgotPassword';

const verifyKisForgotPw = (params: IKisVerifyForgotPasswordRequest) => {
  return queryKis(APIList.getMatrixKeyToResetKisPw, params);
};

function* doVerifyKisForgotPw(request: IRequest<IKisVerifyForgotPasswordRequest>) {
  try {
    const response: IResponse<IKisVerifyForgotPasswordResponse> = yield call(verifyKisForgotPw, request.payload);
    yield put({
      type: request.response.success,
      payload: response.data,
      hideLoading: true,
    });
  } catch (error: any) {
    yield put({
      type: request.response.fail,
      hideLoading: true,
    });
  }
}

export default function* watchVerifyKisForgotPw() {
  yield takeLatest(VERIFY_OTP_KIS_FORGOT_PASSWORD, doVerifyKisForgotPw);
}
