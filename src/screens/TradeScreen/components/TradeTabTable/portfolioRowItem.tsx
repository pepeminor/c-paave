import FlashColorText from 'components/FlashColorText';
import { RowComponentProps } from 'components/SheetData2';
import { getProfitLossData } from 'components/StockList/components/StockRow';
import { useAppSelector } from 'hooks/useAppSelector';
import { IProfitLossItems } from 'interfaces/equity';
import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import globalStyles, { lightColors } from 'styles';
import { formatNumber, getColor, hexToRgba, insertObjectIf, insertObjectIfElse, isSymbolExist } from 'utils';
import { InvestmentSelectors } from 'reduxs';
import { getStylesHook } from 'hooks/useStyles';
import { IS_IOS } from 'constants/main';

interface AdditionalProps {
  SellOrder(data: IProfitLossItems): () => void;
  plViewType: boolean;
  symbolRemoved: string[] | undefined;
}

const RenderRow = memo(
  ({ data, Wrapper, SellOrder, plViewType, symbolRemoved }: RowComponentProps<IProfitLossItems> & AdditionalProps) => {
    const { t } = useTranslation();
    const { styles, dynamicColors } = useStyles();
    const stockData = useAppSelector(SymbolDataSelector.selectSymbol(data.stockCode), {
      currentPrice: true,
      expectedPrice: true,
    });
    const profitLossItem = useAppSelector(InvestmentSelectors.selectedProfitLossItem(data.stockCode, false));

    const { stockCode, currentPrice, sellableQuantity, buyingPrice, profitLossRate, profitLoss } = useMemo(
      () => getProfitLossData(profitLossItem, stockData),
      [profitLossItem?.currentPrice, stockData?.currentPrice, stockData?.expectedPrice]
    );

    // get symbol CW removed file symbol list data
    const isDisableSymbolRemoved = useMemo(() => {
      const symbolRemovedData = symbolRemoved;
      if (symbolRemovedData == null) return;
      if (sellableQuantity <= 0) return true;

      return symbolRemovedData.some(item => item.includes(stockCode)) || !isSymbolExist(stockCode);
    }, [symbolRemoved]);

    if (!profitLossItem) return null;

    return (
      <TouchableOpacity style={globalStyles.borderBottom1} onPress={SellOrder(data)} disabled={isDisableSymbolRemoved}>
        <Wrapper>
          <View style={styles.col1}>
            <View
              style={[
                styles.btnSellSymbol,
                insertObjectIf(currentPrice === 0 || isDisableSymbolRemoved, styles.btnDisable),
              ]}
            >
              <Text style={styles.textSellSymbol}>{t('Sell')}</Text>
            </View>
            <Text
              allowFontScaling={false}
              style={insertObjectIfElse(stockCode?.length > 5, styles.stockCodeTxtSmall, styles.stockCodeTxt)}
            >
              {stockCode}
            </Text>
          </View>
          <View style={styles.col2}>
            <Text allowFontScaling={false} style={styles.quantity}>
              {formatNumber(sellableQuantity, 2)}
            </Text>
          </View>
          <View style={styles.col3}>
            <Text allowFontScaling={false} style={styles.quantity}>
              {stockData?.symbolType === 'FUTURES'
                ? formatNumber(buyingPrice, 1, undefined, true)
                : formatNumber(buyingPrice / 1000, 2, undefined, true)}
            </Text>
          </View>
          <View style={styles.col4}>
            <FlashColorText
              changeNumber={plViewType ? profitLossRate : profitLoss}
              displayValue={plViewType ? formatNumber(profitLossRate, 2) + '%' : formatNumber(profitLoss)}
              containerStyles={[globalStyles.centered, globalStyles.flexDirectionRow, globalStyles.justifyCenter]}
              textStyles={styles.quantity}
              allowFontScaling={false}
              colorConfig={{
                start: {
                  bgColor: hexToRgba(
                    getColor(plViewType ? profitLossRate : profitLoss, 0, undefined, undefined, true).textStyle.color,
                    0.5
                  ),
                  txtColor: getColor(plViewType ? profitLossRate : profitLoss, 0, undefined, undefined, true).textStyle
                    .color,
                },
                steady: {
                  bgColor: hexToRgba(
                    getColor(plViewType ? profitLossRate : profitLoss, 0, undefined, undefined, true).textStyle.color,
                    0.5
                  ),
                  txtColor: getColor(plViewType ? profitLossRate : profitLoss, 0, undefined, undefined, true).textStyle
                    .color,
                },
                end: {
                  bgColor: dynamicColors.Transparent,
                  txtColor: getColor(plViewType ? profitLossRate : profitLoss, 0, undefined, undefined, true).textStyle
                    .color,
                },
              }}
            />
          </View>
        </Wrapper>
      </TouchableOpacity>
    );
  }
);

const useStyles = getStylesHook({
  col1: {
    flexDirection: 'row',
    width: 126,
    height: 36,
    borderRightColor: lightColors.BORDER,
    borderRightWidth: 1,
    borderLeftColor: lightColors.BORDER,
    borderLeftWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btnSellSymbol: {
    backgroundColor: lightColors.LIGHTButtonRed,
    height: 22,
    width: 53,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: lightColors.LIGHTButtonRed,
    justifyContent: 'center',
    marginLeft: 5,
  },
  btnDisable: {
    opacity: 0.5,
  },
  textSellSymbol: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 16,
    color: lightColors.WHITE,
    textAlign: 'center',
  },
  stockCodeTxtSmall: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextContent,
    fontSize: 11,
    marginLeft: 5,
    justifyContent: 'center',
    paddingTop: 2,
  },
  stockCodeTxt: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextContent,
    fontSize: 14,
    textAlign: 'center',
    width: 40,
    justifyContent: 'center',
    paddingTop: 2,
  },
  col2: {
    width: 88.67,
    height: 36,
    borderRightColor: lightColors.BORDER,
    borderRightWidth: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 6,
  },
  col3: {
    width: 73.67,
    height: 36,
    borderRightColor: lightColors.BORDER,
    borderRightWidth: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 6,
  },
  col4: {
    width: 80.67,
    height: 36,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 6,
  },
  quantity: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: IS_IOS ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextContent,
  },
});

export default function portfolioRowItem(props: AdditionalProps) {
  return (hocProps: RowComponentProps<IProfitLossItems>) => <RenderRow {...hocProps} {...props} />;
}
