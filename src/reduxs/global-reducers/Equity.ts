import { IAction } from 'interfaces/common';
import {
  IDailyProfitLossResponse,
  IEquityOrderStopCancelMultiResponse,
  IEquityOrderStopResponse,
  IOrderStopHistoryResponse,
  IProfitLossResponse,
  IMostBoughtStockResponse,
  IMostSoldStockResponse,
  IEventByStockResponse,
  IGetCashAndStockBalanceResponse,
  IGetAccountBalanceResponse,
  IGetLocalAdvanceCreationResponse,
  IGetCashAdvanceHistoryResponse,
  IGetAllRightListResponse,
  IGetEntitlementStockListResponse,
  IGetEntitlementHistoryResponse,
  IGetAdditionIssueShareInfoResponse,
  IGetEnquirySignOrderResponse,
  IGetEnquirySignOrderParams,
  IGetRealizedProfitLossResponse,
  IAccumulativeProfitLossResponse,
  IAccumulativeProfitLossParams,
} from 'interfaces/equity';
import {
  EQUITY_GET_ACTIVE_ORDER,
  EQUITY_GET_ORDER_HISTORY,
  EQUITY_GET_ORDER_STOP_HISTORY,
  EQUITY_GET_PROFIT_LOSS,
  EQUITY_ORDER_STOP_CANCEL,
  EQUITY_ORDER_STOP_CANCEL_MULTI,
  EQUITY_ORDER_STOP_MODIFY,
  EQUITY_ORDER,
  EQUITY_ORDER_STOP,
  EQUITY_GET_FOLLOWING_PROFIT_LOSS,
  EQUITY_GET_MOST_BOUGHT_STOCK,
  EQUITY_GET_MOST_SOLD_STOCK,
  EQUITY_GET_EVENT_BY_STOCK,
  ORDERBOOK_RESET_ORDERBOOK,
  EQUITY_GET_CASH_BALANCE_AND_STOCK_BALANCE,
  EQUITY_GET_ACCOUNT_BALANCE,
  EQUITY_GET_NAV_CHANGE,
  EQUITY_GET_LOCAL_ADVANCE_CREATION,
  EQUITY_GET_CASH_ADVANCE_HISTORY,
  EQUITY_SUBMIT_ADVANCE_PAYMENT_CREATION,
  EQUITY_RESET_CASH_ADVANCE_STATE,
  EQUITY_GET_ALL_RIGHT_LIST,
  EQUITY_GET_ENTITLEMENT_HISTORY,
  EQUITY_SET_ITEM_PURCHASE_RIGHT,
  EQUITY_ADDITION_ISSUE_SHARE_INFO,
  EQUITY_GET_ENTITLEMENT_STOCK_LIST,
  EQUITY_GET_SIGN_ORDER,
  RESET_ORDER_CONFIRMATION,
  // EQUITY_RESET_DAILY_PROFIT_LOSS,
  EQUITY_GET_PROFIT_LOSS_VIRTUAL,
  EQUITY_GET_REALIZED_PROFIT_LOSS,
  MODIFY_ORDERBOOK_SUCCESS_TRIGGER,
  CANCEL_ORDERBOOK_SUCCESS_TRIGGER,
  EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_BY_DATE,
  EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_KIS_BY_DATE,
  EQUITY_GET_ACCUMULATIVE_NAV,
} from 'reduxs/actions';
import { SUCCESS, FAILURE, RESET } from 'reduxs/action-type-utils';
import { ILoadingReducer, ILoadingReducerWithPreData, ReducerStatus } from 'interfaces/reducer';
import { IFollowingDailyProfitLossResponse, IOrderBook } from 'interfaces/equity';
import { isEqual } from 'lodash';
import { IEqtOrderHistoryMappingResponse } from 'interfaces/services';
import { KIS_GET_PROFIT_LOSS, EQUITY_ORDER_SUCCESS, EQUITY_ORDER_KIS_SUCCESS } from '../actions';
import { isNotNilOrEmpty } from 'ramda-adjunct';

