export interface ITradingHistoryParams {
  profileId?: number;
  loadMore?: boolean;
  pageSize?: number;
  page?: number;
  profileSubAccount?: string; // 1890 contest
  sort?: boolean;
  fromDate?: string;
  toDate?: string;
}

export interface ITradingHistoryResponse {
  tradingHistories: ITradingHistories[];
}

export interface ITradingHistories {
  stockCode: string;
  buyingPrice: number;
  sellingPrice: number;
  profitLoss: number;
  profitLossRate: number;
  buyingDate: string;
  sellingDate: string;
}
