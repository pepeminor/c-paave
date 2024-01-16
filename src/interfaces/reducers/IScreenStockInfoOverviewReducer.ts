import { IFinancialRatioResponse } from 'interfaces/finance';
import { ISymbolInfo } from 'interfaces/market';
import { Nullable } from 'interfaces/Nullable';
import { ILoadingReducer } from 'interfaces/reducer';
import { ILoadingSymbolDataExtend } from './ILoadingSymbolDataExtend';

export interface IScreenStockInfoOverviewReducer {
  financialRatio: ILoadingReducer<IFinancialRatioResponse | null>;
  realtimeQuote: ILoadingReducer<ILoadingSymbolDataExtend<ISymbolInfo>>;
}

export type IScreenStockInfoOverviewReducerPayload = Nullable<IScreenStockInfoOverviewReducer>;
