import { useAppSelector } from 'hooks/useAppSelector';
import React, { useCallback } from 'react';
import { TouchableOpacity, Image, Dimensions } from 'react-native';
import useStyles from './styles';
import MoveContestCloseIcon from 'assets/icon/MoveContestCloseIcon.svg';
import { LANG } from 'global';
import { scaleSize } from 'styles';
import { navigate } from 'utils';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

type Props = {
  setButtonVisible: (value: boolean) => void;
};

const ButtonMoveScreen = ({ setButtonVisible }: Props) => {
  const { styles } = useStyles();
  const selecTedLanguage = useAppSelector(state => state.lang);

  const goToTermAndCondition = useCallback(() => {
    navigate({
      key: 'TermAndConditionVT',
    });
  }, []);

  const hideButton = useCallback(() => {
    setButtonVisible(false);
  }, [setButtonVisible]);

  const { buttonAnimatedStyle, gestureHandler } = useButtonAnimatedStyles();

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.square, buttonAnimatedStyle]}>
        <TouchableOpacity activeOpacity={1} onPress={goToTermAndCondition}>
          {selecTedLanguage === LANG.VI ? (
            <Image source={require('assets/icon/MoveContestIconVi.png')} style={styles.imageContainer} />
          ) : (
            <Image source={require('assets/icon/MoveContestIconEn.png')} style={styles.imageContainer} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={hideButton} style={styles.btnClose}>
          <MoveContestCloseIcon />
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ButtonMoveScreen;

interface GestureContext extends Record<string, unknown> {
  startX: number;
  startY: number;
}

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

const useButtonAnimatedStyles = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const offset = scaleSize(75);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, GestureContext>({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = withSpring(ctx.startX + event.translationX, {
        damping: 100,
        stiffness: 1000,
      });
      y.value = withSpring(ctx.startY + event.translationY, {
        damping: 100,
        stiffness: 1000,
      });
    },
    onEnd(event) {
      const stopConditionX = event.absoluteX > WINDOW_WIDTH - offset || event.absoluteX < offset;
      const stopConditionY = event.absoluteY > WINDOW_HEIGHT - offset || event.absoluteY < offset;
      if (stopConditionX) {
        x.value = withSpring(event.absoluteX > WINDOW_WIDTH - offset ? 0 : 2 * offset - WINDOW_WIDTH);
      }
      if (stopConditionY) {
        y.value = withSpring(
          event.absoluteY > WINDOW_HEIGHT - offset ? (WINDOW_HEIGHT - 2 * offset) / 2 : (offset - WINDOW_HEIGHT) / 2
        );
      }
    },
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
        {
          translateY: y.value,
        },
      ],
    };
  });

  return {
    buttonAnimatedStyle,
    gestureHandler,
  };
};
