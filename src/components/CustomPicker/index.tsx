import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Modal, ViewStyle, StyleProp } from 'react-native';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import React, { memo, useState } from 'react';
import useStyles from './styles';
import FilterSelectIcon from 'assets/icon/FilterSelectIcon.svg';

// ICONS
import CloseFilter from 'assets/icon/CloseFilter.svg';

export interface IItemList {
  label: string;
  value: string;
  default?: boolean;
}

export interface ICustomTabProps {
  itemList: IItemList[];
  label: string;
  labelIcon?: Element;
  onChange?: (item: IItemList) => void;
  touchAbleWidth?: number;
  touchAbleHeight?: number;
  borderWidth?: number;
  borderRadius?: number;
  borderColor?: string;
  backgroundColor?: string;
  animationType?: 'none' | 'slide' | 'fade';
  modalAlign?: 'bottom' | 'center';
  modalStyle?: StyleProp<ViewStyle>;
  modalContentContainerStyle?: StyleProp<ViewStyle>;
  closeButton?: boolean;
  chosenValue?: string;
}

const CustomPicker = (props: ICustomTabProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectItem, setSelectItem] = useState<IItemList | object>({});

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleChange = (item: IItemList) => {
    setSelectItem(item);
    if (props.onChange) props.onChange(item);
    setModalVisible(false);
  };

  const itemListRender = props.itemList.map((item, index) => (
    <TouchableOpacity
      onPress={() => handleChange(item)}
      key={index}
      style={[
        globalStyles.flexDirectionRow,
        globalStyles.alignCenter,
        styles.Item,
        index < props.itemList.length - 1 && styles.ItemBorder,
      ]}
    >
      <View style={[globalStyles.container, globalStyles.justifyCenter]}>
        <Text
          allowFontScaling={false}
          style={[styles.Label, props.chosenValue === item.value ? styles.selectedLabel : {}]}
        >
          {t(item.label) || ''}
        </Text>
      </View>
      {props.chosenValue === item.value && <FilterSelectIcon height={scaleSize(11)} width={scaleSize(18)} />}
    </TouchableOpacity>
  ));

  return (
    <TouchableOpacity
      onPress={openModal}
      style={[
        globalStyles.flexDirectionRow,
        globalStyles.alignCenter,
        styles.touchAbleStyle,
        {
          width: scaleSize(props.touchAbleWidth || 178),
          height: scaleSize(props.touchAbleHeight || 44),
          backgroundColor: props.backgroundColor || Colors.LIGHTTitleTable,
          borderWidth: props.borderWidth,
          borderRadius: props.borderRadius,
          borderColor: props.borderColor,
        },
      ]}
    >
      <View
        style={[
          globalStyles.container,
          globalStyles.centered,
          globalStyles.flexDirectionRow,
          globalStyles.justifySpaceBetween,
          styles.touchAbleLabelStyle,
        ]}
      >
        <Text allowFontScaling={false} style={[styles.CustomPickerText]}>
          {Object.entries(selectItem).length > 0
            ? t((selectItem as IItemList).label) || ''
            : props.itemList.filter(item => item.default)[0]
            ? t(props.itemList.filter(item => item.default)[0].label) || ''
            : props.itemList != null
            ? t(props.itemList[0].label)
            : ''}
        </Text>
        {props.labelIcon}
      </View>
      <Modal
        animationType={props.animationType || 'fade'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View
          style={[
            globalStyles.container,
            globalStyles.flexDirectionRow,
            { backgroundColor: Colors.BACKGROUND_MODAL },
            props.modalAlign === 'bottom' ? globalStyles.alignEnd : globalStyles.centered,
            props.modalStyle,
          ]}
        >
          <View style={[globalStyles.justifyCenter, styles.modalContentContainer, props.modalContentContainerStyle]}>
            <View
              style={[
                globalStyles.centered,
                styles.modalTitle,
                props.closeButton
                  ? [globalStyles.flexDirectionRow, globalStyles.justifySpaceBetween, styles.closeButtonContainer]
                  : {},
              ]}
            >
              <Text allowFontScaling={false} style={[styles.modalTitleText]}>
                {t(props.label || '')}
              </Text>
              {props.closeButton && (
                <TouchableOpacity onPress={closeModal}>
                  <CloseFilter height={scaleSize(24)} width={scaleSize(24)} />
                </TouchableOpacity>
              )}
            </View>
            {itemListRender}
          </View>
          <TouchableOpacity style={globalStyles.invisibleBackground} onPress={closeModal} />
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default memo(CustomPicker);
