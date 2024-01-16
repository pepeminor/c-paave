import React, { memo, useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Keyboard, ScrollView, Platform } from 'react-native';
import HeaderScreen from 'components/HeaderScreen';
import useStyles from './styles';
import globalStyles, { height } from 'styles';
import Down from 'assets/icon/Down.svg';
import SheetData, { ISheetDataConfig } from 'components/SheetData';
import { formatNumber, navigateBack } from 'utils';
import TextInputComponent from 'components/TextInput';
// import Search from 'assets/icon/Search.svg';
import DatePicker from 'components/DatePicker';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../reduxs/global-reducers/index';
import { querySubAccountRetrieveResponse } from '../../interfaces/bankTransfer';
import { scaleSize } from '../../styles/index';
import FilterSelectIcon from 'assets/icon/FilterSelectIcon.svg';
import CloseFilter from 'assets/icon/CloseFilter.svg';
import Modal from 'components/Modal';
import { subDays, subBusinessDays, isEqual, isBefore, isAfter } from 'date-fns';
import { querySubAccountRetrieve } from '../../reduxs/global-actions/BankTransfer';
import {
  queryListInstrumentPortfolio,
  queyListStockTransferHistory,
  checkStockTransferAvailable,
} from '../../reduxs/global-actions/StockTransfer';
import useUpdateEffect from '../../hooks/useUpdateEffect/index';
import {
  IQueryStockTransferHistoryResponse,
  IQueryListInstrumentPortfolioResponse,
} from '../../interfaces/stockTransfer';
import config from 'config';
import { formatDateToString, formatStringToDateString } from '../../utils';
import { IQueryStockTransferHistoryParams } from '../../interfaces/stockTransfer';
import {
  doStockTransfer,
  resetCheckTimeStockTransfer,
  resetCheckDoStockTransfer,
} from '../../reduxs/global-actions/StockTransfer';
import { alertMessage } from '../../utils';
import { IAccount, IKisVerifyAndSaveOTPRequest } from '../../interfaces/common';
import { kisVerifyAndSaveOTP } from '../LoginRealAccount/actions';
import { kisVerifyAndSaveOTPFrom } from '../../interfaces/authentication';
import ModalOTPKIS from 'components/ModalOTPKIS';
import { ReducerStatus } from '../../interfaces/reducer';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import { generateNewKisCard, generateKisCardFrom } from '../../reduxs/global-actions/Authentication';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useIsFocused } from '@react-navigation/native';
import { setSelectedAccount } from 'components/AccountPicker/actions';
import { getEquityKisAccount } from 'reduxs/global-reducers/AccountList';
import { SYSTEM_TYPE } from 'global';
import useKisOTPAvailable from 'hooks/useKisOTPAvailable';

enum IStockTransferScreenOption {
  STOCK_LIST = 'Stock Balance',
  STOCK_TRANSFER_HISTORY = 'Stock Transfer History',
}

interface IItemList {
  label: string;
  value: string;
  default?: boolean;
}

const cellStyle = [globalStyles.container2, globalStyles.centered];

const PAGE_SIZE = config.pageSize;

