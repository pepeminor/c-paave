import { put, call, takeLeading } from 'redux-saga/effects';
import { IAction } from 'interfaces/common';
import APIList from 'config/api';
import { UNREGISTER_BIOMETRIC, QUERY_BIOMETRIC_STATUS } from '../../actions';
import { query } from 'utils';
import { updateUsersSetting } from '../../global-actions/UserInfo';
import { RESET } from '../../action-type-utils';

const unregisterBiometrics = () => {
  return query(APIList.biometricUnregister);
};

function* doUnregisterBiometrics(request: IAction<undefined>) {
  try {
    yield call(unregisterBiometrics);
    if (request.response != null) {
      yield put({
        type: request.response.success,
        hideLoading: true,
      });
    }
    yield put({ type: RESET(QUERY_BIOMETRIC_STATUS) });
    yield put(updateUsersSetting({ kisUsername: '', paaveUsername: '', email: '' }));
  } catch (error) {
    // eslint-disable-next-line no-console
    __DEV__ && console.log('unregisterBiometricError', error);
    if (request.response != null) {
      yield put({
        type: request.response.fail,
        hideLoading: true,
      });
    }
    // alertMessage('danger', 'do fund transfer', error.code ?? error.message);
  }
}

export default function* watchUnregisterBiometrics() {
  yield takeLeading(UNREGISTER_BIOMETRIC, doUnregisterBiometrics);
}
