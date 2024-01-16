import React from 'react';
import { StatusBar } from 'react-native';
import Animated from 'react-native-reanimated';
import { useMediaViewerLogic } from './MediaViewer.logic';
import { useStyles } from './MediaViewer.style';
import { IProps } from './MediaViewer.type';
import { Action, Gallery } from './components';
import withMemo from 'HOC/withMemo';
import { TEXT_TYPE } from 'components/PaaveText/type';
import TextSeeMore from 'components/TextSeeMore';

const MediaViewer = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const { navigation } = props;
  const {
    bottomAnimatedStyle,
    state,
    handlers,
    medias,
    initialIndex,
    animatedStyle,
    triggerAnimation,
    refGallery,
    headerAnimatedStyle,
  } = useMediaViewerLogic(props);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <StatusBar hidden={true} />
      <Action
        indexImage={state.indexImage}
        listLength={medias.length}
        onGoBack={handlers.onGoBack}
        style={headerAnimatedStyle}
      />
      <Gallery
        ref={refGallery}
        data={medias}
        onIndexChange={handlers.onIndexChange}
        onScaleChange={handlers.onScaleChange}
        onTap={handlers.onTap}
        initialIndex={initialIndex}
        onSwipeToClose={navigation.goBack}
        triggerAnimation={triggerAnimation}
      />
      {medias[state.indexImage].description && (
        <Animated.View style={[styles.containerBottom, bottomAnimatedStyle]}>
          <TextSeeMore
            type={TEXT_TYPE.REGULAR_14}
            color={dynamicColors.WHITE}
            colorTextSeeMore={dynamicColors.WHITE}
            content={medias[state.indexImage].description}
            style={styles.textDescription}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default withMemo(MediaViewer);
