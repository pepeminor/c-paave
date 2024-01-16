import { IAction } from 'interfaces/common';
import { IMostSearchStockResponse, ISearchRecentViewedResponse } from 'interfaces/search';
import { SEARCH_GET_MOST_SEARCH_STOCK, SEARCH_GET_RECENT_VIEWED } from 'reduxs/actions';
import { SUCCESS, FAILURE, RESET } from 'reduxs/action-type-utils';
import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import { ISearchUserResponse } from '../../interfaces/user';
import { SEARCH_GET_USER_INFO } from '../actions';

export function MostSearchtStock(
  state: ILoadingReducer<IMostSearchStockResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IMostSearchStockResponse>
): ILoadingReducer<IMostSearchStockResponse | null> {
  switch (action.type) {
    case SEARCH_GET_MOST_SEARCH_STOCK:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(SEARCH_GET_MOST_SEARCH_STOCK):
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case FAILURE(SEARCH_GET_MOST_SEARCH_STOCK):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function SearchUserInfo(
  state: ILoadingReducer<ISearchUserResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<ISearchUserResponse[]>
): ILoadingReducer<ISearchUserResponse[] | null> {
  switch (action.type) {
    case SEARCH_GET_USER_INFO:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(SEARCH_GET_USER_INFO):
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case FAILURE(SEARCH_GET_USER_INFO):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function GetRecentViewed(
  state: ILoadingReducer<ISearchRecentViewedResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<ISearchRecentViewedResponse>
): ILoadingReducer<ISearchRecentViewedResponse | null> {
  switch (action.type) {
    case RESET(SEARCH_GET_RECENT_VIEWED):
    case SEARCH_GET_RECENT_VIEWED:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(SEARCH_GET_RECENT_VIEWED):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(SEARCH_GET_RECENT_VIEWED):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}
