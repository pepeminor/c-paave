import { SymbolType } from 'constants/enum';
import { MARKET, SYSTEM_TYPE } from 'global';
import { store } from 'screens/App';

export function isSymbolExist(symbol: string) {
  return store.getState().SymbolData.marketData.symbolMap[symbol] != null;
}

export function isStockSymbol(symbolType?: SymbolType) {
  if (symbolType === SymbolType.STOCK || symbolType === SymbolType.ETF || symbolType === SymbolType.FUND) {
    return true;
  } else {
    return false;
  }
}

export function getSystemType(symbolType: SymbolType) {
  if (
    symbolType === SymbolType.STOCK ||
    symbolType === SymbolType.CW ||
    symbolType === SymbolType.ETF ||
    symbolType === SymbolType.FUND
  ) {
    return SYSTEM_TYPE.EQUITY;
  } else if (symbolType === SymbolType.FUTURES) {
    return SYSTEM_TYPE.DERIVATIVES;
  } else return null;
}

export function isStockType(symbolType: SymbolType) {
  return symbolType === SymbolType.STOCK || symbolType === SymbolType.FUND || symbolType === SymbolType.ETF;
}

// export function getPriceStep(price: Big, market: MARKET, symbolType?: SYMBOL_TYPE) {
//   if (symbolType === SYMBOL_TYPE.CW) {
//     return 10;
//   } else if (symbolType === SYMBOL_TYPE.ETF) {
//     if (market === MARKET.HOSE) {
//       return 10;
//     } else if (market === MARKET.HNX) {
//       return 1;
//     } else {
//       return 1;
//     }
//   } else {
//     if (market === MARKET.HOSE) {
//       if (price.cmp(10000) < 0) {
//         return 10;
//       } else if (price.cmp(10000) >= 0 && price.cmp(50000) < 0) {
//         return 50;
//       } else {
//         return 100;
//       }
//     } else if (market === MARKET.HNX || market === MARKET.UPCOM) {
//       return 100;
//     } else {
//       return 100;
//     }
//   }
// }

// export function getFuturesPriceStep(baseSecuritiesType?: SYMBOL_TYPE) {
//   if (baseSecuritiesType === SYMBOL_TYPE.INDEX) {
//     return 0.1;
//   } else if (baseSecuritiesType === SYMBOL_TYPE.BOND) {
//     return 1;
//   } else {
//     return 0.1;
//   }
// }

// export function roundStep(value: number, step: number) {
//   if (!isNaN(value) && !isNaN(step) && step > 0) {
//     return Number(Big(Math.ceil((value - step) / step) * step + step).toFixed(2));
//   } else {
//     return 0;
//   }
// }

export function priceStep(value: number, market: keyof typeof MARKET, symbolType?: keyof typeof SymbolType): number {
  let step;
  if (market === MARKET.HOSE && !symbolType) {
    if (value < 10000) {
      step = 10;
    } else if (value >= 10000 && value < 50000) {
      step = 50;
    } else {
      step = 100;
    }
  } else if (symbolType != null) {
    if (symbolType === 'FUTURES') {
      step = 0.1;
    } else {
      step = 10;
    }
  } else {
    step = 100;
  }
  return step;
}

export function roundLot(
  value: number,
  market: MARKET,
  symbolType?: keyof typeof SymbolType
  // reverse?: boolean,
  // useMinLot?: boolean
) {
  if (value < 0) {
    return 0;
  }
  // if (symbolType === SYMBOL_TYPE.FUTURES) {
  //   if (value > 500) {
  //     if (reverse === true) {
  //       return value - 500;
  //     }
  //     return 500;
  //   }
  //   return value;
  // } else {
  // if (value < 100 && market === MARKET.HOSE) {
  //   return 100;
  // }

  // if (market !== MARKET.HOSE) {
  //   step = 1;
  // }
  if (symbolType === 'FUTURES') {
    return value.toFixed(1);
  } else {
    return Math.floor(value / priceStep(value, market, symbolType)) * priceStep(value, market, symbolType);
  }

  // if (reverse === true) {
  //   return value - result;
  // }

  // if (value > 0 && result === 0 && useMinLot === true) {
  //   result = 100;
  // }
  // }
}

export function isExcludeIndexSymbol(code: string) {
  const excludeSymbol = [
    'VN',
    'VN30',
    'HNX',
    'HNX30',
    'UPCOM',
    'VNFINLEAD',
    'VN100',
    'VNALL',
    'VNDIAMOND',
    'VNFINSELECT',
    'VNCOND',
    'VNXALL',
    'VNCONS',
    'VNIND',
    'VNMID',
    'VNUTI',
    'VNX50',
    'VNMAT',
    'VNFIN',
    'VNIT',
    'VNHEAL',
    'VNSML',
    'VNSI',
    'VNREAL',
    'VNENE',
  ];

  return excludeSymbol.includes(code);
}
