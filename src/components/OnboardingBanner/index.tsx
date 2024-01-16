import { Image, View } from 'react-native';
import React, { memo } from 'react';
import { scaleSize, heightDP, isPlatformIOs } from 'styles';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { LANG } from 'global';
import { IState } from 'reduxs/global-reducers';
import Swiper from 'react-native-swiper';

const BannerSize = {
  height: '100%',
  aspectRatio: 0.67,
};

const IntroductionJson = {
  [LANG.VI]: [
    <Image key={'Introduction_1_vi'} source={require('assets/img/Introduction_1_vi.png')} style={BannerSize} />,
    <Image key={'Introduction_2_vi'} source={require('assets/img/Introduction_2_vi.png')} style={BannerSize} />,

    <Image key={'Introduction_3_vi'} source={require('assets/img/Introduction_3_vi.png')} style={BannerSize} />,
  ],
  [LANG.EN]: [
    <Image key={'Introduction_1_en'} source={require('assets/img/Introduction_1_en.png')} style={BannerSize} />,

    <Image key={'Introduction_2_en'} source={require('assets/img/Introduction_2_en.png')} style={BannerSize} />,

    <Image key={'Introduction_3_en'} source={require('assets/img/Introduction_3_en.png')} style={BannerSize} />,
  ],
  [LANG.KO]: [
    <Image key={'Introduction_1_en'} source={require('assets/img/Introduction_1_en.png')} style={BannerSize} />,

    <Image key={'Introduction_2_en'} source={require('assets/img/Introduction_2_en.png')} style={BannerSize} />,

    <Image key={'Introduction_3_en'} source={require('assets/img/Introduction_3_en.png')} style={BannerSize} />,
  ],
  [LANG.ZH]: [
    <Image key={'Introduction_1_en'} source={require('assets/img/Introduction_1_en.png')} style={BannerSize} />,

    <Image key={'Introduction_2_en'} source={require('assets/img/Introduction_2_en.png')} style={BannerSize} />,

    <Image key={'Introduction_3_en'} source={require('assets/img/Introduction_3_en.png')} style={BannerSize} />,
  ],
};

const OnboardingBanner = () => {
  const lang: LANG = useSelector((state: IState) => state.lang);
  const { styles } = useStyles();

  return (
    <View style={styles.swiperContainer}>
      <Swiper
        autoplay={true}
        loop={true}
        removeClippedSubviews={false}
        autoplayTimeout={5}
        width={scaleSize(370)}
        height={heightDP(isPlatformIOs ? 58 : 60)}
        dot={<View style={styles.Dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={styles.paginationStyle}
        pagingEnabled={true}
        index={0}
      >
        {IntroductionJson[lang].map((image, index) => {
          return (
            <View key={index} style={styles.imageWrapper}>
              {image}
            </View>
          );
        })}
      </Swiper>
    </View>
  );
};

export default memo(OnboardingBanner);
