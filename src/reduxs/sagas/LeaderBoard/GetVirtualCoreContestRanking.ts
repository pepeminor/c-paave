// 1890 - contest
import APIList from 'config/api';
import { ILeaderBoardInvestingPeriod } from 'constants/enum';
import { IAction, IResponse } from 'interfaces/common';
import {
  ILeaderBoardVirtualCoreContestRankingParams,
  ILeaderBoardVirtualCoreContestRankingResponse,
} from 'interfaces/leaderBoard';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import { LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING } from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { query } from 'utils';
import { isEqual } from 'lodash';
import { pageSizeLeaderboard } from 'screens/LeaderBoard';

function* doGetVirtualCoreContestRanking(action: IAction<ILeaderBoardVirtualCoreContestRankingParams>) {
  try {
    const defaultParam = {
      pageNumber: action.payload.pageNumber || 0,
      pageSize: action.payload.pageSize || pageSizeLeaderboard,
      withCondition: action.payload.withCondition || false,
      period: action.payload.period || ILeaderBoardInvestingPeriod.WEEK,
    };
    const prevData: IResponse<ILeaderBoardVirtualCoreContestRankingResponse> = yield select(
      (state: IState) => state.getVirtualCoreContestRanking
    );
    const response: IResponse<ILeaderBoardVirtualCoreContestRankingResponse> = yield call(
      query,
      APIList.leaderBoardVirtualCoreContestRanking,
      {
        contestId: action.payload.contestId,
        ...defaultParam,
      }
    );

    const isLimit = response.data.investors.length < action.payload.pageSize || response.data.investors.length === 0;
    if (response.data == null) return;
    // check prevData first-time
    if (prevData.data !== null) {
      let newData = {};
      // handle check data duplicate
      if (isEqual(prevData.data.investors, response.data.investors)) {
        newData = {
          ...prevData.data,
          ...defaultParam,
          investors: [...prevData.data.investors],
        };
      } else {
        newData = {
          ...prevData.data,
          ...defaultParam,
          investors: [...prevData.data.investors, ...response.data.investors],
        };
      }

      // handle prevent load more when no-data in next pageNumber
      yield put({
        type: SUCCESS(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING),
        payload: newData,
      });
    } else {
      yield put({
        type: SUCCESS(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING),
        payload: {
          ...response.data,
          ...defaultParam,
          investors: [...response.data.investors],
        },
      });
      yield action.callBack?.handleSuccess?.(response);
    }

    response.data.isLimit = isLimit;
    yield action.callBack?.handleSuccess?.(response);
  } catch (err) {
    yield put({
      type: FAILURE(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING),
    });
  }
}

export default function* watchGetVirtualCoreContestRanking() {
  yield takeLatest(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING, doGetVirtualCoreContestRanking);
}
