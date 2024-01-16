import { StackScreenProps } from 'screens/RootNavigation';
import { scaleSize } from 'styles';

export type IProps = StackScreenProps<'PriceBoardFullScreen'>;

export type PriceBoardType = 'WATCHLIST' | 'Live board';

export const MarketCategories = {
  PriceBoard: ['VN30', 'HNX30', 'HOSE', 'HNX', 'UPCOM', 'BOND', 'ETF', 'CW'],
  Futures: [
    'Futures-Index',
    // 'Futures-Bond' // Hide Futures-Bond due to data is not enough
  ],
  Index: ['All Indices'],
} as const;

export type MarketCategoriesLiteral =
  | 'VN30'
  | 'HNX30'
  | 'HOSE'
  | 'HNX'
  | 'UPCOM'
  | 'BOND'
  | 'ETF'
  | 'Futures-Index'
  | 'Futures-Bond'
  | 'CW'
  | 'All Indices';

export const ItemHeight = scaleSize(20);