export function NAVChange(
  state: ILoadingReducerWithPreData<IDailyProfitLossResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
    previous: null,
  },
  action: IAction<IDailyProfitLossResponse>
): ILoadingReducerWithPreData<IDailyProfitLossResponse | null> {
  switch (action.type) {
    case EQUITY_GET_NAV_CHANGE:
      return { ...state, status: ReducerStatus.LOADING };
    case SUCCESS(EQUITY_GET_NAV_CHANGE): {
      if (action.payload.dailyProfitLosses.length === 0 || isEqual(state.previous, action.payload))
        // Stop getting new page
        return { ...state, previous: null, status: ReducerStatus.SUCCESS };
      const mergeNAVChange = () => {
        if (!state.data) return action.payload;
        return {
          ...action.payload,
          dailyProfitLosses: [...state.data.dailyProfitLosses, ...action.payload.dailyProfitLosses],
        };
      };
      return {
        data: mergeNAVChange(),
        status: ReducerStatus.SUCCESS,
        previous: action.payload,
      };
    }
    case FAILURE(EQUITY_GET_NAV_CHANGE):
      if (action.loadMore) {
        return { ...state, status: ReducerStatus.FAILED };
      }
      return { data: null, status: ReducerStatus.FAILED, previous: null };
    case RESET(EQUITY_GET_NAV_CHANGE):
      return {
        data: null,
        status: ReducerStatus.LOADING,
        previous: null,
      };
    default:
      return state;
  }
}

export function AccumulativeNAV(
  state: IAccumulativeProfitLossResponse | null = null,
  action: IAction<IAccumulativeProfitLossParams>
): IAccumulativeProfitLossResponse | null {
  switch (action.type) {
    case EQUITY_GET_ACCUMULATIVE_NAV:
      return null;
    case SUCCESS(EQUITY_GET_ACCUMULATIVE_NAV):
      return isNotNilOrEmpty(action.payload) ? (action.payload as unknown as IAccumulativeProfitLossResponse) : null;
    case FAILURE(EQUITY_GET_ACCUMULATIVE_NAV):
      return null;
    default:
      return state;
  }
}

