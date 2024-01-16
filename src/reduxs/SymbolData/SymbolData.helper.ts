import config from 'config';
import { RealtimeChannelDataType, SymbolType, WS } from 'constants/enum';
import { Global } from 'constants/main';
import { deepMapFields, isExcludeIndexSymbol } from 'utils';
import { SymbolDataAction } from './SymbolData.reducer';
import { MapSymbolFieldSchema, socketMarketDataSchema } from './SymbolData.schema';
import {
  BidOfferData,
  IndexQuote,
  LoadSymbolListReturn,
  MergeCWSymbol,
  MergeFuturesSymbol,
  MergeIndexSymbol,
  MergeMarketSymbol,
  MergeStockSymbol,
  QuoteData,
  SocketMarketData,
  StatisticData,
  SubscribeChannel,
} from './SymbolData.type';
import { isAfter, isBefore } from 'date-fns';
import { repeat, insertAll } from 'ramda';
import { store } from 'screens/App';

/**
 * Global store to keep track of subscribed channels
 */
const ChannelsStore = {
  quoteChannels: new Map<string, SubscribeChannel>(),
  bidOfferChannels: new Map<string, SubscribeChannel>(),
  statisticChannels: new Map<string, SubscribeChannel>(),
} as const;

export const SymbolDataHelper = {
  /**
   * Helper to get market data via fetch
   * @param latestModified
   * @param refreshData
   * @returns Unformatted symbols list
   */
  async loadSymbolList(
    latestModified: string | null | undefined,
    refreshData?: boolean
  ): Promise<LoadSymbolListReturn> {
    const headers = new Headers();
    headers.append('pragma', 'no-cache');
    headers.append('cache-control', 'no-cache');
    if (latestModified && !refreshData) {
      headers.append('If-Modified-Since', latestModified);
    }

    const result = await fetch(config.market.symbolUrl, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });

    if (result.status === 304) {
      return {
        symbolList: [],
        latestModified: result.headers.get('Last-Modified'),
      };
    }
    return {
      symbolList: await result.json(),
      latestModified: result.headers.get('Last-Modified'),
    };
  },
  /**
   * Helper to subscribe symbol
   * @caution Since symbol subscription is not manage by this function, it is not mean to use directly, use SymbolDataAction.subscribeSymbols instead
   * @param symbolsCode List of symbols code to subscribe
   * @param channelType Channel types to subscribe
   */
  subscribeSymbols(symbolsCode: string[], channelType: (keyof typeof RealtimeChannelDataType)[]) {
    if (channelType.includes(RealtimeChannelDataType.QUOTE)) {
      symbolsCode.forEach(s => {
        SubscribeFunctionHelper.subscribeSymbol(s, RealtimeChannelDataType.QUOTE, ChannelsStore.quoteChannels);
      });
    }
    if (channelType.includes(RealtimeChannelDataType.BID_OFFER)) {
      symbolsCode.forEach(s => {
        SubscribeFunctionHelper.subscribeSymbol(s, RealtimeChannelDataType.BID_OFFER, ChannelsStore.bidOfferChannels);
      });
    }
    if (channelType.includes(RealtimeChannelDataType.STATISTIC)) {
      symbolsCode.forEach(s => {
        SubscribeFunctionHelper.subscribeSymbol(s, RealtimeChannelDataType.STATISTIC, ChannelsStore.statisticChannels);
      });
    }
  },
  /**
   * Helper to unsubscribe symbol
   * @caution Since symbol subscription is not manage by this function, it is not mean to use directly, use SymbolDataAction.unsubscribeSymbols instead
   * @param symbolsCode List of symbols code to unsubscribe
   * @param channelType Channel types to unsubscribe
   * @returns List of unsubscribed symbols code
   */
  unsubscribeSymbols(symbolsCode: string[], channelType: (keyof typeof RealtimeChannelDataType)[]) {
    const unsubscribeResult = {
      QUOTE: [] as string[],
      BID_OFFER: [] as string[],
      STATISTIC: [] as string[],
    };
    if (channelType.includes(RealtimeChannelDataType.QUOTE)) {
      symbolsCode.forEach(s => {
        const result = SubscribeFunctionHelper.unsubscribeSymbol(s, ChannelsStore.quoteChannels);
        if (result) unsubscribeResult.QUOTE.push(s);
      });
    }
    if (channelType.includes(RealtimeChannelDataType.BID_OFFER)) {
      symbolsCode.forEach(s => {
        const result = SubscribeFunctionHelper.unsubscribeSymbol(s, ChannelsStore.bidOfferChannels);
        if (result) unsubscribeResult.BID_OFFER.push(s);
      });
    }
    if (channelType.includes(RealtimeChannelDataType.STATISTIC)) {
      symbolsCode.forEach(s => {
        const result = SubscribeFunctionHelper.unsubscribeSymbol(s, ChannelsStore.bidOfferChannels);
        if (result) unsubscribeResult.STATISTIC.push(s);
      });
    }
    return unsubscribeResult;
  },
  formatDataChart(data: {
    ignoreLunchTime: boolean;
    firstPoint: number;
    dataPoint: number[];
    dataTime: number[];
    resolution: number;
  }) {
    const { ignoreLunchTime, firstPoint, dataPoint, dataTime, resolution } = data;
    const dataPointTemp = [firstPoint, ...dataPoint];
    if (ignoreLunchTime === true) {
      return dataPointTemp;
    } else {
      const timeDate = new Date(dataTime[dataTime.length - 1] * 1000); //time * 1000 get Date with timestamp
      const lunchTimeOfCurrentDay = new Date(timeDate.getFullYear(), timeDate.getMonth(), timeDate.getDate(), 12, 59);
      if (isBefore(timeDate, lunchTimeOfCurrentDay)) {
        return dataPointTemp;
      } else {
        const indexOfLastMorningMinute = dataTime.findIndex(item =>
          isAfter(new Date(item * 1000), lunchTimeOfCurrentDay)
        );
        if (indexOfLastMorningMinute > -1) {
          const listPointLunch = repeat(dataPointTemp[indexOfLastMorningMinute], 90 / resolution); //Insert 90 points at noon
          const dataPoint = insertAll(indexOfLastMorningMinute + 1, listPointLunch, dataPointTemp);
          return dataPoint;
        }

        return dataPointTemp;
      }
    }
  },
};

