import { View } from 'react-native';
import React, { memo } from 'react';
import { useStyles } from './styles';
import { ForeignTradingHeader, FunnelChart } from 'screens/ForeignTrading';
import LoginRequired from 'components/LoginRequired';

const ForeignTrading = () => {
  const { styles } = useStyles();
  return (
    <View style={styles.container}>
      <ForeignTradingHeader />
      <FunnelChart />
      <LoginRequired />
    </View>
  );
};

export default memo(ForeignTrading);
