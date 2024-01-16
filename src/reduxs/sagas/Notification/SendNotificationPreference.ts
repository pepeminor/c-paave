import { SEND_NOTIFICATION_PREFERENCE } from '../../actions';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { ISendNotificationPreferenceParams, ISendNotificationPreferenceSuccess } from 'interfaces/notification';

export default createNormalApiQuerySaga<ISendNotificationPreferenceParams, ISendNotificationPreferenceSuccess>(
  APIList.sendNotificationPreference,
  SEND_NOTIFICATION_PREFERENCE
);
