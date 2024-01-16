import { Text, TouchableOpacity } from 'react-native';
import React, { memo, useCallback, useEffect } from 'react';
import { useStyles } from './styles';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { formatNumber, navigateToSymbolInfoOverview } from 'utils';
import { scaleSize } from 'styles';
import { useDispatch } from 'react-redux';

type Props = {
  label: string;
  value: number;
  maxValue: number;
  column?: 'FIRST' | 'SECOND';
};
const Bil = 1000000000;
const RowHeight = scaleSize(20);

export const FunnelRow = memo(({ label, value, maxValue, column = 'FIRST' }: Props) => {
  const { styles, dynamicColors } = useStyles();
  const dispatch = useDispatch();
  const animatedValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      flex: animatedValue.value,
      height: RowHeight,
      backgroundColor: column === 'FIRST' ? dynamicColors.DARK_GREEN : dynamicColors.LIGHTRed,
      borderRadius: 4,
    };
  });

  const goToStockDetail = useCallback(() => {
    navigateToSymbolInfoOverview(label, dispatch);
  }, [label]);

  useEffect(() => {
    animatedValue.value = withTiming(Math.abs(value) / maxValue, { duration: 800, easing: Easing.inOut(Easing.ease) });
  }, [value, maxValue]);

  if (column === 'FIRST')
    return (
      <TouchableOpacity style={styles.firstColumnRow} onPress={goToStockDetail}>
        <Text style={styles.buySellValue}>{formatNumber(value / Bil, 2)}</Text>
        <Animated.View style={animatedStyle} />
        <Text style={styles.stockName}>{label}</Text>
      </TouchableOpacity>
    );

  return (
    <TouchableOpacity style={styles.secondColumnRow} onPress={goToStockDetail}>
      <Text style={styles.stockName}>{label}</Text>
      <Animated.View style={animatedStyle} />
      <Text style={styles.buySellValue}>{formatNumber(value / Bil, 2)}</Text>
    </TouchableOpacity>
  );
});
