import React, { memo, useCallback } from 'react';
import { InputAccessoryView, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import HideKeyboard from 'assets/icon/HideKeyboard.svg';
import { InputAccessoryViewID } from 'constants/enum';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import ItemInputAccessoriesView from '../ItemInputAccessoriesView';
import { Trade_GetLabelName } from 'screens/TradeScreen/TradeScreen.helper';
import { ITempListQuantityType, tempListQuantity } from 'screens/TradeScreen/TradeScreen.type';
import { ITempListPriceType } from '../TradeFormLayout/components/TradeForm/TradeForm.type';

interface IInputAccessoryViewComponentProp {
  nativeID: InputAccessoryViewID;
  priceAccessoriesData: ITempListPriceType[];
  onPress({ item, nativeID }: { item: ITempListPriceType; nativeID: InputAccessoryViewID }): void;
}

const InputAccessoryViewComponent_style1 = [
  globalStyles.container,
  globalStyles.fillHeight,
  globalStyles.flexDirectionRow,
  globalStyles.alignCenter,
];

const InputAccessoryViewComponent = ({ nativeID, priceAccessoriesData, onPress }: IInputAccessoryViewComponentProp) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const onPress2 = useCallback(
    (item: ITempListQuantityType | ITempListPriceType, nativeID: InputAccessoryViewID) => () =>
      onPress({ item, nativeID }),
    [onPress]
  );

  return (
    <InputAccessoryView nativeID={nativeID}>
      <View style={styles.keyboardSuggestion}>
        <Text style={styles.inputAccessoriesText}>{t(Trade_GetLabelName(nativeID))}</Text>
        <View style={InputAccessoryViewComponent_style1}>
          {nativeID === InputAccessoryViewID.QUANTITY
            ? tempListQuantity.map((item, index) => {
                return (
                  <ItemInputAccessoriesView
                    key={`ItemInputAccessoriesView_listQuantity_${index}_${item.value}`}
                    item={item}
                    index={index}
                    nativeID={nativeID}
                    onPress={onPress2(item, nativeID)}
                  />
                );
              })
            : priceAccessoriesData.map((item, index) => {
                return (
                  <ItemInputAccessoriesView
                    key={`ItemInputAccessoriesView_priceAccessoriesData_${index}_${item.value}`}
                    item={item}
                    index={index}
                    nativeID={nativeID}
                    onPress={onPress2(item, nativeID)}
                  />
                );
              })}
        </View>
        <View style={styles.width12} />
        <TouchableOpacity onPress={Keyboard.dismiss} style={styles.paddingLeft16}>
          <HideKeyboard width={scaleSize(24)} height={scaleSize(24)} />
        </TouchableOpacity>
      </View>
    </InputAccessoryView>
  );
};

export default memo(InputAccessoryViewComponent);
