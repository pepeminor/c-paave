import APIList from 'config/api';
import { IResponse } from 'interfaces/common';
import { ILeaderboardSettingResponse } from 'interfaces/leaderBoard';
import { call, put, takeLatest } from 'redux-saga/effects';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import { LEADER_BOARD_SETTING } from 'reduxs/actions';
import { query } from 'utils';

const queryAccountContestRegistered = () => {
  return query(APIList.leaderBoardSetting, {
    partnerId: 'kis',
  });
};

function* doGetLeaderboardSetting() {
  try {
    const response: IResponse<ILeaderboardSettingResponse> = yield call(queryAccountContestRegistered);
    // case not joined yet
    if (response.data) {
      yield put({
        type: SUCCESS(LEADER_BOARD_SETTING),
        payload: response.data,
      });
    }
  } catch (err) {
    yield put({
      type: FAILURE(LEADER_BOARD_SETTING),
    });
  }
}

export default function* watchAccountContestRegistered() {
  yield takeLatest(LEADER_BOARD_SETTING, doGetLeaderboardSetting);
}
