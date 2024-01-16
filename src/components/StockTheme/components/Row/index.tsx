import { Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback } from 'react';
import { useStyles } from './styles';
import { useAppSelector } from 'hooks/useAppSelector';
import { StockThemeSelector } from 'reduxs';
import { RowComponentProps } from 'components/SheetData3';
import ThemeIcon from '../ThemeIcon';
import { useTranslation } from 'react-i18next';
import { formatNumber, getColor, hexToRgba, navigate } from 'utils';
import Icon from 'components/Icon';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { getIconProps } from 'screens/PopularThemeDetail/components';
import FlashColorBackground from 'components/FlashColorBackground';
import FlashColorText from 'components/FlashColorText';

const Row = ({ data: themeName, index }: RowComponentProps<string>) => {
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();
  const period = useAppSelector(state => state.StockThemeReducer.period);
  const themeData = useAppSelector(StockThemeSelector.selectThemeMapData(themeName, period));

  const goToThemeDetail = useCallback(() => {
    navigate({
      key: ScreenNames.PopularThemeDetail,
      params: {
        themeName,
      },
    });
  }, [themeName]);

  const textColor = getColor(themeData?.themeChangeRate, 0).textStyle;

  if (themeData == null) return null;

  return (
    <TouchableOpacity style={styles.container} onPress={goToThemeDetail}>
      <View style={styles.firstCell}>
        <View style={styles.rankCircle}>
          <Text allowFontScaling={false} style={styles.rankNumber}>
            {index + 1}
          </Text>
        </View>
        <ThemeIcon logoName={themeName} />
        <Text allowFontScaling={false} style={styles.themeName}>
          {t(themeName)}
        </Text>
      </View>
      <View style={styles.secondCell}>
        <Icon style={styles.iconStyle} {...getIconProps(themeData.themeChangeRate, dynamicColors)} />
        <FlashColorText
          changeNumber={themeData.themeChangeRate}
          displayValue={formatNumber(themeData.themeChangeRate, 2, undefined, true) + '%'}
          textStyles={[styles.rateText, getColor(themeData.themeChangeRate, 0, undefined, undefined, true).textStyle]}
          allowFontScaling={false}
          colorConfig={{
            start: {
              bgColor: hexToRgba(textColor.color, 0.5),
              txtColor: textColor.color,
            },
            steady: {
              bgColor: hexToRgba(textColor.color, 0.5),
              txtColor: textColor.color,
            },
            end: {
              bgColor: dynamicColors.Transparent,
              txtColor: textColor.color,
            },
          }}
        />
      </View>
      <View style={styles.thirdCell}>
        <FlashColorBackground
          changeNumber={themeData.noOfIncreases}
          displayValue={themeData.noOfIncreases}
          textStyles={styles.stockStonk}
          allowFontScaling={false}
          style={styles.thirdCellChild}
          startColor={dynamicColors.Transparent}
          endColor={dynamicColors.Transparent}
          steadyColor={hexToRgba(dynamicColors.DARKTextBigTitle, 0.4)}
        >
          <Icon name="arrow-up" color={dynamicColors.DARK_GREEN} />
        </FlashColorBackground>
        <FlashColorBackground
          changeNumber={themeData.noOfUnchanges}
          displayValue={themeData.noOfUnchanges}
          textStyles={styles.stockUnchanged}
          allowFontScaling={false}
          style={styles.thirdCellChild}
          startColor={dynamicColors.Transparent}
          endColor={dynamicColors.Transparent}
          steadyColor={hexToRgba(dynamicColors.DARKTextBigTitle, 0.4)}
        />
        <FlashColorBackground
          changeNumber={themeData.noOfDecreases}
          displayValue={themeData.noOfDecreases}
          textStyles={styles.stockStink}
          allowFontScaling={false}
          style={styles.thirdCellChild}
          startColor={dynamicColors.Transparent}
          endColor={dynamicColors.Transparent}
          steadyColor={hexToRgba(dynamicColors.DARKTextBigTitle, 0.4)}
        >
          <Icon name="arrow-down" color={dynamicColors.LIGHTRed} />
        </FlashColorBackground>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Row);
