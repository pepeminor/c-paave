type SymbolType = 'STOCK' | 'FUND' | 'ETF' | 'FUTURES' | 'CW' | 'BOND' | 'INDEX';

type SymbolSession = 'ATO' | 'ATC' | 'CONTINUOUS';

interface SocketMarketDataBase {
  /**
   * Symbol code
   * @Original s
   *
   * Ex: VN30, HNX, HSX, IDC, HPG
   */
  readonly symbolCode: string;
  /**
   * Symbol type
   * @Original t
   *
   * Ex: STOCK, FUND, ETF, FUTURES, CW, BOND, INDEX
   */
  readonly symbolType: SymbolType;
  /**
   * Current time
   * @Original ti
   *
   * Ex: HOSE, HNX, UPCOM
   */
  readonly time?: string;
  /**
   * Session
   * @Original ss
   *
   * Ex: ATO, ATC, CONTINUOUS
   */
  readonly session?: SymbolSession;
}

export interface BidOfferData extends SocketMarketDataBase {
  /**
   * Expected price
   * @Original ep
   */
  readonly expectedPrice?: number;
  /**
   * Expected change
   * @Original exc
   */
  readonly expectedChange?: number;
  /**
   * Expected rate
   * @Original exr
   */
  readonly expectedRate?: number;
  /**
   * Best Bid
   * @Original bb
   */
  readonly bestBid: BidOffer[];
  /**
   * Best Offer
   * @Original bo
   */
  readonly bestOffer: BidOffer[];
}

interface QuoteResponseBase extends SocketMarketDataBase {
  /**
   * Open price
   * @Original o
   */
  readonly openPrice?: number;
  /**
   * High price
   * @Original h
   */
  readonly highPrice?: number;
  /**
   * Low price
   * @Original l
   */
  readonly lowPrice?: number;
  /**
   * Current price
   * @Original c
   */
  readonly currentPrice: number;
  /**
   * Change price
   * @Original ch
   */
  readonly changePrice: number;
  /**
   * Change rate
   * @Original ra
   */
  readonly changeRate: number;
  /**
   * Trading volume
   * @Original vo
   */
  readonly tradingVolume: number;
  /**
   * Trading value
   * @Original va
   */
  readonly tradingValue: number;
  /**
   * Matching volume
   * @Original mv
   */
  readonly matchingVolume: number;
}

export interface StockQuote extends QuoteResponseBase {
  /**
   * Average price
   * @Original a
   */
  readonly averagePrice: number;
  /**
   * Foreign Data
   * @Original fr
   */
  readonly foreignData: ForeignData;
  /**
   * Matched by
   * @Original mb
   */
  readonly matchedBy: string;
}

export interface FuturesQuote extends QuoteResponseBase {
  /**
   * Average price
   * @Original a
   */
  readonly averagePrice: number;
  /**
   * Foreign Data
   * @Original fr
   */
  readonly foreignData: ForeignData;
  /**
   * Matched by
   * @Original mb
   */
  readonly matchedBy: string;
}

export interface CWQuote extends QuoteResponseBase {
  /**
   * Average price
   * @Original a
   */
  readonly averagePrice: number;
  /**
   * Foreign Data
   * @Original fr
   */
  readonly foreignData: ForeignData;
  /**
   * Break even
   * @Original be
   */
  readonly breakEven?: number;
  /**
   * Matched by
   * @Original mb
   */
  readonly matchedBy: string;
}
export interface IndexQuote extends QuoteResponseBase {
  /**
   * Index change
   * @Original ic
   */
  readonly indexChange?: {
    /**
     * Ceiling count
     * @Original ce
     */
    readonly ceilingCount: number;
    /**
     * Floor count
     * @Original fl
     */
    readonly floorCount: number;
    /**
     * Up count
     * @Original up
     */
    readonly upCount: number;
    /**
     * Down count
     * @Original dw
     */
    readonly downCount: number;
    /**
     * Un-change count
     * @Original uc
     */
    readonly unChangeCount: number;
  };
}

interface ForeignData {
  /**
   * Buy volume
   * @Original bv
   */
  readonly buyVolume?: number;
  /**
   * Sell volume
   * @Original sv
   */
  readonly sellVolume?: number;
  /**
   * Current room (useable room)
   * @Original cr
   */
  readonly currentRoom?: number;
  /**
   * Total room
   * @Original tr
   */
  readonly totalRoom?: number;
}

export interface BidOffer {
  /**
   * Price
   * @Original p
   */
  readonly price: number;
  /**
   * Volume
   * @Original v
   */
  readonly volume: number;
  /**
   * Volume change
   * @Original c
   */
  readonly change?: number;
}

export type QuoteData = StockQuote | IndexQuote | FuturesQuote | CWQuote;

export interface IPriceStep {
  /**
   * Price
   * @Original p
   */
  price: number;
  /**
   * Accumulated volume
   * @Original av
   */
  accumulatedVolume: number;
  /**
   * Accumulated ratio
   * @Original ar
   */
  accumulatedRatio: number;
  /**
   * Accumulated buy
   * @Original ab
   */
  accumulatedBuy?: number;
  /**
   * Buy ratio
   * @Original br
   */
  buyRatio?: number;
  /**
   * Accumulated sell
   * @Original as
   */
  accumulatedSell?: number;
  /**
   * Sell ratio
   * @Original sr
   */
  sellRatio?: number;
  /**
   * Accumulated unknown
   * @Original au
   */
  accumulatedUnknow?: number;
  /**
   * Unknown ratio
   * @Original ur
   */
  unknownRatio?: number;
}

export interface StatisticData extends SocketMarketDataBase {
  /**
   * Date
   * @Original d
   */
  date?: string;
  /**
   * Trading volume
   * @Original vo
   */
  tradingVolume: number;
  /**
   * Total buy volume
   * @Original tbv
   */
  totalBuyVolume: number;
  /**
   * Total buy ratio
   * @Original tbr
   */
  totalBuyRatio: number;
  /**
   * Total sell volume
   * @Original tsv
   */
  totalSellVolume?: number;
  /**
   * Total sell ratio
   * @Original tsr
   */
  totalSellRatio?: number;
  /**
   * Total unknown volume
   * @Original tuv
   */
  totalUnknownVolume?: number;
  /**
   * Total unknown ratio
   * @Original tur
   */
  totalUnknownRatio?: number;
  /**
   * Price step
   * @Original ps
   */
  priceStep: IPriceStep[];
}

export type SocketMarketData = QuoteData | BidOfferData | StatisticData;
