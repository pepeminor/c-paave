import React from 'react';
import withMemo from 'HOC/withMemo';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { useStyles } from './styles';

type EmptyCell = {
  containerStyles?: StyleProp<ViewStyle>;
};

export const EmptyCell = withMemo(({ containerStyles }: EmptyCell) => {
  const { styles } = useStyles();
  return (
    <View style={containerStyles}>
      <Text allowFontScaling={false} style={styles.stringText}>
        -
      </Text>
    </View>
  );
});
