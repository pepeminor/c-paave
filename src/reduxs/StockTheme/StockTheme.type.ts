import { ThemeData, ThemeRatioDetailItem } from 'interfaces/stockTheme';

export type ThemeMapItem = ThemeData & {
  stockList?: string[];
};

export type ThemeState = {
  themeMap: {
    [themeName: string]: ThemeMapItem;
  };
  themeOfStock: {
    [stockName: string]: ThemeMapItem[];
  };
};
export const ThemePeriod = {
  '1D': '1-Day',
  '3D': '3-Day',
  '1W': '1-Week',
};
export type ThemePeriod = keyof typeof ThemePeriod;

export type StockThemeState = {
  lastUpdateTime: string;
  period: ThemePeriod;
  themeRatio: {
    [themeCode: string]: ThemeRatioDetailItem[];
  };
  themeAvgRatio: {
    [themeCode: string]: {
      avgPE: number;
      avgPB: number;
    };
  };
} & {
  [period in ThemePeriod]: ThemeState;
};

export type ThemeDetailFulfilledPayload = {
  themeName: string;
  themeList: string[];
};

export type WithThemePeriod<T> = {
  period: ThemePeriod;
  data: T;
};
