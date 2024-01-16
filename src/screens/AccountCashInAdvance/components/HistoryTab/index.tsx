import { View, Text, FlatList, ListRenderItemInfo } from 'react-native';
import React, { memo, useEffect } from 'react';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks';
import { IGetCashAdvanceHistoryResponse } from 'interfaces/equity';
import { formatDateToString, formatStringToDate, formatNumber } from 'utils';
import { ReducerStatus } from 'interfaces/reducer';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import { getCashAdvanceHistory } from 'reduxs/global-actions';
import { useDispatch } from 'react-redux';

const parseDate = (dateString: string) => {
  const result: Date = formatStringToDate(dateString, 'yyyyMMddHHmmss');
  return formatDateToString(result, 'dd/MM/yyyy')!;
};

const HistoryTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const cashAdvanceHistory = useAppSelector(state => state.cashInAdvance.cashAdvanceHistory);
  const accountNumber = useAppSelector(state => state.selectedAccount.selectedSubAccount?.accountNumber);

  useEffect(() => {
    dispatch(getCashAdvanceHistory({ accountNo: accountNumber ?? '' }));
  }, [accountNumber]);

  const renderItem = ({ item }: ListRenderItemInfo<IGetCashAdvanceHistoryResponse>) => {
    return (
      <View style={styles.tableRowContainer}>
        <View style={styles.cellBorder}>
          <Text style={[styles.tableCellText, styles.row12, styles.textCenter]}>{parseDate(item.requestTime)}</Text>
        </View>
        <View style={styles.cellBorder}>
          <Text style={[styles.tableCellText, styles.row12, styles.textRight]}>
            {formatNumber(item.requireAdvanceAmount)}
          </Text>
        </View>
        <View style={styles.cellBorder}>
          <Text style={[styles.tableCellText, styles.row3, styles.textRight]}>{formatNumber(item.advanceFee)}</Text>
        </View>
        <View style={styles.cellBorderLast}>
          <Text style={[styles.tableCellText, styles.row4, styles.textCenter]}>{t(item.status)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeaderContainer}>
          <View style={styles.cellBorder}>
            <Text style={[styles.tableHeaderText, styles.row12]}>{t('Date')}</Text>
          </View>
          <View style={styles.cellBorder}>
            <Text style={[styles.tableHeaderText, styles.row12]}>{t('Amount')}</Text>
          </View>
          <View style={styles.cellBorder}>
            <Text style={[styles.tableHeaderText, styles.row3]}>{t('Fee')}</Text>
          </View>
          <View style={styles.cellBorderLast}>
            <Text style={[styles.tableHeaderText, styles.row4]}>{t('Status')}</Text>
          </View>
        </View>
        <FlatList showsVerticalScrollIndicator={false} data={cashAdvanceHistory.data} renderItem={renderItem} />
        {cashAdvanceHistory.status !== ReducerStatus.LOADING && cashAdvanceHistory.data.length === 0 ? (
          <View style={styles.noDataCon}>
            <EmptySymbol />
            <Text style={styles.noDataText}>{t('There is no data')}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default memo(HistoryTab);
