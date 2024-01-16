import { IStatisticSortType, PeriodType, RealtimeChannelDataType, SymbolSession, SymbolType } from 'constants/enum';
import { MARKET } from 'global';
import { IndexType } from './apis/IndexType';
import { IParams } from './common';

export interface ISymbolList {
  readonly array: ISymbolInfo[];
  readonly map?: { readonly [s: string]: ISymbolInfo };
  readonly latest?: boolean;
  readonly lastestModified?: string;
}

export interface IMarketData {
  readonly symbolList: ISymbolList;
  readonly stockList?: ISymbolInfo[];
  readonly indexList?: ISymbolInfo[];
  readonly cwList?: ISymbolInfo[];
  readonly futuresList?: ISymbolInfo[];
}

export interface IAIRatingScore {
  readonly id: number;
  readonly code: string;
  readonly date: string;
  readonly techScore: number;
  readonly valuationScore: number;
  readonly overall: number;
  readonly price: number;
  readonly change: string;
  readonly created_at: Date;
  readonly updated_at: string;
  readonly gsCore: number;
  readonly rank: number;
  readonly created_by: string;
  readonly updated_by: string;
}

export interface IAICode {
  readonly code: string;
}

export interface IGetAIRatingScoreParams {
  readonly start: number;
  readonly limit: number;
  readonly sort: string;
  readonly date: string;
  readonly filter: IAICode | {};
}

export interface ITradingViewHistoryParams {
  readonly symbol: string;
  readonly from: number;
  readonly to?: number;
  readonly resolution?: string;
  height?: number;
}

export interface IUpdateTradingViewHistoryParams {
  readonly lastTime: number;
  readonly data: ISymbolData;
}

export interface IInOutAIRatingParams {
  readonly top: number;
  readonly date: string;
}

export interface IInOutAIRatingResponse {
  readonly in: string[];
  readonly out: string[];
}

export interface IAIRatingChartDataParams {
  readonly top: number;
  readonly period: string;
}

export interface IAIRatingChartDataResponse {
  readonly date: string;
  readonly aiRating: number;
  readonly vnIndex: number;
}

export interface IBidOffer {
  /**
   * Price
   */
  readonly p?: number;
  /**
   * Volume
   */
  readonly v?: number;
  /**
   * Volumn change
   */
  readonly c?: number;
}

export interface IIndexChange {
  /**
   * Ceiling count
   */
  readonly ce: number;
  /**
   * Floor count
   */
  readonly fl: number;
  /**
   * Up count
   */
  readonly up: number;
  /**
   * Down count
   */
  readonly dw: number;
  /**
   * Unchange count
   */
  readonly uc: number;
  /**
   *
   */
  readonly tc?: number;
  /**
   *
   */
  readonly utc?: number;
}

export interface ISymbolQuote {
  /**
   * Close price
   */
  readonly s: string;
  /**
   * Close price
   */
  readonly c: number;
  /**
   * High price
   */
  readonly h: number;
  /**
   * Low price
   */
  readonly l: number;
  /**
   * Open price
   */
  readonly o: number;
  /**
   * time `yyyyMMddhhmmss` or `HHmmss`
   */
  readonly t: string;
  /**
   * Ceiling floor equal
   */
  readonly cf?: string;
  /**
   * Change
   */
  readonly ch: number;
  /**
   * Matched by
   */
  readonly mb?: string;
  /**
   * Matching volume
   */
  readonly mv: number;
  /**
   * Rate
   */
  readonly ra: number;
  /**
   * Sequence
   */
  readonly se?: number;
  /**
   * Trading value
   */
  readonly va?: number;
  /**
   * Trading volume
   */
  readonly vo: number;
  /**
   * period trading volume
   */
  readonly pv?: number;
}
export interface ISymbolInfo {
  readonly s: string;
  readonly m: MARKET;
  readonly n1?: string;
  readonly n2?: string;
  readonly t: SymbolType;
  readonly b?: string;
  readonly bs?: SymbolType;
  readonly i?: boolean;
  readonly checked?: boolean;
  /**
   * period trading volume
   */
  readonly pv?: number;
  /**
   * Reference price
   */
  readonly re: number;
  /**
   * Ceiling price
   */
  readonly ce: number;
  /**
   * Floor price
   */
  readonly fl: number;
  readonly pc?: number;
  /**
   * Listed Quantity
   */
  readonly ls?: number;
  readonly it?: IndexType;
}

