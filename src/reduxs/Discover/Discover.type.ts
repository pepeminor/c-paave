import { DiscoverTabType } from 'screens/Discover/constants';

export interface IInitialState extends RefreshFinishParam {
  tab: DiscoverTabType;
  refreshing: boolean;
}

interface RefreshFinishParam {
  refreshIndicesFinish: boolean;
  refreshWatchlistFinish: boolean;
  refreshMarketFinish: boolean;
  refreshHotStockFinish: boolean;
  refreshTop100StocksFinish: boolean;
  refreshStockThemeFinish: boolean;
}

export interface IUpdateDiscoverTab {
  tab: DiscoverTabType;
}

export type IRefreshDiscoverScreen = Partial<RefreshFinishParam>;
