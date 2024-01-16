import { ACCOUNT_TYPE } from 'global';
import { ILoginParams, ILoginResponse } from 'interfaces/authentication';
import { select, takeLeading } from 'redux-saga/effects';
import { SettingSelectors, SettingState } from 'reduxs/Setting';
import { ONESIGNAL_RESEND_TAGS } from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { OneSignalUtils } from 'utils';

function* doResendOneSignalTags() {
  try {
    const isLoggedIn: boolean = yield select((state: IState) => {
      const accessToken = state.authToken.accessToken;
      return accessToken != null && accessToken !== '';
    });
    const loginData: (ILoginResponse & ILoginParams) | null = yield select((state: IState) => state.loginData);
    if (!isLoggedIn || loginData?.userInfo == null) {
      return;
    }

    const accountType: ACCOUNT_TYPE = yield select((state: IState) => state.selectedAccount.type);
    if (accountType === ACCOUNT_TYPE.DEMO) {
      OneSignalUtils.sendNonLoginTag();
      return;
    }

    const kisAccountName: string | undefined = yield select((state: IState) => state.accountList.KIS?.username);
    if (kisAccountName) {
      OneSignalUtils.sendLoginTag({
        userid: loginData.userInfo.id != null ? loginData.userInfo.id.toString() : '',
        username: loginData.userInfo.username ?? '',
        partner_kis: kisAccountName.toLowerCase(),
      });
    } else {
      OneSignalUtils.sendLoginTag({
        userid: loginData.userInfo.id != null ? loginData.userInfo.id.toString() : '',
        username: loginData.userInfo.username ?? '',
      });
    }

    // GetCurrentUserSetting.ts calls OneSignalUtils.updateLanguage and OneSignalUtils.sendNotificationTag
    const notifications: SettingState['notifications'] = yield select(SettingSelectors.selectNotifications);
    OneSignalUtils.sendNotificationTag({
      aiRating: notifications.aiRating,
      theme: notifications.theme,
      vnindexReturns: notifications.vnindexReturns,
      pinnedNews: notifications.pinnedNews,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Resend OneSignal tags', e);
  }
}

export function* watchResendOneSignalTags() {
  yield takeLeading(ONESIGNAL_RESEND_TAGS, doResendOneSignalTags);
}
