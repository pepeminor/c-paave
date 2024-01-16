import { ACCOUNT_TYPE } from 'global';
import { IAction } from 'interfaces/common';
import {
  ILeaderBoardCurrentInvestingInfoResponse,
  ILeaderBoardInvestingInvestorsResponse,
  ILeaderBoardInvestingUserRankingResponse,
  ILeaderBoardVirtualCoreContestCurrentRankingResponse,
  ILeaderBoardVirtualCoreContestListedResponse,
  ILeaderBoardVirtualCoreContestRankingResponse,
  ILeaderBoardVirtualCoreContestResponse,
} from 'interfaces/leaderBoard';
import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import { FAILURE, RESET, SUCCESS } from 'reduxs/action-type-utils';
import {
  CLOSE_KYC_KIS_MODAL,
  LEADER_BOARD_ACCOUNT_SELECTOR,
  LEADER_BOARD_ADD_AVATAR,
  LEADER_BOARD_CLOSE_JOIN_NOW_MODAL,
  LEADER_BOARD_CLOSE_QUESTION_CONTEST_MODAL,
  LEADER_BOARD_CONTEST_MODAL,
  LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED,
  LEADER_BOARD_GET_CURRENT_INVESTING_INFO,
  LEADER_BOARD_GET_INVESTING,
  LEADER_BOARD_GET_INVESTING_USER_RANKING,
  LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST,
  LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING,
  LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_LISTED,
  LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING,
  LEADER_BOARD_OPEN_JOIN_NOW_MODAL,
  LEADER_BOARD_OPEN_QUESTION_CONTEST_MODAL,
  OPEN_KYC_KIS_MODAL,
  PORTFOLIO_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING,
  REAL_LEADER_BOARD_CLOSE_JOIN_NOW_MODAL,
  REAL_LEADER_BOARD_OPEN_JOIN_NOW_MODAL,
  RESTART_SUB_DISABLE_MODAL,
} from 'reduxs/actions';

const defaultLeaderBoardInvesting = {
  investors: [],
  period: '',
  pageNumber: 0,
  isLimit: false,
  updatedDateTime: '',
};

