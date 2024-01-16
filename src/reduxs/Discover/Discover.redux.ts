import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IState } from 'reduxs/global-reducers';
import { IInitialState, IRefreshDiscoverScreen, IUpdateDiscoverTab } from './Discover.type';

const initialState: IInitialState = {
  tab: 'StockTheme',
  refreshing: false,
  refreshIndicesFinish: false,
  refreshWatchlistFinish: false,
  refreshMarketFinish: false,
  refreshHotStockFinish: false,
  refreshTop100StocksFinish: false,
  refreshStockThemeFinish: false,
};

export const discoverSelectors = {
  selectRefreshingDiscover: (state: IState) => state.DiscoverReducer.refreshing,
};

const DiscoverSlice = createSlice({
  name: 'discover',
  initialState,
  reducers: {
    refreshDiscoverScreen(state) {
      state.refreshing = true;
      state.refreshIndicesFinish = false;
      state.refreshWatchlistFinish = false;
      state.refreshMarketFinish = false;
      state.refreshHotStockFinish = false;
      state.refreshStockThemeFinish = false;
    },

    refreshDiscoverScreenFinish(state, action: PayloadAction<IRefreshDiscoverScreen>) {
      if (action.payload.refreshIndicesFinish != null && typeof action.payload.refreshIndicesFinish === 'boolean') {
        state.refreshIndicesFinish = action.payload.refreshIndicesFinish;
      }

      if (action.payload.refreshWatchlistFinish != null && typeof action.payload.refreshWatchlistFinish === 'boolean') {
        state.refreshWatchlistFinish = action.payload.refreshWatchlistFinish;
      }

      if (action.payload.refreshMarketFinish != null && typeof action.payload.refreshMarketFinish === 'boolean') {
        state.refreshMarketFinish = action.payload.refreshMarketFinish;
      }

      if (action.payload.refreshHotStockFinish != null && typeof action.payload.refreshHotStockFinish === 'boolean') {
        state.refreshHotStockFinish = action.payload.refreshHotStockFinish;
      }

      if (
        action.payload.refreshTop100StocksFinish != null &&
        typeof action.payload.refreshTop100StocksFinish === 'boolean'
      ) {
        state.refreshTop100StocksFinish = action.payload.refreshTop100StocksFinish;
      }

      if (
        action.payload.refreshStockThemeFinish != null &&
        typeof action.payload.refreshStockThemeFinish === 'boolean'
      ) {
        state.refreshStockThemeFinish = action.payload.refreshStockThemeFinish;
      }

      switch (state.tab) {
        case 'Watchlist':
          if (state.refreshIndicesFinish && state.refreshWatchlistFinish) {
            state.refreshing = false;
          }
          break;

        // case 'Market':
        //   if (state.refreshIndicesFinish && state.refreshMarketFinish) {
        //     state.refreshing = false;
        //   }
        //   break;

        case 'HotStock':
          if (state.refreshIndicesFinish && state.refreshHotStockFinish) {
            state.refreshing = false;
          }
          break;

        case 'Top100':
          if (state.refreshIndicesFinish && state.refreshTop100StocksFinish) {
            state.refreshing = false;
          }
          break;

        case 'StockTheme':
          if (state.refreshIndicesFinish && state.refreshStockThemeFinish) {
            state.refreshing = false;
          }
          break;
      }
    },

    updateDiscoverTab(state, action: PayloadAction<IUpdateDiscoverTab>) {
      state.tab = action.payload.tab;
    },
  },
});

export const { actions: DiscoverActions, reducer: DiscoverReducer } = DiscoverSlice;
