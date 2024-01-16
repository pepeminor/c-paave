import { Indicator, PeriodOptions } from 'screens/DiscoverStockInfoOverview/Financial/constants';

export type FinancialInfoState = {
  period: PeriodOptions;
  indicator: Indicator;
} & {
  info: {
    [period in PeriodOptions]: FinancialInfo[];
  };
};

export type FinancialInfo = {
  quarter?: number;
  year: number;
  priceToEarning?: number;
  priceToBook?: number;
  priceToSales?: number;
  priceToCashflow?: number;
  earningsPerShare?: number;
  returnOnAssets?: number;
  returnOnEquity?: number;
  bookValuePerShare?: number;
  revenues?: number;
  operatingProfits?: number;
  netProfitsAfterTax?: number;
  grossProfitMargin?: number;
  netProfitMargin?: number;
  totalLiabilities?: number;
  totalEquity?: number;
  totalAssets?: number;
  debtEquity?: number;
  debtAsset?: number;
};

// -------------------- API Request/Response --------------------

// --- QuarterYearFinancialRatio ---
export type QuarterYearFinancialRatioResponse = {
  quarters: QuarterYearFinancialRatioItem[];
  years: QuarterYearFinancialRatioItem[];
};

type QuarterYearFinancialRatioItem = {
  date: string; // '2022-12-29 17:00:00'
  priceToBook: number;
  priceToCashflow: number;
  priceToEarning: number;
  priceToSales: number;
};

// --- FinancialRatioQuarter&Year ---
export type FinancialRatioRemainResponse = {
  quarter: number;
  year: number;
  returnOnAsset: number;
  earningPerShare: number;
  returnOnEquity: number;
  bookValuePerShare: number;
};

// --- FinanceBusiness ---
export interface FinanceBusinessResponse {
  readonly quarterlyRevenues?: QuarterlyRevenues[];
  readonly yearlyRevenues?: YearlyRevenues[];
  readonly quarterlyOperatingProfits?: QuarterlyOperatingProfits[];
  readonly yearlyOperatingProfits?: YearlyOperatingProfits[];
  readonly quarterlyNetProfitAfterTax?: QuarterlyNetProfitAfterTax[];
  readonly yearlyNetProfitAfterTax?: YearlyNetProfitAfterTax[];
  readonly quarterlyGrossProfitMargin?: QuarterlyGrossProfitMargin[];
  readonly yearlyGrossProfitMargin?: YearlyGrossProfitMargin[];
  readonly quarterlyNetProfitMargin?: QuarterlyNetProfitMargin[];
  readonly yearlyNetProfitMargin?: YearlyNetProfitMargin[];
  readonly quarterlyTotalLiabilities?: QuarterlyTotalLiabilities[];
  readonly yearlyTotalLiabilities?: YearlyTotalLiabilities[];
  readonly quarterlyTotalEquity?: QuarterlyTotalEquity[];
  readonly yearlyTotalEquity?: YearlyTotalEquity[];
  readonly quarterlyTotalAssets?: QuarterlyTotalAssets[];
  readonly yearlyTotalAssets?: YearlyTotalAssets[];
  readonly quarterlyDebtEquity?: QuarterlyDebtEquity[];
  readonly yearlyDebtEquity?: YearlyDebtEquity[];
  readonly quarterlyDebtAsset?: QuarterlyDebtAsset[];
  readonly yearlyDebtAsset?: YearlyDebtAsset[];
}

interface FinanceBusinessDefaultField {
  year: number;
  quarter?: number;
}

interface QuarterlyRevenues extends FinanceBusinessDefaultField {
  readonly quarterlyRevenueValue?: number;
}

interface YearlyRevenues extends FinanceBusinessDefaultField {
  readonly yearlyRevenueValue?: number;
}

interface QuarterlyOperatingProfits extends FinanceBusinessDefaultField {
  readonly quarterlyOperatingProfitValue?: number;
}

interface YearlyOperatingProfits extends FinanceBusinessDefaultField {
  readonly yearlyOperatingProfitValue?: number;
}

interface QuarterlyNetProfitAfterTax extends FinanceBusinessDefaultField {
  readonly quarterlyNetProfitAfterTaxValue?: number;
}

interface YearlyNetProfitAfterTax extends FinanceBusinessDefaultField {
  readonly yearlyNetProfitAfterTaxValue?: number;
}

interface QuarterlyGrossProfitMargin extends FinanceBusinessDefaultField {
  readonly quarterlyGrossProfitMarginRatio?: number;
}

interface YearlyGrossProfitMargin extends FinanceBusinessDefaultField {
  readonly yearlyGrossProfitMarginRatio?: number;
}

interface QuarterlyNetProfitMargin extends FinanceBusinessDefaultField {
  readonly quarterlyNetProfitMarginRatio?: number;
}

interface YearlyNetProfitMargin extends FinanceBusinessDefaultField {
  readonly yearlyNetProfitMarginRatio?: number;
}

interface QuarterlyTotalLiabilities extends FinanceBusinessDefaultField {
  readonly quarterlyTotalLiabilitiesValue?: number;
}

interface YearlyTotalLiabilities extends FinanceBusinessDefaultField {
  readonly yearlyTotalLiabilitiesValue?: number;
}

interface QuarterlyTotalEquity extends FinanceBusinessDefaultField {
  readonly quarterlyTotalEquityValue?: number;
}

interface YearlyTotalEquity extends FinanceBusinessDefaultField {
  readonly yearlyTotalEquityValue?: number;
}

interface QuarterlyTotalAssets extends FinanceBusinessDefaultField {
  readonly quarterlyTotalAssetsValue?: number;
}

interface YearlyTotalAssets extends FinanceBusinessDefaultField {
  readonly yearlyTotalAssetsValue?: number;
}

interface QuarterlyDebtEquity extends FinanceBusinessDefaultField {
  readonly quarterlyDebtEquityRatio?: number;
}

interface YearlyDebtEquity extends FinanceBusinessDefaultField {
  readonly yearlyDebtEquityRatio?: number;
}

interface QuarterlyDebtAsset extends FinanceBusinessDefaultField {
  readonly quarterlyDebtAssetRatio?: number;
}

interface YearlyDebtAsset extends FinanceBusinessDefaultField {
  readonly yearlyDebtAssetRatio?: number;
}
