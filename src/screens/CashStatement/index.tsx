import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { isAfter, isBefore, subDays } from 'date-fns';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';

// styles
import useStyles from './styles';
import globalStyles, { Colors } from 'styles';
// components
import DatePicker from 'components/DatePicker';
import SheetData from 'components/SheetData';
import HeaderScreen from 'components/HeaderScreen';
import { HeaderConfig } from 'components/SheetData3';

// redux
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { IDerCashStatementItemResponse, IEqtCashStatementItemResponse } from 'interfaces/bankTransfer';
import {
  queryDerCashStatement,
  queryEqtCashStatement,
  resetDerCashStatement,
  resetEqtCashStatement,
} from 'reduxs/global-actions';
import { useAppSelector } from 'hooks';
// hooks
import { formatDateToString, formatStringToDateString } from 'utils/datetime';
import { ReducerStatus } from 'interfaces/reducer';
import SheetDataHeader from 'components/SheetDataHeader';

// Icons
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import { formatNumber, isObjectEmpty } from 'utils/common';
import { useIsFocused } from '@react-navigation/native';
import useRefState from 'hooks/useRefState';
import { navigateBack } from 'utils';

const CASH_STATEMENT_HEADER_STYLE = [
  globalStyles.flexDirectionRow,
  globalStyles.alignCenter,
  globalStyles.fillWidth,
  globalStyles.justifySpaceEvenly,
];

const CASH_STATEMENT_HEADER_STYLE2 = [
  globalStyles.flexDirectionRow,
  globalStyles.alignCenter,
  globalStyles.container2,
  globalStyles.justifySpaceEvenly,
];

const CASH_STATEMENT_CONTAINER_STYLE = [globalStyles.container, globalStyles.containerBackground];

