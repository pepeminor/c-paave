import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useRef } from 'react';
import { IProps } from './Videos.type';
import { VideoTab } from 'reduxs';

const initializeState = {
  tab: 'FULL_VIDEO' as VideoTab,
};

const useVideosLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state, setState] = useMergingState(initializeState, propsRef);

  const handlers = useHandlers({
    setTab: (tab: VideoTab) => {
      setState({ tab });
    },
    onLoadMore: () => {
      props.getVideosListRequest(propsRef.current.tab);
    },
  });

  return {
    state,
    handlers,
  };
};

export { useVideosLogic };
