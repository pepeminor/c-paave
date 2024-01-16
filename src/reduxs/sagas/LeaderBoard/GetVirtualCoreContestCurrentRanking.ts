// 1890 - contest
import APIList from 'config/api';
import { ACCOUNT_TYPE } from 'global';
import { IAction, IResponse } from 'interfaces/common';
import {
  ILeaderBoardVirtualCoreContestCurrentRankingParams,
  ILeaderBoardVirtualCoreContestCurrentRankingResponse,
} from 'interfaces/leaderBoard';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import { LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING } from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { query } from 'utils';

function* doGetVirtualCoreContestCurrentRanking(action: IAction<ILeaderBoardVirtualCoreContestCurrentRankingParams>) {
  try {
    const isAccountDemo: ACCOUNT_TYPE = yield select(
      (state: IState) => state.selectedAccount.type === ACCOUNT_TYPE.DEMO
    );
    if (isAccountDemo) return;

    const response: IResponse<ILeaderBoardVirtualCoreContestCurrentRankingResponse[]> = yield call(
      query,
      APIList.leaderBoardVirtualCoreContestCurrentRanking,
      action.payload
    );
    yield put({
      type: SUCCESS(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING),
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: FAILURE(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING),
    });
  }
}

export default function* watchGetVirtualCoreContestCurrentRanking() {
  yield takeLatest(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING, doGetVirtualCoreContestCurrentRanking);
}
