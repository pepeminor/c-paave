import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import { scaleSize } from 'styles';
import useStyles from './styles';
import { getAccountNotification, putDeleteNotification, putMarkAsReadNotification } from 'reduxs/global-actions';
import { IAccountNotificationListResponse } from 'interfaces/notification';
import { useDispatch } from 'react-redux';
import { ReducerStatus } from 'interfaces/reducer';
import { useTranslation } from 'react-i18next';
import { CustomHeader } from './components/CustomHeader';
import { NotificationItem } from './components/NotificationItem';
import { INotificationOption } from 'constants/enum';
import { useAppSelector } from 'hooks';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { NotificationActions, NotificationCategories, NotificationTab } from 'reduxs';
import { CustomTabSelector } from './components/CustomTabSelector.component';
import config from 'config';
import PaaveButton from 'components/PaaveButton';
import { store } from 'screens/App';

const PAGE_SIZE = config.pageSize;

const Notification = (props: StackScreenProps<'Notification'>) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();
  const dispatch = useDispatch();

  const [data, setData] = useState<IAccountNotificationListResponse[]>([]);
  const currentPage = useRef(0);

  const accountNotificationList = useAppSelector(state => state.accountNotificationList);
  const mode = useAppSelector(state => state.Notification.mode);
  const tab = useAppSelector(state => state.Notification.tab);
  const deleteDisable = useAppSelector(state => state.Notification.deletingList.length === 0);

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = useCallback((reset = false) => {
    if (reset) {
      setData([]);
      currentPage.current = 0;
    }
    dispatch(
      getAccountNotification({
        payload: {
          pageNumber: currentPage.current,
          pageSize: PAGE_SIZE,
          option: INotificationOption.ALL,
          category: NotificationCategories[store.getState().Notification.tab],
        },
        callBack: {
          handleSuccess: (response: IAccountNotificationListResponse[]) => {
            setData(pre => {
              const uniqueList = [...new Map([...pre, ...response].map(item => [item['id'], item])).values()];
              return uniqueList.sort((a, b) => {
                return b.id - a.id;
              });
            });
          },
        },
      })
    );
  }, []);

  const onLoadMore = useCallback(() => {
    if (accountNotificationList.data?.length != null && accountNotificationList.data?.length < PAGE_SIZE) return;
    currentPage.current += 1;
    getNotification();
  }, [accountNotificationList.data?.length]);

  const onDeleteNotification = () => {
    const deleteList = store.getState().Notification.deletingList;
    dispatch(
      putDeleteNotification({
        payload: { notificationId: deleteList.length === data.length ? undefined : deleteList },
        callBack: {
          handleSuccess: () => {
            setData(pre => {
              return pre.filter(item => !deleteList.includes(item.id));
            });
          },
        },
      })
    );
    dispatch(NotificationActions.setMode('DEFAULT'));
    dispatch(NotificationActions.updateDeletingList([]));
  };

  const onMarkAsReadNotification = () => {
    const deleteList = store.getState().Notification.deletingList;
    if (deleteList.length === data.length && data.length > 0) {
      dispatch(putMarkAsReadNotification({ notificationId: undefined, lastId: data[0].id }));
    } else {
      const readIdList = data.filter(item => item.read).map(item => item.id);
      const unreadDeleteList = deleteList.filter(item => !readIdList.includes(item));
      dispatch(putMarkAsReadNotification({ notificationId: unreadDeleteList }));
    }

    setData(pre => {
      return [...pre].map(item => {
        if (deleteList.includes(item.id)) {
          return { ...item, read: true };
        }
        return item;
      });
    });

    dispatch(NotificationActions.setMode('DEFAULT'));
    dispatch(NotificationActions.updateDeletingList([]));
  };

  const onChangeTab = useCallback((tab: NotificationTab) => {
    dispatch(NotificationActions.setTab(tab));
    getNotification(true);
  }, []);

  const renderNotificationListItem = useCallback(
    ({ item }: ListRenderItemInfo<IAccountNotificationListResponse>) => {
      return <NotificationItem item={item} key={item.id} />;
    },
    [NotificationItem]
  );

  return (
    <View style={styles.container}>
      <CustomHeader data={data} goBack={props.navigation.goBack} />
      <CustomTabSelector onChangeTab={onChangeTab} />
      <FlashList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderNotificationListItem}
        refreshing={accountNotificationList.status === ReducerStatus.LOADING}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.3}
        estimatedItemSize={scaleSize(122)}
      />
      {data.length === 0 && accountNotificationList.data?.length === 0 && (
        <View style={styles.textNotificationContainer}>
          <Text allowFontScaling={false} style={styles.textNotification}>
            {t("You don't have any new notifications")}
          </Text>
        </View>
      )}
      <View style={styles.actionBtnContainer}>
        {mode === 'DELETE' && (
          <PaaveButton
            type="SOLID"
            color={dynamicColors.BlueNewColor}
            disableColor={dynamicColors.BlueNewColor}
            style={styles.actionBtn}
            disabled={deleteDisable}
            onPress={onMarkAsReadNotification}
          >
            <Text allowFontScaling={false}>{t('Mark as read')}</Text>
          </PaaveButton>
        )}
        {mode === 'DELETE' && tab !== 'MarketInfo' && (
          <PaaveButton
            type="SOLID"
            color={dynamicColors.LIGHTRed}
            disableColor={dynamicColors.LIGHTRed}
            style={styles.actionBtn}
            disabled={deleteDisable}
            onPress={onDeleteNotification}
          >
            <Text allowFontScaling={false}>{t('Clear')}</Text>
          </PaaveButton>
        )}
      </View>
    </View>
  );
};

export default memo(Notification);
