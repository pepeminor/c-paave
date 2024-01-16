import { IState } from 'reduxs/global-reducers';
import { store } from 'screens/App';

export function waitForNextData<T>(
  valueGetter: (state: IState) => T,
  timeout: number,
  filter: (newValue: T, currentValue: T) => boolean
): Promise<T> {
  return new Promise<T>((resolve: (v: T) => void, reject: (e: unknown | any) => void) => {
    const currentValue: T = valueGetter(store.getState());
    let unsubscribe: (() => void) | undefined = undefined;
    const timeoutHandler = setTimeout(function () {
      unsubscribe && unsubscribe();
      reject('TIME_OUT');
    }, timeout);

    unsubscribe = store.subscribe(() => {
      const newValue: T = valueGetter(store.getState());
      if (newValue != currentValue && filter(newValue, currentValue)) {
        clearTimeout(timeoutHandler);
        unsubscribe && unsubscribe();
        resolve(newValue);
      }
    });
  });
}