export function CashBalanceAndStockBalance(
  state: ILoadingReducer<IGetCashAndStockBalanceResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IGetCashAndStockBalanceResponse>
): ILoadingReducer<IGetCashAndStockBalanceResponse | null> {
  switch (action.type) {
    case EQUITY_GET_CASH_BALANCE_AND_STOCK_BALANCE:
      return { ...state, status: ReducerStatus.LOADING };
    case SUCCESS(EQUITY_GET_CASH_BALANCE_AND_STOCK_BALANCE):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(EQUITY_GET_CASH_BALANCE_AND_STOCK_BALANCE):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(EQUITY_GET_CASH_BALANCE_AND_STOCK_BALANCE):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function AccountBalance(
  state: ILoadingReducer<IGetAccountBalanceResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IGetAccountBalanceResponse>
): ILoadingReducer<IGetAccountBalanceResponse | null> {
  switch (action.type) {
    case EQUITY_GET_ACCOUNT_BALANCE:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(EQUITY_GET_ACCOUNT_BALANCE):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(EQUITY_GET_ACCOUNT_BALANCE):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function ProfitLoss(
  state: ILoadingReducer<IProfitLossResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IProfitLossResponse>
): ILoadingReducer<IProfitLossResponse | null> {
  switch (action.type) {
    case EQUITY_GET_PROFIT_LOSS:
      return { ...state, status: ReducerStatus.LOADING };
    case KIS_GET_PROFIT_LOSS:
      return { ...state, status: ReducerStatus.LOADING };
    case SUCCESS(EQUITY_GET_PROFIT_LOSS):
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case FAILURE(EQUITY_GET_PROFIT_LOSS):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function RealizedProfitLoss(
  state: ILoadingReducer<IGetRealizedProfitLossResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IGetRealizedProfitLossResponse[]>
): ILoadingReducer<IGetRealizedProfitLossResponse[] | null> {
  switch (action.type) {
    case EQUITY_GET_REALIZED_PROFIT_LOSS:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(EQUITY_GET_REALIZED_PROFIT_LOSS):
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case FAILURE(EQUITY_GET_REALIZED_PROFIT_LOSS):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function VirtualProfitLoss(
  state: ILoadingReducer<IProfitLossResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IProfitLossResponse>
): ILoadingReducer<IProfitLossResponse | null> {
  switch (action.type) {
    case EQUITY_GET_PROFIT_LOSS_VIRTUAL:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(EQUITY_GET_PROFIT_LOSS_VIRTUAL):
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case FAILURE(EQUITY_GET_PROFIT_LOSS_VIRTUAL):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function ActiveOrder(
  state: IOrderBook<IEqtOrderHistoryMappingResponse[]> = {
    data: [],
    status: ReducerStatus.LOADING,
    previous: [],
  },
  action: IAction<IEqtOrderHistoryMappingResponse[]>
): IOrderBook<IEqtOrderHistoryMappingResponse[]> {
  switch (action.type) {
    case SUCCESS(EQUITY_GET_ACTIVE_ORDER):
      if (action.loadMore) {
        if (isEqual(state.previous, action.payload)) return { ...state, status: ReducerStatus.SUCCESS, previous: [] };
        return { data: [...state.data, ...action.payload], status: ReducerStatus.SUCCESS, previous: action.payload };
      }
      return { data: [...action.payload], status: ReducerStatus.SUCCESS, previous: action.payload };
    case FAILURE(EQUITY_GET_ACTIVE_ORDER):
      return { ...state, status: ReducerStatus.FAILED, previous: [] };
    case ORDERBOOK_RESET_ORDERBOOK:
      return {
        data: [],
        status: ReducerStatus.LOADING,
        previous: [],
      };
    default:
      return state;
  }
}

export function OrderHistory(
  state: IOrderBook<IEqtOrderHistoryMappingResponse[]> = {
    data: [],
    status: ReducerStatus.LOADING,
    previous: [],
  },
  action: IAction<IEqtOrderHistoryMappingResponse[]>
): IOrderBook<IEqtOrderHistoryMappingResponse[]> {
  switch (action.type) {
    case SUCCESS(EQUITY_GET_ORDER_HISTORY):
      if (action.loadMore) {
        if (isEqual(state.previous, action.payload)) return { ...state, status: ReducerStatus.SUCCESS, previous: [] };
        return { data: [...state.data, ...action.payload], status: ReducerStatus.SUCCESS, previous: action.payload };
      }
      return { data: [...action.payload], status: ReducerStatus.SUCCESS, previous: action.payload };
    case FAILURE(EQUITY_GET_ORDER_HISTORY):
      return { ...state, status: ReducerStatus.FAILED, previous: [] };
    case ORDERBOOK_RESET_ORDERBOOK:
      return {
        data: [],
        status: ReducerStatus.LOADING,
        previous: [],
      };
    default:
      return state;
  }
}

export function OrderStopHistory(
  state: IOrderBook<IOrderStopHistoryResponse[]> = {
    data: [],
    status: ReducerStatus.LOADING,
    previous: [],
  },
  action: IAction<IOrderStopHistoryResponse[]>
): IOrderBook<IOrderStopHistoryResponse[]> {
  switch (action.type) {
    case SUCCESS(EQUITY_GET_ORDER_STOP_HISTORY):
      if (action.loadMore) {
        if (isEqual(state.previous, action.payload)) return { ...state, status: ReducerStatus.SUCCESS, previous: [] };
        return { data: [...state.data, ...action.payload], status: ReducerStatus.SUCCESS, previous: action.payload };
      }
      return { data: [...action.payload], status: ReducerStatus.SUCCESS, previous: action.payload };
    case FAILURE(EQUITY_GET_ORDER_STOP_HISTORY):
      return { ...state, status: ReducerStatus.FAILED, previous: [] };
    case ORDERBOOK_RESET_ORDERBOOK:
      return {
        data: [],
        status: ReducerStatus.LOADING,
        previous: [],
      };
    default:
      return state;
  }
}

export function OrderSuccess(state = false, action: IAction<null>) {
  switch (action.type) {
    case EQUITY_ORDER_SUCCESS:
      return !state;
    default:
      return state;
  }
}

export function OrderKISSuccess(state = false, action: IAction<null>) {
  switch (action.type) {
    case EQUITY_ORDER_KIS_SUCCESS:
      return !state;
    default:
      return state;
  }
}

export function ModifyOrderBookSuccessTrigger(state = false, action: IAction<null>) {
  switch (action.type) {
    case MODIFY_ORDERBOOK_SUCCESS_TRIGGER:
      return !state;
    default:
      return state;
  }
}

export function CancelOrderBookSuccessTrigger(state = false, action: IAction<null>) {
  switch (action.type) {
    case CANCEL_ORDERBOOK_SUCCESS_TRIGGER:
      return !state;
    default:
      return state;
  }
}

export function CancelStopOrder(
  state: ILoadingReducer<IEquityOrderStopResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IEquityOrderStopResponse>
): ILoadingReducer<IEquityOrderStopResponse | null> {
  switch (action.type) {
    case EQUITY_ORDER_STOP_CANCEL:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(EQUITY_ORDER_STOP_CANCEL):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(EQUITY_ORDER_STOP_CANCEL):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function CancelMultiStopOrder(
  state: ILoadingReducer<IEquityOrderStopCancelMultiResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IEquityOrderStopCancelMultiResponse[]>
): ILoadingReducer<IEquityOrderStopCancelMultiResponse[] | null> {
  switch (action.type) {
    case EQUITY_ORDER_STOP_CANCEL_MULTI:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(EQUITY_ORDER_STOP_CANCEL_MULTI):
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case FAILURE(EQUITY_ORDER_STOP_CANCEL_MULTI):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function OrderStatus(
  state = {
    status: ReducerStatus.LOADING,
  },
  action: IAction<unknown>
) {
  switch (action.type) {
    case EQUITY_ORDER:
      return { status: ReducerStatus.LOADING };
    case SUCCESS(EQUITY_ORDER):
      return { status: ReducerStatus.SUCCESS };
    case FAILURE(EQUITY_ORDER):
      return { status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function ModifyStopOrder(
  state: ILoadingReducer<IEquityOrderStopResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IEquityOrderStopResponse>
): ILoadingReducer<IEquityOrderStopResponse | null> {
  switch (action.type) {
    case EQUITY_ORDER_STOP_MODIFY:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(EQUITY_ORDER_STOP_MODIFY):
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case FAILURE(EQUITY_ORDER_STOP_MODIFY):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function OrderStopStatus(
  state = {
    status: ReducerStatus.LOADING,
  },
  action: IAction<unknown>
) {
  switch (action.type) {
    case EQUITY_ORDER_STOP:
      return { status: ReducerStatus.LOADING };
    case SUCCESS(EQUITY_ORDER_STOP):
      return { status: ReducerStatus.SUCCESS };
    case FAILURE(EQUITY_ORDER_STOP):
      return { status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function FollowingProfitLoss(
  state: ILoadingReducer<IProfitLossResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IProfitLossResponse>
): ILoadingReducer<IProfitLossResponse | null> {
  switch (action.type) {
    case EQUITY_GET_FOLLOWING_PROFIT_LOSS:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(EQUITY_GET_FOLLOWING_PROFIT_LOSS):
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case FAILURE(EQUITY_GET_FOLLOWING_PROFIT_LOSS):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function FollowingDailyProfitLossByDate(
  state: ILoadingReducer<IFollowingDailyProfitLossResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IFollowingDailyProfitLossResponse>
): ILoadingReducer<IFollowingDailyProfitLossResponse | null> {
  switch (action.type) {
    case EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_BY_DATE:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_BY_DATE):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_BY_DATE):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function FollowingDailyProfitLossKisByDate(
  state: ILoadingReducer<IFollowingDailyProfitLossResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IFollowingDailyProfitLossResponse>
): ILoadingReducer<IFollowingDailyProfitLossResponse | null> {
  switch (action.type) {
    case EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_KIS_BY_DATE:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_KIS_BY_DATE):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_KIS_BY_DATE):
      return {
        data: {
          errorMessage: action.payload.errorMessage,
          followingDailyProfits: [],
        },
        status: ReducerStatus.FAILED,
      };
    default:
      return state;
  }
}

// HOT STOCK
export function MostBoughtStock(
  state: ILoadingReducer<IMostBoughtStockResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IMostBoughtStockResponse>
): ILoadingReducer<IMostBoughtStockResponse | null> {
  switch (action.type) {
    case EQUITY_GET_MOST_BOUGHT_STOCK:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(EQUITY_GET_MOST_BOUGHT_STOCK):
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case FAILURE(EQUITY_GET_MOST_BOUGHT_STOCK):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function MostSoldtStock(
  state: ILoadingReducer<IMostSoldStockResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IMostSoldStockResponse>
): ILoadingReducer<IMostSoldStockResponse | null> {
  switch (action.type) {
    case EQUITY_GET_MOST_SOLD_STOCK:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(EQUITY_GET_MOST_SOLD_STOCK):
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case FAILURE(EQUITY_GET_MOST_SOLD_STOCK):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function GetEventByStock(
  state: ILoadingReducer<IEventByStockResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IEventByStockResponse[]>
): ILoadingReducer<IEventByStockResponse[] | null> {
  switch (action.type) {
    case EQUITY_GET_EVENT_BY_STOCK:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(EQUITY_GET_EVENT_BY_STOCK):
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case FAILURE(EQUITY_GET_EVENT_BY_STOCK):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

type ICashInAdvanceState = {
  localAdvanceCreation: IGetLocalAdvanceCreationResponse | null;
  cashAdvanceHistory: ILoadingReducer<IGetCashAdvanceHistoryResponse[]>;
  checkAdvancePaymentTime: boolean | null;
  submitAdvancePaymentCreation: boolean | null;
};

export function CashInAdvanceState(
  state: ICashInAdvanceState = {
    localAdvanceCreation: null,
    cashAdvanceHistory: {
      data: [],
      status: ReducerStatus.LOADING,
    },
    checkAdvancePaymentTime: null,
    submitAdvancePaymentCreation: null,
  },
  action: IAction<IGetLocalAdvanceCreationResponse | IGetCashAdvanceHistoryResponse[] | boolean>
  // EQUITY_GET_LOCAL_ADVANCE_CREATION ----- IGetLocalAdvanceCreationResponse
  // EQUITY_GET_CASH_ADVANCE_HISTORY ----- IGetCashAdvanceHistoryResponse[]
  // EQUITY_SUBMIT_ADVANCE_PAYMENT_CREATION ----- boolean
): ICashInAdvanceState {
  switch (action.type) {
    case SUCCESS(EQUITY_GET_LOCAL_ADVANCE_CREATION):
      return { ...state, localAdvanceCreation: action.payload as IGetLocalAdvanceCreationResponse };
    case FAILURE(EQUITY_GET_LOCAL_ADVANCE_CREATION):
      return { ...state, localAdvanceCreation: null };
    case EQUITY_GET_CASH_ADVANCE_HISTORY:
      return {
        ...state,
        cashAdvanceHistory: {
          data: [],
          status: ReducerStatus.LOADING,
        },
      };
    case SUCCESS(EQUITY_GET_CASH_ADVANCE_HISTORY):
      return {
        ...state,
        cashAdvanceHistory: {
          data: action.payload != null ? (action.payload as IGetCashAdvanceHistoryResponse[]) : [],
          status: ReducerStatus.SUCCESS,
        },
      };
    case FAILURE(EQUITY_GET_CASH_ADVANCE_HISTORY):
      return {
        ...state,
        cashAdvanceHistory: {
          data: [],
          status: ReducerStatus.FAILED,
        },
      };
    case EQUITY_SUBMIT_ADVANCE_PAYMENT_CREATION:
      return { ...state, submitAdvancePaymentCreation: null };
    case SUCCESS(EQUITY_SUBMIT_ADVANCE_PAYMENT_CREATION):
      return { ...state, submitAdvancePaymentCreation: action.payload as boolean };
    case FAILURE(EQUITY_SUBMIT_ADVANCE_PAYMENT_CREATION):
      return { ...state, submitAdvancePaymentCreation: false };
    case EQUITY_RESET_CASH_ADVANCE_STATE:
      return {
        localAdvanceCreation: null,
        cashAdvanceHistory: {
          data: [],
          status: ReducerStatus.LOADING,
        },
        checkAdvancePaymentTime: null,
        submitAdvancePaymentCreation: null,
      };
    default:
      return state;
  }
}

type IRegisterExerciseState = {
  allRightList: ILoadingReducer<IGetAllRightListResponse[]>;
  entitlementHistory: ILoadingReducer<IGetEntitlementHistoryResponse[]>;
  itemPurchaseRight?: IGetAdditionIssueShareInfoResponse;
  additionalIssueInfo: ILoadingReducer<IGetAdditionIssueShareInfoResponse[]>;
  entitlementStockList?: IGetEntitlementStockListResponse;
};

export function RegisterExerciseState(
  state: IRegisterExerciseState = {
    allRightList: {
      data: [],
      status: ReducerStatus.LOADING,
    },
    entitlementHistory: {
      data: [],
      status: ReducerStatus.LOADING,
    },
    additionalIssueInfo: {
      data: [],
      status: ReducerStatus.LOADING,
    },
  },
  action: IAction<
    | IGetAllRightListResponse[]
    | IGetEntitlementHistoryResponse[]
    | IGetAdditionIssueShareInfoResponse[]
    | IGetAdditionIssueShareInfoResponse
    | IGetEntitlementStockListResponse
  >
  // EQUITY_GET_ALL_RIGHT_LIST ----- IGetAllRightListResponse[]
  // EQUITY_GET_ENTITLEMENT_HISTORY ----- IGetEntitlementHistoryResponse
  // EQUITY_SET_ITEM_PURCHASE_RIGHT ----- IGetAdditionIssueShareInfoResponse | null
  // EQUITY_ADDITION_ISSUE_SHARE_INFO ----- IGetAdditionIssueShareInfoResponse[]
  // EQUITY_GET_ENTITLEMENT_STOCK_LIST ----- IGetEntitlementStockListResponse[]
): IRegisterExerciseState {
  switch (action.type) {
    // EQUITY_GET_ALL_RIGHT_LIST
    case EQUITY_GET_ALL_RIGHT_LIST:
      return {
        ...state,
        allRightList: {
          data: [],
          status: ReducerStatus.LOADING,
        },
      };
    case SUCCESS(EQUITY_GET_ALL_RIGHT_LIST):
      return {
        ...state,
        allRightList: {
          data: action.payload != null ? (action.payload as IGetAllRightListResponse[]) : [],
          status: ReducerStatus.SUCCESS,
        },
      };
    case FAILURE(EQUITY_GET_ALL_RIGHT_LIST):
      return {
        ...state,
        allRightList: {
          data: [],
          status: ReducerStatus.FAILED,
        },
      };
    // EQUITY_GET_ENTITLEMENT_HISTORY
    case EQUITY_GET_ENTITLEMENT_HISTORY:
      return {
        ...state,
        entitlementHistory: {
          data: [],
          status: ReducerStatus.LOADING,
        },
      };
    case SUCCESS(EQUITY_GET_ENTITLEMENT_HISTORY):
      return {
        ...state,
        entitlementHistory: {
          data: action.payload != null ? (action.payload as IGetEntitlementHistoryResponse[]) : [],
          status: ReducerStatus.SUCCESS,
        },
      };
    case FAILURE(EQUITY_GET_ENTITLEMENT_HISTORY):
      return {
        ...state,
        entitlementHistory: {
          data: [],
          status: ReducerStatus.FAILED,
        },
      };
    // EQUITY_SET_ITEM_PURCHASE_RIGHT
    case EQUITY_SET_ITEM_PURCHASE_RIGHT:
      return {
        ...state,
        itemPurchaseRight: action.payload as IGetAdditionIssueShareInfoResponse,
      };
    // EQUITY_ADDITION_ISSUE_SHARE_INFO
    case EQUITY_ADDITION_ISSUE_SHARE_INFO:
      return {
        ...state,
        additionalIssueInfo: {
          data: [],
          status: ReducerStatus.LOADING,
        },
      };
    case SUCCESS(EQUITY_ADDITION_ISSUE_SHARE_INFO):
      return {
        ...state,
        additionalIssueInfo: {
          data: action.payload != null ? (action.payload as IGetAdditionIssueShareInfoResponse[]) : [],
          status: ReducerStatus.SUCCESS,
        },
      };
    case FAILURE(EQUITY_ADDITION_ISSUE_SHARE_INFO):
      return {
        ...state,
        additionalIssueInfo: {
          data: [],
          status: ReducerStatus.FAILED,
        },
      };
    // EQUITY_GET_ENTITLEMENT_STOCK_LIST
    case EQUITY_GET_ENTITLEMENT_STOCK_LIST:
      return {
        ...state,
        entitlementStockList: undefined,
      };
    case SUCCESS(EQUITY_GET_ENTITLEMENT_STOCK_LIST):
      return {
        ...state,
        entitlementStockList: action.payload as IGetEntitlementStockListResponse,
      };
    case FAILURE(EQUITY_GET_ENTITLEMENT_STOCK_LIST):
      return {
        ...state,
        entitlementStockList: undefined,
      };
    default:
      return state;
  }
}

export function OrderConfirmation(
  state: ILoadingReducerWithPreData<IGetEnquirySignOrderResponse[]> = {
    previous: [],
    status: ReducerStatus.LOADING,
    data: [],
  },
  action: IAction<IGetEnquirySignOrderParams | IGetEnquirySignOrderResponse[]>
): ILoadingReducerWithPreData<IGetEnquirySignOrderResponse[]> {
  switch (action.type) {
    case EQUITY_GET_SIGN_ORDER: {
      const payload = action.payload as IGetEnquirySignOrderParams;
      if ((payload.offset ?? 0) > 0) {
        return { ...state, status: ReducerStatus.LOADING };
      } else {
        return {
          previous: [],
          status: ReducerStatus.LOADING,
          data: [],
        };
      }
    }
    case SUCCESS(EQUITY_GET_SIGN_ORDER): {
      const payload = action.payload as IGetEnquirySignOrderResponse[];
      if (action.loadMore) {
        return {
          data: [...state.data, ...payload],
          status: ReducerStatus.SUCCESS,
          previous: payload,
        };
      }
      return {
        data: [...payload],
        status: ReducerStatus.SUCCESS,
        previous: payload,
      };
    }
    case FAILURE(EQUITY_GET_SIGN_ORDER):
      if (action.loadMore) {
        return {
          ...state,
          status: ReducerStatus.FAILED,
        };
      }
      return {
        data: [],
        status: ReducerStatus.FAILED,
        previous: [],
      };
    case RESET_ORDER_CONFIRMATION:
      return {
        previous: [],
        status: ReducerStatus.LOADING,
        data: [],
      };
    default:
      return state;
  }
}
