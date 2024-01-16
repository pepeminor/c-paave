import React, { memo, useCallback, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
// import { TabBar, TabView } from 'react-native-tab-view'
import { useAiRatingScreenLogic, routes, TAB } from './AiRatingScreen.logic';
import useStyles from './AiRatingScreen.style';
import { IProps } from './AiRatingScreen.type';
import CopyTradeBtn from 'components/CopyTradeBtn';
import { useTranslation } from 'react-i18next';
import HeaderScreen from 'components/HeaderScreen';
import { scaleSize } from 'styles';
import UserIcon from 'assets/icon/UserIcon.svg';
import ScoreTab from './components/ScoreTab';
import AdvisorTab from './components/AdvisorTab';
import AIRatingModal from 'components/AIRatingModal';
import QuestionIcon from 'assets/icon/Question.svg';
import ModalBottom from 'components/ModalBottom';
import { RoboAdvisorsModal } from './components/SupportSticky';
import NewLogo from 'components/NewLogo';
import TabView from 'components/TabView';
import { TabViewRef } from 'components/TabView/TabView.type';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { HitSlop } from 'constants/enum';

const QuestionAIRating = memo(() => {
  const [visibleModal, setVisibleModal] = useState(false);
  const { styles } = useStyles();
  const handleVisible = () => {
    setVisibleModal(pre => !pre);
  };

  return (
    <View style={styles.questionIcon}>
      <TouchableOpacity onPress={handleVisible} hitSlop={HitSlop}>
        <QuestionIcon />
        {visibleModal === true && <AIRatingModal handleVisible={handleVisible} isVisibleText={true} />}
      </TouchableOpacity>
    </View>
  );
});

const QuestionAIAdvisors = memo(() => {
  const { styles } = useStyles();
  const [advisorModal, openAdvisorModal] = useState(false);

  const onPress = useCallback(() => {
    openAdvisorModal(true);
  }, []);

  return (
    <View style={styles.questionIconAdvisor}>
      <TouchableOpacity onPress={onPress} style={styles.containerQuestionAdvisor}>
        <QuestionIcon />
        <NewLogo width={30} height={20} fontSize={10} />
        <ModalBottom setVisible={openAdvisorModal} visible={advisorModal}>
          <RoboAdvisorsModal />
        </ModalBottom>
      </TouchableOpacity>
    </View>
  );
});

const AiRatingScreen = (props: IProps) => {
  const { styles } = useStyles();
  const { handlers, aiRatingTab } = useAiRatingScreenLogic(props);
  const { t } = useTranslation();
  const TabViewRef = useRef<TabViewRef>(null);

  const renderScene = useCallback(({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case TAB.AI_RATING:
        return (
          <>
            <ScoreTab />
            <CopyTradeBtn followingType={'AIRatingTop5'} />
          </>
        );

      default:
        return <AdvisorTab />;
    }
  }, []);
  const renderLabel = useCallback(({ route, focused }) => {
    return (
      <View style={[styles.optionContainer, focused && styles.optionContainerSelected]}>
        <Text style={[styles.text, focused && styles.selectedText]}>{t(route.title)}</Text>

        {/* {route.key === TAB.AI_RATING ? <QuestionAIRating /> : <QuestionAIAdvisors />}
        {route.key === TAB.ROBO_ADVISORS && <NewLogo width={30} height={20} fontSize={10} xOffset={2} yOffset={-12} />} */}
      </View>
    );
  }, []);

  useUpdateEffect(() => {
    TabViewRef.current?.setTab(aiRatingTab.tab === TAB.ROBO_ADVISORS ? 1 : 0);
  }, [aiRatingTab]);

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={
          <TouchableOpacity onPress={handlers.goToUserInfo} style={styles.headerIconLeft}>
            <UserIcon height={scaleSize(24)} width={scaleSize(24)} />
          </TouchableOpacity>
        }
        headerTitle={'AI Insights'}
        subAccountVisible
      />
      <QuestionAIRating />
      <QuestionAIAdvisors />

      <TabView
        onChangeIndex={handlers.onSetIndex}
        ref={TabViewRef}
        routes={routes}
        renderScene={renderScene}
        renderLabel={renderLabel}
        lazy={false}
        swipeEnabled={false}
        initScreen={aiRatingTab.tab === TAB.ROBO_ADVISORS ? 1 : 0}
      />
    </View>
  );
};

export default memo(AiRatingScreen);
