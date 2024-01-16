import { IFormatDataChart } from 'interfaces/common';

export enum ITimePicker {
  ALL = 'All',
  ONE_WEEK = '1W',
  ONE_MONTH = '1M',
  THREE_MONTHS = '3M',
  SIX_MONTHS = '6M',
  ONE_YEAR = '1Y',
}

export type IFilterStock = {
  rating: number;
  technical: number;
  valuation: number;
  quality: number;
  VN30: boolean;
  HNX30: boolean;
  UPCOM: boolean;
};

export enum ITopNumber {
  TOP5 = 5,
  TOP10 = 10,
  TOP15 = 15,
  TOP20 = 20,
}

export enum ITopNumberString {
  TOP5 = '5',
  TOP10 = '10',
  TOP15 = '15',
  TOP20 = '20',
}

export const numberID = [
  {
    title: 'Top 5',
    key: ITopNumberString.TOP5,
  },
  {
    title: 'Top 10',
    key: ITopNumberString.TOP10,
  },
  {
    title: 'Top 15',
    key: ITopNumberString.TOP15,
  },
  {
    title: 'Top 20',
    key: ITopNumberString.TOP20,
  },
];

export type AdvisorPerformance = {
  vnIndexReturn: number;
  advisorReturn: number;
  advisorChartData: IFormatDataChart[];
  vnIndexChartData: IFormatDataChart[];
};

export const TabNames = {
  Score: 'AI Rating',
  Advisor: 'Robo Advisors',
} as const;
export type TabNames = keyof typeof TabNames;
