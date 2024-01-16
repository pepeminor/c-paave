import React from 'react';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import globalStyles, { scaleSize } from 'styles';

type FakeImageType = {
  url: string;
};

const AdsBanner = () => {
  const renderItem = (item: { item: FakeImageType; index: number }) => {
    return (
      <TouchableOpacity
        key={item.index}
        style={[globalStyles.fillHeight, globalStyles.fillWidth]}
        // onPress={() => {
        // }}
      >
        <FastImage
          style={[globalStyles.fillHeight, globalStyles.fillWidth, { borderRadius: 20 }]}
          resizeMode="stretch"
          source={require('assets/AdsBannerImage1.jpg')}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Carousel
      data={[
        {
          url: 'https://previews.123rf.com/images/artshock/artshock1209/artshock120900045/15221647-imag-of-heart-in-the-blue-sky-against-a-background-of-white-clouds-.jpg',
        },
      ]}
      renderItem={renderItem}
      sliderWidth={scaleSize(343)}
      itemWidth={scaleSize(343)}
      loop
      enableSnap
      autoplay
      autoplayDelay={1000}
    />
  );
};

export default AdsBanner;
