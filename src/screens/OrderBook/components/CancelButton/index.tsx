import { Text, TouchableOpacity } from 'react-native';
import React, { memo, useCallback } from 'react';
import { OrderBookScreenInitOption } from 'global';
import { useAppSelector } from 'hooks';
import useStyles from '../../styles';
import { useTranslation } from 'react-i18next';
import { setOrderBookCancelMode } from 'reduxs/global-actions';
import { useDispatch } from 'react-redux';

export const CancelButton = memo(() => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const optionSelecting = useAppSelector(state => state.orderBookScreenOption);
  const cancelMode = useAppSelector(state => state.orderBookCancelMode);

  const onChangeCancelMode = useCallback(() => {
    dispatch(setOrderBookCancelMode(!cancelMode));
  }, [cancelMode]);

  return optionSelecting === OrderBookScreenInitOption.ORDER_BOOK ||
    optionSelecting === OrderBookScreenInitOption.CONDITION_ORDER ? (
    <TouchableOpacity onPress={onChangeCancelMode}>
      <Text allowFontScaling={false} style={styles.cancelText}>
        {cancelMode ? `${t('Cancel')}` : `${t('Cancel Order')}`}
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity>
      <Text allowFontScaling={false} style={styles.cancelText}>
        {`       `}
      </Text>
    </TouchableOpacity>
  );
});
