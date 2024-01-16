import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { StockThemeActions, StockThemeSelector, SymbolDataAction, ThemePeriod } from 'reduxs';
import { useTypedSelector } from 'hooks/useAppSelector';
import { SortType } from 'components/StockTheme/StockTheme.type';
import { usePagination } from 'hooks';
import { TodayMovementProps } from './type';
import { store } from 'screens/App';
import { getSessionBasedValue } from 'utils';

const useTodayMovementLogic = ({ themeName, ...props }: TodayMovementProps) => {
  const initializeState = {
    sortName: undefined as SortType,
    sortRate: undefined as SortType,
    sortPrice: undefined as SortType,
    sortedStocks: [] as string[],
    refreshing: false,
  };
  const period = useTypedSelector(state => props.period ?? state.StockThemeReducer.period);
  const themeData = useTypedSelector(StockThemeSelector.selectThemeMapData(themeName, period));
  const themeChangeRate = useTypedSelector(StockThemeSelector.selectThemeChangeRate(themeName, period));
  const propsRef = useRef({
    ...props,
    ...initializeState,
    themeData,
    period,
  });
  propsRef.current = { ...propsRef.current, ...props, themeData, period };
  const [state, setState] = useMergingState(initializeState, propsRef);

  const { paginatedData, nextPage, resetPage } = usePagination(state.sortedStocks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      StockThemeActions.getThemeDetail({
        payload: { themeCode: themeData.themeCode, themeName, period },
        callBack: {
          handleSuccess: (data: string[]) => {
            setState({ sortedStocks: data });
            handlers.onSortRatePressed('DESC');
          },
        },
      })
    );
    resetPage();
  }, [themeName, period]);

  const handlers = useHandlers({
    onSortNamePressed: (value: SortType) => {
      resetPage();
      const stockList = propsRef.current.themeData.stockList ?? [];
      if (value == null) {
        setState({
          sortName: undefined,
          sortRate: undefined,
          sortPrice: undefined,
          sortedStocks: stockList,
        });
        return;
      }
      const sortedThemeList = [...stockList].sort((a, b) =>
        value === 'ASC' ? a.localeCompare(b) : b.localeCompare(a)
      );
      setState({
        sortName: value,
        sortRate: undefined,
        sortPrice: undefined,
        sortedStocks: sortedThemeList,
      });
    },
    onSortRatePressed: (value: SortType) => {
      resetPage();
      const stockList = propsRef.current.themeData.stockList ?? [];
      if (value == null) {
        setState({
          sortName: undefined,
          sortRate: undefined,
          sortPrice: undefined,
          sortedStocks: stockList,
        });
        return;
      }
      if (propsRef.current.period !== '1D') {
        dispatch(
          StockThemeActions.getThemeRatioDetail({
            payload: {
              themeCode: propsRef.current.themeData.themeCode,
              themeName: propsRef.current.themeData.themeName,
              period: propsRef.current.period,
            },
            callBack: {
              handleSuccess(stockData) {
                setState({
                  sortedStocks: [...stockList].sort((a, b) =>
                    value === 'ASC' ? stockData[a]?.rate - stockData[b]?.rate : stockData[b]?.rate - stockData[a]?.rate
                  ),
                  sortName: undefined,
                  sortRate: value,
                  sortPrice: undefined,
                });
              },
            },
          })
        );
        return;
      }
      dispatch(
        SymbolDataAction.getSymbolLatestTakeLatest({
          payload: stockList,
          callBack: {
            handleSuccess() {
              const realTimeData = store.getState().SymbolData.mergeSymbolMap;
              const getSymbolChange = (symbol: string) =>
                getSessionBasedValue(
                  realTimeData[symbol]?.session?.match(/^(ATO|ATC)$/) != null,
                  realTimeData[symbol]?.expectedRate,
                  realTimeData[symbol]?.changeRate
                );
              const compareChange = (a: string, b: string) => getSymbolChange(a) - getSymbolChange(b);
              setState({
                sortedStocks: [...stockList].sort((a, b) =>
                  value === 'ASC' ? compareChange(a, b) : compareChange(b, a)
                ),
                sortName: undefined,
                sortRate: value,
                sortPrice: undefined,
              });
            },
          },
        })
      );
    },
    onSortPricePressed: (value: SortType) => {
      resetPage();
      const stockList = propsRef.current.themeData.stockList ?? [];
      if (value == null) {
        setState({
          sortName: undefined,
          sortRate: undefined,
          sortPrice: undefined,
          sortedStocks: stockList,
        });
        return;
      }
      dispatch(
        SymbolDataAction.getSymbolLatestTakeLatest({
          payload: stockList,
          callBack: {
            handleSuccess() {
              const realTimeData = store.getState().SymbolData.mergeSymbolMap;
              const getSymbolPrice = (symbol: string) => realTimeData[symbol]?.currentPrice ?? 0;
              const comparePrice = (a: string, b: string) => getSymbolPrice(a) - getSymbolPrice(b);
              setState({
                sortedStocks: [...stockList].sort((a, b) =>
                  value === 'ASC' ? comparePrice(a, b) : comparePrice(b, a)
                ),
                sortName: undefined,
                sortRate: undefined,
                sortPrice: value,
              });
            },
          },
        })
      );
    },
    onRefresh: () => {
      resetPage();
      setState({ refreshing: true });
      dispatch(
        StockThemeActions.getThemeDetail({
          payload: { themeCode: propsRef.current.themeData.themeCode, themeName, period: propsRef.current.period },
          callBack: {
            handleSuccess: (data: string[]) => {
              setState({ sortedStocks: data, refreshing: false });
              handlers.onSortRatePressed('DESC');
            },
          },
        })
      );
    },
    onEndReached: () => {
      nextPage();
    },
    setThemePeriod: (value: ThemePeriod) => {
      resetPage();
      dispatch(
        StockThemeActions.getThemeList({
          payload: {
            sortAsc: false,
            period: value,
          },
        })
      );
      dispatch(StockThemeActions.updatePeriod(value));
    },
  });

  return {
    state,
    handlers,
    themeData,
    themeChangeRate,
    paginatedData,
    period,
  };
};

export { useTodayMovementLogic };
