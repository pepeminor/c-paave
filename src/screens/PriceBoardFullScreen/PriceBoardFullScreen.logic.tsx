import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useMemo, useRef } from 'react';
import { IProps, MarketCategoriesLiteral } from './PriceBoardFullScreen.type';
import { FlatList } from 'react-native';
import { PriceChangeType, TotalType } from 'screens/Discover/PriceBoard/PriceBoard.type';
import { useTypedSelector } from 'hooks/useAppSelector';
import { SelectPriceBoardSymbolList } from 'screens/Discover/PriceBoard/PriceBoard.helper';

const usePriceBoardFullScreenLogic = (props: IProps) => {
  const initializeState = {
    selectedList: props.route.params.selectedList,
    startRenderIndex: 0,
    endRenderIndex: 15,
    priceChangeType: 'Percent' as PriceChangeType,
    totalType: 'Volume' as TotalType,
    navigationDone: false,
  };

  const propsRef = useRef({
    ...props,
    ...initializeState,
    symbolList: [] as string[],
  });
  const flatListRef = useRef<FlatList>(null);

  const marketData = useTypedSelector(state => state.SymbolData.marketData);
  const indexStockList = useTypedSelector(state => state.SymbolData.indexStockList);

  const [state, setState] = useMergingState(initializeState, propsRef);
  const symbolList = useMemo(
    () => SelectPriceBoardSymbolList(state.selectedList, marketData, indexStockList),
    [state.selectedList, marketData, indexStockList]
  );
  propsRef.current = { ...propsRef.current, ...props, symbolList };

  useEffect(() => {
    // Prevent render FlatList when navigating to this screen
    setTimeout(() => {
      setState({ navigationDone: true });
    }, 300);
  }, []);

  const handlers = useHandlers({
    setSelectedList: (value: MarketCategoriesLiteral) => {
      setState({
        selectedList: value,
        startRenderIndex: 0,
        endRenderIndex: 15,
      });
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    },
    togglePriceChangeType: () => {
      setState(s => ({ priceChangeType: s.priceChangeType === 'Percent' ? 'Value' : 'Percent' }));
    },
    toggleTotalType: () => {
      setState(s => ({ totalType: s.totalType === 'Volume' ? 'Value' : 'Volume' }));
    },
    setRenderRange: (value: { startIndex: number; endIndex: number }) => {
      setState({ startRenderIndex: value.startIndex, endRenderIndex: value.endIndex });
    },
  });

  return {
    state,
    handlers,
    symbolList,
    flatListRef,
  };
};

export { usePriceBoardFullScreenLogic };
