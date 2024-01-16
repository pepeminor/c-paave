import { put, call, takeLeading } from 'redux-saga/effects';
import { IRequest, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { AUTO_SIGNUP_OTP } from 'reduxs/actions';
import { IAutoSignupOTPParams, IAutoSignupOTPResponse } from 'interfaces/authentication';
import { query } from 'utils';

const autoSignUpOTP = (params: IAutoSignupOTPParams) => {
  return query(APIList.autoSignup, params);
};

function* doAutoSignUpOTP(request: IRequest<IAutoSignupOTPParams>) {
  const response: IResponse<IAutoSignupOTPResponse> = yield call(autoSignUpOTP, request.payload);
  try {
    yield put({
      type: request.response.success,
      payload: response.data,
    });
  } catch (error: any) {
    yield put({
      type: request.response.fail,
      hideLoading: true,
    });

    // alertMessage('danger', 'Auto sign up', error.code ?? error.message);
  }
}

export default function* watchKisAutoSignupOTP() {
  yield takeLeading(AUTO_SIGNUP_OTP, doAutoSignUpOTP);
}
