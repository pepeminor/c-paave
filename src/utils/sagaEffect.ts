/* eslint-disable no-console */
import { ActionPattern } from '@redux-saga/types';
import { ForkEffect, fork, take, call } from '@redux-saga/core/effects';

/**
 * This function is similar to takeEvery. One thing difference is: it will wait for the function to complete then process the next one.
 * @param pattern
 * @param worker
 * @param args
 * @returns
 */
export function takeEverySequential<P extends ActionPattern>(
  pattern: P,
  worker: (...args: any[]) => any,
  args: any[] = []
): ForkEffect<never> {
  return fork(function* () {
    let isRunning = false;
    let queue: any[] = [];
    while (true) {
      const action: any = yield take(pattern);
      if (isRunning) {
        queue.push(action);
        if (__DEV__) {
          console.log('queueing', action);
        }
      } else {
        isRunning = true;
        const finishCallback = () => {
          isRunning = false;
          queue = [];
        };
        if (__DEV__) {
          console.log(new Date(), 'processing', action.payload.version);
        }
        yield fork(run, finishCallback, queue, worker, action, args);
      }
    }
  });
}

function* run(
  finishCallback: () => void,
  queue: any[],
  worker: (...args: any[]) => any,
  action: any,
  args: any[] = []
) {
  try {
    yield call(worker, ...args.concat(action));
    let index = 0;
    while (index < queue.length) {
      yield call(worker, ...args.concat(queue[index]));
      if (__DEV__) {
        console.log(new Date(), 'processing from queue', queue[index].payload.version);
      }
      index++;
    }
  } finally {
    if (__DEV__) {
      console.log(new Date(), 'finish process', action.payload.version, queue.length);
    }
    finishCallback();
  }
}
