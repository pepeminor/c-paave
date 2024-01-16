import { IGetSymbolPeriodMasResponse } from 'interfaces/market';
import { Nullable } from 'interfaces/Nullable';
import { ILoadingReducer } from 'interfaces/reducer';

export interface IScreenIndexInfoReducer {
  historicalData: ILoadingReducer<IGetSymbolPeriodMasResponse[] | null>;
}

export type IScreenIndexInfoReducerPayload = Nullable<IScreenIndexInfoReducer>;
