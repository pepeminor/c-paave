import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useMemo, useRef } from 'react';
import { IProps } from './PriceBoard.type';
import { SymbolDataAction } from 'reduxs/SymbolData';
import { useAppSelector, useTypedSelector } from 'hooks/useAppSelector';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import { useDispatch } from 'react-redux';
import { SelectPriceBoardSymbolList } from './PriceBoard.helper';
import { store } from 'screens/App';

const initializeState = {
  listSymbol: [] as string[],
  startRenderIndex: 0,
  endRenderIndex: 15,
  isSorting: false,
};

const usePriceBoardLogic = (props: IProps) => {
  const dispatch = useDispatch();
  const propsRef = useRef({
    ...props,
    ...initializeState,
    unFilteredListSymbol: [] as string[],
  });

  const marketData = useTypedSelector(state => state.SymbolData.marketData);
  const indexStockList = useTypedSelector(state => state.SymbolData.indexStockList);
  const {
    selectedList,
    // Filter
    filterSymbol,
    filterPrice,
    filterChange,
    filterVolume,
    // Value type
    priceChangeType,
    totalType,
  } = useAppSelector(state => state.PriceBoardReducer);

  const [state, setState] = useMergingState(initializeState, propsRef);
  const unFilteredListSymbol = useMemo(
    () => SelectPriceBoardSymbolList(selectedList, marketData, indexStockList),
    [selectedList, marketData, indexStockList]
  );

  useEffect(() => {
    if (!filterSymbol && !filterPrice && !filterChange && !filterVolume) {
      setState({ listSymbol: unFilteredListSymbol });
      return;
    }
    if (filterSymbol) {
      setState({
        listSymbol: [...unFilteredListSymbol].sort((a, b) =>
          filterSymbol === 'ASC' ? a.localeCompare(b) : b.localeCompare(a)
        ),
      });
      return;
    }
    if (filterPrice) {
      dispatch(
        SymbolDataAction.getSymbolLatestTakeLatest({
          payload: unFilteredListSymbol,
          callBack: {
            handleSuccess() {
              const realTimeData = store.getState().SymbolData.mergeSymbolMap;
              const getSymbolPrice = (symbol: string) => realTimeData[symbol]?.currentPrice ?? 0;
              const comparePrice = (a: string, b: string) => getSymbolPrice(a) - getSymbolPrice(b);
              setState({
                listSymbol: [...unFilteredListSymbol].sort((a, b) =>
                  filterPrice === 'ASC' ? comparePrice(a, b) : comparePrice(b, a)
                ),
                isSorting: false,
              });
            },
          },
        })
      );
      return;
    }
    if (filterChange) {
      dispatch(
        SymbolDataAction.getSymbolLatestTakeLatest({
          payload: unFilteredListSymbol,
          callBack: {
            handleSuccess() {
              const realTimeData = store.getState().SymbolData.mergeSymbolMap;
              const getSymbolChange = (symbol: string) =>
                realTimeData[symbol]?.[priceChangeType === 'Percent' ? 'changeRate' : 'changePrice'] ?? 0;
              const compareChange = (a: string, b: string) => getSymbolChange(a) - getSymbolChange(b);
              setState({
                listSymbol: [...unFilteredListSymbol].sort((a, b) =>
                  filterChange === 'ASC' ? compareChange(a, b) : compareChange(b, a)
                ),
                isSorting: false,
              });
            },
          },
        })
      );
      return;
    }
    if (filterVolume) {
      dispatch(
        SymbolDataAction.getSymbolLatestTakeLatest({
          payload: unFilteredListSymbol,
          callBack: {
            handleSuccess() {
              const realTimeData = store.getState().SymbolData.mergeSymbolMap;
              const getSymbolVolume = (symbol: string) =>
                realTimeData[symbol]?.[totalType === 'Volume' ? 'tradingVolume' : 'tradingValue'] ?? 0;
              const compareVolume = (a: string, b: string) => getSymbolVolume(a) - getSymbolVolume(b);
              setState({
                listSymbol: [...unFilteredListSymbol].sort((a, b) =>
                  filterVolume === 'ASC' ? compareVolume(a, b) : compareVolume(b, a)
                ),
                isSorting: false,
              });
            },
          },
        })
      );
    }
  }, [unFilteredListSymbol, filterSymbol, filterPrice, filterChange, filterVolume, totalType, priceChangeType]);
  propsRef.current = { ...propsRef.current, ...props, unFilteredListSymbol };

  useSubscribeSymbol(
    state.listSymbol.slice(state.startRenderIndex, state.endRenderIndex),
    ['BID_OFFER', 'QUOTE'],
    true
  );

  const handlers = useHandlers({
    setRenderRange: (value: { startIndex: number; endIndex: number }) => {
      setState({ startRenderIndex: value.startIndex, endRenderIndex: value.endIndex });
    },
  });

  return {
    state,
    handlers,
    priceChangeType,
    totalType,
  };
};

export { usePriceBoardLogic };
