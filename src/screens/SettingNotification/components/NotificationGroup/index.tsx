import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import NotificationGroup from './NotificationGroup.view';
import { SettingActions, SettingSelectors } from 'reduxs';
import { sendNotificationPreference } from 'reduxs/global-actions';

export const mapStateToProps = (state: IState) => ({
  isHasNotification: !!state.currentUserSetting?.notification,
  settingNotificationGroup: SettingSelectors.selectNotifications(state),
  userInfo: state.userInfoFromLogin,
});

export const mapDispatchToProps = {
  changeNotifications: SettingActions.changeNotifications,
  sendNotificationPreference,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationGroup);
