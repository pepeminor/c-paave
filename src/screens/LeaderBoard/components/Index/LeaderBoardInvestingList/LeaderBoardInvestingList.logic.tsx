/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useDispatch } from 'react-redux';
import { getLeaderBoardInvestment, goToUserWall, setCurrentUserSubAccount } from 'reduxs/global-actions';
import { ILeaderBoardInvestingPeriod } from 'constants/enum';
import { LEADER_BOARD_GET_CURRENT_INVESTING_INFO, LEADER_BOARD_GET_INVESTING } from 'reduxs/actions';
import { ILeaderBoardInvestingResponse } from 'interfaces/leaderBoard';
import { ContestResultItemData } from 'interfaces/File';
import { navigationRef } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { RESET } from 'reduxs/action-type-utils';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { IProps } from 'screens/LeaderBoard/components/Index/LeaderBoardInvestingList/LeaderBoardInvestingList.type';
import InvestingItem from 'screens/LeaderBoard/components/common/InvestingItem';
import { IContextStateLeaderBoard } from 'screens/LeaderBoard/LeaderBoard.type';
import { initLeaderBoardState } from 'screens/LeaderBoard/LeaderBoard.logic';
import { pageSizeLeaderboard } from 'screens/LeaderBoard';
import { ACCOUNT_TYPE } from 'global';
import { showNonLoginModal } from 'reduxs/global-actions/NonLogin';
import Domain from 'screens/LeaderBoard/domain';

const useLeaderBoardInvestingListLogic = (props: IProps & IContextStateLeaderBoard) => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLimit, setIsLimit] = useState(false);

  const propsRef = useRef({
    ...props,
  });
  propsRef.current = { ...propsRef.current, ...props };

  /**
   * Get props Context
   * from LeaderBoardInvestingList.view
   */
  const {
    selectedAccountType,
    periodFilter,
    eachWeek,
    currentWeek,
    selectTabLeaderBoard,
    isVirtualSelected,
    setIndexState,
  } = props;

  const goToUserWallScreen = useCallback(
    (userData: ILeaderBoardInvestingResponse | ContestResultItemData) => () => {
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
        dispatch(goToUserWall((userData as ContestResultItemData).username));
      } else {
        navigationRef.navigate(ScreenNames.UserWall, {
          userData: userData as ILeaderBoardInvestingResponse,
          defaultSample: geDefaultSample(),
          selectTabLeaderBoard: selectTabLeaderBoard,
          isFromSearch: false,
        });
      }
      dispatch(setCurrentUserSubAccount(userData.subAccount));
    },
    [dispatch, periodFilter, selectTabLeaderBoard]
  );

  const requiredLogin = useCallback(
    () => () => {
      dispatch(showNonLoginModal());
    },
    []
  );

  const renderInvestingItem = useCallback(
    ({ item, index }: ListRenderItemInfo<ILeaderBoardInvestingResponse>) => {
      return (
        <InvestingItem
          item={item}
          index={index}
          onPressItem={Domain[selectedAccountType].goToUserWallScreen ? goToUserWallScreen : requiredLogin}
        />
      );
    },
    [goToUserWallScreen]
  );

  const loadDataInvesting = useCallback(() => {
    if (isLimit) return;
    setIsLoading(true);
    dispatch(
      getLeaderBoardInvestment(
        {
          partnerId: isVirtualSelected ? '' : ACCOUNT_TYPE.KIS,
          pageNumber: pageNumber,
          pageSize: pageSizeLeaderboard,
          period: periodFilter as ILeaderBoardInvestingPeriod,
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
  }, [isLoading, pageNumber, periodFilter, isVirtualSelected]);

  const loadDataInvestingByPeriod = useCallback(() => {
    dispatch({ type: RESET(LEADER_BOARD_GET_INVESTING) });
    setPageNumber(0);
    setIsLimit(false);
  }, [periodFilter]);

  const handleLoadMoreData = useCallback(() => {
    if (isLoading) return;
    setPageNumber(pageNumber + 1);
  }, [pageNumber, isLoading]);

  const resetComponent = useCallback(() => {
    dispatch({ type: RESET(LEADER_BOARD_GET_INVESTING) });
    dispatch({ type: RESET(LEADER_BOARD_GET_CURRENT_INVESTING_INFO) });
    setPageNumber(0);
    setIsLoading(false);
    setIsLimit(false);
    setIndexState && setIndexState(initLeaderBoardState);
  }, [dispatch, setIndexState]);

  useUpdateEffect(() => {
    loadDataInvesting();
  }, [pageNumber]);

  useUpdateEffect(() => {
    loadDataInvestingByPeriod();
  }, [loadDataInvestingByPeriod]);

  useEffect(() => {
    resetComponent();
  }, [isVirtualSelected, resetComponent]);

  return {
    ui: {
      renderInvestingItem,
    },
    handleLoadMoreData,
  };
};

export { useLeaderBoardInvestingListLogic };
