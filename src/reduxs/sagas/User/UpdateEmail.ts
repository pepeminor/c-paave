import APIList from 'config/api';
import { USER_UPDATE_EMAIL } from 'reduxs/actions';
import { IUserUpdateEmailParams, IUserUpdateResponse } from 'interfaces/user';
import { createNormalApiQuerySaga } from 'utils';
import { IAction, IResponse } from 'interfaces/common';
import { put, select } from 'redux-saga/effects';
import { USER_ACCOUNT_INFO } from '../../actions';
import { SUCCESS } from '../../action-type-utils';
import { IGetAccountInfoResponse } from '../../../interfaces/user';
import { IState } from '../../global-reducers/index';

function* handleSuccess(response: IResponse<IUserUpdateResponse>, action: IAction<IUserUpdateEmailParams>) {
  if (action.response) {
    const userInfo: IGetAccountInfoResponse = yield select((state: IState) => state.getUserAccountInfo.data);
    const newUserInfo = { ...userInfo, email: action.payload.email };
    yield put({
      type: SUCCESS(USER_ACCOUNT_INFO),
      payload: newUserInfo,
    });
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
}

function* handleFailed(action: IAction<IUserUpdateEmailParams>) {
  if (action.response) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<IUserUpdateEmailParams, IUserUpdateResponse>(
  APIList.updateEmail,
  USER_UPDATE_EMAIL,
  handleSuccess,
  handleFailed
);
