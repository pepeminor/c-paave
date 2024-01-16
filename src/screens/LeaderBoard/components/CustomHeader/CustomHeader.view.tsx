import React, { useContext } from 'react';
import { LeaderboardContext } from 'screens/LeaderBoard/LeaderBoard.logic';
import SwitchWeekTradingContest from './components/SwitchWeekTradingContest';
import withMemo from 'HOC/withMemo';
import { useCustomHeaderLogic } from './CustomHeader.logic';
import { IProps } from './CustomHeader.type';

const CustomHeader = (props: IProps) => {
  const [{ selectTabLeaderBoard }, setIndexState] = useContext(LeaderboardContext);

  /**
   * Share Context props from LeaderboardContext
   * for CustomHeader.logic handle
   * */
  const {
    state: { currentPeriod, setCurrentPeriod },
  } = useCustomHeaderLogic({ ...props, selectTabLeaderBoard, setIndexState });

  return <SwitchWeekTradingContest currentPeriod={currentPeriod} setCurrentPeriod={setCurrentPeriod} />;
};

export default withMemo(CustomHeader);
