import { put, call, takeLeading } from 'redux-saga/effects';
import { IAction } from 'interfaces/common';
import APIList from 'config/api';
import { REGISTER_BIOMETRIC_KIS, QUERY_BIOMETRIC_STATUS } from '../../actions';
import { query } from 'utils';
import { IBiometricRegisterKisParams } from '../../../interfaces/common';
import { alertMessage } from '../../../utils';
import i18n from 'i18next';
import { RESET, FAILURE } from '../../action-type-utils';

const registerBiometricsKis = (params: IBiometricRegisterKisParams) => {
  return query(APIList.biometricRegisterKis, params);
};

function* doRegisterBiometricsKis(request: IAction<IBiometricRegisterKisParams>) {
  try {
    yield put({ type: RESET(QUERY_BIOMETRIC_STATUS) });

    yield call(registerBiometricsKis, request.payload);

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
    // alertMessage('danger', 'do fund transfer', error.code ?? error.message);
  }
}

export default function* watchRegisterBiometrics() {
  yield takeLeading(REGISTER_BIOMETRIC_KIS, doRegisterBiometricsKis);
}
