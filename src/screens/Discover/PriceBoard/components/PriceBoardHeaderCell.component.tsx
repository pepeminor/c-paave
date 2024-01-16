import React, { useCallback, useRef } from 'react';
import { Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import { textStyles } from 'styles';
import OutlineUp from 'assets/icon/OutlineUp.svg';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { SortType } from '../PriceBoard.type';
import { useTranslation } from 'react-i18next';

type PriceBoardHeaderCell = {
  text: string;
  value?: SortType;
  setValue?: (value?: SortType) => void;
  containerStyles?: ViewStyle;
  toggleType?: () => void;
};

const PriceBoardHeaderCell = ({ containerStyles, value, setValue, toggleType, text }: PriceBoardHeaderCell) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const isEditing = useRef(false);

  const iconRotateValue = useSharedValue(0);
  const iconOpacityValue = useSharedValue(0);
  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(iconOpacityValue.value),
      transform: [{ rotateZ: withTiming(`${iconRotateValue.value}deg`) }],
    };
  });

  const onPress = useCallback(() => {
    isEditing.current = true;
    let newValue = value;
    switch (value) {
      case 'ASC':
        newValue = undefined;
        iconRotateValue.value += 180;
        iconOpacityValue.value = 0;
        break;
      case 'DESC':
        newValue = 'ASC';
        iconRotateValue.value += 180;
        iconOpacityValue.value = 1;
        break;
      default:
        newValue = 'DESC';
        iconRotateValue.value += 180;
        iconOpacityValue.value = 1;
        break;
    }
    setValue?.(newValue);
  }, [value]);

  useUpdateEffect(() => {
    if (!value) {
      iconRotateValue.value += 180;
      iconOpacityValue.value = 0;
    }
  }, [value]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.cell, containerStyles]}>
        <Text allowFontScaling={false} style={styles.text}>
          {t(text)}
        </Text>
        <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
          <OutlineUp scaleX={0.75} scaleY={0.75} />
        </Animated.View>
        {toggleType && (
          <TouchableOpacity onPress={toggleType} style={styles.changeTypeBtnLeft}>
            <OutlineUp scaleX={0.75} scaleY={0.75} />
          </TouchableOpacity>
        )}
        {toggleType && (
          <TouchableOpacity onPress={toggleType} style={styles.changeTypeBtnRight}>
            <OutlineUp scaleX={0.75} scaleY={0.75} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default withMemo(PriceBoardHeaderCell);

const useStyles = getStylesHook({
  cell: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    bottom: -10,
    alignItems: 'center',
    width: '100%',
  },
  text: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
  },
  changeTypeBtnLeft: {
    position: 'absolute',
    left: 0,
    transform: [{ rotateZ: '-90deg' }],
  },
  changeTypeBtnRight: {
    position: 'absolute',
    right: 0,
    transform: [{ rotateZ: '90deg' }],
  },
});
