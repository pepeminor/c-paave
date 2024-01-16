import ImagesLogo from 'components/ImagesLogo';
import { RowComponentProps } from 'components/SheetData3';
import { useAppSelector } from 'hooks/useAppSelector';
import { IProfitLossItems } from 'interfaces/equity';
import React, { memo, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { isSymbolExist, formatNumber, getColor, hexToRgba, navigateToSymbolInfoOverview, navigate } from 'utils';
import useStyles from './styles';
import FlashColorText from 'components/FlashColorText';
import { useColors } from 'hooks/useStyles';
import { MergeMarketSymbol, SymbolDataSelector, setCurrentSymbol } from 'reduxs/SymbolData';
import withInjectedProps from 'HOC/withInjectProps';
import { InvestmentSelectors, WatchListActions } from 'reduxs';
import { useDispatch } from 'react-redux';
import { putIncreaseSearch, putIncreaseSearchForKis, setSellBuyType } from 'reduxs/global-actions';
import { ACCOUNT_TYPE, SELL_BUY_TYPE } from 'global';
import { isNilOrEmpty } from 'ramda-adjunct';
import ButtonPreventDoubleClick from 'components/ButtonPreventDoubleClick';
import { STOCK_LIST_TYPE } from 'components/StockList';
import { WalkthroughTooltip } from 'components/WalkthroughTooltip';
interface AdditionalProps {
  isPLRate: boolean;
  symbolRemoved: string[] | undefined;
  isOtherUser: boolean;
  type: string;
  isOwner?: boolean;
}

export function getProfitLossData(data?: IProfitLossItems, stockData?: MergeMarketSymbol) {
  if (!data) {
    return {
      stockCode: '',
      balanceQuantity: 0,
      sellableQuantity: 0,
      buyingPrice: 0,
      currentPrice: 0,
      currentValue: 0,
      profitLoss: 0,
      profitLossRate: 0,
      holdingDays: 0,
      stockWeight: 0,
    };
  }
  const newCurrentPrice = stockData?.expectedPrice ?? stockData?.currentPrice ?? data?.currentPrice ?? 0;
  const buyingPrice = data.buyingPrice ?? 0;
  const balanceQuantity = data.balanceQuantity ?? 0;
  const rightOffering = data.rightOffering ?? 0;
  const ignoreRightQuantity = balanceQuantity - rightOffering;

  return {
    stockCode: data?.stockCode,
    balanceQuantity: balanceQuantity,
    sellableQuantity: data?.sellableQuantity ?? 0,
    buyingPrice,
    holdingDays: data?.holdingDays ?? 0,
    stockWeight: data?.stockWeight ?? 0,
    currentPrice: newCurrentPrice,
    currentValue: newCurrentPrice * ignoreRightQuantity,
    profitLoss: (newCurrentPrice - buyingPrice) * ignoreRightQuantity,
    profitLossRate: ((newCurrentPrice - buyingPrice) * ignoreRightQuantity * 100) / (buyingPrice * ignoreRightQuantity),
  };
}

const RenderRow = memo(
  ({
    data: stockCode,
    isPLRate,
    symbolRemoved,
    isOtherUser = false,
    isOwner = true,
    type = 'PORTFOLIO',
  }: RowComponentProps<string> & AdditionalProps) => {
    const { t } = useTranslation();
    const { styles } = useStyles();
    const dispatch = useDispatch();
    const Colors = useColors();
    const stockData = useAppSelector(SymbolDataSelector.selectSymbol(stockCode), {
      currentPrice: true,
      expectedPrice: true,
    });
    const profitLossItem = useAppSelector(InvestmentSelectors.selectedProfitLossItem(stockCode, isOtherUser));
    const selectedAccountType = useAppSelector(state => state.selectedAccount.type);
    const tooltipRef = useRef<WalkthroughTooltip>(null);

    const {
      currentPrice,
      balanceQuantity,
      sellableQuantity,
      buyingPrice,
      profitLossRate,
      profitLoss,
      currentValue,
      holdingDays,
      stockWeight,
    } = useMemo(
      () => getProfitLossData(profitLossItem, stockData),
      [profitLossItem?.currentPrice, stockData?.currentPrice, stockData?.expectedPrice]
    );

    const skipFunction = useRef(false);
    // get symbol CW removed file symbol list data
    const isDisableSymbolRemoved = useMemo(() => {
      if (symbolRemoved == null) return;

      return symbolRemoved.some(item => item.includes(stockCode)) || !isSymbolExist(stockCode);
    }, [symbolRemoved, stockCode]);

    const sellOrder = useCallback(() => {
      if (skipFunction.current) return;
      skipFunction.current = true;
      setTimeout(() => {
        skipFunction.current = false;
      }, 2000);
      dispatch(setCurrentSymbol(stockCode));
      dispatch(setSellBuyType(SELL_BUY_TYPE.SELL));
      navigate({
        key: 'Trade1',
        params: { isNotRefresh: true },
      });
    }, [stockCode]);

    const goToStockInfoOverView = useCallback(() => {
      if (isDisableSymbolRemoved) {
        tooltipRef.current?.setVisible(true);
        return;
      }
      if (skipFunction.current) return;
      skipFunction.current = true;
      setTimeout(() => {
        skipFunction.current = false;
      }, 2000);
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
    }, [selectedAccountType, stockCode, isDisableSymbolRemoved]);

    const disableButtonSell = currentPrice === 0 || isDisableSymbolRemoved || profitLossItem?.sellableQuantity === 0;

    if (isNilOrEmpty(profitLossItem)) return null;

    return (
      <ButtonPreventDoubleClick style={styles.row} onPress={goToStockInfoOverView}>
        <View style={styles.col1}>
          <ImagesLogo codeLogo={stockCode} logoSize={40} logoStyle={styles.logoContainer} />
          <View style={styles.col1ContentContainer}>
            <WalkthroughTooltip
              content="This symbol is no longer available"
              absoluteTooltip
              placement="top"
              tooltipFontSize="small"
              ref={tooltipRef}
              disabled={true}
            >
              <Text
                allowFontScaling={false}
                style={stockCode?.length > 5 ? styles.stockCodeTxtSmall : styles.stockCodeTxt}
              >
                {stockCode}
              </Text>
            </WalkthroughTooltip>
            {isOwner && (
              <ButtonPreventDoubleClick
                style={disableButtonSell ? styles.btnDisable : styles.btnSellSymbol}
                disabled={disableButtonSell}
                onPress={sellOrder}
              >
                <Text style={styles.textSellSymbol}>{t('Sell')}</Text>
              </ButtonPreventDoubleClick>
            )}
          </View>
        </View>
        {type === STOCK_LIST_TYPE.QUANTITY ? (
          <View style={styles.col2}>
            <View style={styles.col2Cell}>
              <Text allowFontScaling={false} style={styles.quantity}>
                {formatNumber(balanceQuantity)}
              </Text>
            </View>
            {isOwner && (
              <View style={styles.col2Cell}>
                <Text allowFontScaling={false} style={styles.quantity2}>
                  {formatNumber(sellableQuantity)}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.col2}>
            <View style={styles.col2Cell}>
              <Text allowFontScaling={false} style={styles.quantity}>
                {`${formatNumber(stockWeight)}%`}
              </Text>
            </View>
            <View style={styles.col2Cell}>
              <Text allowFontScaling={false} style={styles.quantity2}>
                {formatNumber(holdingDays)}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.col3}>
          <View style={styles.col3Cell}>
            <Text allowFontScaling={false} style={styles.quantity}>
              {stockData?.symbolType === 'FUTURES'
                ? formatNumber(currentPrice, 1, undefined, true)
                : formatNumber(currentPrice / 1000, 2, undefined, true)}
            </Text>
          </View>
          <View style={styles.col3Cell}>
            <Text allowFontScaling={false} style={styles.quantity2}>
              {stockData?.symbolType === 'FUTURES'
                ? formatNumber(buyingPrice, 1, undefined, true)
                : formatNumber(buyingPrice / 1000, 2, undefined, true)}
            </Text>
          </View>
        </View>
        <View style={styles.col4}>
          <FlashColorText
            changeNumber={currentValue}
            displayValue={formatNumber(currentValue, 2)}
            containerStyles={styles.col4Cell_1}
            textStyles={styles.quantity}
            colorConfig={{
              start: {
                bgColor: hexToRgba(Colors.LIGHTTextContent, 0.5),
                txtColor: Colors.LIGHTTextContent,
              },
              steady: {
                bgColor: hexToRgba(Colors.LIGHTTextContent, 0.5),
                txtColor: Colors.LIGHTTextContent,
              },
            }}
          />
          <View style={styles.col4Cell_2}>
            {isPLRate ? (
              <Text
                allowFontScaling={false}
                style={[styles.quantity2, getColor(profitLossRate, 0, undefined, undefined, true).textStyle]}
              >
                {formatNumber(profitLossRate, 2)}%
              </Text>
            ) : (
              <Text
                allowFontScaling={false}
                style={[styles.quantity, getColor(profitLoss, 0, undefined, undefined, true).textStyle]}
              >
                {formatNumber(profitLoss)}
              </Text>
            )}
          </View>
        </View>
      </ButtonPreventDoubleClick>
    );
  }
);

export default withInjectedProps<RowComponentProps<string>, AdditionalProps>(RenderRow);
