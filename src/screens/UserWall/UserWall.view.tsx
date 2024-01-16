import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Platform, RefreshControl } from 'react-native';
import { useUserWallLogic } from './UserWall.logic';
import ExtendIcon from 'assets/icon/ExtendIcon.svg';
import useStyles from './UserWall.style';
import { IProps, UserWallInfoTabs, UserWallInfoTabsKis } from './UserWall.type';
import withMemo from 'HOC/withMemo';
import {
  Avatar,
  Introduction,
  StockCodeList,
  AccProfitComponent,
  FollowingDailyProfitLossComponent,
} from './components';
import useUserAvatarColor from 'hooks/useUserAvatarColor';
import { useTranslation } from 'react-i18next';
import LockGold from 'assets/icon/Lock-Gold.svg';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import globalStyles, { scaleSize } from 'styles';
import { ACCOUNT_TYPE, ESubAccountJoinedContest } from 'global';
import ChartFilterGroup from 'components/ChartFilterGroup';
import StockListLeaderActivity from 'components/StockListLeaderActivity';
import HeaderScreen from 'components/HeaderScreen';
import LoginRequired from 'components/LoginRequired';
import DatePicker from 'components/DatePicker';
import SearchInput from 'components/SearchInput';
import CopyTradeBtn from 'components/CopyTradeBtn';
import TabSelector from 'components/TabSelector';
import { chartFilterData } from 'constants/profitloss';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isNilOrEmpty } from 'ramda-adjunct';
import Modal from 'components/Modal';
import { ERROR } from 'constants/error';
import { insertObjectIf } from 'utils';
import BarChartForLeaderBoard from './components/BarChartForLeaderBoard';

