import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useMemo, useRef } from 'react';
import { IProps, SortType } from './StockTheme.type';
import { useDispatch } from 'react-redux';
import { StockThemeActions, ThemePeriod, ThemeSubscribeHelper } from 'reduxs';
import { useTypedSelector } from 'hooks/useAppSelector';
import { isEqual } from 'lodash';
import useMemoizedParams from 'hooks/useMemoizedParams';
import { t } from 'i18next';
import { usePagination } from 'hooks';

const initializeState = {
  sortName: undefined as SortType,
  sortRate: 'DESC' as SortType,
  basedThemeList: [] as string[],
  sortedThemeList: [] as string[],
  refreshing: false,
};

const useScreenLogic = (props: IProps) => {
  const period = useTypedSelector(state => state.StockThemeReducer.period);
  const themeData = useTypedSelector(state => state.StockThemeReducer[period].themeMap);
  const themeList = Object.keys(themeData);
  const memoizedThemeList = useMemoizedParams(themeList);

  const propsRef = useRef({
    ...props,
    ...initializeState,
    themeData,
  });
  propsRef.current = { ...propsRef.current, ...props, themeData };
  const [state, setState] = useMergingState(initializeState, propsRef);

  const showData = useMemo(
    () => (props.limit ? state.sortedThemeList.slice(0, props.limit) : state.sortedThemeList),
    [state.sortedThemeList, props.limit]
  );

  const { paginatedData, nextPage, resetPage } = usePagination(showData, 20);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      StockThemeActions.getThemeList({
        payload: {
          sortAsc: false,
          period,
        },
      })
    );
  }, [period]);

  useEffect(() => {
    ThemeSubscribeHelper.subscribe();
    return ThemeSubscribeHelper.unsubscribe;
  }, [memoizedThemeList]);

  const basedThemeListRef = useRef(propsRef.current.basedThemeList);
  useEffect(() => {
    if (!isEqual(basedThemeListRef.current, Object.keys(themeData))) {
      basedThemeListRef.current = Object.keys(themeData);
      setState({
        basedThemeList: basedThemeListRef.current,
        sortedThemeList: basedThemeListRef.current,
        sortName: undefined,
        sortRate: 'DESC',
      });
    }
    resetPage();
  }, [themeData]);

  const handlers = useHandlers({
    onSortNamePressed: (value: SortType) => {
      resetPage();
      if (value == null) {
        setState({ sortName: undefined, sortRate: undefined, sortedThemeList: propsRef.current.basedThemeList });
        return;
      }
      const sortedThemeList = [...propsRef.current.basedThemeList].sort((a, b) =>
        value === 'ASC' ? t(a).localeCompare(t(b)) : t(b).localeCompare(t(a))
      );
      setState({ sortName: value, sortRate: undefined, sortedThemeList });
    },
    onSortRatePressed: (value: SortType) => {
      resetPage();
      if (value == null) {
        setState({ sortName: undefined, sortRate: undefined, sortedThemeList: propsRef.current.basedThemeList });
        return;
      }
      const sortedThemeList = [...propsRef.current.basedThemeList].sort((a, b) =>
        value === 'ASC'
          ? propsRef.current.themeData[a].themeChangeRate - propsRef.current.themeData[b].themeChangeRate
          : propsRef.current.themeData[b].themeChangeRate - propsRef.current.themeData[a].themeChangeRate
      );
      setState({ sortRate: value, sortName: undefined, sortedThemeList });
    },
    onRefresh: () => {
      resetPage();
      setState({ refreshing: true });
      dispatch(
        StockThemeActions.getThemeList({
          payload: {
            sortAsc: false,
          },
          callBack: {
            handleSuccess: () => {
              setState({ refreshing: false });
            },
          },
        })
      );
      dispatch(StockThemeActions.updatePeriod('1D'));
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
    onEndReached: () => {
      nextPage();
    },
  });

  return {
    state,
    handlers,
    period,
    paginatedData,
  };
};

export { useScreenLogic };
