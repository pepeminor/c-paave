import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useRef } from 'react';
import { IProps } from './NotificationGroup.type';
import { NotificationType } from 'reduxs';
import { OneSignalUtils } from 'utils';

const initializeState = {};

const useNotificationGroupLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state] = useMergingState(initializeState, propsRef);

  const handlers = useHandlers({
    onChangeAIRatingSwitch: (value: boolean) => {
      if (!propsRef.current.isHasNotification) return;
      propsRef.current.changeNotifications({
        key: NotificationType.aiRating,
        value,
      });
      OneSignalUtils.sendNotificationTag({
        aiRating: value,
      });
    },
    onChangeThemeSwitch: (value: boolean) => {
      if (!propsRef.current.isHasNotification) return;
      propsRef.current.changeNotifications({
        key: NotificationType.theme,
        value,
      });
      OneSignalUtils.sendNotificationTag({
        theme: value,
      });
    },
    onChangeVNIndexStockReturnSwitch: (value: boolean) => {
      if (!propsRef.current.isHasNotification) return;
      propsRef.current.changeNotifications({
        key: NotificationType.vnindexReturns,
        value,
      });
      OneSignalUtils.sendNotificationTag({
        vnindexReturns: value,
      });
    },
    onChangePinnedNewsSwitch: (value: boolean) => {
      if (!propsRef.current.isHasNotification) return;
      propsRef.current.changeNotifications({
        key: NotificationType.pinnedNews,
        value,
      });
      OneSignalUtils.sendNotificationTag({
        pinnedNews: value,
      });
    },
  });

  return {
    state,
    handlers,
  };
};

export { useNotificationGroupLogic };
