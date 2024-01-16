import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from 'config';
import { RealtimeChannelDataType } from 'constants/enum';
import { parse } from 'date-fns';
import { merge } from 'lodash';
import { mergeDeepRight, mergeRight } from 'ramda';
import { PersistConfig, persistReducer } from 'redux-persist';
import { SUCCESS } from 'reduxs/action-type-utils';
import {
  getQuoteList,
  getSymbolLatest,
  initMarket,
  setCurrentSymbol,
  getCurrentSymbolStatistic,
} from './SymbolData.action';
import { SymbolDataHelper } from './SymbolData.helper';
import { BidOfferData, QuoteData, StatisticData, SubscribePayload, SymbolLatest, SymbolState } from './SymbolData.type';
import * as SymbolDataCustomAction from './SymbolData.action';

const initialState: SymbolState = {
  currentSymbolCode: config.defaultCurrentSymbol,
  currentIndexCode: config.defaultCurrentIndex,
  marketData: {
    symbolList: [],
    stockList: [],
    indexList: [],
    cwList: [],
    futuresList: [],
    bondList: [],
    symbolMap: {},
    latestModified: null,
  },
  quoteChannel: {
    subscribeSymbols: [],
    symbolMap: {},
  },
  bidOfferChannel: {
    subscribeSymbols: [],
    symbolMap: {},
  },
  statisticChannel: {
    subscribeSymbols: [],
    data: undefined,
  },
  mergeSymbolMap: {},
  currentQuoteList: {
    data: [],
    status: 'LOADING',
  },
  indexStockList: {},
};

