import React from 'react';
import { Text, View } from 'react-native';

import useStyles from './styles';

interface IPropsSymbolRow {
  title: string;
  value: string;
  hidden?: boolean;
}

const SymbolRow = ({ title, value, hidden }: IPropsSymbolRow) => {
  const { styles } = useStyles();
  return !hidden ? (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.title}>
        {title}
      </Text>
      <Text allowFontScaling={false} style={styles.value}>
        {value}
      </Text>
    </View>
  ) : null;
};

export default SymbolRow;
