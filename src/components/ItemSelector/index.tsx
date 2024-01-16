import { ScrollView, StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import globalStyles from 'styles';
import { useTranslation } from 'react-i18next';
import Grabber from 'assets/icon/Grabber.svg';
import StickIcon from 'assets/icon/StickIcon.svg';
import ModalBottom from 'components/ModalBottom';
import Icon from 'components/Icon';
import { useStyles } from './styles';
import useMemoizedStyles from 'hooks/useMemoizedStyles';

type ItemSelectorProps<T extends ItemSelectorConfig> = {
  value: keyof T;
  config: T;
  setValue: (v: keyof T) => void;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export type ItemSelectorConfig = {
  [key: string]: {
    key: string;
    label: string;
    abbr?: string;
    hide?: boolean;
  };
};

const ItemSelector = <T extends ItemSelectorConfig>({
  value,
  config,
  setValue,
  containerStyle,
  labelStyle,
}: ItemSelectorProps<T>) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  const [modalVisible, setModalVisible] = useState(false);
  const currentItem = config[value];
  const currentLabel = currentItem?.abbr ?? currentItem.label;
  const configList = useMemo(() => Object.values(config), [config]);

  const onPressFilter = useCallback(
    (newValue: keyof T) => () => {
      setValue(newValue);
      setModalVisible(false);
    },
    []
  );

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const memoizedStyles = useMemoizedStyles({
    container: [styles.container, containerStyle],
    label: [styles.currentText, labelStyle],
    placeholderLabel: [styles.placeholderText, labelStyle],
  });

  return (
    <TouchableOpacity style={memoizedStyles.container} onPress={openModal}>
      <Text allowFontScaling={false} style={currentItem.hide ? memoizedStyles.placeholderLabel : memoizedStyles.label}>
        {t(currentLabel)}
      </Text>
      <Icon name="arrow-down-2" size={24} color={dynamicColors.LIGHTTextBigTitle} />
      <ModalBottom setVisible={setModalVisible} visible={modalVisible}>
        <View style={styles.pickerContainer}>
          <View style={globalStyles.centered}>
            <Grabber />
          </View>
          <ScrollView style={styles.scrollViewContainer}>
            {configList.map((item, index) =>
              item.hide ? null : (
                <MemoItem
                  key={`ItemSelector_${index}_${item.label}`}
                  item={item.key}
                  value={value}
                  label={item.label}
                  onPressFilter={onPressFilter}
                />
              )
            )}
          </ScrollView>
        </View>
      </ModalBottom>
    </TouchableOpacity>
  );
};

export default memo(ItemSelector) as typeof ItemSelector;

type ItemProps<T extends ItemSelectorConfig> = {
  value: keyof T;
  item: keyof T;
  label: string;
  onPressFilter: (key: keyof T) => () => void;
};

const Item = <T extends ItemSelectorConfig>({ value, item, label, onPressFilter }: ItemProps<T>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const onPress = useCallback(onPressFilter(item), [item]);
  return (
    <TouchableOpacity style={styles.pickerItem} onPress={onPress}>
      <Text allowFontScaling={false} style={item === value ? styles.pickedText : styles.unPickedText}>
        {t(label)}
      </Text>
      {item === value && <StickIcon />}
    </TouchableOpacity>
  );
};

const MemoItem = memo(Item) as typeof Item;
