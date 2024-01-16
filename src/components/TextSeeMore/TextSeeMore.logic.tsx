import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useRef } from 'react';
import { IProps } from './TextSeeMore.type';
import { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';

const initializeState = {
  showFullText: false,
  textLines: 0,
};

const useTextSeeMoreLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state, setState] = useMergingState(initializeState, propsRef);

  const handlers = useHandlers({
    onShowFullText: () => {
      if (propsRef.current.textLines > 5) {
        setState({
          showFullText: !propsRef.current.showFullText,
        });
      }
    },
    onTextLayout: (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      setState({
        textLines: event.nativeEvent.lines.length,
      });
    },
  });

  return {
    state,
    handlers,
  };
};

export { useTextSeeMoreLogic };
