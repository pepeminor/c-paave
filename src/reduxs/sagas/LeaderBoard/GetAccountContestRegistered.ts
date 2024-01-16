import APIList from 'config/api';
import { IResponse } from 'interfaces/common';
import { IAccountContestRegistered } from 'interfaces/leaderBoard';
import { call, put, takeLatest } from 'redux-saga/effects';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import { LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED } from 'reduxs/actions';
import { query } from 'utils';

const queryAccountContestRegistered = () => {
  return query(APIList.leaderBoardContestAccountRegistered);
};

function* doGetAccountContest() {
  try {
    const response: IResponse<IAccountContestRegistered[]> = yield call(queryAccountContestRegistered);
    // case not joined yet
    if (response.data.length <= 1) {
      yield put({
        type: SUCCESS(LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED),
        payload: response.data[0].subAccount,
      });
    } else {
      // case joined
      yield put({
        type: SUCCESS(LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED),
        payload: response.data[1].subAccount,
      });
    }
  } catch (err) {
    yield put({
      type: FAILURE(LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED),
    });
  }
}

export default function* watchAccountContestRegistered() {
  yield takeLatest(LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED, doGetAccountContest);
}
