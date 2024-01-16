export interface IMostSearchStockParams {
  period: string;
  pageNumber: number | null;
  pageSize: number | null;
}

export interface IMostSearchStockResponse {
  mostSearchStocks: IMostSearchStocks[];
}

export interface IMostSearchStocks {
  code: string;
  rank: number;
  tradingValue: number;
  tradingVolume: number;
}

export interface IUpdateHistorySearchParams {
  code: string;
}

export interface IUpdateHistorySearchResponse {
  message: string;
  code: string;
}

export interface IIncreaseSearchParams {
  code: string;
}

export interface IIncreaseSearchResponse {
  message: string;
}

export interface ISearchRecentViewedResponse {
  recentlySearches: IRecentlySearches[];
}

export interface IRecentlySearches {
  code: string;
  rank: number;
}

export enum PutDeleteType {
  ALL = 'ALL',
}
export interface IDeleteRecentSearchHistoryParams {
  code?: string;
  deleteType?: PutDeleteType;
}

export interface IDeleteRecentSearchHistoryResponse {
  message: string;
  code?: string;
}

export interface IIncreaseSearchForKisParams {
  code: string;
  partnerId: string;
}

export interface IIncreaseSearchForKisResponse {
  message: string;
  code: string;
}

export interface IFollowingSubAccountParams {
  followingUserId: number;
}

export interface IFollowingSubAccountResponse {
  followingSubAccounts: string[];
}
