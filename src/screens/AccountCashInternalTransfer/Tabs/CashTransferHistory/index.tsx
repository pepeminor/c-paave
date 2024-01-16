import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import globalStyles, { Colors, scaleSize } from 'styles';
import React, { useCallback, useEffect, useMemo } from 'react';
import useStyles from './styles';
import Down from 'assets/icon/Down.svg';
import DatePicker from 'components/DatePicker';
import SheetData, { ISheetDataConfig } from 'components/SheetData';
import { subDays } from 'date-fns';
import { CashTransferStatus, CashTransferType } from 'constants/enum';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import { formatNumber, formatDateToString, formatStringToDateString, filterV2 } from 'utils';
import {
  queryCashTransactionHistory,
  queryDerCashDWEnquiry,
  resetCashTransactionHistory,
} from '../../../../reduxs/global-actions/BankTransfer';
import { useTranslation } from 'react-i18next';
import { ReducerStatus } from 'interfaces/reducer';
import config from 'config';
import { useIsFocused } from '@react-navigation/core';
import { transactionHistoryDetails } from '../../../../interfaces/bankTransfer';
import useUpdateEffect from 'hooks/useUpdateEffect';
import CloseFilter from 'assets/icon/CloseFilter.svg';
import FilterSelectIcon from 'assets/icon/FilterSelectIcon.svg';
import Modal from 'components/Modal';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
import SheetDataHeader from 'components/SheetDataHeader';
import { HeaderConfig } from 'components/SheetData3';

const CashTransferStatusList = [
  {
    label: 'All',
    value: CashTransferStatus.ALL,
    default: true,
  },
  {
    label: 'Pending_Bank',
    value: CashTransferStatus.PENDING,
  },
  {
    label: 'Approved_Bank',
    value: CashTransferStatus.APPROVED,
  },
  {
    label: 'Rejected',
    value: CashTransferStatus.REJECTED,
  },
  {
    label: 'DELETED',
    value: CashTransferStatus.DELETED,
  },
];

const PAGE_SIZE = config.pageSize;

const sheetHeaderConfig: HeaderConfig = {
  height: 44,
  data: [
    { content: 'No', width: 40 },
    { content: 'Date', width: 95 },
    { width: 135, content: 'Transfer Amount' },
    { content: 'Status Price', width: 102 },
  ],
};

