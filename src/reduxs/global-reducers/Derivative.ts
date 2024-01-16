import { IAction } from 'interfaces/common';
import { PORTFOLIO_DERIVATIVE } from 'reduxs/actions';
import { SUCCESS, FAILURE } from 'reduxs/action-type-utils';
import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import { IGetDerivativePortfolioResponse } from 'interfaces/derivatives';

export function DerivativePortfolio(
  state: ILoadingReducer<IGetDerivativePortfolioResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IGetDerivativePortfolioResponse>
): ILoadingReducer<IGetDerivativePortfolioResponse | null> {
  switch (action.type) {
    case SUCCESS(PORTFOLIO_DERIVATIVE):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(PORTFOLIO_DERIVATIVE):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}
