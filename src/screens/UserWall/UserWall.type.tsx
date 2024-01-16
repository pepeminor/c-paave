/* eslint-disable @typescript-eslint/no-empty-interface */
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';
import { StackScreenProps } from 'screens/RootNavigation';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType, StackScreenProps<ScreenNames.UserWall> {}

export type IProps = IInner;

export const UserWallInfoTabs = {
  ACCOUNT_PROFIT: 'Acc.profit',
  DAILY_PL: 'Daily P & L',
  PORTFOLIO: 'Portfolio',
  HISTORY: 'History',
};

export type UserWallInfoTabs = keyof typeof UserWallInfoTabs;

export const UserWallInfoTabsKis = {
  ACCOUNT_PROFIT: 'Acc.profit',
  DAILY_PL: 'Daily P & L',
  PORTFOLIO: 'Portfolio',
};

export const ChartType = {
  LINE: 'LINE',
  LINE2: 'LINE2',
  ACCUMULATE: 'ACCUMULATE',
} as const;
export type ChartType = keyof typeof ChartType;
