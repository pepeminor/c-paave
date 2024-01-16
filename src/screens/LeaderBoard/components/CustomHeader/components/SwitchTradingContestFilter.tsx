import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import useStyles from '../styles';
import { useTranslation } from 'react-i18next';
import globalStyles from 'styles';
import { LeaderboardContext } from 'screens/LeaderBoard/LeaderBoard.logic';
import { IContextStateLeaderBoard } from 'screens/LeaderBoard/LeaderBoard.type';
import { useAppSelector } from 'hooks/useAppSelector';
import { ACCOUNT_TYPE, ESubAccountJoinedContest } from 'global';
import withMemo from 'HOC/withMemo';

const SwitchTradingContestFilter = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const [{ selectTabLeaderBoard, tradingContestFilter }, setIndexState] = useContext(LeaderboardContext);

  const selectTradingContestFilter = (value: string) => () =>
    setIndexState((prev: IContextStateLeaderBoard) => ({
      ...prev,
      tradingContestFilter: value,
    }));

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

  if (selectTabLeaderBoard) return null;
  if (showImageWhenContestEnded) return null;

  return checkShowListRankingNonLogin ||
    checkShowListRankingLogin ||
    checkAccountNotJoin ||
    showListContestEndedMoreTime ? (
    <View style={[globalStyles.flexDirectionRow, styles.secondFilter2]}>
      <TouchableOpacity
        style={[
          globalStyles.container,
          globalStyles.centered,
          tradingContestFilter === 'All Users' && styles.eachItemFilterContainerSelected,
        ]}
        onPress={selectTradingContestFilter('All Users')}
      >
        <Text
          style={[
            styles.eachItemFilterText,
            tradingContestFilter === 'All Users'
              ? styles.eachItemFilterTextSelected
              : styles.eachItemFilterTextUnselected,
          ]}
        >
          {t('All Users')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          globalStyles.container,
          globalStyles.centered,
          tradingContestFilter === 'Qualified Users' && styles.eachItemFilterContainerSelected,
        ]}
        onPress={selectTradingContestFilter('Qualified Users')}
      >
        <Text
          style={[
            styles.eachItemFilterText,
            tradingContestFilter === 'Qualified Users'
              ? styles.eachItemFilterTextSelected
              : styles.eachItemFilterTextUnselected,
          ]}
        >
          {t('Qualified Users')}
        </Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

export default withMemo(SwitchTradingContestFilter);
