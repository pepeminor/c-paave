import useMounted from 'hooks/useMounted';
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

/**
 * useRefState hook is a combination of useRef and useState.
 * It returns a ref, a setState function and the current state.
 *
 * The ref is always updated with the current state.
 * The setState function can be used to update the state.
 * The state is optional and can be disabled by setting the isState parameter to false.
 *
 * @param initValue The initial value of the state.
 * @param isState If true, the state will be updated when the setState function is called.
 * @param blockIfUnmounted If true, the setState function will not update the state if the component is unmounted.
 *
 * @returns [ref, setState, state]
 *
 * @example
 * const [ref, setState, state] = useRefState(0);
 *
 * function increment() {
 *  setState(state => state + 1);
 * }
 *
 * function printValue() {
 *  console.log(ref.current);
 * }
 *
 * useEffect(() => {
 *  // Callback on state change
 * }, [state]);
 */
export default function useRefState<T>(
  initValue: T,
  isState = true,
  blockIfUnmounted = true
): [React.MutableRefObject<T>, Dispatch<SetStateAction<T>>, T] {
  const [reactState, setReactState] = useState(initValue);
  const ref = useRef(reactState);
  const mounted = useMounted();

  const setState = useCallback(arg => {
    if (!mounted.current && blockIfUnmounted) return;
    ref.current = typeof arg === 'function' ? arg(ref.current) : arg;
    isState && setReactState(arg);
  }, []);

  return [ref, setState, reactState];
}
