import { useRef, useEffect, useCallback } from 'react';

function useDebounceCallback(cb: any, delay = 200) {
  const timerId = useRef<NodeJS.Timeout>();
  const actionFn = useRef(cb);

  const cancel = useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
  }, []);

  const debounced = useCallback(
    function (...args) {
      cancel();
      timerId.current = setTimeout(() => actionFn.current(...args), delay);
    },
    [cancel, delay]
  );

  useEffect(() => {
    actionFn.current = cb;
  }, [cb]);

  useEffect(() => {
    return cancel;
  }, [cancel]);

  return [debounced, cancel];
}

export default useDebounceCallback;
