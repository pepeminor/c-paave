import { ILoginResponse, ILoginParams } from 'interfaces/authentication';
import { AUTHENTICATION_LOGIN, SET_PASSWORD_TYPE } from './../../actions';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { query, removeKey, setKey } from 'utils';
import { call, put, takeEvery } from 'redux-saga/effects';
import { handleLoginFailed, handleLoginSuccess } from 'reduxs/Authentication/helpers';
import { ACCOUNT_TYPE } from 'global';
import { storageKey } from 'constants/enum';

function* doLoginPaave(action: IAction<ILoginParams>) {
  try {
    action.payload.rememberMe
      ? setKey(storageKey.LASTED_USER_NAME, action.payload.username)
      : removeKey(storageKey.LASTED_USER_NAME);
    const response: IResponse<ILoginResponse> = yield call(query, APIList.login, action.payload);
    if (response.data && response.data.userInfo) {
      yield handleLoginSuccess(response, action, {
        api: APIList.login,
        params: action.payload,
      });
      yield put({ type: SET_PASSWORD_TYPE, payload: ACCOUNT_TYPE.VIRTUAL });
    }
    yield action.callBack?.handleSuccess?.(response);
  } catch (error) {
    if (action.response) {
      yield put({
        type: action.response.fail,
        hideLoading: true,
      });
    }
    yield action.callBack?.handleFail?.(error);
    yield handleLoginFailed(error);
  }
}

export default function* watchLoginPaave() {
  yield takeEvery(AUTHENTICATION_LOGIN, doLoginPaave);
}
