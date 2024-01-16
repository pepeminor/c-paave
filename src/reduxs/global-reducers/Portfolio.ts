import { IAction } from 'interfaces/common';
import { IKisClientPortfolioResponse } from 'interfaces/equity';
import { ReducerStatus } from 'interfaces/reducer';
import { IArrSymbolDataExtendChangePayload } from 'interfaces/reducers/IArrSymbolDataExtendChangePayload';
import { IScreenPortfolioReducer, IScreenPortfolioReducerPayload } from 'interfaces/reducers/IScreenPortfolioReducer';
import {
  KIS_PORTFOLIO_DERIVATIVES_TABLE,
  KIS_PORTFOLIO_DERIVATIVES_TABLE_FAILED,
  KIS_PORTFOLIO_DERIVATIVES_TABLE_SUCCESS,
  PORTFOLIO_CLEAN_SCREEN_DATA,
  PORTFOLIO_REDUCER_UPDATE,
} from 'reduxs/actions';

const defaultValue: IScreenPortfolioReducer = {
  profitLossResponse: {
    data: null,
    status: ReducerStatus.LOADING,
  },
  profitLossTotal: {
    data: null,
    status: ReducerStatus.LOADING,
  },
};

export function screenPortfolio(
  state: IScreenPortfolioReducer = defaultValue,
  action: IAction<IScreenPortfolioReducerPayload | IArrSymbolDataExtendChangePayload<IScreenPortfolioReducerPayload>>
) {
  switch (action.type) {
    case PORTFOLIO_REDUCER_UPDATE:
      return { ...state, ...(action.payload as IScreenPortfolioReducerPayload) };
    case PORTFOLIO_CLEAN_SCREEN_DATA:
      return defaultValue;
    default:
      return state;
  }
}

export function DerivativesPortfolioTableInTradeData(
  state: IKisClientPortfolioResponse | null = null,
  action: IAction<IKisClientPortfolioResponse>
) {
  switch (action.type) {
    case KIS_PORTFOLIO_DERIVATIVES_TABLE:
      return null;
    case KIS_PORTFOLIO_DERIVATIVES_TABLE_SUCCESS:
      return { ...action.payload };
    case KIS_PORTFOLIO_DERIVATIVES_TABLE_FAILED:
      return null;
    default:
      return state;
  }
}
