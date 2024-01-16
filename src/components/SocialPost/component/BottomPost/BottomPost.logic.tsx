import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useRef } from 'react';
import { IProps } from './BottomPost.type';

const initializeState = {};

const useBottomPostLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state] = useMergingState(initializeState, propsRef);

  const handlers = useHandlers({
    onFavouritesPost: () => {
      propsRef.current.favouritesPost({
        postId: propsRef.current.postId,
      });
    },
    onPressComment: () => {
      propsRef.current.onPressComment?.();
    },
    onPressReblog: () => {
      propsRef.current.reblogPost({
        postId: propsRef.current.postId,
      });
    },
  });

  return {
    state,
    handlers,
  };
};

export { useBottomPostLogic };
