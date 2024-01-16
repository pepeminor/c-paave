import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';
import React, { memo, useCallback } from 'react';
import useStyles from './styles';
import FilterIcon from 'assets/icon/FilterGrey.svg';
import { navigate } from 'utils';

const StockFilter = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const handleFilterModal = useCallback(() => {
    navigate({
      key: 'AIRatingFilter',
    });
  }, []);

  return (
    <View style={styles.optionPerformanceContainer}>
      <Text style={styles.performanceText}>{t('Stocklist')}</Text>
      <TouchableOpacity onPress={handleFilterModal}>
        <View style={styles.iconContainer}>
          <FilterIcon />
          <Text>{t('Filter')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(StockFilter);
