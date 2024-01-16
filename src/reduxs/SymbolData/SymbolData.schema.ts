import { formatTimeToDisplay } from 'utils';

/**
 * 4 Schema to use in deepMapFields function
 * 1. MarketData: Schema for market data, map to MergeMarketSymbol type
 * 2. SocketData: Schema for socket data, map to SocketMarketData type
 * 3. SymbolLatest: Schema for symbol latest data, map to MergeMarketSymbol type
 * 4. SymbolDetail: Schema for symbol detail data, map to QuoteListItem type
 */
export const MapSymbolFieldSchema = {
  /* MARKET DATA */
  MarketData: {
    s: 'symbolCode',
    t: 'symbolType',
    m: 'market',
    n1: 'vietnameseName',
    n2: 'englishName',
    re: 'referencePrice',
    pc: 'previousClose',
    i: 'isHighlight',
    it: 'indexType',
    ce: 'ceilingPrice',
    fl: 'floorPrice',
    ls: 'listedQuantity',
    b: 'underlyingCode',
    bs: 'underlyingType',
    ftd: 'firstTradingDate',
    ltd: 'lastTradingDate',
    md: 'maturityDate',
    is: 'issuerName',
    er: 'exerciseRatio',
    exp: 'exercisePrice',
  },

  /* SOCKET DATA */
  SocketData: {
    s: 'symbolCode',
    t: 'symbolType',
    ti: {
      key: 'time',
      transformValue: (value: string) => formatTimeToDisplay(value, 'HHmmss', 'yyyyMMddHHmmss', true) ?? value,
    },
    ss: 'session',
    ep: 'expectedPrice',
    exc: 'expectedChange',
    exr: 'expectedRate',
    bb: {
      key: 'bestBid',
      value: {
        p: 'price',
        v: 'volume',
        c: 'change',
      },
    },
    bo: {
      key: 'bestOffer',
      value: {
        p: 'price',
        v: 'volume',
        c: 'change',
      },
    },
    be: 'breakEven',
    o: 'openPrice',
    h: 'highPrice',
    l: 'lowPrice',
    c: 'currentPrice',
    ch: 'changePrice',
    ra: 'changeRate',
    vo: 'tradingVolume',
    va: 'tradingValue',
    mv: 'matchingVolume',
    a: 'averagePrice',
    fr: {
      key: 'foreignData',
      value: {
        bv: 'buyVolume',
        sv: 'sellVolume',
        cr: 'currentRoom',
        tr: 'totalRoom',
      },
    },
    ic: {
      key: 'indexChange',
      value: {
        ce: 'ceilingCount',
        lf: 'floorCount',
        up: 'upCount',
        dw: 'downCount',
        uc: 'unChangeCount',
      },
    },
    mb: 'matchedBy',
    d: 'date',
    tbv: 'totalBuyVolume',
    tbr: 'totalBuyRatio',
    tsv: 'totalSellVolume',
    tsr: 'totalSellRatio',
    tuv: 'totalUnknownVolume',
    tur: 'totalUnknownRatio',
    ps: {
      key: 'priceStep',
      value: {
        p: 'price',
        av: 'accumulatedVolume',
        ar: 'accumulatedRatio',
        ab: 'accumulatedBuy',
        br: 'buyRatio',
        as: 'accumulatedSell',
        sr: 'sellRatio',
        au: 'accumulatedUnknow',
        ur: 'unknownRatio',
      },
    },
  },

  /* SYMBOL LATEST */
  SymbolLatest: {
    a: 'averagePrice',
    bb: {
      key: 'bestBid',
      value: {
        p: 'price',
        v: 'volume',
        c: 'change',
      },
    },
    bo: {
      key: 'bestOffer',
      value: {
        p: 'price',
        v: 'volume',
        c: 'change',
      },
    },
    be: 'breakEven',
    c: 'currentPrice',
    ch: 'changePrice',
    fr: {
      key: 'foreignData',
      value: {
        bv: 'buyVolume',
        sv: 'sellVolume',
        cr: 'currentRoom',
        tr: 'totalRoom',
      },
    },
    hly: {
      key: 'highLowYear',
      value: {
        h: 'highPrice',
        l: 'lowPrice',
        hd: 'highDate',
        ld: 'lowDate',
      },
    },
    ic: {
      key: 'indexChange',
      value: {
        ce: 'ceilingCount',
        lf: 'floorCount',
        up: 'upCount',
        dw: 'downCount',
        uc: 'unChangeCount',
      },
    },
    pva: 'putThroughValue',
    pvo: 'putThroughVolume',
    ra: 'changeRate',
    s: 'symbolCode',
    t: 'symbolType',
    vo: 'tradingVolume',
    va: 'tradingValue',
    ss: 'session',
    ep: 'expectedPrice',
    exc: 'expectedChange',
    exr: 'expectedRate',
    exp: 'exercisePrice',
    h: 'highPrice',
    l: 'lowPrice',
    o: 'openPrice',
    mv: 'matchingVolume',
    mb: 'matchedBy',
  },

  /* SYMBOL QUOTE LIST */
  SymbolQuoteList: {
    ch: 'changePrice',
    ra: 'changeRate',
    c: 'currentPrice',
    o: 'openPrice',
    h: 'highPrice',
    l: 'lowPrice',
    mv: 'matchingVolume',
    mb: 'matchedBy',
    t: 'time',
    vo: 'tradingVolume',
    va: 'tradingValue',
    se: 'sequence',
  },
};

export * from './schemas/LatestMarketData.zod';
export * from './schemas/MarketData.zod';
export * from './schemas/SocketMarketData.zod';
