import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import useStyles from './styles';

export type IRowItemBaseProps = {
  label: string;
  value: string | number;
  labelStyles?: StyleProp<TextStyle>;
  dataStyles?: StyleProp<TextStyle>;
};

function RowItem({ label, value, labelStyles, dataStyles }: IRowItemBaseProps) {
  const { t } = useTranslation();
  const { styles } = useStyles();

  return (
    <View style={styles.overviewColumn}>
      <Text style={[styles.overviewColumnTitle, labelStyles]}>{t(label)}</Text>
      <Text style={[styles.overviewColumnValue, dataStyles]}>{value}</Text>
    </View>
  );
}

export default RowItem;
