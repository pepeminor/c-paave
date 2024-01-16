import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import { ICurrentInvestingInfoItem, ILeaderBoardInvestingResponse } from 'interfaces/leaderBoard';
import globalStyles, { Colors, scaleSize } from 'styles';
import { formatNumber, generateNameAbbreviations, getColor, navigate } from 'utils';
import UpThinArrow from 'assets/icon/UpThinArrow.svg';
import DownThinArrow from 'assets/icon/DownThinArrow.svg';
import InformationIcon from 'assets/icon/InformationIcon.svg';
import { IGetAccountInfo } from 'interfaces/user';
import { ILoadingReducer } from 'interfaces/reducer';
import UpArrow from 'assets/icon/UpArrow.svg';
import DownArrow from 'assets/icon/DownArrow.svg';
import useUserAvatarColor from 'hooks/useUserAvatarColor';
import { ILeaderBoardInvestingPeriod } from 'constants/enum';
import { useAppSelector } from 'hooks/useAppSelector';
import { getLeaderBoardCurrentInvestingInfo, setCurrentUserSubAccount } from 'reduxs/global-actions';
import { useDispatch } from 'react-redux';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import Tooltip from 'react-native-walkthrough-tooltip';
import withMemo from 'HOC/withMemo';
import { ACCOUNT_TYPE } from 'global';
import { Period } from 'screens/LeaderBoard/LeaderBoard.type';
import { useIsFocused } from '@react-navigation/native';

type CardCurrentInvestingProps = {
  accountInfo: ILoadingReducer<IGetAccountInfo | null>;
  selectTabLeaderBoard: boolean;
  periodFilter: Period;
};

