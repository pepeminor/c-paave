/* eslint-disable @typescript-eslint/no-var-requires */
import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef } from 'react';
import { IProps } from './Portfolio.type';
import { navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { ACCOUNT_TYPE } from 'global';
import { onEnterPortfolioScreen } from './action';
import { GET_BANNER_LIST } from 'reduxs/actions';
import { DailyProfitLossActions } from 'reduxs';
import { initializeStateChart } from './components/Chart/Chart.logic';

const initializeState = {
  refreshing: false,
  isShowBannerCopyTrade: false,
  enableScroll: true,
};

const usePortfolioLogic = (props: IProps) => {
  const scrollRef = useRef<ScrollView>(null);
  const firstFetch = useRef<boolean>(true);
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state, setState] = useMergingState(initializeState, propsRef);
  const { selectedAccount, subAccountNumber } = props;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFocused) return;
    if (firstFetch.current) firstFetch.current = false;
    if (selectedAccount.type === ACCOUNT_TYPE.VIRTUAL && subAccountNumber != null) {
      handlers.scrollToTop();
      handlers.refreshAction(firstFetch.current);
      return;
    }

    if (selectedAccount.type !== ACCOUNT_TYPE.VIRTUAL) {
      handlers.scrollToTop();
      handlers.refreshAction(firstFetch.current);
    }
  }, [isFocused, selectedAccount, subAccountNumber]);

  const handlers = useHandlers({
    goToUserInfo: () => {
      navigate({ key: ScreenNames.UserInfo });
    },
    onRefresh: () => {
      setState({
        refreshing: true,
      });
      handlers.scrollToTop();
      handlers.refreshAction();
    },
    scrollToTop: () => {
      if (scrollRef == null) return;
      if (propsRef.current.refreshing && scrollRef != null && scrollRef.current != null) {
        scrollRef.current.scrollTo({
          y: 0,
          animated: true,
        });
      }
    },
    refreshAction: (investmentLoading = true) => {
      const { isSubD } = propsRef.current;
      dispatch(DailyProfitLossActions.refreshDailyProfitLoss(true));
      dispatch(
        onEnterPortfolioScreen({ investmentLoading }, undefined, undefined, undefined, undefined, {
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
        })
      );
      isSubD &&
        dispatch(
          DailyProfitLossActions.getDailyProfitLossKISRequest({
            subAccount: propsRef.current.accountNumber,
            days: initializeStateChart.sample.toString(),
            pageSize: 500,
            pageNumber: 0,
          })
        );

      dispatch({ type: GET_BANNER_LIST });
    },
    onChangeEnableScroll: (enableScroll: boolean) => {
      setState({
        enableScroll,
      });
    },
  });

  return {
    state,
    handlers,
    refs: {
      scrollRef,
    },
  };
};

export { usePortfolioLogic };
