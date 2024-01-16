import { IState } from 'reduxs/global-reducers';
import globalStyles from 'styles';
import { SymbolTypeChecker } from './SymbolData.helper';
import { MarketFutures, MergeIndexSymbol } from './SymbolData.type';
import { isNotNilOrEmpty } from 'ramda-adjunct';

/**
 * Some custom selector for SymbolData reducer
 */
export const SymbolDataSelector = {
  selectCurrentSymbol: (state: IState) => {
    return state.SymbolData.mergeSymbolMap[state.SymbolData.currentSymbolCode];
  },
  selectCurrentSymbolType: (state: IState) => {
    return state.SymbolData.mergeSymbolMap[state.SymbolData.currentSymbolCode]?.symbolType;
  },
  selectCurrentSymbolTradeScreen: (state: IState) => {
    const symbol = state.SymbolData.mergeSymbolMap[state.SymbolData.currentSymbolCode];
    if (isNotNilOrEmpty(symbol)) {
      return {
        currentPrice: symbol?.currentPrice,
        referencePrice: symbol?.referencePrice,
        market: symbol?.market,
        symbolCode: symbol?.symbolCode,
        floorPrice: symbol?.floorPrice,
        ceilingPrice: symbol?.ceilingPrice,
        symbolType: symbol?.symbolType,
      };
    }
    return {};
  },
  selectCurrentIndex: (state: IState) => {
    const symbol = state.SymbolData.mergeSymbolMap[state.SymbolData.currentIndexCode];
    return SymbolTypeChecker.isIndexSymbol(symbol) ? (symbol as MergeIndexSymbol) : undefined;
  },
  selectSymbol: (symbolCode: string) => (state: IState) => {
    return state.SymbolData.mergeSymbolMap[symbolCode];
  },
  getSearchSymbolData: (state: IState) => {
    const marketData = state.SymbolData.marketData;
    return [
      ...marketData.stockList.filter(item => item.symbolType !== 'FUND'),
      ...marketData.cwList,
      ...marketData.indexList,
      ...marketData.futuresList,
    ];
  },
  getSearchSymbolDataInTradeScreenEquity: (state: IState) => {
    const marketData = state.SymbolData.marketData;
    return [...marketData.stockList.filter(item => item.symbolType !== 'FUND'), ...marketData.cwList];
  },
  getSearchSymbolDataInTradeScreenDerivatives: (state: IState) => {
    const futuresList = state.SymbolData.marketData.futuresList;
    if (futuresList == null || futuresList.length === 0) return [];

    // Sort futures list by symbol code, symbol code include 'VN' will be on top and sort by alphabet
    let lastVNSymbolIndex = 0;
    return futuresList.reduce((prev: MarketFutures[], curr) => {
      if (curr.symbolCode.includes('VN')) {
        prev.splice(lastVNSymbolIndex, 0, curr);
        lastVNSymbolIndex += 1;
      } else {
        prev.push(curr);
      }
      return prev;
    }, []);
  },
  getAllSymbolData: (state: IState) => {
    const marketData = state.SymbolData.marketData;
    return [...marketData.symbolList];
  },
  selectCurrentQuote: (state: IState) => {
    return state.SymbolData.quoteChannel.symbolMap[state.SymbolData.currentSymbolCode];
  },
  selectHighlightIndex: (state: IState) => {
    const indexList = state.SymbolData.marketData.indexList.filter(item => item.indexType !== 'F').slice(0, 5);
    const mergeSymbolMap = state.SymbolData.mergeSymbolMap;
    return indexList
      .map(item => {
        const index = mergeSymbolMap[item.symbolCode];
        return SymbolTypeChecker.isIndexSymbol(index) ? index : undefined;
      })
      .filter(item => item != null) as MergeIndexSymbol[];
  },
  selectSymbolColor: (symbolCode: string) => (state: IState) => {
    const symbol = state.SymbolData.mergeSymbolMap[symbolCode];
    if (!symbol) return globalStyles.noData;
    const { referencePrice, floorPrice, ceilingPrice, currentPrice, expectedPrice, session } = symbol;
    const comparePrice = (session?.match(/ATO|ATC/) != null && expectedPrice) || currentPrice;
    if (comparePrice == null) return globalStyles.noData;
    switch (comparePrice) {
      case ceilingPrice:
        return globalStyles.colorCeiling;
      case floorPrice:
        return globalStyles.colorFloor;
      case referencePrice:
        return globalStyles.colorReference;
      default:
        if (comparePrice > referencePrice) {
          return globalStyles.colorUp;
        } else {
          return globalStyles.colorDown;
        }
    }
  },
  // selectCurrentStockSymbol: (state: IState) => {
  //   const symbol = state.SymbolData.mergeSymbolMap[state.SymbolData.currentSymbolCode];
  //   return SymbolTypeChecker.isStockSymbol(symbol) ? symbol : undefined;
  // },
  // selectStockSymbol: (symbolCode: string) => (state: IState) => {
  //   const symbol = state.SymbolData.mergeSymbolMap[symbolCode];
  //   return SymbolTypeChecker.isStockSymbol(symbol) ? symbol : undefined;
  // },
  // selectCurrentCWSymbol: (state: IState) => {
  //   const symbol = state.SymbolData.mergeSymbolMap[state.SymbolData.currentSymbolCode];
  //   return SymbolTypeChecker.isCWSymbol(symbol) ? symbol : undefined;
  // },
  // selectCWSymbol: (symbolCode: string) => (state: IState) => {
  //   const symbol = state.SymbolData.mergeSymbolMap[symbolCode];
  //   return SymbolTypeChecker.isCWSymbol(symbol) ? symbol : undefined;
  // },
  // selectCurrentFuturesSymbol: (state: IState) => {
  //   const symbol = state.SymbolData.mergeSymbolMap[state.SymbolData.currentSymbolCode];
  //   return SymbolTypeChecker.isFuturesSymbol(symbol) ? symbol : undefined;
  // },
  // selectFuturesSymbol: (symbolCode: string) => (state: IState) => {
  //   const symbol = state.SymbolData.mergeSymbolMap[symbolCode];
  //   return SymbolTypeChecker.isFuturesSymbol(symbol) ? symbol : undefined;
  // },
  // selectCurrentIndexSymbol: (state: IState) => {
  //   const symbol = state.SymbolData.mergeSymbolMap[state.SymbolData.currentSymbolCode];
  //   return SymbolTypeChecker.isIndexSymbol(symbol) ? symbol : undefined;
  // },
  selectIndexSymbol: (symbolCode: string) => (state: IState) => {
    const symbol = state.SymbolData.mergeSymbolMap[symbolCode];
    return SymbolTypeChecker.isIndexSymbol(symbol) ? (symbol as MergeIndexSymbol) : undefined;
  },
  selectReferencePriceSymbol: (symbolCode: string) => (state: IState) => {
    return state.SymbolData.mergeSymbolMap[symbolCode]?.referencePrice ?? 0;
  },
  selectCurrentPriceSymbol: (symbolCode: string) => (state: IState) => {
    return state.SymbolData.mergeSymbolMap[symbolCode]?.currentPrice ?? 0;
  },
  selectSymbolMap: (state: IState) => {
    return state.SymbolData.marketData.symbolMap;
  },
};
