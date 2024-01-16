import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import ButtonPreventDoubleClick, { ButtonPreventDoubleClickProps } from '../ButtonPreventDoubleClick';
import withMemo from 'HOC/withMemo';
import { HitSlop } from 'constants/enum';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface IProps extends ButtonPreventDoubleClickProps {
  children?: any;
  minScale?: number;
  isPreventDoubleClick?: boolean;
}

const springConfig = {
  damping: 10,
  mass: 1,
  stiffness: 200,
};

const TouchableScale = ({
  style,
  children,
  activeOpacity = 1,
  minScale = 0.8,
  hitSlop = HitSlop,
  delayLongPress = 200,
  isPreventDoubleClick = true,
  ...rest
}: IProps) => {
  const scale = useSharedValue(1);

  const sz = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(scale.value, springConfig),
        },
      ],
    };
  });

  const onPressIn = useCallback(() => {
    scale.value = minScale;
  }, [minScale]);
  const onPressOut = useCallback(() => {
    scale.value = 1;
  }, []);

  const Button = isPreventDoubleClick ? ButtonPreventDoubleClick : AnimatedTouchableOpacity;

  return (
    <Button
      style={[sz, style]}
      {...rest}
      activeOpacity={activeOpacity}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      hitSlop={hitSlop}
      delayLongPress={delayLongPress}
    >
      {children}
    </Button>
  );
};

export default withMemo(TouchableScale);