const StockTransfer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const { styles } = useStyles();

  const contentStyle = [
    globalStyles.flexDirectionRow,
    globalStyles.justifySpaceBetween,
    globalStyles.alignCenter,
    styles.textBlockStyle,
  ];

  const [optionSelecting, setOptionSelecting] = useState<IStockTransferScreenOption>(
    IStockTransferScreenOption.STOCK_LIST
  );
  const [transferQtt, setTransferQtt] = useState<number>(0);
  const [transferQttError, setTransferQttError] = useState<boolean>(false);
  const [transferQttErrorContent, setTransferQttErrorContent] = useState<string>('');
  // const [searchText, setSearchText] = useState<string>('');
  const [transferModal, setTransferModal] = useState(false);
  const listStockResponse = useSelector((state: IState) => state.getListInstrumentPortfolio.data);
  const listStockStatus = useSelector((state: IState) => state.getListInstrumentPortfolio.status);
  const [listStock, setListStock] = useState<IQueryListInstrumentPortfolioResponse[] | null>();
  const listStockTransferHistoryResponse = useSelector((state: IState) => state.getStockTransferHistory.data);
  const listStockTransferHistoryStatus = useSelector((state: IState) => state.getStockTransferHistory.status);
  const selectedAccount = useSelector((state: IState) => state.selectedAccount);
  const selectedAccountUsername = useSelector((state: IState) => state.selectedAccount.username);
  const subAccounts = useSelector((state: IState) => state.selectedAccount.subAccounts);
  const accountNumber = useSelector((state: IState) => state.selectedAccount.selectedSubAccount?.accountNumber);
  const retrieveSubAccountData = useSelector((state: IState) => state.getSubAccountRetrieve.data);
  const isAvailable = useSelector((state: IState) => state.checkStockTransferAvailable);
  const [subAccountData, setSubAccountData] = useState<IItemList[]>([]);
  const [beneficiaryAccountNo, setBeneficiaryAccountNo] = useState<IItemList | null>();
  const [beneficiaryModalVisible, setBeneficiaryModalVisible] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date>(subDays(new Date(), 7));
  const [toDate, setToDate] = useState<Date>(new Date());
  const [pageCurrent, setPageCurrent] = useState(0);
  const [loadDate, setLoadDate] = useState<boolean | null>(false);
  const [selectedSymbol, setSelectedSymbol] = useState<IQueryListInstrumentPortfolioResponse | null>();
  const kisClientID = useSelector((state: IState) => state.accountList['KIS']?.username);
  const kisOTPToken = useSelector((state: IState) => state.kisOTPToken);
  const [otpKisValue, setOtpKisValue] = useState<string>('');
  const [valueOTPError, setValueOTPError] = useState<boolean>(false);
  const [valueOTPErrorContent, setValueOTPErrorContent] = useState<string>('');
  const generateKisCardResult = useSelector((state: IState) => state.generateKisCardResult);
  const [isLoadingStockTransferHistory, setIsLoadingStockTransferHistory] = useState(false);
  const [listStockTransferHistory, setListStockTransferHistory] = useState<IQueryStockTransferHistoryResponse[]>([]);
  const kisCheckOTP = useSelector((state: IState) => state.kisCheckOTP);
  const checkDoTransfer = useSelector((state: IState) => state.checkDoStockTransfer);
  const accountList = useSelector((state: IState) => state.accountList.KIS?.username);
  const accountListEqtKis = useSelector((state: IState) => state.accountList);
  const clickedConfirmOTP = useRef(false);
  const formHeight = useRef<KeyboardAwareScrollView>(null);
  const keyboardHeight = useSelector((state: IState) => state.keyboardHeight);
  const kisOTPErrorValue = useSelector((state: IState) => state.kisOTPErrorValue);

  const kisOTPAvailable = useKisOTPAvailable(otpKisValue);

  const validateTransferQtt = useCallback(
    (value?: number): boolean => {
      if (value == null || selectedSymbol == null) return false;
      if (value > selectedSymbol.availableVolume) {
        setTransferQttError(true);
        setTransferQttErrorContent(t('OVER_AVAILABLE'));
        return false;
      } else {
        setTransferQttError(false);
        setTransferQttErrorContent('');
        return true;
      }
    },
    [selectedSymbol]
  );

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
      if (value !== toDate) {
        if (isBefore(value, fromDate)) {
          setFromDate(value);
          setLoadDate(true);
        } else {
          setLoadDate(false);
        }
        setToDate(value);
        setPageCurrent(0);
      }
    },
    [toDate, fromDate]
  );

  const onSelectOptionSelectingStockHistory = useCallback(() => {
    if (optionSelecting !== IStockTransferScreenOption.STOCK_TRANSFER_HISTORY) {
      setOptionSelecting(IStockTransferScreenOption.STOCK_TRANSFER_HISTORY);
    }
  }, [optionSelecting]);

  const onSelectOptionSelectingStockTransfer = useCallback(() => {
    if (optionSelecting !== IStockTransferScreenOption.STOCK_LIST) {
      setOptionSelecting(IStockTransferScreenOption.STOCK_LIST);
    }
  }, [optionSelecting]);

  const resetFormModalOTPKIS = useCallback(() => {
    setOtpKisValue('');
    setValueOTPError(false);
    setValueOTPErrorContent('');
  }, []);

  const onChangeOtpKisValue = useCallback(
    (value: string) => {
      setOtpKisValue(value);
      if (valueOTPError) {
        setValueOTPError(false);
        setValueOTPErrorContent('');
      }
    },
    [valueOTPError]
  );

  const onLoadMore = useCallback(() => {
    if (
      listStockTransferHistoryResponse != null &&
      listStockTransferHistoryResponse.length < PAGE_SIZE &&
      listStockTransferHistory.length < PAGE_SIZE
    ) {
      setIsLoadingStockTransferHistory(false);
    } else if (listStockTransferHistory != null && listStockTransferHistoryStatus !== ReducerStatus.FAILED) {
      setPageCurrent(pageCurrent + 1);
      setLoadDate(false);
      setIsLoadingStockTransferHistory(true);
    }
  }, [listStockTransferHistoryResponse, listStockTransferHistory, pageCurrent, listStockTransferHistoryStatus]);

  const onPressConfirmSendOtpKisValue = useCallback(() => {
    Keyboard.dismiss();
    const params: IKisVerifyAndSaveOTPRequest = {
      expireTime: 400,
      verifyType: 'MATRIX_CARD',
      wordMatrixId: generateKisCardResult != null ? generateKisCardResult.wordMatrixId : 0,
      wordMatrixValue: otpKisValue,
    };
    dispatch(kisVerifyAndSaveOTP(params, kisVerifyAndSaveOTPFrom.TRADE));
    clickedConfirmOTP.current = true;
  }, [generateKisCardResult, clickedConfirmOTP, otpKisValue]);

  const configStockTransferHistoryDataGrid: ISheetDataConfig = useMemo(
    () => ({
      columnFrozen: 1,
      maxHeightPerRow: 38,
      header: [
        {
          label: ['Symbol'],
          width: 61,
          element: (_key: string, rowData: IQueryStockTransferHistoryResponse, _index: number) => (
            <View style={cellStyle}>
              <Text allowFontScaling={false} style={styles.textCenter}>
                {rowData.symbol}
              </Text>
            </View>
          ),
        },
        {
          label: ['Date'],
          width: 95,
          element: (_key: string, rowData: IQueryStockTransferHistoryResponse, _index: number) => (
            <View style={[cellStyle, styles.borderRightCell]}>
              <Text allowFontScaling={false} style={styles.textCenter}>
                {formatStringToDateString(rowData.requestTime.slice(0, 8), 'dd/MM/yyyy')}
              </Text>
            </View>
          ),
        },
        {
          label: ['Received Acc'],
          width: 105,
          element: (_key: string, rowData: IQueryStockTransferHistoryResponse, _index: number) => (
            <View style={[cellStyle, globalStyles.alignEnd, styles.borderRightCell]}>
              <Text allowFontScaling={false} style={styles.text}>
                {rowData.remark.split('>')[1].split(':')[0]}
              </Text>
            </View>
          ),
        },
        {
          label: ['Qtt'],
          width: 85,
          element: (_key: string, rowData: IQueryStockTransferHistoryResponse, _index: number) => (
            <View style={[cellStyle, globalStyles.alignEnd, styles.borderRightCell]}>
              <Text allowFontScaling={false} style={styles.text}>
                {formatNumber(rowData.volume)}
              </Text>
            </View>
          ),
        },
        {
          label: ['Status'],
          width: 85,
          element: (_key: string, rowData: IQueryStockTransferHistoryResponse, _index: number) => (
            <View style={[cellStyle, globalStyles.alignEnd, styles.borderRightCell]}>
              <Text allowFontScaling={false} style={styles.text}>
                {t(rowData.status)}
              </Text>
            </View>
          ),
        },
      ],
    }),
    [cellStyle, styles]
  );

  const openTransferSymbolModal = useCallback(
    (item: IQueryListInstrumentPortfolioResponse) => () => {
      setTransferQtt(0);
      setSelectedSymbol(item);
      setTransferModal(true);
      if (accountList == null || (kisOTPToken != null && kisOTPToken.length > 0)) return;
      dispatch(generateNewKisCard({ username: accountList, from: generateKisCardFrom.TRADE }));
    },
    [accountList, kisOTPToken]
  );

  const disableButtonTransfer = useMemo(
    () => (subAccounts != null && subAccounts.length > 1 ? false : true),
    [subAccounts]
  );

  const configBalanceDataGrid: ISheetDataConfig = useMemo(
    () => ({
      columnFrozen: 3,
      maxHeightPerRow: 40,
      header: [
        {
          label: ['Symbol'],
          width: 85,
          element: (_key: string, rowData: IQueryListInstrumentPortfolioResponse, _index: number) => (
            <View style={[cellStyle, globalStyles.centered, styles.borderRightCell]}>
              <Text allowFontScaling={false} style={styles.textSymbol}>
                {rowData.stockSymbol}
              </Text>
            </View>
          ),
        },
        {
          label: ['Available Qtt'],
          width: 125,
          element: (_key: string, rowData: IQueryListInstrumentPortfolioResponse, _index: number) => (
            <View style={[cellStyle, globalStyles.alignEnd, styles.borderRightCell]}>
              <Text allowFontScaling={false} style={styles.textQtt}>
                {formatNumber(rowData.availableVolume)}
              </Text>
            </View>
          ),
        },
        {
          label: [''],
          width: 163,
          element: (_key: string, rowData: IQueryListInstrumentPortfolioResponse, _index: number) => (
            <View style={[globalStyles.justifySpaceBetween, globalStyles.alignCenter]}>
              <TouchableOpacity
                style={disableButtonTransfer ? styles.TransferButtonDisabled : styles.TransferButton}
                onPress={openTransferSymbolModal(rowData)}
                disabled={disableButtonTransfer}
              >
                <Text style={styles.TransferText}>{t('Transfer')}</Text>
              </TouchableOpacity>
            </View>
          ),
        },
      ],
    }),
    [openTransferSymbolModal, subAccounts, t, styles, cellStyle]
  );

  // const onChangeSearchText = (text: string) => {
  //   setSearchText(text);
  //   setLoadDate(false);
  // };

  const renderLoading = () => {
    return isLoadingStockTransferHistory && listStockTransferHistory.length >= PAGE_SIZE ? (
      <Text style={styles.loadingText}>{t('Loading')}...</Text>
    ) : (
      <></>
    );
  };

  const listStockTransfer = useMemo(() => {
    return (
      <>
        {listStockTransferHistory != null &&
          listStockTransferHistoryResponse != null &&
          listStockTransferHistoryResponse.length > 0 && (
            <View style={[globalStyles.container2, styles.wrapSheet]}>
              <SheetData
                scrollEnabled={true}
                data={listStockTransferHistory}
                config={configStockTransferHistoryDataGrid}
                renderFooter={renderLoading}
                requestLoadMore={onLoadMore}
                iniData={PAGE_SIZE}
              />
            </View>
          )}
        {listStockTransferHistoryStatus === ReducerStatus.SUCCESS &&
          listStockTransferHistoryResponse != null &&
          listStockTransferHistoryResponse.length === 0 && (
            <View style={styles.noDataCon}>
              <EmptySymbol />
              <Text style={styles.noDataText}>{t('There is no data')}</Text>
            </View>
          )}
      </>
    );
  }, [
    listStockTransferHistoryResponse,
    listStockTransferHistoryStatus,
    listStockTransferHistory,
    isLoadingStockTransferHistory,
    configStockTransferHistoryDataGrid,
  ]);

  const listStockContainer = useMemo(() => {
    return (
      <>
        {listStock != null && listStock.length > 0 && (
          <View style={[styles.tableStyle]}>
            <SheetData data={listStock} config={configBalanceDataGrid} />
          </View>
        )}
        {listStockStatus === ReducerStatus.SUCCESS && listStockResponse != null && listStockResponse.length === 0 && (
          <View style={styles.noDataCon}>
            <EmptySymbol />
            <Text style={styles.noDataText}>{t('There is no data')}</Text>
          </View>
        )}
      </>
    );
  }, [listStock, listStockResponse, listStockStatus]);

  const onOpenModalBeneficiaryModal = useCallback(() => {
    setBeneficiaryModalVisible(true);
  }, []);

  const fromDateMemo = useMemo(() => {
    return (
      <View style={[globalStyles.container, styles.marginLeft16, styles.marginRight16]}>
        <DatePicker label={'From date'} onChange={onChangeFromDate} value={fromDate} maxDate={new Date()} />
      </View>
    );
  }, [fromDate]);

  const toDateMemo = useMemo(() => {
    return (
      <View style={[globalStyles.container, styles.marginRight16]}>
        <DatePicker label={'To date'} onChange={onChangeToDate} value={toDate} maxDate={new Date()} />
      </View>
    );
  }, [toDate]);

  // const iconSearch = (
  //   <Search height={scaleSize(24)} width={scaleSize(24)} style={styles.iconStyle} />
  // );

  // const inputText = useMemo(() => {
  //   return (
  //     <TextInputComponent
  //       value={searchText}
  //       onChangeText={onChangeSearchText}
  //       wholeContainerStyle={styles.ContentContainerStyle}
  //       textInputContainerStyle={[globalStyles.fillHeight, styles.textInputContainerContainerStyle]}
  //       textInputStyle={[styles.textInputStyle]}
  //       textAlignVertical="top"
  //       iconRight={iconSearch}
  //     />
  //   );
  // }, [searchText]);

  const renderContent = useMemo(
    () => (
      <View style={globalStyles.container}>
        <View
          style={[globalStyles.flexDirectionRow, styles.optionContainer, styles.screenOption, globalStyles.centered]}
        >
          <TouchableOpacity
            onPress={onSelectOptionSelectingStockTransfer}
            style={[
              globalStyles.centered,
              styles.TabOptionContainer,
              optionSelecting === IStockTransferScreenOption.STOCK_LIST && styles.optionContainerSelected,
            ]}
          >
            <Text
              style={
                optionSelecting === IStockTransferScreenOption.STOCK_LIST ? styles.selectedText : styles.unselectedText
              }
            >
              {t('Stock Balance')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSelectOptionSelectingStockHistory}
            style={[
              globalStyles.centered,
              styles.TabOptionContainer,
              optionSelecting === IStockTransferScreenOption.STOCK_TRANSFER_HISTORY && styles.optionContainerSelected,
            ]}
          >
            <Text
              style={
                optionSelecting === IStockTransferScreenOption.STOCK_TRANSFER_HISTORY
                  ? styles.selectedText
                  : styles.unselectedText
              }
            >
              {t('Stock Transfer History')}
            </Text>
          </TouchableOpacity>
        </View>
        {optionSelecting === IStockTransferScreenOption.STOCK_LIST ? (
          <View>
            <View style={contentStyle}>
              <Text style={styles.optionTitle}>{t('Beneficiary Account')}</Text>
              <TouchableOpacity
                onPress={onOpenModalBeneficiaryModal}
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
                  <Down style={styles.labelIconStyle} />
                </View>
              </TouchableOpacity>
            </View>
            {listStockContainer}
          </View>
        ) : (
          <View>
            {/* <View style={contentStyle}>
            <Text style={styles.nameText}>{t('Symbol')}</Text>
            {inputText}
          </View> */}
            <View style={styles.marginBottom8} />
            <View style={[globalStyles.flexDirectionRow, globalStyles.fillWidth, styles.marginBottom16]}>
              {fromDateMemo}
              {toDateMemo}
            </View>
            {listStockTransfer}
          </View>
        )}
      </View>
    ),
    [
      optionSelecting,
      fromDateMemo,
      toDateMemo,
      listStockTransfer,
      styles,
      beneficiaryAccountNo,
      onOpenModalBeneficiaryModal,
      onSelectOptionSelectingStockHistory,
    ]
  );

  const closeChooseBeneficiaryModal = useCallback(() => {
    setBeneficiaryModalVisible(false);
  }, []);
  const chooseBeneficiaryModal = useCallback(
    (item: IItemList) => () => {
      setBeneficiaryAccountNo(item);
      closeChooseBeneficiaryModal();
    },
    []
  );

  const selectAccountModal = useMemo(() => {
    return (
      <Modal
        visible={beneficiaryModalVisible}
        onRequestClose={closeChooseBeneficiaryModal}
        childrenContent={
          <View style={[globalStyles.container, styles.modalBackground, globalStyles.justifyEnd]}>
            <View style={[globalStyles.justifyCenter, styles.modalContentContainer1]}>
              <View style={styles.topInfo}></View>
              <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.modalTitle]}>
                <Text allowFontScaling={false} style={[globalStyles.container, styles.filterText]}>
                  {t('Choose Beneficiary Account')}
                </Text>
                <TouchableOpacity style={[styles.closeType]} onPress={closeChooseBeneficiaryModal}>
                  <CloseFilter height={scaleSize(24)} width={scaleSize(24)} />
                </TouchableOpacity>
              </View>
              {subAccountData != null &&
                beneficiaryAccountNo != null &&
                subAccountData.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={chooseBeneficiaryModal(item)}
                      style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.filterItemContainer]}
                    >
                      <Text
                        numberOfLines={1}
                        style={[
                          globalStyles.container,
                          styles.filterTextValueType,
                          beneficiaryAccountNo.label === item.label
                            ? styles.filterTextValueSelected
                            : styles.filterTextValueUnselected,
                        ]}
                      >
                        {t(item.label)}
                      </Text>
                      {beneficiaryAccountNo.label === item.label && (
                        <FilterSelectIcon height={scaleSize(11)} width={scaleSize(18)} />
                      )}
                    </TouchableOpacity>
                  );
                })}
            </View>
            <TouchableOpacity style={globalStyles.invisibleBackground} onPress={closeChooseBeneficiaryModal} />
          </View>
        }
      />
    );
  }, [beneficiaryModalVisible, subAccountData, beneficiaryAccountNo?.label]);

  const closeTransferModal = useCallback(() => {
    setTransferModal(false);
    setTransferQttError(false);
    setTransferQttErrorContent('');
    resetFormModalOTPKIS();
  }, []);

  const onConfirmTransfer = useCallback(() => {
    setTransferModal(false);
    if (accountNumber == null) return;
    dispatch(checkStockTransferAvailable({ accountNo: accountNumber }));
  }, [accountNumber]);

  const onChangeQtt = useCallback((value: string) => {
    const textAmount = value.replace(/,/g, '');
    if (!isNaN(Number(textAmount))) {
      setTransferQtt(Number(textAmount));
      validateTransferQtt(Number(textAmount));
    } else {
      setTransferQtt(0);
      validateTransferQtt(0);
    }
  }, []);

  const resetListStockTransferHistory = useCallback(() => {
    setPageCurrent(0);
    setLoadDate(false);
    setListStockTransferHistory([]);
  }, []);

  const contentOfModal = useMemo(() => {
    return (
      <View style={[globalStyles.container, styles.modalContentContainer, globalStyles.overflowHidden]}>
        <View style={[globalStyles.centered, styles.modalTitle]}>
          <Text allowFontScaling={false} style={[styles.modalTitleText]}>
            {t('Stock Transfer')}
          </Text>
        </View>
        <View>
          <View style={contentStyle}>
            <Text style={styles.optionTitle}>{t('Beneficiary Account')}</Text>
            <Text style={styles.optionValue}>{beneficiaryAccountNo?.label}</Text>
          </View>
          <View style={contentStyle}>
            <Text style={styles.optionTitle}>{t('Symbol')}</Text>
            <Text style={styles.optionValue}>{selectedSymbol?.stockSymbol}</Text>
          </View>
          <View style={contentStyle}>
            <Text style={styles.optionTitle}>{t('Available Qtt')}</Text>
            <Text style={styles.optionValue}>{selectedSymbol?.availableVolume}</Text>
          </View>
          <View style={contentStyle}>
            <Text style={styles.optionTitle}>{t('Transfer Qtt')}</Text>
            <TextInputComponent
              value={transferQtt === 0 ? '' : formatNumber(transferQtt, 2)}
              onChangeText={onChangeQtt}
              wholeContainerStyle={[styles.wholeContainerContentStyle]}
              textInputContainerStyle={[
                globalStyles.fillHeight,
                transferQttError ? styles.textInputContainerContentError : styles.textInputContainerContentStyle,
              ]}
              textInputStyle={[styles.textInputTransferAmount]}
              textAlignVertical="center"
              textAlign="right"
              keyboardType="number-pad"
              error={transferQttError}
              errorContent={transferQttErrorContent}
              autoFocus={true}
            />
          </View>
          {kisOTPToken != null && kisOTPToken.length > 0 ? (
            <View>
              <View style={[globalStyles.justifyCenter, styles.marginTop17, styles.contentBlock]}>
                <TouchableOpacity
                  onPress={onConfirmTransfer}
                  style={[
                    globalStyles.centered,
                    styles.executeFormButton2,
                    (transferQttError || transferQtt === 0) && globalStyles.disableBackground,
                  ]}
                  disabled={transferQttError || transferQtt === 0}
                >
                  <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
                    {t('Confirm')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[globalStyles.justifyCenter, styles.modalActionGroup, styles.contentBlock]}>
                <TouchableOpacity
                  onPress={closeTransferModal}
                  style={[globalStyles.centered, styles.modalCancelButton]}
                >
                  <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText2}>
                    {t('Cancel')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.marginHorizontal16}>
              <ModalOTPKIS
                valueOTP={otpKisValue}
                onChangeValueOTP={onChangeOtpKisValue}
                generateKisCardResult={generateKisCardResult}
                ListContentModal={true}
                valueOTPError={valueOTPError}
                valueOTPErrorContent={valueOTPErrorContent}
                autoFocus={false}
              />
              <View style={[globalStyles.fillWidth, styles.marginTop17, styles.marginBottom10]}>
                <TouchableOpacity
                  onPress={onPressConfirmSendOtpKisValue}
                  style={[
                    globalStyles.centered,
                    !kisOTPAvailable || transferQttError || transferQtt === 0
                      ? styles.executeFormButton3Disable
                      : styles.executeFormButton3,
                  ]}
                  disabled={!kisOTPAvailable || transferQttError || transferQtt === 0 ? true : false}
                >
                  <Text
                    allowFontScaling={false}
                    style={
                      !kisOTPAvailable || transferQttError || transferQtt === 0
                        ? styles.executeFormButtonTextDisable
                        : styles.executeFormButtonText2
                    }
                  >
                    {t('Confirm')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[globalStyles.fillWidth]}>
                <TouchableOpacity
                  onPress={closeTransferModal}
                  style={[globalStyles.centered, styles.cancelExecuteFormButton2]}
                >
                  <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText2}>
                    {t('Cancel')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <TouchableOpacity style={globalStyles.invisibleBackground} onPress={closeTransferModal} />
      </View>
    );
  }, [
    selectedSymbol,
    beneficiaryAccountNo?.label,
    transferQttError,
    transferQtt,
    accountNumber,
    otpKisValue,
    generateKisCardResult,
    valueOTPError,
    valueOTPErrorContent,
  ]);

  const childrenOfModal = useMemo(() => {
    if (Platform.OS === 'android') {
      return (
        <View style={[globalStyles.container, styles.modalBackground, globalStyles.centered]}>
          <ScrollView>{contentOfModal}</ScrollView>
        </View>
      );
    } else {
      return (
        <View style={[globalStyles.container, styles.modalBackground, globalStyles.centered]}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
            ref={formHeight}
          >
            {contentOfModal}
          </KeyboardAwareScrollView>
        </View>
      );
    }
  }, [contentOfModal, Platform, formHeight]);

  const modalTransfer = useMemo(() => {
    return <Modal visible={transferModal} onRequestClose={closeTransferModal} childrenContent={childrenOfModal} />;
  }, [transferModal, childrenOfModal]);

  useEffect(() => {
    dispatch(
      setSelectedAccount(getEquityKisAccount(accountListEqtKis) as IAccount, undefined, undefined, undefined, {
        notSetCurrentSymbol: true,
      })
    );
  }, []);

  useEffect(() => {
    if (accountNumber == null) return;
    const subAcc = Object.values(retrieveSubAccountData || []);
    let arr;
    if (subAcc.length > 0) {
      arr = subAcc
        .filter(
          (ele: querySubAccountRetrieveResponse) =>
            ele.subAccountID !== accountNumber && !ele.subAccountID.includes('D')
        )
        .map((item: querySubAccountRetrieveResponse) => ({
          label: item.subAccountID || '',
          value: item.subAccountName || '',
          // default: item.defaultSubAccount,
        }));
      if (arr.length) {
        setSubAccountData(arr);
        setBeneficiaryAccountNo(arr[0]);
      }
    }
  }, [retrieveSubAccountData, accountNumber]);

  useEffect(() => {
    if (optionSelecting !== IStockTransferScreenOption.STOCK_LIST) return;
    if (selectedAccountUsername) {
      dispatch(
        querySubAccountRetrieve({
          clientID: selectedAccountUsername,
        })
      );
    }
    if (
      accountNumber &&
      selectedAccount.selectedSubAccount != null &&
      selectedAccount.selectedSubAccount.accountSubs[0] != null &&
      selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY
    ) {
      const params = {
        accountNo: accountNumber,
      };
      dispatch(queryListInstrumentPortfolio(params));
    }
  }, [selectedAccountUsername, accountNumber, optionSelecting, selectedAccount.selectedSubAccount]);

  useEffect(() => {
    if (listStockResponse == null) return;
    setListStock(listStockResponse);
  }, [listStockResponse]);

  useUpdateEffect(() => {
    if (optionSelecting !== IStockTransferScreenOption.STOCK_TRANSFER_HISTORY || accountNumber == null) return;
    let calFromDate = subBusinessDays(toDate, PAGE_SIZE * (pageCurrent + 1) + pageCurrent);
    calFromDate = calFromDate > fromDate ? calFromDate : fromDate;
    let calToDate = subBusinessDays(toDate, PAGE_SIZE * pageCurrent + pageCurrent);
    calToDate = calToDate > calFromDate ? calToDate : calFromDate;
    if (isEqual(calFromDate, calToDate) && !isEqual(fromDate, toDate)) {
      return;
    }
    if (loadDate === true) {
      const params: IQueryStockTransferHistoryParams = {
        accountNumber: accountNumber,
        // symbol: searchText.length > 1 ? searchText : 'ALL',
        symbol: 'ALL',
        fromDate: formatDateToString(calFromDate) as string,
        toDate: formatDateToString(calToDate) as string,
        offset: pageCurrent,
        fetchCount: PAGE_SIZE,
      };
      dispatch(queyListStockTransferHistory(params));
      setLoadDate(null);
    } else if (loadDate === false) {
      const params: IQueryStockTransferHistoryParams = {
        accountNumber: accountNumber,
        // symbol: searchText.length > 1 ? searchText : 'ALL',
        symbol: 'ALL',
        fromDate: formatDateToString(fromDate) as string,
        toDate: formatDateToString(toDate) as string,
        offset: pageCurrent,
        fetchCount: PAGE_SIZE,
      };
      dispatch(queyListStockTransferHistory(params));
      setLoadDate(null);
    }
  }, [optionSelecting, accountNumber, loadDate, fromDate, toDate]);

  useUpdateEffect(() => {
    if (isAvailable == null || kisOTPToken == null) return;
    if (isAvailable === false) {
      alertMessage('danger', t('Not in Transfer Time'), t('Unavailable time for stock transfer requests'));
      return;
    }
    if (selectedSymbol == null || accountNumber == null || beneficiaryAccountNo == null || kisClientID == null) return;
    const params = {
      marketID: selectedSymbol.marketID,
      stockSymbol: selectedSymbol.stockSymbol,
      transferVolume: transferQtt,
      senderAccountNo: accountNumber,
      receiverAccountNo: beneficiaryAccountNo.label,
      clientID: kisClientID,
    };
    dispatch(doStockTransfer(params));
    dispatch(resetCheckTimeStockTransfer({}));
  }, [
    selectedSymbol?.marketID,
    selectedSymbol?.stockSymbol,
    beneficiaryAccountNo?.label,
    transferQtt,
    accountNumber,
    isAvailable,
    kisClientID,
    kisOTPToken,
  ]);

  useUpdateEffect(() => {
    if (listStockTransferHistoryResponse != null && listStockTransferHistoryResponse.length > 0) {
      const oldData = listStockTransferHistory.slice(PAGE_SIZE * (pageCurrent - 1));
      if (JSON.stringify(oldData[0]) !== JSON.stringify(listStockTransferHistoryResponse[0])) {
        const newListMemberSearch = listStockTransferHistory.concat(listStockTransferHistoryResponse);
        setListStockTransferHistory(newListMemberSearch);
      }
    } else if (
      (listStockTransferHistoryResponse != null && listStockTransferHistoryResponse.length === 0) ||
      (listStockTransferHistoryResponse == null && listStockTransferHistoryStatus === ReducerStatus.FAILED)
    ) {
      setIsLoadingStockTransferHistory(false);
    }
  }, [listStockTransferHistoryResponse, pageCurrent, listStockTransferHistory, listStockTransferHistoryStatus]);

  useUpdateEffect(() => {
    // update local for list stock
    if (listStock == null) return;
    if (checkDoTransfer)
      if (transferQtt === selectedSymbol?.availableVolume) {
        setListStock(listStock.filter(item => item.stockSymbol !== selectedSymbol?.stockSymbol));
      } else {
        if (selectedSymbol != null)
          setListStock(
            listStock.map(item =>
              item.stockSymbol === selectedSymbol.stockSymbol
                ? (item = { ...item, availableVolume: item.availableVolume - transferQtt })
                : item
            )
          );
      }
    dispatch(resetCheckDoStockTransfer({}));
  }, [listStockResponse, listStockStatus, listStock, checkDoTransfer, selectedSymbol, transferQtt]);

  useUpdateEffect(() => {
    if (optionSelecting === IStockTransferScreenOption.STOCK_TRANSFER_HISTORY) resetListStockTransferHistory();
    return () => {
      resetListStockTransferHistory();
    };
  }, [optionSelecting, accountNumber, fromDate, toDate]);

  useUpdateEffect(() => {
    // prevent loading from other screen
    if (!isFocused) return;
    if (kisCheckOTP.status === ReducerStatus.FAILED) {
      setValueOTPError(true);
      kisOTPErrorValue != null && setValueOTPErrorContent(t(kisOTPErrorValue));
    } else {
      setValueOTPError(false);
      setValueOTPErrorContent('');
    }
  }, [kisCheckOTP, kisOTPErrorValue, isFocused]);

  useUpdateEffect(() => {
    // handle transfer when otp correct
    if (!clickedConfirmOTP.current && kisCheckOTP.status !== ReducerStatus.SUCCESS) return;
    onConfirmTransfer();
    clickedConfirmOTP.current = false;
  }, [clickedConfirmOTP.current, kisCheckOTP.status]);

  useUpdateEffect(() => {
    if (!transferModal) return;
    if (keyboardHeight === 0) return;
    formHeight.current != null && formHeight.current.scrollToPosition(0, height, false);
  }, [transferModal, keyboardHeight]);

  return (
    <View style={[globalStyles.container, styles.container]}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={navigateBack}
        headerTitle={'Stock Transfer'}
        subAccountVisible={true}
        disableVirtualAccount={true}
        isNotSubD={true}
      />
      {renderContent}
      {selectAccountModal}
      {modalTransfer}
    </View>
  );
};

export default memo(StockTransfer);
