type SymbolType = 'STOCK' | 'FUND' | 'ETF' | 'FUTURES' | 'CW' | 'BOND' | 'INDEX';

type SymbolSession = 'ATO' | 'ATC' | 'CONTINUOUS';

interface BidOffer {
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

interface HighLowYearData {
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
   * Date of high price
   * @Original hd
   */
  readonly highDate?: string;
  /**
   * Date of low price
   * @Original ld
   */
  readonly lowDate?: string;
}

export interface SymbolLatest {
  /**
   * Average price
   * @Original a
   */
  readonly averagePrice?: number;
  /**
   * Best Bid
   * @Original bb
   */
  readonly bestBid?: BidOffer[];
  /**
   * Best Offer
   * @Original bo
   */
  readonly bestOffer?: BidOffer[];
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
   * Foreign Data
   * @Original fr
   */
  readonly foreignData?: ForeignData;
  /**
   * High Low Year
   * @Original hly
   */
  readonly highLowYear?: HighLowYearData[];
  /**
   * Put through value
   * @Original pva
   */
  readonly putThroughValue?: number;
  /**
   * Put through volume
   * @Original pvo
   */
  readonly putThroughVolume?: number;
  /**
   * Change rate
   * @Original ra
   */
  readonly changeRate: number;
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
  readonly symbolType?: SymbolType;
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
   * Session
   * @Original ss
   *
   * Ex: ATO, ATC, CONTINUOUS
   */
  readonly session?: SymbolSession;
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
   * Matching volume
   * @Original mv
   */
  readonly matchingVolume?: number;
  /**
   * Open price
   * @Original o
   */
  readonly openPrice?: number;
  /**
   * Break even
   * @Original be
   */
  readonly breakEven?: number;
}
