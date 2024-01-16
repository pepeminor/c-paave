export interface NotificationState {
  mode: NotificationHeaderMode;
  tab: NotificationTab;
  deletingList: number[];
}

export const NotificationTab = {
  Order: 'Order',
  Balance: 'Balance',
  Portfolio: 'Portfolio',
  MarketInfo: 'Market Info',
} as const;
export type NotificationTab = keyof typeof NotificationTab;

export type NotificationHeaderMode = 'DEFAULT' | 'DELETE' | 'SEARCH';

export const NotificationCategories = {
  Order: 'ORDER',
  Balance: 'BALANCE',
  Portfolio: 'PORFOLIO_ARLERT', // Intentionally misspelled, data from Backend
  MarketInfo: 'MARKET_INFO',
} as const;