/**
 * Helper to check symbol type
 *
 * @returns true if symbol is correct type
 * @example
 * if (SymbolTypeChecker.isStockSymbol(symbol)) {
 *                                     // ^? const symbol: MergeMarketSymbol
 *  console.log(symbol.ceilingPrice)
 *              // ^? const symbol: MergeStockSymbol
 * }
 */
export const SymbolTypeChecker = {
  isStockSymbol(symbol?: MergeMarketSymbol): symbol is MergeStockSymbol {
    if (symbol == null) return false;
    return symbol.symbolType.match(/STOCK|ETF|FUND/) !== null;
  },
  isCWSymbol(symbol?: MergeMarketSymbol): symbol is MergeCWSymbol {
    if (symbol == null) return false;
    return symbol.symbolType === 'CW';
  },
  isFuturesSymbol(symbol?: MergeMarketSymbol): symbol is MergeFuturesSymbol {
    if (symbol == null) return false;
    return symbol.symbolType === 'FUTURES';
  },
  isIndexSymbol(symbol?: MergeMarketSymbol): symbol is MergeIndexSymbol {
    if (symbol == null) return false;
    return symbol.symbolType === 'INDEX';
  },
  isIndexQuote(symbol?: QuoteData): symbol is IndexQuote {
    if (symbol == null) return false;
    return symbol.symbolType === 'INDEX';
  },
  isIndexAreExcluded(symbol?: MergeMarketSymbol): symbol is MergeIndexSymbol {
    if (symbol == null) return false;
    return symbol.symbolType === 'INDEX' && isExcludeIndexSymbol(symbol.symbolCode);
  },
  isIncludeSymbol(symbol?: MergeMarketSymbol, market?: (keyof typeof SymbolType)[]): symbol is MergeIndexSymbol {
    if (symbol == null || symbol.symbolType == null || market == null) return false;
    return market.includes(symbol.symbolType);
  },
};

