import { AppStateStatus } from 'constants/enum';
import useAppStateChange from 'hooks/useAppStateChange';
import { DependencyList, useCallback, useEffect, useRef } from 'react';

/**
 * useTimer hook is used to create a timer.
 * @param callback The callback function to be called when the timer is triggered.
 * @param time Total time in seconds.
 * @param deps The dependencies of the timer.
 * @param startOnFirstRender If true, the timer will start on the first render.
 *
 * @example
 * const [time, setTime] = useState(10);
 * useTimer(setTime, 10);
 */
export default function useTimer(
  callback: (currentTime: number) => void,
  time: number,
  deps: DependencyList = [],
  startOnFirstRender = true
) {
  const backgroundStartRef = useRef(new Date());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentTimeRef = useRef(time);
  const isFirstRender = useRef(true);

  const clearTimer = () => {
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    if (!startOnFirstRender && isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (appState.current !== AppStateStatus.ACTIVE && timerRef.current == null) {
      currentTimeRef.current = time;
      return;
    }
    setTimer(time);
    return clearTimer;
  }, deps);

  const setTimer = (newTime: number) => {
    if (timerRef.current != null) return;
    currentTimeRef.current = newTime;
    timerRef.current = setInterval(() => {
      currentTimeRef.current = currentTimeRef.current - 1;
      if (currentTimeRef.current <= 0) {
        clearTimer();
      }
      callback(currentTimeRef.current);
    }, 1000);
    callback(newTime);
  };

  const appState = useAppStateChange(
    useCallback((currentAppState, nextAppState) => {
      if (nextAppState === AppStateStatus.BACKGROUND) {
        backgroundStartRef.current = new Date();
        clearTimer();
      }
      if (currentAppState === AppStateStatus.BACKGROUND && nextAppState === AppStateStatus.ACTIVE) {
        const backgroundTime = (Number(new Date()) - Number(backgroundStartRef.current)) / 1000;
        setTimer(currentTimeRef.current - Math.round(backgroundTime));
      }
    }, [])
  );
}
