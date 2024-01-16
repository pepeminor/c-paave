/* eslint-disable @typescript-eslint/no-empty-interface */
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';

import { ILeaderBoardTradingFilter } from 'constants/enum';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType {
  leaderBoardTab: boolean;
}

export type IProps = IInner;
export const Period = {
  DAY: 'Today',
  WEEK: 'This Week',
  MONTH: 'This Month',
  YEAR: 'This Year',
} as const;
export type Period = keyof typeof Period;

export const Board = {
  ALL: 'All Users',
  QUALIFY: 'Qualified Users',
};
export type Board = keyof typeof Board;
export interface IContextStateLeaderBoard {
  selectTabLeaderBoard: boolean;
  periodFilter: Period;
  isFinalFilter: boolean;
  eachWeek: number;
  currentWeek: number;
  tradingContestFilter: ILeaderBoardTradingFilter;
  setIndexState?: React.Dispatch<IContextStateLeaderBoard | any>;
}
