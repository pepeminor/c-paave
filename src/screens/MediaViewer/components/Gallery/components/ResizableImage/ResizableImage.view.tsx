import React from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useResizableImageLogic } from './ResizableImage.logic';
import { IProps } from './ResizableImage.type';
import withMemo from 'HOC/withMemo';

const ResizableImage = (props: IProps) => {
  const { height, width, renderItem } = props;
  const { itemProps, animatedStyle, panGesture, pinchGesture, tapGesture, doubleTapGesture } =
    useResizableImageLogic(props);

  return (
    <GestureDetector
      gesture={Gesture.Race(Gesture.Race(panGesture, pinchGesture), Gesture.Exclusive(doubleTapGesture, tapGesture))}
    >
      <View
        style={{
          width,
          height,
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={[
            {
              width,
              height,
            },
            animatedStyle,
          ]}
        >
          {renderItem(itemProps)}
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

export default withMemo(ResizableImage);
