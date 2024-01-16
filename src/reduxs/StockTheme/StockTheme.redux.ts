import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  StockThemeState,
  ThemeDetailFulfilledPayload,
  ThemePeriod,
  ThemeState,
  WithThemePeriod,
} from './StockTheme.type';
import * as CustomAction from './StockTheme.action';
import { merge } from 'lodash';
import { IState } from 'reduxs/global-reducers';
import { formatTimeToDisplay } from 'utils';
import { isNilOrEmpty } from 'ramda-adjunct';

const initialState: StockThemeState = {
  lastUpdateTime: '',
  period: '1D',
  themeRatio: {},
  themeAvgRatio: {},
  '1D': {
    themeMap: {},
    themeOfStock: {},
  },
  '3D': {
    themeMap: {},
    themeOfStock: {},
  },
  '1W': {
    themeMap: {},
    themeOfStock: {},
  },
};

const stockThemeSlice = createSlice({
  initialState,
  name: 'StockTheme',
  reducers: {
    updateThemeMap(state, action: PayloadAction<WithThemePeriod<ThemeState['themeMap']>>) {
      const { period, data } = action.payload;
      state[period].themeMap = merge(state[period].themeMap, data);
    },
    updateThemeOfStock(state, action: PayloadAction<WithThemePeriod<ThemeState['themeOfStock']>>) {
      const { period, data } = action.payload;
      state[period].themeOfStock = merge(state[period].themeOfStock, data);
    },
    updateLastUpdateTime(state, action: PayloadAction<string>) {
      state.lastUpdateTime = action.payload;
    },
    updatePeriod(state, action: PayloadAction<StockThemeState['period']>) {
      state.period = action.payload;
    },
    updateThemeRatio(state, action: PayloadAction<StockThemeState['themeRatio']>) {
      state.themeRatio = { ...state.themeRatio, ...action.payload };
    },
    updateThemeAvgRatio(state, action: PayloadAction<StockThemeState['themeAvgRatio']>) {
      state.themeAvgRatio = { ...state.themeAvgRatio, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(
      CustomAction.getThemeList.fulfilled,
      (state, action: PayloadAction<WithThemePeriod<ThemeState['themeMap']>>) => {
        const { period, data } = action.payload;
        if (isNilOrEmpty(state['1D'].themeMap)) {
          state['1D'].themeMap = data;
        }
        if (isNilOrEmpty(state['3D'].themeMap)) {
          state['3D'].themeMap = data;
        }
        if (isNilOrEmpty(state['1W'].themeMap)) {
          state['1W'].themeMap = data;
        }
        state[period].themeMap = data;
      }
    );
    builder.addCase(
      CustomAction.getThemeDetail.fulfilled,
      (state, action: PayloadAction<WithThemePeriod<ThemeDetailFulfilledPayload>>) => {
        const { period, data } = action.payload;
        if (state[period].themeMap[data.themeName] != null) {
          state[period].themeMap[data.themeName].stockList = data.themeList;
        }
      }
    );
  },
});

export const StockThemeSelector = {
  lastUpdateTime: (state: IState) => {
    if (state.StockThemeReducer.lastUpdateTime === '') return null;
    return formatTimeToDisplay(state.StockThemeReducer.lastUpdateTime, 'dd/MM/yyyy HH:mm', 'yyyyMMddHHmmss', false);
  },
  lastUpdateTimeDetail: (themeName: string) => (state: IState) => {
    if (
      state.StockThemeReducer['1D'].themeMap[themeName] == null ||
      state.StockThemeReducer['1D'].themeMap[themeName].updatedDate === ''
    )
      return null;
    return formatTimeToDisplay(
      state.StockThemeReducer['1D'].themeMap[themeName].updatedDate,
      'dd/MM/yyyy HH:mm',
      'yyyyMMddHHmmss',
      false
    );
  },
  selectThemeMapData:
    (themeName: string, period: ThemePeriod = '1D') =>
    (state: IState) =>
      state.StockThemeReducer[period].themeMap[themeName] ?? {},
  selectThemeChangeRate: (themeName: string, period?: ThemePeriod) => (state: IState) =>
    state.StockThemeReducer[period ?? state.StockThemeReducer.period].themeMap[themeName]?.themeChangeRate,
  currentThemeList:
    (period: ThemePeriod = '1D') =>
    (state: IState) =>
      state.StockThemeReducer[period].themeOfStock[state.SymbolData.currentSymbolCode] ?? [],
  selectCurrentStockRate: (stock: string, themeName: string, period?: ThemePeriod) => (state: IState) =>
    state.StockThemeReducer[period ?? state.StockThemeReducer.period].themeMap[themeName]?.stockData?.[stock]?.rate,
  isCurrentSymbolHasTheme: (state: IState) =>
    state.StockThemeReducer['1D'].themeOfStock[state.SymbolData.currentSymbolCode] != null ||
    state.StockThemeReducer['3D'].themeOfStock[state.SymbolData.currentSymbolCode] != null ||
    state.StockThemeReducer['1W'].themeOfStock[state.SymbolData.currentSymbolCode] != null,
  selectCurrentRatio: (themeCode: string) => (state: IState) => state.StockThemeReducer.themeRatio[themeCode] ?? [],
  selectAvgRatio: (themeCode: string) => (state: IState) => state.StockThemeReducer.themeAvgRatio[themeCode] ?? {},
};
export const StockThemeActions = { ...stockThemeSlice.actions, ...CustomAction };
export const StockThemeReducer = stockThemeSlice.reducer;
