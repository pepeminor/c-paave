import React, { memo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import HeaderScreen from 'components/HeaderScreen';

// STYLES
import useStyles from './styles';
import globalStyles from 'styles';
import FilterSelector from 'screens/Discover/HotStock/FilterSelector';
import HotStockTableHeader from 'screens/Discover/HotStock/HotStockTableHeader';
import { useTranslation } from 'react-i18next';
import LoginRequired from 'components/LoginRequired';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import { RealtimeChannelDataType } from 'constants/enum';
import { useAppSelector } from 'hooks/useAppSelector';
import HotStockItemComponent from './HotStockItem.component';

const HotStock = (props: StackScreenProps<'HotStock'>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const hotStockSymbol = useAppSelector(state => state.HotStock.symbolList.data);
  useSubscribeSymbol(
    hotStockSymbol.map(item => item.stockCode),
    [RealtimeChannelDataType.QUOTE, RealtimeChannelDataType.QUOTE]
  );
  const hotStockSource = useAppSelector(state => state.HotStock.hotStockSource);

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={props.navigation.goBack} headerTitle={'15 Hot Stocks'} />
      <View style={styles.hotStockHeader}>
        <FilterSelector />
      </View>

      <View style={globalStyles.container}>
        <HotStockTableHeader />
        <ScrollView>
          {hotStockSymbol.map(item => (
            <HotStockItemComponent data={item} key={item.stockCode} />
          ))}
        </ScrollView>
        <LoginRequired showCondition={hotStockSource === 'KIS'} />
      </View>
      <View style={styles.hotStockNote}>
        <Text allowFontScaling={false} style={styles.hotStockNoteText}>
          {t(
            hotStockSource === 'Virtual'
              ? "Hot Stock's info only reflects matched value/ volume."
              : 'KIS matched info will be updated daily after 17:45!'
          )}
        </Text>
      </View>
    </View>
  );
};

export default memo(HotStock);
