import { View, Text } from 'react-native';
import React, { memo } from 'react';
import { useStyles } from './styles';
import { t } from 'i18next';
import { StockStatus } from 'screens/PopularThemeDetail/type';

type Props = {
  increase: number;
  unchanges: number;
  decrease: number;
};

export type ThemeInfoRef = {
  updateStockStatus: (symbol: string, status: StockStatus) => void;
};

export const ThemeInfo = memo(({ increase, decrease, unchanges }: Props) => {
  const { styles } = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.changeContainer}>
        <View style={[styles.advancersBlock, { flex: increase }]} />
        <View style={[styles.unchangedBlock, { flex: unchanges }]} />
        <View style={[styles.declinersBlock, { flex: decrease }]} />
      </View>
      <View style={styles.changeTextContainer}>
        <Text allowFontScaling={false} style={styles.advancersText}>
          {t('Advances')}: {increase}
        </Text>
        <Text allowFontScaling={false} style={styles.unchangedText}>
          {t('Unchanged')}: {unchanges}
        </Text>
        <Text allowFontScaling={false} style={styles.declinersText}>
          {t('Declines')}: {decrease}
        </Text>
      </View>
    </View>
  );
});
