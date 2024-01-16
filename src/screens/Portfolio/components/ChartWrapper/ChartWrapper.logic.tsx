import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef } from 'react';
import { IProps } from './ChartWrapper.type';
import { ChartStyle } from 'constants/enum';
import { ACCOUNT_TYPE } from 'global';

const initializeState = {
  chartStyle: ChartStyle.LINE,
};

const useChartLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state, setState] = useMergingState(initializeState, propsRef);

  useEffect(() => {
    if (props.selectedAccount.type === ACCOUNT_TYPE.VIRTUAL) {
      handlers.changeChartStyle(ChartStyle.LINE2)();
    } else {
      handlers.changeChartStyle(ChartStyle.LINE)();
    }
  }, [props.selectedAccount]);

  const handlers = useHandlers({
    changeChartStyle: (chartStyle: ChartStyle) => () => {
      setState({
        chartStyle: chartStyle,
      });
    },
  });

  return {
    state,
    handlers,
  };
};

export { useChartLogic };
