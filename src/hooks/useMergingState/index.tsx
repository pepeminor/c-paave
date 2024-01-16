import { MutableRefObject, useRef, useState } from 'react';

// tslint:disable-next-line:only-arrow-functions
export default function useMergingState<T, K>(
  initialState: T,
  propsRef?: MutableRefObject<K>
): [T, (p: Partial<T> | ((prevState: T) => Partial<T>)) => void, MutableRefObject<T>] {
  const [state, setState] = useState<T>(() => {
    if (propsRef) {
      propsRef.current = { ...propsRef.current, ...initialState };
    }
    return initialState;
  });
  const ref = useRef(state);

  const setMergeState = (newState: Partial<T> | ((prevState: T) => Partial<T>)) => {
    ref.current = { ...ref.current, ...(typeof newState === 'function' ? newState(ref.current) : newState) };
    if (propsRef) {
      propsRef.current = { ...propsRef.current, ...ref.current };
    }
    setState(ref.current);
  };

  return [state, setMergeState, ref];
}
