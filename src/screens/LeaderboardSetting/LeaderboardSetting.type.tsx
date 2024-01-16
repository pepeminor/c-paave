/* eslint-disable @typescript-eslint/no-empty-interface */
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';
import { StackScreenProps } from 'screens/RootNavigation';
import { ILeaderBoardInvestingPeriod, ILeaderBoardTradingFilter } from 'constants/enum';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType, StackScreenProps<'LeaderboardSetting'> {}

export type IProps = IInner;

export interface IContextStateLeaderBoard {
  selectTabLeaderBoard: boolean;
  periodFilter: ILeaderBoardInvestingPeriod;
  isFinalFilter: boolean;
  eachWeek: number;
  currentWeek: number;
  tradingContestFilter: ILeaderBoardTradingFilter;
}

export const enum IOptLeaderboard {
  OUT = 0,
  IN = 1,
}

export const enum ILeaderboardWhichAccountJoin {
  NORMAL_ACCOUNT = 'Normal Account',
  MARGIN_ACCOUNT = 'Margin Account',
  DERIVATIVE_ACCOUNT = 'Derivative Account',
}
