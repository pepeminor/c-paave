import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { ILeaderBoardInvestingResponse } from 'interfaces/leaderBoard';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { useDispatch } from 'react-redux';
import { ACCOUNT_TYPE, ESubAccountJoinedContest } from 'global';
import { ILeaderBoardInvestingPeriod, ILeaderBoardTradingFilter } from 'constants/enum';
import { LEADER_BOARD_GET_CURRENT_INVESTING_INFO, LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING } from 'reduxs/actions';
import {
  getLeaderBoardVirtualCoreContestCurrentRanking,
  getLeaderBoardVirtualCoreContestRanking,
  setCurrentUserSubAccount,
} from 'reduxs/global-actions';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { navigate, navigationRef } from 'utils';
import { RESET } from 'reduxs/action-type-utils';
import { ContestResultItemData } from 'interfaces/File';
import { noDataTop } from 'screens/LeaderBoard/components/common/noDataTop';
import { IContextStateLeaderBoard } from 'screens/LeaderBoard/LeaderBoard.type';
import InvestingItem from 'screens/LeaderBoard/components/common/InvestingItem';
import InvestingLastWeekItem from 'screens/LeaderBoard/components/common/InvestingLastWeekItem';
import { IProps } from './LeaderBoardVirtualContestRanking.type';
// import { initLeaderBoardState } from 'screens/LeaderBoard/LeaderBoard.logic';
import { pageSizeLeaderboard } from 'screens/LeaderBoard';
import { initLeaderBoardState } from 'screens/LeaderBoard/LeaderBoard.logic';

