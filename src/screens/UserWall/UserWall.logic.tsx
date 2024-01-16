import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef } from 'react';
import { IProps, UserWallInfoTabs } from './UserWall.type';
import { ACCOUNT_TYPE } from 'global';
import { formatDateToString } from 'utils/datetime';
import { getLastTradingDay, useUpdateUserViewCount as useUpdateUserViewCount } from './UserWall.helper';
import { isAfter, isBefore, subDays } from 'date-fns';
import { IFollowingDailyProfitLoss } from 'interfaces/equity';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { insertObjectIf, isCloseToBottom } from 'utils/common';
import config from 'config';
import { ReducerStatus } from 'interfaces/reducer';
import { ITradingHistories } from 'interfaces/profile';
import { isEqual } from 'lodash';
import { isNotNilOrEmpty } from 'ramda-adjunct';
import APIList from 'config/api';
import { useIsFocused } from '@react-navigation/native';

const initializeState = {
  extended: false,
  extendedVisible: false,
  followed: false,
  selectingPortfolio: 'ACCOUNT_PROFIT' as UserWallInfoTabs,
  sample: 0,
  fromDate: subDays(new Date(), 7),
  toDate: new Date(),
  pageNumber: 0,
  pageSize: config.pageSize,
  listDailyProfitLossByDate: [] as IFollowingDailyProfitLoss[],
  fromDateTradingHistory: subDays(new Date(), 7),
  toDateTradingHistory: new Date(),
  pageNumberTradingHistory: 0,
  listTradingHistory: [] as ITradingHistories[],
  isLoadingTradingHistory: false,
  enableScroll: true,
  searchText: '',
  refreshing: false,
};

