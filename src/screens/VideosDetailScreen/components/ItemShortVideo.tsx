import React, { useCallback } from 'react';
import { Image, Platform, View } from 'react-native';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import { IVideoItem } from 'reduxs';
import { lightColors, scaleSize } from 'styles';
import WebView from 'react-native-webview';
import { useAppSelector } from 'hooks';
import PaaveText from 'components/PaaveText';
import PLayVideo from 'assets/icon/PlayVideo.svg';
import { TEXT_TYPE } from 'components/PaaveText/type';
import TouchableScale from 'components/TouchableScale';
import { HitSlop } from 'constants/enum';
import ModalWatchVideo from 'screens/Discover/Videos/components/ModalWatchVideo';
import { IS_ANDROID } from 'constants/main';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';

interface IProps {
  item: IVideoItem;
}

const ItemShortVideo = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const lang = useAppSelector(state => state.lang);

  const playerLang = lang === 'vi' ? 'vi' : 'en';
  const { item } = props;

  const onPressPlay = useCallback(() => {
    if (IS_ANDROID) {
      setIsVisible(true);
      return;
    }
    track(AMPLITUDE_EVENT.VIEW_VIDEOS, {
      title: item.snippet.title,
      videoId: item.contentDetails.videoId,
    });
    setIsPlaying(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        {isPlaying && (
          <>
            <WebView
              style={styles.image}
              source={{
                uri: `https://www.youtube.com/embed/${item.contentDetails.videoId}?hl=${playerLang}&cc_load_policy=1&cc_lang_pref=${playerLang}&autoplay=1&controls=1&fs=1`,
              }}
              allowsFullscreenVideo={true}
              startInLoadingState={true}
              javaScriptEnabled={true}
              containerStyle={styles.image}
              playsinline={0}
              mediaPlaybackRequiresUserAction={Platform.OS !== 'android' || Platform.Version >= 17 ? false : undefined}
            />
          </>
        )}
        {!isPlaying && (
          <>
            <Image source={{ uri: item.snippet.thumbnails?.high?.url }} style={styles.image} />
            <View style={styles.containerText}>
              <PaaveText
                type={TEXT_TYPE.BOLD_14}
                style={styles.textTitle}
                color={dynamicColors.WHITE}
                numberOfLines={3}
              >
                {item.snippet.title.split('#')[0] ?? ''}
              </PaaveText>
            </View>
            <TouchableScale style={styles.containerPlayIcon} hitSlop={HitSlop} onPress={onPressPlay}>
              <View style={styles.icon}>
                <PLayVideo fill={dynamicColors.Ask} width={scaleSize(48)} height={scaleSize(48)} />
              </View>
            </TouchableScale>
          </>
        )}
      </View>

      {isVisible && IS_ANDROID && (
        <ModalWatchVideo
          isVisible={isVisible}
          onCloseModal={onCloseModal}
          videoId={item.contentDetails.videoId ?? ''}
          title={item.snippet.title}
        />
      )}
    </View>
  );
};

const useStyles = getStylesHook({
  container: {
    flex: 1,
    padding: 8,
  },
  image: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 12,
  },
  containerText: {
    position: 'absolute',
    width: '100%',
    aspectRatio: 2 / 3,
    top: 0,
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
  },
  textTitle: {
    marginTop: 6,
    backgroundColor: lightColors.BACKGROUND_MODAL2,
    textAlign: 'center',
  },
  containerPlayIcon: {
    position: 'absolute',
    width: '100%',
    aspectRatio: 2 / 3,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: lightColors.BACKGROUND_MODAL3,
    borderRadius: 48,
  },
});

export default withMemo(ItemShortVideo);
