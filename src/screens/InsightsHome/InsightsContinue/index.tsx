import React from 'react';
import { View, Text } from 'react-native';
import globalStyles from 'styles';
import useStyles from './styles';

const Continue = () => {
  const { styles } = useStyles();
  return (
    <View style={styles.container}>
      <View style={[globalStyles.justifyCenter, styles.containerTitle]}>
        <Text style={[styles.TextTitle]}>Continue</Text>
      </View>
      <View
        style={[
          globalStyles.centered,
          globalStyles.flexDirectionRow,
          globalStyles.justifySpaceBetween,
          styles.containerContent,
        ]}
      >
        <View style={[styles.ViewVideo]} />
        <Text style={[styles.TextContentVideo]}>
          Autopsy confirms GAby Petio's remains and rules cause of death to be homicide
        </Text>
      </View>
    </View>
  );
};

export default Continue;
