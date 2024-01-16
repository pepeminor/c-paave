/* eslint-disable @typescript-eslint/no-empty-function */
import { useRef } from 'react';

/**
 * Hook that calls a callback function only once
 * @param callBack Callback function that is called only once
 * @returns void
 * @example
 *  useConstructor(() => {
 *   // Do something
 *  });
 */
const useConstructor = (callBack = () => {}) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
};

export default useConstructor;
