import { useImperativeHandle, useRef } from 'react';
import { ITradingViewChartProps } from './TradingViewChart.type';
import WebView from 'react-native-webview';
import useStyles from './TradingViewChart.style';

const useTradingViewChartLogic = (props: ITradingViewChartProps, ref: React.ForwardedRef<unknown>) => {
  const { styles } = useStyles();
  const webViewRef = useRef<WebView>(null);

  const propsRef = useRef(props);
  propsRef.current = { ...propsRef.current, ...props };

  useImperativeHandle(ref, () => webViewRef.current);

  return {
    styles,
    webViewRef,
  };
};

export default useTradingViewChartLogic;
