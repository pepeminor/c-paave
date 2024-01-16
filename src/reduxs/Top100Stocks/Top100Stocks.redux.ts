import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  FinancialRatioRankingParams,
  FinancialRatioRankingType,
  Top100StocksState,
  UpdateStatePayload,
} from './Top100Stocks.type';
import { IState } from 'reduxs/global-reducers';
import { IndicesConfig } from 'components/Top100Stocks/Top100Stocks.type';
import * as CustomAction from './Top100Stocks.action';
import { ToolkitAction } from 'interfaces/common';

const initialState: Top100StocksState = {
  HOSE: {},
  HNX: {},
  UPCOM: {},
  isLoading: true,
  index: 'HOSE',
  financialRatio: 'market_cap',
};

const top100Slice = createSlice({
  initialState,
  name: 'Top100Stocks',
  reducers: {
    updateTopStockData: (state, action: PayloadAction<UpdateStatePayload>) => {
      const { market, financialRatio, data } = action.payload;
      const currentData = state[market][financialRatio] ?? [];
      state[market][financialRatio] = [
        ...currentData,
        ...data.map((item, index) => ({ ...item, ranking: currentData.length + index + 1 })),
      ];
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateFilterIndex: (state, action: PayloadAction<IndicesConfig>) => {
      state.index = action.payload;
    },
    updateFilterFinancialRatio: (state, action: PayloadAction<FinancialRatioRankingType>) => {
      state.financialRatio = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      CustomAction.getTop100Stocks.pending,
      (state, action: ToolkitAction<FinancialRatioRankingParams>) => {
        const { market, financialRatio } = action.payload;
        if (state[market][financialRatio] == null) {
          state[market][financialRatio] = [];
        }
      }
    );
  },
});

export const Top100StocksSelector = {
  selectFullData: (market: IndicesConfig, financialRatio: FinancialRatioRankingType) => (state: IState) =>
    state.top100Stocks[market][financialRatio] ?? [],
};
export const Top100StocksActions = { ...top100Slice.actions, ...CustomAction };
export const Top100StocksReducer = top100Slice.reducer;
