import React from 'react';
import { TouchableOpacity } from 'react-native';
import useStyles from './styles';
import globalStyles from 'styles';

export interface ITradingAccountCardProps {
  goOpenCard(): void;
}

const TradingAccountCard = ({ goOpenCard }: ITradingAccountCardProps) => {
  const { styles } = useStyles();
  return (
    <TouchableOpacity
      onPress={goOpenCard}
      style={[styles.boxTradingReal, styles.shadow, globalStyles.centered]}
    ></TouchableOpacity>
  );
};

export default TradingAccountCard;
