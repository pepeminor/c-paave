import React, { memo, useEffect } from 'react';
import { Platform, SafeAreaView, TouchableOpacity, View } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import { WebView } from 'react-native-webview';
import { StackScreenProps } from 'screens/RootNavigation';
import BackIcon from 'assets/icon/BackIcon.svg';
import useStyles from './styles';
import { IState } from 'reduxs/global-reducers';
import { connect } from 'react-redux';
import { LANG } from 'global';
import config from 'config';
import Orientation from 'react-native-orientation-locker';

export interface ITradingViewProps extends StackScreenProps<'TradingView'> {
  lang: LANG;
}

// https://github.com/tradingview/charting-library-examples/tree/master/react-native
const Chart = (props: ITradingViewProps) => {
  // const jsToInject = `
  // true;
  // `;
  const { styles } = useStyles();
  useEffect(() => {
    Orientation.lockToLandscapeLeft();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  const url = `${config.tradingViewUrl ?? 'file:///android_asset/tradingview/index.html'}?symbol=${
    (props.route.params! as any).s ?? 'VIC'
  }&lang=${props.lang || LANG.EN}&tv__theme=Light`;
  // const url = 'http://192.168.1.26:8000/assets/tradingview/index.html?symbol=VIC&lang=en&tv__theme=Light&debug=true';
  // const log = (...e: any[]) => console.log('webview log', ...e);
  const log = () => true;
  if (Platform.OS === 'android') {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={props.navigation.goBack} style={styles.backButtonAndroid} activeOpacity={0.5}>
          <BackIcon height={scaleSize(24)} width={scaleSize(24)} />
        </TouchableOpacity>
        <WebView
          style={globalStyles.container}
          source={{ uri: url }}
          allowFileAccessFromFileURLs={true}
          domStorageEnabled={true}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          originWhitelist={['*']}
          onShouldStartLoadWithRequest={() => false}
          // injectedJavaScript={jsToInject}
          onMessage={log}
          onError={log}
          onHttpError={log}
          onLoad={log}
        />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={globalStyles.container}>
        <TouchableOpacity onPress={props.navigation.goBack} style={styles.backButtonIos} activeOpacity={0.5}>
          <BackIcon height={scaleSize(24)} width={scaleSize(24)} />
        </TouchableOpacity>
        <WebView
          style={globalStyles.container}
          source={{ uri: url }}
          allowFileAccessFromFileURLs={true}
          originWhitelist={['*']}
          // injectedJavaScript={jsToInject}
          onMessage={log}
          onError={log}
          onHttpError={log}
          onLoad={log}
        />
      </SafeAreaView>
    );
  }
};

const mapStateToProps = (state: IState) => ({
  lang: state.lang,
});

export default memo(connect(mapStateToProps, {})(Chart));
