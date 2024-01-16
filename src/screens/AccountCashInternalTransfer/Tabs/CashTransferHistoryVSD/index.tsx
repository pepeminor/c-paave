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
import { formatNumber, formatDateToString, formatStringToDateString } from 'utils';
import { queryDerCpCashDWEnquiry } from '../../../../reduxs/global-actions/BankTransfer';
import { useTranslation } from 'react-i18next';
import { ReducerStatus } from 'interfaces/reducer';
import { IDerCpCashDWEnquiryParams, IDerCpCashDWEnquiryResponse } from '../../../../interfaces/bankTransfer';
import CloseFilter from 'assets/icon/CloseFilter.svg';
import FilterSelectIcon from 'assets/icon/FilterSelectIcon.svg';
import Modal from 'components/Modal';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import { useIsFocused } from '@react-navigation/core';
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
  {
    label: 'Settled',
    value: CashTransferStatus.SETTLED,
  },
];

const sheetHeaderConfig: HeaderConfig = {
  height: 44,
  data: [
    { content: 'No.', width: 40 },
    { content: 'Date', width: 95 },
    { content: 'Transfer Account', width: 135 },
    { content: 'Transfer Type', width: 135 },
    { content: 'Transfer Amount', width: 135 },
    { content: 'Transfer Fee', width: 135 },
    { content: 'Status', width: 135 },
  ],
};

type ICashTransferHistoryVSDProps = {
  isDepositVSDHistory?: boolean;
  isWithdrawVSDHistory?: boolean;
};

const CashTransferHistoryVSD = (props: ICashTransferHistoryVSDProps) => {
  const { styles } = useStyles();
  const isFocused = useIsFocused();
  const [fromDate, setFromDate] = React.useState<Date>(subDays(new Date(), 7));
  const [toDate, setToDate] = React.useState(new Date());
  const [status, setStatus] = React.useState({
    label: CashTransferStatusList[0].label,
    value: CashTransferStatusList[0].value,
  });
  const selectedAccount = useSelector((state: IState) => state.selectedAccount);
  const getKisDerCpCashDWEnquiry = useSelector((state: IState) => state.getKisDerCpCashDWEnquiry);
  const [statusModalVisible, setStatusModalVisible] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const configGrid: ISheetDataConfig = useMemo(
    () => ({
      columnFrozen: 1,
      maxHeightPerRow: 30,
      headerHeight: 44,
      header: [
        {
          label: 'No.',
          width: 40,
          element: (key: string, _rowData: IDerCpCashDWEnquiryResponse, index: number) => (
            <View style={styles.configRowTable} key={key}>
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
          element: (key: string, rowData: IDerCpCashDWEnquiryResponse) => (
            <View style={styles.configRowTable} key={key}>
              {rowData && (
                <Text allowFontScaling={false} style={styles.columnText}>
                  {formatStringToDateString(rowData.date, 'dd/MM/yyyy')}
                </Text>
              )}
            </View>
          ),
        },
        {
          label: 'Transfer Account',
          width: 135,
          element: (key: string, rowData: IDerCpCashDWEnquiryResponse) => (
            <View style={styles.configRowTable1} key={key}>
              {rowData && (
                <Text allowFontScaling={false} style={styles.columnText1}>
                  {rowData.transferAccount}
                </Text>
              )}
            </View>
          ),
        },
        {
          label: 'Transfer Type',
          width: 135,
          element: (key: string, rowData: IDerCpCashDWEnquiryResponse) => (
            <View style={styles.configRowTable1} key={key}>
              {rowData && (
                <Text allowFontScaling={false} style={styles.columnText1}>
                  {rowData.transferType}
                </Text>
              )}
            </View>
          ),
        },
        {
          label: 'Transfer Amount',
          width: 135,
          element: (key: string, rowData: IDerCpCashDWEnquiryResponse) => (
            <View style={styles.configRowTable1} key={key}>
              {rowData && (
                <Text allowFontScaling={false} style={styles.columnText1}>
                  {formatNumber(rowData.transferAmount, 2)}
                </Text>
              )}
            </View>
          ),
        },
        {
          label: 'Transfer Fee',
          width: 135,
          element: (key: string, rowData: IDerCpCashDWEnquiryResponse) => (
            <View style={styles.configRowTable1} key={key}>
              {rowData && (
                <Text allowFontScaling={false} style={styles.columnText1}>
                  {formatNumber(rowData.transferFee, 2)}
                </Text>
              )}
            </View>
          ),
        },
        {
          label: 'Status',
          width: 102,
          element: (key: string, rowData: IDerCpCashDWEnquiryResponse) => (
            <View style={styles.configRowTable2} key={key}>
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
    getCashTransactionHistory(frD, tD);
  };

  const onChangeStatus = (item: any) => {
    setStatus({ value: item.value, label: item.label });
  };

  const getCashTransactionHistory = (frDate?: Date, tDate?: Date) => {
    if (selectedAccount.selectedSubAccount != null && (props.isDepositVSDHistory || props.isWithdrawVSDHistory)) {
      const params: IDerCpCashDWEnquiryParams = {
        accountNo: selectedAccount.selectedSubAccount.accountNumber,
        fromDate: (frDate ? formatDateToString(frDate, 'yyyyMMdd') : formatDateToString(fromDate, 'yyyyMMdd')) || '',
        toDate: (tDate ? formatDateToString(tDate, 'yyyyMMdd') : formatDateToString(toDate, 'yyyyMMdd')) || '',
        status: status.value,
        transferType: props.isDepositVSDHistory
          ? CashTransferType.VSD_DEPOSIT
          : props.isWithdrawVSDHistory
          ? CashTransferType.VSD_WITHDRAW
          : 'ALL',
      };
      dispatch(queryDerCpCashDWEnquiry(params));
    }
  };

  useEffect(() => {
    getCashTransactionHistory();
  }, [selectedAccount, status, isFocused]);

  const showStatusModal = useCallback(() => {
    setStatusModalVisible(pre => !pre);
  }, []);

  const currentStorageHistoryVSD = useMemo(
    () =>
      status.value === CashTransferStatus.ALL
        ? getKisDerCpCashDWEnquiry.data != null
          ? getKisDerCpCashDWEnquiry.data
          : []
        : getKisDerCpCashDWEnquiry.data != null
        ? getKisDerCpCashDWEnquiry.data.filter(item => item.status === status.value)
        : [],
    [getKisDerCpCashDWEnquiry.data, status.value]
  );

  return (
    <View style={styles.container}>
      <View style={styles.cashTransferHistory}>
        <View style={styles.filterContainer}>
          <Text style={styles.TitleStatus}>{t('Status')}</Text>
          <View style={styles.CustomPickerStatus}>
            <TouchableOpacity onPress={showStatusModal} style={styles.typeTextInputContainerStyle}>
              <Text allowFontScaling={false} style={styles.colorLightTextContent}>
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
      <View>
        {currentStorageHistoryVSD != null && currentStorageHistoryVSD.length > 0 ? (
          <SheetData config={configGrid} data={currentStorageHistoryVSD} scrollEnabled />
        ) : null}
        {(getKisDerCpCashDWEnquiry.status === ReducerStatus.SUCCESS &&
          getKisDerCpCashDWEnquiry.data != null &&
          currentStorageHistoryVSD.length === 0) ||
        getKisDerCpCashDWEnquiry.data == null ? (
          <>
            <SheetDataHeader {...sheetHeaderConfig} />
            <View style={styles.noDataCon}>
              {getKisDerCpCashDWEnquiry.status === ReducerStatus.LOADING ? (
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
    </View>
  );
};

export default CashTransferHistoryVSD;
