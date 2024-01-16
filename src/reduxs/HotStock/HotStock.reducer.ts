import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingReducer } from 'interfaces/reducer';
import * as HotStockCustomAction from './HotStock.action';
import { HotStockItem, HotStockState } from './HotStock.type';

export const INIT_HOT_STOCK = 10;

const initialState: HotStockState = {
  hotStockType: 'MostBought',
  hotStockPeriodType: 'WEEK',
  hotStockOrderType: 'TOTAL_TRADING_VALUE',
  hotStockSource: 'Virtual',
  hotStockPageNumber: null,
  hotStockPageSize: INIT_HOT_STOCK,
  symbolList: {
    data: [],
    status: 'LOADING',
  },
};

export const hotStockSlice = createSlice({
  name: 'hotStockState',
  initialState,
  reducers: {
    setHotStockList: (state, action: PayloadAction<LoadingReducer<HotStockItem[]>>) => {
      state.symbolList = action.payload;
    },
    updateHotStockParams: (state, action: PayloadAction<Partial<HotStockState>>) => {
      Object.assign(state, action.payload);
      state.symbolList = initialState.symbolList;
    },
  },
});

export const HotStockAction = { ...hotStockSlice.actions, ...HotStockCustomAction };

export default hotStockSlice.reducer;