const CardCurrentInvesting = ({ accountInfo, selectTabLeaderBoard, periodFilter }: CardCurrentInvestingProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { styles } = useStyles();

  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  // data current ranking tab Paave LeaderBoard
  const getCurrentInvestingInfo = useAppSelector(state => state.getCurrentInvestingInfo);
  const isKisSelected = useAppSelector(state => state.selectedAccount.type === ACCOUNT_TYPE.KIS);
  const isLeaderboardKis = useAppSelector(state => state.leaderboardAccountSelector === ACCOUNT_TYPE.KIS);

  // data current ranking tab Trading Contest
  const getVirtualCoreContestCurrentRanking = useAppSelector(state => state.getVirtualCoreContestCurrentRanking);

  const usersAvatarOfMe = useUserAvatarColor(accountInfo.data?.username);
  // 1890 - contest
  // compare period api and period filter
  const currentInvestingInfoPeriodData: ICurrentInvestingInfoItem | undefined =
    getCurrentInvestingInfo?.data?.currentInvestingInfo &&
    getCurrentInvestingInfo?.data?.currentInvestingInfo.find(ele => ele.period === periodFilter);

  const goToTermAndCondition = () => {
    setShowTooltip(false);
    navigate({
      key: 'TermAndConditionVT',
      params: { contestOrder: 0 },
    });
  };

  useEffect(() => {
    if (!isFocused) return;
    dispatch(
      getLeaderBoardCurrentInvestingInfo({
        period: periodFilter as ILeaderBoardInvestingPeriod,
        partnerId: 'kis',
      })
    );
  }, [isFocused]);

  // tooltip show when user not ranked yet
  const contentTooltip = (
    <View style={[globalStyles.container2, globalStyles.container]}>
      {selectTabLeaderBoard ? (
        isLeaderboardKis ? (
          <Text style={styles.tooltipContent}>{t('KIS_Leaderboard_Ranking_Note')}</Text>
        ) : (
          <Text style={styles.tooltipContent}>{t('LB_rank_condition')}</Text>
        )
      ) : (
        <Text style={styles.tooltipContent}>
          {t("Your account is not qualified yet to be ranked. Please check the contest's eligibility criteria")}{' '}
          <Text style={styles.textBold} onPress={goToTermAndCondition}>
            {t('here')}.
          </Text>
        </Text>
      )}
    </View>
  );

  const handleShowTooltip = () => {
    setShowTooltip(pre => !pre);
  };

  const goToUserWall = () => {
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

    const userDataTabPaaveLeaderBoard: ILeaderBoardInvestingResponse = {
      bio: accountInfo.data != null ? accountInfo.data.bio : '',
      fullname: accountInfo.data != null ? accountInfo.data.fullname : '',
      investmentReturn: currentInvestingInfoPeriodData != null ? currentInvestingInfoPeriodData.investmentReturn : 0,
      ranking: currentInvestingInfoPeriodData != null ? currentInvestingInfoPeriodData.ranking : 0,
      rankingChanged: currentInvestingInfoPeriodData != null ? currentInvestingInfoPeriodData.rankingChanged : 0,
      subAccount: '000',
      userId: accountInfo.data != null ? accountInfo.data.id : 0,
      userStatus: 'ACTIVE',
      username: accountInfo.data != null ? accountInfo.data.username : '',
    };

    const userDataTabTradingContest: ILeaderBoardInvestingResponse = {
      bio: accountInfo.data != null ? accountInfo.data.bio : '',
      fullname: accountInfo.data != null ? accountInfo.data.fullname : '',
      investmentReturn:
        getVirtualCoreContestCurrentRanking.data != null && getVirtualCoreContestCurrentRanking.data.length > 0
          ? getVirtualCoreContestCurrentRanking.data[0].navChangeRate
          : 0,
      ranking:
        getVirtualCoreContestCurrentRanking.data != null && getVirtualCoreContestCurrentRanking.data.length > 0
          ? getVirtualCoreContestCurrentRanking.data[0].rank
          : 0,
      rankingChanged:
        getVirtualCoreContestCurrentRanking.data != null && getVirtualCoreContestCurrentRanking.data.length > 0
          ? getVirtualCoreContestCurrentRanking.data[0].rankChange
          : 0,
      subAccount:
        getVirtualCoreContestCurrentRanking.data != null && getVirtualCoreContestCurrentRanking.data.length > 0
          ? getVirtualCoreContestCurrentRanking.data[0].subAccount
          : '',
      userId: accountInfo.data != null ? accountInfo.data.id : 0,
      userStatus: 'ACTIVE',
      username: accountInfo.data != null ? accountInfo.data.username : '',
    };

    navigate({
      key: ScreenNames.UserWall,
      params: {
        userData: isKisSelected || selectTabLeaderBoard ? userDataTabPaaveLeaderBoard : userDataTabTradingContest,
        selectTabLeaderBoard: selectTabLeaderBoard,
        defaultSample: geDefaultSample(),
        isFromSearch: false,
      },
    });

    dispatch(
      setCurrentUserSubAccount(
        selectTabLeaderBoard ? userDataTabPaaveLeaderBoard.subAccount : userDataTabTradingContest.subAccount
      )
    );
  };

  return (
    <TouchableOpacity
      style={styles.leaderBoardOfMeContainer}
      onPress={goToUserWall}
      disabled={
        !selectTabLeaderBoard
          ? getVirtualCoreContestCurrentRanking.data != null &&
            getVirtualCoreContestCurrentRanking.data.length > 0 &&
            getVirtualCoreContestCurrentRanking.data[0].subAccount !== ''
            ? false
            : true
          : currentInvestingInfoPeriodData != null
          ? false
          : true
      }
    >
      <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
        <View style={[globalStyles.alignCenter, styles.rankContainer2]}>
          <View style={[globalStyles.centered, styles.rankContainer]}>
            <Text allowFontScaling={false} style={[styles.rankNumberText]}>
              {!selectTabLeaderBoard
                ? getVirtualCoreContestCurrentRanking.data != null &&
                  getVirtualCoreContestCurrentRanking.data.length > 0 &&
                  getVirtualCoreContestCurrentRanking.data[0].rank != null
                  ? getVirtualCoreContestCurrentRanking.data[0].rank
                  : '-'
                : currentInvestingInfoPeriodData != null && currentInvestingInfoPeriodData.ranking != null
                ? currentInvestingInfoPeriodData.ranking
                : '-'}
            </Text>
          </View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.marginTop2]}>
            {!selectTabLeaderBoard ? (
              getVirtualCoreContestCurrentRanking.data != null &&
              getVirtualCoreContestCurrentRanking.data.length > 0 &&
              getVirtualCoreContestCurrentRanking.data[0].rankChange != null ? (
                getVirtualCoreContestCurrentRanking.data[0].rankChange > 0 ? (
                  <UpThinArrow width={scaleSize(7)} height={scaleSize(10)} />
                ) : getVirtualCoreContestCurrentRanking.data[0].rankChange === 0 ? null : (
                  <DownThinArrow width={scaleSize(7)} height={scaleSize(10)} />
                )
              ) : (
                <Text style={styles.marginTopRanking}>-</Text>
              )
            ) : currentInvestingInfoPeriodData != null && currentInvestingInfoPeriodData.rankingChanged != null ? (
              currentInvestingInfoPeriodData.rankingChanged > 0 ? (
                <UpThinArrow width={scaleSize(7)} height={scaleSize(10)} />
              ) : currentInvestingInfoPeriodData.rankingChanged === 0 ? null : (
                <DownThinArrow width={scaleSize(7)} height={scaleSize(10)} />
              )
            ) : (
              <Text style={styles.marginTopRanking}>-</Text>
            )}

            {!selectTabLeaderBoard ? (
              getVirtualCoreContestCurrentRanking.data != null &&
              getVirtualCoreContestCurrentRanking.data.length > 0 &&
              getVirtualCoreContestCurrentRanking.data[0].rankChange != null ? (
                <Text
                  style={[
                    getColor(getVirtualCoreContestCurrentRanking.data[0].rankChange, 0, undefined, undefined, true)
                      .textStyle,
                    styles.rankingStatusText,
                  ]}
                >
                  {getVirtualCoreContestCurrentRanking.data[0].rankChange === 0
                    ? '-'
                    : Math.abs(getVirtualCoreContestCurrentRanking.data[0].rankChange)}
                </Text>
              ) : null
            ) : selectTabLeaderBoard ? (
              currentInvestingInfoPeriodData != null && currentInvestingInfoPeriodData.rankingChanged != null ? (
                <Text
                  style={[
                    getColor(currentInvestingInfoPeriodData.rankingChanged, 0, undefined, undefined, true).textStyle,
                    styles.rankingStatusText,
                  ]}
                >
                  {currentInvestingInfoPeriodData.rankingChanged === 0
                    ? '-'
                    : Math.abs(currentInvestingInfoPeriodData.rankingChanged)}
                </Text>
              ) : null
            ) : null}
          </View>
        </View>
        <View style={{ ...styles.avatarImg, backgroundColor: usersAvatarOfMe }}>
          <Text allowFontScaling={false} style={styles.avatarImgText}>
            {generateNameAbbreviations(accountInfo.data?.fullname)}
          </Text>
        </View>
        <View
          style={[globalStyles.container, globalStyles.flexDirectionCol, globalStyles.centered, styles.nameContainer]}
        >
          <Text numberOfLines={1} allowFontScaling={false} style={[globalStyles.fillWidth, styles.nameText1]}>
            {accountInfo.data != null ? accountInfo.data.fullname : '-'}
          </Text>
          <Text numberOfLines={1} allowFontScaling={false} style={[globalStyles.fillWidth, styles.usernameText1]}>
            @{accountInfo.data != null ? accountInfo.data.username : '-'}
          </Text>
        </View>
        {/* tab leader board */}
        {selectTabLeaderBoard && currentInvestingInfoPeriodData == null ? (
          <View style={[globalStyles.flexDirectionRow, globalStyles.centered]}>
            <Text style={[styles.notRankedText, styles.widthNotRankedText]}>{t('Not ranked yet')}</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleShowTooltip}
              style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.spaceButton]}
            >
              <Tooltip
                isVisible={showTooltip}
                content={contentTooltip}
                placement="top"
                onClose={handleShowTooltip}
                backgroundColor={Colors.Transparent}
                contentStyle={styles.tooltip}
                tooltipStyle={styles.tooltipContainer}
                disableShadow={true}
              >
                <InformationIcon width={scaleSize(16)} height={scaleSize(16)} />
              </Tooltip>
            </TouchableOpacity>
          </View>
        ) : selectTabLeaderBoard ? (
          <View style={[styles.bottomInfoLeaderboard, globalStyles.centered]}>
            <Text allowFontScaling={false} style={styles.followerText1}>
              {t('LN')}
            </Text>
            <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
              {currentInvestingInfoPeriodData?.investmentReturn != null ? (
                currentInvestingInfoPeriodData.investmentReturn > 0 ? (
                  <UpArrow width={scaleSize(8)} height={scaleSize(7)} />
                ) : currentInvestingInfoPeriodData.investmentReturn === 0 ? null : (
                  <DownArrow width={scaleSize(8)} height={scaleSize(7)} />
                )
              ) : null}
              {currentInvestingInfoPeriodData?.investmentReturn != null ? (
                <Text
                  numberOfLines={1}
                  style={[
                    currentInvestingInfoPeriodData.investmentReturn > 0
                      ? globalStyles.colorUp
                      : currentInvestingInfoPeriodData.investmentReturn === 0
                      ? styles.textBlack
                      : globalStyles.colorDown,
                    styles.returnRateText,
                  ]}
                >
                  {`${formatNumber(currentInvestingInfoPeriodData.investmentReturn, 2, undefined, true)}%`}
                </Text>
              ) : (
                <Text style={[styles.returnRateText]}>-%</Text>
              )}
            </View>
          </View>
        ) : null}

        {/* tab trading contest */}
        {!selectTabLeaderBoard &&
        getVirtualCoreContestCurrentRanking.data != null &&
        getVirtualCoreContestCurrentRanking.data.length === 0 ? (
          <View style={[globalStyles.flexDirectionRow, globalStyles.centered, styles.mr10]}>
            <Text style={[styles.notRankedText, styles.widthNotRankedText]}>{t('Not ranked yet')}</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleShowTooltip}
              style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.spaceButton]}
            >
              <Tooltip
                isVisible={showTooltip}
                content={contentTooltip}
                placement="top"
                onClose={handleShowTooltip}
                backgroundColor={Colors.Transparent}
                contentStyle={styles.tooltip}
                tooltipStyle={styles.tooltipContainer}
                disableShadow={true}
              >
                <InformationIcon width={scaleSize(16)} height={scaleSize(16)} />
              </Tooltip>
            </TouchableOpacity>
          </View>
        ) : !selectTabLeaderBoard &&
          getVirtualCoreContestCurrentRanking.data != null &&
          getVirtualCoreContestCurrentRanking.data.length > 0 ? (
          <View style={[styles.bottomInfoLeaderboard, globalStyles.centered]}>
            <Text allowFontScaling={false} style={styles.followerText1}>
              {t('LN')}
            </Text>

            <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
              {getVirtualCoreContestCurrentRanking.data[0].navChangeRate != null ? (
                getVirtualCoreContestCurrentRanking.data[0].navChangeRate > 0 ? (
                  <UpArrow width={scaleSize(8)} height={scaleSize(7)} />
                ) : getVirtualCoreContestCurrentRanking.data[0].navChangeRate === 0 ? null : (
                  <DownArrow width={scaleSize(8)} height={scaleSize(7)} />
                )
              ) : null}
              {getVirtualCoreContestCurrentRanking.data[0].navChangeRate != null ? (
                <Text
                  numberOfLines={1}
                  style={[
                    getVirtualCoreContestCurrentRanking.data[0].navChangeRate > 0
                      ? globalStyles.colorUp
                      : getVirtualCoreContestCurrentRanking.data[0].navChangeRate === 0
                      ? styles.textBlack
                      : globalStyles.colorDown,
                    styles.returnRateText,
                  ]}
                >
                  {`${formatNumber(getVirtualCoreContestCurrentRanking.data[0].navChangeRate, 2, undefined, true)}%`}
                </Text>
              ) : (
                <Text style={[styles.returnRateText]}>-%</Text>
              )}
            </View>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default withMemo(CardCurrentInvesting);
