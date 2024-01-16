import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useRef } from 'react';
import { IProps, SelectorData } from './OptionSelector.type';

const initializeState = {};

const useOptionSelectorLogic = <T extends SelectorData>(props: IProps<T>) => {
  const [state] = useMergingState(initializeState);

  const propsRefJson = {
    ...props,
    ...state,
  };

  const propsRef = useRef(propsRefJson);
  propsRef.current = propsRefJson;

  const handlers = useHandlers({});

  return {
    state,
    handlers,
  };
};

export { useOptionSelectorLogic };
