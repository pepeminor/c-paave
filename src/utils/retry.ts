/* eslint-disable no-console */
import { call, delay } from 'redux-saga/effects';

const SECOND = 1000;
const MAX_RETRY_TIMES = 3;
const MAX_RETRY_SECOND = 30;

type RetrySagaOptions = {
  maxRetryTimes?: number;
  maxRetrySecond?: number;
  onRetry?: (retryTimes: number) => void;
  onFail?: () => void;
};

export function retrySaga<T, K>(
  fn: (param: T) => K,
  { maxRetryTimes, maxRetrySecond, onRetry, onFail }: RetrySagaOptions = {}
) {
  return function* (param: T) {
    let retryTimes = 0;
    while (true) {
      try {
        retryTimes++;
        return (yield call(fn, param)) as unknown as K;
      } catch (error) {
        if (retryTimes > (maxRetryTimes ?? MAX_RETRY_TIMES)) {
          __DEV__ && console.log(`Error in calling ${fn.name}`, error);
          yield onFail && call(onFail);
          return null;
        }
        yield onRetry && call(onRetry, retryTimes);
        yield delay(getWaitingSeconds(retryTimes, maxRetrySecond) * SECOND);
        __DEV__ && console.log(`Retry ${fn.name} ${retryTimes} times`);
      }
    }
  };
}

function getWaitingSeconds(retryTimes: number, maxRetrySecond?: number) {
  return Math.min(Math.pow(2, retryTimes + 1) + randInt(-retryTimes, retryTimes), maxRetrySecond ?? MAX_RETRY_SECOND);
}

const randInt = (min = -30, max = 30) => Math.floor(Math.random() * (max - min + 1) + min);
