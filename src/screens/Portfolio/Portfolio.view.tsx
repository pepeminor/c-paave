import React, { useCallback } from 'react';
import { View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { usePortfolioLogic } from './Portfolio.logic';
import useStyles from './Portfolio.style';
import { IProps } from './Portfolio.type';
import withMemo from 'HOC/withMemo';
import HeaderScreen from 'components/HeaderScreen';
import globalStyles, { scaleSize } from 'styles';
import { HeaderRightIcons } from './components';
import LoginBanner from 'components/LoginBanner/LoginBanner';
import Investment from './components/Investment';
import { useFocusEffect } from '@react-navigation/native';
import { track, setUserId } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import { PortfolioOverview } from './components';
import UserIcon from 'assets/icon/UserIcon.svg';
// import ButtonContestComponent from './components/ButtonContest.component';

const HeaderButtonHitSlop = { top: 10, bottom: 10, left: 10, right: 10 };

const Portfolio = (props: IProps) => {
  const { handlers, refs, state } = usePortfolioLogic(props);
  const { scrollRef } = refs;
  const { refreshing } = state;
  const { styles, dynamicColors } = useStyles();

  useFocusEffect(
    useCallback(() => {
      setUserId(props.selectedAccount.username);
      track(AMPLITUDE_EVENT.HomeTab, {
        selectedAccount: props.selectedAccount?.selectedSubAccount?.accountName ?? 'NON_LOGIN',
        lang: props.lang,
      });
    }, [])
  );

  return (
    <View style={globalStyles.container}>
      <HeaderScreen
        leftButtonIcon={
          <TouchableOpacity onPress={handlers.goToUserInfo} style={styles.headerIconLeft} hitSlop={HeaderButtonHitSlop}>
            <UserIcon height={scaleSize(24)} width={scaleSize(24)} color={dynamicColors.WHITE} />
          </TouchableOpacity>
        }
        headerTitle={'Portfolio'}
        subAccountVisible={true}
        rightButtonListIcon={[<HeaderRightIcons />]}
      />
      {/* iss 2447 [Trading Contest] Remove Trading contest module */}
      {/* <ButtonContestComponent />   */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handlers.onRefresh} />}
        scrollEventThrottle={100}
        scrollEnabled={state.enableScroll}
      >
        <PortfolioOverview scrollRef={scrollRef} onChangeEnableScroll={handlers.onChangeEnableScroll} />

        <Investment />
        <LoginBanner containerStyle={styles.bannerContainer} showTitle={true} />
      </ScrollView>
    </View>
  );
};

export default withMemo(Portfolio);
