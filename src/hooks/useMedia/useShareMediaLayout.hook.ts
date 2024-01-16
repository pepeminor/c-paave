import { useCallback, useRef } from 'react';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { formatMeasureData } from 'utils';

export type MeasureData = ReturnType<typeof formatMeasureData>;

export const useShareMediaLayout = (params: { onPressMedia?(params: MeasureData, index: number): void }) => {
  const refContainerMedia = useRef<Animated.View>(null);
  const animatedValue = useSharedValue(1);

  const onPressMedia = useCallback((index: number) => {
    refContainerMedia?.current?.measure((...arg) => {
      params.onPressMedia?.(formatMeasureData(arg, animatedValue), index);
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
    };
  });

  return {
    refContainerMedia,
    onPressMedia,
    animatedStyle,
    animatedValue,
  };
};
