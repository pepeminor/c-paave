import { IAction } from 'interfaces/common';
import { put, takeLeading, select } from 'redux-saga/effects';
import { CURRENT_USERS_SETTING } from '../../actions';
import { LANG } from '../../../global/index';
import { checkNotifications } from 'react-native-permissions';
import { PermissionStatus } from '../../../screens/SettingNotification/index';
import { IUserSetting, IUserInfoFromLogin, IUsersSetting } from '../../../interfaces/user';
import { IState } from '../../global-reducers/index';
import { updateCurrentUserSetting } from '../../global-actions/UserInfo';
import { NotificationType, SettingActions, SettingSelectors, SettingState } from 'reduxs';
import { OneSignalUtils } from 'utils';
import { sendNotificationPreference } from 'reduxs/global-actions';

// usersSetting flow
function* doGetCurrentUser(request: IAction<null>) {
  const usersSetting: IUsersSetting = yield select((state: IState) => state.usersSetting);
  let listUsers: IUserSetting[] = usersSetting?.listUsers;

  // check for exist listUsers
  if (listUsers == null) {
    const oldUsersSetting: IUserSetting[] = yield select((state: IState) => state.usersSetting);
    listUsers = oldUsersSetting;
  }

  const userInfoFromLogin: IUserInfoFromLogin = yield select((state: IState) => state.userInfoFromLogin);

  let isGranted = false;

  yield checkNotifications().then(({ status }) => {
    // check device is allow notification
    if (status === PermissionStatus.GRANTED) {
      isGranted = true;
    } else {
      isGranted = false;
    }
  });

  if (request.response != null && userInfoFromLogin != null) {
    const defaultSetting = {
      accountNo: userInfoFromLogin.userId,
      mobileOTP: isGranted,
      notification: true,
      language: LANG.VI,
      alreadyDoneSmsOTP: false,
      vibrate: true,
      isSms: true,
      darkMode: false,
      kisUsername: userInfoFromLogin.kisUsername,
      paaveUsername: userInfoFromLogin.paaveUsername,
      isBiometric: false,
      email: userInfoFromLogin.email,
    };
    let currentUserSetting = defaultSetting;
    if (listUsers != null && listUsers.length > 0) {
      const checkExistUser = listUsers.filter(item => item != null && item.accountNo === userInfoFromLogin.userId);
      if (checkExistUser.length > 0) {
        if (checkExistUser[0].isBiometric != null) {
          currentUserSetting = {
            ...checkExistUser[0],
          };
          if (checkExistUser[0].isBiometric === true) {
            if (checkExistUser[0].paaveUsername !== usersSetting.currentBiometricUsername.paaveUsername) {
              yield put(updateCurrentUserSetting({ isBiometric: false }));
            }
          }
        } else {
          currentUserSetting = {
            ...checkExistUser[0],
            // update for exist user setting
            isBiometric: false,
            kisUsername: userInfoFromLogin.kisUsername,
            paaveUsername: userInfoFromLogin.paaveUsername,
            email: userInfoFromLogin.email,
          };
        }
        // add email for exist user setting
        if (checkExistUser[0].email == null) {
          currentUserSetting = {
            ...currentUserSetting,
            email: userInfoFromLogin.email,
          };
        }
      }
    }

    yield put({
      type: request.response.success,
      payload: currentUserSetting,
      hideLoading: true,
    });

    const isUpdateAllNotifications: boolean = yield select(SettingSelectors.selectIsUpdateAllNotifications);
    if (!isUpdateAllNotifications) {
      yield put(SettingActions.updateAllNotifications(currentUserSetting.notification));

      OneSignalUtils.sendNotificationTag({
        aiRating: currentUserSetting.notification,
        theme: currentUserSetting.notification,
        vnindexReturns: currentUserSetting.notification,
        pinnedNews: currentUserSetting.notification,
      });

      yield put(
        sendNotificationPreference({
          notificationInfoList: [
            { notificationType: NotificationType.aiRating, mode: 'on' },
            { notificationType: NotificationType.theme, mode: 'on' },
            { notificationType: NotificationType.vnindexReturns, mode: 'on' },
          ],
        })
      );
    } else {
      const notifications: SettingState['notifications'] = yield select(SettingSelectors.selectNotifications);
      OneSignalUtils.sendNotificationTag({
        aiRating: notifications.aiRating,
        theme: notifications.theme,
        vnindexReturns: notifications.vnindexReturns,
        pinnedNews: notifications.pinnedNews,
      });
    }
  }
}

export default function* watchGetCurrentUser() {
  yield takeLeading(CURRENT_USERS_SETTING, doGetCurrentUser);
}
