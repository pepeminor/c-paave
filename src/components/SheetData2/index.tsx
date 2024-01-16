import { ComponentType, PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, Dimensions, PanResponder, ViewProps } from 'react-native';
import { SheetDataHeaderProps } from './components/Header';

const SCREEN_WIDTH = Dimensions.get('window').width;

export type RowComponentProps<T> = {
  data: T;
  Wrapper: ComponentType<PropsWithChildren<ViewProps>>;
};

export type HeaderConfig = Omit<SheetDataHeaderProps, 'Wrapper'>;

const useScrollHorizontal = (columnWidth: number) => {
  const pan = useRef(new Animated.Value(0)).current;
  const panValue = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => false, //return true -> stockList ko click dc
      onPanResponderGrant: () => pan.extractOffset(),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        resetPanOffset();
      },
      onPanResponderMove(e, gestureState) {
        resetPanOffset();
        Animated.event([null, { dx: pan }], { useNativeDriver: false })(e, gestureState);
      },
    })
  ).current;

  function resetPanOffset() {
    if (panValue.current > 0) {
      pan.setOffset(0);
      return;
    }
    if (panValue.current < SCREEN_WIDTH - columnWidth) {
      pan.setOffset(SCREEN_WIDTH - columnWidth);
    }
  }

  useEffect(() => {
    pan.addListener(value => {
      panValue.current = value.value;
    });
    return () => {
      pan.removeAllListeners();
    };
  }, []);

  const scrollStyle = SCREEN_WIDTH - columnWidth < 0 && {
    transform: [
      {
        translateX: pan.interpolate({
          inputRange: [SCREEN_WIDTH - columnWidth, 0],
          outputRange: [SCREEN_WIDTH - columnWidth, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const frozenStyle = SCREEN_WIDTH - columnWidth < 0 && {
    transform: [
      {
        translateX: pan.interpolate({
          inputRange: [SCREEN_WIDTH - columnWidth, 0],
          outputRange: [columnWidth - SCREEN_WIDTH, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
    zIndex: 1,
  };

  return { panResponder, scrollStyle, frozenStyle };
};

export { useScrollHorizontal };
