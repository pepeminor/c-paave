import { IAction } from 'interfaces/common';
import {
  ORDERBOOK_CANCEL_MODE,
  ORDERBOOK_SCREEN_OPTION,
  ORDERBOOK_UPDATE_HISTORY_FILTER,
  ORDERBOOK_UPDATE_COND_ORDER_FILTER,
  ORDERBOOK_RESET_FILTER,
  ORDERBOOK_SET_SYMBOL,
  ORDERBOOK_RESET_ORDERBOOK,
  ORDERBOOK_RESET_SELECTED_CANCEL_LIST,
  EQUITY_ORDER_STOP_CANCEL_MULTI,
} from 'reduxs/actions';
import { ALL_ORDER_STATUS_FILTER_VALUE, OrderBookScreenInitOption, SELL_BUY_TYPE_FILTER_VALUE } from 'global';
import { IOrderBookFilter, FilterOption } from 'screens/OrderBook/constants';
import config from 'config';
import { addDays, subDays } from 'date-fns';
import { ORDERBOOK_UPDATE_ACTIVE_FILTER } from '../actions';
import { ModalType, IOrderBookSymbol } from 'screens/OrderBook/components/OrderBookModal';
import { IResetSelectedCancelList } from 'interfaces/orderbook';
import { SUCCESS } from 'reduxs/action-type-utils';

export function OrderBookCancelMode(state = false, action: IAction<boolean>): boolean {
  switch (action.type) {
    case ORDERBOOK_CANCEL_MODE:
      return action.payload;
    case ORDERBOOK_SCREEN_OPTION:
      return false;
    case ORDERBOOK_RESET_ORDERBOOK:
      return false;
    case SUCCESS(EQUITY_ORDER_STOP_CANCEL_MULTI):
      return false;
    default:
      return state;
  }
}

export function OrderBookSymbol(
  state = { symbol: null, type: ModalType.CANCEL } as IOrderBookSymbol,
  action: IAction<IOrderBookSymbol>
): IOrderBookSymbol {
  switch (action.type) {
    case ORDERBOOK_SET_SYMBOL:
      return action.payload;
    case ORDERBOOK_RESET_ORDERBOOK:
      return { symbol: null, type: ModalType.CANCEL } as IOrderBookSymbol;
    default:
      return state;
  }
}

export function OrderBookScreenOption(
  state = OrderBookScreenInitOption.ORDER_BOOK,
  action: IAction<OrderBookScreenInitOption>
): OrderBookScreenInitOption {
  switch (action.type) {
    case ORDERBOOK_SCREEN_OPTION:
      return action.payload;
    default:
      return state;
  }
}

const getDefaultFilter = (): IOrderBookFilter => ({
  activeOrderFilter: {
    sellBuyType: SELL_BUY_TYPE_FILTER_VALUE.ALL,
    orderStatus: ALL_ORDER_STATUS_FILTER_VALUE.ALL,
    fromDate: new Date(),
    toDate: new Date(),
    pageSize: config.pageSize,
    pageNumber: 0,
  },
  orderHistoryFilter: {
    sellBuyType: SELL_BUY_TYPE_FILTER_VALUE.ALL,
    orderStatus: ALL_ORDER_STATUS_FILTER_VALUE.ALL,
    fromDate: subDays(new Date(), 8),
    toDate: subDays(new Date(), 1),
    pageSize: config.pageSize,
    pageNumber: 0,
  },
  conditionOrderFilter: {
    sellBuyType: SELL_BUY_TYPE_FILTER_VALUE.ALL,
    orderStatus: ALL_ORDER_STATUS_FILTER_VALUE.ALL,
    fromDate: new Date(),
    toDate: addDays(new Date(), 7),
    pageSize: config.pageSize,
    pageNumber: 0,
  },
});

export function OrderBookFilter(state = getDefaultFilter(), action: IAction<FilterOption>): IOrderBookFilter {
  switch (action.type) {
    case ORDERBOOK_UPDATE_ACTIVE_FILTER:
      if (!action.payload.pageNumber) {
        action.payload.pageNumber = 0;
      }
      return {
        ...state,
        activeOrderFilter: { ...state.activeOrderFilter, ...action.payload },
      };
    case ORDERBOOK_UPDATE_HISTORY_FILTER:
      if (!action.payload.pageNumber) {
        action.payload.pageNumber = 0;
      }
      return {
        ...state,
        orderHistoryFilter: { ...state.orderHistoryFilter, ...action.payload },
      };
    case ORDERBOOK_UPDATE_COND_ORDER_FILTER:
      if (!action.payload.pageNumber) {
        action.payload.pageNumber = 0;
      }
      return {
        ...state,
        conditionOrderFilter: { ...state.conditionOrderFilter, ...action.payload },
      };
    case ORDERBOOK_SCREEN_OPTION:
      return {
        activeOrderFilter: { ...state.activeOrderFilter, pageNumber: 0 },
        orderHistoryFilter: { ...state.orderHistoryFilter, pageNumber: 0 },
        conditionOrderFilter: { ...state.conditionOrderFilter, pageNumber: 0 },
      };
    case ORDERBOOK_RESET_FILTER:
      return getDefaultFilter();
    default:
      return state;
  }
}

export function OrderbookResetSelectedTrigger(
  state: IResetSelectedCancelList = {
    reset: false,
  },
  action: IAction<IResetSelectedCancelList>
) {
  switch (action.type) {
    case ORDERBOOK_RESET_SELECTED_CANCEL_LIST:
      return action.payload;
    default:
      return state;
  }
}
