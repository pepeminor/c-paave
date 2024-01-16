import { RowComponentProps } from 'components/SheetData3';
import React, { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import globalStyles from 'styles';
import { formatNumber } from 'utils/common';
import useStyles from '../styles';
import { IGetDerivativePortfolioItem } from 'interfaces/derivatives';
import { isSymbolExist } from 'utils';
import { useAppSelector } from 'hooks/useAppSelector';
import { SymbolDataSelector } from 'reduxs';

interface AdditionalProps {
  goToDerivativeTradeView: (data: IGetDerivativePortfolioItem) => void;
  symbolRemoved?: () => string[] | undefined;
  isRealizedPortfolio?: boolean;
}

const RenderRow = memo(
  ({
    data,
    goToDerivativeTradeView,
    isRealizedPortfolio,
  }: // symbolRemoved,
  RowComponentProps<IGetDerivativePortfolioItem> & AdditionalProps) => {
    const { t } = useTranslation();
    const { styles, dynamicColors } = useStyles();

    const { long, seriesID, marketPrice, short, floatingPL } = data;
    const symbolData = useAppSelector(SymbolDataSelector.selectSymbol(seriesID), { currentPrice: true });

    const isDisableSymbolRemoved = useMemo(() => {
      if (!isSymbolExist(data.seriesID as string)) return true;
      return false;
    }, [data.seriesID]);

    const goToTrade = useCallback(() => {
      goToDerivativeTradeView(data);
    }, [goToDerivativeTradeView, data]);

    const floatingPLStyle = useMemo(() => {
      let color = dynamicColors.BLACK;
      if (floatingPL > 0) color = dynamicColors.green;
      if (floatingPL < 0) color = dynamicColors.LIGHTRed2;

      return { ...styles.quantity, color };
    }, [floatingPL, dynamicColors]);

    return (
      <TouchableOpacity style={styles.container} onPress={goToTrade} disabled={isDisableSymbolRemoved}>
        <View style={styles.col1}>
          <View style={globalStyles.centered}>
            <Text allowFontScaling={false} style={seriesID.length > 5 ? styles.stockCodeTxtSmall : styles.stockCodeTxt}>
              {seriesID}
            </Text>
            {!isRealizedPortfolio ? (
              <View style={[styles.btnSellSymbol, isDisableSymbolRemoved ? styles.btnDisable : styles.btnEnable]}>
                <Text style={styles.textSellSymbol}>{t('Close')}</Text>
              </View>
            ) : null}
          </View>
        </View>
        {isRealizedPortfolio ? (
          <>
            <View style={styles.col3}>
              <View style={styles.commonWrap}>
                <Text allowFontScaling={false} style={styles.quantity}>
                  {formatNumber(long)}
                </Text>
              </View>
              <View style={styles.commonWrap}>
                <Text allowFontScaling={false} style={styles.quantity2}>
                  {formatNumber(short)}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.col2}>
            <View style={styles.commonWrap}>
              <View style={styles.commonWrap}>
                <Text allowFontScaling={false} style={styles.quantity}>
                  {formatNumber(long)}
                </Text>
              </View>
              <View style={styles.commonWrap}>
                <Text allowFontScaling={false} style={styles.quantity}>
                  {formatNumber(short)}
                </Text>
              </View>
            </View>
          </View>
        )}
        <View style={styles.col3}>
          <View style={styles.commonWrap}>
            <Text allowFontScaling={false} style={styles.quantity}>
              {formatNumber(symbolData?.currentPrice, 1, undefined, true)}
            </Text>
          </View>
          <View style={styles.commonWrap}>
            <Text allowFontScaling={false} style={styles.quantity2}>
              {formatNumber(marketPrice, 1, undefined, true)}
            </Text>
          </View>
        </View>
        <View style={styles.col4}>
          <View style={styles.commonWrap}>
            <Text allowFontScaling={false} style={floatingPLStyle}>
              {formatNumber(floatingPL, 2)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

export default function renderRow(props: AdditionalProps) {
  return (hocProps: RowComponentProps<IGetDerivativePortfolioItem>) => <RenderRow {...hocProps} {...props} />;
}
