import config from 'config';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';
import { hexToRgba } from 'utils';
import styles from './styles';
import { useColors } from 'hooks/useStyles';

interface IColorGroup {
  bgColor: string;

  txtColor: string;
}

export interface IBackgroundConfig {
  start: IColorGroup;

  end?: IColorGroup;

  steady?: IColorGroup;

  up?: IColorGroup;

  down?: IColorGroup;
}

interface IFlashColorProps extends ViewProps {
  changeNumber: number;

  displayValue: string | number;

  delay?: number;

  isInteraction?: boolean;

  duration?: number;

  colorConfig?: IBackgroundConfig;

  containerStyles?: StyleProp<ViewStyle>;

  textStyles?: StyleProp<TextStyle>;

  allowFontScaling?: boolean;

  easing?: (value: number) => number;
}

const getColor = (color: string | string[], isDarkMode = false) => {
  if (typeof color === 'string') return color;

  return color[isDarkMode ? 0 : 1] as string;
};

const START_COLOR = 0;
const END_COLOR = 1;

const DEFAULT_DURATION = config.flashTextColorDuration;

const FlashColorText = (props: IFlashColorProps) => {
  const prevChangeNumber = useRef<number | undefined>();
  const color = useRef(new Animated.Value(START_COLOR)).current;
  const Colors = useColors();
  const DEFAULT_COLOR_CONFIG = {
    start: {
      bgColor: hexToRgba(Colors.LIGHTTextContent, 0.5),
      txtColor: Colors.LIGHTTextContent,
    },
    end: {
      bgColor: Colors.Transparent,
      txtColor: Colors.LIGHTTextContent,
    },
    up: {
      bgColor: hexToRgba(getColor(Colors.Green1), 0.5),
      txtColor: getColor(Colors.Green1),
    },
    down: {
      bgColor: hexToRgba(getColor(Colors.LIGHTRed2), 0.5),
      txtColor: getColor(Colors.LIGHTRed),
    },
    steady: null,
  };

  const {
    changeNumber,
    displayValue,
    containerStyles,
    textStyles,
    allowFontScaling,
    delay = DEFAULT_DURATION,
    isInteraction,
    duration = 0,
    colorConfig = DEFAULT_COLOR_CONFIG,
    easing,
    style,
    ...viewProps
  } = props;
  // const isDarkMode = useSelector((state: IState) => state.currentUserSetting?.darkMode);
  const getFlashBackground = useMemo(() => {
    const prevValue = prevChangeNumber.current;
    prevChangeNumber.current = changeNumber;

    if (prevValue == null) return colorConfig.start;
    if (colorConfig?.steady != null && changeNumber !== prevValue) return colorConfig?.steady;
    else if (changeNumber > prevValue) return colorConfig.up || DEFAULT_COLOR_CONFIG.up;
    else if (changeNumber < prevValue) return colorConfig.down || DEFAULT_COLOR_CONFIG.down;
    return DEFAULT_COLOR_CONFIG.start;
  }, [changeNumber]);

  const colorInterpolate = useCallback((output: string[]) => {
    return color.interpolate({
      inputRange: [START_COLOR, END_COLOR],
      outputRange: output,
    });
  }, []);

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
  }, [changeNumber]);

  const backgroundColor = {
    backgroundColor: colorInterpolate([getFlashBackground.bgColor, colorConfig?.end?.bgColor || Colors.Transparent]),
  };

  const textColor = {
    color: colorInterpolate([getFlashBackground.txtColor, colorConfig?.end?.txtColor || Colors.LIGHTTextContent]),
  };

  return (
    <Animated.View style={[styles.container, containerStyles, backgroundColor, style]} {...viewProps}>
      <Animated.Text style={[textStyles, textColor]} allowFontScaling={allowFontScaling}>
        {displayValue}
      </Animated.Text>
    </Animated.View>
  );
};

export default memo(FlashColorText, (prevProps, nextProps) => {
  return prevProps.changeNumber === nextProps.changeNumber;
});
