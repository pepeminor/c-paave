// finance business
export interface IFinanceBusinessParams {
  readonly code: string;
}

export interface IFinanceBusinessResponse {
  readonly quarterlyRevenues: IQuarterlyRevenues[];
  readonly yearlyRevenues: IYearlyRevenues[];
  readonly quarterlyOperatingProfits: IQuarterlyOperatingProfits[];
  readonly yearlyOperatingProfits: IYearlyOperatingProfits[];
}

export interface IQuarterlyRevenues {
  readonly year: number;
  readonly quarter: number;
  readonly quarterlyRevenueValue?: number;
}

export interface IYearlyRevenues {
  readonly year: number;
  readonly yearlyRevenueValue?: number;
}

export interface IQuarterlyOperatingProfits {
  readonly year: number;
  readonly quarter: number;
  readonly quarterlyOperatingProfitValue?: number;
}

export interface IYearlyOperatingProfits {
  readonly year: number;
  readonly yearlyOperatingProfitValue?: number;
}

// financial ratio
export interface IFinancialRatioParams {
  readonly code: string;
}

export interface IFinancialRatioField {
  readonly ranking: number;
  readonly valueRatio: number;
}

export interface IFinancialRatioResponse {
  readonly marketCap?: IFinancialRatioField;
  readonly earningsPerShare?: IFinancialRatioField;
  readonly returnOnAssets?: IFinancialRatioField;
  readonly returnOnEquity?: IFinancialRatioField;
  readonly priceToEarningsRatio?: IFinancialRatioField;
  readonly priceToBookRatio?: IFinancialRatioField;
  readonly priceToSalesRatio?: IFinancialRatioField;
  readonly priceToCashFlowRatio?: IFinancialRatioField;
  readonly netProfitGrowthYOY?: IFinancialRatioGrowField;
  readonly revenueGrowthYOY?: IFinancialRatioGrowField;
  readonly grossProfitGrowthYOY?: IFinancialRatioGrowField;
  readonly netProfitGrowthQOQ?: IFinancialRatioGrowField;
  readonly revenueProfitGrowthQOQ?: IFinancialRatioGrowField;
  readonly grossProfitGrowthQOQ?: IFinancialRatioGrowField;
  readonly grossProfitMargin?: IFinancialRatioField;
  readonly netProfitMargin?: IFinancialRatioField;
  readonly debtEquityRatio?: IFinancialRatioField;
  readonly debtAssetRatio?: IFinancialRatioField;
}

export interface IFinancialRatioGrowField {
  readonly ranking: number;
  readonly valueRatio: number;
  readonly turnAround: boolean;
  readonly notGiven: boolean;
}

export interface IForeignTradeParams {
  readonly code: string;
}

export interface IForeignTradeResponse {
  readonly foreignTradeDtoList: IForeignTradeDto[];
  readonly foreignTradeDtoListForLast29Days: IForeignTradeDto[];
}

export interface IForeignTradeDto {
  date: string; // 20/02/2023
  buyForeignQuantity: number;
  sellForeignQuantity: number;
  buyForeignValue: number;
  sellForeignValue: number;
  netBuyForeignQuantity: number;
  netBuyForeignValue: number;
}

export interface IFinanceStatementParams {
  readonly code: string;
}

export interface IFinanceStatementResponse {
  year: number;
  quarter: number;
  revenue: number;
  costOfGoodsSold: number;
  grossProfit: number;
  operatingProfit: number;
  netInterestIncome: number;
  provisionForCreditRisk: number;
  netProfitAfterTax: number;
  netProfitAfterTaxOfParentCompany: number;
  netCashFlowFromOperatingActivities: number;
  cashAndCashEquivalents: number;
  netInventories: number;
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
}
