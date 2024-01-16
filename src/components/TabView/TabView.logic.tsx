import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useImperativeHandle, useRef } from 'react';
import { IProps, TabViewReactRef } from './TabView.type';
import { navigate } from 'utils';

const useTabViewLogic = (props: IProps, ref: TabViewReactRef) => {
  const { initScreen = 0 } = props;
  const initializeState = {
    index: initScreen,
  };
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state, setState] = useMergingState(initializeState, propsRef);

  const handlers = useHandlers({
    onSetIndex: (index: number) => {
      props.onChangeIndex?.(index);
      setState({
        index,
      });
    },
    goToUserInfo: () => {
      navigate({ key: 'UserInfo' });
    },
    onRefresh: () => {
      setState({ index: 0 });
      props.onChangeIndex?.(0);
    },
  });

  useImperativeHandle(ref, () => ({
    reset: handlers.onRefresh,
    setTab: handlers.onSetIndex,
  }));

  return {
    state,
    handlers,
  };
};

export { useTabViewLogic };