const CashTransferHistory = () => {
  const isFocused = useIsFocused();
  const { styles } = useStyles();
  const [fromDate, setFromDate] = React.useState<Date>(subDays(new Date(), 7));
  const [toDate, setToDate] = React.useState(new Date());
  const [status, setStatus] = React.useState({
    label: CashTransferStatusList[0].label,
    value: CashTransferStatusList[0].value,
  });
  const selectedAccount = useSelector((state: IState) => state.selectedAccount);
  const cashTransactionHistoryData = useSelector((state: IState) => state.getCashTransactionHistory);
  const getDerCashDWEnquiry = useSelector((state: IState) => state.getDerCashDWEnquiry);

  const [listCashTransferHistory, setListCashTransferHistory] = React.useState<transactionHistoryDetails[]>([]);
  const [pageCurrent, setPageCurrent] = React.useState(1);
  const [isLoadingCashTransferHistory, setIsLoadingCashTransferHistory] = React.useState(false);
  const [statusModalVisible, setStatusModalVisible] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

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

  const configGrid: ISheetDataConfig = useMemo(
    () => ({
      columnFrozen: 4,
      maxHeightPerRow: 30,
      headerHeight: 44,
      header: [
        {
          label: 'No.',
          width: 40,
          element: (key: string, _rowData: transactionHistoryDetails, index: number) => (
            <View style={styles.rowConfigTable2} key={key}>
              {_rowData && (
                <Text allowFontScaling={false} style={styles.columnText}>
                  {index + 1}
                </Text>
              )}
            </View>
          ),
        },
        {
          label: 'Date',
          width: 95,
          element: (key: string, rowData: transactionHistoryDetails) => (
            <View style={styles.rowConfigTable2} key={key}>
              {rowData && (
                <Text allowFontScaling={false} style={styles.columnText}>
                  {formatStringToDateString(rowData.date, 'dd/MM/yyyy')}
                </Text>
              )}
            </View>
          ),
        },
        {
          label: 'Transfer Amount',
          width: 135,
          element: (key: string, rowData: transactionHistoryDetails) => (
            <View style={styles.rowConfigTable1} key={key}>
              {rowData && (
                <Text allowFontScaling={false} style={styles.columnText}>
                  {formatNumber(rowData.transferAmount, 2)}
                </Text>
              )}
            </View>
          ),
        },
        {
          label: 'Status',
          width: 102,
          element: (key: string, rowData: transactionHistoryDetails) => (
            <View style={styles.rowConfigTable} key={key}>
              {rowData && (
                <Text allowFontScaling={false} style={styles.columnText}>
                  {t(rowData.status)}
                </Text>
              )}
            </View>
          ),
        },
      ],
    }),
    [styles, t]
  );

  const resetListCashTransferHistory = () => {
    setPageCurrent(1);
    setListCashTransferHistory([]);
  };

  const onChangeFromDate = (value: Date) => {
    const frD = value;
    let tD = toDate;
    if (value >= toDate) {
      setToDate(value);
      tD = value;
    }
    setFromDate(value);
    queryCashTransactionHistoryByFromDateAndToDate(frD, tD);
  };

  const onChangeToDate = (value: Date) => {
    let frD = fromDate;
    const tD = value;
    if (value <= fromDate) {
      setFromDate(value);
      frD = value;
    }
    setToDate(value);
    queryCashTransactionHistoryByFromDateAndToDate(frD, tD);
  };

  const queryCashTransactionHistoryByFromDateAndToDate = (frD: Date, tD: Date) => {
    resetListCashTransferHistory();
    getCashTransactionHistory(1, frD, tD);
  };

  const onChangeStatus = (item: any) => {
    setStatus({ value: item.value, label: item.label });
  };

  const getCashTransactionHistory = (pageNumber?: number, frDate?: Date, tDate?: Date) => {
    if (
      selectedAccount.username &&
      selectedAccount.selectedSubAccount != null &&
      selectedAccount.selectedSubAccount.accountSubs[0] != null &&
      selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY
    ) {
      const offset = pageNumber && pageNumber >= 2 ? (pageNumber - 1) * PAGE_SIZE - 1 : 0;
      const params = {
        fetchCount: PAGE_SIZE,
        offset,
        accountNo: selectedAccount.selectedSubAccount.accountNumber,
        transferType: CashTransferType.TO_SUB,
        status: status.value,
        fromDate: (frDate ? formatDateToString(frDate, 'yyyyMMdd') : formatDateToString(fromDate, 'yyyyMMdd')) || '',
        toDate: (tDate ? formatDateToString(tDate, 'yyyyMMdd') : formatDateToString(toDate, 'yyyyMMdd')) || '',
      };
      dispatch(queryCashTransactionHistory(params));
    } else {
      if (
        selectedAccount.selectedSubAccount != null &&
        selectedAccount.selectedSubAccount.accountSubs[0] != null &&
        selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
      ) {
        const params = {
          accountNo: selectedAccount.selectedSubAccount.accountNumber,
          transferType: CashTransferType.TO_SUB,
          status: status.value,
          fromDate: (frDate ? formatDateToString(frDate, 'yyyyMMdd') : formatDateToString(fromDate, 'yyyyMMdd')) || '',
          toDate: (tDate ? formatDateToString(tDate, 'yyyyMMdd') : formatDateToString(toDate, 'yyyyMMdd')) || '',
        };
        dispatch(queryDerCashDWEnquiry(params));
      }
    }
  };

  useEffect(() => {
    if (!isFocused) return;
    resetListCashTransferHistory();
    getCashTransactionHistory(1);
    return () => {
      dispatch(resetCashTransactionHistory({}));
    };
  }, [selectedAccount, status, isFocused]);

  useEffect(() => {
    if (pageCurrent !== 1) {
      getCashTransactionHistory(pageCurrent);
    }
  }, [pageCurrent]);

  const objectsEqual = (o1: any, o2: any) =>
    Object.keys(o1).length === Object.keys(o2).length && Object.keys(o1).every(p => o1[p] === o2[p]);

  const arraysEqual = (a1: any, a2: any) =>
    a1.length === a2.length && a1.every((o: any, idx: any) => objectsEqual(o, a2[idx]));

  useUpdateEffect(() => {
    if (cashTransactionHistoryData.data != null && cashTransactionHistoryData.data.list.length > 0) {
      const oldData = listCashTransferHistory
        .filter(item => item.transferType === 'INTERNAL')
        .slice(PAGE_SIZE * (pageCurrent - 1));
      if (!arraysEqual(oldData, cashTransactionHistoryData.data.list)) {
        const newListCashTransferHistory = listCashTransferHistory.concat(cashTransactionHistoryData.data.list);
        setListCashTransferHistory(newListCashTransferHistory);
      }
    } else if (
      cashTransactionHistoryData.data?.list.length === 0 ||
      (cashTransactionHistoryData.data == null && cashTransactionHistoryData.status === ReducerStatus.FAILED)
    ) {
      setIsLoadingCashTransferHistory(false);
    }
  }, [cashTransactionHistoryData]);

  const onLoadMore = () => {
    if (
      cashTransactionHistoryData.data?.list != null &&
      cashTransactionHistoryData.data.list.length < PAGE_SIZE &&
      listCashTransferHistory.length < PAGE_SIZE
    ) {
      setIsLoadingCashTransferHistory(false);
    } else if (cashTransactionHistoryData.data != null && cashTransactionHistoryData.status !== ReducerStatus.FAILED) {
      setPageCurrent(pageCurrent + 1);
      setIsLoadingCashTransferHistory(true);
    }
  };

  const renderLoading = () => {
    return isLoadingCashTransferHistory && listCashTransferHistory.length >= PAGE_SIZE ? (
      <Text style={styles.loadingText}>{t('Loading')}...</Text>
    ) : (
      <></>
    );
  };

  const showStatusModal = useCallback(() => {
    setStatusModalVisible(pre => !pre);
  }, []);

  const currentStorageHistoryDer = useMemo(
    () =>
      status.value === CashTransferStatus.ALL
        ? getDerCashDWEnquiry.data != null
          ? Object.values(getDerCashDWEnquiry.data)
          : []
        : getDerCashDWEnquiry.data != null
        ? Object.values(getDerCashDWEnquiry.data).filter(item => item.status === status.value)
        : [],
    [getDerCashDWEnquiry.data, status.value]
  );

  const currentStorageHistoryEqt = useMemo(
    () =>
      status.value === CashTransferStatus.ALL
        ? listCashTransferHistory ?? []
        : filterV2(listCashTransferHistory!, item => item.status === status.value),
    [listCashTransferHistory, status.value]
  );

  return (
    <View style={styles.container}>
      <View style={styles.cashTransferHistory}>
        <View style={styles.filterContainer}>
          <Text style={styles.TitleStatus}>{t('Status')}</Text>
          <View style={styles.CustomPickerStatus}>
            <TouchableOpacity onPress={showStatusModal} style={styles.typeTextInputContainerStyle}>
              <Text allowFontScaling={false} style={[globalStyles.container, styles.colorLightTextContent]}>
                {status.label === CashTransferStatus.ALL ? t('All') : t(`${status.label}`)}
              </Text>
              <Down style={styles.labelIconStyle} />
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          visible={statusModalVisible}
          onRequestClose={() => setStatusModalVisible(false)}
          childrenContent={
            <View style={styles.modalBackground}>
              <View style={styles.modalContentContainer1}>
                <View style={styles.topInfo}></View>
                <View style={styles.modalTitle}>
                  <Text allowFontScaling={false} style={styles.filterText}>
                    {t('Status')}
                  </Text>
                  <TouchableOpacity style={styles.closeType} onPress={showStatusModal}>
                    <CloseFilter height={scaleSize(24)} width={scaleSize(24)} />
                  </TouchableOpacity>
                </View>
                {CashTransferStatusList != null &&
                  CashTransferStatusList.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          onChangeStatus(item);
                          setStatusModalVisible(false);
                        }}
                        style={styles.filterItemContainer}
                      >
                        <Text
                          numberOfLines={1}
                          style={[
                            globalStyles.container,
                            styles.filterTextValueType,
                            status.label === item.label
                              ? styles.filterTextValueSelected
                              : styles.filterTextValueUnselected,
                          ]}
                        >
                          {t(item.label)}
                        </Text>
                        {status.label === item.label && (
                          <FilterSelectIcon height={scaleSize(11)} width={scaleSize(18)} />
                        )}
                      </TouchableOpacity>
                    );
                  })}
              </View>
              <TouchableOpacity style={globalStyles.invisibleBackground} onPress={showStatusModal} />
            </View>
          }
        />
        <View style={styles.dateRangeStyle}>
          <View style={styles.fromDateStyle}>
            <DatePicker maxDate={new Date()} label={'From date'} onChange={onChangeFromDate} value={fromDate} />
          </View>
          <View style={styles.toDateStyle}>
            <DatePicker maxDate={new Date()} label={'To date'} onChange={onChangeToDate} value={toDate} />
          </View>
        </View>
      </View>
      {/* <View style={styles.spaceBlock} /> */}
      {isSelectedEquity ? (
        <View>
          {currentStorageHistoryEqt != null && currentStorageHistoryEqt.length > 0 ? (
            <SheetData
              requestLoadMore={onLoadMore}
              config={configGrid}
              iniData={PAGE_SIZE}
              data={currentStorageHistoryEqt}
              renderFooter={renderLoading}
            />
          ) : null}

          {(cashTransactionHistoryData.status === ReducerStatus.SUCCESS &&
            cashTransactionHistoryData.data != null &&
            currentStorageHistoryEqt.length === 0) ||
          cashTransactionHistoryData.data == null ? (
            <>
              <SheetDataHeader {...sheetHeaderConfig} />
              <View style={styles.noDataCon}>
                {cashTransactionHistoryData.status === ReducerStatus.LOADING ? (
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
        </View>
      ) : null}

      {isSelectedDerivatives ? (
        <>
          {currentStorageHistoryDer != null && currentStorageHistoryDer.length > 0 ? (
            <SheetData config={configGrid} data={currentStorageHistoryDer} />
          ) : null}
          {(getDerCashDWEnquiry.status === ReducerStatus.SUCCESS &&
            getDerCashDWEnquiry.data != null &&
            currentStorageHistoryDer.length === 0) ||
          getDerCashDWEnquiry.data == null ? (
            <>
              <SheetDataHeader {...sheetHeaderConfig} />
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
  );
};

export default CashTransferHistory;
