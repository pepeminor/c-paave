import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import globalStyles from 'styles';
import useStyles from './styles';

interface ColumnItemPropsType {
  children: any;
  style?: StyleProp<ViewStyle>;
}

export const ColumnItem = ({ children, style = {} }: ColumnItemPropsType) => {
  const { styles } = useStyles();
  return (
    <View style={[styles.columItem, globalStyles.alignCenter, globalStyles.justifyCenter, style]}>{children}</View>
  );
};
