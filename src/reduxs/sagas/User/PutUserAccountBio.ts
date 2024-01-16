import APIList from 'config/api';
import { USER_ACCOUNT_BIO } from 'reduxs/actions';
import { IPutUpdateUserBioParams } from 'interfaces/user';
import { IAction, IResponse } from 'interfaces/common';
import { put, select } from 'redux-saga/effects';
import { createNormalApiQuerySaga } from 'utils';
import { IGetAccountInfoResponse, IUserUpdateResponse } from '../../../interfaces/user';
import { SUCCESS } from '../../action-type-utils';
import { USER_ACCOUNT_INFO } from '../../actions';
import { IState } from '../../global-reducers/index';

function* handleSuccess(response: IResponse<IUserUpdateResponse>, action: IAction<IPutUpdateUserBioParams>) {
  if (action.response) {
    const userInfo: IGetAccountInfoResponse = yield select((state: IState) => state.getUserAccountInfo.data);
    const newUserInfo = { ...userInfo, bio: action.payload.bio };
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

function* handleFailed(action: IAction<IPutUpdateUserBioParams>) {
  if (action.response) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<IPutUpdateUserBioParams, IUserUpdateResponse>(
  APIList.putUserBio,
  USER_ACCOUNT_BIO,
  handleSuccess,
  handleFailed
);
