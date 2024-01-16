import { Text, View } from 'react-native';
import React, { memo } from 'react';
import useStyles from './styles';
import { ActivityIndicator } from 'react-native-paper';
import Animated, { Keyframe } from 'react-native-reanimated';
import { useAppSelector } from 'hooks/useAppSelector';
import Modal from 'components/Modal';
import Icon from 'components/Icon';

const Loader = () => {
  const { styles, dynamicColors } = useStyles();
  const loadingMessages = useAppSelector(state => state.loadingAndError.loadingMessages);
  const errorMessages = useAppSelector(state => state.loadingAndError.errorMessages);

  return (
    <>
      {loadingMessages.length > 0 && (
        <View style={styles.showLoader}>
          {loadingMessages.map(item => (
            <Animated.Text
              allowFontScaling={false}
              style={styles.loadingText}
              entering={SlideInAnimation}
              exiting={SlideOutAnimation}
              key={item}
            >
              {item}
            </Animated.Text>
          ))}
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color="white" />
          </View>
        </View>
      )}
      {errorMessages.length > 0 && (
        <Modal visible={errorMessages.length > 0}>
          <View style={styles.modalContainer}>
            <View style={styles.errorContainer}>
              <Icon name="error" size={80} color={dynamicColors.LIGHTRed} />
              {errorMessages.map(item => (
                <Text allowFontScaling={false} key={item} style={styles.errorText}>
                  {item}
                </Text>
              ))}
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default memo(Loader);

const SlideInAnimation = new Keyframe({
  0: {
    transform: [
      {
        translateY: 100,
      },
    ],
    opacity: 0,
  },
  50: {
    transform: [
      {
        translateY: 50,
      },
    ],
    opacity: 0.3,
  },
  100: {
    transform: [
      {
        translateY: 0,
      },
    ],
    opacity: 1,
  },
});

const SlideOutAnimation = new Keyframe({
  0: {
    transform: [
      {
        translateY: 0,
      },
    ],
    opacity: 1,
  },
  50: {
    transform: [
      {
        translateY: -50,
      },
    ],
    opacity: 0.3,
  },
  100: {
    transform: [
      {
        translateY: -100,
      },
    ],
    opacity: 0,
  },
});
