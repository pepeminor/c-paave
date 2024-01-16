import React, { ReactElement, useEffect, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { ACCOUNT_TYPE, ORDER_TYPE, SELL_BUY_TYPE } from 'global';
import { capitalizeText, formatNumber, formatDateToString } from 'utils';
import globalStyles from 'styles';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ISpecialPriceType } from 'constants/enum';
import ModalOTPKIS from 'components/ModalOTPKIS';
import { generateKisCardFrom, generateNewKisCard } from 'reduxs/global-actions/Authentication';
import { kisVerifyAndSaveOTPFrom } from 'interfaces/authentication';
import { kisVerifyAndSaveOTP } from 'screens/LoginRealAccount/actions';
import { IKisVerifyAndSaveOTPRequest } from 'interfaces/common';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { ReducerStatus } from 'interfaces/reducer';
import Modal from 'components/Modal';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import config from 'config';
import { track } from '@amplitude/analytics-react-native';
import { useAppSelector } from 'hooks/useAppSelector';
import useKisOTPAvailable from 'hooks/useKisOTPAvailable';
import withMemo from 'HOC/withMemo';

export interface IExecuteModalBaseProps {
  filterSelecting: ORDER_TYPE;
  sellBuyType: SELL_BUY_TYPE;
  price: number | ISpecialPriceType;
  stopPrice: number;
  stopLimitPrice: number;
  limitPrice: number | ISpecialPriceType;
  quantity: number;
  tradingValue: number | '-';
  fromDate: Date;
  toDate: Date;
  expiryDate: Date;
  isToggleExpiryDate: boolean;
  visible: boolean;
  isFuturesCode: boolean;

  closeExecuteModal: () => void;
  onPressConfirmExecuteForm: () => void;
}

