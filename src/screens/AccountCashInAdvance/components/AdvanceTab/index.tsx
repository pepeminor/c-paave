import { View, Text, TouchableOpacity, Keyboard, ScrollView, Platform } from 'react-native';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import globalStyles from 'styles';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import TextInputComponent from 'components/TextInput';
import { formatNumber } from 'utils';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks';
import RowItem from 'components/RowItem';
import { getLocalAdvanceCreation, submitAdvancePaymentCreation } from 'reduxs/global-actions';
import useUpdateEffect from 'hooks/useUpdateEffect';
import ModalOrder from 'components/ModalOrder';
import useKisOTP from 'hooks/useKisOTP';
import { EQUITY_RESET_CASH_ADVANCE_STATE } from 'reduxs/actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const MIN_FEE = 30000;

const AdvanceTab = () => {
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const [visible, setVisible] = useState<boolean>(false);

  const accountNo = useAppSelector(state => state.selectedAccount.selectedSubAccount?.accountNumber);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const submitAdvancePaymentCreationResult = useAppSelector(state => state.cashInAdvance.submitAdvancePaymentCreation);
  const localAdvanceCreation = useAppSelector(state => state.cashInAdvance.localAdvanceCreation);

  const currentAmount = useRef(0);

  const availableAmount = localAdvanceCreation?.availableCashAdvance ?? -1;
  const fee = localAdvanceCreation?.maxFee ?? 0;

  useEffect(() => {
    dispatch(getLocalAdvanceCreation({ accountNo: accountNo ?? '' }));
    return () => {
      dispatch({ type: EQUITY_RESET_CASH_ADVANCE_STATE });
    };
  }, [accountNo]);

  const showModal = useCallback((amount: number) => {
    currentAmount.current = amount;
    setVisible(true);
  }, []);

  const hideModal = () => setVisible(false);

  const submitForm = () => {
    Keyboard.dismiss();
    dispatch(
      submitAdvancePaymentCreation({
        accountNo: selectedAccount.selectedSubAccount?.accountNumber ?? '-',
        submitAmount: currentAmount.current,
      })
    );
  };

  const [ModalOTP, handleConfirm, handleCancel, isSubmitBtnDisabled, isFormDisabled] = useKisOTP({
    visible,
    submitAction: submitForm,
    hideModal,
  });

  useUpdateEffect(() => {
    if (submitAdvancePaymentCreationResult != null) {
      hideModal();
    }
    if (submitAdvancePaymentCreationResult === true) {
      dispatch(getLocalAdvanceCreation({ accountNo: accountNo ?? '' }));
    }
  }, [submitAdvancePaymentCreationResult]);

  return (
    <>
      <View style={[globalStyles.container]}>
        {Platform.OS === 'android' ? (
          <ScrollView contentContainerStyle={[styles.scrollView]} showsVerticalScrollIndicator={false}>
            <CashInAdvanceContent availableAmount={availableAmount} fee={fee} showModal={showModal} />
          </ScrollView>
        ) : (
          <KeyboardAwareScrollView
            contentContainerStyle={[styles.scrollView]}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          >
            <CashInAdvanceContent availableAmount={availableAmount} fee={fee} showModal={showModal} />
          </KeyboardAwareScrollView>
        )}
      </View>
      <ModalOrder
        keyboardHeight={0}
        isVisible={visible}
        confirmText="Confirm"
        title="Cash In Advance"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        ListContentModal={
          <View style={styles.editMarginBottom}>
            <RowItem
              title={'Advance Amount'}
              value={formatNumber(currentAmount.current)}
              titleStyle={styles.rowDataTextItem}
              valueStyle={styles.rowDataValue}
              containerStyle={styles.rowDataItem}
            />
            <RowItem
              title={'Fee'}
              value={formatNumber(fee > MIN_FEE ? fee : MIN_FEE)}
              titleStyle={styles.rowDataTextItem}
              valueStyle={styles.rowDataValue}
              containerStyle={styles.rowDataItem}
            />
            {ModalOTP != null && <View style={styles.otpContainer}>{ModalOTP}</View>}
          </View>
        }
        disabledExecuteButton={isSubmitBtnDisabled || isFormDisabled}
      />
    </>
  );
};

export default memo(AdvanceTab);

type CashInAdvanceContentProps = {
  availableAmount: number;
  fee: number;
  showModal: (value: number) => void;
};

const CashInAdvanceContent = memo(({ availableAmount, fee, showModal }: CashInAdvanceContentProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const [currentAmount, setCurrentAmount] = useState(0);
  const [amountError, setAmountError] = useState<boolean>(false);
  const [amountErrorContent, setAmountErrorContent] = useState<string>('');
  const isDisabled = currentAmount <= 0 || amountError;

  const onChangeAmount = (value: string) => {
    const newAmount = parseInt(value.replace(/,/g, ''));
    if (!isNaN(newAmount)) {
      setCurrentAmount(newAmount);
      validateAmount(newAmount);
    } else {
      setCurrentAmount(0);
      setAmountError(false);
    }
  };

  const validateAmount = (value: number) => {
    if (value <= 0) {
      setAmountError(false);
      return;
    }
    if (value > availableAmount) {
      setAmountError(true);
      setAmountErrorContent('Advance amount is over available balance');
      return;
    }
    if (0 > value) {
      setAmountError(true);
      setAmountErrorContent('Advance amount must be greater than 0');
      return;
    }
    setAmountError(false);
    setAmountErrorContent('');
  };

  const onOpenModalPressed = () => {
    showModal(currentAmount);
  };

  return (
    <>
      <View style={styles.rowData}>
        <Text style={styles.rowDataText}>{t('Available Advance')}</Text>
        <Text style={styles.rowDataNumber}>{availableAmount >= 0 ? formatNumber(availableAmount, 2) : '-'}</Text>
      </View>
      <View style={styles.rowData}>
        <Text style={styles.rowDataText}>{t('Advance Amount')}</Text>
        <TextInputComponent
          autoFocus={false}
          value={currentAmount > 0 ? formatNumber(currentAmount) : ''}
          onChangeText={onChangeAmount}
          wholeContainerStyle={globalStyles.alignEnd}
          textInputContainerStyle={[styles.inputTextContainer, amountError && styles.inputErrorContainer]}
          textInputStyle={[styles.inputText]}
          textAlign={'right'}
          error={amountError}
          errorContent={amountErrorContent}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.rowData}>
        <Text style={styles.rowDataText}>{t('Fee')}</Text>
        <Text style={styles.rowDataNumber}>{formatNumber(fee > MIN_FEE ? fee : MIN_FEE)}</Text>
      </View>
      <View style={globalStyles.container} />
      <TouchableOpacity
        style={[styles.touchContainer, isDisabled && styles.touchContainerDisabled]}
        onPress={onOpenModalPressed}
        disabled={isDisabled}
      >
        <Text style={isDisabled ? styles.touchTextDisabled : styles.touchText}>{t('Advance')}</Text>
      </TouchableOpacity>
    </>
  );
});
