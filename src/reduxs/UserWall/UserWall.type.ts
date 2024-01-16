import { ACCOUNT_TYPE } from 'global';
import { IFormatDataChart } from 'interfaces/common';
import { IProfitLossResponse } from 'interfaces/equity';
import { ReducerStatus } from 'interfaces/reducer';

export interface IUserWall {
  [userId: number]: IItemUserWall;
}

export interface IItemUserWall {
  profitLoss: IProfitLossResponse;
  dailyProfitLoss: {
    [period: string]: IDailyProfitLossItem;
  };
  status: ReducerStatus;
  accountCreatedDate: string;
}

export interface IDailyProfitLossItem {
  data: IFollowingDailyProfitLoss[];
  NAVDataPercent: IFormatDataChart[];
  VNIndexDataPercent: IFormatDataChart[];
  NetAssetValue: IFormatDataChart[];
  NavProfit: IFormatDataChart[];
  accumulatedProfit: IFormatDataChart[];
  accumulatedProfitRatio: IFormatDataChart[];
  accNAVProfitValue?: number;
  accNAVProfitRatio?: number;
  cashAllocation?: number;
  stockAllocation?: number;
}

export interface IFollowingDailyProfitLoss {
  date: string;
  normalisedNav: number;
  normalisedVnIndex: number;
  stockBalance: number;
  cashBalance: number;
  netAssetValue: number;
  navProfit: number;
  navProfitRatio: number;
  totalAwaitCash: number;
  netCashDeposit: number;
  netStockDeposit: number;
}

export interface IFollowingDailyProfitLossResponse {
  data: {
    accountCreatedDate: string;
    accountLinkedDate: string;
    followingDailyProfits: IFollowingDailyProfitLoss[];
  };
}

export interface IFollowingDailyProfitLossRequest {
  accountType: ACCOUNT_TYPE;
  params: {
    followingUserId: number;
    fromDate?: string;
    toDate?: string;
    followingSubAccount?: string;
    pageSize?: number;
    pageNumber?: number;
  };
  period: number;
}

export interface IFollowingDailyProfitLossSuccess {
  userId: number;
  accountType: ACCOUNT_TYPE;
  period: number;
  data: {
    accountCreatedDate: string;
    accountLinkedDate: string;
    dataProfitLoss: IFollowingDailyProfitLoss[];
    NAVDataPercent: IFormatDataChart[];
    VNIndexDataPercent: IFormatDataChart[];
    NetAssetValue: IFormatDataChart[];
    NavProfit: IFormatDataChart[];
    accumulatedProfit: IFormatDataChart[];
    accumulatedProfitRatio: IFormatDataChart[];
    accNAVProfitValue?: number;
    accNAVProfitRatio?: number;
    cashAllocation?: number;
    stockAllocation?: number;
  };
}
