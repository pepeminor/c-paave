import { isEqual } from 'lodash';
import React, { memo, useCallback } from 'react';
import { Dimensions, LayoutChangeEvent, ScrollView } from 'react-native';
import globalStyles from 'styles';
import Animated, { useAnimatedStyle, useSharedValue, SharedValue } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { SheetDataProps } from 'components/SheetData3';
import useMemoizedStyles from 'hooks/useMemoizedStyles';

const MIN_DISTANCE = 50;

function SheetData<T>({
  data,
  HeaderComponent,
  RowComponent,
  columnWidth = Dimensions.get('window').width,
  style,
  scrollViewRef,
  ...scrollViewProps
}: SheetDataProps<T>) {
  const contentWidthRef = useSharedValue(0);
  const { gestureHandler, scrollStyle, frozenStyle } = useScrollHorizontal(columnWidth, contentWidthRef);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    contentWidthRef.value = e.nativeEvent.layout.width;
  }, []);

  const { containerStyle } = useMemoizedStyles({
    containerStyle: [globalStyles.flexDirectionCol, style],
  });

  return (
    <GestureDetector gesture={gestureHandler} userSelect={'auto'}>
      <Animated.View onLayout={onLayout} style={globalStyles.container}>
        <Animated.View style={scrollStyle}>
          {HeaderComponent != null && <HeaderComponent frozenStyle={frozenStyle} />}
        </Animated.View>
        <ScrollView
          style={containerStyle}
          {...scrollViewProps}
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={scrollStyle}>
            {data?.map((item, index) => (
              <RowComponent index={index} data={item} key={index} frozenStyle={frozenStyle} />
            ))}
          </Animated.View>
        </ScrollView>
      </Animated.View>
    </GestureDetector>
  );
}

export const SheetDataWithHorizontalScroll = memo(SheetData, isEqual) as typeof SheetData;

const useScrollHorizontal = (columnWidth: number, containerRef: SharedValue<number>) => {
  const x = useSharedValue(0);
  const xOld = useSharedValue(0);

  const gestureHandler = Gesture.Pan()
    .onStart(() => {
      xOld.value = x.value;
    })
    .onUpdate(event => {
      const MIN_X = -columnWidth + containerRef.value;
      x.value = xOld.value + event.translationX;
      if (x.value > 0) {
        x.value = 0;
      }
      if (x.value < MIN_X) {
        x.value = MIN_X;
      }
    })
    .minDistance(MIN_DISTANCE);
  const scrollStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
      ],
    };
  });

  const frozenStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: -x.value,
        },
      ],
    };
  });

  return { gestureHandler, scrollStyle, frozenStyle };
};
