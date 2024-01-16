import React, { memo, useEffect, useMemo, useState } from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import HeaderScreen from 'components/HeaderScreen';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import globalStyles, { scaleSize } from 'styles';
import TabSelector from 'components/TabSelector';
import RankingTab from './components/RankingTab';
import { useAppSelector } from 'hooks';
import { ContestContent, ContestItem } from 'interfaces/File';
import RenderHTML from 'react-native-render-html';
// import BottomButton from 'components/BottomButton';
// import { ACCOUNT_TYPE, ESubAccountJoinedContest, LANG } from '../../global/index';
import { LANG } from '../../global/index';
// import { showNonLoginModal } from 'reduxs/global-actions/NonLogin';
// import {
//   // getLeaderBoardVirtualCoreContest,
//   // getLeaderBoardVirtualCoreContestListed,
//   openJoinNowLeaderBoardModal,
//   openKycKisModal,
// } from 'reduxs/global-actions';
import KycKisModalContent from 'screens/LeaderBoard/components/KycKisModalContent';
import JoinNowModalContent from 'screens/LeaderBoard/components/JoinNowModalContent';
// import { EStatusVirtualContestListed } from 'constants/enum';

const TabNames = {
  Description: 'Description',
  Ranking: 'Ranking',
} as const;
type TabNames = keyof typeof TabNames;

const TermAndConditionVT = (props: StackScreenProps<'TermAndConditionVT'>) => {
  const { styles } = useStyles();

  const [tab, setTab] = useState<TabNames>(TabNames.Description);
  const selectedLanguage = useAppSelector(state => state.lang) || 'en';
  const { contestOrder = 0, contestTab = TabNames.Description } = props.route.params || {
    contestOrder: 0,
    contestTab: TabNames.Description,
  };
  const contests = useAppSelector(state => state.contests?.contests);
  const current_contest = contests?.[contestOrder] as ContestItem;
  // const accountContestRegistered = useAppSelector(state => state.accountContestRegistered.data);
  // const currentTime = useAppSelector(state => state.currentTime);
  // const getVirtualCoreContestListed = useAppSelector(state => state.getVirtualCoreContestListed);
  // const selectedAccount = useAppSelector(state => state.selectedAccount);
  // const accountList = useAppSelector(state => state.accountList);
  // const isHaveKISAccount = accountList.KIS;
  // const lastJoinableFromJson = useAppSelector(state => state.contests?.subMenu.lastJoinable);
  // const subMenuContest = useAppSelector(state => state.contests?.subMenu);

  const contestDesc = useMemo(() => {
    if (contestOrder == undefined || contests == undefined || contests[contestOrder] == null) return;
    if (selectedLanguage === LANG.KO) return contests[contestOrder].description['en'];
    return contests[contestOrder].description[selectedLanguage];
  }, [contestOrder, contests, selectedLanguage]);

  // const goJoinNow = () => {
  //   if (isHaveKISAccount) return dispatch(openJoinNowLeaderBoardModal({}));
  //   if (selectedAccount.type === ACCOUNT_TYPE.DEMO) return dispatch(showNonLoginModal());
  //   return dispatch(openKycKisModal({}));
  // };

  // const isShowJoinNowButton = useMemo(() => {
  //   if (currentTime == null) return;
  //   const isLastJoinAbleAt =
  //     getVirtualCoreContestListed.data != null && getVirtualCoreContestListed.data.length !== 0
  //       ? getVirtualCoreContestListed.data[0].lastJoinAbleAt
  //       : lastJoinableFromJson;
  //   const isContestTimeout = isLastJoinAbleAt ? Number(isLastJoinAbleAt) > Number(currentTime) : false;
  //   const isTabDescription = tab === 'Description' && current_contest.position === 2;
  //   // case non login
  //   const isNonLogin = isTabDescription && selectedAccount.type === ACCOUNT_TYPE.DEMO;
  //   // case login
  //   const isLogined =
  //     isTabDescription && accountContestRegistered === ESubAccountJoinedContest.NOT_JOIN && isContestTimeout;
  //   const checkTimeShowButton = subMenuContest != null && subMenuContest.startAt <= currentTime;

  //   return (isNonLogin || isLogined) && checkTimeShowButton;
  // }, [
  //   currentTime,
  //   tab,
  //   current_contest.position,
  //   accountContestRegistered,
  //   getVirtualCoreContestListed,
  //   selectedAccount.type,
  // ]);

  // const goToLeaderBoard = useCallback(() => {
  //   dispatch({ type: LEADER_BOARD_ACCOUNT_SELECTOR, payload: ACCOUNT_TYPE.VIRTUAL });
  //   props.navigation.navigate('LeaderBoard', {
  //     leaderBoardTab: true,
  //   });
  // }, []);

  useEffect(() => {
    if (!contestTab) return;
    setTab(contestTab);
  }, [contestTab]);

  // hide PAAVE-2000
  // useEffect(() => {
  //   if (selectedAccount.type !== ACCOUNT_TYPE.DEMO) {
  //     // call api get total user tab ranking
  //     if (accountContestRegistered === ESubAccountJoinedContest.NOT_JOIN) {
  //       dispatch(
  //         getLeaderBoardVirtualCoreContestListed({
  //           status: EStatusVirtualContestListed.IN_PROGRESS,
  //         })
  //       );
  //     } else {
  //       dispatch(getLeaderBoardVirtualCoreContest({}));
  //     }
  //   }
  // }, [contestTab]);

  return (
    <View style={globalStyles.container}>
      {contests != null && (
        <HeaderScreen
          leftButtonIcon={true}
          goBackAction={props.navigation.goBack}
          headerTitle={contests[contestOrder].name}
        />
      )}
      <ScrollView style={styles.container}>
        <TabSelector value={tab} setValue={setTab} listValue={TabNames} type="UNDERLINE" />
        {tab === 'Description' && contestDesc != null && (
          <View style={styles.contentContainer}>
            <Opening title={contestDesc.title} content={contestDesc.content} />
            {contestDesc.descriptionParts.map((section, index) => (
              <RenderContestSection key={index} {...section} />
            ))}
            <MoreInfo url={contestDesc.detailUrl} />
            {/* <TouchableOpacity style={styles.goLeaderBoardBtn} onPress={goToLeaderBoard}>
              <Text allowFontScaling={false} style={styles.goLeaderBoardBtnText}>
                {t('See_Virtual_Leaderboard')}
              </Text>
            </TouchableOpacity> */}
            <View style={styles.paddingBottom} />
          </View>
        )}
        {tab === 'Ranking' && (
          <RankingTab
            rankingData={current_contest.result}
            totalUser={current_contest.totalUser as number}
            position={current_contest.position}
          />
        )}
      </ScrollView>
      {/* {isShowJoinNowButton ? <BottomButton onPress={goJoinNow} text={'Join Now'} /> : null} */}
      <KycKisModalContent />
      <JoinNowModalContent />
    </View>
  );
};

