import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GetForeignTradingPayload, ForeignTradingState, ForeignTradingMarket } from './ForeignTrading.type';
import { merge } from 'lodash';
import { IState } from 'reduxs/global-reducers';
import { ForeignBuySellTab } from 'screens/ForeignTrading';

const initialState: ForeignTradingState = {
  selectedMarket: 'ALL',
  foreignBuy: {},
  foreignSell: {},
};

const foreignTradingSlice = createSlice({
  initialState,
  name: 'ForeignTrading',
  reducers: {
    getData: (state, action: PayloadAction<GetForeignTradingPayload>) => {
      if (action.payload.refresh) {
        state.selectedMarket = action.payload.marketType;
        state.foreignBuy = {};
        state.foreignSell = {};
      }
    },
    getDataSuccess: (state, action: PayloadAction<Partial<ForeignTradingState>>) => {
      state.foreignBuy = merge(state.foreignBuy, action.payload.foreignBuy);
      state.foreignSell = merge(state.foreignSell, action.payload.foreignSell);
    },
    setSelectedMarket: (state, action: PayloadAction<ForeignTradingMarket>) => {
      state.selectedMarket = action.payload;
    },
  },
});

export const ForeignTradingSelector = {
  selectTableData: (buySell: ForeignBuySellTab) => (state: IState) => {
    const { selectedMarket, foreignBuy, foreignSell } = state.foreignTrading;
    const data = buySell === 'TopBuy' ? foreignBuy : foreignSell;
    return data[selectedMarket] || [];
  },
  selectLastUpdated: (state: IState) => {
    const { foreignBuy, foreignSell } = state.foreignTrading;
    return foreignBuy.lastUpdated ?? foreignSell.lastUpdated ?? null;
  },
};
export const ForeignTradingActions = foreignTradingSlice.actions;
export const ForeignTradingReducer = foreignTradingSlice.reducer;
