import { IChangePasswordParams } from 'interfaces/authentication';
import { AUTHENTICATION_CHANGE_PASSWORD } from 'reduxs/actions';
import { FulfilledRequestError, query } from 'utils';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { call, put, takeLeading } from 'redux-saga/effects';
import { ERROR } from 'constants/error';

const changePassword = (params: IChangePasswordParams) => {
  return query(APIList.changePassword, params);
};

function* doChangePassword(action: IAction<IChangePasswordParams>) {
  try {
    const response: IResponse<null> = yield call(changePassword, action.payload);
    yield put({
      type: action.response?.success,
      payload: response.data,
    });
    yield action.callBack?.handleSuccess?.();
  } catch (err: any) {
    yield put({
      type: action.response?.fail,
      hideLoading: true,
    });
    if (err instanceof FulfilledRequestError) {
      if (err.data.code === ERROR.WRONG_PASSWORD_PAAVE) {
        action.callBack?.handleFail?.(err.data.code);
      }
    }
  }
}

export default function* watchChangePassword() {
  yield takeLeading(AUTHENTICATION_CHANGE_PASSWORD, doChangePassword);
}
