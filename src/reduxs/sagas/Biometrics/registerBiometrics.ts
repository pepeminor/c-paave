import { put, call, takeLeading } from 'redux-saga/effects';
import { IAction, IRegisterBiometricRequest } from 'interfaces/common';
import APIList from 'config/api';
import { REGISTER_BIOMETRIC, QUERY_BIOMETRIC_STATUS } from '../../actions';
import { query } from 'utils';
import { alertMessage } from '../../../utils';
import i18n from 'i18next';
import { RESET, FAILURE } from '../../action-type-utils';

const registerBiometrics = (params: IRegisterBiometricRequest) => {
  return query(APIList.biometricRegister, params);
};

function* doRegisterBiometrics(request: IAction<IRegisterBiometricRequest>) {
  try {
    yield put({ type: RESET(QUERY_BIOMETRIC_STATUS) });
    yield call(registerBiometrics, request.payload);

    if (request.response != null) {
      yield put({
        type: request.response.success,
        hideLoading: true,
      });
      alertMessage(
        'success',
        `${i18n.t('Activate Fingerprint/ Face Login')}`,
        `${i18n.t('Activate Fingerprint/ Face login successfully')}`
      );
    }
    request.callBack?.handleSuccess?.();
  } catch (error: any) {
    if (request.response != null) {
      yield put({
        type: request.response.fail,
        hideLoading: true,
      });
    }
    yield put({ type: FAILURE(QUERY_BIOMETRIC_STATUS), payload: false });
  }
}

export default function* watchRegisterBiometrics() {
  yield takeLeading(REGISTER_BIOMETRIC, doRegisterBiometrics);
}
