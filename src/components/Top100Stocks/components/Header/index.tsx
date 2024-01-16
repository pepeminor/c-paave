import { View, Text, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { useStyles } from './styles';
import { useTranslation } from 'react-i18next';
import Icon from 'components/Icon';
import { navigate } from 'utils';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';

const goToTop100StocksScreen = () => {
  navigate({
    key: 'Top100StocksScreen',
  });
  track(AMPLITUDE_EVENT.VIEW_TOP_100_DETAILS);
};

const Header = () => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.headerText}>
        {t('Top 100 Ranked List')}
      </Text>
      <TouchableOpacity style={styles.seeAllBtn} onPress={goToTop100StocksScreen}>
        <Text allowFontScaling={false} style={styles.seeAll}>
          {t('See all')}
        </Text>
        <Icon color={dynamicColors.BlueNewColor} name={'arrow-right-double'} size={16} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(Header);
