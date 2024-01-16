import { useTypedSelector } from 'hooks';
import { useMemo } from 'react';
import { RecommendData, RecommendSymbol, RecommendTag, RecommendUser } from './types';

export const useMasterSymbolList = () => {
  const _stockList = useTypedSelector(state => state.SymbolData.marketData.stockList);
  const stockList = useMemo(() => _stockList.filter(s => s.symbolType !== 'FUND').map(s => s.symbolCode), [_stockList]);
  const _indexList = useTypedSelector(state => state.SymbolData.marketData.indexList);
  const indexList = useMemo(() => [..._indexList.map(s => s.symbolCode), 'VNINDEX'], [_indexList]);

  const masterSymbolList = useMemo(() => {
    return [...stockList, ...indexList];
  }, [stockList, indexList]);

  return {
    masterSymbolList,
  };
};

export const isRecommendUser = (data: RecommendData): data is RecommendUser => {
  return (data as RecommendUser).username !== undefined;
};

export const isRecommendTag = (data: RecommendData): data is RecommendTag => {
  return (data as RecommendTag).tag !== undefined;
};

export const isRecommendSymbol = (data: RecommendData): data is RecommendSymbol => {
  return (data as RecommendSymbol).symbol !== undefined;
};
