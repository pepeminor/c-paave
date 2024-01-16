import { FinancialRatioConfig, IndicesConfig } from 'components/Top100Stocks/Top100Stocks.type';

export type Top100StocksState = {
  [s in IndicesConfig]: {
    [s in FinancialRatioRankingType]?: FinancialRatioRankingItem[];
  };
} & {
  isLoading: boolean;
  index: IndicesConfig;
  financialRatio: FinancialRatioConfig;
};

export type FinancialRatioRankingType =
  | 'market_cap'
  | 'earnings_per_share'
  | 'price_to_earnings_ratio'
  | 'price_to_book_ratio'
  | 'price_to_sales_ratio'
  | 'price_to_cash_flow_ratio'
  | 'return_on_equity'
  | 'return_on_assets'
  | 'net_profit_margin'
  | 'revenue_profit_growth_qoq'
  | 'revenue_growth_yoy'
  | 'net_profit_growth_qoq'
  | 'net_profit_growth_yoy'
  | 'debt_equity_ratio'
  | 'debt_asset_ratio';

export interface FinancialRatioRankingParams {
  market: IndicesConfig;
  financialRatio: FinancialRatioRankingType;
  pageSize?: number;
  pageNumber?: number;
  sortAsc?: boolean;
}

export interface FinancialRatioRankingItem {
  ranking: number;
  code: string;
  valueRatio: number;
}

export interface UpdateStatePayload {
  market: IndicesConfig;
  financialRatio: FinancialRatioRankingType;
  data: FinancialRatioRankingItem[];
}
