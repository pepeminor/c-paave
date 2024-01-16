import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import useStyles from './styles';

interface IPropsSymbolRow {
  title: string;
  value: string;
  hidden?: boolean;
}

const SymbolRow = ({ title, value, hidden }: IPropsSymbolRow) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  return !hidden ? (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.title}>
        {t(title)}
      </Text>
      <View style={styles.widthValue}>
        <Text allowFontScaling={false} style={styles.value}>
          {t(value)}
        </Text>
      </View>
    </View>
  ) : null;
};

export default SymbolRow;