const ExecuteModal = (props: IExecuteModalBaseProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const [otpKisValue, setOtpKisValue] = useState<string>('');
  const [isDisableForm, setIsDisabledForm] = useState<boolean>(false);
  const currentSymbolCode = useAppSelector(state => state.SymbolData.currentSymbolCode);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const kisOTPToken = useAppSelector(state => state.kisOTPToken);
  const [valueOTPError, setValueOTPError] = useState<boolean>(false);
  const [valueOTPErrorContent, setValueOTPErrorContent] = useState<string>('');
  const generateKisCardResult = useAppSelector(state => state.generateKisCardResult);
  const generateKisCardFailedTrigger = useAppSelector(state => state.generateKisCardFailedTrigger);
  const onModalOTPKIS = useAppSelector(state => state.onModalOTPKIS);
  const kisCheckOTP = useAppSelector(state => state.kisCheckOTP);
  const dispatch = useDispatch();
  const kisOTPErrorValue = useAppSelector(state => state.kisOTPErrorValue);

  const kisOTPAvailable = useKisOTPAvailable(otpKisValue);

  useEffect(() => {
    if (props.visible === true) {
      setIsDisabledForm(false);
      setOtpKisValue('');
      setValueOTPError(false);
      setValueOTPErrorContent('');
      if (
        selectedAccount.type === ACCOUNT_TYPE.KIS &&
        generateKisCardResult == null &&
        selectedAccount.username != null &&
        (kisOTPToken == null || kisOTPToken.trim() === '')
      ) {
        dispatch(generateNewKisCard({ username: selectedAccount.username, from: generateKisCardFrom.TRADE }));
      }
    }
  }, [props.visible, generateKisCardResult, selectedAccount.type, selectedAccount.username]);

  useUpdateEffect(() => {
    onClose();
  }, [generateKisCardFailedTrigger, onModalOTPKIS]);

  useUpdateEffect(() => {
    if (kisCheckOTP.status === ReducerStatus.FAILED) {
      setValueOTPError(true);
      kisOTPErrorValue != null && setValueOTPErrorContent(t(kisOTPErrorValue));
      setIsDisabledForm(false);
    } else if (kisCheckOTP.status === ReducerStatus.SUCCESS) {
      setValueOTPError(false);
      setValueOTPErrorContent('');
      setIsDisabledForm(false);
    }
  }, [kisCheckOTP, kisOTPErrorValue]);

  const onChangeOtpKisValue = (value: string) => {
    setOtpKisValue(value);
    if (valueOTPError) {
      setValueOTPError(false);
      setValueOTPErrorContent('');
    }
  };

  const onConfirm = () => {
    track('Trade Confirm', {
      sellBuyType: props.sellBuyType === SELL_BUY_TYPE.BUY ? 'Buy' : 'Sell',
      account: selectedAccount.type,
      selectedAccount: selectedAccount.selectedSubAccount?.accountName ?? 'Virtual',
      currentSymbol: currentSymbolCode,
      quantity: props.quantity,
      tradingValue: props.tradingValue,
    });
    if (selectedAccount.type === ACCOUNT_TYPE.KIS && (kisOTPToken == null || kisOTPToken.trim() === '')) {
      setIsDisabledForm(true);
      const params: IKisVerifyAndSaveOTPRequest = {
        expireTime: config.kisOTPTokenExpireTime,
        verifyType: 'MATRIX_CARD',
        wordMatrixId: generateKisCardResult != null ? generateKisCardResult.wordMatrixId : 0,
        wordMatrixValue: otpKisValue,
      };
      dispatch(kisVerifyAndSaveOTP(params, kisVerifyAndSaveOTPFrom.TRADE, props.onPressConfirmExecuteForm));
    } else {
      props.onPressConfirmExecuteForm();
    }
  };

  const onClose = () => {
    track('Trade Cancel', {
      sellBuyType: props.sellBuyType === SELL_BUY_TYPE.BUY ? 'Buy' : 'Sell',
      account: selectedAccount.type,
      selectedAccount: selectedAccount.selectedSubAccount?.accountName ?? 'Virtual',
      currentSymbol: currentSymbolCode,
      quantity: props.quantity,
      tradingValue: props.tradingValue,
    });
    setOtpKisValue('');
    setIsDisabledForm(false);
    props.closeExecuteModal();
  };

  const platformWrapperScroll = (content: ReactElement) => {
    if (Platform.OS === 'android') {
      return (
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          {content}
        </ScrollView>
      );
    } else {
      return (
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          {content}
        </KeyboardAwareScrollView>
      );
    }
  };

  const IS_NORMAL_ORDER = props.filterSelecting === ORDER_TYPE.NORMAL_ORDER;
  const IS_STOP_ORDER = props.filterSelecting === ORDER_TYPE.STOP_ORDER;
  const IS_STOP_LIMIT_ORDER = props.filterSelecting === ORDER_TYPE.STOP_LIMIT_ORDER;
  const IS_BUY = props.sellBuyType === SELL_BUY_TYPE.BUY;
  const IS_SELL = props.sellBuyType === SELL_BUY_TYPE.SELL;
  const IS_KIS = selectedAccount.type === ACCOUNT_TYPE.KIS;

  return (
    <Modal
      visible={props.visible}
      onRequestClose={onClose}
      childrenContent={
        <View style={styles.modalBackground2} pointerEvents={isDisableForm === true ? 'none' : 'auto'}>
          {platformWrapperScroll(
            <View style={styles.modalContentContainer2}>
              <View style={styles.modalTitle2}>
                <Text allowFontScaling={false} style={styles.modalTitleText}>
                  {IS_NORMAL_ORDER
                    ? t('Order Confirmation')
                    : IS_STOP_ORDER
                    ? t('Stop Order Confirmation')
                    : t('Order Confirmation')}
                </Text>
              </View>
              <View style={styles.executeModalEachItem}>
                <Text allowFontScaling={false} style={styles.executeLabelText}>
                  {t('Symbol')}
                </Text>
                <Text allowFontScaling={false} style={styles.executeLabelValue}>
                  {currentSymbolCode}
                </Text>
              </View>
              <View style={styles.executeModalEachItem}>
                <Text allowFontScaling={false} style={styles.executeLabelText}>
                  {t('Order Type')}
                </Text>
                <Text allowFontScaling={false} style={styles.executeLabelValue2}>
                  <Text>{IS_NORMAL_ORDER ? t('Normal') : IS_STOP_ORDER ? t('Stop Order') : t('Stop Limit Order')}</Text>
                  {' - '}
                  <Text
                    allowFontScaling={false}
                    style={[globalStyles.container, IS_BUY ? styles.executeBuyValue : styles.executeSellValue]}
                  >
                    {capitalizeText(t(props.sellBuyType))}
                  </Text>
                </Text>
              </View>

              {IS_NORMAL_ORDER && (
                <View style={styles.executeModalEachItem}>
                  <Text allowFontScaling={false} style={styles.executeLabelText}>
                    {t('Price')}
                  </Text>
                  <Text allowFontScaling={false} style={styles.executeLabelValue2}>
                    {typeof props.price === 'number'
                      ? props.isFuturesCode
                        ? formatNumber(props.price, 1, undefined, true)
                        : formatNumber(props.price / 1000, 2, undefined, true)
                      : props.price}
                  </Text>
                </View>
              )}
              {IS_STOP_ORDER && (
                <View style={styles.executeModalEachItem}>
                  <Text allowFontScaling={false} style={styles.executeLabelText}>
                    {t('Stop Price')}
                  </Text>
                  <Text allowFontScaling={false} style={styles.executeLabelValue2}>
                    {formatNumber(props.stopPrice, 2)}
                  </Text>
                </View>
              )}
              {IS_STOP_LIMIT_ORDER && (
                <View style={styles.executeModalEachItem}>
                  <Text allowFontScaling={false} style={styles.executeLabelText}>
                    {t('Stop Price')}
                  </Text>
                  <Text allowFontScaling={false} style={styles.executeLabelValue2}>
                    {props.isFuturesCode
                      ? formatNumber(props.stopLimitPrice, 1, undefined, true)
                      : formatNumber(props.stopLimitPrice / 1000, 2, undefined, true)}
                  </Text>
                </View>
              )}
              {IS_STOP_LIMIT_ORDER && (
                <View style={styles.executeModalEachItem}>
                  <Text allowFontScaling={false} style={styles.executeLabelText}>
                    {t('Limit Price')}
                  </Text>
                  <Text allowFontScaling={false} style={styles.executeLabelValue2}>
                    {typeof props.limitPrice === 'number'
                      ? props.isFuturesCode
                        ? formatNumber(props.limitPrice, 1, undefined, true)
                        : formatNumber(props.limitPrice / 1000, 2, undefined, true)
                      : props.limitPrice}
                  </Text>
                </View>
              )}
              <View style={styles.executeModalEachItem}>
                <Text allowFontScaling={false} style={styles.executeLabelText}>
                  {t('Quantity')}
                </Text>
                <Text allowFontScaling={false} style={styles.executeLabelValue2}>
                  {formatNumber(props.quantity)}
                </Text>
              </View>
              {IS_NORMAL_ORDER && (
                <View style={styles.executeModalEachItem}>
                  <Text allowFontScaling={false} style={styles.executeLabelText}>
                    {t('Trading Value')}
                  </Text>
                  <Text allowFontScaling={false} style={styles.executeLabelValue2}>
                    {typeof props.tradingValue === 'number' ? formatNumber(props.tradingValue, 2) : props.tradingValue}
                  </Text>
                </View>
              )}
              {IS_NORMAL_ORDER && IS_KIS && props.isToggleExpiryDate && (
                <View style={styles.executeModalEachItem}>
                  <Text allowFontScaling={false} style={styles.executeLabelText}>
                    {t('Expiry Date')}
                  </Text>
                  <Text allowFontScaling={false} style={styles.executeLabelValue2}>
                    {`${formatDateToString(props.expiryDate, 'dd/MM/yyyy')}`}
                  </Text>
                </View>
              )}
              {IS_NORMAL_ORDER && !IS_KIS && (
                <View style={styles.executeModalEachItem}>
                  <Text allowFontScaling={false} style={styles.executeLabelText}>
                    {t('Est. Fee')}
                  </Text>
                  <Text allowFontScaling={false} style={styles.executeLabelValue2}>
                    {typeof props.tradingValue === 'number'
                      ? formatNumber((props.tradingValue * 0.2) / 100, 2)
                      : props.tradingValue}
                  </Text>
                </View>
              )}
              {IS_NORMAL_ORDER && IS_SELL && !IS_KIS && (
                <View style={styles.executeModalEachItem}>
                  <Text allowFontScaling={false} style={styles.executeLabelText}>
                    {t('Tax')}
                  </Text>
                  <Text allowFontScaling={false} style={styles.executeLabelValue2}>
                    {typeof props.tradingValue === 'number'
                      ? formatNumber((props.tradingValue * 0.1) / 100, 2)
                      : props.tradingValue}
                  </Text>
                </View>
              )}
              {IS_NORMAL_ORDER && !IS_KIS && (
                <View style={styles.executeModalEachItem}>
                  <Text allowFontScaling={false} style={styles.executeLabelText}>
                    {t('Total')}
                  </Text>
                  <Text allowFontScaling={false} style={[globalStyles.container, styles.executeLabelValue3]}>
                    {typeof props.tradingValue === 'number'
                      ? formatNumber(
                          props.sellBuyType === SELL_BUY_TYPE.BUY
                            ? props.tradingValue + (props.tradingValue * 0.2) / 100
                            : props.tradingValue - (props.tradingValue * 0.2) / 100 - (props.tradingValue * 0.1) / 100,
                          2
                        )
                      : props.tradingValue}
                    {/* BUY: tradingValue + estFee */}
                    {/* SELL: tradingValue - estFee - sellingTax */}
                  </Text>
                </View>
              )}
              {!IS_NORMAL_ORDER && (
                <View style={styles.executeModalEachItem}>
                  <Text allowFontScaling={false} style={styles.executeLabelText}>
                    {t('Valid')}
                  </Text>
                  <Text allowFontScaling={false} style={styles.executeLabelValue2}>
                    {`${formatDateToString(props.fromDate, 'dd/MM/yyyy')} - ${formatDateToString(
                      props.toDate,
                      'dd/MM/yyyy'
                    )}`}
                  </Text>
                </View>
              )}
              <View style={styles.paddingHorizontal16}>
                {IS_KIS && (kisOTPToken == null || kisOTPToken.trim() === '') && (
                  <ModalOTPKIS
                    valueOTP={otpKisValue}
                    onChangeValueOTP={onChangeOtpKisValue}
                    generateKisCardResult={generateKisCardResult}
                    ListContentModal={true}
                    valueOTPError={valueOTPError}
                    valueOTPErrorContent={valueOTPErrorContent}
                    autoFocus={false}
                  />
                )}
              </View>
              <View style={styles.paddingHorizontal16}>
                <TouchableOpacity
                  onPress={onConfirm}
                  style={[
                    styles.executeFormButton2,
                    selectedAccount.type === ACCOUNT_TYPE.KIS &&
                      (kisOTPToken == null || kisOTPToken.trim() === '') &&
                      !kisOTPAvailable &&
                      globalStyles.disableBackground,
                  ]}
                  disabled={
                    selectedAccount.type === ACCOUNT_TYPE.KIS &&
                    (kisOTPToken == null || kisOTPToken.trim() === '') &&
                    !kisOTPAvailable
                  }
                >
                  <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
                    {t('Confirm')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose} style={styles.cancelExecuteFormButton2}>
                  <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText2}>
                    {t('Cancel')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <TouchableOpacity style={globalStyles.invisibleBackground} onPress={props.closeExecuteModal} />
        </View>
      }
    />
  );
};

export default withMemo(ExecuteModal);