const SubscribeFunctionHelper = {
  /**
   * Helper to handle subscribe process
   * @param symbolCode
   * @param channelType
   * @param channels
   * @param isOddLot
   * @param callbacks
   */
  subscribeSymbol(
    symbolCode: string,
    channelType: RealtimeChannelDataType,
    channels: Map<string, SubscribeChannel>,
    isOddLot?: boolean,
    callbacks?: Array<(data: SocketMarketData) => void>
  ) {
    const socket = Global.sockets[WS.PRICE_BOARD];
    if (socket == null) return;
    const channel = channels.get(symbolCode);
    if (channel != null) {
      channel.count = 1 + channel.count;
      return;
    }
    const channelName = SubscribeFunctionHelper.getChannelName(channelType, symbolCode, isOddLot);
    const newChannel = {
      code: symbolCode,
      channel: socket.subscribe(channelName, { batch: true }),
      channelType,
      count: 1,
    };
    newChannel.channel.watch(unFormattedResponse => {
      if (unFormattedResponse == null) return;
      const res = deepMapFields(unFormattedResponse, MapSymbolFieldSchema.SocketData);
      const isSubscribeSymbolData = socketMarketDataSchema.safeParse(res);
      if (isSubscribeSymbolData.success) {
        SubscribeFunctionHelper.onReceiveSubscribeData(res, channelType, callbacks);
      } else {
        if (__DEV__ && config.debugFlag.socketData)
          // eslint-disable-next-line no-console
          console.log(
            'SubscribeSymbolDataError',
            unFormattedResponse,
            res,
            JSON.stringify(isSubscribeSymbolData.error, null, 2)
          );
      }
    });
    channels.set(symbolCode, newChannel);
  },
  /**
   * Helper to handle unsubscribe process
   * @param symbolCode
   * @param channels
   * @returns true if symbol is unsubscribed
   */
  unsubscribeSymbol(symbolCode: string, channels: Map<string, SubscribeChannel>) {
    const channel = channels.get(symbolCode);
    if (channel == null) return true;
    channel.count = -1 + channel.count;
    if (channel.count > 0) return false;
    channel.channel.unwatch();
    channel.channel.unsubscribe();
    channels.delete(symbolCode);
    return true;
  },
  /**
   * Get channel name to subscribe
   * @param channelType
   * @param symbolCode
   * @param isOddLot
   * @returns
   */
  getChannelName(channelType: RealtimeChannelDataType, symbolCode: string, isOddLot?: boolean) {
    switch (channelType) {
      case RealtimeChannelDataType.QUOTE:
        return `market.quote.${symbolCode}`;
      case RealtimeChannelDataType.BID_OFFER:
        return isOddLot ? `market.bidofferOddLot.${symbolCode}` : `market.bidoffer.${symbolCode}`;
      case RealtimeChannelDataType.EXTRA:
        return `market.extra.${symbolCode}`;
      case RealtimeChannelDataType.STATISTIC:
        return `market.statistic.${symbolCode}`;
      default:
        return '';
    }
  },
  /**
   * Dispatch action to update store base on channel type
   * @param symbolData
   * @param channelType
   * @param callbacks
   */
  onReceiveSubscribeData(
    symbolData: SocketMarketData,
    channelType: RealtimeChannelDataType,
    callbacks?: Array<(data: SocketMarketData) => void>
  ) {
    switch (channelType) {
      case RealtimeChannelDataType.QUOTE:
        store.dispatch(SymbolDataAction.updateQuoteChannel(symbolData as QuoteData));
        break;
      case RealtimeChannelDataType.BID_OFFER:
        store.dispatch(SymbolDataAction.updateBidOfferChannel(symbolData as BidOfferData));
        break;
      case RealtimeChannelDataType.STATISTIC:
        store.dispatch(SymbolDataAction.updateStatisticChannel(symbolData as StatisticData));
        break;
      default:
        break;
    }
    if (callbacks) {
      callbacks.forEach(callback => {
        callback(symbolData);
      });
    }
  },
};
