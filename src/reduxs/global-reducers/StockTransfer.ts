import { ILoadingReducer, ReducerStatus } from '../../interfaces/reducer';

import { SUCCESS, FAILURE, RESET } from '../action-type-utils';
import { IAction } from 'interfaces/common';
import {
  STOCK_TRANSFER_LIST_INSTRUMENT_PORTFOLIO,
  STOCK_TRANSFER_HISTORY_TRANSFER,
  STOCK_TRANSFER_DO_TRANSFER_STOCK,
  STOCK_TRANSFER_CHECK_TRANSFER_TIME,
} from '../actions';
import {
  IQueryListInstrumentPortfolioResponse,
  IQueryStockTransferHistoryResponse,
} from '../../interfaces/stockTransfer';

export function GetListInstrumentPortfolio(
  state: ILoadingReducer<IQueryListInstrumentPortfolioResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IQueryListInstrumentPortfolioResponse[]>
): ILoadingReducer<IQueryListInstrumentPortfolioResponse[] | null> {
  switch (action.type) {
    case STOCK_TRANSFER_LIST_INSTRUMENT_PORTFOLIO:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(STOCK_TRANSFER_LIST_INSTRUMENT_PORTFOLIO):
      return { data: action.payload != null ? action.payload.slice(0) : null, status: ReducerStatus.SUCCESS };
    case FAILURE(STOCK_TRANSFER_LIST_INSTRUMENT_PORTFOLIO):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(STOCK_TRANSFER_LIST_INSTRUMENT_PORTFOLIO):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function GetStockTransferHistory(
  state: ILoadingReducer<IQueryStockTransferHistoryResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IQueryStockTransferHistoryResponse[]>
): ILoadingReducer<IQueryStockTransferHistoryResponse[] | null> {
  switch (action.type) {
    case STOCK_TRANSFER_HISTORY_TRANSFER:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(STOCK_TRANSFER_HISTORY_TRANSFER):
      return { data: action.payload != null ? action.payload.slice(0) : null, status: ReducerStatus.SUCCESS };
    case FAILURE(STOCK_TRANSFER_HISTORY_TRANSFER):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(STOCK_TRANSFER_HISTORY_TRANSFER):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function CheckStockTransferAvailable(state: boolean | null = null, action: IAction<null>) {
  switch (action.type) {
    case STOCK_TRANSFER_CHECK_TRANSFER_TIME:
      return null;
    case SUCCESS(STOCK_TRANSFER_CHECK_TRANSFER_TIME):
      return true;
    case FAILURE(STOCK_TRANSFER_CHECK_TRANSFER_TIME):
      return false;
    case RESET(STOCK_TRANSFER_CHECK_TRANSFER_TIME):
      return null;
    default:
      return state;
  }
}

export function CheckDoStockTransfer(state: boolean | null = null, action: IAction<null>) {
  switch (action.type) {
    case STOCK_TRANSFER_DO_TRANSFER_STOCK:
      return null;
    case SUCCESS(STOCK_TRANSFER_DO_TRANSFER_STOCK):
      return true;
    case FAILURE(STOCK_TRANSFER_DO_TRANSFER_STOCK):
      return false;
    case RESET(STOCK_TRANSFER_DO_TRANSFER_STOCK):
      return null;
    default:
      return state;
  }
}
