// 1890 - contest
import APIList from 'config/api';
import { ILeaderBoardInvestingPeriod } from 'constants/enum';
import { IAction, IResponse } from 'interfaces/common';
import {
  ILeaderBoardVirtualCoreContestListedParams,
  ILeaderBoardVirtualCoreContestListedResponse,
} from 'interfaces/leaderBoard';
import { isNumber } from 'lodash';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import { LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_LISTED } from 'reduxs/actions';
import { getLeaderBoardVirtualCoreContestRanking } from 'reduxs/global-actions';
import { IState } from 'reduxs/global-reducers';
import { pageSizeLeaderboard } from 'screens/LeaderBoard';
import { query } from 'utils';

// only call when not join any contest
function* doGetVirtualCoreContesListed(action: IAction<ILeaderBoardVirtualCoreContestListedParams>) {
  try {
    const response: IResponse<ILeaderBoardVirtualCoreContestListedResponse[]> = yield call(
      query,
      APIList.leaderBoardVirtualCoreContestListed,
      {
        status: action.payload.status,
      }
    );

    yield put({
      type: SUCCESS(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_LISTED),
      payload: response.data,
    });

    // check any contest in progress
    if (response.data.length > 0) {
      yield put(
        getLeaderBoardVirtualCoreContestRanking({
          contestId: response.data[0].contestId,
          pageNumber: 0,
          pageSize: pageSizeLeaderboard,
          withCondition: false,
          period: ILeaderBoardInvestingPeriod.WEEK,
        })
      );
    } else {
      const contestId: number = yield select((state: IState) => state.contests?.subMenu.contestId);
      if (isNumber(contestId)) {
        yield put(
          getLeaderBoardVirtualCoreContestRanking({
            contestId: contestId,
            pageNumber: 0,
            pageSize: pageSizeLeaderboard,
            withCondition: false,
            period: ILeaderBoardInvestingPeriod.WEEK,
          })
        );
      }
    }
  } catch (err) {
    yield put({
      type: FAILURE(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_LISTED),
    });
  }
}

export default function* watchGetVirtualCoreContestListed() {
  yield takeLatest(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_LISTED, doGetVirtualCoreContesListed);
}
