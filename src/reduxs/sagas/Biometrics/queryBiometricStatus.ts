import { put, call, takeLeading } from 'redux-saga/effects';
import { IAction, IQueryBiometricStatusRequest, IQueryBiometricStatusResponse, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { AUTHENTICATION_LOGIN_BY_BIOMETRIC, QUERY_BIOMETRIC_STATUS } from '../../actions';
import { query } from 'utils';
import { RESET } from 'reduxs/action-type-utils';

const queryBiometricStatus = (params: IQueryBiometricStatusRequest) => {
  return query(APIList.queryBiometricStatus, params);
};

function* doQueryBiometricStatus(request: IAction<IQueryBiometricStatusRequest>) {
  try {
    const response: IResponse<IQueryBiometricStatusResponse> = yield call(queryBiometricStatus, request.payload);

    if (request.response != null) {
      yield put({
        type: request.response.success,
        hideLoading: true,
        payload: response.data.isEnable,
      });
      if (response.data.isEnable) {
        yield put({ type: AUTHENTICATION_LOGIN_BY_BIOMETRIC });
      } else {
        yield put({ type: RESET(AUTHENTICATION_LOGIN_BY_BIOMETRIC) });
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    __DEV__ && console.log('queryBiometricResultError', error);
    if (request.response != null) {
      yield put({
        type: request.response.fail,
        hideLoading: true,
        payload: false,
      });
    }
    // alertMessage('danger', 'do fund transfer', error.code ?? error.message);
  }
}

export default function* watchQueryBiometricStatus() {
  yield takeLeading(QUERY_BIOMETRIC_STATUS, doQueryBiometricStatus);
}
