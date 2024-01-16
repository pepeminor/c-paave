import { Action } from 'redux';
import { followAdvisor } from '../Advisor.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import APIList from 'config/api';
import { FulfilledRequestError, query } from 'utils';
import { ERROR } from 'constants/error';

function* FollowAdvisor(action: Action) {
  if (!followAdvisor.match(action)) return;
  try {
    yield call(query, APIList.followAdvisor, {
      followedId: action.payload,
      type: 'ROBO_ADVISOR',
    });
    yield put({
      type: followAdvisor.fulfilled,
      payload: {
        [action.payload]: true,
      },
    });
    yield action.meta.callBack?.handleSuccess?.();
  } catch (error: any) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('FollowAdvisor error', error);
    if (error instanceof FulfilledRequestError) {
      if (error.data.code === ERROR.FOLLOWED_ID_IS_BEING_FOLLOWED) {
        // if followedId is being followed, we will ignore this error and update reducer
        yield put({
          type: followAdvisor.fulfilled,
          payload: {
            [action.payload]: true,
          },
        });
        yield action.meta.callBack?.handleSuccess?.();
      }
    }
  }
}

export default function* watchFollowAdvisor() {
  yield takeEvery(followAdvisor.type, FollowAdvisor);
}
