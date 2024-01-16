import { IFormatDataChart } from 'interfaces/common';

export interface IDailyProfitLosses {
  date: string;
  netAssetValue: number;
  vnIndex: number;
  navProfit: number;
  navProfitRatio: number;
  vnIndexReturn: number;
  accNAVProfit: number;
  normalisedNAV: number;
  normalisedVNINDEX: number;
}

export interface IDailyProfitLossResponse {
  data: {
    accountCreatedDate?: string;
    accountLinkedDate?: string;
    dailyProfitLosses: IDailyProfitLosses[];
  };
}

export interface IDataChartProfitLoss {
  dataProfitLoss: IDailyProfitLosses[];
  NAVAsset: IFormatDataChart[];
  NAVProfitRatio: IFormatDataChart[];
  NAVReturnData: IFormatDataChart[];
  VNIndexReturnData: IFormatDataChart[];
  accumulatedProfit: IFormatDataChart[];
  accumulatedProfitRatio: IFormatDataChart[];
}

export interface IDailyProfitLoss {
  [accountNumber: string]: {
    [s: string]: IDataChartProfitLoss;
  };
}

export interface IVNIndexResponse {
  data: {
    d: string; // Date
    c: number; // Close Price
    ch: number; // Change Price (compare with the day before)
    r: number; // Change Ratio (compare with the day before)
    nr: number; // Normalized Rate
  }[];
}

export interface IVNIndexReturn {
  [s: string]: {
    normalizedRate: IFormatDataChart[];
  };
}

export interface IPayloadGetDailyProfitLossListRequest {
  days: string;
  pageSize?: number;
  pageNumber?: number;
  fromDate?: string;
  toDate?: string;
}
export interface IPayloadGetDailyProfitLossListKISRequest {
  subAccount: string;
  days: string;
  pageSize?: number;
  pageNumber?: number;
  fromDate?: string;
  toDate?: string;
}

export interface IPayloadGetDailyProfitLossListSuccess {
  dataProfitLoss: IDataChartProfitLoss;
  accountCreatedDate: string;
  accountLinkedDate: string;
  days: string;
  accountNumber: string;
}
