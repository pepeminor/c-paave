import { BaseBottomModalProps } from 'components/BottomModal';
import { IChartOptions } from 'components/InfoTVChart/InfoTVChart.type';
import WebView from 'react-native-webview';

export interface IIndicatorModalProps extends BaseBottomModalProps {
  webViewRef: React.RefObject<WebView>;
  chartOptions: IChartOptions[];
}

export interface IIndicatorSelectionItem {
  label: string;
  name: string;
  symbolicColor?: string;
  activeMessage: string;
}

export interface IGenerateJSParams {
  name: string;
  forceOverlay?: boolean;
  lock?: boolean;
  inputs?: Array<string | number>;
  callBackName?: string;
  overrides?: { [key: string]: string | number };
  options?: { [s: string]: string };
}
