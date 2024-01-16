import { RefObject, useCallback, useEffect, useMemo } from 'react';
import { useAppSelector, useTypedSelector } from 'hooks';
import { isDerivativesAccount, isKisAccount, mapV2 } from 'utils';
import { useDispatch } from 'react-redux';
import { getSearchRecentViewed, putSearchDeleteHistory } from 'reduxs/global-actions';
import { IDeleteRecentSearchHistoryParams, PutDeleteType } from 'interfaces/search';
import { SymbolDataAction } from 'reduxs';
import { ReducerStatus } from 'interfaces/reducer';
import { SearchSymbolFlow } from './type';
import { store } from 'screens/App';

export const useMasterSymbolList = (flow: SearchSymbolFlow) => {
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const isSelectedDerivativesAccount = isKisAccount(selectedAccount) && isDerivativesAccount(selectedAccount);
  const _stockList = useTypedSelector(state => state.SymbolData.marketData.stockList);
  const stockList = useMemo(() => _stockList.filter(s => s.symbolType !== 'FUND').map(s => s.symbolCode), [_stockList]);
  const _cwList = useTypedSelector(state => state.SymbolData.marketData.cwList);
  const cwList = useMemo(() => _cwList.map(s => s.symbolCode), [_cwList]);
  const _indexList = useTypedSelector(state => state.SymbolData.marketData.indexList);
  const indexList = useMemo(() => _indexList.map(s => s.symbolCode), [_indexList]);
  const _futuresList = useTypedSelector(state => state.SymbolData.marketData.futuresList);
  const futuresList = useMemo(
    () =>
      _futuresList
        .map(s => s.symbolCode)
        .sort((a, b) =>
          a.includes('VN') && !b.includes('VN') ? -1 : !a.includes('VN') && b.includes('VN') ? 1 : a.localeCompare(b)
        ),
    [_futuresList]
  );
  const masterSymbolList = useMemo(() => {
    if (flow === 'Search' || flow === 'Watchlist') return [...stockList, ...cwList, ...indexList, ...futuresList];
    if (!isSelectedDerivativesAccount) return [...stockList, ...cwList];
    return futuresList;
  }, [stockList, cwList, indexList, futuresList, flow, isSelectedDerivativesAccount]);
  const VN30List = useTypedSelector(state => state.SymbolData.indexStockList.VN30);

  return { masterSymbolList, VN30List };
};

export const useRecentViewedSymbolList = (
  setData: (data: string[]) => void,
  searchTextRef: RefObject<string>,
  VN30List?: string[]
) => {
  const dispatch = useDispatch();
  const getRecentViewed = useAppSelector(state => state.getRecentViewed);
  const recentViewedSymbolList = useMemo(
    () => mapV2(getRecentViewed.data?.recentlySearches, item => item.code),
    [getRecentViewed]
  );
  const getRecentlyViewedDone = getRecentViewed.status === ReducerStatus.SUCCESS;

  const checkShowRecentViewed = useCallback(() => {
    if (searchTextRef.current !== '') {
      return false;
    }
    if (recentViewedSymbolList.length > 0) {
      setData(recentViewedSymbolList);
      return true;
    }
    if (getRecentlyViewedDone) {
      setData(VN30List ?? []);
    }
    return true;
  }, [recentViewedSymbolList, VN30List]);

  useEffect(() => {
    dispatch(getSearchRecentViewed(null));
    if (VN30List == null) {
      dispatch(SymbolDataAction.getIndicesStockList());
    }
  }, []);

  useEffect(() => {
    checkShowRecentViewed();
  }, [recentViewedSymbolList, VN30List]);

  return { recentViewedSymbolList, getRecentlyViewedDone, checkShowRecentViewed };
};

export const removeAllRecently = () => {
  const params: IDeleteRecentSearchHistoryParams = {
    deleteType: PutDeleteType.ALL,
  };
  store.dispatch(putSearchDeleteHistory(params));
};
