import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, ListRenderItemInfo } from 'react-native';
import CloseFilter from 'assets/icon/CloseFilter.svg';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import { useTranslation } from 'react-i18next';
import Modal from 'components/Modal';
import StickIcon from 'assets/icon/StickIcon.svg';
import { useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import { ISubAccount } from 'interfaces/common';
import { getStylesHook } from 'hooks/useStyles';

export interface IProps {
  isVisible: boolean;
  onCloseModal: () => void;
  selectedAcc?: ISubAccount;
  onPressAccount: (account: ISubAccount) => void;
}

const ModalAccountList = (props: IProps) => {
  const { isVisible, onCloseModal, onPressAccount, selectedAcc } = props;
  const { t } = useTranslation();
  const accountList = useSelector((state: IState) => state.accountList.KIS?.subAccounts);
  const { styles } = useStyles();
  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<ISubAccount>) => {
      const onPress = () => {
        onPressAccount(item);
      };

      const isSelected = item?.accountNumber === selectedAcc?.accountNumber;

      return (
        <TouchableOpacity key={index} onPress={onPress} style={styles.filterItemContainer}>
          <Text
            allowFontScaling={false}
            style={[styles.filterTextValue, isSelected ? styles.textSelected : styles.textUnselected]}
          >
            {item?.accountNumber}
          </Text>
          {isSelected && <StickIcon />}
        </TouchableOpacity>
      );
    },
    [onPressAccount, selectedAcc]
  );

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onCloseModal}
      childrenContent={
        <View style={styles.modalBackground}>
          <View style={[styles.modalContentContainer, Platform.OS === 'ios' ? styles.marginTop80 : styles.marginTop60]}>
            <View style={styles.modalTitle}>
              <Text allowFontScaling={false} style={styles.filterText}>
                {t('Account')}
              </Text>
              <TouchableOpacity style={styles.closeModalTextList} onPress={onCloseModal}>
                <CloseFilter height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
            </View>
            {accountList != null && (
              <FlatList
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                data={accountList}
                initialNumToRender={10}
              />
            )}
          </View>
          <TouchableOpacity style={globalStyles.invisibleBackground} onPress={onCloseModal} />
        </View>
      }
    />
  );
};

const useStyles = getStylesHook({
  modalBackground: {
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Colors.BACKGROUND_MODAL2,

    flex: 1,
  },
  modalContentContainer: {
    justifyContent: 'flex-end',
    backgroundColor: Colors.WHITE,
    borderTopStartRadius: 21,
    borderTopEndRadius: 21,
    width: 375,
    paddingBottom: 44,
  },
  marginTop60: {
    marginTop: 60,
  },
  marginTop80: {
    marginTop: 80,
  },
  modalTitle: {
    height: 56,
    marginTop: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 22,
    color: Colors.BlueNewColor,
    marginLeft: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  closeModalTextList: {
    marginRight: 16,
  },
  filterItemContainer: {
    paddingHorizontal: 16,
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterTextValue: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  textSelected: {
    color: Colors.BlueNewColor,
  },
  textUnselected: {
    color: Colors.LIGHTTextContent,
  },
});

export default memo(ModalAccountList);