export interface ISymbolData extends ISymbolLatest, ISymbolInfo {
  /**
   * Reference code
   */
  readonly r?: string;
  /**
   * Base code
   */
  readonly b?: string;
  /**
   * Base code securities type (INDEX/BOND)
   */
  readonly bs?: SymbolType;
  /**
   * Base code price CW (Additional)
   */
  readonly bp?: ISymbolData;
  /**
   * Is highlight
   */
  readonly i?: boolean;
  /**
   * Index type
   */
  readonly it?: IndexType;
  // /**
  //  * Matching by
  //  */
  // readonly mb?: 'BID' | 'OFFER';
  /**
   * Time
   */
  ti?: string;
  /**
   * 52 Weeks
   */
  readonly w52?: {
    /**
     * High
     */
    readonly h: number;
    /**
     * Low
     */
    readonly l: number;
  };
  /**
   * First trade date (YYYYMMDD)
   */
  readonly ftd?: string;
  /**
   * Last trade date (YYYYMMDD)
   */
  readonly ltd?: string;
  /**
   * Maturity date (YYYYMMDD)
   */
  readonly md?: string;
  /**
   *
   */
  readonly et?: {
    readonly ce?: number;
    readonly fl?: number;
  };
  /**
   * Issuer name
   */
  readonly is?: string;
  /**
   * Exercise price
   */
  readonly exp?: number;
  /**
   * Expected volume
   */
  readonly exv?: number;
  /**
   *  Expected change
   */
  readonly exc?: number;
  /**
   *  Expected rate
   */
  readonly exr?: number;
  /**
   * Exercise ratio
   */
  readonly er?: string;
  /**
   *
   */
  readonly iv?: number;
  /**
   *
   */
  readonly rv?: number;
  /**
   *
   */
  readonly vd?: number;
  /**
   * Delta
   */
  readonly de?: number;
  /**
   * Previous close
   */
  readonly lq?: number;
  /**
   * Underlying symbol
   */
  readonly ud?: string;
  /**
   *  Avg Volume (10 days)
   */
  readonly av?: number;
  /**
   *  Is Ex diviend date
   */
  readonly ie?: boolean;
  /**
   *  Break even
   */
  readonly be?: number;
  /**
   *  %Premium
   */
  readonly pe?: number;
  /**
   *  high low year
   */
  readonly hly?: {
    readonly h?: number;
    readonly l?: number;
    readonly hd?: number;
    readonly ld?: number;
  }[];
  /**
   * Real time channel type (QUOTE/BID_OFFER/EXTRA)
   */
  readonly channelType?: RealtimeChannelDataType;
  readonly quoteSubs?: boolean; // check if this code subscribed quote or not
  readonly bidOfferSubs?: boolean; // check if this code subscribed bid offer or not
  readonly extraSubs?: boolean; // check if this code subscribed extra or not
}

export interface INewSubscribeSymbol {
  readonly symbolList: ISymbolInfo[];
  readonly types: RealtimeChannelDataType[];
  readonly isOddlot?: boolean;
  readonly fromBrowser?: boolean;
  readonly symbolType?: SymbolType;
  readonly cbKey?: string;
  readonly cb?: (data: ISymbolData) => void;
}

export interface IAccountBuyableParams {
  readonly stockCode: string;
  readonly marketType: MARKET;
  readonly orderPrice: number;
}

export interface IAccountSellableParams {
  readonly stockCode: string;
}

export interface IGetSymbolLatestParams extends IParams {
  readonly symbolList: string[];
}

export interface IGetIndexStockListParams extends IParams {
  readonly indexCode: string;
}

export interface IIndexStockList {
  readonly indexStockList: string[];
}

export enum CEFL {
  CEILING = 'CEILING',
  FLOOR = 'FLOOR',
}