export function LeaderBoardInvesting(
  state: ILoadingReducer<ILeaderBoardInvestingInvestorsResponse | null> = {
    data: defaultLeaderBoardInvesting,
    status: ReducerStatus.LOADING,
  },
  action: IAction<ILeaderBoardInvestingInvestorsResponse>
): ILoadingReducer<ILeaderBoardInvestingInvestorsResponse | null> {
  switch (action.type) {
    case SUCCESS(LEADER_BOARD_GET_INVESTING):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(LEADER_BOARD_GET_INVESTING):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(LEADER_BOARD_GET_INVESTING):
      return { data: defaultLeaderBoardInvesting, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function InvestingUserRanking(
  state: ILoadingReducer<ILeaderBoardInvestingUserRankingResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<ILeaderBoardInvestingUserRankingResponse>
): ILoadingReducer<ILeaderBoardInvestingUserRankingResponse | null> {
  switch (action.type) {
    case LEADER_BOARD_GET_INVESTING_USER_RANKING:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(LEADER_BOARD_GET_INVESTING_USER_RANKING):
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case FAILURE(LEADER_BOARD_GET_INVESTING_USER_RANKING):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export type Avatars = {
  [username: string]: string;
};

export function UsersAvatar(state: Avatars = {}, action: IAction<Avatars>): Avatars {
  switch (action.type) {
    case LEADER_BOARD_ADD_AVATAR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function ContestModal(state = false, action: IAction<boolean>): boolean {
  switch (action.type) {
    case LEADER_BOARD_CONTEST_MODAL:
      return action.payload;
    default:
      return state;
  }
}

export function ShowJoinNowLeaderBoardModal(state = false, action: IAction<null>) {
  switch (action.type) {
    case LEADER_BOARD_OPEN_JOIN_NOW_MODAL:
      return true;
    case LEADER_BOARD_CLOSE_JOIN_NOW_MODAL:
      return false;
    default:
      return state;
  }
}

export function ShowJoinNowRealLeaderBoardModal(state = false, action: IAction<null>) {
  switch (action.type) {
    case REAL_LEADER_BOARD_OPEN_JOIN_NOW_MODAL:
      return true;
    case REAL_LEADER_BOARD_CLOSE_JOIN_NOW_MODAL:
      return false;
    default:
      return state;
  }
}

export function ShowQuestionContestLeaderBoardModal(state = false, action: IAction<null>) {
  switch (action.type) {
    case LEADER_BOARD_OPEN_QUESTION_CONTEST_MODAL:
      return true;
    case LEADER_BOARD_CLOSE_QUESTION_CONTEST_MODAL:
      return false;
    default:
      return state;
  }
}

// 1890 - contest
export function GetVirtualCoreContest(
  state: ILoadingReducer<ILeaderBoardVirtualCoreContestResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<ILeaderBoardVirtualCoreContestResponse[]>
) {
  switch (action.type) {
    // case LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST:
    //   return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function GetVirtualCoreContestRanking(
  state: ILoadingReducer<ILeaderBoardVirtualCoreContestRankingResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<ILeaderBoardVirtualCoreContestRankingResponse>
) {
  switch (action.type) {
    case SUCCESS(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function ShowKycKisModal(state = false, action: IAction<null>) {
  switch (action.type) {
    case OPEN_KYC_KIS_MODAL:
      return true;
    case CLOSE_KYC_KIS_MODAL:
      return false;
    default:
      return state;
  }
}

export function GetContestAccountRegistered(
  state: ILoadingReducer<string | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<string>
) {
  switch (action.type) {
    case LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED:
      return { ...state, status: ReducerStatus.LOADING };
    case SUCCESS(LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function GetCurrentInvestingInfo(
  state: ILoadingReducer<ILeaderBoardCurrentInvestingInfoResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<ILeaderBoardCurrentInvestingInfoResponse>
) {
  switch (action.type) {
    case LEADER_BOARD_GET_CURRENT_INVESTING_INFO:
      return { ...state, status: ReducerStatus.LOADING };
    case SUCCESS(LEADER_BOARD_GET_CURRENT_INVESTING_INFO):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(LEADER_BOARD_GET_CURRENT_INVESTING_INFO):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(LEADER_BOARD_GET_CURRENT_INVESTING_INFO):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function GetVirtualCoreContestListed(
  state: ILoadingReducer<ILeaderBoardVirtualCoreContestListedResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<ILeaderBoardVirtualCoreContestListedResponse[]>
) {
  switch (action.type) {
    case LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_LISTED:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_LISTED):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_LISTED):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_LISTED):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function GetVirtualCoreContestCurrentRanking(
  state: ILoadingReducer<ILeaderBoardVirtualCoreContestCurrentRankingResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<ILeaderBoardVirtualCoreContestCurrentRankingResponse[]>
) {
  switch (action.type) {
    case LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING:
      return { ...state, status: ReducerStatus.LOADING };
    case SUCCESS(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function GetPortfolioContestCurrentRanking(
  state: ILoadingReducer<ILeaderBoardVirtualCoreContestCurrentRankingResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<ILeaderBoardVirtualCoreContestCurrentRankingResponse[]>
) {
  switch (action.type) {
    case PORTFOLIO_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING:
      return { ...state, status: ReducerStatus.LOADING };
    case SUCCESS(PORTFOLIO_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(PORTFOLIO_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(PORTFOLIO_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function RestartSubDisableModal(state = false, action: IAction<boolean>) {
  switch (action.type) {
    case RESTART_SUB_DISABLE_MODAL:
      return action.payload;
    default:
      return state;
  }
}

export function AccountSelector(state: ACCOUNT_TYPE = ACCOUNT_TYPE.KIS, action: IAction<boolean>) {
  switch (action.type) {
    case LEADER_BOARD_ACCOUNT_SELECTOR:
      return action.payload;
    default:
      return state;
  }
}