export default memo(TermAndConditionVT);

type SectionProps = {
  title: string;
  content: ContestContent;
};

const Opening = memo(({ title, content }: SectionProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  return (
    <>
      <Text allowFontScaling={false} style={styles.header1}>
        {t('CONTEST')}
      </Text>
      <Text allowFontScaling={false} style={[styles.header2, styles.pt3]}>
        {title}
      </Text>
      <View style={[Array.isArray(content) && styles.shiftLeft16]}>
        <RenderSectionContent content={content} />
      </View>
    </>
  );
});

const RenderSectionContent = memo(({ content }: { content: ContestContent }) => {
  const { styles } = useStyles();
  if (typeof content === 'string') {
    const fontSize = `${scaleSize(14)}px`;
    const lineHeight = `${scaleSize(18)}px`;

    return (
      <>
        <View style={[styles.pt8]}>
          <RenderHTML
            source={{
              html: `<span style="font-size: ${fontSize}; line-height: ${lineHeight}; font-family: 'Roboto';color: black;">${content}</span>`,
            }}
            contentWidth={scaleSize(375)}
          />
        </View>
      </>
    );
  }
  return (
    <View style={[styles.pl16]}>
      {content.map((item, index) => (
        <RenderSectionContent content={item} key={index} />
      ))}
    </View>
  );
});

const RenderContestSection = memo(({ title, content }: SectionProps) => {
  const { styles } = useStyles();
  return (
    <>
      <Text allowFontScaling={false} style={[styles.header2, styles.pt8]}>
        {title}
      </Text>
      <View style={[Array.isArray(content) && styles.shiftLeft16]}>
        <RenderSectionContent content={content} />
      </View>
    </>
  );
});

const MoreInfo = memo(({ url }: { url: string | undefined }) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  if (url == null) return null;
  const openUrl = () => {
    // eslint-disable-next-line no-console
    Linking.openURL(url).catch(err => console.error('Open URL failed', err));
  };
  return (
    <Text allowFontScaling={false} style={[styles.listItem, styles.pt8]}>
      {t('Contest Detail')}{' '}
      <Text allowFontScaling={false} style={styles.linkText} onPress={openUrl}>
        {t('Here')}
      </Text>
    </Text>
  );
});
