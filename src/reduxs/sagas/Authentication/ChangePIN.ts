import { IChangePINParams } from 'interfaces/authentication';
import { KIS_CHANGE_PIN } from './../../actions';
import { alertMessage, navigate, queryKis } from 'utils';
import { IRequest, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { call, put, takeLeading } from 'redux-saga/effects';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

enum WRONG_PIN {
  WRONG_PIN = 'INCORRECT_OLD_PIN',
}

const changePIN = (params: IChangePINParams) => {
  return queryKis(APIList.changePIN, params);
};

function* doChangePIN(request: IRequest<IChangePINParams>) {
  try {
    const response: IResponse<null> = yield call(changePIN, request.payload);
    yield put({
      type: request.response.success,
      payload: response.data,
    });
    yield navigate({ key: ScreenNames.Security });
    yield alertMessage('success', 'PIN has been changed successfully');
  } catch (err: any) {
    yield put({
      type: request.response.fail,
      hideLoading: true,
    });
    yield alertMessage('danger', WRONG_PIN.WRONG_PIN);
  }
}

export default function* watchChangePIN() {
  yield takeLeading(KIS_CHANGE_PIN, doChangePIN);
}
