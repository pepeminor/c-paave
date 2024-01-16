import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import globalStyles, { Colors, scaleSize } from 'styles';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import Down from 'assets/icon/Down.svg';
import TextInputComponent from 'components/TextInput';
import { formatNumber } from 'utils';
import Modal from 'components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import { generateKisCardFrom, generateNewKisCard } from 'reduxs/global-actions';
import { ACCOUNT_TYPE, SUB_ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
import ModalOTPKIS from 'components/ModalOTPKIS';
import { kisVerifyAndSaveOTP } from 'screens/LoginRealAccount/actions';
import { IKisVerifyAndSaveOTPRequest } from 'interfaces/common';
import { kisVerifyAndSaveOTPFrom } from 'interfaces/authentication';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { CashTransferType } from 'constants/enum';
import config from 'config';
import {
  querySubAccountRetrieve,
  queryGenFundTransfer,
  postDoFundTransfer,
  resetSubAccountRetrieve,
  postDerCpCashDW,
  postDerCashTransfer,
} from 'reduxs/global-actions/BankTransfer';
import { querySubAccountRetrieveResponse } from 'interfaces/bankTransfer';
import CloseFilter from 'assets/icon/CloseFilter.svg';
import FilterSelectIcon from 'assets/icon/FilterSelectIcon.svg';
import useModalOTPKis from 'hooks/useModalOTPKis';
import { TYPE_OPTION_VALUE } from 'screens/CashTransaction';
import useKisOTPAvailable from 'hooks/useKisOTPAvailable';

type IInternalTransferProps = {
  switchToCashTransferHistoryTab?: () => void;
  optionSelecting: TYPE_OPTION_VALUE;
};

interface IItemList {
  label: string;
  value: string;
  default?: boolean;
}

const TRANSFER_FEE_VSD = 5500;

const InternalTransferContent = (props: IInternalTransferProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [transferAmount, setTransferAmount] = React.useState<number>(0);
  const [transferAmountError, setTransferAmountError] = React.useState<boolean>(false);
  const [transferAmountErrorContent, setTransferAmountErrorContent] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const transferAbleAmount = useSelector((state: IState) => state.getGenFundTransfer.data?.transferableAmount);
  const selectedAccount = useSelector((state: IState) => state.selectedAccount);
  const retrieveSubAccountData = useSelector((state: IState) => state.getSubAccountRetrieve);
  const [subAccountData, setSubAccountData] = useState<IItemList[]>([]);
  const kisOTPToken = useSelector((state: IState) => state.kisOTPToken);
  const generateKisCardResult = useSelector((state: IState) => state.generateKisCardResult);
  const [beneficiaryAccountNo, setBeneficiaryAccountNo] = useState<IItemList>();
  const checkDoFundTransfer = useSelector((state: IState) => state.checkDoFundTransfer);
  const [beneficiaryModalVisible, setBeneficiaryModalVisible] = useState<boolean>(false);
  const getDerClientCashBalanceShortver = useSelector((state: IState) => state.getDerClientCashBalanceShortver);

  const isSelectedDerivatives =
    selectedAccount.selectedSubAccount != null &&
    selectedAccount.selectedSubAccount.accountSubs[0] != null &&
    selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES;

  const isSelectedEquity =
    selectedAccount.selectedSubAccount != null &&
    selectedAccount.selectedSubAccount.accountSubs[0] != null &&
    selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY;

  const { valueOTPErrorContent, valueOTPError, otpKisValue, onChangeOtpKisValue, resetFormModalOTPKIS } =
    useModalOTPKis();

  const kisOTPAvailable = useKisOTPAvailable(otpKisValue);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedAccount.username == null) return;
    if (modalVisible === true) {
      if (selectedAccount.type === ACCOUNT_TYPE.KIS) {
        dispatch(generateNewKisCard({ username: selectedAccount.username, from: generateKisCardFrom.TRADE }));
      }
    }
  }, [modalVisible, selectedAccount.username]);

  const doCashTransfer = useCallback(() => {
    if (selectedAccount.selectedSubAccount == null) return;
    if (isSelectedEquity) {
      if (transferAbleAmount != null && beneficiaryAccountNo && !beneficiaryAccountNo.label.includes('D')) {
        const params = {
          transferType: CashTransferType.TO_SUB,
          senderAccountNo: selectedAccount.selectedSubAccount.accountNumber,
          senderFullName: selectedAccount.selectedSubAccount.accountName,
          transferableAmount: transferAbleAmount,
          beneficiaryAccountNo: beneficiaryAccountNo.label,
          transferAmount: transferAmount,
          beneficiaryFullName: beneficiaryAccountNo.value,
          content: `${t('Internal transfer')} ${selectedAccount.selectedSubAccount.accountNumber} ${t('to')} ${
            beneficiaryAccountNo.label
          }}`,
        };
        dispatch(postDoFundTransfer(params));
      } else if (
        transferAmount &&
        transferAbleAmount != null &&
        beneficiaryAccountNo != null &&
        beneficiaryAccountNo.label.includes('D')
      ) {
        dispatch(
          postDerCashTransfer({
            transferType: CashTransferType.EQT_TO_DR,
            accountNumber: beneficiaryAccountNo.label,
            transferAmount: transferAmount,
            transferableAmount: transferAbleAmount,
            content: `${t('Internal transfer')} ${selectedAccount.selectedSubAccount.accountNumber} ${t('to')} ${
              beneficiaryAccountNo.label
            }}`,
          })
        );
      }
    }

    if (isSelectedDerivatives && getDerClientCashBalanceShortver.data != null) {
      switch (props.optionSelecting) {
        case TYPE_OPTION_VALUE.CASH_INTERNAL:
          dispatch(
            postDerCashTransfer({
              counterPartyAC: `057${selectedAccount.selectedSubAccount.accountNumber}`,
              transferType: CashTransferType.DR_TO_EQT,
              accountNumber: selectedAccount.selectedSubAccount.accountNumber,
              transferAmount: transferAmount,
              transferableAmount: getDerClientCashBalanceShortver.data.transferableAmountToInternalSubsOrToBank,
              content: content,
            })
          );
          break;
        case TYPE_OPTION_VALUE.DEPOSIT_TO_VSD:
          dispatch(
            postDerCpCashDW(
              {
                transferType: CashTransferType.VSD_DEPOSIT,
                sendingAccountNo: selectedAccount.selectedSubAccount.accountNumber,
                beneficiaryAccountNo: `057${selectedAccount.username}`,
                transferAmount: transferAmount,
                transferableAmount: getDerClientCashBalanceShortver.data.transferableAmountToVSDAccount,
                content: content,
              },
              { message: 'DEPOSIT_VSD_SUCCESS' }
            )
          );
          break;
        case TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD:
          dispatch(
            postDerCpCashDW(
              {
                transferType: CashTransferType.VSD_WITHDRAW,
                sendingAccountNo: `057${selectedAccount.username}`,
                beneficiaryAccountNo: selectedAccount.selectedSubAccount.accountNumber,
                transferAmount: transferAmount,
                transferableAmount: getDerClientCashBalanceShortver.data.transferableAmountOfVSDAccount,
                content: content,
              },
              {
                message: 'WITHDRAW_FROM_VSD_SUCCESS',
              }
            )
          );
          break;
        default:
          break;
      }
    }
    setContent('');
    setTransferAmount(0);
    setModalVisible(false);
    resetFormModalOTPKIS();
  }, [
    isSelectedEquity,
    isSelectedDerivatives,
    getDerClientCashBalanceShortver.data,
    selectedAccount.selectedSubAccount?.accountNumber,
    props.optionSelecting,
    beneficiaryAccountNo?.label,
    content,
    transferAmount,
    transferAbleAmount,
  ]);

  useUpdateEffect(() => {
    if (checkDoFundTransfer) {
      props.switchToCashTransferHistoryTab && props.switchToCashTransferHistoryTab();
    }
  }, [checkDoFundTransfer]);

  const onConfirm = useCallback(() => {
    if (selectedAccount.type === ACCOUNT_TYPE.KIS) {
      const params: IKisVerifyAndSaveOTPRequest = {
        expireTime: config.kisOTPTokenExpireTime,
        verifyType: 'MATRIX_CARD',
        wordMatrixId: generateKisCardResult != null ? generateKisCardResult.wordMatrixId : 0,
        wordMatrixValue: otpKisValue,
      };
      dispatch(kisVerifyAndSaveOTP(params, kisVerifyAndSaveOTPFrom.TRADE, doCashTransfer));
    }
  }, [selectedAccount.type, kisOTPToken, generateKisCardResult?.wordMatrixId, otpKisValue, doCashTransfer]);

  useEffect(() => {
    if (
      selectedAccount.selectedSubAccount != null &&
      selectedAccount.selectedSubAccount.accountNumber &&
      selectedAccount.selectedSubAccount.accountSubs[0] != null &&
      selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY
    ) {
      dispatch(
        queryGenFundTransfer({
          accountNo: selectedAccount.selectedSubAccount.accountNumber,
        })
      );
    }
    if (selectedAccount.username && props.optionSelecting !== TYPE_OPTION_VALUE.DEPOSIT_TO_VSD) {
      dispatch(
        querySubAccountRetrieve({
          clientID: selectedAccount.username,
        })
      );
    }
    return () => {
      dispatch(resetSubAccountRetrieve({}));
    };
  }, [selectedAccount, props.optionSelecting]);

  useEffect(() => {
    const subAcc = Object.values(retrieveSubAccountData.data || []) as any;
    let arr: IItemList[];
    if (subAcc.length > 0) {
      arr = subAcc
        .filter(
          (ele: querySubAccountRetrieveResponse) =>
            ele.subAccountID !== selectedAccount?.selectedSubAccount?.accountNumber
        )
        .map((item: querySubAccountRetrieveResponse) => ({
          label: item.subAccountID || '',
          value: item.subAccountName || '',
          default: item.defaultSubAccount,
        }));
      if (arr.length) {
        setSubAccountData(arr);
        // check the user's default account, if not the default account, do not filter out subD, just only sub default
        setBeneficiaryAccountNo(
          arr.filter(ele =>
            selectedAccount.selectedSubAccount?.accountNumber.includes(
              SUB_ACCOUNT_TYPE.SUB_ACCOUNT_M || SUB_ACCOUNT_TYPE.SUB_ACCOUNT_X
            )
              ? ele.default === true
              : ele
          )[0]
        );
      }
    }
  }, [retrieveSubAccountData]);

  const onChangeContent = useCallback((value: string) => {
    setContent(value);
  }, []);

  const validateTransferAmount = useCallback(
    (value?: number): boolean => {
      const finalValue = value ?? transferAmount;
      if (finalValue == null || finalValue === 0) {
        setTransferAmountError(true);
        return false;
      } else if (finalValue > Number(transferAbleAmount ?? 0)) {
        setTransferAmountError(true);
        setTransferAmountErrorContent('OVER_AVAILABLE');
        return false;
      }
      if (isSelectedDerivatives && getDerClientCashBalanceShortver.data != null) {
        const compareValue = (() => {
          if (getDerClientCashBalanceShortver.data == null) return 0;
          switch (props.optionSelecting) {
            case TYPE_OPTION_VALUE.CASH_INTERNAL:
              return getDerClientCashBalanceShortver.data.transferableAmountToInternalSubsOrToBank;
            case TYPE_OPTION_VALUE.DEPOSIT_TO_VSD:
              return getDerClientCashBalanceShortver.data.transferableAmountToVSDAccount;
            case TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD:
              return getDerClientCashBalanceShortver.data.transferableAmountOfVSDAccount;
            default:
              return 0;
          }
        })();
        if (finalValue > compareValue) {
          setTransferAmountError(true);
          setTransferAmountErrorContent('OVER_AVAILABLE');
          return false;
        }
      }
      setTransferAmountError(false);
      setTransferAmountErrorContent('');
      return true;
    },
    [
      transferAmount,
      transferAbleAmount,
      isSelectedDerivatives,
      getDerClientCashBalanceShortver.data,
      props.optionSelecting,
    ]
  );

  const onChangeTransferAmount = useCallback(
    (value: string) => {
      const textAmount = value.replace(/,/g, '');
      if (!isNaN(Number(textAmount))) {
        setTransferAmount(Number(textAmount));
        validateTransferAmount(Number(textAmount));
      } else {
        setTransferAmount(0);
        validateTransferAmount(0);
      }
    },
    [validateTransferAmount]
  );

  const openModal = useCallback(() => {
    if (validateTransferAmount()) setModalVisible(true);
  }, [validateTransferAmount]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    resetFormModalOTPKIS();
  }, [resetFormModalOTPKIS]);

  const showChooseBeneficiaryModal = useCallback(() => {
    setBeneficiaryModalVisible(pre => !pre);
  }, []);

  const onGetValueBeneficiaryAccount = useCallback(item => {
    setBeneficiaryAccountNo(item);
    showChooseBeneficiaryModal();
  }, []);

  const transferAbleAmountData = useMemo(() => {
    return isSelectedDerivatives ? (
      getDerClientCashBalanceShortver.data != null ? (
        props.optionSelecting === TYPE_OPTION_VALUE.CASH_INTERNAL ||
        props.optionSelecting === TYPE_OPTION_VALUE.CASH_BANK ? (
          formatNumber(getDerClientCashBalanceShortver.data.transferableAmountToInternalSubsOrToBank)
        ) : props.optionSelecting === TYPE_OPTION_VALUE.DEPOSIT_TO_VSD ? (
          formatNumber(getDerClientCashBalanceShortver.data.transferableAmountToVSDAccount)
        ) : props.optionSelecting === TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD ? (
          formatNumber(getDerClientCashBalanceShortver.data.transferableAmountOfVSDAccount)
        ) : null
      ) : (
        <ActivityIndicator size="small" color={Colors.DARK_GREEN} />
      )
    ) : transferAbleAmount != null ? (
      formatNumber(Number(transferAbleAmount), 2)
    ) : (
      <ActivityIndicator size="small" color={Colors.DARK_GREEN} />
    );
  }, [getDerClientCashBalanceShortver.data, isSelectedDerivatives, transferAbleAmount, props.optionSelecting]);

  return (
    <>
      <View style={styles.internalScreenHeight}>
        <View style={[globalStyles.container, styles.internalTransferContentBlock]}>
          <View style={styles.textBlockStyle}>
            <Text allowFontScaling={false} style={styles.optionTitle}>
              {t('Transferable Amount')}
            </Text>
            <Text allowFontScaling={false} style={styles.optionValue}>
              {transferAbleAmountData}
            </Text>
          </View>
          <Modal
            visible={beneficiaryModalVisible}
            onRequestClose={showChooseBeneficiaryModal}
            childrenContent={
              <View style={[globalStyles.container, styles.modalBackground, globalStyles.justifyEnd]}>
                <View style={[globalStyles.justifyCenter, styles.modalContentContainer1]}>
                  <View style={styles.topInfo}></View>
                  <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.modalTitle]}>
                    <Text allowFontScaling={false} style={[globalStyles.container, styles.filterText]}>
                      {t('Choose Beneficiary Account')}
                    </Text>
                    <TouchableOpacity style={[styles.closeType]} onPress={showChooseBeneficiaryModal}>
                      <CloseFilter height={scaleSize(24)} width={scaleSize(24)} />
                    </TouchableOpacity>
                  </View>
                  {subAccountData.length === 0 && (
                    <View style={styles.modalNoteContainer}>
                      <Text allowFontScaling={false} numberOfLines={1} style={styles.modalNote}>
                        {t('internal_transfer.not_have_sub_account')}
                      </Text>
                    </View>
                  )}
                  {isSelectedEquity &&
                    subAccountData
                      .filter(ele =>
                        selectedAccount.selectedSubAccount?.accountNumber.includes(SUB_ACCOUNT_TYPE.SUB_ACCOUNT_M)
                          ? ele.default === true
                          : ele
                      )
                      .map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => onGetValueBeneficiaryAccount(item)}
                            style={[
                              globalStyles.flexDirectionRow,
                              globalStyles.alignCenter,
                              styles.filterItemContainer,
                            ]}
                          >
                            <Text
                              numberOfLines={1}
                              style={[
                                globalStyles.container,
                                styles.filterTextValueType,
                                beneficiaryAccountNo?.label === item.label
                                  ? styles.filterTextValueSelected
                                  : styles.filterTextValueUnselected,
                              ]}
                            >
                              {t(item.label)}
                            </Text>
                            {beneficiaryAccountNo?.label === item.label && (
                              <FilterSelectIcon height={scaleSize(11)} width={scaleSize(18)} />
                            )}
                          </TouchableOpacity>
                        );
                      })}
                  {isSelectedDerivatives &&
                    subAccountData
                      .filter(ele => ele.default === true)
                      .map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => onGetValueBeneficiaryAccount(item)}
                            style={[
                              globalStyles.flexDirectionRow,
                              globalStyles.alignCenter,
                              styles.filterItemContainer,
                            ]}
                          >
                            <Text
                              numberOfLines={1}
                              style={[
                                globalStyles.container,
                                styles.filterTextValueType,
                                beneficiaryAccountNo?.label === item.label
                                  ? styles.filterTextValueSelected
                                  : styles.filterTextValueUnselected,
                              ]}
                            >
                              {t(item.label)}
                            </Text>
                            {beneficiaryAccountNo?.label === item.label && (
                              <FilterSelectIcon height={scaleSize(11)} width={scaleSize(18)} />
                            )}
                          </TouchableOpacity>
                        );
                      })}
                </View>
                <TouchableOpacity style={globalStyles.invisibleBackground} onPress={showChooseBeneficiaryModal} />
              </View>
            }
          />

          <View style={styles.textBlockStyle}>
            <Text style={styles.optionTitle}>{t('Beneficiary Account')}</Text>
            {isSelectedDerivatives &&
            (props.optionSelecting === TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD ||
              props.optionSelecting === TYPE_OPTION_VALUE.DEPOSIT_TO_VSD ||
              props.optionSelecting === TYPE_OPTION_VALUE.CASH_INTERNAL) ? (
              <View
                style={[
                  globalStyles.flexDirectionRow,
                  globalStyles.alignCenter,
                  styles.BeneficiaryTextInputContainerStyle,
                ]}
              >
                <Text numberOfLines={1} allowFontScaling={false} style={[globalStyles.container]}>
                  {props.optionSelecting === TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD
                    ? `057${selectedAccount.selectedSubAccount?.accountNumber}`
                    : props.optionSelecting === TYPE_OPTION_VALUE.CASH_INTERNAL
                    ? beneficiaryAccountNo?.label
                    : `057${selectedAccount.username}`}
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={showChooseBeneficiaryModal}
                style={[
                  globalStyles.flexDirectionRow,
                  globalStyles.alignCenter,
                  styles.BeneficiaryTextInputContainerStyle,
                ]}
              >
                <Text numberOfLines={1} allowFontScaling={false} style={[globalStyles.container]}>
                  {beneficiaryAccountNo?.label}
                </Text>
                <View style={[globalStyles.flexDirectionRow, globalStyles.centered]}>
                  <Down style={[styles.labelIconStyle]} />
                </View>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.textBlockStyle}>
            <Text style={styles.optionTitle}>{t('Transfer Amount')}</Text>
            <TextInputComponent
              value={
                typeof transferAmount === 'number'
                  ? transferAmount === 0
                    ? ''
                    : formatNumber(transferAmount, 2)
                  : transferAmount
              }
              onChangeText={onChangeTransferAmount}
              wholeContainerStyle={styles.wholeContainerContentStyle}
              textInputContainerStyle={[
                globalStyles.fillHeight,
                transferAmountError ? styles.textInputContainerContentError : styles.textInputContainerContentStyle,
              ]}
              textInputStyle={styles.textInputStyle}
              textAlignVertical="center"
              textAlign="right"
              keyboardType="number-pad"
              error={transferAmountError}
              errorContent={transferAmountErrorContent}
            />
          </View>
          <View style={styles.textBlockStyle}>
            <Text style={styles.optionTitle}>{t('Transfer Fee')}</Text>
            <Text style={styles.optionValue}>
              {isSelectedDerivatives && props.optionSelecting !== TYPE_OPTION_VALUE.CASH_INTERNAL
                ? formatNumber(5500, 2)
                : 0}
            </Text>
          </View>
          {isSelectedDerivatives ? (
            <View style={styles.contentStyle2}>
              <Text style={styles.optionTitle}>{t('Content')}</Text>
              <TextInputComponent
                value={content}
                onChangeText={onChangeContent}
                wholeContainerStyle={styles.wholeContainerContentStyle2}
                textInputContainerStyle={[globalStyles.fillHeight, styles.textInputContainerContentStyle]}
                textInputStyle={styles.textInputStyle}
                textAlignVertical="top"
                textAlign="left"
                multiline
              />
            </View>
          ) : (
            <View style={styles.contentStyle}>
              <Text style={styles.optionTitle}>{t('Content')}</Text>
              <Text style={[styles.optionValueContent]}>
                {t('Internal transfer')} {selectedAccount?.selectedSubAccount?.accountNumber} {t('to')}{' '}
                {beneficiaryAccountNo?.label}
              </Text>
            </View>
          )}
        </View>
        {/* <View style={[globalStyles.container]} /> */}
        <TouchableOpacity
          disabled={
            transferAmount === 0 ||
            (props.optionSelecting !== TYPE_OPTION_VALUE.DEPOSIT_TO_VSD &&
              props.optionSelecting !== TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD &&
              !beneficiaryAccountNo)
          }
          style={[
            globalStyles.centered,
            styles.executeFormButton,
            transferAmount === 0 ||
            (props.optionSelecting !== TYPE_OPTION_VALUE.DEPOSIT_TO_VSD &&
              props.optionSelecting !== TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD &&
              !beneficiaryAccountNo)
              ? styles.executeFormDisableButton
              : {},
          ]}
          onPress={openModal}
        >
          <Text allowFontScaling={false} style={styles.executeFormButtonText}>
            {t('Transfer')}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        onRequestClose={closeModal}
        childrenContent={
          <View
            style={[
              globalStyles.container,
              globalStyles.centered,
              globalStyles.flexDirectionRow,
              styles.modalBackground2,
            ]}
          >
            <View style={[globalStyles.justifyCenter, styles.modalContentContainer]}>
              <View style={[globalStyles.centered, styles.modalTitle]}>
                <Text allowFontScaling={false} style={[styles.modalTitleText]}>
                  {props.optionSelecting === TYPE_OPTION_VALUE.DEPOSIT_TO_VSD
                    ? t('Deposit to VSD Request')
                    : props.optionSelecting === TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD
                    ? t('Withdraw from VSD')
                    : t('Internal Transfer Request')}
                </Text>
              </View>
              <View style={[styles.internalTransferContentBlock]}>
                <View style={styles.textBlockStyle}>
                  <Text style={styles.optionTitle}>
                    {props.optionSelecting === TYPE_OPTION_VALUE.DEPOSIT_TO_VSD ||
                    props.optionSelecting === TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD
                      ? t('Sending Account')
                      : t('Sender Acc.No')}
                  </Text>
                  <Text style={styles.optionValue}>{selectedAccount?.selectedSubAccount?.accountNumber}</Text>
                </View>
                {props.optionSelecting === TYPE_OPTION_VALUE.DEPOSIT_TO_VSD ||
                props.optionSelecting === TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD ? (
                  <View style={styles.textBlockStyle}>
                    <Text style={styles.optionTitle}>{t('Receiving Account')}</Text>
                    <Text style={styles.optionValue}>{selectedAccount.username}</Text>
                  </View>
                ) : null}
                <View style={styles.textBlockStyle}>
                  <Text style={styles.optionTitle}>{t('Full Name')}</Text>
                  <Text style={styles.optionValue}>{selectedAccount?.selectedSubAccount?.accountName}</Text>
                </View>
                {props.optionSelecting === TYPE_OPTION_VALUE.CASH_BANK ||
                props.optionSelecting === TYPE_OPTION_VALUE.CASH_INTERNAL ? (
                  <View style={styles.textBlockStyle}>
                    <Text style={styles.optionTitle}>{t('Beneficiary Account')}</Text>
                    <Text style={styles.optionValue}>{beneficiaryAccountNo?.label}</Text>
                  </View>
                ) : null}

                <View style={styles.textBlockStyle}>
                  <Text style={styles.optionTitle}>{t('Transfer Amount')}</Text>
                  <Text style={styles.optionValue}>{formatNumber(transferAmount, 2)}</Text>
                </View>
                {props.optionSelecting === TYPE_OPTION_VALUE.DEPOSIT_TO_VSD ||
                props.optionSelecting === TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD ? (
                  <View style={styles.textBlockStyle}>
                    <Text style={styles.optionTitle}>{t('Transfee')}</Text>
                    <Text style={styles.optionValue}>{formatNumber(TRANSFER_FEE_VSD, 2)}</Text>
                  </View>
                ) : null}
                <View style={styles.textBlockStyle1}>
                  <Text style={styles.optionTitle}>{t('Content')}</Text>
                  <Text style={styles.optionValueContent}>
                    {isSelectedDerivatives
                      ? content
                      : `${t('Internal transfer')} ${selectedAccount?.selectedSubAccount?.accountNumber} ${t('to')} ${
                          beneficiaryAccountNo?.label
                        }`}
                  </Text>
                </View>
                <View>
                  {selectedAccount.type === ACCOUNT_TYPE.KIS && (
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
                <View>
                  <View style={[globalStyles.fillWidth, styles.marginTop17]}>
                    <TouchableOpacity
                      onPress={onConfirm}
                      style={[
                        globalStyles.centered,
                        styles.executeFormButton2,
                        !kisOTPAvailable && globalStyles.disableBackground,
                      ]}
                      disabled={!kisOTPAvailable}
                    >
                      <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
                        {t('Confirm')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[globalStyles.justifyCenter, styles.modalActionGroup]}>
                    <TouchableOpacity onPress={closeModal} style={[globalStyles.centered, styles.modalCancelButton]}>
                      <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText2}>
                        {t('Cancel')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={globalStyles.invisibleBackground} onPress={closeModal} />
          </View>
        }
      />
    </>
  );
};

export default InternalTransferContent;