const useVirtualContestRankingList = (props: IProps & IContextStateLeaderBoard) => {
  const dispatch = useDispatch();
  const scrollRef = useRef<FlatList>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLimit, setIsLimit] = useState(false);

  const propsRef = useRef({
    ...props,
  });
  propsRef.current = { ...propsRef.current, ...props };

  /**
   * Get props Context
   * from LeaderBoardVirtualContestRanking.view
   */
  const {
    periodFilter,
    isFinalFilter,
    eachWeek,
    currentWeek,
    selectTabLeaderBoard,
    tradingContestFilter,
    setIndexState,
    isVirtualSelected,
  } = props;

  /**
   * Get props from Store
   */
  const {
    currentTime,
    leaderBoardInvesting,
    getVirtualCoreContest,
    getVirtualCoreContestListed,
    subMenuContest,
    contestId,
    accountContestRegistered,
    selectedAccount,
    getVirtualCoreContestRanking,
  } = props;

  const isContestKis =
    getVirtualCoreContest.data != null && getVirtualCoreContest.data.length > 0
      ? getVirtualCoreContest.data.find(ele => ele.subAccount !== ESubAccountJoinedContest.NOT_JOIN)
      : getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length > 0
      ? getVirtualCoreContestListed.data[0]
      : subMenuContest;

  const showImageWhenContestEnded =
    subMenuContest != null ||
    (getVirtualCoreContest.data != null && getVirtualCoreContest.data.length === 0) ||
    (getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length === 0)
      ? subMenuContest != null
        ? subMenuContest.endAt < currentTime && subMenuContest.contestId === ''
        : false
      : false;

  const isNotAccountDemo = selectedAccount !== ACCOUNT_TYPE.DEMO;
  const contestIdNonLogin = contestId;
  // account not join
  const contestIdNotJoin =
    accountContestRegistered.data === ESubAccountJoinedContest.NOT_JOIN
      ? getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length > 0
        ? getVirtualCoreContestListed.data[0].contestId
        : contestId
      : false;
  // account joined
  const contestIdJoined = isContestKis?.contestId;

  const validContestId = isNotAccountDemo
    ? accountContestRegistered.data !== ESubAccountJoinedContest.NOT_JOIN
      ? contestIdJoined
      : contestIdNotJoin
    : contestIdNonLogin;

  const lessThanThreeUser =
    getVirtualCoreContestRanking.data != null ? [...getVirtualCoreContestRanking.data.investors.slice(0, 3)] : [];
  const mappedTop = noDataTop.map((item, index) => {
    if (lessThanThreeUser[index]) item = lessThanThreeUser[index];
    return item;
  });

  const dataTop = useMemo(
    () => (getVirtualCoreContestRanking.data != null ? getVirtualCoreContestRanking.data.investors.slice(0, 3) : []),
    [getVirtualCoreContestRanking]
  );

  const goToTermAndCondition = () => {
    navigate({
      key: 'TermAndConditionVT',
      params: { contestOrder: 0, contestTab: 'Ranking' },
    });
  };

  const goToUserWallScreen = (userData: ILeaderBoardInvestingResponse | ContestResultItemData) => () => {
    const geDefaultSample = () => {
      switch (periodFilter) {
        case ILeaderBoardInvestingPeriod.YEAR:
          return 365;
        case ILeaderBoardInvestingPeriod.MONTH:
          return 30;
        default:
          return 7;
      }
    };

    if (currentWeek > eachWeek) {
      navigationRef.navigate(ScreenNames.UserWall, {
        userData: {
          ...userData,
          fullname: (userData as ContestResultItemData).fullName,
        } as unknown as ILeaderBoardInvestingResponse,
        defaultSample: geDefaultSample(),
      });
    } else {
      navigationRef.navigate(ScreenNames.UserWall, {
        userData: userData as ILeaderBoardInvestingResponse,
        defaultSample: geDefaultSample(),
        selectTabLeaderBoard: selectTabLeaderBoard,
        isFromSearch: false,
      });
    }
    dispatch(setCurrentUserSubAccount(userData.subAccount));
  };

  const renderInvestingReturnListItem = ({ item, index }: ListRenderItemInfo<ILeaderBoardInvestingResponse>) => {
    return <InvestingItem item={item} index={index} onPressItem={goToUserWallScreen} />;
  };

  // Top people last week get data from json
  const renderTopPeopleLastWeek = ({ item, index }: ListRenderItemInfo<ContestResultItemData>) => {
    return <InvestingLastWeekItem item={item} index={index} onPressItem={goToUserWallScreen} />;
  };

  const loadDataContestRanking = useCallback(() => {
    if (isLimit) return;
    if (showImageWhenContestEnded) return;
    dispatch(
      getLeaderBoardVirtualCoreContestRanking(
        {
          contestId: validContestId as number,
          pageNumber: pageNumber,
          pageSize: pageSizeLeaderboard,
          period: isFinalFilter ? ILeaderBoardInvestingPeriod.MONTH : ILeaderBoardInvestingPeriod.WEEK,
          // withCondition: tradingContestFilter === ILeaderBoardTradingFilter.ALL_USERS ? false : true,
          withCondition: true, // Paave contest just only withCondition = true
        },
        undefined,
        undefined,
        undefined,
        undefined,
        {
          handleSuccess: response => {
            setIsLimit(response?.data.isLimit);
            setIsLoading(false);
          },
        }
      )
    );
  }, [validContestId, isLoading, pageNumber, isLimit, tradingContestFilter, isFinalFilter]);

  const handleLoadMoreData = useCallback(() => {
    if (isLoading) return;
    setPageNumber(pageNumber + 1);
  }, [pageNumber, isLoading]);

  const loadRankingByTradingContestFilter = useCallback(() => {
    dispatch({ type: RESET(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING) });
    setPageNumber(0);
    setIsLimit(false);
    setIsLoading(false);
  }, [tradingContestFilter]);

  const loadRankingByFinalFilter = useCallback(() => {
    dispatch({ type: RESET(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING) });
    setPageNumber(0);
    setIsLimit(false);
    setIsLoading(false);
  }, [isFinalFilter]);

  const resetComponent = useCallback(() => {
    dispatch({ type: RESET(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING) });
    dispatch({ type: RESET(LEADER_BOARD_GET_CURRENT_INVESTING_INFO) });
    setPageNumber(0);
    setIsLoading(false);
    setIsLimit(false);
    setIndexState && setIndexState(initLeaderBoardState);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }, [leaderBoardInvesting]);

  useUpdateEffect(() => {
    loadRankingByTradingContestFilter();
  }, [loadRankingByTradingContestFilter]);

  useUpdateEffect(() => {
    loadRankingByFinalFilter();
  }, [loadRankingByFinalFilter]);

  useUpdateEffect(() => {
    const isNotAccountDemo = selectedAccount !== ACCOUNT_TYPE.DEMO;
    // account not join
    const checkAccountNotJoin =
      accountContestRegistered.data === ESubAccountJoinedContest.NOT_JOIN
        ? getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length > 0
          ? getVirtualCoreContestListed.data[0].startAt <= currentTime
          : subMenuContest != null
          ? subMenuContest.startAt <= currentTime
          : false
        : false;
    // case non-login
    const checkShowListRankingNonLogin =
      subMenuContest != null ? !isNotAccountDemo && subMenuContest.startAt <= currentTime : false;
    // case login
    const checkShowListRankingLogin = isNotAccountDemo && isContestKis != null && isContestKis.startAt <= currentTime;

    if (checkAccountNotJoin || checkShowListRankingNonLogin || checkShowListRankingLogin) {
      loadDataContestRanking();
    }
  }, [
    pageNumber,
    subMenuContest?.startAt,
    currentTime,
    selectedAccount,
    tradingContestFilter,
    isFinalFilter,
    loadDataContestRanking,
  ]);

  useEffect(() => {
    return () => {
      dispatch({ type: RESET(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING) });
      dispatch({ type: RESET(LEADER_BOARD_GET_CURRENT_INVESTING_INFO) });
      setPageNumber(0);
      setIsLimit(false);
      setIndexState &&
        setIndexState((prev: IContextStateLeaderBoard) => ({
          ...prev,
          tradingContestFilter: ILeaderBoardTradingFilter.ALL_USERS,
        }));
      setIsLoading(false);
    };
  }, []);

  useEffect(() => {
    const contestId =
      (getVirtualCoreContest.data != null &&
        getVirtualCoreContest.data.length > 0 &&
        getVirtualCoreContest.data[0].contestId) ||
      Number(subMenuContest?.contestId);

    if (contestId == null) return;

    dispatch(
      getLeaderBoardVirtualCoreContestCurrentRanking({
        contestId,
        period: isFinalFilter ? ILeaderBoardInvestingPeriod.MONTH : ILeaderBoardInvestingPeriod.WEEK,
        // withCondition: tradingContestFilter === ILeaderBoardTradingFilter.ALL_USERS ? false : true,
        withCondition: true, // Paave contest just only withCondition = true
      })
    );
  }, [
    isFinalFilter,
    tradingContestFilter,
    getVirtualCoreContest.data,
    accountContestRegistered.data,
    subMenuContest?.contestId,
    selectTabLeaderBoard,
  ]);

  useEffect(() => {
    if (isVirtualSelected) return;
    resetComponent();
  }, [isVirtualSelected, resetComponent]);

  return {
    refs: {
      scrollRef,
    },
    ui: {
      renderInvestingReturnListItem,
      renderTopPeopleLastWeek,
    },
    logic: {
      goToTermAndCondition,
      handleLoadMoreData,
      mappedTop,
      dataTop,
      showImageWhenContestEnded,
    },
  };
};

export { useVirtualContestRankingList };
