import { IAction } from 'interfaces/common';
import { IOrderBook } from 'interfaces/equity';
import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import {
  IKisGetEqtAssetInfoResponse,
  IKisGetEqtStockInfoResponse,
  IKisGetEqtGenBuyAllResponses,
  IEqtOrderHistoryMappingResponse,
  IEqtEnquiryPortfolioResponse,
} from 'interfaces/services';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import { RESET } from '../action-type-utils';
import {
  SERVICE_GET_EQUITY_ASSET_INFO,
  SERVICE_GET_EQUITY_ENQUIRY_HISTORY_ORDER,
  SERVICE_GET_EQUITY_ENQUIRY_HISTORY_ORDER_RESET,
  SERVICE_GET_EQUITY_ENQUIRY_ORDER,
  SERVICE_GET_EQUITY_ENQUIRY_ORDER_RESET,
  SERVICE_GET_EQUITY_ENQUIRY_PORTFOLIO,
  SERVICE_GET_EQUITY_GEN_BUY_ALL,
  SERVICE_GET_EQUITY_STOCK_INFO,
  SERVICE_GET_EQUITY_GEN_BUY_ALL_ORDER_BOOK,
  REAL_TRADING_POST_EQT_ORDER_ODD_LOT_MODAL,
  REAL_TRADING_POST_EQT_ORDER_LO_STATUS,
  REAL_TRADING_POST_EQT_ORDER_ODD_LOT_STATUS,
  SERVICE_GET_EQUITY_ASSET_INFO_ORDER_BOOK,
  SERVICE_GET_EQUITY_STOCK_INFO_ORDER_BOOK,
} from 'reduxs/actions';

