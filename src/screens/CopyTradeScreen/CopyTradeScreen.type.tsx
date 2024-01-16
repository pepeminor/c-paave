import { StackScreenProps } from 'screens/RootNavigation';

export type IProps = StackScreenProps<'CopyTradeScreen'>;

export const CopyTradeConfig = {
  followingType: {
    AIRatingTop5: 'Top 5 Stocks',
    AIRatingTop10: 'Top 10 Stocks',
    AIRatingTop15: 'Top 15 Stocks',
    AIRatingTop20: 'Top 20 Stocks',
    Advisor: 'Advisor',
  },
  orderType: {
    ATO: 'ATO',
    ATC: 'ATC',
  },
  maxCashBoundary: {
    min: 50000000,
    max: 10000000000,
  },
  followingOption: {
    ALL_STOCK_FIRST_BUY: 'ALL_STOCK_FIRST_BUY',
    NEWLY_ENTERED_STOCK: 'NEWLY_ENTERED_STOCK',
  },
} as const;

export type FollowingType = keyof typeof CopyTradeConfig.followingType;
export type FollowingOption = keyof typeof CopyTradeConfig.followingOption;
export type OrderType = keyof typeof CopyTradeConfig.orderType;
