import React, { useCallback } from 'react';
import { Image, Platform, View } from 'react-native';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import { IVideoItem } from 'reduxs';
import { lightColors, scaleSize } from 'styles';
import WebView from 'react-native-webview';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import moment from 'moment';
import { useAppSelector } from 'hooks';
import TouchableScale from 'components/TouchableScale';
import PLayVideo from 'assets/icon/PlayVideo.svg';
import { HitSlop } from 'constants/enum';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
interface IProps {
  item: IVideoItem;
}

const ItemVideo = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const [isPlaying, setIsPlaying] = React.useState(false);

  const lang = useAppSelector(state => state.lang);

  const playerLang = lang === 'vi' ? 'vi' : 'en';

  const { item } = props;

  const onPressPlay = useCallback(() => {
    track(AMPLITUDE_EVENT.VIEW_VIDEOS, {
      title: item.snippet.title,
      videoId: item.contentDetails.videoId,
    });
    setIsPlaying(true);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        {isPlaying && (
          <>
            <WebView
              source={{
                uri: `https://www.youtube.com/embed/${item.contentDetails.videoId}?hl=${playerLang}&cc_load_policy=1&cc_lang_pref=${playerLang}&autoplay=1&controls=1&fullscreen=1`,
              }}
              allowsFullscreenVideo={true}
              startInLoadingState={true}
              javaScriptEnabled={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={Platform.OS !== 'android' || Platform.Version >= 17 ? false : undefined}
              // userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
            />
          </>
        )}

        {!isPlaying && (
          <>
            <Image source={{ uri: item.snippet.thumbnails.high.url }} style={styles.image} />

            <TouchableScale style={styles.containerPlayIcon} hitSlop={HitSlop} onPress={onPressPlay}>
              <View style={styles.icon}>
                <PLayVideo fill={dynamicColors.Ask} width={scaleSize(48)} height={scaleSize(48)} />
              </View>
            </TouchableScale>
          </>
        )}
      </View>
      <PaaveText type={TEXT_TYPE.BOLD_14} style={styles.textTitle} color={dynamicColors.BlueNewColor} numberOfLines={3}>
        {item.snippet.title ?? ''}
      </PaaveText>
      <PaaveText style={styles.chanelName} type={TEXT_TYPE.REGULAR_12} color={dynamicColors.LIGHTTextDisable}>
        {`${item.snippet.videoOwnerChannelTitle} - ${moment(item.contentDetails.videoPublishedAt).format(
          'DD/MM/YYYY'
        )}`}
      </PaaveText>
    </View>
  );
};

const useStyles = getStylesHook({
  container: {
    width: '100%',
    marginTop: 20,
  },
  containerModal: {
    height: 350,
    paddingTop: 50,
    alignItems: 'center',
  },
  containerWebView: {
    paddingTop: 8,
    width: '100%',
    aspectRatio: 16 / 9,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  playIcon: {
    width: 30,
    aspectRatio: 1,
    position: 'absolute',
    top: 80,
    left: 20,
  },
  textTitle: {
    flex: 1,
    marginTop: 6,
    marginLeft: 16,
  },
  chanelName: {
    marginLeft: 16,
    marginTop: 6,
  },
  containerPlayIcon: {
    position: 'absolute',
    width: '100%',
    aspectRatio: 16 / 9,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: lightColors.BACKGROUND_MODAL3,
    borderRadius: 48,
  },
});

export default withMemo(ItemVideo);
