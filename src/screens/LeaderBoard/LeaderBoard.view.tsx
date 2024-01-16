import React, { memo, useContext, useEffect, useMemo } from 'react';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
import globalStyles from 'styles';
import useStyles from './styles';
import JoinNowModalContent from './components/JoinNowModalContent';
import KycKisModalContent from './components/KycKisModalContent';
import QuestionContestModal from './components/QuestionContestModal';
import Modal from 'components/Modal';
import {
  ContentCardCurrentInvesting,
  BackgroundNoContest,
  BackgroundContestPreJoin,
} from 'screens/LeaderBoard/components/Index';
import { LeaderboardContext, useLeaderBoardLogic } from './LeaderBoard.logic';
import { IProps } from './LeaderBoard.type';
import LeaderBoardInvestingList from 'screens/LeaderBoard/components/Index/LeaderBoardInvestingList';
import LeaderBoardVirtualContestRanking from 'screens/LeaderBoard/components/Index/LeaderBoardVirtualContestRanking';
import CustomHeader from './components/CustomHeader';
import JoinNowModalRealLeaderboard from './components/JoinNowModalRealLeaderboard';
import DummyModal from 'components/DummyModal';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import { useIsFocused } from '@react-navigation/native';
import SwitchBoard from './components/CustomHeader/components/SwitchBoard';
import ButtonContestHappening from './components/CustomHeader/components/ButtonContestHappening';
import SwitchPeriodLeaderBoard from './components/CustomHeader/components/SwitchPeriodLeaderBoard';

const LeaderBoard = (props: IProps) => {
  const { styles } = useStyles();

  const isFocused = useIsFocused();
  const [{ selectTabLeaderBoard }] = useContext(LeaderboardContext);

  const {
    state,
    setIndexState,
    modals: { contestModal },
    showQuestionContestLeaderBoardModal,
    handlers: { closeQuestionContestModal },
  } = useLeaderBoardLogic(props);

  const { isShowDummyModal } = props;

  useEffect(() => {
    if (isFocused) {
      track(AMPLITUDE_EVENT.VIEW_LEADER_BOARD, {
        selectedAccount: props.accountType,
      });
    }
  }, [isFocused]);

  return (
    <View style={styles.leaderboardContainer}>
      <View style={styles.bgContainer}>
        <Image source={require('assets/img/leaderboard-background.jpg')} resizeMode={'repeat'} style={styles.imgBg} />
      </View>
      <LeaderboardContext.Provider value={useMemo(() => [state, setIndexState], [state, setIndexState])}>
        {/* <HeaderLeaderBoardScreen /> */}
        <View style={styles.containerPeriod}>
          {!props.isKisSelected && <SwitchBoard />}
          {selectTabLeaderBoard && (
            <>
              <ButtonContestHappening />
              <SwitchPeriodLeaderBoard />
            </>
          )}
        </View>
        <CustomHeader />
        {state.selectTabLeaderBoard ? <LeaderBoardInvestingList /> : <LeaderBoardVirtualContestRanking />}
        <ContentCardCurrentInvesting />
        {/* When there is no contest */}
        <BackgroundNoContest />
        <BackgroundContestPreJoin />
      </LeaderboardContext.Provider>
      {contestModal}
      <Modal
        visible={showQuestionContestLeaderBoardModal}
        onRequestClose={closeQuestionContestModal}
        childrenContent={
          <View style={[styles.modalBackground, globalStyles.modalBackground2]}>
            <QuestionContestModal closeModal={closeQuestionContestModal} />
            <TouchableWithoutFeedback onPress={closeQuestionContestModal}>
              <View style={globalStyles.invisibleBackground} />
            </TouchableWithoutFeedback>
          </View>
        }
      />
      <JoinNowModalContent />
      <JoinNowModalRealLeaderboard />
      {isShowDummyModal && isFocused && (
        <DummyModal
          dummyTitle="Leaderboard_Title_Your_Adjustment_Recorded"
          dummyText="Leaderboard_Your_Adjustment_Recorded"
        />
      )}
      <KycKisModalContent />
    </View>
  );
};

export default memo(LeaderBoard);
