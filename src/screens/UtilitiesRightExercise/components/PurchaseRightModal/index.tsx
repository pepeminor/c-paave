import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import React, { memo, ReactElement, useEffect, useState } from 'react';
import globalStyles from 'styles';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import TextInputComponent from 'components/TextInput';
import Modal from 'components/Modal';
import { formatNumber, formatDateToString, formatStringToDate } from 'utils';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks';
import { getEntitlementStockList, registerExercise, setItemPurchaseRight } from 'reduxs/global-actions';
import useKisOTP from 'hooks/useKisOTP';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type IDataRow = {
  title: string;
  value: string;
};

const parseDate = (dateString: string) => {
  if (!dateString) return formatDateToString(new Date(), 'dd/MM/yyyy')!;
  const result = formatStringToDate(dateString, dateString.length === 8 ? 'yyyyMMdd' : 'yyyyMMddHHmmss');
  return formatDateToString(result, 'dd/MM/yyyy')!;
};

const PurchaseRightModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const itemPurchaseRight = useAppSelector(state => state.registerExercise.itemPurchaseRight);
  const accountNumber = useAppSelector(state => state.selectedAccount.selectedSubAccount?.accountNumber);
  const entitlementStockList = useAppSelector(state => state.registerExercise.entitlementStockList);
  const numberAvailableQuantity = itemPurchaseRight?.availableRightQty ?? 0;

  const [registerQtt, setRegisterQtt] = useState(0);
  const [registerNumberError, setRegisterNumberError] = useState(false);
  const [registerNumberErrorContent, setRegisterNumberErrorContent] = useState('');

  useEffect(() => {
    if (itemPurchaseRight == null || accountNumber == null) return;
    dispatch(
      getEntitlementStockList({
        accountNumber: accountNumber,
        entitlementID: itemPurchaseRight.entitlementId,
      })
    );
  }, [itemPurchaseRight]);

  const submit = () => {
    accountNumber != null &&
      itemPurchaseRight != null &&
      entitlementStockList != null &&
      dispatch(
        registerExercise({
          accountNumber: accountNumber,
          entitlementId: itemPurchaseRight.entitlementId,
          locationId: itemPurchaseRight.locationID,
          marketId: itemPurchaseRight.marketID,
          registerQuantity: registerQtt.toString(),
          bankAccountNumber: entitlementStockList?.bankAccountNumber,
          symbolCode: itemPurchaseRight.symbol,
          interfaceSeq: entitlementStockList.interfaceSeq,
        })
      );
  };

  const closeModal = () => {
    setRegisterQtt(0);
    setRegisterNumberError(false);
    setRegisterNumberErrorContent('');
    dispatch(setItemPurchaseRight(null));
  };

  const validateRegisterNumber = (value?: number): boolean => {
    if (value == null || value === 0) {
      setRegisterNumberError(true);
      return false;
    } else if (value > numberAvailableQuantity) {
      setRegisterNumberError(true);
      setRegisterNumberErrorContent(t('OVER_AVAILABLE'));
      return false;
    }
    setRegisterNumberError(false);
    setRegisterNumberErrorContent('');
    return true;
  };

  const onChangeRegisterNumber = (value: string) => {
    const newAmount = parseInt(value.replace(/,/g, ''));
    if (!isNaN(newAmount)) {
      setRegisterQtt(newAmount);
      validateRegisterNumber(newAmount);
    } else {
      setRegisterQtt(0);
      setRegisterNumberError(false);
    }
  };

  const [ModalOTP, handleConfirm, handleCancel, isSubmitBtnDisabled, isFormDisabled] = useKisOTP({
    visible: itemPurchaseRight != null,
    submitAction: submit,
    hideModal: closeModal,
  });

  const dataRenderRow: IDataRow[] =
    itemPurchaseRight != null
      ? [
          {
            title: 'Close Date',
            value: parseDate(itemPurchaseRight.closedDate),
          },
          {
            title: 'Last Register Date',
            value: parseDate(itemPurchaseRight.lastRegistrationDate),
          },
          {
            title: 'Quantity',
            value: formatNumber(itemPurchaseRight.qtyAtClosedDate),
          },
          {
            title: 'Available Quantity',
            value: formatNumber(itemPurchaseRight.availableRightQty),
          },
          {
            title: 'Transaction Amount',
            value: formatNumber(itemPurchaseRight.amount),
          },
        ]
      : [];

  const renderRow = (label: string, value: string, index?: number) => (
    <View style={[styles.containerFlat, globalStyles.borderBottom1]} key={index}>
      <Text allowFontScaling={false} style={[styles.title]}>
        {t(label)}
      </Text>
      <Text allowFontScaling={false} style={[styles.value]}>
        {value}
      </Text>
    </View>
  );

  const platformWrapperScroll = (content: ReactElement) => {
    if (Platform.OS === 'android') {
      return (
        <ScrollView contentContainerStyle={[styles.scrollView]} showsVerticalScrollIndicator={false}>
          {content}
        </ScrollView>
      );
    } else {
      return (
        <KeyboardAwareScrollView contentContainerStyle={[styles.scrollView]} showsVerticalScrollIndicator={false}>
          {content}
        </KeyboardAwareScrollView>
      );
    }
  };

  return (
    <Modal
      visible={itemPurchaseRight != null}
      onRequestClose={handleCancel}
      childrenContent={
        itemPurchaseRight != null ? (
          <View
            style={[globalStyles.container, styles.modalContainer]}
            pointerEvents={isFormDisabled ? 'none' : 'auto'}
          >
            {platformWrapperScroll(
              <View style={[globalStyles.justifyCenter, styles.modalContentContainer]}>
                <View style={[globalStyles.centered, styles.modalTitle]}>
                  <Text allowFontScaling={false} style={[styles.modalTitleText]}>
                    {t('Stock Purchase Right')}
                  </Text>
                </View>
                <View style={[styles.editMarginBottom]}>
                  <View style={[styles.containerFlat, globalStyles.borderBottom1]}>
                    <Text allowFontScaling={false} style={[styles.title]}>
                      {t('Symbol')}
                    </Text>
                    <Text allowFontScaling={false} style={[styles.titleSymbol]}>
                      {itemPurchaseRight?.symbol}
                    </Text>
                  </View>
                  {dataRenderRow.map((item, index) => renderRow(item.title, item.value, index))}
                  <View
                    style={[
                      globalStyles.flexDirectionRow,
                      globalStyles.alignCenter,
                      styles.containerFlat,
                      globalStyles.borderBottom1,
                      styles.pV5,
                    ]}
                  >
                    <Text allowFontScaling={false} style={[styles.title]}>
                      {t('Register Quantity')}
                    </Text>
                    <TextInputComponent
                      value={registerQtt > 0 ? formatNumber(registerQtt) : ''}
                      onChangeText={onChangeRegisterNumber}
                      wholeContainerStyle={[styles.wholeContainerContentStyle]}
                      textInputContainerStyle={[globalStyles.container, globalStyles.justifyCenter]}
                      textInputStyle={[
                        styles.textInputRegisterNumberStyle,
                        registerNumberError && styles.errorTransferQttStyle,
                      ]}
                      textAlignVertical="center"
                      textAlign="right"
                      keyboardType="number-pad"
                      error={registerNumberError}
                      errorContent={registerNumberErrorContent}
                    />
                  </View>
                  {renderRow('Offering Price', formatNumber(itemPurchaseRight.offeringPrice))}
                  {renderRow('Registered Quantity', formatNumber(itemPurchaseRight.registeredQty))}
                </View>
                {ModalOTP != null && <View style={styles.otpContainer}>{ModalOTP}</View>}
                <View style={[globalStyles.justifyCenter, styles.modalActionGroup]}>
                  <TouchableOpacity
                    disabled={registerQtt === 0 || registerQtt > numberAvailableQuantity || isSubmitBtnDisabled}
                    style={[
                      globalStyles.centered,
                      styles.executeFormButton,
                      registerQtt === 0 || registerQtt > numberAvailableQuantity || isSubmitBtnDisabled
                        ? styles.executeFormDisableButton
                        : {},
                    ]}
                    onPress={handleConfirm}
                  >
                    <Text allowFontScaling={false} style={styles.executeFormButtonText}>{`Confirm`}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[globalStyles.centered, styles.modalCancelButton]} onPress={handleCancel}>
                    <Text allowFontScaling={false} style={styles.cancelFormButtonText}>{`Cancel`}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <TouchableOpacity style={globalStyles.invisibleBackground} onPress={handleCancel} />
          </View>
        ) : null
      }
    />
  );
};

export default memo(PurchaseRightModal);
