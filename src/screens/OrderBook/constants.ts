import { ACCOUNT_TYPE, ALL_ORDER_STATUS_FILTER_VALUE, SELL_BUY_TYPE_FILTER_VALUE } from 'global';
import React from 'react';

export type SellBuyTypeFilter = {
  label: string;
  value: SELL_BUY_TYPE_FILTER_VALUE;
};

export type OrderStatusTypeFilter = {
  label: string;
  value: ALL_ORDER_STATUS_FILTER_VALUE | ALL_ORDER_STATUS_FILTER_VALUE[];
};

export type FilterOption = {
  sellBuyType?: SELL_BUY_TYPE_FILTER_VALUE;
  orderStatus?: ALL_ORDER_STATUS_FILTER_VALUE;
  fromDate?: Date;
  toDate?: Date;
  pageSize?: number;
  pageNumber?: number;
};

export type IOrderBookFilter = {
  activeOrderFilter: FilterOption;
  orderHistoryFilter: FilterOption;
  conditionOrderFilter: FilterOption;
};

type orderStatusFilter = {
  [s in ACCOUNT_TYPE]: OrderStatusTypeFilter[] | OrderStatusTypeFilter[];
};

export const sellBuyTypeFilterOption: SellBuyTypeFilter[] = [
  {
    label: 'All',
    value: SELL_BUY_TYPE_FILTER_VALUE.ALL,
  },
  {
    label: 'Buy',
    value: SELL_BUY_TYPE_FILTER_VALUE.BUY,
  },
  {
    label: 'Sell',
    value: SELL_BUY_TYPE_FILTER_VALUE.SELL,
  },
];

export const listOrderHistoryStatus: orderStatusFilter = {
  [ACCOUNT_TYPE.VIRTUAL]: [
    {
      label: 'ALL',
      value: ALL_ORDER_STATUS_FILTER_VALUE.INACTIVE_ORDERS,
    },
    {
      label: 'FILLED_ALL',
      value: ALL_ORDER_STATUS_FILTER_VALUE.FILLED_ALL,
    },
    {
      label: 'EXPIRED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.EXPIRED,
    },
    {
      label: 'CANCELLED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.CANCELLED,
    },
    {
      label: 'SETTLEMENT',
      value: ALL_ORDER_STATUS_FILTER_VALUE.SETTLEMENT,
    },
  ],
  [ACCOUNT_TYPE.KIS]: [
    {
      label: 'ALL',
      value: ALL_ORDER_STATUS_FILTER_VALUE.ALL,
    },
    {
      label: 'FILLED_ALL',
      value: ALL_ORDER_STATUS_FILTER_VALUE.FULLY_EXECUTED,
    },
    {
      label: 'EXPIRED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.EXP,
    },
    {
      label: 'CANCELLED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.CANCELLED,
    },
    {
      label: 'REJECTED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.REJECTED,
    },
  ],
  // [ACCOUNT_TYPE.MAS]: [],
  // [ACCOUNT_TYPE.KBSV]: [],
  // [ACCOUNT_TYPE.VCSC]: [],
  // [ACCOUNT_TYPE.JBSV]: [],
  // [ACCOUNT_TYPE.NHSV]: [],
  [ACCOUNT_TYPE.DEMO]: [],
};

export const listTodayOrderStatus: orderStatusFilter = {
  [ACCOUNT_TYPE.VIRTUAL]: [
    {
      label: 'ALL',
      value: ALL_ORDER_STATUS_FILTER_VALUE.ALL,
    },
    {
      label: 'UNMATCHED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.ACTIVE_ORDERS,
    },
    {
      label: 'FILLED_ALL',
      value: ALL_ORDER_STATUS_FILTER_VALUE.FILLED_ALL,
    },
    {
      label: 'EXPIRED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.EXPIRED,
    },
    {
      label: 'CANCELLED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.CANCELLED,
    },
  ],
  [ACCOUNT_TYPE.KIS]: [
    {
      label: 'ALL',
      value: ALL_ORDER_STATUS_FILTER_VALUE.ALL,
    },
    {
      label: 'QUEUE',
      value: ALL_ORDER_STATUS_FILTER_VALUE.QUEUED,
    },
    {
      label: 'Pending To Market',
      value: [
        ALL_ORDER_STATUS_FILTER_VALUE.INACTIVE,
        ALL_ORDER_STATUS_FILTER_VALUE.READYTOSEND,
        ALL_ORDER_STATUS_FILTER_VALUE.SENDING,
        ALL_ORDER_STATUS_FILTER_VALUE.PENDINGAPPROVAL,
        ALL_ORDER_STATUS_FILTER_VALUE.WAITINGMODIFY,
        ALL_ORDER_STATUS_FILTER_VALUE.WAITINGCANCEL,
      ],
    },
    {
      label: 'PARTIALLY_FILLED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.PARTIALLYFILL,
    },
    {
      label: 'FILLED_ALL',
      value: ALL_ORDER_STATUS_FILTER_VALUE.FULLYFILLED,
    },
    {
      label: 'CANCELLED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.CANCELLED,
    },
    {
      label: 'REJECTED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.REJECTED,
    },
    {
      label: 'EXPIRED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.EXPIRED,
    },
  ],
  // [ACCOUNT_TYPE.MAS]: [],
  // [ACCOUNT_TYPE.KBSV]: [],
  // [ACCOUNT_TYPE.VCSC]: [],
  // [ACCOUNT_TYPE.JBSV]: [],
  // [ACCOUNT_TYPE.NHSV]: [],
  [ACCOUNT_TYPE.DEMO]: [],
};

