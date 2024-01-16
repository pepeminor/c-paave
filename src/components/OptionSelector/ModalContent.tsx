import React, { memo, useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseBottomModalProps } from 'components/BottomModal';
import { IProps, SelectorData } from './OptionSelector.type';
import globalStyles, { Colors, scaleSize, textStyles } from 'styles';
import CloseFilter from 'assets/icon/CloseFilter.svg';
import FilterSelectIcon from 'assets/icon/FilterSelectIcon.svg';
import { getStylesHook } from 'hooks/useStyles';

export interface ModalContentProps<T extends SelectorData> extends BaseBottomModalProps, IProps<T> {}

function AccountPickerModal<T extends SelectorData>({
  closeModal,
  value,
  setValue,
  listValue,
  modalTitle,
}: ModalContentProps<T>) {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const handleSelect = useCallback(
    (v: keyof T) => () => {
      setValue(v);
      closeModal();
    },
    [setValue, closeModal]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text allowFontScaling={false} style={styles.headerText}>
          {t(modalTitle)}
        </Text>
        <TouchableOpacity onPress={closeModal}>
          <CloseFilter />
        </TouchableOpacity>
      </View>
      {Object.keys(listValue).map((item, index) => (
        <TouchableOpacity key={index} onPress={handleSelect(item)} style={styles.itemContainer}>
          <Text
            style={[
              globalStyles.container,
              styles.filterTextValue,
              value === item ? styles.selectedValue : styles.unselectedValue,
            ]}
          >
            {t(listValue[item])}
          </Text>
          {value === item && <FilterSelectIcon height={scaleSize(11)} width={scaleSize(18)} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default memo(AccountPickerModal) as typeof AccountPickerModal;

const useStyles = getStylesHook({
  container: {
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    paddingBottom: 30,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  headerText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
    flex: 1,
    color: Colors.BlueNewColor,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  filterTextValue: {
    ...textStyles.fontSize16,
    ...textStyles.roboto400,
  },
  selectedValue: {
    color: Colors.MainBlue,
  },
  unselectedValue: {
    color: Colors.LIGHTTextTitle,
  },
});
