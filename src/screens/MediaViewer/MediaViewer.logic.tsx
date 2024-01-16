import { useEffect, useMemo, useRef } from 'react';
import { StatusBar } from 'react-native';
import {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { IProps } from './MediaViewer.type';
import useMergingState from 'hooks/useMergingState';
import { lightColors } from 'styles';
import { GalleryRef } from './components/Gallery/Gallery.type';
import useHandlers from 'hooks/useHandlers';
import Orientation from 'react-native-orientation-locker';

const initializeState = {
  indexImage: 0,
};

const useMediaViewerLogic = (props: IProps) => {
  const [state, setState] = useMergingState(initializeState);
  const medias = props.route.params?.medias || [];
  const animationSpec = useMemo(() => props.route.params?.animationSpec, []);
  const initialIndex = props.route.params?.initialIndex ?? 0;

  const refGallery = useRef<GalleryRef>(null);

  const indexViewing = useSharedValue(initialIndex);
  const showDescription = useSharedValue(1);

  const triggerAnimation = useSharedValue(0);

  useEffect(() => {
    triggerAnimation.value = 0;
    triggerAnimation.value = withTiming(1);
  }, []);

  useEffect(() => {
    Orientation.addDeviceOrientationListener(() => {
      Orientation.lockToAllOrientationsButUpsideDown();
    });

    return () => {
      Orientation.lockToPortrait();
      Orientation.removeAllListeners();
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: !animationSpec
        ? 'black'
        : interpolateColor(triggerAnimation.value, [0, 1], [lightColors.Transparent, 'black']),
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(triggerAnimation.value, [0, 0.99, 1], [0, 0, 1]),
    };
  });

  const bottomAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: showDescription.value,
    };
  });

  useEffect(() => {
    return () => {
      StatusBar.setHidden(false);
    };
  }, []);

  const handlers = useHandlers({
    onIndexChange: (index: number) => {
      indexViewing.value = index;
      setState({
        indexImage: index,
      });
    },
    onGoBack: () => {
      if (!animationSpec) {
        props.navigation.goBack();

        return;
      }

      triggerAnimation.value = withTiming(0, {}, finish => {
        if (!finish) return;

        if (animationSpec.value?.animatedValue) {
          animationSpec.value.animatedValue.value = 1;
        }
        runOnJS(props.navigation.goBack)();
      });
    },
    onScaleChange: (value: number) => {
      if (value === 1) {
        showDescription.value = withTiming(1);
      } else {
        showDescription.value = withTiming(0);
      }
    },
    onTap: () => {
      if (showDescription.value === 1) {
        showDescription.value = withTiming(0);
      } else {
        showDescription.value = withTiming(1);
      }
    },
  });

  return {
    state,
    handlers,
    medias,
    initialIndex,
    indexViewing,
    animatedStyle,
    triggerAnimation,
    animationSpec,
    refGallery,
    headerAnimatedStyle,
    bottomAnimatedStyle,
  };
};

export { useMediaViewerLogic };
