import { AUTHENTICATION_GET_OTP } from './../../actions';
import { IAction, IResponse } from 'interfaces/common';
import { IGetOTPParams, IGetOTPResponse } from 'interfaces/authentication';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { setOTPParams } from 'reduxs/global-actions/Authentication';
import { createNormalApiQuerySaga } from 'utils';
import { RESET } from '../../action-type-utils';
import { AUTHENTICATION_VERIFY_OTP } from '../../actions';

function* handleGetOTPSuccess(response: IResponse<IGetOTPResponse>, action: IAction<IGetOTPParams>) {
  yield put({
    type: RESET(AUTHENTICATION_VERIFY_OTP),
  });
  yield put(setOTPParams({ ...action.payload, navigation: undefined }));
  if (action.response) {
    yield put({
      type: action.response.success,
      payload: response.data.otpId,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<IGetOTPParams, IGetOTPResponse>(
  APIList.getOTP,
  AUTHENTICATION_GET_OTP,
  handleGetOTPSuccess
);
