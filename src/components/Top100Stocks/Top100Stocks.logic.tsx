import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useMemo, useRef } from 'react';
import { FinancialRatioConfig, IProps, IndicesConfig } from './Top100Stocks.type';
import { Top100StocksActions, Top100StocksSelector } from 'reduxs';
import { useAppSelector } from 'hooks/useAppSelector';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import { FlatList, ViewToken } from 'react-native';
import { useDispatch } from 'react-redux';
import { ACCOUNT_TYPE } from 'global';
import { store } from 'screens/App';

const PAGE_SIZE = 20;

function Top100Stock_queryTop100Stocks(
  market: IndicesConfig,
  financialRatio: FinancialRatioConfig,
  pageNumber: number
) {
  store.dispatch(
    Top100StocksActions.getTop100Stocks({
      payload: {
        market,
        financialRatio,
        pageNumber: pageNumber,
        pageSize: PAGE_SIZE,
      },
    })
  );
}

const useScreenLogic = (props: IProps) => {
  const selectedIndex = useAppSelector(state => state.top100Stocks.index);
  const selectedFinancialRatio = useAppSelector(state => state.top100Stocks.financialRatio);
  const initializeState = {
    startIndex: 0,
    endIndex: 15,
  };
  const propsRef = useRef({
    ...props,
    ...initializeState,
    pageNumber: 0,
    selectedIndex,
    selectedFinancialRatio,
  });
  propsRef.current = { ...propsRef.current, ...props, selectedIndex, selectedFinancialRatio };
  const flatListRef = useRef<FlatList>(null);
  const dispatch = useDispatch();
  const [state, setState] = useMergingState(initializeState, propsRef);
  const data = useAppSelector(Top100StocksSelector.selectFullData(selectedIndex, selectedFinancialRatio));

  const symbolList = useMemo(
    () => data.slice(state.startIndex, state.endIndex).map(item => item.code),
    [data, state.startIndex, state.endIndex]
  );
  useSubscribeSymbol(symbolList, ['BID_OFFER', 'QUOTE'], true);

  useEffect(() => {
    propsRef.current.pageNumber = Math.floor(data.length / PAGE_SIZE);
  }, [data]);

  useEffect(() => {
    store.getState().selectedAccount.type !== ACCOUNT_TYPE.DEMO &&
      Top100Stock_queryTop100Stocks(selectedIndex, selectedFinancialRatio, 0);
  }, []);

  const handlers = useHandlers({
    onChangeIndices: (value: IndicesConfig) => {
      dispatch(Top100StocksActions.updateFilterIndex(value));
      Top100Stock_queryTop100Stocks(value, propsRef.current.selectedFinancialRatio, 0);
      !propsRef.current.showHeader && flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    },
    onChangeFinancialRatio: (value: FinancialRatioConfig) => {
      dispatch(Top100StocksActions.updateFilterFinancialRatio(value));
      Top100Stock_queryTop100Stocks(propsRef.current.selectedIndex, value, 0);
      !propsRef.current.showHeader && flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    },
    onEndReached: () => {
      if (propsRef.current.pageNumber < 0 || propsRef.current.pageNumber > 4) return;
      Top100Stock_queryTop100Stocks(
        propsRef.current.selectedIndex,
        propsRef.current.selectedFinancialRatio,
        propsRef.current.pageNumber
      );
    },
    updateViewableItems: (viewableItems: ViewToken[]) => {
      const start = (viewableItems[0]?.index ?? 0) - 3;
      const end = viewableItems[viewableItems.length - 1]?.index ?? 0;
      setState({ startIndex: start < 0 ? 0 : start, endIndex: end + propsRef.current.pageNumber });
    },
  });

  return {
    state,
    handlers,
    data,
    flatListRef,
    selectedIndex,
    selectedFinancialRatio,
  };
};

export { useScreenLogic };
