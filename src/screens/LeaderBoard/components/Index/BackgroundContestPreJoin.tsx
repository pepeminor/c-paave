import React, { memo, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import globalStyles from 'styles';
import useStyles from 'screens/LeaderBoard/styles';
import { ACCOUNT_TYPE, ESubAccountJoinedContest, LANG } from 'global';
import { useAppSelector } from 'hooks';
import { useTranslation } from 'react-i18next';
import { navigate } from 'utils';
import { LeaderboardContext } from 'screens/LeaderBoard/LeaderBoard.logic';

const BackgroundContestPreJoin = () => {
  const { t } = useTranslation();
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

  const goToTermAndCondition = () => {
    navigate({
      key: 'TermAndConditionVT',
      params: { contestOrder: 0 },
    });
  };

  if (subMenuContest == null) return null;
  if (currentTime == null) return null;
  if (selectTabLeaderBoard) return null;

  const isTradingContestTab = !selectTabLeaderBoard;
  const isNotAccountDemo = selectedAccount !== ACCOUNT_TYPE.DEMO;
  // account not join
  const checkAccountNotJoin =
    accountContestRegistered.data === ESubAccountJoinedContest.NOT_JOIN
      ? getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length > 0
        ? getVirtualCoreContestListed.data[0].startAt > currentTime && subMenuContest.joinable <= currentTime
        : subMenuContest.startAt > currentTime && subMenuContest.joinable <= currentTime
      : false;
  // case non-login
  const checkShowListRankingNonLogin =
    !isNotAccountDemo &&
    subMenuContest != null &&
    subMenuContest.startAt > currentTime &&
    subMenuContest.joinable <= currentTime;
  // case login
  const checkShowListRankingLogin =
    isNotAccountDemo &&
    isContestKis != null &&
    isContestKis.startAt > currentTime &&
    subMenuContest.joinable <= currentTime;

  // When there is upcoming contest, we allow user to pre-join
  return isTradingContestTab && (checkShowListRankingNonLogin || checkShowListRankingLogin || checkAccountNotJoin) ? (
    <>
      <Image source={require('assets/component/LeaderBoardBGNoContest.png')} style={styles.underlay} />
      <View style={[globalStyles.container, globalStyles.alignCenter, globalStyles.justifyStart]}>
        {selectedLanguage === LANG.VI ? (
          <Image
            source={require('assets/component/LeaderBoardTradingContestPreJoinVi.png')}
            resizeMode={'stretch'}
            style={styles.backgroundNoContest3}
          />
        ) : (
          <Image
            source={require('assets/component/LeaderBoardTradingContestPreJoinEn.png')}
            resizeMode={'stretch'}
            style={styles.backgroundNoContest3}
          />
        )}
        <View style={[styles.marginText, globalStyles.fillWidth]}>
          <Text style={[styles.preJoinContestText, styles.marginHorizontal16]}>
            {t('Get to know more about the contest')}{' '}
            <Text onPress={goToTermAndCondition} style={styles.preJoinContestText2}>
              {t('here')}.
            </Text>
          </Text>
        </View>
      </View>
    </>
  ) : null;
};

export default memo(BackgroundContestPreJoin);
