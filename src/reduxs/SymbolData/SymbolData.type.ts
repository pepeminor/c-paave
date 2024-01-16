import { RealtimeChannelDataType } from 'constants/enum';
import { ISymbolInfo } from 'interfaces/market';
import { LoadingReducer } from 'interfaces/reducer';
import { SCChannel } from 'sc-channel';
import {
  MarketData,
  MarketSymbol,
  MarketStock,
  MarketCW,
  MarketFutures,
  MarketIndex,
  IndexQuote,
  StockQuote,
  CWQuote,
  FuturesQuote,
  SymbolLatest,
  BidOfferData,
  QuoteData,
  StatisticData,
} from './SymbolData.type';

export * from './interfaces/LatestMarketData.type';
export * from './interfaces/MarketData.type';
export * from './interfaces/SocketMarketData.type';

export interface SymbolState {
  /**
   * Current symbol that is using in app (Trade screen, Discover Stock Info Overview screen, etc.)
   */
  currentSymbolCode: string;
  /**
   * Current index that is using in app (IndexInfo)
   */
  currentIndexCode: string;
  /**
   * Data gathered from market gzip file
   */
  marketData: MarketData;
  /**
   * Data from socket market.quote channel
   */
  quoteChannel: {
    /**
     * List of symbols that are currently subscribed to quote channel
     */
    subscribeSymbols: string[];
    /**
     * Map of symbol and quote data
     */
    symbolMap: { [s: string]: QuoteData | undefined };
  };
  /**
   * Data from socket market.bidoffer/market.bidofferOddLot channel
   */
  bidOfferChannel: {
    /**
     * List of symbols that are currently subscribed to bid offer channel
     */
    subscribeSymbols: string[];
    /**
     * Map of symbol and bid offer data
     */
    symbolMap: { [s: string]: BidOfferData | undefined };
  };
  statisticChannel: {
    /**
     * List of symbols that are currently subscribed to statistic channel
     */
    subscribeSymbols: string[];
    /**
     * Statistic data of current symbol
     */
    data: StatisticData | undefined;
  };
  /**
   * Contains data merged from marketData, quoteChannel, bidOfferChannel and symbolLatest
   */
  mergeSymbolMap: { [s: string]: MergeMarketSymbol | undefined };
  /**
   * Quote list of current symbol
   */
  currentQuoteList: LoadingReducer<QuoteData[]>;
  /**
   * Stock List of indices
   */
  indexStockList: {
    VN30?: string[];
    HNX30?: string[];
    UPCOM?: string[];
  };
}

/**
 * Merged all symbols' type for convenience
 */
export type MergeMarketSymbol = Partial<SymbolLatest> &
  Partial<StockQuote & CWQuote & FuturesQuote & IndexQuote> &
  Partial<BidOfferData> &
  Partial<MarketStock & MarketCW & MarketFutures & MarketIndex> &
  MarketSymbol &
  Partial<StatisticData>;

/**
 * Merged type for stock symbol
 */
export type MergeStockSymbol = MarketStock & Partial<SymbolLatest> & Partial<StockQuote> & Partial<BidOfferData>;
/**
 * Merged type for CW symbol
 */
export type MergeCWSymbol = MarketCW & Partial<SymbolLatest> & Partial<CWQuote> & Partial<BidOfferData>;
/**
 * Merged type for futures symbol
 */
export type MergeFuturesSymbol = MarketFutures & Partial<SymbolLatest> & Partial<FuturesQuote> & Partial<BidOfferData>;
/**
 * Merged type for index symbol
 */
export type MergeIndexSymbol = MarketIndex & Partial<SymbolLatest> & Partial<IndexQuote> & Partial<BidOfferData>;

export interface SubscribeChannel {
  code: string;
  channel: SCChannel;
  channelType: RealtimeChannelDataType;
  count: number;
}

export interface LoadSymbolListReturn {
  /**
   * List of all symbols that market gzip file return
   */
  symbolList: ISymbolInfo[];
  latestModified: string | null;
}

export interface SubscribePayload {
  symbols: string[];
  channelType: (keyof typeof RealtimeChannelDataType)[];
  /**
   * If true, will not clean old data when subscribe
   */
  noCleanData?: boolean;
}