export const symbolStateSlice = createSlice({
  name: 'symbolState',
  initialState,
  reducers: {
    /**
     * Action to subscribe symbols
     *
     * Reset (socket data & merge data) when get symbol latest
     *
     * @note Because socket data is reset, if new socket data is received, then it can be merged with api latest data in SUCCESS(getSymbolLatest.type)
     */
    subscribeSymbols: (state, action: PayloadAction<SubscribePayload>) => {
      const { symbols, channelType, noCleanData } = action.payload;
      action.payload.symbols.forEach(s => {
        state.quoteChannel.symbolMap[s] = undefined;
        state.bidOfferChannel.symbolMap[s] = undefined;
        state.statisticChannel.data = undefined;

        if (!noCleanData && state.marketData.symbolMap[s]) {
          state.mergeSymbolMap[s] = {
            ...state.marketData.symbolMap[s],
          };
        }
      });
      if (channelType.includes(RealtimeChannelDataType.QUOTE)) {
        state.quoteChannel.subscribeSymbols = [...new Set([...state.quoteChannel.subscribeSymbols, ...symbols])];
      }
      if (channelType.includes(RealtimeChannelDataType.BID_OFFER)) {
        state.bidOfferChannel.subscribeSymbols = [...new Set([...state.bidOfferChannel.subscribeSymbols, ...symbols])];
      }
      if (channelType.includes(RealtimeChannelDataType.STATISTIC)) {
        state.statisticChannel.subscribeSymbols = [
          ...new Set([...state.statisticChannel.subscribeSymbols, ...symbols]),
        ];
      }
      SymbolDataHelper.subscribeSymbols(symbols, channelType);
    },
    /**
     * Action to unsubscribe symbols
     */
    unsubscribeSymbols: (state, action: PayloadAction<SubscribePayload>) => {
      const { symbols, channelType } = action.payload;
      const unSubResults = SymbolDataHelper.unsubscribeSymbols(symbols, channelType);
      if (channelType.includes(RealtimeChannelDataType.QUOTE) && unSubResults.QUOTE.length > 0) {
        state.quoteChannel.subscribeSymbols = state.quoteChannel.subscribeSymbols.filter(
          s => !unSubResults.QUOTE.includes(s)
        );
      }
      if (channelType.includes(RealtimeChannelDataType.BID_OFFER) && unSubResults.BID_OFFER.length > 0) {
        state.bidOfferChannel.subscribeSymbols = state.bidOfferChannel.subscribeSymbols.filter(
          s => !unSubResults.BID_OFFER.includes(s)
        );
      }
      if (channelType.includes(RealtimeChannelDataType.STATISTIC) && unSubResults.STATISTIC.length > 0) {
        state.statisticChannel.subscribeSymbols = state.statisticChannel.subscribeSymbols.filter(
          s => !unSubResults.STATISTIC.includes(s)
        );
      }
    },
    /**
     * Action to directly update quote data, used for socket data and mock data
     */
    updateQuoteChannel: (state, action: PayloadAction<QuoteData>) => {
      const symbolCode = action.payload.symbolCode;
      state.quoteChannel.symbolMap[symbolCode] = action.payload;
      state.mergeSymbolMap[symbolCode] = merge(state.mergeSymbolMap[symbolCode], action.payload);
    },
    /**
     * Action to directly update bid offer data, used for socket data and mock data
     */
    updateBidOfferChannel: (state, action: PayloadAction<BidOfferData>) => {
      const symbolCode = action.payload.symbolCode;
      state.bidOfferChannel.symbolMap[symbolCode] = action.payload;
      state.mergeSymbolMap[symbolCode] = merge(state.mergeSymbolMap[symbolCode], action.payload);
    },
    /**
     * Action to directly update statistic data, used for socket data and mock data
     */
    updateStatisticChannel: (state, action: PayloadAction<StatisticData>) => {
      if (
        state.statisticChannel.data == null ||
        Number(state.statisticChannel.data.time) > Number(action.payload.time)
      ) {
        return;
      }

      let newStateData = state.statisticChannel.data as StatisticData;
      const updateData = action.payload;

      Object.entries(updateData).forEach(([key, value]: [keyof StatisticData | string, unknown]) => {
        if (key.match(/^(symbolCode|symbolType|priceStep)$/) || value === newStateData[key as keyof StatisticData]) {
          return;
        }

        if (key === 'tradingVolume') {
          newStateData.priceStep.forEach(el => {
            const newPriceStep = updateData.priceStep[0];
            if (el.price === newPriceStep.price) {
              el = newPriceStep;
              return;
            }

            el.accumulatedRatio = (el.accumulatedVolume / updateData.tradingVolume) * 100;
          });
        }

        newStateData = { ...newStateData, [key]: value };
      });
      state.statisticChannel.data = newStateData;
    },

    updateIndicesStockList: (state, action: PayloadAction<Partial<SymbolState['indexStockList']>>) => {
      state.indexStockList = mergeRight(state.indexStockList, action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(initMarket.fulfilled, (state, action: PayloadAction<Pick<SymbolState, 'marketData'>>) => {
      state.marketData = mergeDeepRight(state.marketData, action.payload.marketData) as SymbolState['marketData'];
      state.mergeSymbolMap = mergeDeepRight(state.mergeSymbolMap, action.payload.marketData.symbolMap);
    });
    /**
     * Reset quote list on get quote list
     * */
    builder.addCase(getQuoteList.pending, state => {
      state.currentQuoteList = initialState.currentQuoteList;
    });
    /**
     * Update quote list on get quote list success
     * */
    builder.addCase(getQuoteList.fulfilled, (state, action: PayloadAction<QuoteData[]>) => {
      state.currentQuoteList = {
        data: action.payload,
        status: 'SUCCESS',
      };
    });
    /**
     * Update quote list on get quote list failed
     * */
    builder.addCase(getQuoteList.rejected, state => {
      state.currentQuoteList = {
        data: [],
        status: 'FAILED',
      };
    });
    /**
     * Update Symbol latest data on get symbol latest success
     * @note If socket data exists, that mean socket data is newer than api latest data, then start merge with socket data
     * */
    builder.addCase(getSymbolLatest.fulfilled, (state, action: PayloadAction<SymbolLatest[]>) => {
      action.payload.forEach(symbol => {
        if (!state.quoteChannel.symbolMap[symbol.symbolCode] && !state.bidOfferChannel.symbolMap[symbol.symbolCode]) {
          state.mergeSymbolMap[symbol.symbolCode] = merge(state.mergeSymbolMap[symbol.symbolCode], symbol);
          return;
        }
        // Socket data is newer than api latest data
        const sortedRealtimeData = [
          state.quoteChannel.symbolMap[symbol.symbolCode],
          state.bidOfferChannel.symbolMap[symbol.symbolCode],
        ].sort((a, b) => {
          if (!a?.time || !b?.time) return 0;
          return parse(a.time, 'HHmmss', new Date()).getTime() - parse(b.time, 'HHmmss', new Date()).getTime();
        });
        state.mergeSymbolMap[symbol.symbolCode] = merge(
          state.mergeSymbolMap[symbol.symbolCode],
          symbol,
          ...sortedRealtimeData
        );
        return;
      });
    });
    /**
     * Update current symbol
     * */
    builder.addCase(SUCCESS(setCurrentSymbol.type), (state, action: PayloadAction<string>) => {
      const symbolData = state.marketData.symbolMap[action.payload];
      if (symbolData == null) return;
      if (symbolData.symbolType === 'INDEX') {
        state.currentIndexCode = action.payload;
      } else {
        state.currentSymbolCode = action.payload;
      }
    });
    /**
     * Update statistic data on get statistic success
     * */
    builder.addCase(getCurrentSymbolStatistic.pending, state => {
      state.statisticChannel.data = undefined;
    });
    builder.addCase(getCurrentSymbolStatistic.fulfilled, (state, action: PayloadAction<StatisticData>) => {
      state.statisticChannel.data = action.payload;
    });
  },
});

export const SymbolDataAction = { ...symbolStateSlice.actions, ...SymbolDataCustomAction };

const persistConfig: PersistConfig<ReturnType<typeof symbolStateSlice.reducer>> = {
  key: symbolStateSlice.name,
  storage: AsyncStorage,
  whitelist: ['currentSymbol', 'indexStockList'],
};

export default persistReducer(persistConfig, symbolStateSlice.reducer) as unknown as typeof symbolStateSlice.reducer;
