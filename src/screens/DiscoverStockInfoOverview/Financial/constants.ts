import { FinancialInfo } from 'reduxs';
import { Colors } from 'styles';

export enum BUSINESS_PERFORMANCE_FINANCE_TITLE {
  REVENUE = 'Revenue',
  COST_OF_GOODS_SOLD = 'Cost of goods sold',
  GROSS_PROFIT = 'Gross profit',
  OPERATING_PROFIT = 'Operating profit',
  NET_INTEREST_INCOME = 'Net interest income',
  PROVISION_FOR_CREDIT_RISK = 'Provision for credit risk',
  NET_PROFIT_AFTER_TAX = 'Net profit after tax',
  NET_PROFIT_AFTER_TAX_OF_PARENT_COMPANY = 'Net profit after tax of parent company',
  NET_CRASH_FLOW = 'Net cash flow',
  CASH_AND_CASH_EQUIVALENTS = 'Cash and cash equivalents',
  NET_INVENTORIES = 'Net inventories',
  TOTAL_ASSET = 'Total asset',
  TOTAL_LIABILITIES = 'Total liabilities',
  TOTAL_EQUITY = 'Total equity',
}

export type IFinancialStatementRow = {
  name: string;
  value: number[] | string[] | undefined;
};

// Type for Financial Tab
export const FinanceTab = {
  RATIO: 'Ratio',
  FINANCIAL_REPORT: 'Financial report',
} as const;
export type FinanceTab = keyof typeof FinanceTab;

export const PeriodOptions = {
  QUARTERLY: 'Quarter',
  YEARLY: 'Year',
};
export type PeriodOptions = keyof typeof PeriodOptions;

// Type for Section of Financial Tab
export const CHART_SECTION = {
  IncomeStatement: 'Income Statement',
  DebtRatio: 'Debt Ratio',
  KeyIndicators: 'Key Indicators',
  ValuationRatio: 'Valuation Ratio',
} as const;
export type CHART_SECTION = keyof typeof CHART_SECTION;

export const CHART_SECTION_CONFIG: {
  [key in CHART_SECTION]: {
    listValue: {
      [key in string]: CHART_SECTION_TAB_VALUE;
    };
  };
} = {
  IncomeStatement: {
    listValue: {
      RevenueProfit: 'revenue_profit_abbr',
      OperatingIncome: 'operating_income_abbr',
      ProfitMargin: 'profit_margin_abbr',
    },
  },
  DebtRatio: {
    listValue: {
      DebtEquity: 'debt_to_equity_abbr',
      DebtAsset: 'debt_to_asset_abbr',
    },
  },
  KeyIndicators: {
    listValue: {
      ROA: 'ROA',
      ROE: 'ROE',
      EPS: 'EPS',
      BVPS: 'BVPS',
    },
  },
  ValuationRatio: {
    listValue: {
      PE: 'P/E',
      PB: 'P/B',
      PS: 'P/S',
      PC: 'P/C',
    },
  },
};

export const CHART_SECTION_TAB = {
  RevenueProfit: 'revenue_profit_abbr',
  OperatingIncome: 'operating_income_abbr',
  ProfitMargin: 'profit_margin_abbr',
  DebtEquity: 'debt_to_equity_abbr',
  DebtAsset: 'debt_to_asset_abbr',
  ROA: 'ROA',
  ROE: 'ROE',
  EPS: 'EPS',
  BVPS: 'BVPS',
  PE: 'P/E',
  PB: 'P/B',
  PS: 'P/S',
  PC: 'P/C',
} as const;
export type CHART_SECTION_TAB = keyof typeof CHART_SECTION_TAB;
export type CHART_SECTION_TAB_VALUE = (typeof CHART_SECTION_TAB)[keyof typeof CHART_SECTION_TAB];

