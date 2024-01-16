export const HotStockMapSchema = {
  mostboughtStocks: {
    key: 'stockList',
    value: {
      ranking: 'rank',
      code: 'stockCode',
    },
  },
  mostsoldStocks: {
    key: 'stockList',
    value: {
      ranking: 'rank',
      code: 'stockCode',
    },
  },
  mostSearchedStocks: {
    key: 'stockList',
    value: {
      code: 'stockCode',
      tradingValue: 'totalTradingValue',
      tradingVolume: 'totalTradingVolume',
    },
  },
  boughtStockRanks: 'stockList',
  soldStockRanks: {
    key: 'stockList',
    value: {
      ranking: 'rank',
    },
  },
  mostSearchStocks: {
    key: 'stockList',
    value: {
      code: 'stockCode',
      tradingValue: 'totalTradingValue',
      tradingVolume: 'totalTradingVolume',
    },
  },
};
