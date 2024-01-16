import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, memo } from 'react';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import StickIcon from 'assets/icon/StickIcon.svg';

type LeaderboardAccountProps = {
  data: string[];
  onOptionChange: (option: string) => void;
};

const LeaderboardAccount = ({ data, onOptionChange }: LeaderboardAccountProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const [current, _setCurrent] = useState(data.length ? data[0] : '');

  const setCurrent = (option: string) => {
    return () => {
      _setCurrent(option);
      onOptionChange(option);
    };
  };

  const renderItem = (option: string) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={setCurrent(option)}>
        <Text allowFontScaling={false} style={styles.textStyle}>
          {t(option)}
        </Text>
        {option === current && <StickIcon />}
      </TouchableOpacity>
    );
  };
  const renderSeparator = () => <View style={styles.separator} />;
  return (
    <View style={styles.container}>
      {data.map((option, index) => {
        return (
          <View key={index}>
            {renderItem(option)}
            {index !== data.length - 1 && renderSeparator()}
          </View>
        );
      })}
    </View>
  );
};

export default memo(LeaderboardAccount);