const UserWall = (props: IProps) => {
  const { state, handlers } = useUserWallLogic(props);
  const { styles } = useStyles();
  const { t } = useTranslation();
  const { userData, selectTabLeaderBoard, isFromSearch, headerTitle } = props.route.params;
  const {
    selectedAccountLeaderBoard,
    followingDailyProfitLossData,
    advisorData,
    currentSubContestUser,
    dataProfitLoss,
    vnindexReturn,
    isDemoAccount,
    isKis,
    dataByDate,
  } = props;

  const userAvatar = useUserAvatarColor(userData.username);

  const userFullName = advisorData?.fullname ?? userData.fullname;
  const userBio = advisorData?.bio ?? userData.bio;

  const {
    followingDailyProfitLoss,
    VNIndexReturnData,
    NetAssetValue,
    NavProfit,
    accumulatedProfit,
    accumulatedProfitRatio,
    accNAVProfitValue,
    accNAVProfitRatio,
    stockAllocation,
    cashAllocation,
  } = useMemo(() => {
    if (isNilOrEmpty(dataProfitLoss?.[state.sample])) {
      return {
        followingDailyProfitLoss: [],
        VNIndexReturnData: [],
        NetAssetValue: [],
        NavProfit: [],
        accumulatedProfit: [],
        accumulatedProfitRatio: [],
      };
    }

    const data = dataProfitLoss?.[state.sample] || undefined;
    const { accNAVProfitValue, accNAVProfitRatio, stockAllocation, cashAllocation } = data;
    return {
      followingDailyProfitLoss: data?.data || [],
      VNIndexReturnData: data?.VNIndexDataPercent || [],
      NetAssetValue: data?.NetAssetValue || [],
      NavProfit: data?.NavProfit || [],
      accumulatedProfit: data?.accumulatedProfit || [],
      accumulatedProfitRatio: data?.accumulatedProfitRatio || [],
      accNAVProfitValue,
      accNAVProfitRatio,
      stockAllocation,
      cashAllocation,
    };
  }, [dataProfitLoss, state.sample]);

  const historyData = useMemo(() => {
    return state.searchText
      ? state.listTradingHistory.filter(it => it.stockCode.toLowerCase().includes(state.searchText.toLowerCase()))
      : state.listTradingHistory;
  }, [state.listTradingHistory, state.searchText]);

  if (isDemoAccount) {
    return (
      <View style={styles.container}>
        <HeaderScreen
          leftButtonIcon={true}
          goBackAction={props.navigation.goBack}
          headerTitle={headerTitle ?? (selectTabLeaderBoard ? 'Paave Leaderboard' : 'Contest Leaderboard')}
          eachIconGap={10}
        />
        <Avatar userId={userData.userId} fullName={userFullName} username={userData.username} userAvatar={userAvatar} />
        <Introduction extended={state.extended} bio={userBio} setExtendedVisible={handlers.onExtendedVisible} />
        {state.extendedVisible ? (
          <TouchableOpacity style={styles.extendButtonArea} onPress={handlers.toggleExtend}>
            <Text allowFontScaling={false} style={styles.extendText}>{`${
              state.extended ? t('Hide') : t('Extend')
            }`}</Text>
            <ExtendIcon style={state.extended ? styles.collapseIcon : {}} />
          </TouchableOpacity>
        ) : (
          <View style={styles.extendArea} />
        )}
        <View style={styles.titleContainer}>
          <Text allowFontScaling={false} style={styles.titleText}>
            {t('Investment')}
          </Text>
        </View>
        <View style={globalStyles.container}>
          <LoginRequired bottom={100} />
        </View>
      </View>
    );
  }

  return isKis && followingDailyProfitLossData.data?.errorMessage === ERROR.USER_OPT_OUT ? (
    <View>
      <Modal visible={true}>
        <View style={styles.modalUserOptOut}>
          <View style={styles.modalContentContainer}>
            <View style={styles.contentModal}>
              <Text>{t('userwall.modal.error')}</Text>
            </View>
            <TouchableOpacity onPress={props.navigation.goBack} style={styles.modalBackButton}>
              <Text allowFontScaling={false} style={styles.modalOKButtonText}>
                {t('userwall.modal.back')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  ) : (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={props.navigation.goBack}
        headerTitle={
          headerTitle ??
          (isFromSearch ? (
            currentSubContestUser != null && currentSubContestUser !== ESubAccountJoinedContest.NOT_JOIN ? (
              <View style={styles.containerHeaderTitle}>
                <Text allowFontScaling={false} style={globalStyles.headerTitleText}>
                  {t('Investor Profile')}
                </Text>
                <Text allowFontScaling={false} style={styles.headerTitleText}>
                  {t('Joining Contest')}
                </Text>
              </View>
            ) : (
              'Investor Profile'
            )
          ) : advisorData ? (
            'Robo Advisors'
          ) : selectTabLeaderBoard ? (
            selectedAccountLeaderBoard === ACCOUNT_TYPE.KIS ? (
              'Kis Leaderboard'
            ) : (
              'Paave Leaderboard'
            )
          ) : (
            'Contest Leaderboard'
          ))
        }
        rightButtonListIcon={
          [
            // // Ẩn các phần chưa launch PAAVE-527
            // <TouchableOpacity onPress={goToNotification}>
            //   <BellIcon height={scaleSize(24)} width={scaleSize(24)}></BellIcon>
            // </TouchableOpacity>,
            // Ẩn share icon PAAVE-1476
            // <TouchableOpacity onPress={ShareData}>
            //   <ShareIcon height={scaleSize(24)} width={scaleSize(24)} />
            // </TouchableOpacity>,
          ]
        }
        eachIconGap={10}
      />
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        onScroll={handlers.onScroll}
        scrollEventThrottle={16}
        scrollEnabled={state.enableScroll}
        extraHeight={scaleSize(-1)}
        extraScrollHeight={Platform.OS === 'android' && advisorData != null ? scaleSize(100) : undefined}
        enableOnAndroid
        refreshControl={<RefreshControl refreshing={state.refreshing} onRefresh={handlers.onRefresh} />}
      >
        <Avatar
          userId={userData.userId}
          fullName={userFullName}
          username={userData.username}
          userAvatar={userAvatar}
          showFollowButton
        />
        <Introduction extended={state.extended} bio={userBio} setExtendedVisible={handlers.onExtendedVisible} />

        {state.extendedVisible ? (
          <TouchableOpacity style={styles.extendButtonArea} onPress={handlers.toggleExtend}>
            <Text allowFontScaling={false} style={styles.extendText}>{`${
              state.extended ? t('Hide') : t('Extend')
            }`}</Text>
            <ExtendIcon style={state.extended ? styles.collapseIcon : {}} />
          </TouchableOpacity>
        ) : (
          <View style={styles.extendArea} />
        )}

        <View style={styles.border} />

        {state.followed === true ? (
          <View style={styles.investmentArea}>
            <LockGold height={scaleSize(64)} width={scaleSize(64)} style={styles.lockGold} />
            <Text allowFontScaling={false} style={styles.text1}>
              {t('This account is private')}
            </Text>
            <Text allowFontScaling={false} style={styles.text2}>
              {t('Follow this account to view their portfolio and activities')}
            </Text>
          </View>
        ) : (
          <View style={styles.paddingSpace}>
            <View style={[styles.titleContainer, !isKis && styles.borderBottomInvestment]}>
              <Text allowFontScaling={false} style={styles.titleText}>
                {t('Investment')}
              </Text>
            </View>
            <TabSelector
              value={state.selectingPortfolio}
              setValue={handlers.onChangeTabs}
              listValue={(isKis ? UserWallInfoTabsKis : UserWallInfoTabs) as typeof UserWallInfoTabs}
            />
            <View
              style={[
                globalStyles.container,
                {
                  display: state.selectingPortfolio === 'PORTFOLIO' ? 'flex' : 'none',
                },
                insertObjectIf(state.selectingPortfolio !== 'PORTFOLIO', { zIndex: -1 }),
              ]}
            >
              <Text style={styles.titleStyle}>{t('Portfolio Detail')}</Text>
              <StockCodeList />
            </View>

            {state.selectingPortfolio === 'ACCOUNT_PROFIT' ? ( /////////////////////////// ACCOUNT_PROFIT
              <View style={globalStyles.container}>
                <AccProfitComponent
                  onChangeEnableScrollView={handlers.onChangeEnableScroll}
                  VNIndexReturnData={VNIndexReturnData}
                  vnindexReturn={vnindexReturn?.[state.sample]?.normalizedRate || []}
                  NetAssetValue={NetAssetValue}
                  accumulatedProfit={accumulatedProfit}
                  accumulatedProfitRatio={accumulatedProfitRatio}
                  sample={state.sample}
                  onSetSample={handlers.setSampleAndClearData}
                  followingDailyProfitLoss={followingDailyProfitLoss}
                  isFromSearch={isFromSearch}
                  isFromKis={isKis}
                  userId={userData.userId}
                  accNAVProfitValue={accNAVProfitValue}
                  accNAVProfitRatio={accNAVProfitRatio}
                  stockAllocation={stockAllocation}
                  cashAllocation={cashAllocation}
                />
              </View>
            ) : state.selectingPortfolio === 'DAILY_PL' ? ( /////////////////////////// DAILY_PL
              <>
                <BarChartForLeaderBoard data={NavProfit} onChangeEnableScroll={handlers.onChangeEnableScroll} />
                <View style={styles.chartContainer}>
                  <ChartFilterGroup
                    data={chartFilterData}
                    sample={state.sample}
                    onSetSample={handlers.setSampleAndClearData}
                  />
                </View>
                <View style={styles.grayLine} />
                <FollowingDailyProfitLossComponent
                  onChangeFromDate={handlers.onChangeFromDate}
                  onChangeToDate={handlers.onChangeToDate}
                  followingDailyProfitLoss={followingDailyProfitLoss}
                  statusFollowingDailyProfitLossDate={followingDailyProfitLossData.status}
                  followingDailyProfitLossByDate={state.listDailyProfitLossByDate}
                  accNAVProfitValue={dataByDate?.accNAVProfitValue}
                  accNAVProfitRatio={dataByDate?.accNAVProfitRatio}
                  fromDate={state.fromDate}
                  toDate={state.toDate}
                />
              </>
            ) : (
              state.selectingPortfolio === 'HISTORY' && ( /////////////////////////// HISTORY
                <View style={globalStyles.container}>
                  <View style={styles.filterContainer}>
                    <DatePicker
                      stylesContainer={styles.fromDateContainer}
                      label={t('From date')}
                      onChange={handlers.onChangeFromDateTradingHistory}
                      value={state.fromDateTradingHistory}
                      maxDate={new Date()}
                    />
                    <DatePicker
                      stylesContainer={styles.toDateContainer}
                      label={t('To date')}
                      onChange={handlers.onChangeToDateTradingHistory}
                      value={state.toDateTradingHistory}
                      maxDate={new Date()}
                    />
                  </View>
                  <SearchInput
                    containerStyle={styles.searchInput}
                    onChangeText={handlers.onTextSearchChange}
                    hideClearIcon={state.searchText.length === 0}
                    onClear={handlers.onClearTextSearch}
                    value={state.searchText}
                  />
                  <StockListLeaderActivity
                    listTradingHistory={historyData}
                    isTradingHistory={true}
                    isLoadingHistory={state.isLoadingTradingHistory}
                  />

                  {historyData.length ? null : (
                    <View style={styles.noDataCon}>
                      <EmptySymbol />
                      <Text style={styles.noDataText}>{t('There is no data')}</Text>
                    </View>
                  )}
                </View>
              )
            )}
          </View>
        )}
      </KeyboardAwareScrollView>
      {advisorData == null ? null : (
        <CopyTradeBtn
          followingType={'Advisor'}
          followingUsername={userData.username}
          followingFullName={userFullName}
        />
      )}
    </View>
  );
};

export default withMemo(UserWall);
