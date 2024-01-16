import FeedbackBackground from 'components/FeedbackBackground';
import React, { memo, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import globalStyles, { GradientColors } from 'styles';
import useStyles from './styles';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import LinearGradientButton from 'components/LinearGradientButton';
import { useTranslation } from 'react-i18next';
import { navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

const animatedConfig = {
  duration: 1500,
  toValue: 100,
  numberOfReps: -1,
  firstCircleShadow: {
    running: [0, 100],
    scale: [0, 1.3],
  },
  secondCircleShadow: {
    running: [50, 100],
    scale: [1.3, 1.6],
  },
};

const ThankYou = () => {
  const { t } = useTranslation();
  const scaleSize = useSharedValue(0);
  const { styles } = useStyles();

  const goToPortfolio = () => {
    navigate({ key: ScreenNames.HomeTab, params: { tab: 'Home' } });
  };

  const firstCircleShadowStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scaleSize.value,
      animatedConfig.firstCircleShadow.running,
      animatedConfig.firstCircleShadow.scale,
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    );
    return {
      transform: [{ scale }],
    };
  });

  const secondCircleShadowStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scaleSize.value,
      animatedConfig.secondCircleShadow.running,
      animatedConfig.secondCircleShadow.scale,
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    );
    return {
      transform: [{ scale }],
    };
  });

  useEffect(() => {
    scaleSize.value = withRepeat(
      withTiming(animatedConfig.toValue, { duration: animatedConfig.duration }),
      animatedConfig.numberOfReps
    );
  }, []);

  return (
    <FeedbackBackground containerStyle={styles.containerStyle}>
      <View style={styles.ThankYouContainer}>
        <Animated.View
          style={[styles.thankYouContainerShadow, styles.thankYouBackgroundLightBlue, secondCircleShadowStyle]}
        />
        <Animated.View
          style={[styles.thankYouContainerShadow, styles.thankYouBackgroundDarkBlue, firstCircleShadowStyle]}
        />
        <View style={styles.thankYouImgContainer}>
          <Image source={require('assets/img/ThankYou.png')} resizeMode="contain" style={globalStyles.container2} />
        </View>
      </View>
      <View style={globalStyles.centered}>
        <Text style={styles.thankYouText}>{t('Your feedback has been delivered')}</Text>
        <Text style={styles.thankYouTextDes2}>
          {t('We really appreciate your engagement towards the enhancement of Paave')}
        </Text>
      </View>
      <LinearGradientButton
        touchableOpacityProps={{
          onPress: goToPortfolio,
          style: styles.button,
        }}
        linearGradientProps={{
          colors: GradientColors.GradientYellow2,
          style: styles.buttonGradientStyle,
        }}
      >
        <Text style={styles.submitText}>{t('Go back to Portfolio Tab')}</Text>
      </LinearGradientButton>
    </FeedbackBackground>
  );
};

export default memo(ThankYou);
