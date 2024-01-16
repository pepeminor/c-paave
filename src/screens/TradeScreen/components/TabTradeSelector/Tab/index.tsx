import { View, Text, TouchableOpacity } from 'react-native';
import React, { memo, useCallback } from 'react';
import globalStyles from 'styles';
import useStyles from './styles';
import { ITradeTabOption, OrderBookScreenInitOption } from 'global';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setTradeTabOption } from 'reduxs/global-actions';
import { setOrderBookScreenOption } from 'reduxs/global-actions/OrderBook';

interface ITabProp {
  optionSelecting: ITradeTabOption;
}

const Tab = ({ optionSelecting }: ITabProp) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const onSelectOptionPortfolio = useCallback(() => {
    if (optionSelecting !== ITradeTabOption.PORTFOLIO) {
      dispatch(setTradeTabOption(ITradeTabOption.PORTFOLIO));
    }
  }, [optionSelecting]);

  const onSelectOptionOrderBook = useCallback(() => {
    if (optionSelecting !== ITradeTabOption.ORDER_BOOK) {
      dispatch(setTradeTabOption(ITradeTabOption.ORDER_BOOK));
      dispatch(setOrderBookScreenOption(OrderBookScreenInitOption.ORDER_BOOK));
    }
  }, [optionSelecting]);

  const onSelectOptionConditionOrder = useCallback(() => {
    if (optionSelecting !== ITradeTabOption.CONDITION_ORDER) {
      dispatch(setTradeTabOption(ITradeTabOption.CONDITION_ORDER));
      dispatch(setOrderBookScreenOption(OrderBookScreenInitOption.CONDITION_ORDER));
    }
  }, [optionSelecting]);

  return (
    <View style={styles.screenOption}>
      <TouchableOpacity
        onPress={onSelectOptionPortfolio}
        style={[
          globalStyles.centered,
          globalStyles.container,
          styles.optionContainer,
          optionSelecting === ITradeTabOption.PORTFOLIO && styles.optionContainerSelected,
        ]}
      >
        <Text style={optionSelecting === ITradeTabOption.PORTFOLIO ? styles.selectedText : styles.unselectedText}>
          {t('PORTFOLIO')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onSelectOptionOrderBook}
        style={[
          globalStyles.centered,
          globalStyles.container,
          styles.optionContainer,
          optionSelecting === ITradeTabOption.ORDER_BOOK && styles.optionContainerSelected,
        ]}
      >
        <Text style={optionSelecting !== ITradeTabOption.ORDER_BOOK ? styles.unselectedText : styles.selectedText}>
          {t('Today Order')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onSelectOptionConditionOrder}
        style={[
          globalStyles.centered,
          globalStyles.container,
          styles.optionContainer,
          optionSelecting === ITradeTabOption.CONDITION_ORDER && styles.optionContainerSelected,
        ]}
      >
        <Text style={optionSelecting === ITradeTabOption.CONDITION_ORDER ? styles.selectedText : styles.unselectedText}>
          {t('Cond. Order')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(Tab);
