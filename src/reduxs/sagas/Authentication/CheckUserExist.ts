import { AUTHENTICATION_CHECK_USER_EXIST } from 'reduxs/actions';
import { getOTP } from 'reduxs/global-actions/Authentication';
import { GetOTPTxType, ICheckUserExistParams, ICheckUserExistResponse } from 'interfaces/authentication';
import { IAction, IResponse } from 'interfaces/common';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { alertMessage, createNormalApiQuerySaga } from 'utils';
import { CheckUserExistType } from 'constants/enum';
import { CHECK_EMAIL_EXIST, CHECK_USERNAME_EXIST } from '../../actions';
import { SUCCESS } from '../../action-type-utils';

function* handleCheckUserSuccess(response: IResponse<ICheckUserExistResponse>, action: IAction<ICheckUserExistParams>) {
  if (action.payload.type === CheckUserExistType.EMAIL) {
    if (action.payload.getOTPParams) {
      if (action.payload.getOTPParams.txType === GetOTPTxType.REGISTER && response.data.exist) {
        // alertMessage('warning', 'User existed', 'Account already exists');
      }

      if (action.payload.getOTPParams.txType === GetOTPTxType.RESET_PASSWORD && !response.data.exist) {
        alertMessage('warning', 'User account did not exist');
      }

      const registerCondition = action.payload.getOTPParams.txType === GetOTPTxType.REGISTER && !response.data.exist;
      const resetPasswordCondition =
        action.payload.getOTPParams.txType === GetOTPTxType.RESET_PASSWORD && response.data.exist;

      if (resetPasswordCondition || registerCondition) {
        const params = action.payload.getOTPParams;
        yield put(getOTP(params));
      }
      yield put({
        type: SUCCESS(CHECK_EMAIL_EXIST),
        payload: response.data,
      });
      if (action.payload.getOTPParams.txType === GetOTPTxType.UPDATE_PROFILE) {
        if (response.data.exist) {
          // alertMessage('warning', 'EMAIL_EXIST');
        } else {
          const params = action.payload.getOTPParams;
          yield put(getOTP(params));
        }
      }
    }
  }

  if (action.payload.type === CheckUserExistType.USERNAME) {
    yield put({
      type: SUCCESS(CHECK_USERNAME_EXIST),
      payload: response.data,
    });
    if (action.payload.getOTPParams) {
      const registerCondition = action.payload.getOTPParams.txType === GetOTPTxType.REGISTER && !response.data.exist;
      if (registerCondition) {
        const params = action.payload.getOTPParams;
        yield put(getOTP(params));
      }
    }
  }

  // if (action.payload.type === CheckUserExistType.USERNAME) {
  //   if (response.data.exist && response.data.verified) {
  //     alertMessage('warning', 'USERNAME_EXIST');
  //   } else {
  //     navigate({ key: 'ConnectRealAccount' });
  //   }
  // }
}

export default createNormalApiQuerySaga<ICheckUserExistParams, ICheckUserExistResponse>(
  APIList.checkUserExist,
  AUTHENTICATION_CHECK_USER_EXIST,
  handleCheckUserSuccess
);
