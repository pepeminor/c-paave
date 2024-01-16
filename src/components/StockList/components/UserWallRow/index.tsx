import ImagesLogo from 'components/ImagesLogo';
import { RowComponentProps } from 'components/SheetData3';
import { useAppSelector } from 'hooks/useAppSelector';
import { IFollowingProfitLossItemResponse } from 'interfaces/equity';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { lightColors, scaleSize, scaleSizeHeight } from 'styles';
import { formatNumber, getColor, navigateToSymbolInfoOverview } from 'utils';
import useStyles from './styles';
import { MergeMarketSymbol, SymbolDataSelector } from 'reduxs/SymbolData';
import { InvestmentSelectors, WatchListActions } from 'reduxs';
import { useDispatch } from 'react-redux';
import { ACCOUNT_TYPE } from 'global';
import { putIncreaseSearch, putIncreaseSearchForKis } from 'reduxs/global-actions';
import { isSymbolExist } from 'utils/market';
import Tooltip from 'react-native-walkthrough-tooltip';
import { useTranslation } from 'react-i18next';
import InfoIcon from 'assets/icon/Info.svg';
import { isNilOrEmpty } from 'ramda-adjunct';

export function getProfitLossData(
  data: IFollowingProfitLossItemResponse,
  stockData?: MergeMarketSymbol,
  isKis?: boolean
) {
  const newCurrentPrice = stockData?.expectedPrice || stockData?.currentPrice || data?.currentPrice || 0;

  const { buyingPrice = 0, currentPrice = 0, profitLoss = 0 } = data;
  const deltaPrice = currentPrice - buyingPrice;
  const avgQuantity = deltaPrice === 0 ? 0 : profitLoss / deltaPrice;
  const buyingValue = buyingPrice * avgQuantity;
  const currentValue = newCurrentPrice * avgQuantity;

  data.currentPrice = newCurrentPrice;
  data.profitLoss = currentValue - buyingValue;
  if (!isKis) {
    data.profitLossRate = buyingValue === 0 ? 0 : (currentValue / buyingValue - 1) * 100;
  }
  return data;
}

const StockRow = memo(({ data: stockCode }: RowComponentProps<string>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const [showTooltip, setShowTooltip] = useState(false);
  const stockData = useAppSelector(SymbolDataSelector.selectSymbol(stockCode), {
    currentPrice: true,
    expectedPrice: true,
    referencePrice: true,
    ceilingPrice: true,
    floorPrice: true,
  });
  const profitLossItem = useAppSelector(InvestmentSelectors.selectedProfitLossItem(stockCode, true))!;
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);
  const selectedAccouuntLeaderBoard = useAppSelector(state => state.leaderboardAccountSelector);
  const isKis = selectedAccouuntLeaderBoard === ACCOUNT_TYPE.KIS;

  const { stockWeight, holdingDays, currentPrice, buyingPrice, profitLossRate, profitLoss } = useMemo(
    () => getProfitLossData(profitLossItem, stockData, isKis),
    [profitLossItem?.currentPrice, stockData?.currentPrice, stockData?.expectedPrice]
  );

  const goToStockInfoOverView = useCallback(() => {
    const symbolCode = stockCode;
    if (selectedAccountType === ACCOUNT_TYPE.VIRTUAL) {
      dispatch(putIncreaseSearch({ code: symbolCode }));
    }
    if (selectedAccountType === ACCOUNT_TYPE.KIS) {
      dispatch(putIncreaseSearchForKis({ code: symbolCode, partnerId: 'kis' }));
    }
    dispatch(
      WatchListActions.getSymbolIncludeWatchList({
        code: stockCode,
      })
    );
    navigateToSymbolInfoOverview(stockCode, dispatch);
  }, [selectedAccountType, stockCode]);

  const showNoticeDeListedStocks = useCallback(() => {
    setShowTooltip(pre => !pre);
  }, []);

  if (isNilOrEmpty(profitLossItem)) return null;
  return (
    <View style={styles.row}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.outerCell}
        onPress={goToStockInfoOverView}
        disabled={isSymbolExist(stockCode) ? false : true}
      >
        <ImagesLogo codeLogo={stockCode} logoSize={36} logoStyle={styles.logoContainer} />
        <Text allowFontScaling={false} style={styles.stockCodeText}>
          {stockCode}
        </Text>
        {!isSymbolExist(stockCode) ? (
          <TouchableOpacity activeOpacity={1} onPress={showNoticeDeListedStocks} style={styles.spaceButton}>
            <Tooltip
              isVisible={showTooltip}
              content={
                <View style={styles.toolTipsContentContainer}>
                  <Text style={styles.textSymbolNoAvailable}>{t('This symbol is no longer available')}</Text>
                </View>
              }
              placement="top"
              onClose={showNoticeDeListedStocks}
              backgroundColor={lightColors.Transparent}
              contentStyle={styles.tooltip}
              tooltipStyle={styles.tooltipContainer}
              disableShadow={true}
            >
              <InfoIcon width={scaleSize(20)} height={scaleSizeHeight(20)} />
            </Tooltip>
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
      <View style={styles.innerCell}>
        <View style={styles.subCell}>
          <Text allowFontScaling={false} style={styles.weight}>
            {formatNumber(stockWeight, 2)}%
          </Text>
        </View>

        <View style={styles.subCell}>
          <Text allowFontScaling={false} style={styles.weight1}>
            {formatNumber(holdingDays, 2)}
          </Text>
        </View>
      </View>

      <View style={styles.innerCell}>
        <View style={styles.subCell}>
          <Text allowFontScaling={false} style={styles.weight}>
            {currentPrice == null ? '' : formatNumber(currentPrice / 1000, 2, undefined, true)}
          </Text>
        </View>
        <View style={styles.subCell}>
          <Text allowFontScaling={false} style={styles.weight1}>
            {buyingPrice == null ? '' : formatNumber(buyingPrice / 1000, 2, undefined, true)}
          </Text>
        </View>
      </View>

      <View style={styles.outerCellPL}>
        <View style={styles.subCell}>
          <Text
            allowFontScaling={false}
            style={[styles.weight, getColor(profitLossItem.profitLoss, 0, undefined, undefined, true).textStyle]}
          >
            {formatNumber(profitLoss, 2)}
          </Text>
        </View>
        <View style={styles.subCell}>
          <Text
            allowFontScaling={false}
            style={[styles.weight1, getColor(profitLossItem.profitLossRate, 0, undefined, undefined, true).textStyle]}
          >
            {formatNumber(profitLossRate, 2)}%
          </Text>
        </View>
      </View>
    </View>
  );
});

export default StockRow;
