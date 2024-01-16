import { withPreventDoubleClick } from 'HOC';
import withMemo from 'HOC/withMemo';
import { HitSlop, HitSlopDefault } from 'constants/enum';
import React from 'react';
import { TextStyle, Text, TouchableOpacity, TouchableOpacityProps, ViewProps } from 'react-native';
import Animated, { AnimateProps } from 'react-native-reanimated';

const Button = withPreventDoubleClick<ButtonPreventDoubleClickProps>(
  Animated.createAnimatedComponent(TouchableOpacity)
);
const TextPrevent = withPreventDoubleClick(Text);

export interface ButtonPreventDoubleClickProps
  extends TouchableOpacityProps,
    Pick<TextStyle, 'color' | 'lineHeight'>,
    Pick<AnimateProps<ViewProps>, 'entering' | 'exiting' | 'layout'> {
  children?: any;
  componentType?: 'button' | 'text';
  btnRef?: any;
  ignoreHitSlop?: boolean;
}

const ButtonPreventDoubleClick = (props: ButtonPreventDoubleClickProps) => {
  const {
    activeOpacity = 0.8,
    componentType = 'button',
    hitSlop = HitSlop,
    delayLongPress = 200,
    ignoreHitSlop = false,
  } = props;

  if (componentType === 'text') {
    return <TextPrevent {...props}>{props.children}</TextPrevent>;
  }

  return (
    <Button
      {...props}
      activeOpacity={activeOpacity}
      hitSlop={ignoreHitSlop ? HitSlopDefault : hitSlop}
      delayLongPress={delayLongPress}
    >
      {props.children}
    </Button>
  );
};

export default withMemo(ButtonPreventDoubleClick);
