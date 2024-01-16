// ----------------------------------PeriodicProfitLoss------------------------------------
export interface AdvisorPerformanceParams {
  /**
   * Array of userId-subAccount pair
   *
   * Ex: ["10", "45-000", "46-001"]
   */
  roboAdvisors: string[];
}
type FramePeriodicProfitLoss = {
  navProfit: number;
  navProfitRatio: number;
};
export interface PeriodicProfitLoss {
  userId: number;
  subAccount: string;
  username: string;
  date: string;
  netAssetValue: number;
  oneWeekProfitLoss: FramePeriodicProfitLoss;
  oneMonthProfitLoss: FramePeriodicProfitLoss;
  threeMonthProfitLoss: FramePeriodicProfitLoss;
  sixMonthProfitLoss: FramePeriodicProfitLoss;
  oneYearProfitLoss: FramePeriodicProfitLoss;
  totalProfitLoss: FramePeriodicProfitLoss;
}
export type PeriodicProfitLossResponse = PeriodicProfitLoss[];

// -----------------------------------AdvisorChartData-----------------------------------
export interface AdvisorChartData {
  userId: number;
  subAccount: string;
  username: string;
  normalizedNAV: number[];
  normalizedVNINDEX: string[];
  date: string[];
}
export type AdvisorChartDataResponse = AdvisorChartData[];

// ----------------------------------TotalViews------------------------------------
export interface TotalViewsParams {
  userIds: number[];
}
export interface UserTotalViews {
  userId: number;
  username: string;
  totalViews: number;
}
export type UserTotalViewsResponse = UserTotalViews[];

// -----------------------------------TotalFollows-----------------------------------
export interface TotalFollowsParams {
  userIds: number[];
}
export interface UserTotalFollows {
  userId: number;
  username: string;
  totalFollows: number;
}
export type UserTotalFollowsResponse = UserTotalFollows[];
// end get follow advisor interface

// -----------------------------------Follow & UnFollow Advisor-----------------------------------
export interface FollowAdvisorParams {
  followedId: number;
  /**
   * For api follow advisor
   */
  // type: 'ROBO_ADVISOR';
}
export interface FollowAdvisorResponse {
  userId: number;
  followedId: number;
  followedDate: string; // '06:28:47 11/28/2023'
}
export interface UnFollowAdvisorResponse {
  message: string;
}

// ----------------------------------FollowingUser------------------------------------
export type FOLLOW_TYPE = 'ALL' | 'ROBO_ADVISOR' | 'NON_ROBO_ADVISOR';
export type FollowingUser = {
  followedId: number;
  username: string;
  fullname: string;
};
export interface FollowingAdvisorParams {
  pageSize: number;
  pageNumber: number;
  type: FOLLOW_TYPE;
}
export interface FollowingAdvisorResponse {
  totalFollowingAccounts: number;
  followingAccounts: FollowingUser[];
}
