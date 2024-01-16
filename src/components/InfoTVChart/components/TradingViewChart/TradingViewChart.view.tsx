import React, { forwardRef, useMemo } from 'react';
import { PanResponder, Platform, View } from 'react-native';
import { WebView } from 'react-native-webview';
import useStyles from './TradingViewChart.style';
import withMemo from 'HOC/withMemo';
import { ITradingViewChartProps } from './TradingViewChart.type';
import { androidDefaultWebViewProps, originWhitelist } from './TradingViewChart.data';
import useTradingViewChartLogic from './TradingViewChart.logic';
import { getUrl } from './TradingViewChart.helper';

// https://github.com/tradingview/charting-library-examples/tree/master/react-native
const TradingViewChartView = forwardRef((props: ITradingViewChartProps, ref) => {
  const { styles } = useStyles();
  const { webViewRef } = useTradingViewChartLogic(props, ref);
  const uri = useMemo(() => getUrl(props), [props]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderTerminationRequest: () => true,
      }),
    []
  );

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        style={styles.webviewStyle}
        source={{ uri }}
        allowFileAccessFromFileURLs={true}
        originWhitelist={originWhitelist}
        javaScriptEnabled
        onMessage={props.onMessage}
        {...(Platform.OS === 'android' ? androidDefaultWebViewProps : undefined)}
        {...panResponder.panHandlers}
      />
      {props.enabledInteract ? null : <View style={styles.disableInteractBlock} />}
    </View>
  );
});

export default withMemo(TradingViewChartView);
