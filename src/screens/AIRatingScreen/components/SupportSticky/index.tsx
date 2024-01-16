import React, { memo, useCallback, useState } from 'react';
import { Image, Linking, Text, TouchableWithoutFeedback, View, Dimensions, ScrollView } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import DoubleArrowWhite from 'assets/icon/DoubleArrowWhite.svg';
import globalStyles, { lightColors as Colors, scaleSize, textStyles } from 'styles';
import { TabNames } from 'screens/AIRatingScreen/constants';
import AIRatingModal from 'components/AIRatingModal';
import BottomModal from 'components/BottomModal';
import { useTranslation } from 'react-i18next';
import { getStylesHook } from 'hooks/useStyles';

type SupportStickyProps = {
  yOffset: SharedValue<number>;
  tab: TabNames;
};

const WIDTH = scaleSize(240);
const ButtonWidth = scaleSize(30);
const InitialOffsetX = (ButtonWidth - WIDTH) / 2;

const SupportSticky = ({ yOffset, tab }: SupportStickyProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const [visibleRatingModal, setVisibleRatingModal] = useState(false);

  const xOffset = useSharedValue(InitialOffsetX);
  const isOpened = useDerivedValue(() => {
    return xOffset.value !== InitialOffsetX;
  }, []);

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(xOffset.value - InitialOffsetX) },
        { translateY: withSpring(yOffset.value) },
      ],
    };
  });

  const animatedArrowIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateY: withTiming(isOpened.value ? '180deg' : '0deg', { duration: 500 }) },
        { translateX: withTiming(isOpened.value ? -2 * InitialOffsetX : 0, { duration: 300 }) },
      ],
    };
  });

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isOpened.value ? 1 : 0, { duration: 500 }),
    };
  });

  const onOpenOrClosePressed = useCallback(() => {
    xOffset.value = xOffset.value * -1;
  }, []);

  const [advisorModal, openAdvisorModal] = BottomModal({
    ModalContent: RoboAdvisorsModal,
  });

  const onButtonPressed = useCallback(() => {
    onOpenOrClosePressed();
    switch (tab) {
      case 'Score':
        handleVisibleRatingModal();
        break;
      case 'Advisor':
        openAdvisorModal();
        break;
    }
  }, [tab, onOpenOrClosePressed]);

  const handleVisibleRatingModal = useCallback(() => {
    setVisibleRatingModal(pre => !pre);
  }, []);

  return (
    <View style={globalStyles.container}>
      <Animated.View style={[styles.container, animatedViewStyle]}>
        <TouchableWithoutFeedback onPress={onButtonPressed}>
          <View style={[styles.subContainer]}>
            <Animated.Text style={[styles.btnText, animatedContentStyle]}>
              {t(tab === 'Score' ? 'Learn more about AI Rating' : 'Learn more about Robo Advisor')}
            </Animated.Text>
            <TouchableWithoutFeedback onPress={onOpenOrClosePressed}>
              <Animated.View style={[styles.arrowIcon, animatedArrowIconStyle]}>
                <DoubleArrowWhite />
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
      {visibleRatingModal === true && <AIRatingModal handleVisible={handleVisibleRatingModal} isVisibleText={true} />}
      {advisorModal}
    </View>
  );
};

export default memo(SupportSticky);

export const RoboAdvisorsModal = memo(() => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const goToLink = useCallback(() => {
    // eslint-disable-next-line no-console
    Linking.openURL('https://zalo.me/g/konfpy693').catch(err => console.error('An error occurred', err));
  }, []);

  return (
    <View style={styles.advisorModalContainer}>
      <Text allowFontScaling={false} style={styles.roboTitle}>
        {t('What is AI Advisors?')}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.roboImageContainer}>
          <Image source={require('assets/img/RoboAdvisor.png')} style={styles.roboImage} />
        </View>
        <Text allowFontScaling={false} style={styles.roboText}>
          {t('Robo Advisors Description')}
          <Text style={styles.hyperlink} onPress={goToLink}>
            {' '}
            {t('tại đây')}
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
});

const useStyles = getStylesHook({
  container: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: Colors.BlueNewColor,
    width: WIDTH,
    height: 32,
    top: 150,
    left: 2 * InitialOffsetX - 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  subContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 8,
    paddingLeft: ButtonWidth,
  },
  arrowIcon: {
    position: 'absolute',
    width: ButtonWidth,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: Colors.WHITE,
    textAlign: 'center',
    flex: 1,
  },

  advisorModalContainer: {
    height: Dimensions.get('window').height * 0.84,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  roboTitle: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    color: Colors.BlueNewColor,
    marginBottom: 8,
    textAlign: 'center',
  },
  roboText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto400,
    marginBottom: 8,
  },
  hyperlink: {
    ...textStyles.roboto700,
    color: Colors.BlueNewColor,
  },
  roboImageContainer: {
    height: 300,
    marginBottom: 8,
    padding: 16,
  },
  roboImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});
