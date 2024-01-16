import { RefreshControl, ScrollView, View } from 'react-native';
import React, { memo } from 'react';
import { StackScreenProps } from 'screens/RootNavigation';
import { useStyles } from './styles';
import HeaderScreen from 'components/HeaderScreen';
import { ForeignTradingHeader, FunnelChart } from './components';
import { StockList } from './components/StockList';
import { useDispatch } from 'react-redux';
import { ForeignTradingActions } from 'reduxs';

export const ForeignTradingScreen = memo(({ navigation }: StackScreenProps<'ForeignTrading'>) => {
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const onRefresh = () => {
    dispatch(
      ForeignTradingActions.getData({
        marketType: 'ALL',
        refresh: true,
      })
    );
  };

  return (
    <View style={styles.container}>
      <HeaderScreen headerTitle={'Foreign Trading'} goBackAction={navigation.goBack} leftButtonIcon={true} />
      <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}>
        <ForeignTradingHeader showTitle={false} />
        <FunnelChart />
        <StockList />
      </ScrollView>
    </View>
  );
});
