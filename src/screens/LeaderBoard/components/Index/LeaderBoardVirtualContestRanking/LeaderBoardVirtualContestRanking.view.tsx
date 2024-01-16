import React, { memo, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import globalStyles from 'styles';
import useStyles from 'screens/LeaderBoard/styles';
import LeaderBoardNoDataCupIcon from 'assets/component/LeaderBoardNoDataCup.svg';
import Top from 'screens/LeaderBoard/components/Top';
import { useTranslation } from 'react-i18next';
import { LeaderboardContext } from 'screens/LeaderBoard/LeaderBoard.logic';
import { IProps } from './LeaderBoardVirtualContestRanking.type';
import { noDataTop } from 'screens/LeaderBoard/components/common/noDataTop';
import { useVirtualContestRankingList } from './LeaderBoardVirtualContestRanking.logic';
import LoadingLeaderBoard from '../../common/LoadingLeaderBoard';
import { ReducerStatus } from 'interfaces/reducer';
import { pageSizeLeaderboard } from 'screens/LeaderBoard';
import { ContestResultItemData } from 'interfaces/File';

const keyExtractorGenerator = (key: string) => (_item: unknown, index: number) => `${index}_${key}`;
const keyExtractor = {
  1: keyExtractorGenerator('1'),
  2: keyExtractorGenerator('2'),
  3: keyExtractorGenerator('3'),
};

const LeaderBoardVirtualContestRanking = (props: IProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  const { currentTime, subMenuContest, contests, getVirtualCoreContestRanking } = props;

  const [
    { periodFilter, isFinalFilter, eachWeek, currentWeek, selectTabLeaderBoard, tradingContestFilter },
    setIndexState,
  ] = useContext(LeaderboardContext);

  /**
   * Share Context props from LeaderboardContext
   * for LeaderBoardVirtualContestRanking.logic handle
   * */
  const {
    logic: { goToTermAndCondition, handleLoadMoreData, mappedTop, dataTop, showImageWhenContestEnded },
    refs: { scrollRef },
    ui: { renderInvestingReturnListItem, renderTopPeopleLastWeek },
  } = useVirtualContestRankingList({
    ...props,
    periodFilter,
    isFinalFilter,
    eachWeek,
    currentWeek,
    selectTabLeaderBoard,
    tradingContestFilter,
    setIndexState,
  });

  // case-render: contestId null, show image contest end
  if (showImageWhenContestEnded) return null;
  // case-render: Top people last week get data from json
  if (currentWeek > eachWeek && contests != null) {
    return (
      <FlatList
        keyExtractor={keyExtractor[1]}
        ref={scrollRef}
        data={contests[0].result[eachWeek - 1].data.slice(3)}
        renderItem={renderTopPeopleLastWeek}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Top
            dataTopPeopleLastWeek={contests[0].result[eachWeek - 1].data.slice(0, 3)}
            periodFilter={periodFilter}
            selectTabLeaderBoard={selectTabLeaderBoard}
            currentWeek={currentWeek}
            eachWeek={eachWeek}
          />
        }
        ListFooterComponent={
          <View style={styles.listEmptyContainer}>
            <LeaderBoardNoDataCupIcon />
            <Text style={styles.noDataContestText}>{t('TOP 3 INVESTORS THIS WEEK HAVE BEEN REVEALED')}</Text>
            <Text style={styles.noDataContestText1}>
              {t('You can view other different prize sections of the contest')}{' '}
              <Text onPress={goToTermAndCondition} style={styles.leaderBoardJoinContent2}>
                {t('here')}.
              </Text>
            </Text>
          </View>
        }
      />
    );
  }

  // // case-render: Less than three user
  if (
    getVirtualCoreContestRanking.data != null &&
    getVirtualCoreContestRanking.data.investors.length >= 1 &&
    getVirtualCoreContestRanking.data.investors.length <= 3
  ) {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor[2]}
        data={noDataTop.slice(3)}
        renderItem={renderInvestingReturnListItem}
        ListHeaderComponent={
          <Top
            updatedDateTime={getVirtualCoreContestRanking.data.updatedDateTime}
            data={mappedTop || dataTop}
            periodFilter={tradingContestFilter}
            selectTabLeaderBoard={selectTabLeaderBoard}
            tradingContestFilter={tradingContestFilter}
          />
        }
        ListFooterComponent={<View style={styles.listFooterStyle}></View>}
      />
    );
  }
  // // case-render: Have Data and LOADING
  if (getVirtualCoreContestRanking.status === ReducerStatus.LOADING)
    return <LoadingLeaderBoard periodFilter={periodFilter} selectTabLeaderBoard={selectTabLeaderBoard} />;

  if (getVirtualCoreContestRanking.data == null) return null;

  const passedFinalContestListExtractKey = (item: ContestResultItemData, index: number) => {
    return `LeaderBoardVirtualContestRanking_PassedFinalContestList_${index}_${item.userId}`;
  };

  // case-render: show data from json of final when contest end
  if (
    contests != null &&
    subMenuContest != null &&
    isFinalFilter && // is final contest
    contests[0].result[contests[0].result.length - 2].showResult && // When the results are shown, the list will be shown
    currentTime > subMenuContest.endAt // time show list: the current time passes the end time of the contest
  ) {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={passedFinalContestListExtractKey}
        ref={scrollRef}
        data={contests[0].result[contests[0].result.length - 2].data.slice(3)}
        renderItem={renderTopPeopleLastWeek}
        initialNumToRender={10}
        ListHeaderComponent={
          <Top
            dataTopPeopleLastWeek={contests[0].result[contests[0].result.length - 2].data.slice(0, 3)}
            periodFilter={periodFilter}
            selectTabLeaderBoard={selectTabLeaderBoard}
          />
        }
        ListFooterComponent={
          <View style={styles.listEmptyContainer}>
            <LeaderBoardNoDataCupIcon />
            <Text style={styles.noDataContestText}>{t('TOP 3 INVESTORS THIS WEEK HAVE BEEN REVEALED')}</Text>
            <Text style={styles.noDataContestText1}>
              {t('You can view other different prize sections of the contest')}{' '}
              <Text onPress={goToTermAndCondition} style={styles.leaderBoardJoinContent2}>
                {t('here')}.
              </Text>
            </Text>
          </View>
        }
      />
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={globalStyles.container}
      ref={scrollRef}
      keyExtractor={keyExtractor[3]}
      data={getVirtualCoreContestRanking.data.investors.slice(3)}
      renderItem={renderInvestingReturnListItem}
      initialNumToRender={pageSizeLeaderboard - 3}
      onEndReached={handleLoadMoreData}
      onEndReachedThreshold={2}
      ListHeaderComponent={
        <Top
          updatedDateTime={getVirtualCoreContestRanking.data.updatedDateTime}
          data={dataTop}
          periodFilter={tradingContestFilter}
          selectTabLeaderBoard={selectTabLeaderBoard}
          tradingContestFilter={tradingContestFilter}
        />
      }
      ListFooterComponent={
        <View style={getVirtualCoreContestRanking.data.investors.length > 5 ? styles.marginBottomContainer : {}} />
      }
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <LeaderBoardNoDataCupIcon />
          <Text style={styles.noDataContestText}>{t("SOON, YOU'LL SEE THE RANKING HERE")}</Text>
          <Text style={styles.noDataContestText1}>
            {t('Invite friends in order to climb the leaderboard and seize the prize')}
          </Text>
        </View>
      }
    />
  );
};

export default memo(LeaderBoardVirtualContestRanking);
