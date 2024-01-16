import React, { RefObject, useMemo } from 'react';
import { View, Text, ScrollView, Platform, ActivityIndicator, Image } from 'react-native';
import { InvestmentSelectors } from 'reduxs';
import { useTranslation } from 'react-i18next';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { isNotNil } from 'ramda-adjunct';

import { useAppSelector, useTypedSelector } from 'hooks/useAppSelector';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
import { getStylesHook } from 'hooks/useStyles';
import withMemo from 'HOC/withMemo';
import { formatNumber, getSymbolFactor } from 'utils/common';
import ChartWrapper from './ChartWrapper';
import VNIndexDataComponent from './VNIndexData.component';
import LeaderboardRankingComponent from './LeaderboardRanking.component';
import { ReducerStatus } from 'interfaces/reducer';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import NavProfitLossComponent from './NavProfitLoss.component';
import globalStyles, { lightColors } from 'styles';

interface IProps {
  scrollRef: RefObject<ScrollView>;
  onChangeEnableScroll: (enable: boolean) => void;
}

const PortfolioOverView = (props: IProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation();

  const derivativeCashBalance = useAppSelector(state => state.kisDerAssetInformationData);
  const derivativePortfolio = useAppSelector(state => state.derivativePortfolio.data);
  const symbolMap = useTypedSelector(state => state.SymbolData.marketData.symbolMap);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const cashAndStockBalance = useAppSelector(state => state.cashAndStockBalance);
  const profitLossResponse = useAppSelector(InvestmentSelectors.selectedProfitLoss(false));

  const isAccountKis = selectedAccount.type === ACCOUNT_TYPE.KIS;
  const isSubD =
    isAccountKis &&
    selectedAccount.selectedSubAccount != null &&
    selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES;
  const isSubXorM =
    isAccountKis &&
    selectedAccount.selectedSubAccount != null &&
    selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY;

  useSubscribeSymbol([isSubD ? 'VN30' : undefined], ['QUOTE', 'BID_OFFER']);

  const cashBalance = () => {
    if (isSubD)
      return formatNumber(
        Math.min(
          derivativeCashBalance?.data?.cashInformation.exchange.EE || 0,
          derivativeCashBalance?.data?.cashInformation.internal.EE || 0
        ),
        2
      );
    if (isSubXorM) return formatNumber(cashAndStockBalance?.data?.accountSummary.cashBalance, 2);
    return formatNumber(profitLossResponse?.data?.cashBalance, 2);
  };

  const stockBalance = useMemo(() => {
    if (isSubD) {
      const result = derivativePortfolio?.openPositionList.reduce((prev, curr) => {
        let calculate = 0;
        const currSymbol = symbolMap[curr.seriesID];
        if (!currSymbol) return (prev += 0);

        const factor = getSymbolFactor(currSymbol.symbolType);
        const quantity = Math.max(curr.long, curr.short);
        const price = curr.averageAsk;

        calculate = price * quantity * factor;
        return (prev += calculate || 0);
      }, 0);

      return formatNumber(result, 2);
    }
    if (isSubXorM) return formatNumber(cashAndStockBalance?.data?.accountSummary.totalStockMarketValue, 2);
    return formatNumber(profitLossResponse?.data?.stockBalance, 2);
  }, [
    isSubD,
    isSubXorM,
    cashAndStockBalance?.data?.accountSummary.totalStockMarketValue,
    profitLossResponse?.data?.stockBalance,
    derivativePortfolio,
  ]);

  const isRender = () => {
    if (isSubXorM) return isNotNil(cashAndStockBalance.data) && isNotNil(profitLossResponse.data);
    if (isSubD) return isNotNil(derivativeCashBalance.data);
    return isNotNil(profitLossResponse.data);
  };

  if (isRender()) {
    return (
      <Animated.View entering={FadeInRight.duration(400)} exiting={FadeOutLeft.duration(400)}>
        <View style={styles.headerContainer}>
          <View>
            <VNIndexDataComponent />
            <NavProfitLossComponent />
          </View>
          <LeaderboardRankingComponent />
        </View>

        <ChartWrapper onChangeEnableScroll={props.onChangeEnableScroll} />

        <View style={styles.followArea}>
          <View style={styles.followingLeft}>
            <Text allowFontScaling={false} style={styles.followingText}>
              {t('Cash Balance')}
            </Text>
            <Text allowFontScaling={false} style={styles.followingNumberText}>
              {cashBalance()}
            </Text>
          </View>
          <View style={styles.followingRight}>
            <Text allowFontScaling={false} style={styles.followingText}>
              {t(!isSubD ? 'Stock Balance' : 'Open Position Value')}
            </Text>
            <Text allowFontScaling={false} style={styles.followingNumberText}>
              {stockBalance}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={styles.containerEmpty} entering={FadeInRight.duration(400)}>
      <View style={styles.headerContainer}>
        <View>
          <VNIndexDataComponent />
          <NavProfitLossComponent />
        </View>
        <LeaderboardRankingComponent />
      </View>
      <View style={styles.containerLoading}>
        {profitLossResponse.status === ReducerStatus.FAILED || cashAndStockBalance.status === ReducerStatus.FAILED ? (
          <Image source={require('assets/img/404.png')} style={styles.imageContainer} />
        ) : (
          <ActivityIndicator size="large" color={lightColors.LIGHTGRAY} />
        )}
      </View>
    </Animated.View>
  );
};

const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  containerEmpty: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
    height: 450,
  },
  containerLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
  },
  skeletonRankingStyle: {
    width: 112,
    height: 22,
    borderRadius: 10,
  },
  navReturnValueText: {
    marginLeft: 8,
    marginRight: 2,
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
  },
  tooltipContent: {
    color: lightColors.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 16,
  },
  tooltipContainer: {
    marginTop: 6,
  },
  tooltip: {
    backgroundColor: lightColors.BlueNewColor,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 13,
  },
  navProfitLossContainer: {
    paddingRight: 26,
  },
  plValueText: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
  },
  space24: {
    width: 24,
    height: 24,
  },
  greenArea: {
    height: 30,
    width: 83,
    borderRadius: 8,
  },
  backgroundColorLightDisable: {
    backgroundColor: lightColors.LIGHTIconDisable,
  },
  netAssetReturn: {
    ...globalStyles.container,
    ...globalStyles.alignEnd,
    paddingRight: 8,
  },
  navRateText: {
    color: lightColors.WHITE,
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  chartContainer: {
    height: 331,
  },
  headerContainer: {
    backgroundColor: lightColors.WHITE,
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  followArea: {
    ...globalStyles.flexDirectionRow,
    marginTop: 16,
    height: 53,
    backgroundColor: lightColors.LIGHTTitleTable,
  },
  followingLeft: {
    ...globalStyles.centered,
    ...globalStyles.container,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
    borderTopColor: lightColors.BORDER,
    borderTopWidth: 1,
    borderRightColor: lightColors.BORDER,
    borderRightWidth: 1,
  },
  followingRight: {
    ...globalStyles.centered,
    ...globalStyles.container,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
    borderTopColor: lightColors.BORDER,
    borderTopWidth: 1,
  },
  followingText: {
    color: lightColors.LIGHTTextTitle,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  followingNumberText: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    color: lightColors.LIGHTTextContent,
  },
});

export default withMemo(PortfolioOverView);
