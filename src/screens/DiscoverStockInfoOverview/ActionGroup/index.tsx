import { SELL_BUY_TYPE } from 'global';
import { useAppSelector } from 'hooks/useAppSelector';
import useIsProhibitedStock from 'hooks/useIsProhibitedStock';
import React, { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { navigate, formatNumber, isVirtualAccount } from 'utils';
import useStyles from './styles';
import { setSellBuyType } from '../../../reduxs/global-actions/Market';
import { SymbolDataSelector, SymbolTypeChecker } from 'reduxs/SymbolData';
import { calTotalVolume } from './helper';
import withMemo from 'HOC/withMemo';
import { SymbolType } from 'constants/enum';

const ActionGroup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const currentSymbol = useAppSelector(SymbolDataSelector.selectCurrentSymbol, {
    symbolCode: true,
    bestOffer: true,
    bestBid: true,
  });

  const selectedAccount = useAppSelector(state => state.selectedAccount);

  const { isProhibited, showProhibitedAlert } = useIsProhibitedStock(currentSymbol?.symbolCode);
  const totalBuy = useMemo(() => {
    return calTotalVolume(currentSymbol?.bestBid);
  }, [currentSymbol?.bestBid]);

  const totalSell = useMemo(() => {
    return calTotalVolume(currentSymbol?.bestOffer);
  }, [currentSymbol?.bestOffer]);

  const percent = useMemo(() => {
    return {
      percentBuy: formatNumber((totalBuy / (totalBuy + totalSell)) * 100),
      percentSell: formatNumber((totalSell / (totalBuy + totalSell)) * 100),
    };
  }, [totalBuy, totalSell]);

  const goToScreen = useCallback(() => {
    navigate({ key: 'Trade1' });
  }, []);

  const SellOrder = useCallback(() => {
    dispatch(setSellBuyType(SELL_BUY_TYPE.SELL));
    goToScreen();
  }, []);

  const BuyOrder = useCallback(() => {
    dispatch(setSellBuyType(SELL_BUY_TYPE.BUY));
    goToScreen();
  }, []);

  if (currentSymbol == null || currentSymbol.symbolType === SymbolType.INDEX) return null;

  const isDisabled =
    isVirtualAccount(selectedAccount) && SymbolTypeChecker.isIncludeSymbol(currentSymbol, ['ETF', 'CW', 'FUTURES']);

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={isProhibited ? showProhibitedAlert : SellOrder}
        style={[styles.button, styles.buttonSell, (isProhibited || isDisabled) && styles.btnDisable]}
        disabled={isDisabled}
      >
        <Text style={styles.buttonText}>{t('Sell')}</Text>
        <Text style={styles.buttonTextChoose}>{`${percent.percentSell}% ${t('choose')}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={isProhibited ? showProhibitedAlert : BuyOrder}
        style={[styles.button, styles.buttonBuy, (isProhibited || isDisabled) && styles.btnDisable]}
        disabled={isDisabled}
      >
        <Text style={styles.buttonText}>{t('Buy')}</Text>
        <Text style={styles.buttonTextChoose}>{`${percent.percentBuy}% ${t('choose')}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default withMemo(ActionGroup);
