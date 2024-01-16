import React, { useContext, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import useStyles from '../styles';
import { useTranslation } from 'react-i18next';
import { LeaderboardContext } from 'screens/LeaderBoard/LeaderBoard.logic';
import { IContextStateLeaderBoard } from 'screens/LeaderBoard/LeaderBoard.type';
import { useAppSelector } from 'hooks/useAppSelector';
import { ACCOUNT_TYPE, ESubAccountJoinedContest } from 'global';

import ArrowWhiteLeftIcon from 'assets/icon/ArrowWhiteLeftIcon.svg';
import ArrowWhiteRightIcon from 'assets/icon/ArrowWhiteRightIcon.svg';

import { differenceInCalendarDays } from 'date-fns';
import { formatStringToDate } from 'utils';
import withMemo from 'HOC/withMemo';

const SwitchWeekTradingContest = (props: {
  currentPeriod: number;
  setCurrentPeriod: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const { currentPeriod, setCurrentPeriod } = props;

  const [{ selectTabLeaderBoard, eachWeek, isFinalFilter }, setIndexState] = useContext(LeaderboardContext);

  const contests = useAppSelector(state => state.contests?.contests);
  const subMenuContests = useAppSelector(state => state.contests?.subMenu);
  const getVirtualCoreContest = useAppSelector(state => state.getVirtualCoreContest);
  const getVirtualCoreContestListed = useAppSelector(state => state.getVirtualCoreContestListed);
  const accountContestRegistered = useAppSelector(state => state.accountContestRegistered);
  const isContestKis =
    getVirtualCoreContest.data != null && getVirtualCoreContest.data.length > 0
      ? getVirtualCoreContest.data.find(ele => ele.subAccount !== ESubAccountJoinedContest.NOT_JOIN)
      : getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length > 0
      ? getVirtualCoreContestListed.data[0]
      : subMenuContests;

  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const isNotAccountDemo = selectedAccount.type !== ACCOUNT_TYPE.DEMO;
  const currentTime: string = useAppSelector(state => state.currentTime);
  // account not join
  const checkAccountNotJoin =
    accountContestRegistered.data === ESubAccountJoinedContest.NOT_JOIN
      ? getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length > 0
        ? getVirtualCoreContestListed.data[0].startAt <= currentTime
        : subMenuContests != null && subMenuContests.startAt <= currentTime
      : false;
  // case non-login
  const checkShowListRankingNonLogin =
    !isNotAccountDemo && subMenuContests != null && currentTime != null && subMenuContests.startAt <= currentTime;
  // case login
  const checkShowListRankingLogin =
    isNotAccountDemo && currentTime != null && isContestKis != null && isContestKis.startAt <= currentTime;

  // case contest is ended
  const showListContestEndedMoreTime =
    subMenuContests != null ||
    (getVirtualCoreContest.data != null && getVirtualCoreContest.data.length === 0) ||
    (getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length === 0)
      ? subMenuContests != null
        ? subMenuContests.endAt < currentTime && subMenuContests.contestId !== ''
        : false
      : false;
  const showImageWhenContestEnded =
    subMenuContests != null ||
    (getVirtualCoreContest.data != null && getVirtualCoreContest.data.length === 0) ||
    (getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length === 0)
      ? subMenuContests != null
        ? subMenuContests.endAt < currentTime && subMenuContests.contestId === ''
        : false
      : false;

  const handlePreviousSwitchPress = () => {
    if (currentPeriod > 0) {
      setIndexState((prev: IContextStateLeaderBoard) => ({
        ...prev,
        isFinalFilter: false,
        eachWeek: currentPeriod - 1,
      }));
      setCurrentPeriod(currentPeriod - 1);
    }
  };

  const handleNextSwitchPress = () => {
    if (contests == null) return;
    if (calculateCurrentWeek === currentPeriod) {
      setIndexState((prev: IContextStateLeaderBoard) => ({ ...prev, isFinalFilter: true }));
      setCurrentPeriod(currentPeriod + 1);
    }
    if (currentPeriod < contests[0].result.length - 2) {
      setCurrentPeriod(currentPeriod + 1);
      setIndexState((prev: IContextStateLeaderBoard) => ({ ...prev, eachWeek: currentPeriod + 1 }));
    }
  };

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

  // calculate remain days of final contest
  const calculateRemainDaysFinal = useMemo(() => {
    if (currentTime == null) return 0;
    if (isContestKis == null) return 0;

    const endDate = convertCurrentTimeToDate(isContestKis.endAt);
    const currentDate = convertCurrentTimeToDate(currentTime);

    let calculateRemainDays = 0;
    calculateRemainDays = differenceInCalendarDays(formatStringToDate(endDate), formatStringToDate(currentDate)) + 1;

    return calculateRemainDays;
  }, [isContestKis?.endAt, currentTime]);

  // calculate remain days of week contest
  const calculateRemainDaysOfWeek = useMemo(() => {
    if (isContestKis == null) return 0;
    if (currentTime == null) return 0;

    const startDate = convertCurrentTimeToDate(isContestKis.startAt);
    const currentDate = convertCurrentTimeToDate(currentTime);
    const daysOfWeek = differenceInCalendarDays(formatStringToDate(currentDate), formatStringToDate(startDate));
    let dayfLeftOfWeek = 0;

    // check remain days < 5, show remain days final
    if (calculateRemainDaysFinal < 5) {
      dayfLeftOfWeek = calculateRemainDaysFinal;
    } else {
      dayfLeftOfWeek = calculateCurrentWeek * 7 - 2 - daysOfWeek;
    }

    return dayfLeftOfWeek;
  }, [isContestKis?.startAt, currentTime]);

  const switchTimeContest = useMemo(() => {
    return isFinalFilter
      ? `${
          // show remain number day of final
          calculateRemainDaysFinal > 1
            ? calculateRemainDaysFinal
            : calculateRemainDaysFinal === 1
            ? 24 - Number(currentTime.substring(8, 10)) > 24
              ? 1
              : 8 - Number(currentTime.substring(8, 10)) > 0 // final contest at 15:00 UTC
              ? 8 - Number(currentTime.substring(8, 10))
              : ''
            : ''
        }${
          // show days, day, hours, ended corresponds to the above cases
          calculateRemainDaysFinal > 1
            ? ` ${t('days')}`
            : calculateRemainDaysFinal === 1
            ? 24 - Number(currentTime.substring(8, 10)) > 24
              ? ` ${t('day')}`
              : 8 - Number(currentTime.substring(8, 10)) > 0 // final contest at 15:00 UTC
              ? ` ${t('hours')}`
              : t('Ended')
            : t('Ended')
        }`
      : `${
          // show remain number day of week
          calculateRemainDaysOfWeek > 1
            ? calculateRemainDaysOfWeek
            : calculateRemainDaysOfWeek === 1
            ? 24 - Number(currentTime.substring(8, 10)) > 24
              ? 1
              : 8 - Number(currentTime.substring(8, 10)) > 0 // final contest at 15:00 UTC
              ? 8 - Number(currentTime.substring(8, 10))
              : ''
            : ''
        }${
          // show days, day, hours, ended corresponds to the above cases
          calculateRemainDaysOfWeek > 1
            ? ` ${t('days')}`
            : calculateRemainDaysOfWeek === 1
            ? 24 - Number(currentTime.substring(8, 10)) > 24
              ? ` ${t('day')}`
              : 8 - Number(currentTime.substring(8, 10)) > 0 // final contest at 15:00 UTC
              ? ` ${t('hours')}`
              : t('Ended')
            : t('Ended')
        }`;
  }, [isFinalFilter, calculateRemainDaysFinal, calculateRemainDaysOfWeek, currentTime]);

  if (selectTabLeaderBoard) return null;
  if (showImageWhenContestEnded) return null;
  return checkShowListRankingNonLogin ||
    checkShowListRankingLogin ||
    checkAccountNotJoin ||
    showListContestEndedMoreTime ? (
    <View style={styles.switchWeekContain}>
      <View style={styles.wrapSwitchBtn}>
        <TouchableOpacity
          style={[styles.arrowIcon, currentPeriod === 1 ? styles.disableArrowIcon : styles.enableArrowIcon]}
          onPress={handlePreviousSwitchPress}
          disabled={currentPeriod === 1 ? true : false}
        >
          <ArrowWhiteLeftIcon />
        </TouchableOpacity>
        <Text style={styles.contestText}>{isFinalFilter ? t('Final') : `${t('Week')} ${currentPeriod}`}</Text>
        <TouchableOpacity
          style={[styles.arrowIcon, isFinalFilter ? styles.disableArrowIcon : styles.enableArrowIcon]}
          onPress={handleNextSwitchPress}
          disabled={isFinalFilter ? true : false}
        >
          <ArrowWhiteRightIcon />
        </TouchableOpacity>
      </View>
      <Text style={styles.contestText}>
        {t('End in')}: {calculateCurrentWeek > eachWeek ? t('Ended') : switchTimeContest}
      </Text>
    </View>
  ) : null;
};

export default withMemo(SwitchWeekTradingContest);
