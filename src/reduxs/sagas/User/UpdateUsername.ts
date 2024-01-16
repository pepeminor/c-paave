import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import { IGetAccountInfoResponse, IUserUpdateResponse, IUserUpdateUserNameParams } from 'interfaces/user';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { SUCCESS } from 'reduxs/action-type-utils';
import { USER_ACCOUNT_INFO, USER_UPDATE_USERNAME } from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { query, alertMessage, setKey, FulfilledRequestError } from 'utils';
import { unregisterBiometric } from '../../../screens/Security/actions';
import { updateCurrentUserSetting } from '../../global-actions/UserInfo';
import { IUserSetting, IUserInfoFromLogin, IUsersSetting } from '../../../interfaces/user';
import { CURRENT_USER_INFO } from '../../actions';
import { storageKey } from '../../../constants/enum';

const updateUsername = (params: IUserUpdateUserNameParams) => {
  return query(APIList.updateUsername, params);
};

function* doUpdateUsername(request: IAction<IUserUpdateUserNameParams>) {
  try {
    const response: IResponse<IUserUpdateResponse> = yield call(updateUsername, request.payload);
    const userInfo: IGetAccountInfoResponse = yield select((state: IState) => state.getUserAccountInfo.data);
    const currentUserSetting: IUserSetting = yield select((state: IState) => state.currentUserSetting);
    const userInfoFromLogin: IUserInfoFromLogin = yield select((state: IState) => state.userInfoFromLogin);
    const usersSetting: IUsersSetting = yield select((state: IState) => state.usersSetting);
    const newUserInfo = { ...userInfo, username: request.payload.username };
    yield put({
      type: SUCCESS(USER_ACCOUNT_INFO),
      payload: newUserInfo,
    });
    if (currentUserSetting.paaveUsername === usersSetting.currentBiometricUsername.paaveUsername) {
      yield put(unregisterBiometric({}));
    }
    yield put({
      type: SUCCESS(CURRENT_USER_INFO),
      payload: { ...userInfoFromLogin, paaveUsername: request.payload.username },
    });
    yield put(
      updateCurrentUserSetting({
        paaveUsername: request.payload.username,
      })
    );

    // update remember username
    setKey(storageKey.LASTED_USER_NAME, request.payload.username);

    if (request.response != null) {
      yield put({
        type: request.response.success,
        payload: response.data,
      });
    }
  } catch (error) {
    if (request.response != null) {
      yield put({
        type: request.response.fail,
        hideLoading: true,
      });
    }
    if (error instanceof FulfilledRequestError) {
      // Error handling if wrong params are entered on BE's side
      const invalidValue = error.data.params?.filter(item => item?.param === 'username');
      if (invalidValue) {
        alertMessage('danger', 'INVALID_VALUE username', '', error.requester.rid);
      }
    }
  }
}

export default function* watchUpdateUsername() {
  yield takeLeading(USER_UPDATE_USERNAME, doUpdateUsername);
}
