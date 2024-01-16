import { View, TouchableOpacity, Platform, Text, ViewStyle } from 'react-native';
import React, { useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import { IState } from 'reduxs/global-reducers';
import { useDispatch, useSelector } from 'react-redux';
import { ACCOUNT_TYPE, LANG } from 'global';
// import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Swiper from 'react-native-swiper';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { navigate } from 'utils';
import { GET_BANNER_LIST } from 'reduxs/actions';
import { BannerListItem } from 'interfaces/File';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import withMemo from 'HOC/withMemo';
import { getPathUrlDeepLink } from 'screens/RootNavigation/DeepLink';
import { AuthType } from 'constants/AuthType';

interface IProps {
  containerStyle?: ViewStyle;
  showTitle?: boolean;
}

const LoginBanner = (props: IProps) => {
  const dispatch = useDispatch();

  const selectedLanguage = useSelector((state: IState) => state.lang);
  const kisClientID = useSelector((state: IState) => state.accountList['KIS']?.username);
  const userEmail = useSelector((state: IState) => state.loginData?.userInfo?.email);
  const selectedAccountType = useSelector((state: IState) => state.selectedAccount.type);
  const banners = useSelector((state: IState) => state.banners);
  const isLogin = useSelector((state: IState) => state.authToken.accessToken);
  const { styles } = useStyles();
  const today = new Date().getTime();

  useEffect(() => {
    dispatch({ type: GET_BANNER_LIST });
  }, []);

  const bannerList =
    banners != null
      ? (selectedLanguage === LANG.VI ? banners.bannersVi : banners.bannersEn)
          .filter((item: BannerListItem) => kisClientID == null || !item.isBannerEkycKis)
          .sort((item1: BannerListItem, item2: BannerListItem) => item1.order - item2.order)
          .filter(
            (item: BannerListItem) =>
              new Date(item.period.startDate).getTime() <= today && new Date(item.period.endDate).getTime() >= today
          )
      : [];

  const onPressBanner = (image: BannerListItem) => () => {
    track(AMPLITUDE_EVENT.CLICK_BANNER, {
      image: image.image,
      order: image.order,
      link: image.link,
      isBannerEkycKis: image.isBannerEkycKis,
    });
    if (image.link) {
      getPathUrlDeepLink(image.link, !!isLogin, dispatch);
    } else if (image.screenName) {
      if (image.isBannerEkycKis) {
        selectedAccountType !== ACCOUNT_TYPE.DEMO
          ? navigate({
              key: image.screenName as ScreenNames,
              params: { sec: AuthType.KIS, email: userEmail },
            })
          : navigate({ key: 'KisEKYCVerifyEmail', params: { sec: AuthType.KIS } });
        return;
      }
      navigate({
        key: image.screenName as ScreenNames,
        params: image.params || {},
      });
    }
  };

  const bannerTitle = selectedLanguage === LANG.VI ? banners?.bannerTitleVi : banners?.bannerTitleEn ?? '';

  return (
    <View style={props.containerStyle}>
      {!!props.showTitle && bannerTitle !== '' && (
        <View style={globalStyles.justifyCenter}>
          <Text allowFontScaling={false} style={styles.bannerText}>
            {bannerTitle}
          </Text>
        </View>
      )}
      <Swiper
        key={bannerList.length}
        autoplay={true}
        loop={true}
        removeClippedSubviews={false}
        autoplayTimeout={banners?.scrollTime || 5}
        width={scaleSize(343)}
        height={scaleSize(110)}
        dot={<View style={styles.Dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={styles.paginationStyle}
        pagingEnabled={true}
      >
        {bannerList.map((image: BannerListItem, index: number) => (
          <TouchableOpacity key={index} onPress={onPressBanner(image)} style={[styles.ImageContainer]}>
            <FastImage
              style={[globalStyles.container2, styles.FastImageContainer]}
              resizeMode={Platform.OS === 'ios' ? 'contain' : 'stretch'}
              source={{ uri: image.image }}
            />
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  );
};

export default withMemo(LoginBanner);
