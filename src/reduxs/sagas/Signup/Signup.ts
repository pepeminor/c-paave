import { IRequest, ISignupRequest } from '../../../interfaces/common';
import { put, takeLatest } from 'redux-saga/effects';
import { SIGNUP } from 'reduxs/actions';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

function* doSignup(request: IRequest<ISignupRequest>) {
  try {
    yield put({
      type: request.response.success,
      hideLoading: true,
    });
    request.payload.navigation.navigate(ScreenNames.SignupOTP, { isSignup: true });
  } catch (err) {
    yield put({
      type: request.response.fail,
      hideLoading: true,
    });
  }
}

export default function* watchSignup() {
  yield takeLatest(SIGNUP, doSignup);
}
