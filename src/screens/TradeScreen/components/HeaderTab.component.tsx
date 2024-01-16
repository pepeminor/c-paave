import { View } from 'react-native';
import React, { useCallback } from 'react';
import { ACCOUNT_TYPE, OrderBookScreenInitOption } from 'global';
import { useDispatch } from 'react-redux';
import { setOrderBookScreenOption } from 'reduxs/global-actions/OrderBook';
import { useAppSelector } from 'hooks/useAppSelector';
import { navigate } from 'utils';
import { showNonLoginModal } from 'reduxs/global-actions/NonLogin';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import Tab from './TabTradeSelector/Tab';
import OrderBookButton from './TabTradeSelector/OrderBookButton';
import { lightColors } from 'styles';

const HeaderTab = () => {
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const optionSelecting = useAppSelector(state => state.tradeTabOption);
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);

  const goToOrderBook = useCallback(() => {
    if (selectedAccountType === ACCOUNT_TYPE.DEMO) {
      dispatch(showNonLoginModal());
      return;
    }
    dispatch(setOrderBookScreenOption(OrderBookScreenInitOption.ORDER_BOOK));
    navigate({
      key: 'OrderBook',
    });
  }, []);

  return (
    <View style={styles.containerTab}>
      <Tab optionSelecting={optionSelecting} />
      <OrderBookButton goToOrderBook={goToOrderBook} />
    </View>
  );
};

const useStyles = getStylesHook({
  containerTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: lightColors.WHITE,
  },
});

export default withMemo(HeaderTab);
