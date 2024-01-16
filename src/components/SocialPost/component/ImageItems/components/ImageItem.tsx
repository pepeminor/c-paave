import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { View, Image, StyleProp, ImageStyle, ViewStyle, ImageResizeMode } from 'react-native';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks';
import { lightColors } from 'styles';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { IMediaPCore } from 'reduxs';
import { isNotNilOrEmpty } from 'ramda-adjunct';
import { formatMeasureData } from 'utils';
import { MeasureData } from 'hooks/useMedia/useShareMediaLayout.hook';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import ButtonPreventDoubleClick from 'components/ButtonPreventDoubleClick';
import { useTranslation } from 'react-i18next';

interface IProps {
  styleImage?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  image: IMediaPCore;
  index: number;
  animatedValue: Animated.SharedValue<number>;
  selectedIndex: Animated.SharedValue<number>;
  onPress({ animationSpec, index }: { animationSpec: MeasureData; index: number }): void;
  resizeMode?: ImageResizeMode;
}
export interface ImageItemRef {
  getMeasureData(callback: (data: MeasureData) => void): void;
}

export type ImageItemReactRef = React.Ref<ImageItemRef>;

const ImageItem = forwardRef((props: IProps, ref: ImageItemReactRef) => {
  const { styles, dynamicColors } = useStyles();
  const { index, animatedValue, onPress, selectedIndex } = props;
  const { t } = useTranslation();
  const imageRef = useRef<Animated.View>();

  const onPressImage = useCallback(() => {
    imageRef.current?.measure((...arg) => {
      const animationSpec = formatMeasureData(arg, animatedValue);
      onPress({ animationSpec, index });
    });
  }, []);

  useImperativeHandle(ref, () => ({
    getMeasureData: cb => {
      imageRef.current?.measure((...arg) => {
        const animationSpec = formatMeasureData(arg, animatedValue);
        cb?.(animationSpec);
      });
    },
  }));

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: selectedIndex.value === index ? animatedValue.value : 1,
    };
  });

  return (
    <ButtonPreventDoubleClick
      btnRef={imageRef}
      style={[styles.containerImage, props.containerStyle, animatedStyle]}
      onPress={onPressImage}
    >
      <Image
        source={{
          uri: props.image.url,
        }}
        style={props.styleImage}
        resizeMode={'cover'}
        defaultSource={require('assets/img/defaultImage.png')}
      />
      {isNotNilOrEmpty(props.image.description) && (
        <View style={styles.containerALT}>
          <PaaveText type={TEXT_TYPE.BOLD_12} color={dynamicColors.WHITE}>
            {t('new_post_screen.image_description')}
          </PaaveText>
        </View>
      )}
    </ButtonPreventDoubleClick>
  );
});

const useStyles = getStylesHook({
  containerALT: {
    position: 'absolute',
    bottom: 6,
    left: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: lightColors.BLACK_65,
    borderRadius: 8,
  },
  containerImage: {
    backgroundColor: lightColors.BORDER,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withMemo(ImageItem);
