import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import ModalBottom from 'components/ModalBottom';
import WebView from 'react-native-webview';
import { lightColors } from 'styles';
import { useAppSelector } from 'hooks';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';

interface IProps {
  isVisible: boolean;
  onCloseModal: () => void;
  videoId: string;
  title: string;
}

const ModalWatchVideo = (props: IProps) => {
  const { styles } = useStyles();
  const lang = useAppSelector(state => state.lang);

  useEffect(() => {
    track(AMPLITUDE_EVENT.VIEW_VIDEOS, {
      title: props.title,
      videoId: props.videoId,
    });
  }, []);

  const playerLang = lang === 'vi' ? 'vi' : 'en';
  return (
    <ModalBottom visible={props.isVisible} setVisible={props.onCloseModal} underlayStyle={styles.underlayStyle}>
      <View style={styles.containerModal}>
        <View style={styles.containerWebView}>
          <WebView
            source={{
              uri: `https://www.youtube.com/embed/${props.videoId}?hl=${playerLang}&cc_load_policy=1&&cc_lang_pref=${playerLang}&autoplay=1&controls=1&fullscreen=1`,
            }}
            allowsFullscreenVideo={true}
            javaScriptEnabled={true}
            startInLoadingState={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={Platform.OS !== 'android' || Platform.Version >= 17 ? false : undefined}
            // disable fullscreen IOS and Android
            // userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
          />
        </View>
      </View>
    </ModalBottom>
  );
};

const useStyles = getStylesHook({
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
  underlayStyle: {
    backgroundColor: lightColors.BACKGROUND_MODAL2,
  },
});

export default withMemo(ModalWatchVideo);
