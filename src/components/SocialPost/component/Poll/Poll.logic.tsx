import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useRef } from 'react';
import { IProps } from './Poll.type';

const initializeState = {};

const usePollLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state] = useMergingState(initializeState, propsRef);

  const handlers = useHandlers({
    votePoll: (data: { optionId: string; index: number }) => () => {
      propsRef.current.votePoll({
        params: {
          pollId: data.optionId,
          choices: [data.index],
        },
        postId: propsRef.current.postId,
      });
    },
  });

  return {
    state,
    handlers,
  };
};

export { usePollLogic };
