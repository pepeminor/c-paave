import { useRoute, RouteProp } from '@react-navigation/native';
import { useEffect, useMemo } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import {
  cancelAnimation,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useVector } from 'react-native-redash';
import { snapPoint } from '../../Gallery.config';
import { Dimensions, RenderItemInfo } from '../../Gallery.type';
import { clamp, withDecaySpring, withRubberBandClamp } from '../../utils';
import { IProps } from './ResizableImage.type';
import useMergingState from 'hooks/useMergingState';
import { getImgSize } from 'utils';
import { width as screenWidth, height as screenHeight } from 'styles';
import ScreenParamList from 'screens/RootNavigation/ScreenParamList';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import useHandlers from 'hooks/useHandlers';
import { IImage } from 'reduxs';

const initializeState = {};

const NOOP = () => {};

const useResizableImageLogic = (props: IProps) => {
  const {
    item,
    translateX,
    index,
    isFirst,
    isLast,
    currentIndex,
    height,
    onSwipeToClose,
    onTap,
    onDoubleTap,
    onPanStart,
    onScaleStart,
    emptySpaceWidth,
    doubleTapScale,
    doubleTapInterval,
    maxScale,
    pinchEnabled,
    disableTransitionOnScaledImage,
    hideAdjacentImagesOnScaledImage,
    disableVerticalSwipe,
    disableSwipeUp,
    loop,
    length,
    onScaleChange,
    onScaleChangeRange,
    setRef,
    triggerAnimation,
  } = props;

  const [state] = useMergingState(initializeState);
  const CENTER = {
    x: screenWidth / 2,
    y: height / 2,
  };
  const route = useRoute<RouteProp<ScreenParamList, ScreenNames.MediaViewer>>();

  const animationSpec = route?.params?.animationSpec;

  const onChangeIndexFromRoute = route?.params?.onChangeIndex;
  const imgSize = useMemo(
    () =>
      getImgSize(
        item?.meta?.original!,
        {
          width: screenWidth,
          height: screenHeight,
        },
        true
      ),
    []
  );

  const spaceAroundMediaY = useDerivedValue(
    () => (screenHeight - (animationSpec?.value?.height ?? imgSize.height)) / 2 || 0,
    [animationSpec?.value?.height]
  );

  const spaceAroundMediaX = useDerivedValue(
    () => (screenWidth - (animationSpec?.value?.width ?? imgSize.width)) / 2 || 0,
    [animationSpec?.value?.width]
  );

  const translateYInitialize = useDerivedValue(
    () => animationSpec?.value?.pageY! - spaceAroundMediaY.value || 0,
    [animationSpec?.value?.pageY]
  );

  const translateXInitialize = useDerivedValue(
    () => animationSpec?.value?.pageX! - spaceAroundMediaX.value || 0,
    [animationSpec?.value?.pageX]
  );

  const offset = useVector(0, 0);
  const scale = useSharedValue(1);
  const translation = useVector(0, 0);
  const origin = useVector(0, 0);
  const adjustedFocal = useVector(0, 0);
  const originalLayout = useVector(screenWidth, 0);
  const layout = useVector(screenWidth, 0);
  const isActive = useDerivedValue(() => currentIndex.value === index, [currentIndex]);
  const scaleOffset = useSharedValue(1);
  const isVertical = useSharedValue(false);
  const initialTranslateX = useSharedValue(0);
  const shouldClose = useSharedValue(false);

  useEffect(() => {
    handlers.SET_IMAGE_DIMENSIONS({
      width: originalLayout.x.value,
      height: originalLayout.y.value,
    });
  }, [screenWidth, height]);

  useEffect(() => {
    setRef({
      index,
      value: {
        reset: (animated: boolean) => resetValues(animated),
      },
    });
  }, [index]);

  useAnimatedReaction(
    () => {
      return scale.value;
    },
    scaleReaction => {
      if (!onScaleChange) {
        return;
      }

      if (!onScaleChangeRange) {
        runOnJS(onScaleChange)(scaleReaction);

        return;
      }

      if (scaleReaction > onScaleChangeRange.start && scaleReaction < onScaleChangeRange.end) {
        runOnJS(onScaleChange)(scaleReaction);
      }
    }
  );

  useAnimatedReaction(
    () => {
      return {
        i: currentIndex.value,
        translateX: translateX.value,
        currentScale: scale.value,
      };
    },
    ({ i, translateX: tranX, currentScale }) => {
      const translateIndex = tranX / -(screenWidth + emptySpaceWidth);
      if (loop) {
        let diff = Math.abs((translateIndex % 1) - 0.5);
        if (diff > 0.5) {
          diff = 1 - diff;
        }
        if (diff > 0.48 && Math.abs(i) !== index) {
          resetValues(false);

          return;
        }
      }
      if (Math.abs(i - index) === 2 && currentScale > 1) {
        resetValues(false);
      }
    }
  );

  const setAdjustedFocal = ({ focalX, focalY }: Record<'focalX' | 'focalY', number>) => {
    'worklet';

    adjustedFocal.x.value = focalX - (CENTER.x + offset.x.value);
    adjustedFocal.y.value = focalY - (CENTER.y + offset.y.value);
  };

  const resetValues = (animated = true) => {
    'worklet';

    scale.value = animated ? withTiming(1) : 1;
    offset.x.value = animated ? withTiming(0) : 0;
    offset.y.value = animated ? withTiming(0) : 0;
    translation.x.value = animated ? withTiming(0) : 0;
    translation.y.value = animated ? withTiming(0) : 0;
  };

  const resetValuesToClose = (cb = NOOP) => {
    'worklet';

    offset.x.value = 0;
    offset.y.value = 0;
    translation.x.value = withTiming(0);
    triggerAnimation.value = withTiming(0);
    translation.y.value = withTiming(translateYInitialize.value, {}, finish => {
      if (!finish) return;

      if (animationSpec?.value?.animatedValue) {
        animationSpec.value.animatedValue.value = 1;
      }
      cb?.();
    });
  };

  const getEdgeX = () => {
    'worklet';
    const newWidth = scale.value * layout.x.value;

    const point = (newWidth - screenWidth) / 2;

    if (point < 0) {
      return [-0, 0];
    }

    return [-point, point];
  };

  const clampY = (value: number, newScale: number) => {
    'worklet';
    const newHeight = newScale * layout.y.value;
    const point = (newHeight - height) / 2;

    if (newHeight < height) {
      return 0;
    }

    return clamp(value, -point, point);
  };

  const clampX = (value: number, newScale: number) => {
    'worklet';
    const newWidth = newScale * layout.x.value;
    const point = (newWidth - screenWidth) / 2;

    if (newWidth < screenWidth) {
      return 0;
    }

    return clamp(value, -point, point);
  };

  const getEdgeY = () => {
    'worklet';

    const newHeight = scale.value * layout.y.value;

    const point = (newHeight - height) / 2;

    return [-point, point];
  };

  const onStart = () => {
    'worklet';

    cancelAnimation(translateX);

    offset.x.value = offset.x.value + translation.x.value;
    offset.y.value = offset.y.value + translation.y.value;

    translation.x.value = 0;
    translation.y.value = 0;
  };

  const getPosition = (i?: number) => {
    'worklet';

    return -(screenWidth + emptySpaceWidth) * (typeof i !== 'undefined' ? i : index);
  };

  const getIndexFromPosition = (position: number) => {
    'worklet';

    return Math.round(position / -(screenWidth + emptySpaceWidth));
  };

  const animatedStyle = useAnimatedStyle(() => {
    const isNextForLast =
      loop && isFirst && currentIndex.value === length - 1 && translateX.value < getPosition(length - 1);
    const isPrevForFirst = loop && isLast && currentIndex.value === 0 && translateX.value > getPosition(0);

    const translateY = offset.y.value + translation.y.value;
    const translateXValue =
      offset.x.value +
      translation.x.value -
      (isNextForLast ? getPosition(length) : 0) +
      (isPrevForFirst ? getPosition(length) : 0);

    return {
      alignSelf: 'center',
      screenWidth: interpolate(
        triggerAnimation.value,
        [0, 1],
        [animationSpec?.value.width ?? imgSize.width, imgSize.width]
      ),
      height: interpolate(
        triggerAnimation.value,
        [0, 1],
        [animationSpec?.value.height ?? imgSize.height, imgSize.height]
      ),
      transform: [
        {
          translateX:
            translateXValue !== 0
              ? translateXValue
              : interpolate(triggerAnimation.value, [0, 1], [translateXInitialize.value, 0]),
        },
        {
          translateY:
            translateY !== 0
              ? translateY
              : interpolate(triggerAnimation.value, [0, 1], [translateYInitialize.value, 0]),
        },
        { scale: scale.value },
      ],
    };
  });

  const panGesture = Gesture.Pan()
    .minDistance(1)
    .maxPointers(1)
    .onBegin(() => {
      'worklet';
      if (!isActive.value) return;
      const newWidth = scale.value * layout.x.value;
      const newHeight = scale.value * layout.y.value;
      if (
        offset.x.value < (newWidth - screenWidth) / 2 - translation.x.value &&
        offset.x.value > -(newWidth - screenWidth) / 2 - translation.x.value
      ) {
        cancelAnimation(offset.x);
      }

      if (
        offset.y.value < (newHeight - height) / 2 - translation.y.value &&
        offset.y.value > -(newHeight - height) / 2 - translation.y.value
      ) {
        cancelAnimation(offset.y);
      }
    })
    .onStart(({ velocityY, velocityX }) => {
      'worklet';
      if (!isActive.value) return;

      if (onPanStart) {
        runOnJS(onPanStart)();
      }

      onStart();
      isVertical.value = Math.abs(velocityY) > Math.abs(velocityX);
      initialTranslateX.value = translateX.value;
    })
    // tslint:disable-next-line: cyclomatic-complexity
    .onUpdate(({ translationX, translationY, velocityY }) => {
      'worklet';
      if (!isActive.value) return;
      if (disableVerticalSwipe && scale.value === 1 && isVertical.value) {
        return;
      }

      const x = getEdgeX();

      if (!isVertical.value || scale.value > 1) {
        const clampedX = clamp(translationX, x[0] - offset.x.value, x[1] - offset.x.value);

        if (hideAdjacentImagesOnScaledImage && disableTransitionOnScaledImage) {
          const disabledTransition = disableTransitionOnScaledImage && scale.value > 1;

          const moveX = withRubberBandClamp(
            initialTranslateX.value + translationX - clampedX,
            0.55,
            screenWidth,
            disabledTransition ? [getPosition(index), getPosition(index + 1)] : [getPosition(length - 1), 0]
          );

          if (!disabledTransition) {
            translateX.value = moveX;
            translation.x.value = clampedX;
          } else {
            translation.x.value = clampedX + moveX - translateX.value;
          }
        } else {
          if (loop) {
            translateX.value = initialTranslateX.value + translationX - clampedX;
          } else {
            translateX.value = withRubberBandClamp(
              initialTranslateX.value + translationX - clampedX,
              0.55,
              screenWidth,
              disableTransitionOnScaledImage && scale.value > 1
                ? [getPosition(index), getPosition(index + 1)]
                : [getPosition(length - 1), 0]
            );
          }
          translation.x.value = clampedX;
        }
      }

      const newHeight = scale.value * layout.y.value;

      const edgeY = getEdgeY();

      if (newHeight > height) {
        translation.y.value = withRubberBandClamp(translationY, 0.55, newHeight, [
          edgeY[0] - offset.y.value,
          edgeY[1] - offset.y.value,
        ]);
      } else if (!(scale.value === 1 && translateX.value !== getPosition()) && (!disableSwipeUp || translationY >= 0)) {
        translation.y.value = translationY;
        triggerAnimation.value = interpolate(
          translationY,
          [
            -spaceAroundMediaY.value - 10,
            -spaceAroundMediaY.value,
            0,
            spaceAroundMediaY.value,
            spaceAroundMediaY.value + 10,
          ],
          [0.2, 0.2, 1, 0.2, 0.2]
        );
      }

      if (isVertical.value && newHeight <= height) {
        const destY = translationY + velocityY * 0.2;
        shouldClose.value = disableSwipeUp ? destY > 220 : Math.abs(destY) > 220;
      }
    })
    .onEnd(({ velocityX, velocityY }) => {
      'worklet';
      if (!isActive.value) return;

      const newHeight = scale.value * layout.y.value;

      const edgeX = getEdgeX();

      if (
        Math.abs(translateX.value - getPosition()) >= 0 &&
        edgeX.some(x => x === translation.x.value + offset.x.value)
      ) {
        let snapPoints = [index - 1, index, index + 1]
          .filter((_, y) => {
            if (loop) return true;

            if (y === 0) {
              return !isFirst;
            }
            if (y === 2) {
              return !isLast;
            }

            return true;
          })
          .map(i => getPosition(i));

        if (disableTransitionOnScaledImage && scale.value > 1) {
          snapPoints = [getPosition(index)];
        }

        let snapTo = snapPoint(translateX.value, velocityX, snapPoints);

        const nextIndex = getIndexFromPosition(snapTo);

        if (currentIndex.value !== nextIndex) {
          if (loop) {
            if (nextIndex === length) {
              currentIndex.value = 0;
              translateX.value = translateX.value - getPosition(length);
              snapTo = 0;
            } else if (nextIndex === -1) {
              currentIndex.value = length - 1;
              translateX.value = translateX.value + getPosition(length);
              snapTo = getPosition(length - 1);
            } else {
              currentIndex.value = nextIndex;
            }
          } else {
            runOnJS(onChangeIndexFromRoute!)?.(nextIndex);
            currentIndex.value = nextIndex;
          }
        }

        translateX.value = withSpring(snapTo, {
          damping: 800,
          mass: 1,
          stiffness: 250,
          restDisplacementThreshold: 0.02,
          restSpeedThreshold: 4,
        });
      } else {
        const newWidth = scale.value * layout.x.value;
        offset.x.value = withDecaySpring({
          velocity: velocityX,
          clamp: [
            -(newWidth - screenWidth) / 2 - translation.x.value,
            (newWidth - screenWidth) / 2 - translation.x.value,
          ],
        });
      }

      if (onSwipeToClose && shouldClose.value && scale.value === 1) {
        offset.y.value = withDecay({
          velocity: velocityY,
        });
        resetValuesToClose(() => {
          runOnJS(onSwipeToClose)();
        });

        return;
      }

      if (newHeight > height) {
        offset.y.value = withDecaySpring({
          velocity: velocityY,
          clamp: [-(newHeight - height) / 2 - translation.y.value, (newHeight - height) / 2 - translation.y.value],
        });
      } else {
        triggerAnimation.value = withTiming(1);
        const diffY = translation.y.value + offset.y.value - (newHeight - height) / 2;

        if (newHeight <= height && diffY !== height - diffY - newHeight) {
          const moveTo = diffY - (height - newHeight) / 2;

          translation.y.value = withTiming(translation.y.value - moveTo);
        }
      }
    });

  const pinchGesture = Gesture.Pinch()
    .enabled(pinchEnabled)
    .onStart(({ focalX, focalY }) => {
      'worklet';
      if (!isActive.value) return;
      if (onScaleStart) {
        runOnJS(onScaleStart)();
      }

      onStart();

      scaleOffset.value = scale.value;

      setAdjustedFocal({ focalX, focalY });

      origin.x.value = adjustedFocal.x.value;
      origin.y.value = adjustedFocal.y.value;
    })
    .onUpdate(({ scale: s, focalX, focalY, numberOfPointers }) => {
      'worklet';
      if (!isActive.value) return;
      if (numberOfPointers !== 2) return;

      const nextScale = withRubberBandClamp(s * scaleOffset.value, 0.55, maxScale, [1, maxScale]);

      scale.value = nextScale;

      setAdjustedFocal({ focalX, focalY });

      translation.x.value = adjustedFocal.x.value + ((-1 * nextScale) / scaleOffset.value) * origin.x.value;
      translation.y.value = adjustedFocal.y.value + ((-1 * nextScale) / scaleOffset.value) * origin.y.value;
    })
    .onEnd(() => {
      'worklet';
      if (!isActive.value) return;

      if (scale.value < 1) {
        resetValues();

        return;
      }
      const sc = Math.min(scale.value, maxScale);

      const newWidth = sc * layout.x.value;
      const newHeight = sc * layout.y.value;

      const nextTransX =
        scale.value > maxScale
          ? adjustedFocal.x.value + ((-1 * maxScale) / scaleOffset.value) * origin.x.value
          : translation.x.value;

      const nextTransY =
        scale.value > maxScale
          ? adjustedFocal.y.value + ((-1 * maxScale) / scaleOffset.value) * origin.y.value
          : translation.y.value;

      const diffX = nextTransX + offset.x.value - (newWidth - screenWidth) / 2;

      if (scale.value > maxScale) {
        scale.value = withTiming(maxScale);
      }

      if (newWidth <= screenWidth) {
        translation.x.value = withTiming(0);
      } else {
        let _moved;
        if (diffX > 0) {
          translation.x.value = withTiming(nextTransX - diffX);
          _moved = true;
        }

        if (newWidth + diffX < screenWidth) {
          translation.x.value = withTiming(nextTransX + screenWidth - (newWidth + diffX));
          _moved = true;
        }
        if (!_moved) {
          translation.x.value = withTiming(nextTransX);
        }
      }

      const diffY = nextTransY + offset.y.value - (newHeight - height) / 2;

      if (newHeight <= height) {
        translation.y.value = withTiming(-offset.y.value);

        return;
      }

      let moved;
      if (diffY > 0) {
        translation.y.value = withTiming(nextTransY - diffY);
        moved = true;
      }

      if (newHeight + diffY < height) {
        translation.y.value = withTiming(nextTransY + height - (newHeight + diffY));
        moved = true;
      }
      if (!moved) {
        translation.y.value = withTiming(nextTransY);
      }
    });

  const tapGesture = Gesture.Tap()
    .numberOfTaps(1)
    .maxDistance(10)
    .onEnd(() => {
      'worklet';
      if (!isActive.value) return;
      if (onTap) {
        runOnJS(onTap)();
      }
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDelay(doubleTapInterval)
    .onEnd(({ x, y, numberOfPointers }) => {
      'worklet';
      if (!isActive.value) return;
      if (numberOfPointers !== 1) return;
      if (onDoubleTap) {
        runOnJS(onDoubleTap)();
      }

      if (scale.value === 1) {
        scale.value = withTiming(doubleTapScale);

        setAdjustedFocal({ focalX: x, focalY: y });

        offset.x.value = withTiming(
          clampX(adjustedFocal.x.value + -1 * doubleTapScale * adjustedFocal.x.value, doubleTapScale)
        );
        offset.y.value = withTiming(
          clampY(adjustedFocal.y.value + -1 * doubleTapScale * adjustedFocal.y.value, doubleTapScale)
        );

        return;
      }

      resetValues();
    });

  const handlers = useHandlers({
    SET_IMAGE_DIMENSIONS: ({ width: w, height: h }: Dimensions) => {
      originalLayout.x.value = w;
      originalLayout.y.value = h;

      const portrait = screenWidth > height;

      if (portrait) {
        const imageHeight = Math.min((h * screenWidth) / w, height);
        const imageWidth = Math.min(w, screenWidth);
        layout.y.value = imageHeight;
        layout.x.value = imageHeight === height ? (w * height) / h : imageWidth;
      } else {
        const imageWidth = Math.min((w * height) / h, screenWidth);
        const imageHeight = Math.min(h, height);
        layout.x.value = imageWidth;
        layout.y.value = imageWidth === screenWidth ? (h * screenWidth) / w : imageHeight;
      }
    },
  });

  const itemProps: RenderItemInfo<IImage & { uri?: string }> = useMemo(
    () => ({
      item,
      index,
      setImageDimensions: handlers.SET_IMAGE_DIMENSIONS,
    }),
    [item, index]
  );

  return {
    state,
    handlers,
    itemProps,
    animatedStyle,
    panGesture,
    pinchGesture,
    tapGesture,
    doubleTapGesture,
  };
};

export { useResizableImageLogic };
