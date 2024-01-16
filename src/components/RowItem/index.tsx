import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';

import useStyles from './styles';

interface IPropsRowItem {
  title: string;
  value: string | number;

  titleStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const RowItem = ({ title, value, containerStyle = {}, titleStyle = {}, valueStyle = {} }: IPropsRowItem) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  return (
    <View style={[styles.container, containerStyle]}>
      <Text allowFontScaling={false} style={[styles.title, titleStyle]}>
        {t(title)}
      </Text>
      <Text allowFontScaling={false} style={[styles.value, valueStyle]}>
        {value}
      </Text>
    </View>
  );
};

export default RowItem;
