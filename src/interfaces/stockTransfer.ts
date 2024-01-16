export interface IQueryListInstrumentPortfolioParams {
  accountNo: string;
}

// array
export interface IQueryListInstrumentPortfolioResponse {
  marketID: string;
  stockType: string;
  stockSymbol: string;
  availableVolume: number;
}

export interface IPostDoStockTransferParams {
  marketID: string;
  stockSymbol: string;
  transferVolume: number;
  senderAccountNo: string;
  receiverAccountNo: string;
  clientID: string;
}

export interface IPostDoStockTransferResponse {
  result: string;
  tranID: string;
}

export interface IQueryStockTransferHistoryParams {
  accountNumber: string;
  fromDate: string;
  symbol: string;
  toDate: string;
  status?: string;
  offset?: number;
  fetchCount?: number;
}

// array
export interface IQueryStockTransferHistoryResponse {
  status: string;
  symbol: string;
  volume: number;
  stockType: string;
  requestTime: string;
  senderAccount: string;
  remark: string;
}

export interface ICheckTimeStockTransferAvailableParams {
  accountNo: string;
}

export interface ICheckTimeStockTransferAvailableResponse {
  result: string;
}
