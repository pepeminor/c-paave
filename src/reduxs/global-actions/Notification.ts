import {
  IAccountNotificationParams,
  IDeleteNotificationParams,
  INotificationMarkAsReadParams,
  ISendNotificationPreferenceParams,
} from 'interfaces/notification';
import {
  NOTIFICATION_GET_ACCOUNT_NOTIFICATION,
  NOTIFICATION_PUT_DELETE,
  NOTIFICATION_PUT_MARK_AS_READ,
  NOTIFICATION_PUT_MARK_AS_READ_LOCAL,
  NOTIFICATION_GET_NUMBER_OF_UNREAD,
  SEND_NOTIFICATION_PREFERENCE,
} from 'reduxs/actions';
import { generateAction, generateActionObject } from 'utils';

export const getAccountNotification = generateActionObject<IAccountNotificationParams>(
  NOTIFICATION_GET_ACCOUNT_NOTIFICATION
);

export const putMarkAsReadNotification = generateAction<INotificationMarkAsReadParams>(NOTIFICATION_PUT_MARK_AS_READ);

export const putMarkAsReadNotificationLocal = generateAction<INotificationMarkAsReadParams>(
  NOTIFICATION_PUT_MARK_AS_READ_LOCAL
);

export const putDeleteNotification = generateActionObject<IDeleteNotificationParams>(NOTIFICATION_PUT_DELETE);

export const getNumberOfUnreadNotification = generateAction(NOTIFICATION_GET_NUMBER_OF_UNREAD);

export const sendNotificationPreference =
  generateAction<ISendNotificationPreferenceParams>(SEND_NOTIFICATION_PREFERENCE);
