import config from 'config';
import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Animated, StyleProp, Text, TextProps, TextStyle, ViewProps, ViewStyle } from 'react-native';
import { hexToRgba } from 'utils';
import styles from './styles';
import { useColors } from 'hooks/useStyles';

interface IFlashColorProps extends ViewProps {
  changeNumber: number;
  displayValue: string | number;
  delay?: number;
  isInteraction?: boolean;
  duration?: number;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  allowFontScaling?: boolean;
  startColor?: string;
  endColor?: string;
  steadyColor?: string;
  upColor?: string;
  downColor?: string;
  textProps?: TextProps;

  easing?: (value: number) => number;
}

const START_COLOR = 0;
const END_COLOR = 1;

const DEFAULT_DURATION = config.flashTextColorDuration;

const FlashColorBackground = ({
  changeNumber,
  displayValue,
  containerStyles,
  textStyles,
  allowFontScaling = false,
  delay = DEFAULT_DURATION,
  isInteraction,
  duration = 0,
  easing,
  style,
  textProps,
  children,
  ...props
}: IFlashColorProps) => {
  const prevChangeNumber = useRef<number>(changeNumber);
  const color = useRef(new Animated.Value(START_COLOR)).current;
  const Colors = useColors();
  const {
    startColor = hexToRgba(Colors.LIGHTTextContent, 0.5),
    endColor = Colors.Transparent,
    steadyColor,
    upColor = hexToRgba(Colors.Green1, 0.5),
    downColor = hexToRgba(Colors.LIGHTRed2, 0.5),
    ...viewProps
  } = props;

  const getFlashBackground = useMemo(() => {
    const prevValue = prevChangeNumber.current;
    prevChangeNumber.current = changeNumber;

    if (prevValue == null) return startColor;
    if (steadyColor != null && changeNumber !== prevValue) return steadyColor;
    else if (changeNumber > prevValue) return upColor;
    else if (changeNumber < prevValue) return downColor;
    return startColor;
  }, [changeNumber]);

  useEffect(() => {
    color.setValue(START_COLOR);
    Animated.timing(color, {
      toValue: END_COLOR,
      duration: duration,
      easing,
      delay: delay,
      isInteraction,
      useNativeDriver: false,
    }).start();
  }, [displayValue]);

  return (
    <Animated.View
      style={[
        styles.container,
        containerStyles,
        style,
        {
          backgroundColor: color.interpolate({
            inputRange: [START_COLOR, END_COLOR],
            outputRange: [getFlashBackground, endColor],
          }),
        },
      ]}
      {...viewProps}
    >
      {children}
      <Text style={textStyles} allowFontScaling={allowFontScaling} {...textProps}>
        {displayValue}
      </Text>
    </Animated.View>
  );
};

export default memo(FlashColorBackground);
