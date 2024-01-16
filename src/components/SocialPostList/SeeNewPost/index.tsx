import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { width, lightColors, scaleSize } from 'styles';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import ButtonPreventDoubleClick from 'components/ButtonPreventDoubleClick';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { SocialNewPostActions } from 'reduxs';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface IProps {
  listRef: any;
}

export interface RefBtnScrollToTop {
  onScroll(e: NativeSyntheticEvent<NativeScrollEvent>): void;
}

const SeeNewPost = forwardRef((props: IProps, childRef) => {
  const { styles, dynamicColors } = useStyles();
  const { listRef } = props;
  const currentY = useRef(0);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const translateY = useSharedValue(-100);

  const isSuccessCreatePost = useAppSelector(state => state.SocialNewPost.isSuccess);

  const listener = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event?.nativeEvent?.contentOffset?.y;

    if (currentY.current < y) {
      dispatch(SocialNewPostActions.updateSuccess(false));
    }

    currentY.current = y;
  }, []);

  useEffect(() => {
    if (isSuccessCreatePost) {
      translateY.value = withTiming(10);
    } else {
      translateY.value = withTiming(-100);
    }
  }, [isSuccessCreatePost]);

  useImperativeHandle(childRef, () => ({
    onScroll: listener,
  }));

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.containerScrollTop, animatedStyle]}>
      <ButtonPreventDoubleClick
        style={styles.buttonScrollTop}
        onPress={() => {
          listRef?.current?.scrollToOffset?.({ offset: 0, animated: true });
          dispatch(SocialNewPostActions.updateSuccess(false));
        }}
      >
        <PaaveText type={TEXT_TYPE.BOLD_14} color={dynamicColors.WHITE}>
          {t('see_new_post')}
        </PaaveText>
      </ButtonPreventDoubleClick>
    </Animated.View>
  );
});

export default withMemo(SeeNewPost);

export const useStyles = getStylesHook({
  containerScrollTop: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    _left: width / 2 - scaleSize(60),
    alignSelf: 'flex-end',
  },
  scrollTop: {
    width: 80,
    aspectRatio: 1,
  },
  buttonScrollTop: {
    paddingVertical: 8,
    width: 120,
    borderRadius: 10,
    backgroundColor: lightColors.BlueNewColor,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: lightColors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
