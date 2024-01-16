import { View, Text, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import globalStyles from 'styles';
import useStyles from './styles';

type PercentPickerProps = {
  showPercentPicker: boolean;
  onPress25Percent: () => void;
  onPress50Percent: () => void;
  onPress75Percent: () => void;
  onPressMax: () => void;
};

const PercentPicker = ({
  showPercentPicker,
  onPress25Percent,
  onPress50Percent,
  onPress75Percent,
  onPressMax,
}: PercentPickerProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  return showPercentPicker === true ? (
    <View style={[globalStyles.alignCenter, globalStyles.flexDirectionRow, styles.rateContainer]}>
      <TouchableOpacity
        onPress={onPress25Percent}
        style={[globalStyles.container, styles.rateThemeIconContainer, globalStyles.centered]}
      >
        <Text allowFontScaling={false} style={styles.rateText}>
          25%
        </Text>
      </TouchableOpacity>
      <View style={styles.width5} />
      <TouchableOpacity
        onPress={onPress50Percent}
        style={[globalStyles.container, styles.rateThemeIconContainer, globalStyles.centered]}
      >
        <Text allowFontScaling={false} style={styles.rateText}>
          50%
        </Text>
      </TouchableOpacity>
      <View style={styles.width5} />
      <TouchableOpacity
        onPress={onPress75Percent}
        style={[globalStyles.container, styles.rateThemeIconContainer, globalStyles.centered]}
      >
        <Text allowFontScaling={false} style={styles.rateText}>
          75%
        </Text>
      </TouchableOpacity>
      <View style={styles.width5} />
      <TouchableOpacity
        onPress={onPressMax}
        style={[globalStyles.container, styles.rateThemeIconContainer, globalStyles.centered]}
      >
        <Text allowFontScaling={false} style={styles.rateText}>
          {t('Max')}
        </Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

export default memo(PercentPicker);
