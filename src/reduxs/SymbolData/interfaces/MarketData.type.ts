type SymbolType = 'STOCK' | 'FUND' | 'ETF' | 'FUTURES' | 'CW' | 'BOND' | 'INDEX';

/**
 * Index type
 *
 * D: Domestic
 * F: Foreign
 */
type IndexType = 'D' | 'F';

type MARKET = 'HOSE' | 'HNX' | 'UPCOM';

interface MarketSymbolBase {
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
   * Market (Index)
   * @Original m
   *
   * Ex: HOSE, HNX, UPCOM
   */
  readonly market: MARKET;
  /**
   * Symbol name in Vietnamese
   * @Original n1
   *
   * Ex: CTCP 32
   */
  readonly vietnameseName: string;
  /**
   * Symbol name in English
   * @Original n2
   *
   * Ex: 32 Joint Stock Company
   */
  readonly englishName: string;
  /**
   * Reference price
   * @Original re
   */
  readonly referencePrice: number;
  /**
   * Previous close price
   * @Original pc
   */
  readonly previousClose?: number;
}

export interface MarketIndex extends MarketSymbolBase {
  /**
   * Is Highlight
   * @Original i
   */
  readonly isHighlight: boolean;
  /**
   * Index type
   * @Original it
   *
   * Ex: DOMESTIC, FOREIGN
   */
  readonly indexType: IndexType;
}

export interface MarketStock extends MarketSymbolBase {
  /**
   * Ceiling price
   * @Original ce
   */
  readonly ceilingPrice: number;
  /**
   * Floor price
   * @Original fl
   */
  readonly floorPrice: number;
  /**
   * Listed Quantity
   * @Original ls
   */
  readonly listedQuantity: number;
}

export interface MarketFutures extends MarketSymbolBase {
  /**
   * Underlying stock code / Base code
   * @Original b
   */
  readonly underlyingCode: string;
  /**
   * Underlying stock type / Base Code Security Type
   * @Original bs
   */
  readonly underlyingType: SymbolType;
  /**
   * First Trading Time
   * @Original ftd
   */
  readonly firstTradingDate: string;
  /**
   * Maturity Date / End Date
   * @Original md
   */
  readonly maturityDate: string;
  /**
   * Ceiling price
   * @Original ce
   */
  readonly ceilingPrice: number;
  /**
   * Floor price
   * @Original fl
   */
  readonly floorPrice: number;
  /**
   * Listed Quantity
   * @Original ls
   */
  readonly listedQuantity: number;
}

export interface MarketCW extends MarketSymbolBase {
  /**
   * Ceiling price
   * @Original ce
   */
  readonly ceilingPrice: number;
  /**
   * Floor price
   * @Original fl
   */
  readonly floorPrice: number;
  /**
   * Listed Quantity
   * @Original ls
   */
  readonly listedQuantity: number;
  /**
   * Underlying stock code / Base code
   * @Original b
   */
  readonly underlyingCode: string;
  /**
   * Underlying stock type / Base Code Security Type
   * @Original bs
   */
  readonly underlyingType: SymbolType;
  /**
   * Issuer name
   * @Original is
   */
  readonly issuerName: string;
  /**
   * Exercise ratio
   * @Original er
   */
  readonly exerciseRatio: string;
  /**
   * Exercise price
   * @Original exp
   */
  readonly exercisePrice: number;
  /**
   * Last Trading Date
   * @Original ltd
   */
  readonly lastTradingDate: string;
}

export type MarketSymbol = MarketStock | MarketIndex | MarketCW | MarketFutures;

export interface MarketData {
  /**
   * List of all symbols that market gzip file return
   */
  readonly symbolList: MarketSymbol[];
  /**
   * Filtered list of symbols from symbolList
   */
  readonly stockList: MarketStock[];
  /**
   * Filtered list of indices from symbolList
   */
  readonly indexList: MarketIndex[];
  /**
   * Filtered list of CW from symbolList
   */
  readonly cwList: MarketCW[];
  /**
   * Filtered list of futures from symbolList
   */
  readonly futuresList: MarketFutures[];
  /**
   * Filtered list of bond from symbolList
   */
  readonly bondList: MarketSymbol[];
  /**
   * Map of all symbols that market gzip file return
   */
  readonly symbolMap: { [s: string]: MarketSymbol };
  /**
   * Latest modified time of market gzip file
   */
  readonly latestModified: string | null;
}
