import { ILeaderBoardInvestingPeriod } from 'constants/enum';
import { LEADER_BOARD_ON_ENTER_SCREEN } from 'reduxs/actions';
import { generateAction } from 'utils';

export interface IOnEnterLeaderBoardScreen {
  period: ILeaderBoardInvestingPeriod;
  selectTabLeaderBoard: boolean;
  isFinalFilter?: boolean;
  tradingContestFilter?: string;
}

export const onEnterLeaderBoardScreen = generateAction<IOnEnterLeaderBoardScreen>(LEADER_BOARD_ON_ENTER_SCREEN);
