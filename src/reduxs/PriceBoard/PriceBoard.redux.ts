import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PriceBoardState } from './PriceBoard.type';

const initialState: PriceBoardState = {
  priceBoardType: 'Live board',
  selectedList: 'VN30',
  priceChangeType: 'Percent',
  totalType: 'Volume',
  filterSymbol: undefined,
  filterPrice: undefined,
  filterChange: undefined,
  filterVolume: undefined,
};

const PriceBoardSlice = createSlice({
  name: 'PriceBoard',
  initialState,
  reducers: {
    updatePriceBoardState: (state, action: PayloadAction<Partial<PriceBoardState>>) => {
      return { ...state, ...action.payload };
    },
    togglePriceChangeType: state => {
      return { ...state, priceChangeType: state.priceChangeType === 'Percent' ? 'Value' : 'Percent' };
    },
    toggleTotalType: state => {
      return { ...state, totalType: state.totalType === 'Volume' ? 'Value' : 'Volume' };
    },
  },
});

export const PriceBoardActions = PriceBoardSlice.actions;
export const PriceBoardReducer = PriceBoardSlice.reducer;
