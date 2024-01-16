import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useRef } from 'react';
import { AppState, AppStateStatus as AppStateStatusRN } from 'react-native';

/**
 * Hook that calls a callback function when the app state changes
 *
 * @param onAppStateChange Callback function that is called when the app state changes
 * @param focusNeeded If true, the callback function will only be called when the screen is focused
 *
 * @returns The current app state
 *
 * @example
 *   useAppStateChange(
 *    useCallback((currentAppState, nextAppState) => {
 *      if (nextAppState === 'background') {
 *        // Do something when the app goes to the background
 *      }
 *      if (currentAppState.match(/inactive|background/) && nextAppState === 'active') {
 *        // Do something when the app comes back to the foreground
 *      }
 *     }, [])
 *   );
 */
export default function useAppStateChange(
  onAppStateChange: (appState: AppStateStatusRN, nextAppState: AppStateStatusRN) => void,
  focusNeeded = false
) {
  const appState = useRef(AppState.currentState);
  const isFocused = focusNeeded ? useIsFocused() : true;

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatusRN) => {
      onAppStateChange(appState.current, nextAppState);
      appState.current = nextAppState;
    },
    [onAppStateChange]
  );

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange, isFocused]);

  return appState;
}
