import { useMemo, useState } from 'react';
import { ILeaderBoardInvestingPeriod } from 'constants/enum';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { formatStringToDate } from 'utils';
import { differenceInCalendarDays } from 'date-fns';
import { ESubAccountJoinedContest } from 'global';
import { IContextStateLeaderBoard } from 'screens/LeaderBoard/LeaderBoard.type';
import { ILogicProps } from './CustomHeader.type';

const useCustomHeaderLogic = (props: ILogicProps) => {
  const { contests, subMenuContests, getVirtualCoreContest, getVirtualCoreContestListed, currentTime } = props;

  /** 
   * Get props Context 
  const { contests, subMenuContests, getVirtualCoreContest, getVirtualCoreContestListed, currentTime } = props;

  /**
   * Get props Context
   * from CustomHeader.view
   */
  const { selectTabLeaderBoard, setIndexState } = props;

  const isContestKis =
    getVirtualCoreContest.data != null && getVirtualCoreContest.data.length > 0
      ? getVirtualCoreContest.data.find(ele => ele.subAccount !== ESubAccountJoinedContest.NOT_JOIN)
      : getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length > 0
      ? getVirtualCoreContestListed.data[0]
      : subMenuContests;

  // convert current time to date
  const convertCurrentTimeToDate = (dateString: string) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}${month}${day}`;
  };

  // calculate current week
  const calculateCurrentWeek = useMemo((): number => {
    if (isContestKis == null) return 0;
    if (currentTime == null) return 0;
    const startDate = convertCurrentTimeToDate(isContestKis.startAt);
    const endDate = convertCurrentTimeToDate(isContestKis.endAt);
    const currentDate = convertCurrentTimeToDate(currentTime);
    let currentWeek = 0;
    if (currentDate <= endDate) {
      currentWeek = Math.ceil(
        (differenceInCalendarDays(formatStringToDate(currentDate), formatStringToDate(startDate)) + 1) / 7
      );
      if (currentWeek === 0) currentWeek = 1;
    } else {
      currentWeek = Math.ceil(
        (differenceInCalendarDays(formatStringToDate(endDate), formatStringToDate(startDate)) + 1) / 7
      );
    }

    return currentWeek;
  }, [isContestKis?.startAt, isContestKis?.endAt, currentTime]);

  const [currentPeriod, setCurrentPeriod] = useState(0);

  useUpdateEffect(() => {
    setCurrentPeriod(calculateCurrentWeek);
    setIndexState((prev: IContextStateLeaderBoard) => ({
      ...prev,
      currentWeek: calculateCurrentWeek,
      eachWeek: calculateCurrentWeek,
      isFinalFilter: false,
    }));
  }, [selectTabLeaderBoard]);

  // check all contest Happen now
  const isContestsHapping = contests?.filter(ele => ele.status === 'Happen now');

  useUpdateEffect(() => {
    if (!selectTabLeaderBoard) {
      setIndexState((prev: IContextStateLeaderBoard) => ({
        ...prev,
        periodFilter: ILeaderBoardInvestingPeriod.WEEK,
        selectTabLeaderBoard: false,
      }));
    } else {
      setIndexState((prev: IContextStateLeaderBoard) => ({
        ...prev,
        selectTabLeaderBoard: true,
        tradingContestFilter: subMenuContests != null ? subMenuContests.name[0].tab : prev.tradingContestFilter,
      }));
    }
  }, [selectTabLeaderBoard]);

  return {
    state: {
      currentPeriod,
      setCurrentPeriod,
    },
    logic: {
      isContestsHapping,
    },
  };
};

export { useCustomHeaderLogic };
