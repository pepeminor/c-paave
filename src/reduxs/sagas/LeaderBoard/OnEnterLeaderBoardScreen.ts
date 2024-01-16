// 1890 - contest
import { put, select, takeLeading } from 'redux-saga/effects';
import { IAccount, IAction } from 'interfaces/common';
import {
  GET_CONTEST_LIST,
  GET_CURRENT_TIME,
  GET_KIS_INFO_MODAL,
  // LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST,
  LEADER_BOARD_ON_ENTER_SCREEN,
} from 'reduxs/actions';
import {
  getLeaderBoardCurrentInvestingInfo,
  getLeaderBoardInvestment,
  getLeaderBoardVirtualCoreContestRanking,
  getUserAccountInfo,
  // getLeaderBoardVirtualCoreContestListed,
} from 'reduxs/global-actions';
import { IOnEnterLeaderBoardScreen } from 'screens/LeaderBoard/action';
// import APIList from 'config/api';
// import { SUCCESS } from 'reduxs/action-type-utils';
// import { ESubAccountJoinedContest } from 'global';
import { ILeaderBoardInvestingPeriod } from 'constants/enum';
// import { query } from 'utils';
// import { ILeaderBoardVirtualCoreContestResponse } from 'interfaces/leaderBoard';
import { IState } from 'reduxs/global-reducers';
import { ACCOUNT_TYPE } from 'global';
// import { ContestSubMenu } from 'interfaces/File';
import { pageSizeLeaderboard } from 'screens/LeaderBoard';
// import { ReducerStatus } from 'interfaces/reducer';
import { isNumber } from 'lodash';
import { onEnterLeaderboardSettingScreen } from 'screens/LeaderboardSetting/action';

function* handleEnterScreen(action: IAction<IOnEnterLeaderBoardScreen>) {
  try {
    const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
    const isHaveKisAccount: boolean = yield select((state: IState) => state.accountList.KIS != null);
    const leaderboardAccountSelector: ACCOUNT_TYPE = yield select((state: IState) => state.leaderboardAccountSelector);
    // const subId: string = yield select((state: IState) => state.accountContestRegistered.data);
    const contestId: number = yield select((state: IState) => state.contests?.subMenu?.contestId);

    const initPartnerId = leaderboardAccountSelector === ACCOUNT_TYPE.KIS ? ACCOUNT_TYPE.KIS : '';

    yield put({ type: GET_CURRENT_TIME });
    yield put({ type: GET_CONTEST_LIST });
    yield put({ type: GET_KIS_INFO_MODAL });

    if (selectedAccount.type === ACCOUNT_TYPE.DEMO) {
      // account non-login
      // tab PAAVE Leaderboard
      if (action.payload.selectTabLeaderBoard) {
        yield put(
          getLeaderBoardInvestment({
            partnerId: initPartnerId,
            period: action.payload.period,
            pageNumber: 0,
            pageSize: pageSizeLeaderboard,
          })
        );
      } else {
        if (contestId != null && isNumber(contestId)) {
          // tab Trading Contest
          yield put(
            getLeaderBoardVirtualCoreContestRanking({
              contestId: contestId,
              pageNumber: 0,
              pageSize: pageSizeLeaderboard,
              period: ILeaderBoardInvestingPeriod.WEEK,
              // withCondition: action.payload.isFinalFilter as boolean,
              withCondition: true, // Paave contest just only withCondition = true
            })
          );
        }
      }
    } else {
      if (leaderboardAccountSelector === ACCOUNT_TYPE.KIS && isHaveKisAccount) {
        yield put(onEnterLeaderboardSettingScreen({}));
      }
      // tab PAAVE Leaderboard
      if (action.payload.selectTabLeaderBoard) {
        yield put(
          getLeaderBoardInvestment({
            partnerId: initPartnerId,
            period: action.payload.period,
            pageNumber: 0,
            pageSize: pageSizeLeaderboard,
          })
        );
        yield put(getUserAccountInfo(null));
        yield put(
          getLeaderBoardCurrentInvestingInfo({
            period: action.payload.period,
            partnerId: 'kis',
          })
        );
      }

      // tab Trading Contest
      else {
        // Paave contest auto join with subAccount 000
        yield put(
          getLeaderBoardVirtualCoreContestRanking({
            contestId: contestId,
            pageNumber: 0,
            pageSize: pageSizeLeaderboard,
            period: ILeaderBoardInvestingPeriod.WEEK,
            // withCondition: action.payload.isFinalFilter as boolean,
            withCondition: true, // Paave contest just only withCondition = true
          })
        );

        // subAccount join contest
        // if (subId !== ESubAccountJoinedContest.NOT_JOIN) {
        // const contestData: IResponse<ILeaderBoardVirtualCoreContestResponse[]> = yield call(
        //   query,
        //   APIList.leaderBoardVirtualCoreContest
        // );

        // if (contestData != null) {
        //   yield put({
        //     type: SUCCESS(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST),
        //     payload: contestData.data,
        //   });
        // }
        // }

        // subAccount no join contest
        // else {
        // const subMenuContest: ContestSubMenu = yield select((state: IState) => state.contests?.subMenu);
        // const getVirtualCoreContestListedStatus: ReducerStatus = yield select(
        //   (state: IState) => state.getVirtualCoreContestListed.status
        // );
        // if (getVirtualCoreContestListedStatus === ReducerStatus.SUCCESS) return;

        // const currentTime: string = yield select((state: IState) => state.currentTime);
        // if (!(subMenuContest.startAt > currentTime && subMenuContest.joinable <= currentTime)) {
        //   yield put(
        //     getLeaderBoardVirtualCoreContestListed({
        //       status: EStatusVirtualContestListed.IN_PROGRESS,
        //     })
        //   );
        // }
        // }
      }
    }

    yield action.callBack?.handleSuccess && action.callBack.handleSuccess();
  } catch (error) {
    yield action.callBack?.handleFail && action.callBack.handleFail();
    // eslint-disable-next-line no-console
    console.error('fail in query onEnter Leaderboard', error);
  }
}

export default function* watchOnEnterScreen() {
  yield takeLeading(LEADER_BOARD_ON_ENTER_SCREEN, handleEnterScreen);
}
