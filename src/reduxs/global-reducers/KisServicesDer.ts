import { IAction, IDerivativesPurchasingPowerResponse } from 'interfaces/common';
import { IOrderBook } from 'interfaces/equity';
import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import {
  IEqtOrderHistoryMappingResponse,
  IKisGetDerEnquiryClientStockStatementResponse,
  IKisGetDerMaxLongShortEnquiryResponse,
} from 'interfaces/services';
import { FAILURE, RESET, SUCCESS } from 'reduxs/action-type-utils';
import {
  QUERRY_ASSET_INFO_DER_DATA,
  SERVICE_GET_DER_ENQUIRY_CLIENT_STOCK_STATEMENT,
  SERVICE_GET_DER_ENQUIRY_HISTORY_ORDER,
  SERVICE_GET_DER_ENQUIRY_ORDER,
  SERVICE_GET_DER_MAX_LONG_SHORT_ENQUIRY,
} from 'reduxs/actions';

export function KisDerEnquiryOrder(
  state: IOrderBook<IEqtOrderHistoryMappingResponse[]> = {
    data: [],
    status: ReducerStatus.LOADING,
    previous: [],
  },
  action: IAction<IEqtOrderHistoryMappingResponse[]>
): IOrderBook<IEqtOrderHistoryMappingResponse[]> {
  switch (action.type) {
    case SERVICE_GET_DER_ENQUIRY_ORDER:
      return { ...state, status: ReducerStatus.LOADING };
    case SUCCESS(SERVICE_GET_DER_ENQUIRY_ORDER):
      if (action.loadMore) {
        return { data: [...state.data, ...action.payload], status: ReducerStatus.SUCCESS, previous: action.payload };
      }
      return { data: action.payload, status: ReducerStatus.SUCCESS, previous: action.payload };
    case FAILURE(SERVICE_GET_DER_ENQUIRY_ORDER):
      return { ...state, status: ReducerStatus.FAILED, previous: [] };
    case RESET(SERVICE_GET_DER_ENQUIRY_ORDER):
      return { data: [], status: ReducerStatus.LOADING, previous: [] };
    default:
      return state;
  }
}

export function KisDerEnquiryHistoryOrder(
  state: IOrderBook<IEqtOrderHistoryMappingResponse[]> = {
    data: [],
    status: ReducerStatus.LOADING,
    previous: [],
  },
  action: IAction<IEqtOrderHistoryMappingResponse[]>
): IOrderBook<IEqtOrderHistoryMappingResponse[]> {
  switch (action.type) {
    case SERVICE_GET_DER_ENQUIRY_HISTORY_ORDER:
      return { ...state, status: ReducerStatus.LOADING };
    case SUCCESS(SERVICE_GET_DER_ENQUIRY_HISTORY_ORDER):
      if (action.loadMore) {
        return { data: [...state.data, ...action.payload], status: ReducerStatus.SUCCESS, previous: action.payload };
      }
      return { data: [...action.payload], status: ReducerStatus.SUCCESS, previous: action.payload };
    case FAILURE(SERVICE_GET_DER_ENQUIRY_HISTORY_ORDER):
      return { ...state, status: ReducerStatus.FAILED, previous: [] };
    case RESET(SERVICE_GET_DER_ENQUIRY_HISTORY_ORDER):
      return { data: [], status: ReducerStatus.LOADING, previous: [] };
    default:
      return state;
  }
}

export function KisDerEnquiryMaxLongShort(
  state: ILoadingReducer<IKisGetDerMaxLongShortEnquiryResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IKisGetDerMaxLongShortEnquiryResponse>
): ILoadingReducer<IKisGetDerMaxLongShortEnquiryResponse | null> {
  switch (action.type) {
    case SERVICE_GET_DER_MAX_LONG_SHORT_ENQUIRY:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(SERVICE_GET_DER_MAX_LONG_SHORT_ENQUIRY):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(SERVICE_GET_DER_MAX_LONG_SHORT_ENQUIRY):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(SERVICE_GET_DER_MAX_LONG_SHORT_ENQUIRY):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function KisDerAssetInformationData(
  state: ILoadingReducer<IDerivativesPurchasingPowerResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IDerivativesPurchasingPowerResponse>
): ILoadingReducer<IDerivativesPurchasingPowerResponse | null> {
  switch (action.type) {
    case SUCCESS(QUERRY_ASSET_INFO_DER_DATA):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(QUERRY_ASSET_INFO_DER_DATA):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(QUERRY_ASSET_INFO_DER_DATA):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function KisDerEnquiryClientStockStatement(
  state: ILoadingReducer<IKisGetDerEnquiryClientStockStatementResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IKisGetDerEnquiryClientStockStatementResponse[]>
): ILoadingReducer<IKisGetDerEnquiryClientStockStatementResponse[] | null> {
  switch (action.type) {
    case SERVICE_GET_DER_ENQUIRY_CLIENT_STOCK_STATEMENT:
      return { ...state, status: ReducerStatus.LOADING };
    case SUCCESS(SERVICE_GET_DER_ENQUIRY_CLIENT_STOCK_STATEMENT):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(SERVICE_GET_DER_ENQUIRY_CLIENT_STOCK_STATEMENT):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(SERVICE_GET_DER_ENQUIRY_CLIENT_STOCK_STATEMENT):
      return {
        data: null,
        status: ReducerStatus.LOADING,
      };
    default:
      return state;
  }
}
