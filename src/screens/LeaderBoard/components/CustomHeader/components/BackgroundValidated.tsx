import React, { useContext } from 'react';
import { Image, Platform } from 'react-native';
import { scaleSize } from 'styles';
import withMemo from 'HOC/withMemo';
import { ACCOUNT_TYPE, ESubAccountJoinedContest } from 'global';
import { useAppSelector } from 'hooks/useAppSelector';
import { LeaderboardContext } from 'screens/LeaderBoard/LeaderBoard.logic';

const BackgroundValidated = () => {
  const [{ selectTabLeaderBoard }] = useContext(LeaderboardContext);

  const subMenuContests = useAppSelector(state => state.contests?.subMenu);
  const getVirtualCoreContest = useAppSelector(state => state.getVirtualCoreContest);
  const getVirtualCoreContestListed = useAppSelector(state => state.getVirtualCoreContestListed);
  const accountContestRegistered = useAppSelector(state => state.accountContestRegistered);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const currentTime: string = useAppSelector(state => state.currentTime);

  const showImageWhenContestEnded =
    subMenuContests != null ||
    (getVirtualCoreContest.data != null && getVirtualCoreContest.data.length === 0) ||
    (getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length === 0)
      ? subMenuContests != null
        ? subMenuContests.endAt < currentTime && subMenuContests.contestId === ''
        : false
      : false;

  const isContestKis =
    getVirtualCoreContest.data != null && getVirtualCoreContest.data.length > 0
      ? getVirtualCoreContest.data.find(ele => ele.subAccount !== ESubAccountJoinedContest.NOT_JOIN)
      : getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length > 0
      ? getVirtualCoreContestListed.data[0]
      : subMenuContests;
  const isNotAccountDemo = selectedAccount.type !== ACCOUNT_TYPE.DEMO;
  // account not join
  const checkAccountNotJoin =
    accountContestRegistered.data === ESubAccountJoinedContest.NOT_JOIN
      ? getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length > 0
        ? getVirtualCoreContestListed.data[0].startAt <= currentTime
        : subMenuContests != null && subMenuContests.startAt <= currentTime
      : false;
  // case non-login
  const checkShowListRankingNonLogin =
    subMenuContests != null && currentTime != null && !isNotAccountDemo && subMenuContests.startAt <= currentTime;
  // case login
  const checkShowListRankingLogin =
    currentTime != null && isContestKis != null && isNotAccountDemo && isContestKis.startAt <= currentTime;

  // // priority to render component <BackgroundNoContest />
  // // when contestId = '' && contest is over
  if (!selectTabLeaderBoard && showImageWhenContestEnded) return <></>;

  if (!selectTabLeaderBoard && (checkShowListRankingNonLogin || checkShowListRankingLogin || checkAccountNotJoin)) {
    return (
      <Image
        source={require('assets/component/LeaderBoardCustomHeader.png')}
        style={{
          width: '100%',
          height: scaleSize(126),
          position: 'absolute',
        }}
      />
    );
  }

  if (selectTabLeaderBoard) {
    return Platform.OS === 'ios' ? (
      <Image
        source={require('assets/component/LeaderBoardCustomHeaderIOS.png')}
        style={{
          width: '100%',
          height: scaleSize(126),
          position: 'absolute',
        }}
      />
    ) : (
      <Image
        source={require('assets/component/LeaderBoardCustomHeaderAndroid.png')}
        style={{
          width: '100%',
          height: scaleSize(120),
          position: 'absolute',
        }}
      />
    );
  }
  return null;
};

export default withMemo(BackgroundValidated);
