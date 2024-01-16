import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import React, { memo, useCallback } from 'react';
import useStyles from './styles';
import { formatNumber } from 'utils';
import { InputAccessoryViewID } from 'constants/enum';
import { ITempListPriceType } from '../TradeFormLayout/components/TradeForm/TradeForm.type';

interface IItemInputAccessoriesViewProp {
  item: ITempListPriceType;
  index: number;
  nativeID: InputAccessoryViewID;
  onPress({ item, nativeID }: { item: ITempListPriceType; nativeID: InputAccessoryViewID }): void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const ItemInputAccessoriesView = ({
  item,
  index,
  onPress,
  nativeID,
  containerStyle,
  textStyle,
}: IItemInputAccessoriesViewProp) => {
  const { styles } = useStyles();

  const touchableStyle = [styles.accessoriesViewEachItemContainer, index !== 0 && styles.marginleft6, containerStyle];

  const onPress2 = useCallback(() => onPress({ item, nativeID }), [item, nativeID]);

  return (
    <TouchableOpacity onPress={onPress2} style={touchableStyle}>
      <Text style={[styles.accessoriesViewEachItemText, textStyle]}>
        {!isNaN(Number(item.label)) ? formatNumber(item.label as unknown as number, 2) : item.label}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(ItemInputAccessoriesView);
