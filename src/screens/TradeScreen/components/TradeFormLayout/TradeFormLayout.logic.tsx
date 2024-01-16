import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useRef } from 'react';
import { IProps } from './TradeFormLayout.type';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { ORDER_TYPE } from 'global';

const initializeState = {
  reload: false,
  filterSelecting: ORDER_TYPE.NORMAL_ORDER,
};

const useTradeFormLayoutLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state] = useMergingState(initializeState, propsRef);

  const handlers = useHandlers({
    onVibratePrice: () => {
      propsRef.current.currentUserSetting?.vibrate &&
        ReactNativeHapticFeedback.trigger('impactLight', {
          enableVibrateFallback: true, //only ios
          ignoreAndroidSystemSettings: true, //only android
        });
    },
    goToAiRating: () => {
      propsRef.current.navigation.replace(ScreenNames.HomeTab, { tab: 'Insights' });
    },
  });

  return {
    state,
    handlers,
  };
};

export { useTradeFormLayoutLogic };
