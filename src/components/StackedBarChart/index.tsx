import React, { memo } from 'react';
import { ViewStyle } from 'react-native';
import globalStyles, { Colors } from 'styles';
import Animated, { useAnimatedStyle, withTiming, FadeInLeft } from 'react-native-reanimated';
interface IStackedBarChartBaseProps {
  totalValue?: number;
  buyValue: number | undefined;
  sellValue: number | undefined;
  unknownValue: number | undefined;
  containerStyles?: ViewStyle;
  buyColor?: string;
  sellColor?: string;
  unknownColor?: string;
}
const INIT_TOTAL_VALUE = 100;
const DEFAULT_DURATION = 500;
const StackedBarChart = ({
  totalValue = INIT_TOTAL_VALUE,
  buyValue,
  sellValue,
  unknownValue,
  buyColor = Colors.LIGHTButtonGreen,
  sellColor = Colors.LIGHTButtonRed,
  unknownColor = Colors.DARKTextDisable,
  containerStyles,
}: IStackedBarChartBaseProps) => {
  const animatedTotalValue = useAnimatedStyle(() => {
    return {
      width: withTiming(`${totalValue}%`, { duration: DEFAULT_DURATION }),
    };
  }, [totalValue]);
  const animatedBuyValue = useAnimatedStyle(() => {
    return {
      width: withTiming(`${buyValue ?? 0}%`, { duration: DEFAULT_DURATION }),
    };
  }, [buyValue]);
  const animatedSellValue = useAnimatedStyle(() => {
    return {
      width: withTiming(`${sellValue ?? 0}%`, { duration: DEFAULT_DURATION }),
    };
  }, [sellValue]);
  const animatedUnknownValue = useAnimatedStyle(() => {
    return {
      width: withTiming(`${unknownValue ?? 0}%`, { duration: DEFAULT_DURATION }),
    };
  }, [unknownValue]);
  return (
    <Animated.View
      style={[
        globalStyles.flexDirectionRow,
        globalStyles.overflowHidden,
        globalStyles.fillHeight,
        containerStyles,
        animatedTotalValue,
      ]}
      entering={FadeInLeft.duration(500)}
    >
      <Animated.View style={[globalStyles.fillHeight, animatedBuyValue, { backgroundColor: buyColor }]} />
      <Animated.View style={[globalStyles.fillHeight, animatedSellValue, { backgroundColor: sellColor }]} />
      <Animated.View style={[globalStyles.fillHeight, animatedUnknownValue, { backgroundColor: unknownColor }]} />
    </Animated.View>
  );
};
export default memo(StackedBarChart);
