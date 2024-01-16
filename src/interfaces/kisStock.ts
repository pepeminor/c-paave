export interface IKisStockInfoParams {
  readonly accountNumber: string;
  readonly symbolCode: string;
  readonly market: string;
  readonly sellBuyType: string;
}

export interface IKisStockInfoResponse {
  PP: number;
  marginRatio: number;
}

export interface IKisAssetInfoFromPortfolioParams {}

export interface IKisAssetInfoFromPortfolioResponse {}
