import {
  ILeaderBoardCurrentInvestingInfoParams,
  ILeaderBoardInvestingParams,
  ILeaderBoardVirtualCoreContestCurrentRankingParams,
  ILeaderBoardVirtualCoreContestListedParams,
  ILeaderBoardVirtualCoreContestRankingParams,
} from 'interfaces/leaderBoard';
import {
  LEADER_BOARD_ADD_AVATAR,
  LEADER_BOARD_CLOSE_JOIN_NOW_MODAL,
  LEADER_BOARD_GET_CURRENT_INVESTING_INFO,
  LEADER_BOARD_GET_INVESTING,
  LEADER_BOARD_GET_INVESTING_USER_RANKING,
  LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST,
  LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING,
  LEADER_BOARD_GO_TO_USER_WALL,
  LEADER_BOARD_OPEN_JOIN_NOW_MODAL,
  LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED,
  OPEN_KYC_KIS_MODAL,
  CLOSE_KYC_KIS_MODAL,
  LEADER_BOARD_JOIN_NOW,
  LEADER_BOARD_OPEN_QUESTION_CONTEST_MODAL,
  LEADER_BOARD_CLOSE_QUESTION_CONTEST_MODAL,
  LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_LISTED,
  LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING,
  RESTART_SUB_DISABLE_MODAL,
  PORTFOLIO_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING,
} from 'reduxs/actions';
import { generateAction } from 'utils';
import { Avatars } from '../global-reducers/LeaderBoard';

export const getLeaderBoardInvestment = generateAction<ILeaderBoardInvestingParams>(LEADER_BOARD_GET_INVESTING);

export const getLeaderBoardInvestingUserRanking = generateAction(LEADER_BOARD_GET_INVESTING_USER_RANKING);

export const addAvatar = generateAction<Avatars>(LEADER_BOARD_ADD_AVATAR);

export const goToUserWall = generateAction<string>(LEADER_BOARD_GO_TO_USER_WALL);

// 1890 - contest
export const openJoinNowLeaderBoardModal = generateAction(LEADER_BOARD_OPEN_JOIN_NOW_MODAL);

export const closeJoinNowLeaderBoardModal = generateAction(LEADER_BOARD_CLOSE_JOIN_NOW_MODAL);

export const openQuestionContestLeaderBoardModal = generateAction(LEADER_BOARD_OPEN_QUESTION_CONTEST_MODAL);

export const closeQuestionContestLeaderBoardModal = generateAction(LEADER_BOARD_CLOSE_QUESTION_CONTEST_MODAL);

export const getLeaderBoardVirtualCoreContest = generateAction(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST);

export const getLeaderBoardVirtualCoreContestListed = generateAction<ILeaderBoardVirtualCoreContestListedParams>(
  LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_LISTED
);

export const getLeaderBoardVirtualCoreContestRanking = generateAction<ILeaderBoardVirtualCoreContestRankingParams>(
  LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING
);

export const getAccountContestRegistered = generateAction(LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED);

export const openKycKisModal = generateAction(OPEN_KYC_KIS_MODAL);

export const closeKycKisModal = generateAction(CLOSE_KYC_KIS_MODAL);

export const postJoinNow = generateAction(LEADER_BOARD_JOIN_NOW);

export const getLeaderBoardCurrentInvestingInfo = generateAction<ILeaderBoardCurrentInvestingInfoParams>(
  LEADER_BOARD_GET_CURRENT_INVESTING_INFO
);

export const getLeaderBoardVirtualCoreContestCurrentRanking =
  generateAction<ILeaderBoardVirtualCoreContestCurrentRankingParams>(
    LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING
  );

export const getPortfolioContestCurrentRanking = generateAction<ILeaderBoardVirtualCoreContestCurrentRankingParams>(
  PORTFOLIO_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING
);

export const showRestartSubDisableModal = () => ({
  type: RESTART_SUB_DISABLE_MODAL,
  payload: true,
});

export const hideRestartSubDisableModal = () => ({
  type: RESTART_SUB_DISABLE_MODAL,
  payload: false,
});
