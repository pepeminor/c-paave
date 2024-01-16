import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef } from 'react';
import { IProps } from './Videos.type';
import { navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
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

  useEffect(() => {
    props.getVideosListRequest('FULL_VIDEO');
    props.getVideosListRequest('SHORT_VIDEO');
    props.getVideosListRequest('EDUCATION');
  }, []);

  const handlers = useHandlers({
    setTab: (tab: VideoTab) => {
      setState({ tab });
    },
    onNavigateVideoList: () => {
      navigate({ key: ScreenNames.VideosDetailScreen });
    },
  });

  return {
    state,
    handlers,
  };
};

export { useVideosLogic };