const useUserWallLogic = (props: IProps) => {
  const [state, setState] = useMergingState({
    ...initializeState,
    sample: props.route.params.defaultSample ?? 90,
  });
  const {
    selectedAccountLeaderBoard,
    resetTradingHistory,
    getFollowingDailyProfitLoss,
    getFollowingDailyProfitLossByDate,
    getFollowingDailyProfitLossKisByDate,
    getFollowingProfitLoss,
    getFollowingProfitLossKis,
    getTradingHistory,
    currentSubContestUser,
    followingDailyProfitLossData,
    tradingHistory,
    isKis,
    isDemoAccount,
  } = props;
  const { userData } = props.route.params;
  const propsRefJson = {
    ...props,
    ...state,
    userData,
  };
  const propsRef = useRef(propsRefJson);
  propsRef.current = propsRefJson;
  const alreadyIncreasePageSize = useRef(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isDemoAccount) return;
    handlers.loadUserWallData();
  }, [selectedAccountLeaderBoard, isDemoAccount, userData.userId, currentSubContestUser, state.fromDate, state.toDate]);

  useEffect(() => {
    const newListFollowingDailyProfitLoss = state.listDailyProfitLossByDate.concat(
      followingDailyProfitLossData.data?.followingDailyProfits ?? []
    );
    const uniqueList = [...new Map(newListFollowingDailyProfitLoss.map(item => [item['date'], item])).values()];
    setState({
      listDailyProfitLossByDate: uniqueList,
    });

    if (followingDailyProfitLossData.status === ReducerStatus.SUCCESS && followingDailyProfitLossData.data != null) {
      setState({
        pageNumber: propsRef.current.pageNumber + 1,
      });
    }
  }, [followingDailyProfitLossData]);

  useEffect(() => {
    const stateHistory = state.listTradingHistory;
    const propHistory = tradingHistory.data;

    if (
      propHistory == null ||
      (stateHistory.length &&
        propHistory.tradingHistories.length &&
        isEqual(stateHistory.slice(-propHistory.tradingHistories.length), propHistory.tradingHistories))
    ) {
      return;
    }

    const uniqueList = stateHistory.concat(propHistory.tradingHistories);
    const finishLoading =
      tradingHistory.status === ReducerStatus.SUCCESS &&
      tradingHistory.data != null &&
      tradingHistory.data?.tradingHistories?.length < state.pageSize;

    const newState: {
      listTradingHistory: ITradingHistories[];
      isLoadingTradingHistory?: boolean;
    } = {
      listTradingHistory: uniqueList,
    };

    if (finishLoading) newState.isLoadingTradingHistory = false;

    setState(newState);
  }, [tradingHistory.data]);

  useEffect(() => {
    if (!isFocused) return;
    if (isDemoAccount) return;
    if (isNotNilOrEmpty(props.dataProfitLoss?.[state.sample.toString()])) return;
    handlers.loadUserWallChartData();
  }, [state.sample, currentSubContestUser, isDemoAccount, selectedAccountLeaderBoard, userData.userId]);

  useEffect(() => {
    if (!isFocused) return;
    handlers.queryFollowingDailyProfitLossByDate({ fromDate: state.fromDate, toDate: state.toDate });
    handlers.queryTradingHistory({ fromDate: state.fromDateTradingHistory, toDate: state.toDateTradingHistory });
  }, [currentSubContestUser]);

  useEffect(() => {
    return () => {
      setState({ pageNumber: 0 });
      resetTradingHistory(null);
    };
  }, []);

  useUpdateUserViewCount(userData.userId);

  const handlers = useHandlers({
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isCloseToBottom(event.nativeEvent)) {
        handlers.onLoadMore();
      }
    },
    onLoadMore: () => {
      if (propsRef.current.selectingPortfolio === 'DAILY_PL') {
        if (
          propsRef.current.followingDailyProfitLossData.status === ReducerStatus.SUCCESS &&
          (propsRef.current.followingDailyProfitLossData.data?.followingDailyProfits == null ||
            propsRef.current.followingDailyProfitLossData.data.followingDailyProfits.length === 0)
        ) {
          return;
        }
        handlers.queryFollowingDailyProfitLossByDate({
          fromDate: propsRef.current.fromDate,
          toDate: propsRef.current.toDate,
          pageNumber: propsRef.current.pageNumber,
        });
      }

      if (propsRef.current.selectingPortfolio === 'HISTORY') {
        handlers.queryTradingHistory({
          fromDate: propsRef.current.fromDateTradingHistory,
          toDate: propsRef.current.toDateTradingHistory,
          pageNumber: propsRef.current.pageNumberTradingHistory + 1,
          pageSize: propsRef.current.pageSize,
        });

        setState({
          isLoadingTradingHistory: true,
          pageNumberTradingHistory: propsRef.current.pageNumberTradingHistory + 1,
        });
      }
    },
    onExtendedVisible: (value: boolean) => {
      setState({
        extendedVisible: value,
      });
    },
    toggleExtend: () => {
      setState({
        extended: !propsRef.current.extended,
      });
    },
    onChangeTabs: (tab: UserWallInfoTabs) => {
      setState({ selectingPortfolio: tab });
    },
    setSampleAndClearData: (value: number) => {
      if (propsRef.current.sample != value) {
        setState({
          sample: value,
        });
      }
    },
    onChangeFromDate: (value: Date) => {
      let tempDate = propsRef.current.toDate;
      if (value !== propsRef.current.fromDate) {
        if (isAfter(value, propsRef.current.toDate)) {
          tempDate = value;
          setState({
            toDate: value,
          });
        }
        setState({
          fromDate: value,
          pageNumber: 0,
          listTradingHistory: [],
        });
        handlers.queryFollowingDailyProfitLossByDate({ fromDate: value, toDate: tempDate, pageNumber: 0 });
      }
    },

    onChangeToDate: (value: Date) => {
      let tempDate = propsRef.current.fromDate;

      if (value !== propsRef.current.toDate) {
        if (isBefore(value, propsRef.current.fromDate)) {
          tempDate = value;

          setState({
            fromDate: value,
          });
        }
        setState({
          toDate: value,
          pageNumber: 0,
          listTradingHistory: [],
        });
        handlers.queryFollowingDailyProfitLossByDate({ fromDate: tempDate, toDate: value, pageNumber: 0 });
      }
    },

    onChangeFromDateTradingHistory: (value: Date) => {
      alreadyIncreasePageSize.current = false;
      let tempDate = propsRef.current.toDateTradingHistory;
      if (value !== propsRef.current.fromDateTradingHistory) {
        if (isAfter(value, propsRef.current.toDateTradingHistory)) {
          tempDate = value;
          setState({
            toDateTradingHistory: value,
          });
        }
        setState({
          fromDateTradingHistory: value,
          pageNumberTradingHistory: 0,
          listTradingHistory: [],
        });
        handlers.queryTradingHistory({ fromDate: value, toDate: tempDate, pageNumber: 0 });
      }
    },

    onChangeToDateTradingHistory: (value: Date) => {
      alreadyIncreasePageSize.current = false;
      let tempDate = propsRef.current.fromDateTradingHistory;

      if (value !== propsRef.current.toDateTradingHistory) {
        if (isBefore(value, propsRef.current.fromDateTradingHistory)) {
          tempDate = value;

          setState({
            fromDateTradingHistory: value,
          });
        }
        setState({
          toDateTradingHistory: value,
          pageNumberTradingHistory: 0,
          listTradingHistory: [],
        });
        handlers.queryTradingHistory({ fromDate: tempDate, toDate: value, pageNumber: 0 });
      }
    },
    onChangeEnableScroll: (enableScroll: boolean) => {
      setState({
        enableScroll,
      });
    },
    onTextSearchChange: (text: string) => {
      setState({ searchText: text, pageSize: 500, listTradingHistory: [] });
      handlers.queryTradingHistory({
        fromDate: propsRef.current.fromDateTradingHistory,
        toDate: propsRef.current.toDateTradingHistory,
        pageNumber: 0,
        pageSize: 500,
      });
      if (alreadyIncreasePageSize.current) return;
    },
    onClearTextSearch: () => {
      setState({ searchText: '' });
    },
    onRefresh: () => {
      setState({
        fromDate: subDays(new Date(), 7),
        toDate: new Date(),
        pageNumber: 0,
        fromDateTradingHistory: subDays(new Date(), 7),
        toDateTradingHistory: new Date(),
        pageNumberTradingHistory: 0,
        isLoadingTradingHistory: false,
        searchText: '',
        refreshing: true,
        listDailyProfitLossByDate: [],
        listTradingHistory: [],
      });
      handlers.loadUserWallData();
      handlers.loadUserWallChartData();
      setState({
        refreshing: false,
      });
    },
    queryTradingHistory: (params: { fromDate: Date; toDate: Date; pageNumber?: number; pageSize?: number }) => {
      const { fromDate, toDate, pageNumber = 0, pageSize = propsRef.current.pageSize } = params;
      if (propsRef.current.isDemoAccount || propsRef.current.currentSubContestUser == null) return;
      getTradingHistory({
        profileId: propsRef.current.userData.userId,
        fromDate: formatDateToString(fromDate) || '',
        toDate: formatDateToString(toDate) || '',
        sort: true,
        page: pageNumber,
        pageSize,
        profileSubAccount: propsRef.current.currentSubContestUser,
      });
    },
    queryFollowingDailyProfitLossByDate: (params: {
      fromDate: Date;
      toDate: Date;
      pageNumber?: number;
      pageSize?: number;
    }) => {
      const { fromDate, toDate, pageNumber = 0, pageSize = propsRef.current.pageSize } = params;

      if (pageNumber === 0) {
        setState({
          listDailyProfitLossByDate: [],
        });
      }
      if (propsRef.current.isDemoAccount || (!isKis && propsRef.current.currentSubContestUser == null)) return;
      if (!isKis) {
        getFollowingDailyProfitLossByDate({
          sortAsc: false,
          followingUserId: propsRef.current.userData.userId,
          fromDate: formatDateToString(fromDate) || '',
          toDate: formatDateToString(toDate) || '',
          followingSubAccount: propsRef.current.currentSubContestUser,
          pageNumber,
          pageSize,
        });
      } else if (isKis) {
        getFollowingDailyProfitLossKisByDate({
          sortAsc: false,
          followingUserId: propsRef.current.userData.userId,
          fromDate: formatDateToString(fromDate) || '',
          toDate: formatDateToString(toDate) || '',
          pageNumber,
          pageSize,
          partnerId: 'kis',
        });
      }
    },
    loadUserWallChartData: () => {
      const { currentSubContestUser, sample, userData, holidays, isKis } = propsRef.current;
      const { userId } = userData;
      if (currentSubContestUser == null && !isKis) return;
      sample != 0
        ? getFollowingDailyProfitLoss({
            params: {
              followingUserId: userId,
              fromDate: formatDateToString(getLastTradingDay(sample, holidays)) || '',
              toDate: formatDateToString(new Date()) || '',
              pageSize: 500,
              pageNumber: 0,
              ...insertObjectIf(!isKis, {
                followingSubAccount: currentSubContestUser || '',
              }),
              ...insertObjectIf(isKis, { partnerId: 'kis' }),
            },
            period: sample,
            accountType: !isKis ? ACCOUNT_TYPE.VIRTUAL : ACCOUNT_TYPE.KIS,
          })
        : getFollowingDailyProfitLoss({
            params: {
              followingUserId: userId,
              pageSize: 500,
              pageNumber: 0,
              ...insertObjectIf(!isKis, {
                followingSubAccount: currentSubContestUser || '',
              }),
              ...insertObjectIf(isKis, { partnerId: 'kis' }),
            },
            period: sample,
            accountType: !isKis ? ACCOUNT_TYPE.VIRTUAL : ACCOUNT_TYPE.KIS,
          });
    },
    loadUserWallData: () => {
      const { currentSubContestUser, fromDate, userData, toDate, pageSize } = propsRef.current;
      const { userId } = userData;
      if (currentSubContestUser == null) return;
      !isKis
        ? getFollowingProfitLoss({
            api: APIList.getFollowingProfitLoss,
            isLeaderBoard: true,
            paramsOther: {
              followingUserId: userId,
              followingSubAccount: currentSubContestUser,
            },
            isLoading: false,
          })
        : getFollowingProfitLossKis({
            params: {
              followingUserId: userData.userId,
              partnerId: 'kis',
            },
          });
      resetTradingHistory(null);
      getTradingHistory(
        {
          profileId: userId,
          fromDate: formatDateToString(fromDate) ?? '',
          toDate: formatDateToString(toDate) ?? '',
          sort: true,
          page: 0,
          pageSize,
          profileSubAccount: currentSubContestUser,
        },
        undefined,
        undefined,
        undefined,
        undefined,
        {
          handleSuccess() {
            setState({
              refreshing: false,
            });
          },
          handleFail() {
            setState({
              refreshing: false,
            });
          },
        }
      );
    },
  });

  return {
    state,
    handlers,
  };
};

export { useUserWallLogic };
