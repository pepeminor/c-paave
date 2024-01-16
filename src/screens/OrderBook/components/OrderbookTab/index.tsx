import React, { memo, useCallback, useMemo } from 'react';
import useStyles from './styles';
import { OrderBookScreenInitOption } from 'global';
import { useDispatch } from 'react-redux';
import { setOrderBookScreenOption } from 'reduxs/global-actions';
import { useAppSelector } from 'hooks';
import TabSelector from 'components/TabSelector';

const OrderBookTab = {
  ORDER_BOOK: 'Today Order',
  ORDER_HISTORY: 'Order Hist.',
  CONDITION_ORDER: 'Cond. Order',
} as const;
type OrderBookTab = keyof typeof OrderBookTab;

export const OrderbookTab = memo(() => {
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const optionSelecting = useAppSelector(state => state.orderBookScreenOption);

  const orderbookTab: OrderBookTab = useMemo(() => {
    switch (optionSelecting) {
      case OrderBookScreenInitOption.ORDER_BOOK:
      case OrderBookScreenInitOption.CANCEL_ORDER_BOOK:
        return 'ORDER_BOOK';
      case OrderBookScreenInitOption.ORDER_HISTORY:
        return 'ORDER_HISTORY';
      case OrderBookScreenInitOption.CONDITION_ORDER:
      case OrderBookScreenInitOption.CANCEL_CONDITION_ORDER:
        return 'CONDITION_ORDER';
      default:
        return 'ORDER_BOOK';
    }
  }, [optionSelecting]);

  const onTabPressed = useCallback((tab: OrderBookTab) => {
    switch (tab) {
      case 'ORDER_BOOK':
        dispatch(setOrderBookScreenOption(OrderBookScreenInitOption.ORDER_BOOK));
        break;
      case 'ORDER_HISTORY':
        dispatch(setOrderBookScreenOption(OrderBookScreenInitOption.ORDER_HISTORY));
        break;
      case 'CONDITION_ORDER':
        dispatch(setOrderBookScreenOption(OrderBookScreenInitOption.CONDITION_ORDER));
        break;
    }
  }, []);

  return (
    <TabSelector
      value={orderbookTab}
      setValue={onTabPressed}
      listValue={OrderBookTab}
      selectedContainer={styles.tabSelectedItem}
      style={styles.tabContainer}
    />
  );
});
