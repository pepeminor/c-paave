import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useRef } from 'react';
import { IProps } from './TemplateName.type';

const initializeState = {};

const useTemplateNameLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state] = useMergingState(initializeState, propsRef);

  const handlers = useHandlers({});

  return {
    state,
    handlers,
  };
};

export { useTemplateNameLogic };
