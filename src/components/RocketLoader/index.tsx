import React, { PropsWithChildren, memo, useEffect } from 'react';
import LoadingKIS from 'assets/icon/loading-kis.svg';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { getStylesHook } from 'hooks/useStyles';
import { View } from 'react-native';

type RocketLoaderProps = {
  isLoading: boolean;
};

const RocketLoader = ({ isLoading, children }: PropsWithChildren<RocketLoaderProps>) => {
  const { styles } = useStyles();

  const rotateAnimation = useRotateAnimation();

  return isLoading ? (
    <>
      <Animated.View style={[styles.rotateRocket, rotateAnimation]}>
        <LoadingKIS />
      </Animated.View>
      <View style={[styles.rotateRocket]}>{children}</View>
    </>
  ) : null;
};

export default memo(RocketLoader);

const useRotateAnimation = () => {
  const offset = useSharedValue(0);
  const loopAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${offset.value}deg`,
      },
    ],
  }));
  useEffect(() => {
    offset.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);
  return loopAnimation;
};

const useStyles = getStylesHook({
  rotateRocket: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
