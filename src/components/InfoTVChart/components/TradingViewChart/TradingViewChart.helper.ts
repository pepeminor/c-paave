import { LANG } from 'global';
import {
  ActionType,
  IChangeTimeFrameAction,
  ITradingViewChartParams,
  ITradingViewChartProps,
} from './TradingViewChart.type';
import config from 'config';

export const getChangeTimeFrame = (data: IChangeTimeFrameAction) => ({
  type: ActionType.CHANGE_TIME_FRAME,
  data,
});

export const getUrl = (option: ITradingViewChartProps) => {
  try {
    let url = `${config.tradingViewUrl || 'file:///android_asset/tradingview/index.html'}`;
    const params: ITradingViewChartParams = {
      mode: 'compact',
      symbol: option.s,
      lang: option.lang || LANG.EN,
      tv__theme: 'Light',
      tv__timeFrame: option.timeframe,
      tv__interval: option.resolution,
      widgetName: config.widgetName,
      tvft__chart_zoom: 1,
      tvft__timeframes_toolbar: 0,
      tvft__disable_resolution_rebuild: 0,
      nomeaning: option.refreshVersion,
    };

    if (Object.keys(params).length) {
      url += '?';
      const arrParam = Object.keys(params);

      arrParam.forEach((key, idx) => {
        const value = params[key];
        if (value != null && value !== '') {
          url += `${key}=${encodeURIComponent(value)}${idx < arrParam.length - 1 ? '&' : ''}`;
        }
      });
    }

    return url;
  } catch (e) {
    return '';
  }
};
