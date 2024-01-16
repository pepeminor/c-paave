import { IProfitLossResponse, IProfitLossTotal } from 'interfaces/equity';
import { Nullable } from 'interfaces/Nullable';
import { ILoadingReducer } from 'interfaces/reducer';

export interface IScreenPortfolioReducer {
  profitLossResponse: ILoadingReducer<IProfitLossResponse | null>;
  profitLossTotal: ILoadingReducer<IProfitLossTotal | null>;
}

export type IScreenPortfolioReducerPayload = Nullable<IScreenPortfolioReducer>;
