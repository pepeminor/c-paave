import { View, Text } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import { useStyles } from './styles';
import { TouchableOpacity } from 'react-native';
import { IAccountNotificationListResponse } from 'interfaces/notification';
import { formatDateToString, navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { putMarkAsReadNotification } from 'reduxs/global-actions';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks';
import { LANG } from 'global';
import CheckBox from 'components/CheckBox';
import globalStyles from 'styles';
import { NotificationActions } from 'reduxs';
import { useTranslation } from 'react-i18next';
import useUpdateEffect from 'hooks/useUpdateEffect';

type NotificationItemProps = {
  item: IAccountNotificationListResponse;
};

export const NotificationItem = memo(({ item }: NotificationItemProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const lang = useAppSelector(state => state.lang);
  const mode = useAppSelector(state => state.Notification.mode);
  const isCheckboxToggled = useAppSelector(state => {
    const { mode, deletingList } = state.Notification;
    if (mode !== 'DELETE') {
      return false;
    }
    return deletingList.includes(item.id);
  });
  const title = (lang === LANG.VI ? item.titleVi : item.title) ?? item.title;
  const [isRead, setIsRead] = useState(item.read);

  const goToNotificationDetail = useCallback(() => {
    if (!item.read) {
      dispatch(putMarkAsReadNotification({ notificationId: [item.id] }));
    }
    navigate({ key: ScreenNames.NotificationDetail, params: item });
    setIsRead(true);
  }, [item]);

  const onPressDelete = useCallback(() => {
    dispatch(NotificationActions.toggleDeleteCheckbox(item.id));
  }, [item.id]);

  useUpdateEffect(() => {
    setIsRead(item.read);
  }, [item.read]);

  return (
    <TouchableOpacity onPress={mode === 'DELETE' ? onPressDelete : goToNotificationDetail} style={styles.container}>
      {mode === 'DELETE' && <CheckBox value={isCheckboxToggled} size={20} onPress={onPressDelete} />}
      <View style={globalStyles.container}>
        <View style={styles.titleRow}>
          <Text allowFontScaling={false} style={styles.titleText} numberOfLines={1}>
            {t(title)}
          </Text>
          {!isRead && <View style={styles.unreadDot} />}
        </View>
        {item.contentEn != null && item.contentVi != null && (
          <Text allowFontScaling={false} style={styles.notificationText} numberOfLines={2}>
            {lang === LANG.VI ? item.contentVi : item.contentEn}
          </Text>
        )}
        {item.date != null && (
          <Text allowFontScaling={false} style={styles.timeText}>
            {formatDateToString(new Date(item.date), 'dd/MM/yyyy HH:mm')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
});
