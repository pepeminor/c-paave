import React, { PropsWithChildren } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import globalStyles from 'styles';
import useStyles from './styles';

interface ColumnItemPropsType {
  style?: StyleProp<ViewStyle>;
}

export const ColumnItem = ({ children, style = {} }: PropsWithChildren<ColumnItemPropsType>) => {
  const { styles } = useStyles();
  return (
    <View style={[styles.columItem, globalStyles.alignCenter, globalStyles.justifyCenter, style]}>{children}</View>
  );
};
