// 1890 - contest
import APIList from 'config/api';
import { IResponse } from 'interfaces/common';
import { ILeaderBoardVirtualCoreContestResponse } from 'interfaces/leaderBoard';
import { call, put, takeLatest } from 'redux-saga/effects';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import { LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST } from 'reduxs/actions';
import { query } from 'utils';

const queryVirtualCoreContest = () => {
  return query(APIList.leaderBoardVirtualCoreContest);
};

function* doGetVirtualCoreContest() {
  try {
    const response: IResponse<ILeaderBoardVirtualCoreContestResponse[]> = yield call(queryVirtualCoreContest);
    yield put({
      type: SUCCESS(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST),
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: FAILURE(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST),
    });
  }
}

export default function* watchGetVirtualCoreContest() {
  yield takeLatest(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST, doGetVirtualCoreContest);
}
