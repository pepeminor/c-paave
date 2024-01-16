import { IAction } from 'interfaces/common';
import { takeLeading, select, put } from 'redux-saga/effects';
import { IUserSetting, IUsersSetting, IUpdateBiometricUsernameParams } from '../../../interfaces/user';
import { IState } from '../../global-reducers/index';
import { USERS_SETTING } from '../../actions';
import { SUCCESS } from '../../action-type-utils';

// usersSetting flow
function* doUpdateUsersSetting(request: IAction<IUpdateBiometricUsernameParams | null>) {
  let usersSetting: IUsersSetting = yield select((state: IState) => state.usersSetting);

  // check for exist usersSetting
  if (usersSetting?.currentBiometricUsername == null) {
    const oldUsersSetting: IUserSetting[] = yield select((state: IState) => state.usersSetting);
    usersSetting = {
      listUsers: oldUsersSetting ?? [],
      currentBiometricUsername: {
        paaveUsername: '',
        kisUsername: '',
        email: '',
      },
    };

    const authToken: string = yield select((state: IState) => state.authToken.accessToken);

    const kisAuthToken: string = yield select((state: IState) => state.kisAuthToken.accessToken);

    if (authToken === '' && kisAuthToken === '') {
      yield put({
        type: SUCCESS(USERS_SETTING),
        payload: usersSetting,
      });
    }
    return;
  }

  if (request.payload == null) {
    const listUsers: IUserSetting[] = yield select((state: IState) => state.usersSetting.listUsers);
    const currentUserSetting: IUserSetting = yield select((state: IState) => state.currentUserSetting);
    if (
      currentUserSetting != null &&
      currentUserSetting.paaveUsername === usersSetting.currentBiometricUsername.paaveUsername &&
      usersSetting.currentBiometricUsername.paaveUsername !== '' &&
      usersSetting.currentBiometricUsername.email == null
    ) {
      usersSetting.currentBiometricUsername.email = currentUserSetting.email;
    }
    let newUsersSetting: IUserSetting[];
    if (listUsers == null || listUsers[0] == null) {
      // don't have any users data in usersSetting
      newUsersSetting = [currentUserSetting];
    } else if (
      listUsers != null &&
      listUsers[0] != null &&
      listUsers.filter(item => item.accountNo === currentUserSetting.accountNo).length > 0
    ) {
      // find user match accountNo then remove and add new
      const usersSettingFilter = listUsers.filter(item => item.accountNo !== currentUserSetting.accountNo);
      newUsersSetting = [...usersSettingFilter, currentUserSetting];
    } else {
      // not exist yet
      newUsersSetting = [...listUsers, currentUserSetting];
    }
    yield put({
      type: SUCCESS(USERS_SETTING),
      payload: { ...usersSetting, listUsers: newUsersSetting },
    });
  } else {
    // update currentBiometricUsername
    yield put({
      type: SUCCESS(USERS_SETTING),
      payload: {
        ...usersSetting,
        currentBiometricUsername: {
          paaveUsername: request.payload.paaveUsername,
          kisUsername: request.payload.kisUsername,
          email: request.payload.email,
        },
      },
    });
  }
}

export default function* watchUpdateUsersSetting() {
  yield takeLeading(USERS_SETTING, doUpdateUsersSetting);
}
