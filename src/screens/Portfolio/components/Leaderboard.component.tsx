import withMemo from 'HOC/withMemo';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IState } from 'reduxs/global-reducers';
import { useTranslation } from 'react-i18next';
import globalStyles, { lightColors, scaleSize } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import Trophy from 'assets/icon/Trophy.svg';
import { navigate } from 'utils/rootNavigation';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { useDispatch } from 'react-redux';
import { LEADER_BOARD_ACCOUNT_SELECTOR } from 'reduxs/actions';

const getSocialParams = () => {
  return new Object({
    socialTab: {
      tab: 'Leaderboard',
      time: new Date().getTime(), // to make useEffect run
    },
  });
};

const Leaderboard = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const selectedAccount = useAppSelector((state: IState) => state.selectedAccount);

  const goToLeaderBoard = useCallback(() => {
    dispatch({ type: LEADER_BOARD_ACCOUNT_SELECTOR, payload: selectedAccount.type });
    //navigate like behavior of bottomTab
    navigate({
      key: ScreenNames.HomeTab,
      params: {
        screen: 'Social',
        params: getSocialParams(),
      },
    });
  }, [selectedAccount.type]);

  return (
    <View style={styles.rankingContainer}>
      {/* <View style={globalStyles.container}>
        {selectedAccount.type === ACCOUNT_TYPE.DEMO ? (
          <Text allowFontScaling={false} style={styles.topInvestorText}>
            #1 {t('Top Paave Investor')}
          </Text>
        ) : null}

        {subAccountNumber !== ESubAccountJoinedContest.NOT_JOIN &&
        getPortfolioContestCurrentRanking != null &&
        getPortfolioContestCurrentRanking.length > 0 &&
        getPortfolioContestCurrentRanking[0].rank != null ? (
          <Text allowFontScaling={false} style={styles.topInvestorText}>
            #{getPortfolioContestCurrentRanking[0].rank} {t('Top Contest Investor')}
          </Text>
        ) : null}

        {subAccountNumber === ESubAccountJoinedContest.NOT_JOIN &&
        currentInvestingInfoPeriodData != null &&
        currentInvestingInfoPeriodData.ranking != null ? (
          <Text allowFontScaling={false} style={styles.topInvestorText}>
            #{currentInvestingInfoPeriodData.ranking}{' '}
            {t(selectedAccount.type === ACCOUNT_TYPE.VIRTUAL ? 'Paave_Top_Investor' : 'Kis_Top_Investor')}
          </Text>
        ) : null}
      </View> */}
      <TouchableOpacity style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]} onPress={goToLeaderBoard}>
        <Trophy width={scaleSize(24)} height={scaleSize(24)} />
        <Text allowFontScaling={false} style={[styles.topInvestorText, styles.topInvestorText2]}>
          {t('Leaderboard')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const useStyles = getStylesHook({
  topInvestorText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 15,
    color: lightColors.LIGHTYellow,
  },
  topInvestorText2: {
    marginLeft: 15,
  },
  rankingContainer: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    justifyContent: 'space-between',
  },
});

export default withMemo(Leaderboard);
