import { useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { SPACE_BETWEEN_IMAGES } from './Gallery.config';
import { GalleryProps, GalleryReactRef, ItemRef } from './Gallery.type';
import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';

export const useGalleryLogic = (props: GalleryProps, ref: GalleryReactRef) => {
  const { data, initialIndex = 0, emptySpaceWidth = SPACE_BETWEEN_IMAGES, containerDimensions, loop = false } = props;

  const initializeState = useMemo(() => ({ index: initialIndex }), [initialIndex]);
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state, setState] = useMergingState(initializeState, propsRef);

  const windowDimensions = useWindowDimensions();
  const dimensions = containerDimensions || windowDimensions;

  const isLoop = useMemo(() => loop && data?.length > 1, [loop, data?.length]);

  const refs = useRef<ItemRef[]>([]);

  const translateX = useSharedValue(initialIndex * -(dimensions.width + emptySpaceWidth));

  const currentIndex = useSharedValue(initialIndex);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  useEffect(() => {
    translateX.value = state.index * -(dimensions.width + emptySpaceWidth);
  }, [windowDimensions, state.index]);

  useImperativeHandle(ref, () => ({
    setIndex(newIndex: number) {
      setState({ index: newIndex });
      currentIndex.value = newIndex;
      translateX.value = newIndex * -(dimensions.width + emptySpaceWidth);
    },
    reset(animated = false) {
      refs.current?.forEach(itemRef => itemRef.reset(animated));
    },
  }));

  useEffect(() => {
    if (state.index < data.length) return;

    const newIndex = data.length - 1;
    handlers.CHANGE_INDEX(newIndex);
    currentIndex.value = newIndex;
    translateX.value = newIndex * -(dimensions.width + emptySpaceWidth);
  }, [data?.length]);

  const handlers = useHandlers({
    SET_REF: ({ index, value }: { index: number; value: ItemRef }) => {
      refs.current[index] = value;
    },
    CHANGE_INDEX: (newIndex: number) => {
      const { onIndexChange } = propsRef.current;
      onIndexChange?.(newIndex);
      // setState({ index: newIndex })
    },
  });

  useAnimatedReaction(
    () => currentIndex.value,
    newIndex => runOnJS(handlers?.CHANGE_INDEX)(newIndex),
    [currentIndex]
  );

  return {
    isLoop,
    state,
    handlers,
    animatedStyle,
    dimensions,
    translateX,
    currentIndex,
  };
};
