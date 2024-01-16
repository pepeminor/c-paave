import React, { memo } from 'react';
import useStyles from '../styles';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

const HotStockTableHeader = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  return (
    <View style={styles.tableHeaderContainer}>
      <View style={styles.col1}>
        <Text style={styles.tableHeaderText}>{t('Symbol')}</Text>
      </View>
      <View style={styles.col2}>
        <View style={styles.col2Cell}>
          <Text style={styles.tableHeaderText2}>{t('Current Price')}</Text>
        </View>
        <View style={styles.col2Cell}>
          <Text style={styles.tableHeaderText2}>{t('Change')}</Text>
        </View>
      </View>
      <View style={styles.col3}>
        <View style={styles.col3Cell}>
          <Text style={styles.tableHeaderText2}>{t('Volume')}</Text>
        </View>
        <View style={styles.col3Cell}>
          <Text style={styles.tableHeaderText2}>{t('Value (Mil)')}</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(HotStockTableHeader);
