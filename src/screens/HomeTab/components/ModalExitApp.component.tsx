import React, { useEffect } from 'react';
import withMemo from 'HOC/withMemo';
import { View, BackHandler, Text, Platform, NativeEventSubscription } from 'react-native';
import globalStyles from 'styles';
import useModalOrder from 'hooks/useModalOrder';
import { useTranslation } from 'react-i18next';
import { navigationRef } from 'utils';
import { EventListenerCallback, NavigationContainerEventMap } from '@react-navigation/native';

const ModalNotice = () => {
  const { t } = useTranslation();
  const backPressCountRef = React.useRef(0);

  useEffect(() => {
    const onBackPress = () => {
      backPressCountRef.current = backPressCountRef.current + 1;
      if (backPressCountRef.current === 2) {
        backPressCountRef.current = 0;
        onVisibleModalExitApp();
      }
      return true;
    };

    let backListener: NativeEventSubscription | null = null;
    const stateListenerCallback: EventListenerCallback<NavigationContainerEventMap, 'state'> = e => {
      const cannotGoBack = e.data.state?.routes?.length === 1 || e.data.state?.routes?.length === undefined;
      if (cannotGoBack) {
        if (backListener == null && Platform.OS === 'android') {
          backListener = BackHandler.addEventListener('hardwareBackPress', onBackPress);
        }
      } else if (backListener) {
        backListener.remove();
        backListener = null;
      }
    };
    navigationRef.addListener('state', stateListenerCallback);
    return () => {
      if (backListener) {
        backListener.remove();
      }
      navigationRef.removeListener('state', stateListenerCallback);
    };
  }, []);

  const [ModalComponentExitApp, onVisibleModalExitApp, isVisible] = useModalOrder({
    title: 'Exit App',
    onConfirm: BackHandler.exitApp,
    confirmText: 'Yes',
    ListContentModal: (
      <View style={globalStyles.alignCenter}>
        <Text allowFontScaling={false}>{t('Do you want to exit app')}?</Text>
      </View>
    ),
  });

  if (isVisible) {
    return ModalComponentExitApp;
  }

  return null;
};

export default withMemo(ModalNotice);
