import { View, Text } from 'react-native';
import React, { ComponentProps, memo } from 'react';
import { useStyles } from './styles';
import { StockThemeSelector, ThemePeriod } from 'reduxs';
import { useTranslation } from 'react-i18next';
import Icon from 'components/Icon';
import { IColors, scaleSize } from 'styles';
import { formatNumber, getColor } from 'utils';
import { useAppSelector } from 'hooks';

type Props = {
  period: ThemePeriod;
  themeName: string;
};

export const ThemeHeader = memo(({ period, themeName }: Props) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  const lastUpdateTime = useAppSelector(StockThemeSelector.lastUpdateTimeDetail(themeName));
  const rate = useAppSelector(StockThemeSelector.selectThemeChangeRate(themeName, period));

  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.sectionText}>
        {t('theme_period_change', {
          period: t(ThemePeriod[period]),
        })}
      </Text>
      <View style={styles.rateAndTimeContainer}>
        <View style={styles.rateContainer}>
          <Icon {...getIconProps(rate, dynamicColors)} />
          <Text
            allowFontScaling={false}
            style={[styles.rateText, getColor(rate, 0, undefined, undefined, true).textStyle]}
          >
            {formatNumber(rate, 2, undefined, true) + '%'}
          </Text>
        </View>
        {lastUpdateTime != null && (
          <Text allowFontScaling={false} style={styles.basedOnText}>
            {t('Last Updated')} {lastUpdateTime}
          </Text>
        )}
      </View>
    </View>
  );
});

export const getIconProps = (rate: number, dynamicColors: IColors): ComponentProps<typeof Icon> => {
  if (rate > 0) {
    return {
      name: 'increase',
      color: dynamicColors.DARK_GREEN,
      size: 24,
    };
  }
  if (rate < 0) {
    return {
      name: 'reduced',
      color: dynamicColors.LIGHTRed,
      size: 24,
    };
  }
  return {
    name: 'line',
    color: dynamicColors.LIGHTYellow,
    size: 12,
    style: {
      marginLeft: scaleSize(14),
    },
  };
};
