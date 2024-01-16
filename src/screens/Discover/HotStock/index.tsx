import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import useStyles from '../styles';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { navigate } from 'utils';
import FilterSelector from './FilterSelector';
import HotStockTableHeader from './HotStockTableHeader';
import LoginRequired from 'components/LoginRequired';
import withMemo from 'HOC/withMemo';
import { useAppSelector } from 'hooks/useAppSelector';
import HotStockItemComponent from 'screens/HotStock/HotStockItem.component';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import { RealtimeChannelDataType } from 'constants/enum';
import { useDispatch } from 'react-redux';
import { HotStockAction, INIT_HOT_STOCK } from 'reduxs/HotStock';
import Icon from 'components/Icon';
import { ACCOUNT_TYPE } from 'global';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';

const HotStock = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { styles, dynamicColors } = useStyles();
  const hotStockSymbol = useAppSelector(state => state.HotStock.symbolList.data.slice(0, INIT_HOT_STOCK));
  useSubscribeSymbol(
    hotStockSymbol.map(item => item.stockCode),
    [RealtimeChannelDataType.QUOTE, RealtimeChannelDataType.BID_OFFER]
  );
  const hotStockSource = useAppSelector(state => state.HotStock.hotStockSource);
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);

  const onPressSeeAllHotStock = () => {
    dispatch(HotStockAction.updateHotStockParams({ hotStockPageSize: 15 }));
    navigate({ key: ScreenNames.HotStock });
    track(AMPLITUDE_EVENT.VIEW_HOT_STOCK_DETAILS);
  };

  useEffect(() => {
    const currentAccountType = selectedAccountType === ACCOUNT_TYPE.VIRTUAL ? 'Virtual' : selectedAccountType;

    if (currentAccountType !== ACCOUNT_TYPE.DEMO && currentAccountType !== hotStockSource) {
      dispatch(
        HotStockAction.updateHotStockParams({
          hotStockSource: currentAccountType,
        })
      );
    }
  }, [selectedAccountType]);

  return (
    <View>
      <View style={styles.hotStockTitleContainer}>
        <Text allowFontScaling={false} style={styles.hotStockText}>
          {t('Hot Stock')}
        </Text>
        <TouchableOpacity style={styles.hotSeeAllStockContainer} onPress={onPressSeeAllHotStock}>
          <Text allowFontScaling={false} style={styles.hotSeeAllStockText}>
            {t('See all')}
          </Text>
          <Icon name={'arrow-right-double'} color={dynamicColors.BlueNewColor} size={16} />
        </TouchableOpacity>
      </View>
      <FilterSelector />
      <View style={styles.tableContainer}>
        <HotStockTableHeader />
        <ScrollView style={styles.containerHotStock}>
          {hotStockSymbol.map(item => (
            <HotStockItemComponent data={item} key={item.stockCode} />
          ))}
        </ScrollView>
        <LoginRequired showCondition={hotStockSource === 'KIS'} />
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
    </View>
  );
};

export default withMemo(HotStock);
