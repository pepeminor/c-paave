import { OneSignalUtils } from 'utils';
import { updateCurrentUserSetting } from 'reduxs/global-actions';
import { store } from 'screens/App';

export const updateOneSignalTags = (notification: boolean | null, mobileOTP: boolean | null) => {
  const currentUserSetting = store.getState().currentUserSetting;
  if (notification == null || mobileOTP == null) return;
  store.dispatch(
    updateCurrentUserSetting({
      notification: notification,
      mobileOTP: mobileOTP,
      isSms: !mobileOTP,
    })
  );
  OneSignalUtils.disablePush(!notification);
  OneSignalUtils.updateTagMobileOTP(mobileOTP && currentUserSetting?.isSms === false);
};