// Type for Indicator of Financial Tab Section
export const Indicator = {
  REVENUE: 'REVENUE',
  INCOME: 'INCOME',
  PL_AFTER_TAX: 'PL_AFTER_TAX',
  ROA: 'ROA',
  ROE: 'ROE',
  EPS: 'EPS',
  BVPS: 'BVPS',
  PE: 'P/E',
  PB: 'P/B',
  PS: 'P/S',
  PC: 'P/C',
  GROSS_PROFIT_MARGIN: 'GROSS_PROFIT_MARGIN',
  NET_PROFIT_MARGIN: 'NET_PROFIT_MARGIN',
  TOTAL_LIABILITIES: 'TOTAL_LIABILITIES',
  TOTAL_EQUITY: 'TOTAL_EQUITY',
  TOTAL_ASSETS: 'TOTAL_ASSETS',
  DEBT_EQUITY: 'DEBT_EQUITY',
  DEBT_ASSET: 'DEBT_ASSET',
} as const;
export type Indicator = keyof typeof Indicator;

export const CHART_DATA_CONFIG: {
  [key in CHART_SECTION_TAB]: {
    column?: {
      label: string;
      field: keyof FinancialInfo;
      color: string;
    }[];
    line?: {
      label: string;
      field: keyof FinancialInfo;
      color: string;
    }[];
    notFormatYAxis?: boolean;
    separateLineScale?: boolean;
  };
} = {
  RevenueProfit: {
    column: [
      {
        label: 'Revenue',
        field: 'revenues',
        color: Colors.Blue9,
      },
      {
        label: 'Profit',
        field: 'netProfitsAfterTax',
        color: Colors.Green1,
      },
    ],
  },
  OperatingIncome: {
    column: [
      {
        label: 'operating_income_abbr',
        field: 'operatingProfits',
        color: Colors.Blue9,
      },
    ],
  },
  ProfitMargin: {
    line: [
      {
        label: 'gross_profit_margin_abbr',
        field: 'grossProfitMargin',
        color: Colors.LIGHTRed,
      },
      {
        label: 'net_profit_margin_abbr',
        field: 'netProfitMargin',
        color: Colors.DARK_GREEN,
      },
    ],
  },
  DebtEquity: {
    column: [
      {
        label: 'Debt',
        field: 'totalLiabilities',
        color: Colors.Blue9,
      },
      {
        label: 'equity_finance',
        field: 'totalEquity',
        color: Colors.Green1,
      },
    ],
    line: [
      {
        label: 'debt_to_equity_abbr',
        field: 'debtEquity',
        color: Colors.LIGHTRed,
      },
    ],
    separateLineScale: true,
  },
  DebtAsset: {
    column: [
      {
        label: 'Debt',
        field: 'totalLiabilities',
        color: Colors.Blue9,
      },
      {
        label: 'Asset',
        field: 'totalAssets',
        color: Colors.Yellow2,
      },
    ],
    line: [
      {
        label: 'debt_to_asset_abbr',
        field: 'debtAsset',
        color: Colors.LIGHTRed,
      },
    ],
    separateLineScale: true,
  },
  ROA: {
    column: [
      {
        label: 'ROA',
        field: 'returnOnAssets',
        color: Colors.Blue9,
      },
    ],
  },
  ROE: {
    column: [
      {
        label: 'ROE',
        field: 'returnOnEquity',
        color: Colors.Blue9,
      },
    ],
  },
  EPS: {
    column: [
      {
        label: 'EPS',
        field: 'earningsPerShare',
        color: Colors.Blue9,
      },
    ],
    notFormatYAxis: true,
  },
  BVPS: {
    column: [
      {
        label: 'BVPS',
        field: 'bookValuePerShare',
        color: Colors.Blue9,
      },
    ],
    notFormatYAxis: true,
  },
  PE: {
    line: [
      {
        label: 'P/E',
        field: 'priceToEarning',
        color: Colors.Blue9,
      },
    ],
  },
  PB: {
    line: [
      {
        label: 'P/B',
        field: 'priceToBook',
        color: Colors.Blue9,
      },
    ],
  },
  PS: {
    line: [
      {
        label: 'P/S',
        field: 'priceToSales',
        color: Colors.Blue9,
      },
    ],
  },
  PC: {
    line: [
      {
        label: 'P/C',
        field: 'priceToCashflow',
        color: Colors.Blue9,
      },
    ],
  },
};
