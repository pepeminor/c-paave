import APIList from 'config/api';
import { IResponse } from 'interfaces/common';
import {
  ILeaderBoardVirtualCoreContestJoinedParams,
  ILeaderBoardVirtualCoreContestJoinedResponse,
  ILeaderBoardVirtualCoreContestListedResponse,
} from 'interfaces/leaderBoard';
import { ILoadingReducer } from 'interfaces/reducer';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SUCCESS } from 'reduxs/action-type-utils';
import { LEADER_BOARD_JOIN_NOW } from 'reduxs/actions';
import { closeJoinNowLeaderBoardModal } from 'reduxs/global-actions';
import { IState } from 'reduxs/global-reducers';
import { alertMessage, query } from 'utils';
import { LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED } from '../../actions';

function* doJoinNow() {
  try {
    const getVirtualCoreContest: ILoadingReducer<ILeaderBoardVirtualCoreContestListedResponse[]> = yield select(
      (state: IState) => state.getVirtualCoreContestListed
    );
    const params: ILeaderBoardVirtualCoreContestJoinedParams = {
      contestId: getVirtualCoreContest.data[0].contestId.toString(),
    };
    const response: IResponse<ILeaderBoardVirtualCoreContestJoinedResponse> = yield call(
      query,
      APIList.leaderBoardJoinNow,
      params
    );
    yield put(closeJoinNowLeaderBoardModal({}));
    if (response.data != null) {
      yield put({
        type: SUCCESS(LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED),
        payload: response.data.subAccount,
      });
      alertMessage('success', 'JOINED_CONTEST_SUCCESSFULLY');
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    __DEV__ && console.log('doJoinNow error', err);
  }
}

export default function* watchDoJoinNow() {
  yield takeLatest(LEADER_BOARD_JOIN_NOW, doJoinNow);
}
