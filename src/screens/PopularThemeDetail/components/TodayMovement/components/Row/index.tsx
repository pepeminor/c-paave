import React, { memo } from 'react';
import {
  formatCurrency,
  formatNumber,
  getColor,
  getSessionBasedValue,
  getSessionPrice,
  hexToRgba,
  navigateToSymbolInfoOverview,
} from 'utils';
import { RowComponentProps } from 'components/SheetData3';
import { useAppSelector } from 'hooks/useAppSelector';
import { StockThemeSelector, SymbolDataSelector, ThemePeriod } from 'reduxs';
import withInjectedProps from 'HOC/withInjectProps';
import { Text, TouchableOpacity, View } from 'react-native';
import ImagesLogo from 'components/ImagesLogo';
import { useStyles } from './styles';
import PaaveText from 'components/PaaveText';
import { LANG } from 'global';
import { TEXT_TYPE } from 'components/PaaveText/type';
import FlashColorText from 'components/FlashColorText';
import { useDispatch } from 'react-redux';
import SymbolTag2 from 'components/SymbolTag2';

type AdditionalProps = {
  themeName: string;
  period: ThemePeriod;
};

const Row = ({ data, themeName, period }: RowComponentProps<string> & AdditionalProps) => {
  const { styles, dynamicColors } = useStyles();
  const dispatch = useDispatch();

  const symbolData = useAppSelector(SymbolDataSelector.selectSymbol(data), {
    tradingValue: true,
    tradingVolume: true,
    changeRate: true,
    expectedChange: true,
    session: true,
  });
  const lang = useAppSelector(state => state.lang);

  const themeRate = useAppSelector(StockThemeSelector.selectCurrentStockRate(data, themeName, period));

  const sessionPrice = getSessionPrice(
    symbolData?.session,
    symbolData?.expectedPrice,
    symbolData?.currentPrice,
    symbolData?.referencePrice
  );

  const sessionRate = getSessionBasedValue(
    symbolData?.session?.match(/^(ATO|ATC)$/) != null,
    symbolData?.expectedRate,
    symbolData?.changeRate
  );

  const currentRate = themeRate ?? sessionRate;

  const sessionPriceColor = getColor(currentRate, 0).textStyle.color;

  const goToSymbol = () => {
    navigateToSymbolInfoOverview(data, dispatch);
  };

  if (!symbolData) return null;

  if (period === '1D') {
    return (
      <SymbolTag2
        totalTradingValue={formatCurrency(symbolData.tradingValue)}
        totalTradingVolume={formatNumber(symbolData.tradingVolume)}
        symbolCode={data}
      />
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={goToSymbol}>
      <View style={styles.firstCol}>
        <ImagesLogo codeLogo={data} logoSize={34} logoStyle={styles.logoCode} />
        <View style={styles.symbolInfo}>
          <PaaveText type={TEXT_TYPE.BOLD_14}>{data}</PaaveText>
          <PaaveText
            type={TEXT_TYPE.REGULAR_10}
            numberOfLines={1}
            color={dynamicColors.LIGHTTextDisable}
            style={styles.nameContainer}
          >
            {lang === LANG.VI ? symbolData.vietnameseName : symbolData.englishName}
          </PaaveText>
        </View>
      </View>
      <View style={styles.secondCol}>
        <FlashColorText
          changeNumber={sessionPrice + currentRate}
          displayValue={
            symbolData.symbolType === 'FUTURES'
              ? formatNumber(sessionPrice, 1, undefined, true)
              : formatNumber(sessionPrice / 1000, 2, undefined, true)
          }
          textStyles={styles.priceText}
          colorConfig={{
            start: {
              bgColor: hexToRgba(sessionPriceColor, 0.5),
              txtColor: sessionPriceColor,
            },
            steady: {
              bgColor: hexToRgba(sessionPriceColor, 0.5),
              txtColor: sessionPriceColor,
            },
            end: {
              bgColor: dynamicColors.Transparent,
              txtColor: sessionPriceColor,
            },
          }}
        />
        <FlashColorText
          changeNumber={currentRate}
          displayValue={formatNumber(currentRate, 1, undefined, true) + '%'}
          textStyles={styles.priceText}
          colorConfig={{
            start: {
              bgColor: hexToRgba(sessionPriceColor, 0.5),
              txtColor: sessionPriceColor,
            },
            steady: {
              bgColor: hexToRgba(sessionPriceColor, 0.5),
              txtColor: sessionPriceColor,
            },
            end: {
              bgColor: dynamicColors.Transparent,
              txtColor: sessionPriceColor,
            },
          }}
        />
      </View>
      <View style={styles.containerTradingVolume}>
        {symbolData?.tradingVolume != null ? (
          <FlashColorText
            changeNumber={symbolData.tradingVolume}
            displayValue={formatNumber(symbolData.tradingVolume)}
            containerStyles={styles.containerTradingVolumeText}
            textStyles={styles.volumeText}
            colorConfig={{
              start: {
                bgColor: hexToRgba(dynamicColors.BLACK_1, 0.5),
                txtColor: dynamicColors.BLACK_1,
              },
              steady: {
                bgColor: hexToRgba(dynamicColors.BLACK_1, 0.5),
                txtColor: dynamicColors.BLACK_1,
              },
              end: {
                bgColor: dynamicColors.Transparent,
                txtColor: dynamicColors.BLACK_1,
              },
            }}
          />
        ) : (
          <Text style={styles.priceText}>-</Text>
        )}
        {symbolData?.tradingValue != null ? (
          <FlashColorText
            changeNumber={symbolData.tradingValue}
            displayValue={formatCurrency(symbolData.tradingValue)}
            containerStyles={styles.containerTradingVolumeText}
            textStyles={styles.valueText}
            colorConfig={{
              start: {
                bgColor: hexToRgba(dynamicColors.BLACK_1, 0.5),
                txtColor: dynamicColors.BLACK_1,
              },
              steady: {
                bgColor: hexToRgba(dynamicColors.BLACK_1, 0.5),
                txtColor: dynamicColors.BLACK_1,
              },
              end: {
                bgColor: dynamicColors.Transparent,
                txtColor: dynamicColors.BLACK_1,
              },
            }}
          />
        ) : (
          <Text style={styles.priceText}>-</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export const ThemeRow = withInjectedProps<RowComponentProps<string>, AdditionalProps>(memo(Row));
