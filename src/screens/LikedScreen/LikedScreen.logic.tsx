import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef } from 'react';
import { IProps } from './LikedScreen.type';

const initializeState = {};

const useLikedScreenLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state] = useMergingState(initializeState, propsRef);

  useEffect(() => {
    props.getLikedList({
      params: {
        postId: props.route.params.postId,
        isRefresh: true,
      },
    });
  }, []);

  const handlers = useHandlers({});

  return {
    state,
    handlers,
  };
};

export { useLikedScreenLogic };
