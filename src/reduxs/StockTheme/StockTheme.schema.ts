export const StockThemeSchema = {
  themeData: {
    n: 'themeName',
    t: 'updatedDate',
    td: {
      key: 'themeData',
      value: {
        p: 'period',
        c: 'themeChangeRate',
        i: 'noOfIncreases',
        d: 'noOfDecreases',
        u: 'noOfUnchanges',
        dt: {
          key: 'stockData',
          value: {
            s: 'symbol',
            r: 'rate',
          },
        },
      },
    },
  },
};
