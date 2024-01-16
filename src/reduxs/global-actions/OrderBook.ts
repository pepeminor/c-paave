import {
  ORDERBOOK_CANCEL_MODE,
  SUBSCRIBE_ORDER_MATCH,
  UNSUBSCRIBE_ORDER_MATCH,
  ORDERBOOK_RESET_FILTER,
  ORDERBOOK_RESET_ORDERBOOK,
  ORDERBOOK_RESET_SELECTED_CANCEL_LIST,
  ORDERBOOK_SCREEN_OPTION,
  ORDERBOOK_SET_SYMBOL,
  ORDERBOOK_UPDATE_ACTIVE_FILTER,
  ORDERBOOK_UPDATE_COND_ORDER_FILTER,
  ORDERBOOK_UPDATE_HISTORY_FILTER,
} from 'reduxs/actions';
import { generateAction } from 'utils';
import { OrderBookScreenInitOption } from 'global';
import { FilterOption } from 'screens/OrderBook/constants';
import { IOrderBookSymbol } from 'screens/OrderBook/components/OrderBookModal';
import { IResetSelectedCancelList } from 'interfaces/orderbook';

export const setOrderBookCancelMode = generateAction<boolean>(ORDERBOOK_CANCEL_MODE);
export const setOrderBookSymbol = generateAction<IOrderBookSymbol>(ORDERBOOK_SET_SYMBOL);
export const setOrderBookScreenOption = generateAction<OrderBookScreenInitOption>(ORDERBOOK_SCREEN_OPTION);
export const resetSelectedCancelList = generateAction<IResetSelectedCancelList>(ORDERBOOK_RESET_SELECTED_CANCEL_LIST);

export const updateActiveFilter = generateAction<FilterOption>(ORDERBOOK_UPDATE_ACTIVE_FILTER);
export const updateHistoryFilter = generateAction<FilterOption>(ORDERBOOK_UPDATE_HISTORY_FILTER);
export const updateCondOrderFilter = generateAction<FilterOption>(ORDERBOOK_UPDATE_COND_ORDER_FILTER);
export const resetFilter = generateAction(ORDERBOOK_RESET_FILTER);
export const resetOrderBook = generateAction(ORDERBOOK_RESET_ORDERBOOK);
export const subscribeOrderMatch = generateAction(SUBSCRIBE_ORDER_MATCH);
export const unSubscribeOrderMatch = generateAction(UNSUBSCRIBE_ORDER_MATCH);
