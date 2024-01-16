import React from 'react';
import { View } from 'react-native';
import withMemo from 'HOC/withMemo';
import HeaderScreen from 'components/HeaderScreen';
import { useStyles } from './styles';
import Top100Stocks from 'components/Top100Stocks';
import { StackScreenProps } from 'screens/RootNavigation';

const Top100StocksScreen = ({ navigation }: StackScreenProps<'Top100StocksScreen'>) => {
  const { styles } = useStyles();
  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={navigation.goBack} headerTitle={'Top 100 Ranked List'} />
      <Top100Stocks />
    </View>
  );
};

export default withMemo(Top100StocksScreen);
