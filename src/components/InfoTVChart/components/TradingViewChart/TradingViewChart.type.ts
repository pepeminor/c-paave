import { LANG } from 'global';
import { RefObject } from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { Subscriable } from 'utils';

export enum ActionType {
  CHANGE_TIME_FRAME,
}

export interface ITradingViewChartProps {
  lang: LANG;
  s: string;
  timeframe: string;
  resolution: string;
  enabledInteract: boolean;

  refreshVersion?: number;
  subscribable?: Subscriable<IAction<any>>;
  ref?: RefObject<WebView<{}>>;
  onMessage?: (event: WebViewMessageEvent) => void;
}

export interface IChangeTimeFrameAction {
  resolution: string;
  visibleRange: {
    from: number; // time in seconds
    to: number; // time in seconds
  };
}

export interface IAction<T> {
  type: ActionType;
  data: T;
}

export interface ITradingViewChartParams {
  [s: string]: string | number | boolean | undefined;
}
