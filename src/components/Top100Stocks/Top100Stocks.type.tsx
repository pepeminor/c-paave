// eslint-disable-next-line @typescript-eslint/ban-types
export type IProps = {
  limit?: number;
  showHeader?: boolean;
};

export const IndicesConfig = {
  HOSE: {
    label: 'HOSE',
    key: 'HOSE',
  },
  HNX: {
    label: 'HNX',
    key: 'HNX',
  },
  UPCOM: {
    label: 'UPCOM',
    key: 'UPCOM',
  },
} as const;
export type IndicesConfig = keyof typeof IndicesConfig;

export const FinancialRatioConfig = {
  market_cap: {
    label: 'financial_ratio.market_cap',
    key: 'market_cap',
    suffix: '',
  },
  earnings_per_share: {
    label: 'financial_ratio.earnings_per_share',
    key: 'earnings_per_share',
    suffix: '',
  },
  price_to_earnings_ratio: {
    label: 'financial_ratio.price_to_earnings_ratio',
    key: 'price_to_earnings_ratio',
    suffix: '',
  },
  price_to_book_ratio: {
    label: 'financial_ratio.price_to_book_ratio',
    key: 'price_to_book_ratio',
    suffix: '',
  },
  price_to_sales_ratio: {
    label: 'financial_ratio.price_to_sales_ratio',
    key: 'price_to_sales_ratio',
    suffix: '',
  },
  price_to_cash_flow_ratio: {
    label: 'financial_ratio.price_to_cash_flow_ratio',
    key: 'price_to_cash_flow_ratio',
    suffix: '',
  },
  return_on_equity: {
    label: 'financial_ratio.return_on_equity',
    key: 'return_on_equity',
    suffix: '%',
  },
  return_on_assets: {
    label: 'financial_ratio.return_on_assets',
    key: 'return_on_assets',
    suffix: '%',
  },
  net_profit_margin: {
    label: 'financial_ratio.net_profit_margin',
    key: 'net_profit_margin',
    suffix: '%',
  },
  revenue_profit_growth_qoq: {
    label: 'financial_ratio.revenue_profit_growth_qoq',
    key: 'revenue_profit_growth_qoq',
    suffix: '%',
  },
  revenue_growth_yoy: {
    label: 'financial_ratio.revenue_growth_yoy',
    key: 'revenue_growth_yoy',
    suffix: '%',
  },
  net_profit_growth_qoq: {
    label: 'financial_ratio.net_profit_growth_qoq',
    key: 'net_profit_growth_qoq',
    suffix: '%',
  },
  net_profit_growth_yoy: {
    label: 'financial_ratio.net_profit_growth_yoy',
    key: 'net_profit_growth_yoy',
    suffix: '%',
  },
  debt_equity_ratio: {
    label: 'financial_ratio.debt_equity_ratio',
    key: 'debt_equity_ratio',
    suffix: '',
  },
  debt_asset_ratio: {
    label: 'financial_ratio.debt_asset_ratio',
    key: 'debt_asset_ratio',
    suffix: '',
  },
} as const;
export type FinancialRatioConfig = keyof typeof FinancialRatioConfig;
