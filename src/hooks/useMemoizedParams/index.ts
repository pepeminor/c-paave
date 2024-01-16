import { isEqual } from 'lodash';
import { useRef } from 'react';

/**
 * Hook to memoize a value. Useful for memoizing params/props
 *
 * @param value Value to memoize
 * @param compareFn Function to compare values. Defaults to lodash's isEqual
 * @returns Memoized value
 */
export default function useMemoizedParams<T>(value: T, compareFn?: (a: T, b: T) => boolean) {
  const paramsRef = useRef<T>(value);
  if (!(compareFn ?? isEqual)(paramsRef.current, value)) {
    paramsRef.current = value;
  }
  return paramsRef.current;
}
