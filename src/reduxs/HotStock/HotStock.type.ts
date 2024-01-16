import { LoadingReducer } from 'interfaces/reducer';

export interface HotStockState {
  hotStockType: HotStockType;
  hotStockPeriodType: HotStockPeriodType;
  hotStockOrderType: HotStockOrderType;
  hotStockSource: HotStockSource;
  hotStockPageNumber: number | null;
  hotStockPageSize: number;
  symbolList: LoadingReducer<HotStockItem[]>;
}

export type HotStockType = 'MostBought' | 'MostSold' | 'MostSearched';
export type HotStockPeriodType = 'DAY' | 'WEEK' | 'MONTH';
export type HotStockOrderType = 'TOTAL_TRADING_VALUE' | 'TOTAL_TRADING_VOLUME';
export type HotStockSource = 'Virtual' | 'KIS';

export interface HotStockItem {
  rank: number;
  stockCode: string;
  totalTradingValue: number;
  totalTradingVolume: number;
}
