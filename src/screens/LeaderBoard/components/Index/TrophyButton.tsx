import { getStylesHook } from 'hooks/useStyles';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Animated, Easing, TouchableOpacity, View } from 'react-native';
import globalStyles, { lightColors, scaleSize } from 'styles';
import WhiteTrophy from 'assets/icon/WhiteTrophy.svg';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import { track } from '@amplitude/analytics-react-native';
import { navigationRef } from 'utils';
import { useAppSelector } from 'hooks/useAppSelector';

const loopAnimation = (bounceAnimation: Animated.Value) => {
  return Animated.loop(
    Animated.timing(bounceAnimation, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    { resetBeforeIteration: true }
  );
};

function TrophyButton() {
  const { styles } = useStyles();

  const accountName = useAppSelector(state => state.selectedAccount.selectedSubAccount?.accountName);

  const goToContest = useCallback(() => {
    track(AMPLITUDE_EVENT.CONTEST_SCREEN, {
      selectedAccount: accountName ?? 'NON_LOGIN',
    });
    navigationRef.navigate('Contest');
  }, [accountName]);

  const bounceAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loopAnimation(bounceAnimation).start();
    return () => {
      loopAnimation(bounceAnimation).reset();
    };
  }, [loopAnimation]);

  return (
    <TouchableOpacity onPress={goToContest} style={styles.trophyIcon}>
      <Animated.View
        style={[
          globalStyles.positionAbsolute,
          styles.trophyIcon,
          {
            transform: [
              {
                scale: bounceAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.5],
                }),
              },
            ],
            opacity: bounceAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}
      >
        <WhiteTrophy width={scaleSize(22)} height={scaleSize(22)} />
      </Animated.View>
      <WhiteTrophy width={scaleSize(22)} height={scaleSize(22)} />
      <View style={[styles.notificationContainer, styles.containerIcon2]} />
    </TouchableOpacity>
  );
}

export default memo(TrophyButton);

const useStyles = getStylesHook({
  trophyIcon: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  notificationContainer: {
    position: 'absolute',
    right: 0,
    backgroundColor: lightColors.RedColorLogo,
    borderRadius: 10,
  },
  containerIcon2: {
    width: 10,
    height: 10,
  },
});
