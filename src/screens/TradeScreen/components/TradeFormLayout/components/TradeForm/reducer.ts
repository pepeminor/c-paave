import { IAction } from 'interfaces/common';
import { IMaxBuySellResponse } from 'interfaces/derivatives';
import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import {
  OPEN_EXECUTE_MODAL,
  CLOSE_EXECUTE_MODAL,
  QUERY_MAX_BUY_SELL,
  QUERY_DERIVATIVES_PURCHASING_POWER,
} from 'reduxs/actions';

export const QUERY_MAX_BUY_SELL_SUCCESS = 'QUERY_MAX_BUY_SELL_SUCCESS';
export const QUERY_MAX_BUY_SELL_FAILED = 'QUERY_MAX_BUY_SELL_FAILED';
export const QUERY_DERIVATIVES_PURCHASING_POWER_SUCCESS = 'QUERY_DERIVATIVES_PURCHASING_POWER_SUCCESS';
export const QUERY_DERIVATIVES_PURCHASING_POWER_FAILED = 'QUERY_DERIVATIVES_PURCHASING_POWER_FAILED';

export function OnExecuteModal(state = false, action: IAction<null>) {
  switch (action.type) {
    case CLOSE_EXECUTE_MODAL:
      return false;
    case OPEN_EXECUTE_MODAL:
      return true;
    default:
      return state;
  }
}

export function MaxBuySell(
  state: ILoadingReducer<IMaxBuySellResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IMaxBuySellResponse>
): ILoadingReducer<IMaxBuySellResponse | null> {
  switch (action.type) {
    case QUERY_MAX_BUY_SELL:
      return { data: null, status: ReducerStatus.LOADING };
    case QUERY_MAX_BUY_SELL_SUCCESS:
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case QUERY_MAX_BUY_SELL_FAILED:
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function QueryMaxBuySellSuccessTrigger(
  state: IMaxBuySellResponse | null = null,
  action: IAction<IMaxBuySellResponse>
): IMaxBuySellResponse | null {
  switch (action.type) {
    case QUERY_MAX_BUY_SELL_SUCCESS:
      return { ...action.payload };
    default:
      return state;
  }
}

export function DerivativesPurchasingPower(
  state: ILoadingReducer<number | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<number>
): ILoadingReducer<number | null> {
  switch (action.type) {
    case QUERY_DERIVATIVES_PURCHASING_POWER:
      return { data: null, status: ReducerStatus.LOADING };
    case QUERY_DERIVATIVES_PURCHASING_POWER_SUCCESS:
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case QUERY_DERIVATIVES_PURCHASING_POWER_FAILED:
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}
