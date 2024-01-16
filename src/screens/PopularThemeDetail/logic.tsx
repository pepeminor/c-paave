import { StockThemeActions, StockThemeSelector } from 'reduxs';
import { useTypedSelector } from 'hooks/useAppSelector';
import { StackScreenProps } from 'screens/RootNavigation';
import { ThemeDetailTab } from './type';
import { useEffect, useRef } from 'react';
import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useDispatch } from 'react-redux';

const useScreenLogic = (props: StackScreenProps<'PopularThemeDetail'>) => {
  const { themeName } = props.route.params;
  const initializeState = {
    tab: 'TodayMovement' as ThemeDetailTab,
  };

  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state, setState] = useMergingState(initializeState, propsRef);
  const dispatch = useDispatch();

  const period = useTypedSelector(state => props.route.params.period ?? state.StockThemeReducer.period);
  const themeCode = useTypedSelector(state => StockThemeSelector.selectThemeMapData(themeName)(state)?.themeCode);

  useEffect(() => {
    dispatch(
      StockThemeActions.getThemeRatioDetail({
        payload: {
          themeCode,
          themeName,
          period,
        },
      })
    );
  }, [themeCode, period]);

  const handlers = useHandlers({
    onTabPressed: (tab: ThemeDetailTab) => {
      setState({ tab });
    },
  });

  return {
    state,
    handlers,
    period,
    themeCode,
  };
};

export { useScreenLogic };
