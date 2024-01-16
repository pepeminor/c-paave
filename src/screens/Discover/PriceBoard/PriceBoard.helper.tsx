import { MarketData, SymbolState } from 'reduxs';
import { MarketCategoriesLiteral } from 'screens/PriceBoardFullScreen';

export const SelectPriceBoardSymbolList = (
  selectedList: MarketCategoriesLiteral,
  marketData: MarketData,
  indexStockList: SymbolState['indexStockList']
) => {
  switch (selectedList) {
    case 'VN30':
      return indexStockList.VN30 ?? [];
    case 'HNX30':
      return indexStockList.HNX30 ?? [];
  }

  return (() => {
    switch (selectedList) {
      case 'HOSE':
        return marketData.stockList.filter(item => item.market === 'HOSE');
      case 'HNX':
        return marketData.stockList.filter(item => item.market === 'HNX');
      case 'UPCOM':
        return marketData.stockList.filter(item => item.market === 'UPCOM');
      case 'BOND':
        return marketData.bondList;
      case 'ETF':
        return marketData.stockList.filter(item => item.symbolType === 'ETF');
      case 'Futures-Index':
        return marketData.futuresList.filter(item => item.underlyingType === 'INDEX');
      case 'Futures-Bond':
        return marketData.futuresList.filter(item => item.underlyingType === 'BOND');
      case 'CW':
        return marketData.cwList;
      case 'All Indices':
        return marketData.indexList;
      default:
        return [];
    }
  })().map(item => item.symbolCode);
};
