import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import {
  ILeaderBoardVirtualCoreContestCurrentRankingParams,
  ILeaderBoardVirtualCoreContestCurrentRankingResponse,
} from 'interfaces/leaderBoard';
import { call, put, takeLatest } from 'redux-saga/effects';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import { PORTFOLIO_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING } from 'reduxs/actions';
import { query } from 'utils';

function* doGetContestCurrentRankingPortfolio(action: IAction<ILeaderBoardVirtualCoreContestCurrentRankingParams>) {
  try {
    const response: IResponse<ILeaderBoardVirtualCoreContestCurrentRankingResponse[]> = yield call(
      query,
      APIList.leaderBoardVirtualCoreContestCurrentRanking,
      action.payload
    );
    yield put({
      type: SUCCESS(PORTFOLIO_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING),
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: FAILURE(PORTFOLIO_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING),
    });
  }
}

export default function* watchGetVirtualCoreContestCurrentRanking() {
  yield takeLatest(PORTFOLIO_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING, doGetContestCurrentRankingPortfolio);
}
