import { useMemo, useRef } from 'react';
import {
  IChartOptions,
  IInfoTVChartProps,
  IInfoTVChartState,
  IResolution,
  OtherButton,
  OtherButtonValue,
  TVChartFilter,
} from './InfoTVChart.type';
import useMergingState from 'hooks/useMergingState';
// import { useDispatch } from 'react-redux';
import useHandlers from 'hooks/useHandlers';
import { TVChartType } from 'constants/enum';
import { getButtonList, handleHeight } from './InfoTVChart.helper';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { LayoutChangeEvent, View } from 'react-native';
import config from 'config';
import { IconName } from 'components/Icon/type';
import { ResolutionList } from './InfoTVChart.data';

const activeChart = `window['${config.widgetName}'].activeChart()`;

const useInfoTVChart = (props: IInfoTVChartProps) => {
  const initializeState: IInfoTVChartState = useMemo(
    () => ({
      filterSelect: getButtonList(props).find(item => item.value === props.defaultSelected) as TVChartFilter,
      chartOptions: [],
      tradingViewRefreshVersion: 0,
      chartType: TVChartType.Candles,
      indicatorModalVisible: false,
      resolutionDropdownVisible: false,
      resolution: ResolutionList[2],
      componentContainerHeight: 0,
      enabledInteract: false,
    }),
    []
  );
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state, setState] = useMergingState(initializeState, propsRef);

  const webViewRef = useRef<WebView>(null);
  const componentContainerRef = useRef<View>(null);
  const chartContainerHeight = useRef<number>(0);
  const chartContainerRef = useRef<View>(null);
  const { resolution, timeframe } = useMemo(
    () => getButtonList(props).find(item => item.value === props.defaultSelected) as TVChartFilter,
    [props]
  );

  const handlers = useHandlers({
    chartValue: (): { name: string; icon: IconName } => {
      switch (propsRef.current.chartType) {
        case TVChartType.Line:
          return { name: 'Line', icon: 'series-line' };

        case TVChartType.Bars:
          return { name: 'Bars', icon: 'series-ohlc' };

        default:
          return { name: 'Candle Sticks', icon: 'market-chart-candle' };
      }
    },

    onMessage: (event: WebViewMessageEvent) => {
      try {
        const data: IChartOptions = JSON.parse(event.nativeEvent.data);
        const { type, studyName } = data;

        if (studyName === 'Relative Strength Index') {
          componentContainerRef.current?.setNativeProps({
            height: propsRef.current.componentContainerHeight + handleHeight(type),
          });
          chartContainerRef.current?.setNativeProps({ height: chartContainerHeight.current + handleHeight(type) });
        }

        if (type === 'ADD') {
          setState({ chartOptions: [...propsRef.current.chartOptions, data] });
        } else {
          setState({ chartOptions: propsRef.current.chartOptions.filter(item => item.studyName !== studyName) });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        if (__DEV__) console.log('onMessage error:', error);
      }
    },

    onComponentContainerLayout: (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      setState({ componentContainerHeight: height });
    },

    onChartContainerLayout: (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      chartContainerHeight.current = height;
    },

    onPressFilter: (id: TVChartFilter | OtherButton) => {
      if ((id as TVChartFilter).resolution != null) {
        if (webViewRef.current == null) return;

        const button = id as TVChartFilter;
        const { resolution, fromCalculator } = button;

        setState({
          filterSelect: button,
          resolution: ResolutionList.find(item => item.value === resolution) ?? ResolutionList[2],
        });

        const from = fromCalculator[0];
        const to = fromCalculator[1];

        if (from == null || to == null) return;

        const script = `
          function reScale(reSetRange = true) {
            ${activeChart}.setVisibleRange({ from: ${from}, to: ${to} }, () => {
              ${activeChart}.setResolution('${resolution}', () => {
                ${activeChart}.resetData();
              });
              if (reSetRange) {
                ${activeChart}.setVisibleRange({ from: ${from}, to: ${to} }, () => {});
              }
            });
          };

          if (${activeChart}.resolution() === '${resolution}') {
            reScale();
          } else {
            ${activeChart}.setResolution('${resolution}', () => {
              let count = 0;
              ${activeChart}.onDataLoaded().subscribe(null, () => {
                count++;
                reScale(false);
                if (count >= 5) {
                  ${activeChart}.onDataLoaded().unsubscribeAll(null);
                  count = 0;
                }
              });
            });
          }
        `;

        webViewRef.current.injectJavaScript(script);
      } else if (id.value === OtherButtonValue.REFRESH) {
        setState({ ...initializeState, tradingViewRefreshVersion: propsRef.current.tradingViewRefreshVersion + 1 });
      } else {
        const btn = id as OtherButton;
        if (btn.onPress != null) {
          btn.onPress();
        }
      }
    },

    switchChartType: () => {
      switch (propsRef.current.chartType) {
        case TVChartType.Candles: // Candles -> Bars
          webViewRef.current?.injectJavaScript(`${activeChart}.setChartType(${TVChartType.Bars})`);
          setState({ chartType: TVChartType.Bars });
          break;

        case TVChartType.Bars: // Bars -> Line
          webViewRef.current?.injectJavaScript(`${activeChart}.setChartType(${TVChartType.Line})`);
          setState({ chartType: TVChartType.Line });
          break;

        default: // Any -> Candle
          webViewRef.current?.injectJavaScript(`${activeChart}.setChartType(${TVChartType.Candles})`);
          setState({ chartType: TVChartType.Candles });
          break;
      }
    },

    onResolutionChange: (item: IResolution) => {
      webViewRef.current?.injectJavaScript(`${activeChart}.setResolution('${item.value}', () => {});`);
      setState({ resolution: item });
    },

    onIndicatorModalVisible: (visible: boolean) => {
      setState({ indicatorModalVisible: visible });
    },

    onOpenResolutionDropdown: () => {
      setState({ resolutionDropdownVisible: true });
    },

    onCloseResolutionDropdown: () => {
      setState({ resolutionDropdownVisible: false });
    },

    onEnableInteract: () => {
      setState({ enabledInteract: !propsRef.current.enabledInteract });
    },

    onIndicatorModalOpen: () => {
      setState({ indicatorModalVisible: true });
    },

    onIndicatorModalDismiss: () => {
      setState({ indicatorModalVisible: false });
    },
  });

  return {
    state,
    handlers,
    refs: {
      webViewRef,
      componentContainerRef,
      chartContainerHeight,
      chartContainerRef,
    },
    constants: {
      resolution,
      timeframe,
    },
  };
};

export default useInfoTVChart;
