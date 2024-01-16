import { IAction } from 'interfaces/common';
import { ILoadingReducerWithPreData, ReducerStatus } from 'interfaces/reducer';
import { SUCCESS, FAILURE, RESET } from 'reduxs/action-type-utils';
import { ITradingHistoryResponse } from 'interfaces/profile';
import { PROFILE_GET_TRADING_HISTORY } from 'reduxs/actions';
import { isEqual } from 'lodash';

export function TradingHistory(
  state: ILoadingReducerWithPreData<ITradingHistoryResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
    previous: null,
  },
  action: IAction<ITradingHistoryResponse>
): ILoadingReducerWithPreData<ITradingHistoryResponse | null> {
  switch (action.type) {
    case PROFILE_GET_TRADING_HISTORY:
      return { ...state, status: ReducerStatus.LOADING };
    case SUCCESS(PROFILE_GET_TRADING_HISTORY):
      if (action.loadMore) {
        if (isEqual(state.previous, action.payload)) return { ...state, status: ReducerStatus.SUCCESS, previous: null };
        return {
          data: { tradingHistories: [...(state.data?.tradingHistories ?? []), ...action.payload.tradingHistories] },
          status: ReducerStatus.SUCCESS,
          previous: action.payload,
        };
      }
      return { data: action.payload, status: ReducerStatus.SUCCESS, previous: action.payload };
    case FAILURE(PROFILE_GET_TRADING_HISTORY):
      return { ...state, status: ReducerStatus.FAILED, previous: null };
    case RESET(PROFILE_GET_TRADING_HISTORY):
      return { data: null, status: ReducerStatus.LOADING, previous: null };
    default:
      return state;
  }
}
