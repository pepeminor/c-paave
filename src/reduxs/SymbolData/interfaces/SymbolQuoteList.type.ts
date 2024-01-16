export interface QuoteListItem {
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
   * Current price
   * @Original c
   */
  readonly currentPrice: number;
  /**
   * Open price
   * @Original o
   */
  readonly openPrice?: number;
  /**
   * High price
   * @Original h
   */
  readonly highPrice: number;
  /**
   * Low price
   * @Original l
   */
  readonly lowPrice: number;
  /**
   * Matching volume
   * @Original mv
   */
  readonly matchingVolume: number;
  /**
   * Matched by
   * @Original mb
   */
  readonly matchedBy?: string;
  /**
   * Time
   * @Original t
   */
  readonly time: string;
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
   * Sequence
   * @Original se
   */
  readonly sequence: number;
}