export enum BID_ASK_TYPE {
  BID = 'BID',
  ASK = 'ASK',
}

export interface ITradingViewHistory {
  readonly c: number[];
  readonly h: number[];
  readonly l: number[];
  readonly o: number[];
  readonly s: string;
  readonly t: number[];
  readonly v: number[];
  readonly nextTime: number;
}

export interface ISymbolLatest {
  readonly s: string; // code
  readonly t: SymbolType;
  readonly ss?: SymbolSession; // session
  readonly a?: number; // average price
  readonly ba?: number; // basis (for futures)
  readonly c?: number;
  readonly h?: number;
  readonly l?: number;
  readonly o?: number;
  readonly oi?: number; // open interest
  readonly bb?: IBidOffer[];
  readonly bo?: IBidOffer[];
  readonly ch?: number; // change
  readonly mb?: 'CEILING' | 'FLOOR'; // match by
  readonly fr?: {
    /**
     * Buy volumn
     */
    readonly bv: number;
    /**
     * Sell volumn
     */
    readonly sv: number;
    /**
     * Current room
     */
    readonly cr: number;
    /**
     * Total room
     */
    readonly tr: number;
    /**
     *
     */
    readonly fvo?: number;
    /**
     *
     */
    readonly fva?: number;
  };
  readonly ic?: IIndexChange;
  readonly mv?: number; // match volume
  readonly ra?: number; // rate
  readonly tb?: number; // total Bid Volume
  readonly to?: number; // total Offer Volume
  readonly va?: number; // trading value
  readonly vo?: number; // trading volume
  readonly ep?: number; // expected price
  readonly pva?: number; // putthrough value
  readonly pvo?: number; // putthrough volume
}

export interface IIndexStockRankingUpDownParams extends IParams {
  readonly sortBy: string;
  readonly upDownType: string;
}

export interface IGetSymbolPeriodParams extends IParams {
  readonly indexCode: string;
  readonly periodType: string;
  readonly baseDate: string;
  readonly fetchCount: number;
  readonly timePeriod: string;
}

export interface ISymbolQuoteMinutesParams extends IParams {
  readonly symbol: string;
}

export interface ISymbolQuoteListParams extends IParams {
  readonly symbol: string;
  readonly lastTradingVolume?: number;
  readonly fetchCount?: number;
}

export interface ISymbolQuoteMinutes {
  readonly l: number[];
  readonly pv: number[];
  readonly t: string[];
  // readonly code: string;
}

export interface IAccountBuyable {
  readonly buyingPower: number;
  readonly buyableQuantity: number;
}

export interface IAccountSellable {
  readonly sellableQuantity: number;
}

export interface ILastTradingDate {
  readonly lastTradingDate: string;
}

export interface IGetSymbolPeriodMasParams {
  readonly symbol: string;
  readonly periodType: PeriodType;
  readonly baseDate?: string;
  readonly fetchCount?: number;
}

export interface IGetSymbolPeriodMasResponse {
  c: number;
  d: string;
  h?: number;
  l?: number;
  o?: number;
  ch?: number;
  dc?: number;
  ra: number;
  va: number;
  vo?: number;
}

export interface IGetSymbolForeignerParams {
  readonly symbol: string;
  readonly baseDate?: string;
  readonly fetchCount?: number;
}
export interface IGetSymbolForeignerResponse {
  br: number;
  cr: number;
  cv: number;
  hr: number;
  hv: number;
  tr: number;
  bvo: number;
  svo: number;
  nvo: number;
  bva: number;
  nva: number;
  d: string;
}

export interface IIndexParams {
  readonly indexCode: string;
}

export interface IMarketRefreshResponse {
  readonly type: string;
}

export interface IMarketSymbolQuoteList {
  data: ISymbolQuote[];
  lastTradingVolume: number;
}

export interface IProhibitedStockResponse {
  listOfLimitedStockCodes: string[];
}

export interface IMarketStatisticRequest {
  symbol: string;
  sortBy?: IStatisticSortType;
  pageSize?: number;
  pageNumber?: number;
}
