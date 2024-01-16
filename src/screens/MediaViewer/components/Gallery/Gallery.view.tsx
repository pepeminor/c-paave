/* tslint:disable */
import React, { forwardRef } from 'react';
import { Image, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { ResizableImage } from './components';
import { DOUBLE_TAP_SCALE, MAX_SCALE, SPACE_BETWEEN_IMAGES } from './Gallery.config';
import { useGalleryLogic } from './Gallery.logic';
import { useStyles } from './Gallery.style';
import { GalleryProps, GalleryReactRef, RenderItemInfo } from './Gallery.type';
import { mapV2 } from 'utils';
import { IImage } from 'reduxs';
import withMemo from 'HOC/withMemo';

const DefaultRenderImage = ({ item, setImageDimensions }: RenderItemInfo<IImage & { uri?: string }>) => {
  const { styles } = useStyles();
  const onLoad = (e: any) => {
    const { height: h, width: w } = e.nativeEvent.source;
    setImageDimensions({ height: h, width: w });
  };

  return (
    <View style={styles.centerItem}>
      <Image
        onLoad={onLoad}
        source={{
          uri: item.url,
        }}
        style={styles.styleImage}
        defaultSource={require('assets/img/defaultImage.png')}
      />
    </View>
  );
};

const Gallery = forwardRef((props: GalleryProps, ref: GalleryReactRef) => {
  const { styles, dynamicColors } = useStyles();
  const {
    data,
    renderItem = DefaultRenderImage,
    emptySpaceWidth = SPACE_BETWEEN_IMAGES,
    doubleTapScale = DOUBLE_TAP_SCALE,
    doubleTapInterval = 500,
    maxScale = MAX_SCALE,
    pinchEnabled = true,
    disableTransitionOnScaledImage = false,
    hideAdjacentImagesOnScaledImage = false,
    style,
    disableVerticalSwipe,
    disableSwipeUp = false,
    onScaleChange,
    onScaleChangeRange,
    triggerAnimation,
    ...eventsCallbacks
  } = props;

  const { isLoop, state, handlers, animatedStyle, dimensions, translateX, currentIndex } = useGalleryLogic(props, ref);

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        {mapV2(data, (item, i) => {
          const isFirst = i === 0;

          return (
            <View
              key={i}
              style={[
                dimensions,
                isFirst ? {} : { marginLeft: emptySpaceWidth },
                {
                  zIndex: state.index === i ? 1 : 0,
                  backgroundColor: dynamicColors.Transparent,
                },
              ]}
            >
              <ResizableImage
                {...{
                  translateX,
                  item,
                  currentIndex,
                  isFirst,
                  renderItem,
                  emptySpaceWidth,
                  doubleTapScale,
                  doubleTapInterval,
                  maxScale,
                  pinchEnabled,
                  disableTransitionOnScaledImage,
                  hideAdjacentImagesOnScaledImage,
                  disableVerticalSwipe,
                  disableSwipeUp,
                  loop: isLoop,
                  onScaleChange,
                  onScaleChangeRange,
                  triggerAnimation,
                  setRef: handlers.SET_REF,
                  length: data.length,
                  index: i,
                  isLast: i === data.length - 1,
                  ...eventsCallbacks,
                  ...dimensions,
                }}
              />
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
});

export default withMemo(Gallery);
