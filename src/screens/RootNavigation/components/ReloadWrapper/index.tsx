import { useTypedSelector } from 'hooks';
import React, { PropsWithChildren, memo, useEffect, useRef } from 'react';
import LoadingKIS from 'assets/icon/loading-kis.svg';
import { Animated, Easing, Text, View } from 'react-native';
import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';

const ReloadWrapper = ({ children }: PropsWithChildren<{}>) => {
  const { styles } = useStyles();
  const { t } = useTranslation();

  const offset = useRef(new Animated.Value(0)).current;

  const isReloading = useTypedSelector(state => state.ReloadController.isReloading);

  const loopAnimation = Animated.loop(
    Animated.timing(offset, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    { resetBeforeIteration: true }
  );

  useEffect(() => {
    if (isReloading) {
      loopAnimation.reset();
      loopAnimation.start();
    }
  }, [isReloading]);

  return (
    <>
      {/* Use styles instead of unmount because of Android's bug.
       * After reload, absolute View will persist on screen and cause App untouchable.
       */}
      <View style={isReloading ? styles.modalBackground : styles.modalBackgroundDisable}>
        <Animated.View
          style={{
            transform: [
              {
                rotateZ: offset.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}
        >
          <LoadingKIS />
        </Animated.View>
        <Text style={styles.loadingTextStyle}>
          {t(`Please wait while we verify your account.\nIt'll just take a moment`)}
        </Text>
        <View style={styles.dummyBlock} />
      </View>
      {!isReloading && children}
    </>
  );
};

const useStyles = getStylesHook({
  loadingTextStyle: {
    paddingVertical: 32,
    color: lightColors.SecondColorsLogo,
    fontFamily: 'Roboto',
    fontSize: 14,
    textAlign: 'center',
  },
  dummyBlock: {
    height: 128,
    width: 128,
  },
  modalBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColors.BACKGROUND_MODAL2,
    zIndex: 999,
  },
  modalBackgroundDisable: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -999,
  },
});

export default memo(ReloadWrapper);
