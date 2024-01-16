import { View, Text, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import StockTheme from 'components/StockTheme';
import { useTranslation } from 'react-i18next';
import { useStyles } from './styles';
import { navigate } from 'utils';
import Icon from 'components/Icon';
import LoginRequired from 'components/LoginRequired';
import { useAppSelector } from 'hooks/useAppSelector';
import { StockThemeSelector } from 'reduxs';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';

const Discover_goToPopularTheme = () => {
  navigate({
    key: 'PopularTheme',
  });
  track(AMPLITUDE_EVENT.VIEW_THEME_DETAILS);
};

const DiscoverTheme = () => {
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();

  const lastUpdateTime = useAppSelector(StockThemeSelector.lastUpdateTime);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text allowFontScaling={false} style={styles.headerText}>
          {t('Theme')}
        </Text>
        <TouchableOpacity style={styles.seeAllBtn} onPress={Discover_goToPopularTheme}>
          <Text allowFontScaling={false} style={styles.seeAllBtnText}>
            {t('See all')}
          </Text>
          <Icon color={dynamicColors.BlueNewColor} name={'arrow-right-double'} size={16} />
        </TouchableOpacity>
      </View>
      {lastUpdateTime != null && (
        <Text allowFontScaling={false} style={styles.basedOnText}>
          {t('Last Updated')} {lastUpdateTime}
        </Text>
      )}
      <StockTheme limit={10} />
      <LoginRequired />
    </View>
  );
};

export default memo(DiscoverTheme);
