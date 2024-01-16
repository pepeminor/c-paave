import { Action } from 'redux';
import { followAdvisor, unFollowAdvisor } from '../Advisor.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import APIList from 'config/api';
import { query, FulfilledRequestError } from 'utils';
import { ERROR } from 'constants/error';

function* UnFollowAdvisor(action: Action) {
  if (!unFollowAdvisor.match(action)) return;
  try {
    yield call(query, APIList.unFollowAdvisor, {
      followedId: action.payload,
    });
    yield put({
      type: followAdvisor.fulfilled,
      payload: {
        [action.payload]: false,
      },
    });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('UnFollowAdvisorError', error);
    if (error instanceof FulfilledRequestError) {
      if (error.data.code === ERROR.ACCOUNT_NOT_IN_FOLLOWING_LIST) {
        // Ignore this error and update reducer
        yield put({
          type: followAdvisor.fulfilled,
          payload: {
            [action.payload]: false,
          },
        });
        yield action.meta.callBack?.handleSuccess?.();
      }
    }
  }
}

export default function* watchUnFollowAdvisor() {
  yield takeEvery(unFollowAdvisor.type, UnFollowAdvisor);
}
