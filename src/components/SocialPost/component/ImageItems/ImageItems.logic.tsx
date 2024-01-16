import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useRef } from 'react';
import { IProps } from './ImageItems.type';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { MeasureData } from 'hooks/useMedia/useShareMediaLayout.hook';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { ImageItemRef } from './components/ImageItem';
import { insertObjectIf } from 'utils';

const initializeState = {};

const useImageItemsLogic = (props: IProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const propsRef = useRef({
    ...props,
    ...initializeState,
    navigation,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state] = useMergingState(initializeState, propsRef);
  const animationSpecShareValue = useSharedValue({} as MeasureData);
  const imageListRef = useRef<ImageItemRef[]>([]);
  const animatedValue = useSharedValue(1);
  const selectedIndex = useSharedValue(0);

  const handlers = useHandlers({
    onPressImage: ({ animationSpec, index }: { animationSpec: MeasureData; index: number }) => {
      const { imageList, navigation } = propsRef.current;
      animationSpecShareValue.value = animationSpec;
      navigation.navigate(ScreenNames.MediaViewer, {
        animationSpec: animationSpecShareValue,
        medias: imageList,
        initialIndex: index,
        ...insertObjectIf(imageList.length > 0, {
          onChangeIndex: (newIndex: number) => {
            selectedIndex.value = newIndex;
            imageListRef.current[newIndex].getMeasureData(newAnimationSpec => {
              animationSpecShareValue.value = newAnimationSpec;
            });
          },
        }),
      });
      selectedIndex.value = index;
      animationSpec.animatedValue.value = withTiming(0);
    },
  });

  return {
    state,
    handlers,
    animatedValue,
    selectedIndex,
    imageListRef,
  };
};

export { useImageItemsLogic };
