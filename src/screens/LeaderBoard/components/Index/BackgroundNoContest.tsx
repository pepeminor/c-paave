import React, { memo, useContext } from 'react';
import { View, Image } from 'react-native';
import globalStyles from 'styles';
import useStyles from 'screens/LeaderBoard/styles';
import { ACCOUNT_TYPE, ESubAccountJoinedContest, LANG } from 'global';
import { useAppSelector } from 'hooks';
import { LeaderboardContext } from 'screens/LeaderBoard/LeaderBoard.logic';

const BackgroundNoContest = () => {
  const { styles } = useStyles();

  const [{ selectTabLeaderBoard }] = useContext(LeaderboardContext);

  const accountContestRegistered = useAppSelector(state => state.accountContestRegistered);
  const selectedAccount = useAppSelector(state => state.selectedAccount.type);
  const selectedLanguage = useAppSelector(state => state.lang);
  const subMenuContest = useAppSelector(state => state.contests?.subMenu);
  const getVirtualCoreContest = useAppSelector(state => state.getVirtualCoreContest);
  const getVirtualCoreContestListed = useAppSelector(state => state.getVirtualCoreContestListed);
  const currentTime = useAppSelector(state => state.currentTime);
  const isContestKis =
    getVirtualCoreContest.data != null && getVirtualCoreContest.data.length > 0
      ? getVirtualCoreContest.data.find(ele => ele.subAccount !== ESubAccountJoinedContest.NOT_JOIN)
      : getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length > 0
      ? getVirtualCoreContestListed.data[0]
      : subMenuContest;

  if (subMenuContest == null) return null;
  if (currentTime == null) return null;
  if (selectTabLeaderBoard) return null;

  const isNotAccountDemo = selectedAccount !== ACCOUNT_TYPE.DEMO;
  // account not join
  const checkAccountNotJoin =
    accountContestRegistered.data === ESubAccountJoinedContest.NOT_JOIN
      ? getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length > 0
        ? getVirtualCoreContestListed.data[0].startAt > currentTime && subMenuContest.joinable > currentTime
        : subMenuContest.startAt > currentTime && subMenuContest.joinable > currentTime
      : false;
  // case non-login
  const checkShowListRankingNonLogin =
    !isNotAccountDemo &&
    subMenuContest != null &&
    subMenuContest.startAt > currentTime &&
    subMenuContest.joinable > currentTime;

  // case login
  const checkShowListRankingLogin =
    isNotAccountDemo &&
    isContestKis != null &&
    isContestKis.startAt > currentTime &&
    subMenuContest.joinable > currentTime;
  const isTradingContestTab = !selectTabLeaderBoard;

  // case contest is ended
  const showListContestEndedMoreTime =
    subMenuContest != null ||
    (getVirtualCoreContest.data != null && getVirtualCoreContest.data.length === 0) ||
    (getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length === 0)
      ? subMenuContest != null
        ? subMenuContest.endAt < currentTime && subMenuContest.contestId !== ''
        : false
      : false;
  const showImageWhenContestEnded =
    subMenuContest != null ||
    (getVirtualCoreContest.data != null && getVirtualCoreContest.data.length === 0) ||
    (getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length === 0)
      ? subMenuContest != null
        ? subMenuContest.endAt < currentTime && subMenuContest.contestId === ''
        : false
      : false;

  if (showListContestEndedMoreTime) return null;

  return isTradingContestTab &&
    (checkShowListRankingNonLogin || checkShowListRankingLogin || checkAccountNotJoin || showImageWhenContestEnded) ? (
    <>
      <Image source={require('assets/component/LeaderBoardBGNoContest.png')} style={styles.underlay} />
      <View style={[globalStyles.container, globalStyles.alignCenter, globalStyles.justifyCenter, styles.mt50]}>
        {selectedLanguage === LANG.VI ? (
          <>
            <Image
              source={require('assets/component/LeaderBoardNoContestCupVi.png')}
              resizeMode={'stretch'}
              style={styles.backgroundNoContest}
            />
            <Image
              source={require('assets/component/LeaderBoardNoContestTextVi.png')}
              style={styles.backgroundNoContest1}
              resizeMode={'stretch'}
            />
            <Image
              source={require('assets/component/LeaderBoardNoContestText2Vi.png')}
              style={styles.backgroundNoContest2}
              resizeMode={'stretch'}
            />
          </>
        ) : (
          <>
            <Image
              source={require('assets/component/LeaderBoardNoContestCupEn.png')}
              resizeMode={'stretch'}
              style={styles.backgroundNoContest}
            />
            <Image
              source={require('assets/component/LeaderBoardNoContestTextEn.png')}
              style={styles.backgroundNoContest1}
              resizeMode={'stretch'}
            />
            <Image
              source={require('assets/component/LeaderBoardNoContestText2En.png')}
              style={styles.backgroundNoContest2}
              resizeMode={'stretch'}
            />
          </>
        )}
      </View>
    </>
  ) : null;
};

export default memo(BackgroundNoContest);
