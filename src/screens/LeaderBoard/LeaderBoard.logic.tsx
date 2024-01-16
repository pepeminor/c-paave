/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import useHandlers from 'hooks/useHandlers';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { closeQuestionContestLeaderBoardModal } from 'reduxs/global-actions';
import TradingContestModal from './components/TradingContestModal';
import BottomModal from 'components/BottomModal';
import { ILeaderBoardInvestingPeriod, ILeaderBoardTradingFilter } from 'constants/enum';
import { LEADER_BOARD_ACCOUNT_SELECTOR, LEADER_BOARD_CONTEST_MODAL } from 'reduxs/actions';
import { onEnterLeaderBoardScreen } from './action';
import { IProps, IContextStateLeaderBoard, Period } from './LeaderBoard.type';
import { ACCOUNT_TYPE } from 'global';

export const initLeaderBoardState = {
  selectTabLeaderBoard: true,
  periodFilter: 'WEEK' as Period,
  isFinalFilter: false,
  eachWeek: 0,
  currentWeek: 0,
  tradingContestFilter: ILeaderBoardTradingFilter.ALL_USERS,
};

const setIndexState = (value?: IContextStateLeaderBoard) => value || null;

export const LeaderboardContext = React.createContext<
  [IContextStateLeaderBoard, React.Dispatch<IContextStateLeaderBoard | any>]
>([initLeaderBoardState, setIndexState]);

const useLeaderBoardLogic = (props: IProps) => {
  const dispatch = useDispatch();
  const scrollRef = useRef<FlatList>(null);
  const propsRef = useRef({
    ...props,
    ...initLeaderBoardState,
  });
  propsRef.current = { ...propsRef.current, ...props };

  const {
    isHaveKisAccount,
    subMenuContest,
    showQuestionContestLeaderBoardModal,
    leaderBoardInvesting,
    contestModalState,
    shouldContestModalShow,
    isVirtualLeaderboardSelected,
    contestId,
  } = props;

  /**
   * Local state of LeaderBoard screen
   * was share for Index components (components/Index/...)
   * through Context API
   * useContext(LeaderboardContext)
   **/
  const [
    {
      selectTabLeaderBoard,
      periodFilter,
      isFinalFilter,
      eachWeek,
      currentWeek,
      tradingContestFilter = subMenuContest != null
        ? (subMenuContest.name[0].tab as ILeaderBoardTradingFilter)
        : ILeaderBoardTradingFilter.ALL_USERS,
    },
    setIndexState,
  ] = useState(initLeaderBoardState);

  const { leaderBoardTab = true } = props;

  const [contestModal, openContestModal] = BottomModal({
    ModalContent: TradingContestModal,
    disableUnderlay: true,
  });

  useEffect(() => {
    scrollRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }, [leaderBoardInvesting]);

  useEffect(() => {
    if (!contestModalState && shouldContestModalShow) {
      openContestModal();
      dispatch({
        type: LEADER_BOARD_CONTEST_MODAL,
        payload: true,
      });
    }
  }, [shouldContestModalShow, contestModalState]);

  // use to catching deep link param
  useEffect(() => {
    setIndexState((prev: IContextStateLeaderBoard) => ({ ...prev, selectTabLeaderBoard: leaderBoardTab as boolean }));
  }, [leaderBoardTab]);

  // 1890 - contest
  useEffect(() => {
    dispatch(
      onEnterLeaderBoardScreen({
        period: periodFilter as ILeaderBoardInvestingPeriod,
        selectTabLeaderBoard: selectTabLeaderBoard,
        isFinalFilter: isFinalFilter,
        tradingContestFilter: tradingContestFilter,
      })
    );
  }, [isVirtualLeaderboardSelected, contestId, selectTabLeaderBoard, periodFilter, tradingContestFilter]);

  useEffect(() => {
    return () => {
      isHaveKisAccount
        ? dispatch({ type: LEADER_BOARD_ACCOUNT_SELECTOR, payload: ACCOUNT_TYPE.KIS })
        : dispatch({ type: LEADER_BOARD_ACCOUNT_SELECTOR, payload: ACCOUNT_TYPE.VIRTUAL });
    };
  }, []);

  const handlers = useHandlers({
    closeQuestionContestModal: () => {
      dispatch(closeQuestionContestLeaderBoardModal({}));
    },
  });

  return {
    state: {
      selectTabLeaderBoard,
      periodFilter,
      isFinalFilter,
      eachWeek,
      currentWeek,
      tradingContestFilter,
    },
    setIndexState,
    showQuestionContestLeaderBoardModal,
    handlers,
    refs: {
      scrollRef,
    },
    modals: {
      contestModal,
    },
  };
};

export { useLeaderBoardLogic };
