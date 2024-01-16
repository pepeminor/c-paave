import React, { memo, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import useStyles from './styles';
import globalStyles, { Colors, scaleSize } from 'styles';
import TextInputComponent from 'components/TextInput';
import IconInfo from 'assets/icon/IconInfo.svg';
import DatePicker from 'components/DatePicker';
import SheetData, { ISheetDataConfig } from 'components/SheetData';
import { FulfilledRequestError, filterV2, formatNumber } from 'utils';
import HeaderScreen from 'components/HeaderScreen';
import Down from 'assets/icon/Down.svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Tooltip from 'react-native-walkthrough-tooltip';
import CashTransferHistory from 'screens/AccountCashInternalTransfer/Tabs/CashTransferHistory';
import InternalTransferContent from 'screens/AccountCashInternalTransfer/Tabs/InternalTransferContent';
import { useTranslation } from 'react-i18next';
import CloseFilter from 'assets/icon/CloseFilter.svg';
import FilterSelectIcon from 'assets/icon/FilterSelectIcon.svg';
import Modal from 'components/Modal';
import { Keyboard } from 'react-native';
import ModalOTPKIS from 'components/ModalOTPKIS';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import { IKisVerifyAndSaveOTPRequest } from 'interfaces/common';
import { kisVerifyAndSaveOTP } from 'screens/LoginRealAccount/actions';
import { kisVerifyAndSaveOTPFrom } from 'interfaces/authentication';
import { height } from 'styles';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { ReducerStatus } from 'interfaces/reducer';
import { useIsFocused } from '@react-navigation/native';
import { isAfter, isBefore, subBusinessDays, subDays } from 'date-fns';
import { formatDateToString, formatStringToDateString } from 'utils';
import {
  resetDoFundTransferState,
  resetCheckTime,
  resetBankInfo,
  resetCashTransactionHistory,
  queryDerClientCashBalanceShortver,
  queryDerCashDWEnquiry,
  postDerCashDW,
  queryGenFundTransfer,
  queryBankInfo,
  queryCashTransactionHistory,
  postDoFundTransfer,
  checkTradeDate,
} from '../../reduxs/global-actions/BankTransfer';
import {
  transactionHistoryDetails,
  doFundTransferParams,
  beneficiaryAccountDetails,
  IDerCashDWEnquiryParams,
  IDerCashDWParams,
  queryBankInfoResponse,
  cashTransactionHistoryParams,
} from '../../interfaces/bankTransfer';
import {
  onCloseModalOTPKIS,
  generateNewKisCard,
  generateKisCardFrom,
} from '../../reduxs/global-actions/Authentication';
import { CashTransferType, CashTransferStatus } from 'constants/enum';
import config from 'config';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import useModalOTPKis from 'hooks/useModalOTPKis';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
import CashTransferHistoryVSD from 'screens/AccountCashInternalTransfer/Tabs/CashTransferHistoryVSD';
import SheetDataHeader from 'components/SheetDataHeader';
import { HeaderConfig } from 'components/SheetData3';
import useKisOTPAvailable from 'hooks/useKisOTPAvailable';
import { isEqual } from 'lodash';
import ItemSelector from 'components/ItemSelector';
import LoginRequiredModal from 'components/LoginRequired/LoginRequiredModal';
import PaaveButton from 'components/PaaveButton';
import PaaveLogo from 'assets/logo-paave.svg';
import { Linking } from 'react-native';

export const TYPE_OPTION_VALUE = {
  CASH_INTERNAL: 'CASH_INTERNAL',
  CASH_BANK: 'CASH_BANK',
  CASH_ADVANCE: 'CASH_ADVANCE',
  CASH_HISTORY: 'CASH_HISTORY',
  DEPOSIT_TO_VSD: 'DEPOSIT_TO_VSD',
  WITHDRAW_FROM_VSD: 'WITHDRAW_FROM_VSD',
} as const;
export type TYPE_OPTION_VALUE = keyof typeof TYPE_OPTION_VALUE;

const OrderStatus = {
  [CashTransferStatus.ALL]: {
    label: 'ALL',
    key: CashTransferStatus.ALL,
  },
  [CashTransferStatus.APPROVED]: {
    label: 'Approved_Bank',
    key: CashTransferStatus.APPROVED,
  },
  [CashTransferStatus.REJECTED]: {
    label: 'REJECTED',
    key: CashTransferStatus.REJECTED,
  },
  [CashTransferStatus.PENDING]: {
    label: 'Pending_Bank',
    key: CashTransferStatus.PENDING,
  },
  [CashTransferStatus.DELETED]: {
    label: 'DELETED',
    key: CashTransferStatus.DELETED,
  },
  [CashTransferStatus.SETTLED]: {
    label: 'SETTLED',
    key: CashTransferStatus.SETTLED,
    hide: true,
  },
};

const PAGE_SIZE = config.pageSize;

const cellStyle = [globalStyles.container2, globalStyles.centered];

const sheetHeaderConfigDer: HeaderConfig = {
  height: 44,
  data: [
    { content: 'No.', width: 40 },
    { content: 'Date', width: 95 },
    { width: 135, content: 'Transfer Amount' },
    { content: 'Status Price', width: 102 },
  ],
};

const sheetHeaderConfigEqt: HeaderConfig = {
  height: 44,
  data: [
    { content: 'No.', width: 40 },
    { content: 'Date', width: 95 },
    { content: 'Beneficiary', width: 95 },
    { content: 'Beneficiary Account', width: 195 },
    { content: 'Bank', width: 150 },
    { content: 'Transfer Amount', width: 135 },
    { content: 'Status', width: 102 },
  ],
};

const CashTransaction_OnPressContactKIS = () => {
  Linking.openURL('https://kisvn.vn/lien-he/').catch(() => true);
};

const CashTransaction = (props: StackScreenProps<'CashTransaction'>) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles, dynamicColors } = useStyles();
  const [fromDate, setFromDate] = useState<Date>(subDays(new Date(), 7));
  const [toDate, setToDate] = useState<Date>(new Date());
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [transferAmountError, setTransferAmountError] = useState<boolean>(false);
  const [transferAmountErrorContent, setTransferAmountErrorContent] = useState<string>('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<CashTransferStatus>(CashTransferStatus.ALL);
  const [typeChoose, _setTypeChoose] = useState<TYPE_OPTION_VALUE>(props.route.params.CashOption);
  const [beneficiaryModalVisible, setBeneficiaryModalVisible] = useState<boolean>(false);
  const [contactKisModalVisible, setContactKisModalVisible] = useState<boolean>(false);

  const [displayModalTransfer, setDisplayModalTransfer] = useState<boolean>(false);
  const generateKisCardResult = useSelector((state: IState) => state.generateKisCardResult);
  const accountList = useSelector((state: IState) => state.accountList);
  const formHeight = useRef<KeyboardAwareScrollView>(null);
  const keyboardHeight = useSelector((state: IState) => state.keyboardHeight);
  const kisCheckOTP = useSelector((state: IState) => state.kisCheckOTP);
  const kisOTPToken = useSelector((state: IState) => state.kisOTPToken);
  const getDerClientCashBalanceShortver = useSelector((state: IState) => state.getDerClientCashBalanceShortver);
  const isFocused = useIsFocused();

  // flow bank transfer
  const selectedAccount = useSelector((state: IState) => state.selectedAccount);
  const bankInfo = useSelector((state: IState) => state.getBankInfo);
  const bankData = bankInfo.data != null && bankInfo.data.length > 0 ? bankInfo.data[0] : null;
  const genFundTransfer = useSelector((state: IState) => state.getGenFundTransfer);
  const cashTransactionHistory = useSelector((state: IState) => state.getCashTransactionHistory);
  const timeFromServer = useSelector((state: IState) => state.checkTradeDate);
  const checkDoFundTransfer = useSelector((state: IState) => state.checkDoFundTransfer);
  const [currentBeneficiary, setCurrentBeneficiary] = useState<queryBankInfoResponse | null>();
  const [currentBeneficiaryDetail, setCurrentBeneficiaryDetail] = useState<beneficiaryAccountDetails | null>();
  const [transferableAmount, setTransferableAmount] = useState<number | null>();
  const [doTransfer, setDoTransfer] = useState<boolean>(false);
  const [isLoadingCashTransferHistory, setIsLoadingCashTransferHistory] = useState(false);
  const [listCashTransferHistory, setListCashTransferHistory] = useState<transactionHistoryDetails[]>([]);
  const [pageCurrent, setPageCurrent] = useState(0);
  const [loadDate, setLoadDate] = useState<boolean | null>(false);
  const [isDepositVSDHistory, setIsDepositVSDHistory] = useState<boolean>(false);
  const [isWithdrawVSDHistory, setIsWithdrawVSDHistory] = useState<boolean>(false);
  // const bankInfoDer = useSelector((state: IState) => state.getBankInfoDer); // wait api core fix, temporary bankinfo api
  const getDerCashDWEnquiry = useSelector((state: IState) => state.getDerCashDWEnquiry);

  const isSelectedDerivatives =
    selectedAccount.type === ACCOUNT_TYPE.KIS &&
    selectedAccount.selectedSubAccount != null &&
    selectedAccount.selectedSubAccount.accountSubs[0] != null &&
    selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES;

  const isSelectedEquity =
    selectedAccount.type === ACCOUNT_TYPE.KIS &&
    selectedAccount.selectedSubAccount != null &&
    selectedAccount.selectedSubAccount.accountSubs[0] != null &&
    selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY;

  useEffect(() => {
    if (selectedAccount.selectedSubAccount != null && isSelectedDerivatives) {
      dispatch(queryDerClientCashBalanceShortver({ accountNo: selectedAccount.selectedSubAccount.accountNumber }));
    }
  }, [selectedAccount.selectedSubAccount]);

  const { valueOTPErrorContent, valueOTPError, otpKisValue, onChangeOtpKisValue, resetFormModalOTPKIS } =
    useModalOTPKis();

  const kisOTPAvailable = useKisOTPAvailable(otpKisValue);

  const CashOption = useMemo(
    () => ({
      [TYPE_OPTION_VALUE.CASH_BANK]: {
        label: 'To Bank Transfer',
        key: TYPE_OPTION_VALUE.CASH_BANK,
      },
      [TYPE_OPTION_VALUE.CASH_INTERNAL]: {
        label: 'Internal Transfer',
        key: TYPE_OPTION_VALUE.CASH_INTERNAL,
      },
      [TYPE_OPTION_VALUE.DEPOSIT_TO_VSD]: {
        label: 'Deposit to VSD',
        key: TYPE_OPTION_VALUE.DEPOSIT_TO_VSD,
        hide: !isSelectedDerivatives,
      },
      [TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD]: {
        label: 'Withdraw from VSD',
        key: TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD,
        hide: !isSelectedDerivatives,
      },
      [TYPE_OPTION_VALUE.CASH_HISTORY]: {
        label: 'Cash History',
        key: TYPE_OPTION_VALUE.CASH_HISTORY,
        hide: true,
      },
      [TYPE_OPTION_VALUE.CASH_ADVANCE]: {
        label: 'Cash Advance',
        key: TYPE_OPTION_VALUE.CASH_ADVANCE,
        hide: true,
      },
    }),
    [isSelectedDerivatives]
  );

  const configCashTransferHistoryDataGrid: ISheetDataConfig = useMemo(
    () => ({
      columnFrozen: 1,
      maxHeightPerRow: 36,
      header: [
        {
          label: ['No.'],
          width: 40,
          element: (_key: string, _rowData: transactionHistoryDetails, _index: number) => (
            <View style={cellStyle} key={`CashTransaction_HistoryTransferList_${_index}`}>
              <Text allowFontScaling={false} style={styles.noNumber}>
                {_index + 1}
              </Text>
            </View>
          ),
        },
        {
          label: ['Date'],
          width: 95,
          element: (_key: string, rowData: transactionHistoryDetails, _index: number) => (
            <View style={styles.cellStyle} key={`CashTransaction_HistoryTransferList_${_index}`}>
              <Text allowFontScaling={false} style={styles.date}>
                {formatStringToDateString(rowData.date, 'dd/MM/yyyy')}
              </Text>
            </View>
          ),
        },
        {
          label: ['Beneficiary'],
          width: 195,
          element: (_key: string, rowData: transactionHistoryDetails, _index: number) => (
            <View style={styles.cellStyle} key={`CashTransaction_HistoryTransferList_${_index}`}>
              <Text allowFontScaling={false} style={styles.date}>
                {rowData.beneficiary !== '' ? rowData.beneficiary : '-'}
              </Text>
            </View>
          ),
        },
        {
          label: ['Beneficiary Account'],
          width: 155,
          element: (_key: string, rowData: transactionHistoryDetails, _index: number) => (
            <View style={styles.cellStyle} key={`CashTransaction_HistoryTransferList_${_index}`}>
              <Text allowFontScaling={false} style={styles.date}>
                {isSelectedDerivatives
                  ? rowData.beneficiaryAccountNo != ''
                    ? rowData.beneficiaryAccountNo
                    : '-'
                  : rowData.beneficiaryAccNo != ''
                  ? rowData.beneficiaryAccNo
                  : '-'}
              </Text>
            </View>
          ),
        },
        {
          label: ['Bank'],
          width: 150,
          element: (_key: string, rowData: transactionHistoryDetails, _index: number) => (
            <View style={styles.cellStyle} key={`CashTransaction_HistoryTransferList_${_index}`}>
              <Text allowFontScaling={false} style={styles.date}>
                {rowData.beneficiaryBank != '' ? rowData.beneficiaryBank : '-'}
              </Text>
            </View>
          ),
        },
        {
          label: ['Transfer Amount'],
          width: 135,
          element: (_key: string, rowData: transactionHistoryDetails, _index: number) => (
            <View style={cellStyle} key={`CashTransaction_HistoryTransferList_${_index}`}>
              <View style={styles.rowTable2}>
                <Text allowFontScaling={false} style={styles.date}>
                  {formatNumber(rowData.transferAmount, 2)}
                </Text>
              </View>
            </View>
          ),
        },
        {
          label: ['Status'],
          width: 102,
          element: (_key: string, rowData: transactionHistoryDetails, _index: number) => (
            <View style={styles.cellStyle} key={`CashTransaction_HistoryTransferList_${_index}`}>
              <Text allowFontScaling={false} style={styles.date}>
                {rowData.status}
              </Text>
            </View>
          ),
        },
      ],
    }),
    [styles, globalStyles, cellStyle, isSelectedDerivatives]
  );

  const onPressConfirmSendOtpKisValue = useCallback(() => {
    Keyboard.dismiss();
    dispatch(checkTradeDate({}));
    const params: IKisVerifyAndSaveOTPRequest = {
      expireTime: 400,
      verifyType: 'MATRIX_CARD',
      wordMatrixId: generateKisCardResult != null ? generateKisCardResult.wordMatrixId : 0,
      wordMatrixValue: otpKisValue,
    };
    dispatch(kisVerifyAndSaveOTP(params, kisVerifyAndSaveOTPFrom.TRADE, onPressCancelOtpKis));
    setDoTransfer(true);
  }, [otpKisValue, generateKisCardResult]);

  const onPressCancelOtpKis = () => {
    // clear generateKisCardResult
    dispatch(onCloseModalOTPKIS({}));
    setDisplayModalTransfer(false);
    resetFormModalOTPKIS();
    dispatch(resetCheckTime({}));
    dispatch(resetDoFundTransferState({}));
  };

  const contentTooltip = useMemo(() => <Text style={styles.tooltipContent}>{t('To bank transfer fee')}</Text>, []);

  const handleTooltip = useCallback(() => {
    setShowTooltip(pre => !pre);
  }, []);

  const onCloseModalContactKis = useCallback(() => {
    setContactKisModalVisible(false);
  }, []);

  const openChooseBeneficiaryModal = useCallback(() => {
    setBeneficiaryModalVisible(true);
  }, []);

  const CloseChooseBeneficiaryModal = useCallback(() => {
    setBeneficiaryModalVisible(false);
  }, []);

  const onSelectBeneficiaryOption = useCallback(
    (value: queryBankInfoResponse) => {
      setCurrentBeneficiary(value);
      setCurrentBeneficiaryDetail(
        genFundTransfer.data?.beneficiaryAccountList.filter(item => item.accountNo === value.bankAccNo)[0]
      );
      CloseChooseBeneficiaryModal();
    },
    [CloseChooseBeneficiaryModal, genFundTransfer.data]
  );

  const onChangeAmount = (value: string) => {
    if (currentBeneficiary == null || transferableAmount == null) return;
    const textAmount = value.replace(/,/g, '');
    if (!isNaN(Number(textAmount))) {
      setTransferAmount(Number(textAmount));
      validateTransferAmount(Number(textAmount));
    } else {
      setTransferAmount(0);
      validateTransferAmount(0);
    }
  };

  const validateTransferAmount = (value?: number): boolean => {
    if (currentBeneficiary == null || transferableAmount == null) return false;
    const finalValue = value ?? transferAmount;
    if (finalValue == null || finalValue === 0) {
      setTransferAmountError(true);
      return false;
    } else if (finalValue > transferableAmount) {
      setTransferAmountError(true);
      setTransferAmountErrorContent(t('OVER_AVAILABLE'));
      return false;
    } else if (finalValue < 50000) {
      setTransferAmountError(true);
      setTransferAmountErrorContent(t('CASH_TRANSACTION_MINIMUM_AMOUNT'));
      return false;
    }
    setTransferAmountError(false);
    setTransferAmountErrorContent('');
    return true;
  };

  const onChangeFromDate = useCallback(
    (value: Date) => {
      if (value !== fromDate) {
        if (isAfter(value, toDate)) {
          setToDate(value);
          setLoadDate(true);
        } else {
          setLoadDate(false);
        }
        setFromDate(value);
        setPageCurrent(0);
      }
    },
    [fromDate, toDate]
  );

  const onChangeToDate = useCallback(
    (value: Date) => {
      setLoadDate(null);
      if (value !== toDate) {
        if (isBefore(value, fromDate)) {
          setFromDate(value);
          setLoadDate(true);
        }
        setToDate(value);
        setPageCurrent(0);
        setLoadDate(false);
      }
    },
    [fromDate, toDate]
  );

  const [optionSelecting, setOptionSelecting] = useState<TYPE_OPTION_VALUE>(() => {
    return props.route.params.CashOption;
  });

  const setTypeChoose = useCallback((value: TYPE_OPTION_VALUE) => {
    _setTypeChoose(value);
    setOptionSelecting(value);
    setTransferAmount(0);
    setTransferAmountError(false);
    setTransferAmountErrorContent('');
  }, []);

  const onSelectOptionSelectingCashTransaction = useCallback(() => {
    if (optionSelecting !== typeChoose) {
      setOptionSelecting(typeChoose);
    }
  }, [optionSelecting, typeChoose]);

  const onSelectOptionSelectingHistoryCashTransaction = useCallback(() => {
    if (optionSelecting !== TYPE_OPTION_VALUE.CASH_HISTORY) {
      setOptionSelecting(TYPE_OPTION_VALUE.CASH_HISTORY);
      if (optionSelecting === TYPE_OPTION_VALUE.DEPOSIT_TO_VSD) {
        setIsDepositVSDHistory(true);
      } else if (optionSelecting === TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD) {
        setIsWithdrawVSDHistory(true);
      }
    }
  }, [optionSelecting]);

  const goChangedCashTransferRequest = () => {
    if (validateTransferAmount()) {
      setDisplayModalTransfer(true);
      accountList?.KIS?.username != null &&
        generateKisCardResult == null &&
        dispatch(generateNewKisCard({ username: accountList.KIS.username, from: generateKisCardFrom.TRADE }));
    }
  };

  const currentStorageToBankHistoryEqt = useMemo(
    () =>
      orderStatusFilter === CashTransferStatus.ALL
        ? listCashTransferHistory ?? []
        : filterV2(listCashTransferHistory, item => item.status === orderStatusFilter),
    [listCashTransferHistory, orderStatusFilter]
  );

  const currentStorageToBankHistoryDer = useMemo(
    () =>
      orderStatusFilter === CashTransferStatus.ALL
        ? getDerCashDWEnquiry.data != null
          ? Object.values(getDerCashDWEnquiry.data)
          : []
        : getDerCashDWEnquiry.data != null
        ? Object.values(getDerCashDWEnquiry.data).filter(item => item.status === orderStatusFilter)
        : [],
    [getDerCashDWEnquiry.data, orderStatusFilter]
  );

  const resetListCashTransferHistory = useCallback(() => {
    setPageCurrent(0);
    setLoadDate(false);
    setListCashTransferHistory([]);
  }, []);

  const onLoadMore = useCallback(() => {
    if (
      cashTransactionHistory.data?.list != null &&
      cashTransactionHistory.data.list.length < PAGE_SIZE &&
      listCashTransferHistory.length < PAGE_SIZE
    ) {
      setIsLoadingCashTransferHistory(false);
    } else if (cashTransactionHistory.data != null && cashTransactionHistory.status !== ReducerStatus.FAILED) {
      setPageCurrent(pageCurrent + 1);
      setLoadDate(false);
      setIsLoadingCashTransferHistory(true);
    }
  }, [cashTransactionHistory, listCashTransferHistory, pageCurrent]);

  const renderLoading = useCallback(() => {
    return isLoadingCashTransferHistory && listCashTransferHistory.length >= PAGE_SIZE ? (
      <Text style={styles.loadingText}>{t('Loading')}...</Text>
    ) : (
      <></>
    );
  }, [isLoadingCashTransferHistory, listCashTransferHistory]);

  useUpdateEffect(() => {
    if (isSelectedDerivatives) {
      switch (typeChoose) {
        case TYPE_OPTION_VALUE.CASH_INTERNAL:
          setTypeChoose(TYPE_OPTION_VALUE.CASH_INTERNAL);
          setOptionSelecting(TYPE_OPTION_VALUE.CASH_INTERNAL);
          break;
        case TYPE_OPTION_VALUE.CASH_BANK:
          setTypeChoose(TYPE_OPTION_VALUE.CASH_BANK);
          setOptionSelecting(TYPE_OPTION_VALUE.CASH_BANK);
          break;
        case TYPE_OPTION_VALUE.DEPOSIT_TO_VSD:
          setTypeChoose(TYPE_OPTION_VALUE.DEPOSIT_TO_VSD);
          setOptionSelecting(TYPE_OPTION_VALUE.DEPOSIT_TO_VSD);
          break;
        case TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD:
          setTypeChoose(TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD);
          setOptionSelecting(TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD);
          break;
        default:
          setTypeChoose(TYPE_OPTION_VALUE.CASH_INTERNAL);
          setOptionSelecting(TYPE_OPTION_VALUE.CASH_INTERNAL);
          break;
      }
    } else if (isSelectedEquity) {
      switch (typeChoose) {
        case TYPE_OPTION_VALUE.CASH_INTERNAL:
          setTypeChoose(TYPE_OPTION_VALUE.CASH_INTERNAL);
          setOptionSelecting(TYPE_OPTION_VALUE.CASH_INTERNAL);
          break;
        case TYPE_OPTION_VALUE.CASH_BANK:
          setTypeChoose(TYPE_OPTION_VALUE.CASH_BANK);
          setOptionSelecting(TYPE_OPTION_VALUE.CASH_BANK);
          break;
        default:
          setTypeChoose(TYPE_OPTION_VALUE.CASH_INTERNAL);
          setOptionSelecting(TYPE_OPTION_VALUE.CASH_INTERNAL);
          break;
      }
    }
    setTransferAmount(0);
    setTransferAmountError(false);
    setTransferAmountErrorContent('');
  }, [selectedAccount.selectedSubAccount, isSelectedDerivatives, isSelectedEquity]);

  // on enter screen
  useEffect(() => {
    if (selectedAccount.selectedSubAccount == null || selectedAccount.username == null || isFocused === false) return;
    if (isSelectedEquity) {
      const accountNoParams = {
        accountNo: selectedAccount.selectedSubAccount.accountNumber,
        clientID: selectedAccount.username,
      };
      dispatch(queryBankInfo(accountNoParams));
      dispatch(queryGenFundTransfer(accountNoParams));
    }

    if (isSelectedDerivatives) {
      // wait api core fix, temporary bankinfo api
      dispatch(queryBankInfo({ accountNo: `${selectedAccount.selectedSubAccount?.accountNumber.slice(0, 7)}X1` }));
    }
    return () => {
      // dispatch(resetBankInfoDer({}));
      dispatch(resetBankInfo({}));
      dispatch(resetDoFundTransferState({}));
      dispatch(resetCashTransactionHistory({}));
    };
  }, [selectedAccount, isFocused, isSelectedEquity]);

  useUpdateEffect(() => {
    if (!displayModalTransfer || !isFocused) return;
    if (keyboardHeight === 0) return;
    formHeight.current != null && formHeight.current.scrollToPosition(0, height, false);
  }, [displayModalTransfer, keyboardHeight, isFocused]);
  useUpdateEffect(() => {
    if (
      selectedAccount.username == null ||
      selectedAccount.selectedSubAccount == null ||
      currentBeneficiary == null ||
      transferableAmount == null ||
      kisOTPToken == null ||
      !isFocused
    ) {
      return;
    }
    if (timeFromServer === false) {
      onPressCancelOtpKis();
      return;
    }
    if (doTransfer === false) return;
    if (isSelectedEquity && currentBeneficiaryDetail != null) {
      const paramsDoTransfer: doFundTransferParams = {
        content: `${t('Withdrawal')} ${selectedAccount.selectedSubAccount?.accountNumber} ${
          currentBeneficiaryDetail.fullName
        }`,
        transferFee: currentBeneficiaryDetail.transferFee,
        transferType: CashTransferType.TO_BANK,
        senderFullName: selectedAccount.username,
        transferAmount: transferAmount,
        senderAccountNo: selectedAccount.selectedSubAccount.accountNumber,
        transferableAmount: transferableAmount,
        beneficiaryBankName: `${bankData?.bankID}-${bankData?.bankname}`,
        beneficiaryFullName: bankData?.ownerName,
        beneficiaryBankBranch: bankData?.bankBranchName,
        beneficiaryBankNumber: bankData?.bankAccNo,
        beneficiaryBankBranchId: bankData?.bankBranchID,
      };
      dispatch(
        postDoFundTransfer(paramsDoTransfer, undefined, undefined, undefined, undefined, {
          handleFail(error) {
            if (error instanceof FulfilledRequestError) {
              if (error.data.code?.includes('prohibit cash withdraw status')) {
                setContactKisModalVisible(true);
              }
            }
          },
        })
      );
    }
    if (isSelectedDerivatives && currentBeneficiary != null && optionSelecting === TYPE_OPTION_VALUE.CASH_BANK) {
      const params: IDerCashDWParams = {
        transferType: CashTransferType.TO_BANK,
        sendingAccountNumber: selectedAccount.selectedSubAccount.accountNumber,
        sendingFullName: selectedAccount.username,
        transferableAmount: transferableAmount,
        transferAmount: transferAmount,
        transferFee: 0,
        content: `${t('Withdrawal')} ${selectedAccount.selectedSubAccount?.accountNumber} ${
          currentBeneficiary.ownerName
        }`,
        beneficiaryFullName: currentBeneficiary.ownerName,
        beneficiaryAccountNumber: currentBeneficiary.bankAccNo,
        beneficiaryBank: currentBeneficiary.bankID,
        beneficiaryBankBranch: currentBeneficiary.bankBranchName,
      };
      dispatch(postDerCashDW(params, { message: 'WITHDRAW_MONEY_SUCCESS' }));
    }
    resetFormModalOTPKIS();
    setDoTransfer(false);
    setTransferAmount(0);
  }, [
    kisOTPToken,
    isFocused,
    optionSelecting,
    currentBeneficiaryDetail,
    selectedAccount,
    transferAmount,
    kisCheckOTP,
    timeFromServer,
    doTransfer,
    isSelectedDerivatives,
    isSelectedEquity,
    transferableAmount,
  ]);

  useEffect(() => {
    if (cashTransactionHistory.data != null && cashTransactionHistory.data.list.length > 0) {
      const oldData = listCashTransferHistory
        .filter(item => item.transferType === 'EXTERNAL')
        .slice(PAGE_SIZE * (pageCurrent - 1));
      if (oldData.length === 0) {
        setListCashTransferHistory(cashTransactionHistory.data.list);
      } else if (isEqual(oldData[0], cashTransactionHistory.data.list[0])) {
        const newListMemberSearch = listCashTransferHistory.concat(cashTransactionHistory.data.list);
        setListCashTransferHistory(newListMemberSearch);
      }
    } else if (
      cashTransactionHistory.data?.list.length === 0 ||
      (cashTransactionHistory.data == null && cashTransactionHistory.status === ReducerStatus.FAILED)
    ) {
      setIsLoadingCashTransferHistory(false);
    }
  }, [cashTransactionHistory]);

  useUpdateEffect(() => {
    if (!checkDoFundTransfer || transferableAmount == null || !isFocused) return;
    onPressCancelOtpKis();
    setTransferableAmount(transferableAmount - transferAmount);
    setTransferAmount(0);
    if (optionSelecting !== TYPE_OPTION_VALUE.CASH_HISTORY) {
      setOptionSelecting(TYPE_OPTION_VALUE.CASH_HISTORY);
    }
  }, [checkDoFundTransfer, transferableAmount, transferAmount]);

  const historyCashTrans = () => {
    if (selectedAccount.selectedSubAccount == null) return;
    if (isSelectedEquity) {
      let calFromDate = subBusinessDays(toDate, PAGE_SIZE * (pageCurrent + 1) + pageCurrent);
      calFromDate = calFromDate > fromDate ? calFromDate : fromDate;
      let calToDate = subBusinessDays(toDate, PAGE_SIZE * pageCurrent + pageCurrent);
      calToDate = calToDate > calFromDate ? calToDate : calFromDate;
      if (isEqual(calFromDate, calToDate) && !isEqual(fromDate, toDate)) {
        return;
      }
      if (loadDate) {
        const params: cashTransactionHistoryParams = {
          accountNo: selectedAccount.selectedSubAccount.accountNumber,
          transferType: CashTransferType.TO_BANK,
          status: orderStatusFilter,
          fromDate: formatDateToString(calFromDate) as string,
          toDate: formatDateToString(calToDate) as string,
          offset: pageCurrent,
          fetchCount: PAGE_SIZE,
          clientID: selectedAccount.username,
        };
        dispatch(queryCashTransactionHistory(params));
        setLoadDate(null);
      } else if (!loadDate) {
        const params: cashTransactionHistoryParams = {
          accountNo: selectedAccount.selectedSubAccount.accountNumber,
          transferType: CashTransferType.TO_BANK,
          status: orderStatusFilter,
          fromDate: formatDateToString(fromDate) as string,
          toDate: formatDateToString(toDate) as string,
          offset: pageCurrent,
          fetchCount: PAGE_SIZE,
          clientID: selectedAccount.username,
        };
        dispatch(queryCashTransactionHistory(params));
        setLoadDate(null);
      }
    }
    if (isSelectedDerivatives) {
      const params: IDerCashDWEnquiryParams = {
        accountNo: selectedAccount.selectedSubAccount.accountNumber,
        transferType: CashTransferType.TO_BANK,
        status: orderStatusFilter,
        fromDate: formatDateToString(fromDate) as string,
        toDate: formatDateToString(toDate) as string,
      };
      dispatch(queryDerCashDWEnquiry(params));
    }
  };

  useUpdateEffect(() => {
    if (optionSelecting !== TYPE_OPTION_VALUE.CASH_HISTORY || typeChoose !== TYPE_OPTION_VALUE.CASH_BANK || !isFocused)
      return;
    historyCashTrans();
  }, [optionSelecting, selectedAccount, isFocused, fromDate, toDate, orderStatusFilter, pageCurrent, loadDate]);

  useUpdateEffect(() => {
    if (optionSelecting === TYPE_OPTION_VALUE.CASH_HISTORY) resetListCashTransferHistory();
    return () => {
      resetListCashTransferHistory();
    };
  }, [optionSelecting, selectedAccount, fromDate, toDate, orderStatusFilter]);

  useEffect(() => {
    if (isSelectedEquity) {
      if (bankInfo.data == null || bankInfo.data.length === 0 || genFundTransfer.data == null || !isFocused) return;
      setCurrentBeneficiary(bankInfo.data[0]);
      const findCurrentBeneficiaryDetail = genFundTransfer.data.beneficiaryAccountList.filter(item =>
        bankInfo.data != null ? item.accountNo === bankInfo.data[0].bankAccNo : false
      );

      setCurrentBeneficiaryDetail(findCurrentBeneficiaryDetail[0]);
      setTransferableAmount(genFundTransfer.data.transferableAmount);
    }

    if (isSelectedDerivatives) {
      if (
        bankInfo.data == null ||
        bankInfo.data.length === 0 ||
        !isFocused ||
        getDerClientCashBalanceShortver.data == null
      ) {
        return;
      }
      setCurrentBeneficiary(bankInfo.data[0]);
      setTransferableAmount(
        optionSelecting === TYPE_OPTION_VALUE.CASH_BANK
          ? getDerClientCashBalanceShortver.data.transferableAmountToInternalSubsOrToBank
          : optionSelecting === TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD
          ? getDerClientCashBalanceShortver.data.transferableAmountOfVSDAccount
          : getDerClientCashBalanceShortver.data.transferableAmountToVSDAccount
      );
    }
  }, [
    bankInfo,
    genFundTransfer.data,
    isFocused,
    getDerClientCashBalanceShortver.data,
    isSelectedDerivatives,
    isSelectedEquity,
    optionSelecting,
  ]);

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={props.navigation.goBack}
        headerTitle={'Cash Transaction'}
        subAccountVisible={true}
        disableVirtualAccount={true}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        keyboardDismissMode={'interactive'}
        style={styles.posRelative}
      >
        <View style={styles.containerBackground}>
          <View style={styles.titleContainer1}>
            <Text style={styles.TitleType}>{t('Type')}</Text>
            <ItemSelector
              config={CashOption}
              value={typeChoose}
              setValue={setTypeChoose}
              containerStyle={styles.typeTextInputContainerStyle}
              labelStyle={styles.colorLightTextContent}
            />
          </View>
          <View style={styles.screenOption}>
            {typeChoose === TYPE_OPTION_VALUE.CASH_INTERNAL ? (
              <TouchableOpacity
                onPress={onSelectOptionSelectingCashTransaction}
                style={[
                  globalStyles.centered,
                  globalStyles.container,
                  styles.optionContainer,
                  optionSelecting === TYPE_OPTION_VALUE.CASH_INTERNAL && styles.optionContainerSelected,
                ]}
              >
                <Text
                  style={
                    optionSelecting === TYPE_OPTION_VALUE.CASH_INTERNAL ? styles.selectedText : styles.unselectedText
                  }
                >
                  {t('Internal Transfer')}
                </Text>
              </TouchableOpacity>
            ) : typeChoose === TYPE_OPTION_VALUE.DEPOSIT_TO_VSD ? (
              <TouchableOpacity
                onPress={onSelectOptionSelectingCashTransaction}
                style={[
                  globalStyles.centered,
                  globalStyles.container,
                  styles.optionContainer,
                  optionSelecting === TYPE_OPTION_VALUE.DEPOSIT_TO_VSD && styles.optionContainerSelected,
                ]}
              >
                <Text
                  style={
                    optionSelecting === TYPE_OPTION_VALUE.DEPOSIT_TO_VSD ? styles.selectedText : styles.unselectedText
                  }
                >
                  {t('Deposit to VSD')}
                </Text>
              </TouchableOpacity>
            ) : typeChoose === TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD ? (
              <TouchableOpacity
                onPress={onSelectOptionSelectingCashTransaction}
                style={[
                  globalStyles.centered,
                  globalStyles.container,
                  styles.optionContainer,
                  optionSelecting === TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD && styles.optionContainerSelected,
                ]}
              >
                <Text
                  style={
                    optionSelecting === TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD
                      ? styles.selectedText
                      : styles.unselectedText
                  }
                >
                  {t('Withdraw from VSD')}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={onSelectOptionSelectingCashTransaction}
                style={[
                  globalStyles.centered,
                  globalStyles.container,
                  styles.optionContainer,
                  optionSelecting === TYPE_OPTION_VALUE.CASH_BANK && styles.optionContainerSelected,
                ]}
              >
                <Text
                  style={optionSelecting === TYPE_OPTION_VALUE.CASH_BANK ? styles.selectedText : styles.unselectedText}
                >
                  {t('To Bank Transfer')}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={onSelectOptionSelectingHistoryCashTransaction}
              style={[
                globalStyles.centered,
                globalStyles.container,
                styles.optionContainer,
                optionSelecting === TYPE_OPTION_VALUE.CASH_HISTORY && styles.optionContainerSelected,
              ]}
            >
              <Text
                style={optionSelecting !== TYPE_OPTION_VALUE.CASH_HISTORY ? styles.unselectedText : styles.selectedText}
              >
                {t('Cash Transfer History')}
              </Text>
            </TouchableOpacity>
          </View>
          {typeChoose === TYPE_OPTION_VALUE.CASH_INTERNAL ? (
            <>
              {optionSelecting === TYPE_OPTION_VALUE.CASH_INTERNAL ? (
                <InternalTransferContent
                  optionSelecting={optionSelecting}
                  switchToCashTransferHistoryTab={() => setOptionSelecting(TYPE_OPTION_VALUE.CASH_HISTORY)}
                />
              ) : (
                <CashTransferHistory />
              )}
            </>
          ) : typeChoose === TYPE_OPTION_VALUE.DEPOSIT_TO_VSD ? (
            <>
              {optionSelecting === TYPE_OPTION_VALUE.DEPOSIT_TO_VSD ? (
                <InternalTransferContent
                  optionSelecting={optionSelecting}
                  switchToCashTransferHistoryTab={() => setOptionSelecting(TYPE_OPTION_VALUE.CASH_HISTORY)}
                />
              ) : (
                <CashTransferHistoryVSD isDepositVSDHistory={isDepositVSDHistory} />
              )}
            </>
          ) : typeChoose === TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD ? (
            <>
              {optionSelecting === TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD ? (
                <InternalTransferContent
                  optionSelecting={optionSelecting}
                  switchToCashTransferHistoryTab={() => setOptionSelecting(TYPE_OPTION_VALUE.CASH_HISTORY)}
                />
              ) : (
                <CashTransferHistoryVSD isWithdrawVSDHistory={isWithdrawVSDHistory} />
              )}
            </>
          ) : (
            <>
              {optionSelecting === TYPE_OPTION_VALUE.CASH_BANK ? (
                <View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.Title}>{t('Transferable Amount')}</Text>
                    <View style={styles.rowTable}>
                      <Text style={styles.TitleAmount}>
                        {transferableAmount != null && transferableAmount.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.Title}>{t('Beneficiary Account')}</Text>
                    <View style={styles.CustomPickerMall}>
                      <TouchableOpacity
                        onPress={openChooseBeneficiaryModal}
                        style={styles.BeneficiaryTextInputContainerStyle}
                      >
                        <Text numberOfLines={1} allowFontScaling={false} style={styles.colorLightTextContent}>
                          {currentBeneficiary != null ? currentBeneficiary.bankAccNo : ''}
                        </Text>
                        <View style={styles.centerIcon}>
                          <Down style={styles.labelIconStyle} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.Title}>{t('Bank')}</Text>
                    <View style={styles.rowTable}>
                      <Text style={styles.TitleAmount}>
                        {currentBeneficiary != null ? currentBeneficiary.bankID : ''}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.Title}>{t('Bank Branch')}</Text>
                    <View style={styles.rowTable}>
                      <Text style={styles.TitleAmount}>
                        {currentBeneficiary != null ? currentBeneficiary.bankBranchName : ''}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.Title}>{t('Beneficiary')}</Text>
                    <View style={styles.rowTable}>
                      <Text style={styles.TitleAmount}>
                        {isSelectedDerivatives
                          ? currentBeneficiary?.ownerName
                          : currentBeneficiaryDetail != null
                          ? currentBeneficiaryDetail.fullName
                          : ''}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.Title}>{t('Transfer Amount')}</Text>
                    <TextInputComponent
                      value={transferAmount === 0 ? '' : formatNumber(transferAmount, 2)}
                      onChangeText={onChangeAmount}
                      wholeContainerStyle={[
                        transferAmountError
                          ? styles.wholeContainerContentStyleError
                          : styles.wholeContainerContentStyle,
                      ]}
                      textInputContainerStyle={[
                        globalStyles.fillHeight,
                        transferAmountError
                          ? styles.textInputContainerContentError
                          : styles.textInputContainerContentStyle,
                      ]}
                      textInputStyle={styles.textInputTransferAmount}
                      textAlignVertical="center"
                      textAlign="right"
                      keyboardType="number-pad"
                      error={transferAmountError}
                      errorContent={transferAmountErrorContent}
                    />
                  </View>
                  <View style={styles.titleContainer}>
                    <View style={styles.rowTable1}>
                      <Text style={styles.TitleTransferFee}>{t('Transfer Fee')}</Text>
                      <TouchableOpacity onPress={handleTooltip}>
                        <Tooltip
                          isVisible={showTooltip}
                          content={contentTooltip}
                          placement="top"
                          onClose={handleTooltip}
                          backgroundColor={Colors.Transparent}
                          contentStyle={styles.tooltip}
                          tooltipStyle={styles.tooltipContainer}
                          disableShadow={true}
                        >
                          <IconInfo height={scaleSize(16)} width={scaleSize(16)} style={styles.iconStyle} />
                        </Tooltip>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.TitleOut}>{t('Out_bank')}</Text>
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.TitleBank}>{t('Content')}:</Text>
                    <Text style={styles.TitleAmount}>
                      {t('Withdrawal')} {selectedAccount.selectedSubAccount?.accountNumber}{' '}
                      {currentBeneficiaryDetail != null ? currentBeneficiaryDetail.fullName : ''}
                    </Text>
                  </View>
                  <View style={styles.transferTime}>
                    <Text>
                      {t('Available time for cash transfer requests is from 08:00 to 16:00 every trading day')}
                    </Text>
                  </View>
                  <View style={globalStyles.container} />
                  <View style={styles.executeFormContainer}>
                    <TouchableOpacity
                      onPress={goChangedCashTransferRequest}
                      disabled={
                        transferAmount <= 0 || (transferableAmount != null && transferAmount > transferableAmount)
                      }
                      style={[
                        styles.executeFormButton,
                        (transferAmount === 0 || (transferableAmount != null && transferAmount > transferableAmount)) &&
                          styles.executeFormDisableButton,
                      ]}
                    >
                      <Text allowFontScaling={false} style={styles.executeFormButtonText}>
                        {t('Transfer')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.containerBackground}>
                  <View style={styles.titleContainer1}>
                    <Text style={styles.TitleStatus}>{t('Status')}</Text>
                    <ItemSelector
                      config={OrderStatus}
                      value={orderStatusFilter}
                      setValue={setOrderStatusFilter}
                      containerStyle={styles.typeTextInputContainerStyle}
                      labelStyle={styles.colorLightTextContent}
                    />
                  </View>
                  <View style={styles.dateSpace}>
                    <View style={styles.dateHorizontal}>
                      <DatePicker
                        label={t('From date')}
                        onChange={onChangeFromDate}
                        value={fromDate}
                        maxDate={new Date()}
                      />
                    </View>
                    <View style={styles.dateSpace1}>
                      <DatePicker label={t('To date')} onChange={onChangeToDate} value={toDate} maxDate={new Date()} />
                    </View>
                  </View>
                  <View>
                    {isSelectedEquity
                      ? currentStorageToBankHistoryEqt != null &&
                        currentStorageToBankHistoryEqt.length > 0 && (
                          <SheetData
                            data={currentStorageToBankHistoryEqt}
                            config={configCashTransferHistoryDataGrid}
                            renderFooter={renderLoading}
                            requestLoadMore={onLoadMore}
                            iniData={PAGE_SIZE}
                          />
                        )
                      : null}
                    {isSelectedEquity ? (
                      (currentStorageToBankHistoryEqt != null &&
                        currentStorageToBankHistoryEqt.length === 0 &&
                        cashTransactionHistory.status === ReducerStatus.SUCCESS) ||
                      currentStorageToBankHistoryEqt == null ? (
                        <>
                          <SheetDataHeader {...sheetHeaderConfigEqt} />
                          <View style={styles.noDataCon}>
                            {cashTransactionHistory.status === ReducerStatus.LOADING ? (
                              <ActivityIndicator size="small" color={Colors.DARK_GREEN} />
                            ) : (
                              <>
                                <EmptySymbol />
                                <Text style={styles.noDataText}>{t('There is no data')}</Text>
                              </>
                            )}
                          </View>
                        </>
                      ) : null
                    ) : null}
                    {isSelectedDerivatives ? (
                      <>
                        {currentStorageToBankHistoryDer != null && currentStorageToBankHistoryDer.length > 0 ? (
                          <View style={globalStyles.container}>
                            <SheetData
                              config={configCashTransferHistoryDataGrid}
                              data={currentStorageToBankHistoryDer}
                            />
                          </View>
                        ) : null}
                        {(getDerCashDWEnquiry.status === ReducerStatus.SUCCESS &&
                          currentStorageToBankHistoryDer != null &&
                          currentStorageToBankHistoryDer.length === 0) ||
                        currentStorageToBankHistoryDer == null ? (
                          <>
                            <SheetDataHeader {...sheetHeaderConfigDer} />
                            <View style={styles.noDataCon}>
                              {getDerCashDWEnquiry.status === ReducerStatus.LOADING ? (
                                <ActivityIndicator size="small" color={Colors.DARK_GREEN} />
                              ) : (
                                <>
                                  <EmptySymbol />
                                  <Text style={styles.noDataText}>{t('There is no data')}</Text>
                                </>
                              )}
                            </View>
                          </>
                        ) : null}
                      </>
                    ) : null}
                  </View>
                </View>
              )}
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
      <Modal visible={displayModalTransfer}>
        <View style={styles.modalBackground2}>
          <KeyboardAwareScrollView contentContainerStyle={styles.modalScrollContentContainer}>
            <View style={styles.modalContainer}>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitleText2}>{t('Please enter OTP code to confirm')}</Text>
              </View>
              <View style={styles.textBlockStyle}>
                <Text style={styles.optionTitle}>{t('Sender Acc.No')}</Text>
                <Text style={styles.optionValue}>{selectedAccount.username}</Text>
              </View>
              <View style={styles.textBlockStyle}>
                <Text style={styles.optionTitle}>{t('Beneficiary Account')}</Text>
                <Text style={styles.optionValue}>{currentBeneficiary != null ? currentBeneficiary.bankAccNo : ''}</Text>
              </View>
              <View style={styles.textBlockStyle}>
                <Text style={styles.optionTitle}>{t('Bank')}</Text>
                <Text style={styles.optionValue}>{currentBeneficiary != null ? currentBeneficiary.bankID : ''}</Text>
              </View>
              <View style={styles.textBlockStyle}>
                <Text style={styles.optionTitle}>{t('Bank Branch')}</Text>
                <Text style={styles.optionValue}>
                  {currentBeneficiary != null ? currentBeneficiary.bankBranchName : ''}
                </Text>
              </View>
              <View style={styles.textBlockStyle}>
                <Text style={styles.optionTitle}>{t('Full Name')}</Text>
                <Text style={styles.optionValue}>
                  {isSelectedDerivatives
                    ? currentBeneficiary?.ownerName
                    : currentBeneficiaryDetail != null
                    ? currentBeneficiaryDetail.fullName
                    : ''}
                </Text>
              </View>
              <View style={styles.textBlockStyle}>
                <Text style={styles.optionTitle}>{t('Transfer Amount')}</Text>
                <Text numberOfLines={1} style={styles.optionValue}>
                  {transferAmount.toLocaleString()}
                </Text>
              </View>
              <View style={styles.textBlockStyle}>
                <Text style={styles.optionTitle}>{t('Transfer Fee')}</Text>
                <Text style={styles.optionValue}>{t('Out_bank')}</Text>
              </View>
              <View style={styles.textBlockStyle}>
                <Text style={styles.optionContent}>{t('Content')}</Text>
                <Text style={styles.optionValueContent}>
                  {t('Withdrawal')} {selectedAccount.selectedSubAccount?.accountNumber}{' '}
                  {currentBeneficiaryDetail != null ? currentBeneficiaryDetail.fullName : ''}
                </Text>
              </View>
              <View style={styles.marginBottomHaveBorder16}>
                <ModalOTPKIS
                  valueOTP={otpKisValue}
                  onChangeValueOTP={onChangeOtpKisValue}
                  generateKisCardResult={generateKisCardResult}
                  ListContentModal={true}
                  valueOTPError={valueOTPError}
                  valueOTPErrorContent={valueOTPErrorContent}
                />
                <View style={styles.spaceOtp}>
                  <TouchableOpacity
                    onPress={onPressConfirmSendOtpKisValue}
                    style={[
                      globalStyles.centered,
                      kisOTPAvailable ? styles.executeFormButton3 : styles.executeFormButton2,
                    ]}
                    disabled={!kisOTPAvailable}
                  >
                    <Text
                      allowFontScaling={false}
                      style={
                        otpKisValue.trim() !== '' ? styles.executeFormButtonText2 : styles.executeFormButtonTextDisable
                      }
                    >
                      {t('Confirm')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={globalStyles.fillWidth}>
                  <TouchableOpacity onPress={onPressCancelOtpKis} style={styles.cancelExecuteFormButton2}>
                    <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText2}>
                      {t('Cancel')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>
      <Modal visible={beneficiaryModalVisible} onRequestClose={CloseChooseBeneficiaryModal}>
        <View style={styles.modalBackground1}>
          <View style={styles.modalContentContainer}>
            <View style={styles.topInfo}></View>
            <View style={styles.modalTitle}>
              <Text allowFontScaling={false} style={styles.filterText}>
                {t('Choose Beneficiary Account')}
              </Text>
              <TouchableOpacity style={styles.closeType} onPress={CloseChooseBeneficiaryModal}>
                <CloseFilter height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
            </View>
            {bankInfo.data != null &&
              currentBeneficiary != null &&
              bankInfo.data.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onSelectBeneficiaryOption(item)}
                    style={styles.filterItemContainer}
                  >
                    <Text
                      numberOfLines={1}
                      style={[
                        globalStyles.container,
                        styles.filterTextValueType,
                        currentBeneficiary.bankAccNo === item.bankAccNo
                          ? styles.filterTextValueSelected
                          : styles.filterTextValueUnselected,
                      ]}
                    >
                      {item.bankAccNo}
                    </Text>
                    {currentBeneficiary.bankAccNo === item.bankAccNo && (
                      <FilterSelectIcon height={scaleSize(11)} width={scaleSize(18)} />
                    )}
                  </TouchableOpacity>
                );
              })}
          </View>
          <TouchableOpacity style={globalStyles.invisibleBackground} onPress={CloseChooseBeneficiaryModal} />
        </View>
      </Modal>
      <Modal visible={contactKisModalVisible} onRequestClose={onCloseModalContactKis}>
        <View style={styles.modalBackground3}>
          <View style={styles.modalContentContainer2}>
            <View style={styles.paaveLogoContainer}>
              <PaaveLogo />
            </View>
            <Text allowFontScaling={false} style={styles.transactionErrorText}>
              {t('Account unable to withdraw due to unfinished contract')}
            </Text>
            <View style={globalStyles.flexDirectionRow}>
              <PaaveButton
                type={'SOLID'}
                color={dynamicColors.LIGHTBGTab}
                textColor={dynamicColors.BlueNewColor}
                style={styles.btnErrorContainer}
                textStyle={styles.btnErrorText}
                onPress={onCloseModalContactKis}
              >
                <Text allowFontScaling={false}>{t('Back')}</Text>
              </PaaveButton>
              <PaaveButton
                type={'SOLID'}
                color={dynamicColors.BlueNewColor}
                style={styles.btnErrorContainer}
                textStyle={styles.btnErrorText}
                onPress={CashTransaction_OnPressContactKIS}
              >
                <Text allowFontScaling={false}>{t('Contact KIS')}</Text>
              </PaaveButton>
            </View>
          </View>
          <TouchableOpacity style={globalStyles.invisibleBackground} onPress={onCloseModalContactKis} />
        </View>
      </Modal>
      <LoginRequiredModal />
    </View>
  );
};

export default memo(CashTransaction);
