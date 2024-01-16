import { ThemePeriod } from 'reduxs';

// Theme List API

export type ThemeListParams = {
  symbol?: string;
  sortBy?: 'name' | 'rate'; // Default 'rate'
  sortAsc?: boolean; // Default true
  period?: ThemePeriod; // Default 1D
};

export type ThemeData = {
  themeName: string;
  themeCode: string;
  themeChangeRate: number;
  noOfIncreases: number;
  noOfDecreases: number;
  noOfUnchanges: number;
  updatedDate: string; // 20230802075900
  stockData?: {
    [s: string]:
      | {
          rate: number;
        }
      | undefined;
  };
};

export type ThemeListResponse = {
  themeData: ThemeData[];
};

// Theme List Detail API

export type ThemeListDetailResponse = {
  themeStockList: string[];
};

export type ThemeDetailParams = {
  themeCode: string;
  themeName: string;
  period?: ThemePeriod; // Default 1D
  sortBy?: 'name' | 'rate'; // Default 'rate'
  sortAsc?: boolean; // Default true
};

// Theme Ratio Detail API

export type ThemeRatioDetailParams = {
  themeCode: string;
  themeName: string;
  period?: ThemePeriod; // Default 1D
  sortBy?: 'price';
  sortAsc?: boolean;
};

export type ThemeRatioDetailResponse = {
  themeStockList: ThemeRatioDetailItem[];
  avgPE: number;
  avgPB: number;
};

export type ThemeRatioDetailItem = {
  code: string;
  pe: number;
  pb: number;
  r?: number;
};
