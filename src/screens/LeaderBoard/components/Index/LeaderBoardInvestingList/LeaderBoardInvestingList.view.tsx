import React, { useContext, useMemo } from 'react';
import { View, FlatList, Text } from 'react-native';
import withMemo from 'HOC/withMemo';
import { ReducerStatus } from 'interfaces/reducer';
import LeaderBoardNoDataCupIcon from 'assets/component/LeaderBoardNoDataCup.svg';
import Top from 'screens/LeaderBoard/components/Top';
import { useLeaderBoardInvestingListLogic } from 'screens/LeaderBoard/components/Index/LeaderBoardInvestingList/LeaderBoardInvestingList.logic';
import { IProps } from 'screens/LeaderBoard/components/Index/LeaderBoardInvestingList/LeaderBoardInvestingList.type';
import { LeaderboardContext } from 'screens/LeaderBoard/LeaderBoard.logic';
import { noDataTop } from 'screens/LeaderBoard/components/common/noDataTop';
import LoadingLeaderBoard from 'screens/LeaderBoard/components/common/LoadingLeaderBoard';
import useStyles from 'screens/LeaderBoard/styles';
import { useTranslation } from 'react-i18next';
import { pageSizeLeaderboard } from 'screens/LeaderBoard';
import LoginRequiredModal from 'components/LoginRequired/LoginRequiredModal';

const LeaderBoardInvestingList = (props: IProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const { leaderBoardInvesting } = props;
  const [
    { selectTabLeaderBoard, periodFilter, isFinalFilter, eachWeek, currentWeek, tradingContestFilter },
    setIndexState,
  ] = useContext(LeaderboardContext);

  /**
   * Share Context props from LeaderboardContext
   * for LeaderBoardInvestingList.logic handle
   * */
  const {
    handleLoadMoreData,
    ui: { renderInvestingItem },
  } = useLeaderBoardInvestingListLogic({
    ...props,
    selectTabLeaderBoard,
    periodFilter,
    isFinalFilter,
    eachWeek,
    currentWeek: currentWeek,
    tradingContestFilter,
    setIndexState,
  });

  const dataTop = useMemo(
    () => (leaderBoardInvesting.data != null ? leaderBoardInvesting.data.investors.slice(0, 3) : []),
    [leaderBoardInvesting]
  );

  const lessThanThreeUser =
    leaderBoardInvesting.data != null ? [...leaderBoardInvesting.data.investors.slice(0, 3)] : [];
  const mappedTop = noDataTop.map((item, index) => {
    if (lessThanThreeUser[index]) item = lessThanThreeUser[index];
    return item;
  });

  // // case-render: is Loading
  if (leaderBoardInvesting.status === ReducerStatus.LOADING)
    return <LoadingLeaderBoard periodFilter={periodFilter} selectTabLeaderBoard={selectTabLeaderBoard} />;

  // case-render: Less than three user
  if (
    leaderBoardInvesting.status === ReducerStatus.SUCCESS &&
    leaderBoardInvesting.data != null &&
    leaderBoardInvesting.data.investors.length >= 1 &&
    leaderBoardInvesting.data.investors.length <= 3
  ) {
    return (
      <FlatList
        keyExtractor={(_item, index) => `${index}`}
        data={noDataTop.slice(3)}
        renderItem={renderInvestingItem}
        ListHeaderComponent={
          <Top
            updatedDateTime={leaderBoardInvesting.data.updatedDateTime}
            data={mappedTop || dataTop}
            periodFilter={tradingContestFilter}
            selectTabLeaderBoard={selectTabLeaderBoard}
            tradingContestFilter={tradingContestFilter}
          />
        }
        ListFooterComponent={<View style={styles.BGWhite}></View>}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(_item, index) => `${index}`}
        data={leaderBoardInvesting?.data?.investors.slice(3)}
        renderItem={renderInvestingItem}
        initialNumToRender={pageSizeLeaderboard - 3}
        onEndReached={handleLoadMoreData}
        onEndReachedThreshold={2}
        ListHeaderComponent={
          <Top
            updatedDateTime={leaderBoardInvesting?.data?.updatedDateTime}
            data={dataTop}
            periodFilter={periodFilter}
            selectTabLeaderBoard={selectTabLeaderBoard}
          />
        }
        ListFooterComponent={
          <View
            style={
              leaderBoardInvesting.data && leaderBoardInvesting.data.investors.length > 5
                ? styles.marginBottomContainer
                : {}
            }
          />
        }
        ListEmptyComponent={
          <View style={styles.listEmptyContainer}>
            <LeaderBoardNoDataCupIcon />
            <Text style={[styles.noDataContestText, styles.paddingVertical12]}>
              {t("SOON, YOU'LL SEE THE RANKING HERE")}
            </Text>
            <Text style={styles.noDataContestText1}>
              {t('Invite friends in order to climb the leaderboard and seize the prize')}
            </Text>
          </View>
        }
      />
      <LoginRequiredModal />
    </>
  );
};

export default withMemo(LeaderBoardInvestingList);
