import { AUTHENTICATION_VERIFY_OTP } from './../../actions';
import { IAction, IResponse } from 'interfaces/common';
import { IAutoSignupOTPParams, IVerifyOTPParams, IVerifyOTPResponse } from 'interfaces/authentication';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { autoSignupOTP } from 'reduxs/global-actions';
import config from 'config';

function* handleSuccess(response: IResponse<IVerifyOTPResponse>, action: IAction<IVerifyOTPParams>) {
  if (action.response) {
    yield put({
      type: action.response.success,
      payload: response.data,
      hideLoading: true,
    });

    if (action.differentParams != null) {
      if (action.differentParams.isEKYCVerifyEmail) {
        const params: IAutoSignupOTPParams = {
          email: action.differentParams.email,
          otpKey: response.data.keyToken,
          grant_type: config.authentication.grantType,
          client_id: config.authentication.clientId,
          client_secret: config.authentication.clientSecret,
        };
        yield put(autoSignupOTP(params));
      }
    }
  }
}

function* handleFailed(action: IAction<IVerifyOTPParams>) {
  if (action.response) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<IVerifyOTPParams, IVerifyOTPResponse>(
  APIList.verifyOTP,
  AUTHENTICATION_VERIFY_OTP,
  handleSuccess,
  handleFailed
);
