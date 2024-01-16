import { IAction } from 'interfaces/common';
import { put, takeLeading } from 'redux-saga/effects';
import { UPDATE_CURRENT_USERS_SETTING, CURRENT_USERS_SETTING } from 'reduxs/actions';
import { IUserSettingParams } from 'interfaces/user';
import { SUCCESS } from 'reduxs/action-type-utils';
import { updateUsersSetting } from 'reduxs/global-actions';

// usersSetting flow
function* doUpdateCurrentUserSetting(request: IAction<IUserSettingParams>) {
  try {
    if (request.response != null) {
      yield put({
        type: SUCCESS(CURRENT_USERS_SETTING),
        payload: request.payload,
        hideLoading: true,
      });
      yield put(updateUsersSetting(null));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    __DEV__ && console.log('doUpdateCurrentUserSetting error', error);
  }
}

export default function* watchUpdateCurrentUserSetting() {
  yield takeLeading(UPDATE_CURRENT_USERS_SETTING, doUpdateCurrentUserSetting);
}
