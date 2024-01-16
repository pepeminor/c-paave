import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { useAppSelector } from 'hooks';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { StockThemeActions, StockThemeSelector, ThemePeriod, ThemeSubscribeHelper } from 'reduxs';
import ThemeIcon from 'components/StockTheme/components/ThemeIcon';
import { scaleSize, width } from 'styles';
import { formatNumber, getColor, getIconColor, navigationRef } from 'utils';
import IconIncrease from 'assets/icon/IconIncrease.svg';
import IconDecrease from 'assets/icon/IconDecrease2.svg';
import ButtonPreventDoubleClick from 'components/ButtonPreventDoubleClick';
import { StackActions } from '@react-navigation/native';
import useMemoizedParams from 'hooks/useMemoizedParams';
import TabSelector from 'components/TabSelector';
import ContentLoader, { Rect } from 'react-content-loader/native';

export const Theme = memo(() => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const [period, _setPeriod] = useState<ThemePeriod>('1D');
  const currentSymbolCode = useAppSelector(state => state.SymbolData.currentSymbolCode);
  const lastUpdateTime = useAppSelector(StockThemeSelector.lastUpdateTime);
  const currentThemeList = useAppSelector(StockThemeSelector.currentThemeList(period));
  const isCurrentSymbolHasTheme = useAppSelector(StockThemeSelector.isCurrentSymbolHasTheme);
  const themeCodeList = useMemo(() => currentThemeList.map(item => item.themeCode), [currentThemeList]);
  const memoizedThemeCodes = useMemoizedParams(themeCodeList);

  useEffect(() => {
    ThemeSubscribeHelper.subscribe(memoizedThemeCodes);
    return () => {
      ThemeSubscribeHelper.unsubscribe(memoizedThemeCodes);
    };
  }, [memoizedThemeCodes]);

  useEffect(() => {
    dispatch(
      StockThemeActions.getThemeList({
        payload: {
          symbol: currentSymbolCode,
        },
      })
    );
  }, [currentSymbolCode]);

  const onPressTheme = (themeName: string) => () => {
    dispatch(StockThemeActions.updatePeriod(period));
    navigationRef.dispatch(
      StackActions.push('PopularThemeDetail', { themeName, highlightStockCode: currentSymbolCode })
    );
  };

  const setPeriod = useCallback((value: ThemePeriod) => {
    dispatch(
      StockThemeActions.getThemeList({
        payload: {
          symbol: currentSymbolCode,
          period: value,
        },
      })
    );
    _setPeriod(value);
  }, []);

  if (!isCurrentSymbolHasTheme) return null;
  if (currentThemeList.length === 0)
    return (
      <View style={styles.skeletonContainer}>
        <View style={styles.titleContainer}>
          <Text allowFontScaling={false} style={styles.titleText}>
            {t('Theme')}
          </Text>
          {lastUpdateTime != null && (
            <Text allowFontScaling={false} style={styles.basedOnText}>
              {t('Last Updated')} {lastUpdateTime}
            </Text>
          )}
        </View>
        <TabSelector value={period} setValue={setPeriod} listValue={ThemePeriod} style={styles.tabContainer} />
        <ContentLoader speed={2} width={width} height={width / 4} viewBox={`0 0 ${width} ${width / 4}`}>
          <Rect x="16" y="8" rx="8" ry="8" width="190" height="88" />
          <Rect x="222" y="8" rx="8" ry="8" width="190" height="88" />
        </ContentLoader>
      </View>
    );
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text allowFontScaling={false} style={styles.titleText}>
          {t('Theme')}
        </Text>
        {lastUpdateTime != null && (
          <Text allowFontScaling={false} style={styles.basedOnText}>
            {t('Last Updated')} {lastUpdateTime}
          </Text>
        )}
      </View>
      <TabSelector value={period} setValue={setPeriod} listValue={ThemePeriod} style={styles.tabContainer} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.themeListContentContainer}
      >
        {currentThemeList.map((item, index) => (
          <ButtonPreventDoubleClick
            style={styles.themeContainer}
            key={`StockOverView_Theme_${item.themeName}_${index}`}
            onPress={onPressTheme(item.themeName)}
          >
            <View style={styles.themeNameRow}>
              <ThemeIcon logoName={item.themeName} />
              <Text allowFontScaling={false} style={styles.themeName}>
                {t(item.themeName)}
              </Text>
            </View>
            <View style={styles.themeRateRow}>
              {item.themeChangeRate != null &&
                getIconColor(
                  item.themeChangeRate,
                  0,
                  undefined,
                  undefined,
                  <IconIncrease width={scaleSize(12)} height={scaleSize(10)} />,
                  <IconDecrease width={scaleSize(12)} height={scaleSize(10)} />
                )}
              <Text
                allowFontScaling={false}
                style={[styles.rateText, getColor(item.themeChangeRate, 0, undefined, undefined, true).textStyle]}
              >
                {formatNumber(item.themeChangeRate, 2, undefined, true) + '%'}
              </Text>
            </View>
          </ButtonPreventDoubleClick>
        ))}
      </ScrollView>
    </View>
  );
});
