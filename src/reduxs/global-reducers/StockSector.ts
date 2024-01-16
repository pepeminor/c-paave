import { IAction } from 'interfaces/common';
import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import { ICompanyOverviewResponse } from 'interfaces/stockSector';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import { STOCKSECTOR_GET_COMPANY_OVERVIEW } from 'reduxs/actions';

export function CompanyOverview(
  state: ILoadingReducer<ICompanyOverviewResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<ICompanyOverviewResponse>
): ILoadingReducer<ICompanyOverviewResponse | null> {
  switch (action.type) {
    case STOCKSECTOR_GET_COMPANY_OVERVIEW:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(STOCKSECTOR_GET_COMPANY_OVERVIEW):
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case FAILURE(STOCKSECTOR_GET_COMPANY_OVERVIEW):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}
