import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import React from 'react';
import { useStyles } from './styles';
import { useAppSelector } from 'hooks';
import { ImageItem } from './ImageItem';
import withMemo from 'HOC/withMemo';

interface IProps {
  showFullSize?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

export const Images = withMemo((props: IProps) => {
  const { styles } = useStyles();

  const images = useAppSelector(state => state.SocialNewPost.images);

  if (images == null) return null;
  if (images.length === 1)
    return (
      <View style={[styles.container, props.style]}>
        <ImageItem containerStyle={props.containerStyle} showFullSize={props.showFullSize ?? true} asset={images[0]} />
      </View>
    );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.scrollViewContainer, props.style]}
    >
      {images?.map((item, index) => {
        return <ImageItem containerStyle={props.containerStyle} key={index} asset={item} />;
      })}
    </ScrollView>
  );
});
