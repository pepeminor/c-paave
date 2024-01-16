import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { IMediaPCore } from 'reduxs';
import { MeasureData } from './useShareMediaLayout.hook';
import { formatMeasureData } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

export const useShareMultipleMediaLayout = (params: { onPress?(index: number): void; medias: IMediaPCore[] }) => {
  const { onPress, medias } = params;

  const navigation = useNavigation<NavigationProp<any>>();

  const animationSpecShareValue = useSharedValue({} as MeasureData);
  const refContainerMedia = useRef<Animated.View[]>([]);
  const animatedValue = useSharedValue(1);
  const selectedIndex = useSharedValue(0);

  const assignRef = (index: number) => (ref: Animated.View) => {
    if (!ref) {
      return;
    }
    refContainerMedia.current[index] = ref;
  };

  const onChangeIndex = useCallback((newIndex: number) => {
    selectedIndex.value = newIndex;
    refContainerMedia.current[newIndex]?.measure?.((...arg) => {
      animationSpecShareValue.value = formatMeasureData(arg, animatedValue, onChangeIndex);
    });
  }, []);

  const onPressMedia = useCallback(
    (index: number) => () => {
      if (onPress) {
        return onPress(index);
      }

      refContainerMedia?.current?.[index]?.measure?.((...arg) => {
        animationSpecShareValue.value = formatMeasureData(arg, animatedValue, onChangeIndex);

        navigation.navigate(ScreenNames.MediaViewer, {
          medias,
          onChangeIndex,
          animationSpec: animationSpecShareValue,
          initialIndex: index,
        });
        animatedValue.value = withTiming(0, { duration: 100 });
        selectedIndex.value = index;
      });
    },
    [medias]
  );

  const animatedStyle = (index: number) =>
    useAnimatedStyle(() => {
      return {
        opacity: selectedIndex.value === index ? animatedValue.value : 1,
      };
    });

  const animatedStyleSingle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
    };
  });

  return {
    refContainerMedia,
    onPressMedia,
    animatedStyle,
    animatedValue,
    assignRef,
    animatedStyleSingle,
  };
};
