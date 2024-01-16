import React, { useCallback } from 'react';
import { View, Text, LayoutChangeEvent } from 'react-native';
import useStyles from './styles';
import withMemo from 'HOC/withMemo';
import globalStyles, { scaleSize } from 'styles';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import useMemoizedStyles from 'hooks/useMemoizedStyles';
import MinTextComponent, { MinTextRef } from './MinText.component';

type Props = {
  min?: number;
  max?: number;
  initialValue?: number;
  onRelease?: (value: number) => void;
};

type GestureContext = {
  startX: number;
};

const TranslateOffset = scaleSize(20);

const Slider = ({ initialValue = 0, min = 0, max = 5, onRelease }: Props) => {
  const { styles, dynamicColors } = useStyles();

  const minTextSharedValue = useSharedValue<MinTextRef | null>(null);
  const sliderWidth = useSharedValue(0);
  const x = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, GestureContext>({
    onStart: (event, ctx) => {
      x.value = event.x;
      ctx.startX = event.x;
    },
    onActive: (event, ctx) => {
      if (ctx.startX + event.translationX < 0) {
        x.value = 0;
        return;
      }
      if (ctx.startX + event.translationX > sliderWidth.value) {
        x.value = sliderWidth.value;
        return;
      }
      x.value = ctx.startX + event.translationX;
      const releaseValue = (x.value / sliderWidth.value) * (max - min) + min;
      const roundedValue = releaseValue.toFixed(1);
      if (minTextSharedValue.value) {
        runOnJS(minTextSharedValue.value.setValue)(Number(roundedValue));
      }
    },
    onEnd() {
      const releaseValue = (x.value / sliderWidth.value) * (max - min) + min;
      const roundedValue = releaseValue.toFixed(1);
      if (onRelease) {
        runOnJS(onRelease)(Number(roundedValue));
      }
      if (minTextSharedValue.value) {
        runOnJS(minTextSharedValue.value.setValue)(Number(roundedValue));
      }
    },
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value - TranslateOffset,
        },
      ],
    };
  });
  const barAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: x.value,
      backgroundColor: dynamicColors.LIGHTIconDisable,
    };
  });

  const memoizedStyles = useMemoizedStyles({
    barStyle: [styles.barStyle, barAnimatedStyle],
    indicatorStyle: [styles.indicatorContainer, buttonAnimatedStyle],
  });

  const onLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    sliderWidth.value = nativeEvent.layout.width;
    x.value = withTiming((nativeEvent.layout.width * initialValue) / max, {
      easing: Easing.inOut(Easing.ease),
      duration: 500,
    });
    minTextSharedValue.value?.setValue(initialValue);
  }, []);
  const handleMinTextRef = useCallback((ref: MinTextRef | null) => {
    minTextSharedValue.value = ref;
  }, []);

  return (
    <View style={globalStyles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View onLayout={onLayout}>
          <View style={styles.barContainer}>
            <View style={styles.barStyle} />
          </View>
          <View style={styles.filledBarContainer}>
            <Animated.View style={memoizedStyles.barStyle} />
          </View>
          <Animated.View style={memoizedStyles.indicatorStyle}>
            <View style={styles.indicatorStyle} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>

      <View style={styles.barMaxMin}>
        <MinTextComponent ref={handleMinTextRef} />
        <Text allowFontScaling={false} style={styles.maxMinText}>
          {max}
        </Text>
      </View>
    </View>
  );
};

export default withMemo(Slider);
