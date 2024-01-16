import { IChangePasswordForKisParams } from 'interfaces/authentication';
import { KIS_AUTHENTICATION_CHANGE_PASSWORD } from 'reduxs/actions';
import { FulfilledRequestError, queryKis } from 'utils';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { call, put, takeLeading } from 'redux-saga/effects';
import { ERROR } from 'constants/error';

const changePasswordForKis = (params: IChangePasswordForKisParams) => {
  return queryKis(APIList.putKisEqtChangepassword, params);
};

function* doChangePasswordForKis(action: IAction<IChangePasswordForKisParams>) {
  try {
    const response: IResponse<null> = yield call(changePasswordForKis, action.payload);
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
      if (err.data.code === ERROR.WRONG_PASSWORD_KIS) {
        action.callBack?.handleFail?.(err.data.code);
      }
    }
  }
}

export default function* watchChangePasswordForKis() {
  yield takeLeading(KIS_AUTHENTICATION_CHANGE_PASSWORD, doChangePasswordForKis);
}
