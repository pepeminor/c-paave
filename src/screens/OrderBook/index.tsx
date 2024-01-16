import React, { memo, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import ConditionOrder from 'components/OrderBook/ConditionOrder';
import { OrderBookScreenInitOption } from 'global';
import useStyles from './styles';
import HeaderScreen from 'components/HeaderScreen';
import {
  updateActiveFilter,
  updateHistoryFilter,
  updateCondOrderFilter,
  resetFilter,
  resetOrderBook,
} from 'reduxs/global-actions';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks';
import { CancelButton, FilterSelector, OrderBookModal, OrderbookTab } from './components';
import { FilterOption, OrderBookSearchTextContext } from './constants';

const OrderBook = (props: StackScreenProps<'OrderBook'>) => {
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const optionSelecting = useAppSelector(state => state.orderBookScreenOption);
  const orderBookFilter = useAppSelector(state => state.orderBookFilter);
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);
  const [searchSymbol, setSearchSymbol] = useState('');

  const currentFilter = useMemo(() => {
    switch (optionSelecting) {
      case OrderBookScreenInitOption.ORDER_BOOK:
        return orderBookFilter.activeOrderFilter;
      case OrderBookScreenInitOption.ORDER_HISTORY:
        return orderBookFilter.orderHistoryFilter;
      case OrderBookScreenInitOption.CONDITION_ORDER:
        return orderBookFilter.conditionOrderFilter;
      default:
        return {};
    }
  }, [optionSelecting, orderBookFilter]);

  const setCurrentFilter = useMemo((): ((filterOption: FilterOption) => void) => {
    switch (optionSelecting) {
      case OrderBookScreenInitOption.ORDER_BOOK:
        return (filterOption: FilterOption) => dispatch(updateActiveFilter(filterOption));
      case OrderBookScreenInitOption.ORDER_HISTORY:
        return (filterOption: FilterOption) => dispatch(updateHistoryFilter(filterOption));
      case OrderBookScreenInitOption.CONDITION_ORDER:
        return (filterOption: FilterOption) => dispatch(updateCondOrderFilter(filterOption));
      default:
        return () => true;
    }
  }, [optionSelecting]);

  useEffect(() => {
    return () => {
      dispatch(resetFilter(null));
      dispatch(resetOrderBook(null));
    };
  }, [selectedAccountType]);

  return (
    <View style={styles.container}>
      <OrderBookSearchTextContext.Provider value={{ value: searchSymbol, setValue: setSearchSymbol }}>
        <HeaderScreen
          leftButtonIcon={true}
          goBackAction={props.navigation.goBack}
          headerTitle={'Order Book'}
          rightButtonListIcon={[<CancelButton />]}
          subAccountVisible={true}
        />
        <OrderbookTab />
        <FilterSelector currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
        <ConditionOrder type={optionSelecting} filterOption={currentFilter} setCurrentFilter={setCurrentFilter} />
        <OrderBookModal />
      </OrderBookSearchTextContext.Provider>
    </View>
  );
};

export default memo(OrderBook);
