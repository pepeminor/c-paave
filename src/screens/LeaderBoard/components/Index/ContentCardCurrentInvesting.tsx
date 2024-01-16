import React, { useContext } from 'react';
import { ReducerStatus } from 'interfaces/reducer';
import { ACCOUNT_TYPE, ESubAccountJoinedContest } from 'global';
import { useAppSelector } from 'hooks';
import CardCurrenInvesting from 'screens/LeaderBoard/components/CardCurrenInvesting';
import { LeaderboardContext } from 'screens/LeaderBoard/LeaderBoard.logic';
import withMemo from 'HOC/withMemo';

const ContentCardCurrentInvesting = () => {
  const [{ selectTabLeaderBoard, eachWeek, currentWeek, periodFilter }] = useContext(LeaderboardContext);

  const getAccountInfo = useAppSelector(state => state.getUserAccountInfo);
  const accountContestRegistered = useAppSelector(state => state.accountContestRegistered);
  const selectedAccount = useAppSelector(state => state.selectedAccount.type);
  const leaderBoardInvesting = useAppSelector(state => state.leaderBoardInvesting);
  const subMenuContest = useAppSelector(state => state.contests?.subMenu);
  const getVirtualCoreContest = useAppSelector(state => state.getVirtualCoreContest);
  const getVirtualCoreContestRanking = useAppSelector(state => state.getVirtualCoreContestRanking);
  const getVirtualCoreContestListed = useAppSelector(state => state.getVirtualCoreContestListed);
  const currentTime = useAppSelector(state => state.currentTime);
  const isContestKis =
    getVirtualCoreContest.data != null && getVirtualCoreContest.data.length > 0
      ? getVirtualCoreContest.data.find(ele => ele.subAccount !== ESubAccountJoinedContest.NOT_JOIN)
      : getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length > 0
      ? getVirtualCoreContestListed.data[0]
      : subMenuContest;

  const isNotAccountDemo = selectedAccount !== ACCOUNT_TYPE.DEMO;
  // account not join
  const checkAccountNotJoin =
    accountContestRegistered.data === ESubAccountJoinedContest.NOT_JOIN &&
    getVirtualCoreContestListed.data != null &&
    getVirtualCoreContestListed.data.length > 0
      ? getVirtualCoreContestListed.data[0].startAt <= currentTime
      : subMenuContest != null
      ? subMenuContest.startAt <= currentTime
      : false;
  // case non-login
  const checkShowListRankingNonLogin =
    !isNotAccountDemo && subMenuContest != null && subMenuContest.startAt <= currentTime;
  // case login
  const checkShowListRankingLogin = isNotAccountDemo && isContestKis != null && isContestKis.startAt <= currentTime;
  // case contest is ended
  const showListContestEndedMoreTime =
    subMenuContest != null ||
    (getVirtualCoreContest.data != null && getVirtualCoreContest.data.length === 0) ||
    (getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length === 0)
      ? subMenuContest != null
        ? subMenuContest.endAt < currentTime && subMenuContest.contestId !== ''
        : false
      : false;

  // condition show card
  const isShowCardFromJson =
    checkShowListRankingNonLogin || checkShowListRankingLogin || checkAccountNotJoin || showListContestEndedMoreTime;
  // wait api trading contest and render card
  const dataTradingContestSuccess =
    getVirtualCoreContestRanking.status === ReducerStatus.SUCCESS && getVirtualCoreContestRanking.data != null;
  // wait api paave leaderboard and render card
  const dataPaaveLeaderBoardSuccess =
    leaderBoardInvesting.status === ReducerStatus.SUCCESS && leaderBoardInvesting.data != null;
  // tab leader board
  const isPaaveLeaderBoardTab = selectTabLeaderBoard && dataPaaveLeaderBoardSuccess;
  // tab trading contest
  const isTradingContestTab =
    !selectTabLeaderBoard &&
    // accountContestRegistered.data != null &&
    // accountContestRegistered.data !== ESubAccountJoinedContest.NOT_JOIN && // contest Paave just only show subAccount 000
    isShowCardFromJson &&
    dataTradingContestSuccess;
  // hide card last week
  const isHideCardLastWeek = currentWeek > eachWeek;

  if (isHideCardLastWeek) return null;
  return (isPaaveLeaderBoardTab || isTradingContestTab) && isNotAccountDemo ? (
    <CardCurrenInvesting
      accountInfo={getAccountInfo}
      selectTabLeaderBoard={selectTabLeaderBoard}
      periodFilter={periodFilter}
    />
  ) : null;
};

export default withMemo(ContentCardCurrentInvesting);
