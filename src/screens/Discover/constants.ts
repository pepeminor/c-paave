export const DiscoverTabType = {
  StockTheme: 'Theme',
  Watchlist: 'Watchlist_abbr',
  HotStock: 'Hot Stock',
  Top100: 'Top 100 Ranked List',
  ForeignTrading: 'Foreign Trading',
} as const;
export type DiscoverTabType = keyof typeof DiscoverTabType;