const CashStatement = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { styles } = useStyles();

  // states
  const [fromDate, setFromDate] = useRefState(subDays(new Date(), 7));
  const [toDate, setToDate] = useRefState(new Date());

  // store data
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const getDerCashStatement = useAppSelector(state => state.getDerCashStatement);
  const getEqtCashStatement = useAppSelector(state => state.getEqtCashStatement);

  const isAccountDerivative =
    selectedAccount.type === ACCOUNT_TYPE.KIS &&
    selectedAccount.selectedSubAccount != null &&
    selectedAccount.selectedSubAccount.accountSubs[0] != null &&
    selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES;

  const ConfigSheetDataHeaderDer: HeaderConfig = useMemo(
    () => ({
      data: [
        {
          content: <Text style={styles.headerTextTable}>{t('Date')}</Text>,
          width: 96,
        },
        {
          content: <Text style={styles.headerTextTable}>{t('Detail')}</Text>,
          width: 250,
        },
        {
          content: [
            <View style={styles.borderTable2}>
              <Text style={styles.headerTextTable}>{t('Cash at KIS')}</Text>
            </View>,
            <View style={CASH_STATEMENT_HEADER_STYLE}>
              <Text style={styles.headerTextTable}>{t('Credit')}</Text>
              <View style={styles.borderTable} />
              <Text style={styles.headerTextTable}>{t('Debit')}</Text>
            </View>,
          ],
          width: 153,
        },
        {
          content: [
            <View style={styles.borderTable2}>
              <Text style={styles.headerTextTable}>{t('Cash at VSD')}</Text>
            </View>,
            <View style={CASH_STATEMENT_HEADER_STYLE}>
              <Text style={styles.headerTextTable}>{t('Credit')}</Text>
              <View style={styles.borderTable} />
              <Text style={styles.headerTextTable}>{t('Debit')}</Text>
            </View>,
          ],
          width: 153,
        },
        {
          content: 'Balance',
          width: 96,
        },
      ],
      height: 44,
    }),
    [styles, t]
  );

  const ConfigSheetDataHeaderEqt: HeaderConfig = useMemo(
    () => ({
      data: [
        {
          content: <Text style={styles.headerTextTable}>{t('No.')}</Text>,
          width: 50,
        },
        {
          content: <Text style={styles.headerTextTable}>{t('Date')}</Text>,
          width: 96,
        },
        {
          content: <Text style={styles.headerTextTable}>{t('Detail')}</Text>,
          width: 250,
        },
        {
          content: <Text style={styles.headerTextTable}>{t('Credit Amount')}</Text>,
          width: 193,
        },
        {
          content: <Text style={styles.headerTextTable}>{t('Debit Amount')}</Text>,
          width: 193,
        },
        {
          content: <Text style={styles.headerTextTable}>{t('Balance')}</Text>,
          width: 96,
        },
      ],
      height: 44,
    }),
    [t, styles]
  );

  const configGridFlatListEqt = useMemo(
    () => ({
      columnFrozen: 1,
      maxHeightPerRow: 45,
      labelSize: 14,
      header: [
        {
          label: 'No.',
          width: 50,
          element: (_key: string, data: IEqtCashStatementItemResponse) => (
            <View
              key={_key}
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.centered,
                globalStyles.container2,
                styles.boderRightTable,
                styles.widthValue6,
              ]}
            >
              <Text allowFontScaling={false} style={styles.valueTextTable}>
                {data.no}
              </Text>
            </View>
          ),
        },
        {
          label: 'Date',
          width: 96,
          element: (_key: string, data: IEqtCashStatementItemResponse) => (
            <View
              key={_key}
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.centered,
                globalStyles.fillHeight,
                styles.boderRightTable,
                styles.widthValue4,
              ]}
            >
              <Text allowFontScaling={false} style={styles.valueTextTable}>
                {formatStringToDateString(data.date, 'dd/MM/yyyy')}
              </Text>
            </View>
          ),
        },
        {
          label: 'Detail',
          width: 250,
          element: (_key: string, data: IEqtCashStatementItemResponse) => (
            <View
              key={_key}
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                globalStyles.justifyStart,
                globalStyles.container2,
                styles.boderRightTable,
                styles.widthValue5,
                styles.pdHorizontal8,
              ]}
            >
              <Text allowFontScaling={false} style={styles.valueTextTable1} numberOfLines={2}>
                {data.description}
              </Text>
            </View>
          ),
        },
        {
          label: 'Credit Amount',
          width: 120,
          element: (_key: string, data: IEqtCashStatementItemResponse) => (
            <View
              key={_key}
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                globalStyles.justifyEnd,
                globalStyles.container2,
                styles.boderRightTable,
                styles.widthValue3,
              ]}
            >
              <Text allowFontScaling={false} style={styles.valueTextTable}>
                {formatNumber(data.creditAmount, 2, undefined, true)}
              </Text>
            </View>
          ),
        },
        {
          label: 'Debit Amount',
          width: 120,
          element: (_key: string, data: IEqtCashStatementItemResponse) => (
            <View
              key={_key}
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                globalStyles.justifyEnd,
                globalStyles.container2,
                styles.boderRightTable,
                styles.widthValue3,
              ]}
            >
              <Text allowFontScaling={false} style={styles.valueTextTable}>
                {formatNumber(data.debitAmount, 2, undefined, true)}
              </Text>
            </View>
          ),
        },
        {
          label: 'Balance',
          width: 120,
          element: (_key: string, data: IEqtCashStatementItemResponse) => (
            <View
              key={_key}
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.container2,
                globalStyles.alignCenter,
                globalStyles.justifyEnd,
                styles.boderRightTable,
                styles.widthValue3,
              ]}
            >
              <Text allowFontScaling={false} style={styles.valueTextTable}>
                {formatNumber(data.balance, 2, undefined, true)}
              </Text>
            </View>
          ),
        },
      ],
    }),
    [t, styles]
  );

  const configGridFlatListDer = useMemo(
    () => ({
      columnFrozen: 1,
      maxHeightPerRow: 45,
      labelSize: 14,
      header: [
        {
          label: 'Date',
          width: 96,
          element: (_key: string, data: IDerCashStatementItemResponse) => (
            <View
              key={_key}
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.centered,
                globalStyles.fillHeight,
                styles.boderRightTable,
                styles.widthValue4,
              ]}
            >
              <Text allowFontScaling={false} style={styles.valueTextTable}>
                {formatStringToDateString(data.valueDate, 'dd/MM/yyyy')}
              </Text>
            </View>
          ),
        },
        {
          label: 'Detail',
          width: 250,
          element: (_key: string, data: IDerCashStatementItemResponse) => (
            <View
              key={_key}
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                globalStyles.justifyStart,
                globalStyles.container2,
                styles.boderRightTable,
                styles.widthValue5,
                styles.pdHorizontal8,
              ]}
            >
              <Text allowFontScaling={false} style={styles.valueTextTable1}>
                {data.remarks}
              </Text>
            </View>
          ),
        },
        {
          label: [
            <Text style={styles.headerTextTable}>{t('Cash at KIS')}</Text>,
            <View style={CASH_STATEMENT_HEADER_STYLE2}>
              <Text style={styles.headerTextTable}>{t('Credit')}</Text>
              <View style={styles.borderTable} />
              <Text style={styles.headerTextTable}>{t('Debit')}</Text>
            </View>,
          ],
          width: 193,
          element: (_key: string, data: IDerCashStatementItemResponse) => (
            <View
              key={_key}
              style={[
                globalStyles.justifySpaceEvenly,
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                globalStyles.fillHeight,
                styles.boderRightTable,
                styles.widthValue1,
              ]}
            >
              <View style={styles.widthValue2}>
                <Text allowFontScaling={false} style={[styles.valueTextTable]}>
                  {data.clientCredit}
                </Text>
              </View>
              <View style={styles.borderTable} />
              <View style={styles.widthValue2}>
                <Text allowFontScaling={false} style={[styles.valueTextTable]}>
                  {data.clientDebit}
                </Text>
              </View>
            </View>
          ),
        },
        {
          label: [
            <Text style={styles.headerTextTable}>{t('Cash at VSD')}</Text>,
            <View style={CASH_STATEMENT_HEADER_STYLE2}>
              <Text style={styles.headerTextTable}>{t('Credit')}</Text>
              <View style={styles.borderTable} />
              <Text style={styles.headerTextTable}>{t('Debit')}</Text>
            </View>,
          ],
          width: 193,
          element: (_key: string, data: IDerCashStatementItemResponse) => (
            <View
              key={_key}
              style={[
                globalStyles.justifySpaceEvenly,
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                globalStyles.fillHeight,
                styles.boderRightTable,
                styles.widthValue1,
              ]}
            >
              <View style={styles.widthValue2}>
                <Text allowFontScaling={false} style={[styles.valueTextTable]}>
                  {data.brokerCredit}
                </Text>
              </View>
              <View style={styles.borderTable} />
              <View style={styles.widthValue2}>
                <Text allowFontScaling={false} style={[styles.valueTextTable]}>
                  {data.brokerDebit}
                </Text>
              </View>
            </View>
          ),
        },
        {
          label: 'Balance',
          width: 120,
          element: (_key: string, data: IDerCashStatementItemResponse) => (
            <View
              key={_key}
              style={[globalStyles.container2, globalStyles.centered, styles.boderRightTable, styles.widthValue3]}
            >
              <Text allowFontScaling={false} style={styles.valueTextTable}>
                {formatNumber(data.totalBalance, 2, undefined, true)}
              </Text>
            </View>
          ),
        },
      ],
    }),
    [t, styles]
  );

  const onChangeFromDate = useCallback(
    (value: Date) => {
      if (value !== fromDate.current) {
        if (isAfter(value, toDate.current)) {
          setToDate(value);
        }
        setFromDate(value);
      }
    },
    [fromDate.current, toDate.current]
  );

  const onChangeToDate = useCallback(
    (value: Date) => {
      if (value !== toDate.current) {
        if (isBefore(value, fromDate.current)) {
          setFromDate(value);
        }
        setToDate(value);
      }
    },
    [fromDate.current, toDate.current]
  );

  useEffect(() => {
    if (!isFocused) return;
    if (selectedAccount.type === ACCOUNT_TYPE.KIS && selectedAccount.selectedSubAccount != null) {
      if (isAccountDerivative) {
        dispatch(resetEqtCashStatement({}));
        dispatch(
          queryDerCashStatement({
            subAccountID: selectedAccount.selectedSubAccount.accountNumber,
            fromDate: formatDateToString(fromDate.current) as string,
            toDate: formatDateToString(toDate.current) as string,
          })
        );
      } else {
        dispatch(resetDerCashStatement({}));
        dispatch(
          queryEqtCashStatement({
            accountNo: selectedAccount.selectedSubAccount.accountNumber,
            fromDate: formatDateToString(fromDate.current) as string,
            toDate: formatDateToString(toDate.current) as string,
            transactionType: 'ALL',
          })
        );
      }
    }

    return () => {
      dispatch(resetDerCashStatement({}));
      dispatch(resetEqtCashStatement({}));
    };
  }, [
    fromDate.current,
    toDate.current,
    isAccountDerivative,
    selectedAccount.selectedSubAccount,
    selectedAccount.type,
    isFocused,
  ]);

  return (
    <View style={CASH_STATEMENT_CONTAINER_STYLE}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={navigateBack}
        headerTitle={'Cash Statement'}
        subAccountVisible={true}
        disableVirtualAccount={true}
      />
      <View style={[globalStyles.flexDirectionRow, styles.filterContainer]}>
        <View style={[globalStyles.container, styles.fromDateContainer]}>
          <DatePicker
            label={t('From date')}
            onChange={onChangeFromDate}
            value={fromDate.current}
            maxDate={new Date()}
          />
        </View>
        <View style={[globalStyles.container, styles.toDateContainer]}>
          <DatePicker label={t('To date')} onChange={onChangeToDate} value={toDate.current} maxDate={new Date()} />
        </View>
      </View>
      <View style={styles.line} />
      <View
        style={[
          globalStyles.flexDirectionRow,
          globalStyles.alignCenter,
          globalStyles.justifySpaceBetween,
          styles.pt13,
          styles.pdh16,
        ]}
      >
        <Text style={styles.titleHeaderText}>{t('Beginning Balance')}</Text>
        <Text style={styles.valueText}>
          {isAccountDerivative
            ? getDerCashStatement.data != null && getDerCashStatement.data.beginningBalance != null
              ? formatNumber(getDerCashStatement.data.beginningBalance, 2, undefined, true)
              : 0
            : getEqtCashStatement.data != null && getEqtCashStatement.data.beginningBalance != null
            ? formatNumber(getEqtCashStatement.data.beginningBalance, 2, undefined, false)
            : 0}
        </Text>
      </View>
      <View style={[globalStyles.container, styles.pt13]}>
        {isAccountDerivative ? (
          <SheetData
            config={configGridFlatListDer}
            data={
              getDerCashStatement.data != null && getDerCashStatement.data.listTransactionHistory.length > 0
                ? getDerCashStatement.data.listTransactionHistory
                : []
            }
            containerStyle={styles.sheetContainer}
            ListEmptyComponent={
              getDerCashStatement.data == null ||
              (getDerCashStatement.data != null &&
                getDerCashStatement.data.listTransactionHistory != null &&
                getDerCashStatement.data.listTransactionHistory.length === 0 &&
                getDerCashStatement.status === ReducerStatus.SUCCESS) ? (
                <>
                  <SheetDataHeader {...ConfigSheetDataHeaderDer} />
                  <View style={styles.noDataCon}>
                    {getDerCashStatement.data == null ? (
                      <ActivityIndicator size="small" color={Colors.DARK_GREEN} />
                    ) : (
                      <>
                        <EmptySymbol />
                        <Text style={styles.noDataText}>{t('There is no data')}</Text>
                      </>
                    )}
                  </View>
                </>
              ) : (
                <></>
              )
            }
          />
        ) : null}
        {!isAccountDerivative ? (
          <SheetData
            config={configGridFlatListEqt}
            data={
              getEqtCashStatement.data != null &&
              !isObjectEmpty(getEqtCashStatement.data) &&
              getEqtCashStatement.data.list != null &&
              getEqtCashStatement.data.list.length > 0
                ? getEqtCashStatement.data.list
                : []
            }
            containerStyle={styles.sheetContainer}
            ListEmptyComponent={
              getEqtCashStatement.data == null ||
              (getEqtCashStatement.data != null &&
                isObjectEmpty(getEqtCashStatement.data) &&
                getEqtCashStatement.status === ReducerStatus.SUCCESS) ? (
                <>
                  <SheetDataHeader {...ConfigSheetDataHeaderEqt} />
                  <View style={styles.noDataCon}>
                    {getEqtCashStatement.data == null ? (
                      <ActivityIndicator size="small" color={Colors.DARK_GREEN} />
                    ) : (
                      <>
                        <EmptySymbol />
                        <Text style={styles.noDataText}>{t('There is no data')}</Text>
                      </>
                    )}
                  </View>
                </>
              ) : (
                <></>
              )
            }
          />
        ) : null}
      </View>
      <View style={styles.lineShadow} />
      <View style={[styles.pdh16, styles.footerContainer]}>
        <Text style={styles.titleHeaderText}>{t('Ending Balance')}</Text>
        <Text style={styles.valueText}>
          {isAccountDerivative
            ? getDerCashStatement.data != null && getDerCashStatement.data.endingBalance != null
              ? formatNumber(getDerCashStatement.data.endingBalance, 2, undefined, true)
              : 0
            : getEqtCashStatement.data != null && getEqtCashStatement.data.endingBalance != null
            ? formatNumber(getEqtCashStatement.data.endingBalance, 2, undefined, false)
            : 0}
        </Text>
      </View>
    </View>
  );
};

export default memo(CashStatement);
