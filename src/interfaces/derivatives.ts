export interface IMaxBuySellResponse {
  maxLong: number;
  maxShort: number;
}

export interface IGetDerivativePortfolioItem {
  seriesID: string;
  long: number;
  short: number;
  averageBid: number;
  averageAsk: number;
  marketPrice: number;
  floatingPL: number;
}
export interface IGetDerivativePortfolioResponse {
  accountNo: string;
  openPositionList: IGetDerivativePortfolioItem[];
  closePositionList: IGetDerivativePortfolioItem[];
}
