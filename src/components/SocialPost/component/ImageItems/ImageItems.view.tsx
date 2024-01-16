import React from 'react';
import { View } from 'react-native';
import { useImageItemsLogic } from './ImageItems.logic';
import useStyles from './ImageItems.style';
import { IProps } from './ImageItems.type';
import withMemo from 'HOC/withMemo';
import ImageItem from './components/ImageItem';
import { insertObjectIf } from 'utils';

const ImageItems = (props: IProps) => {
  const { animatedValue, selectedIndex, handlers, imageListRef } = useImageItemsLogic(props);
  const { styles } = useStyles();
  const countImage = props.imageList.length;
  const { imageList } = props;

  if (countImage === 0) return null;

  if (countImage === 1) {
    const { width, height } = imageList[0].meta.original;
    return (
      <View style={styles.container}>
        <ImageItem
          ref={ref => {
            if (!ref) return;
            imageListRef.current[0] = ref;
          }}
          index={0}
          animatedValue={animatedValue}
          selectedIndex={selectedIndex}
          onPress={handlers.onPressImage}
          styleImage={[styles.image, insertObjectIf(width > height, { aspectRatio: width / height })]}
          image={imageList[0]}
          resizeMode={props.resizeMode}
        />
      </View>
    );
  }

  if (countImage === 2) {
    return (
      <View style={styles.containerLayout2}>
        <ImageItem
          index={0}
          ref={ref => {
            if (!ref) return;
            imageListRef.current[0] = ref;
          }}
          animatedValue={animatedValue}
          selectedIndex={selectedIndex}
          onPress={handlers.onPressImage}
          styleImage={styles.imageLayout2Left}
          containerStyle={styles.containerImageLayout2}
          image={imageList[0]}
          resizeMode={props.resizeMode}
        />
        <ImageItem
          index={1}
          ref={ref => {
            if (!ref) return;
            imageListRef.current[1] = ref;
          }}
          animatedValue={animatedValue}
          selectedIndex={selectedIndex}
          onPress={handlers.onPressImage}
          styleImage={styles.imageLayout2Right}
          containerStyle={styles.containerImageLayout2Right}
          image={imageList[1]}
          resizeMode={props.resizeMode}
        />
      </View>
    );
  }

  if (countImage === 3) {
    return (
      <View style={styles.containerLayout2}>
        <ImageItem
          index={0}
          ref={ref => {
            if (!ref) return;
            imageListRef.current[0] = ref;
          }}
          animatedValue={animatedValue}
          selectedIndex={selectedIndex}
          onPress={handlers.onPressImage}
          styleImage={styles.imageLayout3Left}
          containerStyle={styles.containerImageLayout2}
          image={imageList[0]}
          resizeMode={props.resizeMode}
        />
        <View style={styles.containerLayout3Right}>
          <ImageItem
            index={1}
            ref={ref => {
              if (!ref) return;
              imageListRef.current[1] = ref;
            }}
            animatedValue={animatedValue}
            selectedIndex={selectedIndex}
            onPress={handlers.onPressImage}
            styleImage={styles.imageLayout3Right}
            containerStyle={styles.containerImageLayout3Top}
            image={imageList[1]}
            resizeMode={props.resizeMode}
          />
          <ImageItem
            index={2}
            ref={ref => {
              if (!ref) return;
              imageListRef.current[2] = ref;
            }}
            animatedValue={animatedValue}
            selectedIndex={selectedIndex}
            onPress={handlers.onPressImage}
            styleImage={styles.imageLayout3RightBottom}
            containerStyle={styles.containerImageLayout3Bottom}
            image={imageList[2]}
            resizeMode={props.resizeMode}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.containerLayout2}>
      <View style={styles.containerLayout3Left}>
        <ImageItem
          index={0}
          ref={ref => {
            if (!ref) return;
            imageListRef.current[0] = ref;
          }}
          animatedValue={animatedValue}
          selectedIndex={selectedIndex}
          onPress={handlers.onPressImage}
          styleImage={styles.imageLayout4Left}
          containerStyle={styles.containerImageLayout4Left}
          image={imageList[0]}
          resizeMode={props.resizeMode}
        />
        <ImageItem
          index={1}
          ref={ref => {
            if (!ref) return;
            imageListRef.current[1] = ref;
          }}
          animatedValue={animatedValue}
          selectedIndex={selectedIndex}
          onPress={handlers.onPressImage}
          styleImage={styles.imageLayout4LeftBottom}
          containerStyle={styles.containerImageLayout4LeftBottom}
          image={imageList[1]}
          resizeMode={props.resizeMode}
        />
      </View>
      <View style={styles.containerLayout3Right}>
        <ImageItem
          index={2}
          ref={ref => {
            if (!ref) return;
            imageListRef.current[2] = ref;
          }}
          animatedValue={animatedValue}
          selectedIndex={selectedIndex}
          onPress={handlers.onPressImage}
          styleImage={styles.imageLayout3Right}
          containerStyle={styles.containerImageLayout3Top}
          image={imageList[2]}
          resizeMode={props.resizeMode}
        />
        <ImageItem
          index={3}
          ref={ref => {
            if (!ref) return;
            imageListRef.current[3] = ref;
          }}
          animatedValue={animatedValue}
          selectedIndex={selectedIndex}
          onPress={handlers.onPressImage}
          styleImage={styles.imageLayout3RightBottom}
          containerStyle={styles.containerImageLayout3Bottom}
          image={imageList[3]}
          resizeMode={props.resizeMode}
        />
      </View>
    </View>
  );
};

export default withMemo(ImageItems);