export function KisEquityStockInfo(
  state: ILoadingReducer<IKisGetEqtStockInfoResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IKisGetEqtStockInfoResponse>
): ILoadingReducer<IKisGetEqtStockInfoResponse | null> {
  switch (action.type) {
    case RESET(SERVICE_GET_EQUITY_STOCK_INFO):
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(SERVICE_GET_EQUITY_STOCK_INFO):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(SERVICE_GET_EQUITY_STOCK_INFO):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function KisEquityAssetInfo(
  state: ILoadingReducer<IKisGetEqtAssetInfoResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IKisGetEqtAssetInfoResponse>
): ILoadingReducer<IKisGetEqtAssetInfoResponse | null> {
  switch (action.type) {
    case RESET(SERVICE_GET_EQUITY_ASSET_INFO):
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(SERVICE_GET_EQUITY_ASSET_INFO):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(SERVICE_GET_EQUITY_ASSET_INFO):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function KisEquityGenBuyAll(
  state: ILoadingReducer<IKisGetEqtGenBuyAllResponses | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IKisGetEqtGenBuyAllResponses>
): ILoadingReducer<IKisGetEqtGenBuyAllResponses | null> {
  switch (action.type) {
    case SERVICE_GET_EQUITY_GEN_BUY_ALL:
      return { data: null, status: ReducerStatus.LOADING };
    case RESET(SERVICE_GET_EQUITY_GEN_BUY_ALL):
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(SERVICE_GET_EQUITY_GEN_BUY_ALL):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(SERVICE_GET_EQUITY_GEN_BUY_ALL):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function KisEquityAssetInfoOrderBook(
  state: ILoadingReducer<IKisGetEqtAssetInfoResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IKisGetEqtAssetInfoResponse>
): ILoadingReducer<IKisGetEqtAssetInfoResponse | null> {
  switch (action.type) {
    case RESET(SERVICE_GET_EQUITY_ASSET_INFO_ORDER_BOOK):
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(SERVICE_GET_EQUITY_ASSET_INFO_ORDER_BOOK):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(SERVICE_GET_EQUITY_ASSET_INFO_ORDER_BOOK):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function KisEquityStockInfoOrderBook(
  state: ILoadingReducer<IKisGetEqtStockInfoResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IKisGetEqtStockInfoResponse>
): ILoadingReducer<IKisGetEqtStockInfoResponse | null> {
  switch (action.type) {
    case RESET(SERVICE_GET_EQUITY_STOCK_INFO_ORDER_BOOK):
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(SERVICE_GET_EQUITY_STOCK_INFO_ORDER_BOOK):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(SERVICE_GET_EQUITY_STOCK_INFO_ORDER_BOOK):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function KisEquityGenBuyAllOrderBook(
  state: ILoadingReducer<IKisGetEqtGenBuyAllResponses | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IKisGetEqtGenBuyAllResponses>
): ILoadingReducer<IKisGetEqtGenBuyAllResponses | null> {
  switch (action.type) {
    case RESET(SERVICE_GET_EQUITY_GEN_BUY_ALL_ORDER_BOOK):
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(SERVICE_GET_EQUITY_GEN_BUY_ALL_ORDER_BOOK):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(SERVICE_GET_EQUITY_GEN_BUY_ALL_ORDER_BOOK):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function KisEquityEnquiryOrder(
  state: IOrderBook<IEqtOrderHistoryMappingResponse[]> = {
    data: [],
    status: ReducerStatus.LOADING,
    previous: [],
  },
  action: IAction<IEqtOrderHistoryMappingResponse[]>
): IOrderBook<IEqtOrderHistoryMappingResponse[]> {
  switch (action.type) {
    case SUCCESS(SERVICE_GET_EQUITY_ENQUIRY_ORDER):
      if (action.loadMore) {
        return { data: [...state.data, ...action.payload], status: ReducerStatus.SUCCESS, previous: action.payload };
      }
      return { data: action.payload.slice(0), status: ReducerStatus.SUCCESS, previous: action.payload };
    case FAILURE(SERVICE_GET_EQUITY_ENQUIRY_ORDER):
      return { ...state, status: ReducerStatus.FAILED, previous: [] };
    case SERVICE_GET_EQUITY_ENQUIRY_ORDER_RESET:
      return { data: [], status: ReducerStatus.LOADING, previous: [] };
    default:
      return state;
  }
}

export function KisEquityEnquiryHistoryOrder(
  state: IOrderBook<IEqtOrderHistoryMappingResponse[]> = {
    data: [],
    status: ReducerStatus.LOADING,
    previous: [],
  },
  action: IAction<IEqtOrderHistoryMappingResponse[]>
): IOrderBook<IEqtOrderHistoryMappingResponse[]> {
  switch (action.type) {
    case SUCCESS(SERVICE_GET_EQUITY_ENQUIRY_HISTORY_ORDER):
      if (action.loadMore) {
        return { data: [...state.data, ...action.payload], status: ReducerStatus.SUCCESS, previous: action.payload };
      }
      return { data: [...action.payload], status: ReducerStatus.SUCCESS, previous: action.payload };
    case FAILURE(SERVICE_GET_EQUITY_ENQUIRY_HISTORY_ORDER):
      return { ...state, status: ReducerStatus.FAILED, previous: [] };
    case SERVICE_GET_EQUITY_ENQUIRY_HISTORY_ORDER_RESET:
      return { data: [], status: ReducerStatus.LOADING, previous: [] };
    default:
      return state;
  }
}

export function KisEquityEnquiryPortfolio(
  state: IOrderBook<IEqtEnquiryPortfolioResponse[]> = {
    data: [],
    status: ReducerStatus.LOADING,
    previous: [],
  },
  action: IAction<IEqtEnquiryPortfolioResponse[]>
): IOrderBook<IEqtEnquiryPortfolioResponse[]> {
  switch (action.type) {
    case SUCCESS(SERVICE_GET_EQUITY_ENQUIRY_PORTFOLIO):
      if (action.loadMore) {
        return { data: [...state.data, ...action.payload], status: ReducerStatus.SUCCESS, previous: action.payload };
      }
      return { data: [...action.payload], status: ReducerStatus.SUCCESS, previous: action.payload };
    case FAILURE(SERVICE_GET_EQUITY_ENQUIRY_PORTFOLIO):
      return { data: [], status: ReducerStatus.FAILED, previous: [] };
    default:
      return state;
  }
}

export function OddLotModal(state = false, action: IAction<null>) {
  switch (action.type) {
    case REAL_TRADING_POST_EQT_ORDER_ODD_LOT_MODAL:
      return true;
    case RESET(REAL_TRADING_POST_EQT_ORDER_ODD_LOT_MODAL):
      return false;
    default:
      return state;
  }
}

export function OddLotOrderDetails(
  state = {
    oddLot: { quantity: 0, status: true },
    LO: { quantity: 0, status: true },
  },
  action: IAction<{ quantity: number; status: boolean }>
) {
  switch (action.type) {
    case REAL_TRADING_POST_EQT_ORDER_LO_STATUS:
      return { ...state, LO: { quantity: action.payload.quantity, status: action.payload.status } };
    case REAL_TRADING_POST_EQT_ORDER_ODD_LOT_STATUS:
      return { ...state, oddLot: { quantity: action.payload.quantity, status: action.payload.status } };
    case RESET(REAL_TRADING_POST_EQT_ORDER_ODD_LOT_MODAL):
      return {
        oddLot: { quantity: 0, status: true },
        LO: { quantity: 0, status: true },
      };
    default:
      return state;
  }
}
