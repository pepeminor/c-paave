import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import ButtonPreventDoubleClick from '../ButtonPreventDoubleClick';
import { height, lightColors } from 'styles';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import Icon from 'components/Icon';

interface IProps {
  listRef: any;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface RefBtnScrollToTop {
  onScroll(e: NativeSyntheticEvent<NativeScrollEvent>): void;
}

const ButtonScrollToTop = forwardRef((props: IProps, childRef) => {
  const { styles, dynamicColors } = useStyles();
  const { listRef } = props;
  const [showScrollTop, setShowScrollTop] = useState(false);

  const listener = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentY = event?.nativeEvent?.contentOffset?.y;

    y.setValue(currentY);
    const newShowScrollTop = typeof currentY === 'number' && currentY > (height * 3) / 2;
    setShowScrollTop(newShowScrollTop);
  }, []);
  const y = useMemo(() => new Animated.Value(0), []);

  const diffClampY = useMemo(() => Animated.diffClamp(y, -50, 0), [y]);

  const translateY = diffClampY.interpolate({
    inputRange: [-60, -20],
    outputRange: [-70, 100],
  });

  useImperativeHandle(childRef, () => ({
    onScroll: listener,
  }));

  if (!showScrollTop) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.containerScrollTop,
        props.containerStyle,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <ButtonPreventDoubleClick
        style={styles.buttonScrollTop}
        onPress={() => {
          listRef?.current?.scrollToOffset?.({ offset: 0, animated: true });
        }}
      >
        <Icon name={'arrow-up-double'} color={dynamicColors.WHITE} size={24} />
      </ButtonPreventDoubleClick>
    </Animated.View>
  );
});

export default withMemo(ButtonScrollToTop);

export const useStyles = getStylesHook({
  containerScrollTop: {
    position: 'absolute',
    zIndex: 1,
    bottom: 30,
    right: 30,
    alignSelf: 'flex-end',
  },
  scrollTop: {
    width: 80,
    aspectRatio: 1,
  },
  buttonScrollTop: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
