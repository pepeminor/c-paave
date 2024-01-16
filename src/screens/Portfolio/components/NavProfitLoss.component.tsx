import React, { memo, useCallback, useState } from 'react';
import { TouchableOpacity, View, Text, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import Tooltip from 'react-native-walkthrough-tooltip';

import { formatNumber, getColor } from 'utils/common';
import { ReducerStatus } from 'interfaces/reducer';
import { DailyProfitLossSelectors, InvestmentSelectors } from 'reduxs';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import { scaleSize, lightColors } from 'styles';
import { useAppSelector } from 'hooks/useAppSelector';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
import { getStylesHook } from 'hooks/useStyles';
import BigIncrease from 'assets/icon/BigIncrease.svg';
import Info from 'assets/icon/Info.svg';
import BigDecrease from 'assets/icon/IconDecrease.svg';

const NavProfitLoss = () => {
  const { styles } = useStyles();

  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const cashAndStockBalance = useAppSelector(state => state.cashAndStockBalance);
  const profitLossResponse = useAppSelector(InvestmentSelectors.selectedProfitLoss(false));
  const dataProfitLoss = useAppSelector(
    DailyProfitLossSelectors.selectDailyProfitLossDer(selectedAccount?.selectedSubAccount?.accountNumber!)
  );

  const [showTooltip, setShowTooltip] = useState(false);

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

  const netAsset = () => {
    if (isSubD) {
      const length = dataProfitLoss.length;
      const netAsset = dataProfitLoss?.[length - 1]?.netAssetValue || 0;
      return formatNumber(netAsset, 2);
    }
    if (isSubXorM) {
      return formatNumber(cashAndStockBalance?.data?.accountSummary.totalAsset, 2);
    }
    return formatNumber(profitLossResponse?.data?.netAsset, 2);
  };

  const navProfitLoss = (): [string, number] => {
    let stringVal = '';
    let numberVal = 0;

    if (isSubD) {
      const length = dataProfitLoss.length;
      // dataProfitLoss?.[length - 1].
      const navProfit = dataProfitLoss?.[length - 1]?.navProfit || 0;
      stringVal = formatNumber(navProfit, 2);
      numberVal = navProfit ?? 0;
      return [stringVal, numberVal];
    }
    if (profitLossResponse.status === ReducerStatus.SUCCESS) {
      stringVal = formatNumber(profitLossResponse?.data?.navProfitLoss, 2);
      numberVal = profitLossResponse?.data?.navProfitLoss ?? 0;
      return [stringVal, numberVal];
    }
    return [stringVal, numberVal];
  };

  const [strNavProfitLoss, numbNavProfitLoss] = navProfitLoss();

  const netAssetReturn = (): [string] => {
    let stringVal = '';

    if (isSubD) {
      const length = dataProfitLoss.length;
      const navProfitRatio = dataProfitLoss?.[length - 1]?.navProfitRatio || 0;
      stringVal = formatNumber(navProfitRatio, 2);
      return [stringVal];
    }
    if (profitLossResponse.status === ReducerStatus.SUCCESS) {
      stringVal = formatNumber(profitLossResponse?.data?.netAssetReturn, 2, undefined, isAccountKis ? false : true);
      return [stringVal];
    }
    return [stringVal];
  };

  const [strNetAssetReturn] = netAssetReturn();

  const handleTooltip = useCallback(() => {
    setShowTooltip(pre => !pre);
  }, []);

  return (
    <View>
      <View style={styles.netAssetContainer}>
        <Text
          allowFontScaling={false}
          style={[styles.navReturnValueText, getColor(numbNavProfitLoss, 0, undefined, undefined, true).textStyle]}
        >
          {netAsset()}
        </Text>

        <TouchableOpacity onPress={handleTooltip}>
          <Tooltip
            isVisible={showTooltip}
            content={<ContentTooltip />}
            placement="bottom"
            onClose={handleTooltip}
            backgroundColor={lightColors.Transparent}
            contentStyle={styles.tooltip}
            tooltipStyle={styles.tooltipContainer}
            disableShadow={true}
          >
            <Info width={scaleSize(24)} height={scaleSize(24)} />
          </Tooltip>
        </TouchableOpacity>
      </View>
      <View style={styles.navProfitLossContainer}>
        {numbNavProfitLoss > 0 && <BigIncrease width={scaleSize(24)} height={scaleSize(24)} />}
        {numbNavProfitLoss < 0 && <BigDecrease width={scaleSize(24)} height={scaleSize(24)} />}
        <Text
          allowFontScaling={false}
          style={[styles.plValueText, getColor(numbNavProfitLoss, 0, undefined, undefined, true).textStyle]}
        >
          {strNavProfitLoss}
        </Text>
        <Text
          allowFontScaling={false}
          style={[styles.plValueText, getColor(numbNavProfitLoss, 0, undefined, undefined, true).textStyle]}
        >
          {' '}
          ({strNetAssetReturn}%)
        </Text>
      </View>
    </View>
  );
};

const ContentTooltip = memo(() => {
  const { styles } = useStyles();
  const { t } = useTranslation();

  return (
    <Text style={styles.tooltipContent}>
      {t('NAV')} = {t('Cash Balance')} + {t('Stock Balance')} + {t('Awaiting Cash')}
    </Text>
  );
});

const useStyles = getStylesHook({
  tooltipContent: {
    color: lightColors.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 16,
  },

  plValueText: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
  },
  space24: {
    width: 24,
    height: 24,
  },
  navProfitLossContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
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

  navReturnValueText: {
    marginLeft: 8,
    marginRight: 2,
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
  },

  netAssetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default memo(NavProfitLoss);
