import { EStatusVirtualContestListed, ILeaderBoardInvestingPeriod } from 'constants/enum';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

export interface ILeaderBoardInvestingParams {
  partnerId?: string;
  period?: ILeaderBoardInvestingPeriod;
  pageNumber: number;
  pageSize: number;
}

export interface ILeaderBoardInvestingResponse {
  ranking: number;
  userId: number;
  rankingChanged: number;
  investmentReturn: number;
  fullname: string;
  username: string;
  bio: string;
  // 1890 contest
  subAccount: string;
  userStatus: string;
}

export interface ILeaderBoardInvestingInvestorsResponse {
  investors: ILeaderBoardInvestingResponse[];
  partnerId?: string;
  period?: string;
  pageNumber: number;
  isLimit: boolean;
  updatedDateTime: string;
}

export interface ILeaderBoardInvestingUserRankingResponse {
  ranking: number;
}
// 1890 - contest
export interface ILeaderBoardVirtualCoreContestResponse {
  contestId: number;
  requireNewSub: boolean;
  contestName: string;
  startAt: string;
  endAt: string;
  lastJoinAbleAt: string;
  condition: string;
  userId: number;
  subAccount: string;
  participantNo: number;
}

export interface ILeaderBoardVirtualCoreContestRankingParams {
  contestId: number;
  pageNumber: number;
  pageSize: number;
  period: ILeaderBoardInvestingPeriod;
  withCondition: boolean;
}

export interface ILeaderBoardVirtualCoreContestRankingResponse {
  updatedDateTime: string;
  isLimit: boolean;
  isSameData: boolean;
  pageNumber?: number;
  pageSize?: number;
  withCondition?: boolean;
  period?: string;
  investors: ILeaderBoardVirtualCoreContestInvestorsResponse[];
}

export interface ILeaderBoardVirtualCoreContestInvestorsResponse {
  ranking: number;
  userId: number;
  subAccount: string;
  username: string;
  fullname: string;
  bio: string;
  rankingChanged: number;
  investmentReturn: number;
  userStatus: string;
}
export interface IAccountContestRegistered {
  userId: number;
  subAccount: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILeaderboardSettingResponse {
  optBoard: boolean;
  subAccount?: string;
  optinBoardDate?: string;
}

export interface ILeaderBoardCurrentInvestingInfoParams {
  period: ILeaderBoardInvestingPeriod;
  currentScreen?: ScreenNames;
  partnerId?: string;
}
export interface ILeaderboardSettingParams {
  partnerId: string;
  optBoard: boolean;
  subAccount?: string;
}
export interface ILeaderBoardCurrentInvestingInfoResponse {
  currentInvestingInfo: ICurrentInvestingInfoItem[];
}

export interface ICurrentInvestingInfoItem {
  period: ILeaderBoardInvestingPeriod;
  ranking: number;
  rankingChanged: number;
  investmentReturn: number;
  updatedDateTime: string;
  percentile: number;
  totalUsers: number;
}

export interface ILeaderBoardVirtualCoreContestListedParams {
  status: EStatusVirtualContestListed;
}

export interface ILeaderBoardVirtualCoreContestListedResponse {
  contestId: number;
  requireNewSub: boolean;
  contestName: string;
  startAt: string;
  endAt: string;
  lastJoinAbleAt: string;
  condition: string;
  participantNo: number;
}

export interface ILeaderBoardVirtualCoreContestJoinedResponse {
  contestId: number;
  requireNewSub: boolean;
  contestName: string;
  startAt: string;
  endAt: string;
  lastJoinAbleAt: string;
  condition: string;
  participantNo: number;
  userId: number;
  subAccount: string;
}

export interface ILeaderBoardVirtualCoreContestJoinedParams {
  contestId: string;
}
export interface ILeaderBoardVirtualCoreContestCurrentRankingParams {
  contestId: number;
  period: ILeaderBoardInvestingPeriod;
  withCondition: boolean;
}

export interface ILeaderBoardVirtualCoreContestCurrentRankingResponse {
  subAccount: string;
  period: string;
  withCondition: true;
  rank: number;
  rankChange: number;
  navChangeRate: number;
}

export interface IChangeLeaderboardSettingResponse {
  readonly message: string;
}