export const listConditionOrderStatus: orderStatusFilter = {
  [ACCOUNT_TYPE.VIRTUAL]: [
    {
      label: 'ALL',
      value: ALL_ORDER_STATUS_FILTER_VALUE.ALL,
    },
    {
      label: 'PENDING',
      value: ALL_ORDER_STATUS_FILTER_VALUE.PENDING,
    },
    {
      label: 'COMPLETED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.COMPLETED,
    },
    {
      label: 'CANCELLED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.CANCELLED,
    },
    {
      label: 'FAILED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.FAILED,
    },
    {
      label: 'EXPIRED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.EXPIRED,
    },
  ],
  [ACCOUNT_TYPE.KIS]: [
    {
      label: 'ALL',
      value: ALL_ORDER_STATUS_FILTER_VALUE.ALL,
    },
    {
      label: 'PENDING',
      value: ALL_ORDER_STATUS_FILTER_VALUE.PENDING,
    },
    {
      label: 'COMPLETED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.COMPLETED,
    },
    {
      label: 'CANCELLED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.CANCELLED,
    },
    {
      label: 'FAILED',
      value: ALL_ORDER_STATUS_FILTER_VALUE.FAILED,
    },
  ],
  // [ACCOUNT_TYPE.MAS]: [],
  // [ACCOUNT_TYPE.KBSV]: [],
  // [ACCOUNT_TYPE.VCSC]: [],
  // [ACCOUNT_TYPE.JBSV]: [],
  // [ACCOUNT_TYPE.NHSV]: [],
  [ACCOUNT_TYPE.DEMO]: [],
};

export const listTodayOrderDerStatus = [
  {
    label: 'ALL',
    value: ALL_ORDER_STATUS_FILTER_VALUE.ALL,
  },
  {
    label: 'FILLED_ALL',
    value: ALL_ORDER_STATUS_FILTER_VALUE.FILLED,
  },
  {
    label: 'QUEUE',
    value: ALL_ORDER_STATUS_FILTER_VALUE.QUEUE,
  },
  {
    label: 'CANCELLED',
    value: ALL_ORDER_STATUS_FILTER_VALUE.CANCELLED,
  },
  {
    label: 'REJECTED',
    value: ALL_ORDER_STATUS_FILTER_VALUE.REJECTED,
  },
  {
    label: 'EXPIRED',
    value: [ALL_ORDER_STATUS_FILTER_VALUE.KILLED, ALL_ORDER_STATUS_FILTER_VALUE.FILL_AND_KILL],
  },
  {
    label: 'Pending To Market',
    value: [
      ALL_ORDER_STATUS_FILTER_VALUE.INACTIVE,
      ALL_ORDER_STATUS_FILTER_VALUE.OUTSTANDING,
      ALL_ORDER_STATUS_FILTER_VALUE.READY_TO_SEND,
      ALL_ORDER_STATUS_FILTER_VALUE.PENDING_APPROVAL,
      ALL_ORDER_STATUS_FILTER_VALUE.SENDING,
      ALL_ORDER_STATUS_FILTER_VALUE.PENDING_TO_MARKET,
    ],
  },
];

export const listOrderHistoryDerStatus = [
  {
    label: 'ALL',
    value: ALL_ORDER_STATUS_FILTER_VALUE.ALL,
  },
  {
    label: 'FILLED_ALL',
    value: ALL_ORDER_STATUS_FILTER_VALUE.FILLED,
  },
  {
    label: 'CANCELLED',
    value: ALL_ORDER_STATUS_FILTER_VALUE.CANCELLED,
  },
  {
    label: 'REJECTED',
    value: ALL_ORDER_STATUS_FILTER_VALUE.REJECTED,
  },
];

export const OrderBookSearchTextContext = React.createContext<{
  value: string;
  setValue: (value: string) => void;
}>({ value: '', setValue: () => {} });
