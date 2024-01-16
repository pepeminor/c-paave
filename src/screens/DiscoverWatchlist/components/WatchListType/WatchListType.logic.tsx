import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useRef } from 'react';
import { IProps, WATCH_LIST_TYPE } from './WatchListType.type';

export const listType = [
  {
    index: 0,
    type: WATCH_LIST_TYPE.PRICE,
    name: 'Last',
  },
  {
    index: 1,
    type: WATCH_LIST_TYPE.TRADING_VOLUME,
    name: 'KLGD',
  },
  {
    index: 2,
    type: WATCH_LIST_TYPE.FOREIGNER_VOLUME,
    name: 'Foreigner',
  },
];

const initializeState = {};

const useWatchListTypeLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state, setState] = useMergingState(initializeState, propsRef);

  const handlers = useHandlers({
    changeType: () => {
      const index = propsRef.current.watchListType.index;
      if (index === listType.length - 1) {
        setState({
          watchListType: listType[0],
        });
        return;
      }
      setState({
        watchListType: listType[index],
      });
    },
  });

  return {
    state,
    handlers,
    listType,
  };
};

export { useWatchListTypeLogic };
