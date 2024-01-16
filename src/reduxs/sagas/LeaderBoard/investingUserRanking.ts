import { LEADER_BOARD_GET_INVESTING_USER_RANKING } from '../../actions';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { ILeaderBoardInvestingUserRankingResponse } from 'interfaces/leaderBoard';
import { createNormalApiQuerySaga } from 'utils';
import { put } from 'redux-saga/effects';

function* handleSuccess(response: IResponse<ILeaderBoardInvestingUserRankingResponse>, action: IAction<null>) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: response.data,
      hideLoading: true,
    });
  }
}

function* handleFailed(action: IAction<null>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<null, ILeaderBoardInvestingUserRankingResponse>(
  APIList.leaderBoardInvestingUserRanking,
  LEADER_BOARD_GET_INVESTING_USER_RANKING,
  handleSuccess,
  handleFailed
);
