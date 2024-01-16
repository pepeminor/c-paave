import React, { memo, useCallback, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import DatePicker from 'components/DatePicker';
import { formatDateToString, formatStringToDateString, formatNumber, getColor } from 'utils';
import globalStyles, { Colors } from 'styles';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import HeaderScreen from 'components/HeaderScreen';

// Icons
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import { subDays, isAfter, isBefore, subBusinessDays, isEqual } from 'date-fns';
import { useTranslation } from 'react-i18next';
import config from 'config';
import { ReducerStatus } from 'interfaces/reducer';
import {
  getAccumulativeNAV,
  getNAVChange,
  kisGetDerEnquiryClientStockStatement,
  kisResetDerEnquiryClientStockStatement,
  resetNAVChange,
} from 'reduxs/global-actions';
import useRefState from 'hooks/useRefState';
import { SUCCESS } from 'reduxs/action-type-utils';
import { EQUITY_GET_NAV_CHANGE } from 'reduxs/actions';
import SheetData3, { HeaderConfig } from 'components/SheetData3';
import SheetDataHeader from 'components/SheetDataHeader';
import ProfitLossRowComponent from './components/ProfitLossRow.component';
import Chart from 'screens/Portfolio/components/Chart';
import { ChartStyle } from 'constants/enum';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
import { useAppSelector } from 'hooks/useAppSelector';
import { IKisGetDerEnquiryClientStockStatementResponse } from 'interfaces/services';
import SheetData from 'components/SheetData';

const PAGE_SIZE = config.pageSize;

const ProfitLossReport = (props: StackScreenProps<'ProfitlossReport'>) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const kisDerEnquiryClientStockStatement = useAppSelector(state => state.kisDerEnquiryClientStockStatement);
  const derDailyProfitLossesData = kisDerEnquiryClientStockStatement.data;
  const derDailyProfitLossesStatus = kisDerEnquiryClientStockStatement.status;
  const navChange = useAppSelector(state => state.navChange);
  const accNav = useAppSelector(state => state.accumulativeNAV);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const dailyProfitLosses = navChange.data?.dailyProfitLosses;
  const [fromDate, setFromDate] = useRefState(subDays(new Date(), 7));
  const [toDate, setToDate] = useRefState(new Date());
  const [pageNumber, setPageNumber] = useRefState(0, false);

  const selectAccountDerivatives =
    selectedAccount.type === ACCOUNT_TYPE.KIS &&
    selectedAccount.selectedSubAccount != null &&
    selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES;

  const ConfigSheetDataHeader: HeaderConfig = {
    data: [
      {
        content: 'Date',
        width: 130,
      },
      {
        content: 'Profit (Return Rate)',
        width: 243,
      },
    ],
    height: 44,
  };

  const DerConfigSheetDataHeader: HeaderConfig = {
    data: [
      {
        content: [<Text style={styles.headerTextTable}>{t('Symbol')}</Text>],
        width: 96,
      },
      {
        content: [<Text style={styles.headerTextTable}>{t('Date')}</Text>],
        width: 96,
      },
      {
        content: [
          <View style={styles.borderTable2}>
            <Text style={styles.headerTextTable}>{t('Netoff')}</Text>
          </View>,
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              globalStyles.fillWidth,
              globalStyles.justifySpaceEvenly,
            ]}
          >
            <Text style={styles.headerTextTable}>{t('Long')}</Text>
            <View style={styles.borderTable} />
            <Text style={styles.headerTextTable}>{t('Short')}</Text>
          </View>,
        ],
        width: 153,
      },
      {
        content: [
          <View style={styles.borderTable2}>
            <Text style={styles.headerTextTable}>{t('Expired')}</Text>
          </View>,
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              globalStyles.justifySpaceEvenly,
              globalStyles.fillWidth,
            ]}
          >
            <Text style={styles.headerTextTable}>{t('Long')}</Text>
            <View style={styles.borderTable} />
            <Text style={styles.headerTextTable}>{t('Short')}</Text>
          </View>,
        ],
        width: 153,
      },
      {
        content: [
          <View style={styles.borderTable2}>
            <Text style={styles.headerTextTable}>{t('Balance')}</Text>
          </View>,
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, globalStyles.justifySpaceEvenly]}>
            <View style={[styles.widthValue4, globalStyles.alignCenter]}>
              <Text style={styles.headerTextTable}>{t('Long')}</Text>
            </View>
            <View style={styles.borderTable} />
            <View style={[styles.widthValue4, globalStyles.alignCenter]}>
              <Text style={styles.headerTextTable}>{t('Short')}</Text>
            </View>
            <View style={styles.borderTable} />
            <View style={[styles.widthValue4, globalStyles.alignCenter]}>
              <Text style={styles.headerTextTable}>{t('Closing Price')}</Text>
            </View>
          </View>,
        ],
        width: 320,
      },
      {
        content: 'Total',
        width: 96,
      },
    ],
    height: 44,
  };

  const configGridClientStockStatement = {
    columnFrozen: 0,
    maxHeightPerRow: 45,
    labelSize: 14,
    header: [
      {
        label: 'Symbol',
        width: 96,
        element: (_key: string, rowData: IKisGetDerEnquiryClientStockStatementResponse) => (
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.centered,
              globalStyles.fillHeight,
              styles.boderRightTable,
              styles.widthValue5,
            ]}
          >
            <Text allowFontScaling={false} style={styles.valueTextTable}>
              {rowData.seriesID}
            </Text>
          </View>
        ),
      },
      {
        label: 'Date',
        width: 96,
        element: (_key: string, rowData: IKisGetDerEnquiryClientStockStatementResponse) => (
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.centered,
              globalStyles.container2,
              styles.boderRightTable,
              styles.widthValue5,
            ]}
          >
            <Text allowFontScaling={false} style={styles.valueTextTable}>
              {formatStringToDateString(rowData.date, 'dd/MM/yyyy')}
            </Text>
          </View>
        ),
      },
      {
        label: [
          <Text style={styles.headerTextTable}>{t('Netoff')}</Text>,
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              globalStyles.container2,
              globalStyles.justifySpaceEvenly,
            ]}
          >
            <Text style={styles.headerTextTable}>{t('Long')}</Text>
            <View style={styles.borderTable} />
            <Text style={styles.headerTextTable}>{t('Short')}</Text>
          </View>,
        ],
        width: 153,
        element: (_key: string, rowData: IKisGetDerEnquiryClientStockStatementResponse) => (
          <View
            style={[
              globalStyles.justifySpaceEvenly,
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              globalStyles.fillHeight,
              styles.boderRightTable,
              styles.widthValue1,
            ]}
          >
            <View style={styles.widthValue3}>
              <Text allowFontScaling={false} style={[styles.valueTextTable]}>
                {rowData.netoffLong}
              </Text>
            </View>
            <View style={styles.borderTable} />
            <View style={styles.widthValue3}>
              <Text allowFontScaling={false} style={[styles.valueTextTable]}>
                {rowData.netoffShort}
              </Text>
            </View>
          </View>
        ),
      },
      {
        label: [
          <Text style={styles.headerTextTable}>{t('Expired')}</Text>,
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              globalStyles.container2,
              globalStyles.justifySpaceEvenly,
            ]}
          >
            <Text style={styles.headerTextTable}>{t('Long')}</Text>
            <View style={styles.borderTable} />
            <Text style={styles.headerTextTable}>{t('Short')}</Text>
          </View>,
        ],
        width: 153,
        element: (_key: string, rowData: IKisGetDerEnquiryClientStockStatementResponse) => (
          <View
            style={[
              globalStyles.justifySpaceEvenly,
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              globalStyles.fillHeight,
              styles.boderRightTable,
              styles.widthValue1,
            ]}
          >
            <View style={styles.widthValue3}>
              <Text allowFontScaling={false} style={[styles.valueTextTable]}>
                {rowData.expiredLong}
              </Text>
            </View>
            <View style={styles.borderTable} />
            <View style={styles.widthValue3}>
              <Text allowFontScaling={false} style={[styles.valueTextTable]}>
                {rowData.expiredShort}
              </Text>
            </View>
          </View>
        ),
      },
      {
        label: [
          <Text style={styles.headerTextTable}>{t('Balance')}</Text>,
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              globalStyles.container2,
              globalStyles.justifySpaceEvenly,
            ]}
          >
            <View style={[styles.widthValue4, globalStyles.alignCenter]}>
              <Text style={styles.headerTextTable}>{t('Long')}</Text>
            </View>
            <View style={styles.borderTable} />
            <View style={[styles.widthValue4, globalStyles.alignCenter]}>
              <Text style={styles.headerTextTable}>{t('Short')}</Text>
            </View>
            <View style={styles.borderTable} />
            <View style={[styles.widthValue4, globalStyles.alignCenter]}>
              <Text style={styles.headerTextTable}>{t('Closing Price')}</Text>
            </View>
          </View>,
        ],
        width: 320,
        element: (_key: string, rowData: IKisGetDerEnquiryClientStockStatementResponse) => (
          <View
            style={[
              globalStyles.justifySpaceEvenly,
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              globalStyles.fillHeight,
              styles.boderRightTable,
              styles.widthValue2,
            ]}
          >
            <View style={styles.widthValue4}>
              <Text allowFontScaling={false} style={styles.valueTextTable}>
                {rowData.balanceLong}
              </Text>
            </View>
            <View style={styles.borderTable} />
            <View style={styles.widthValue4}>
              <Text allowFontScaling={false} style={styles.valueTextTable}>
                {rowData.balanceShort}
              </Text>
            </View>
            <View style={styles.borderTable} />
            <View style={styles.widthValue4}>
              <Text allowFontScaling={false} style={styles.valueTextTable}>
                {formatNumber(rowData.balanceClosingPrice, 1, undefined, true)}
              </Text>
            </View>
          </View>
        ),
      },
      {
        label: 'Total',
        width: 120,
        element: (_key: string, rowData: IKisGetDerEnquiryClientStockStatementResponse) => (
          <View style={[globalStyles.container2, globalStyles.centered, styles.boderRightTable, styles.widthValue6]}>
            <Text
              allowFontScaling={false}
              style={[styles.valueTextTable, getColor(rowData.totalPL, 0, undefined, undefined, true).textStyle]}
            >
              {formatNumber(rowData.totalPL, 2, undefined, false)}
            </Text>
          </View>
        ),
      },
    ],
  };

  const resetData = () => {
    dispatch(resetNAVChange(null));
    setPageNumber(0);
    if (selectAccountDerivatives) dispatch(kisResetDerEnquiryClientStockStatement(null));
  };

  useEffect(() => {
    resetData();
    queryDailyProfitLoss();
    getAccNAV(fromDate.current, toDate.current);
  }, [selectedAccount]);

  const onChangeFromDate = (value: Date) => {
    if (value !== fromDate.current) {
      if (isAfter(value, toDate.current)) {
        setToDate(value);
      }
      setFromDate(value);
      resetData();
      queryDailyProfitLoss();
      getAccNAV(fromDate.current, toDate.current);
    }
  };

  const onChangeToDate = (value: Date) => {
    if (value !== toDate.current) {
      if (isBefore(value, fromDate.current)) {
        setFromDate(value);
      }
      setToDate(value);
      resetData();
      queryDailyProfitLoss();
      getAccNAV(fromDate.current, toDate.current);
    }
  };

  const queryDailyProfitLoss = () => {
    let calFromDate = subBusinessDays(toDate.current, PAGE_SIZE * (pageNumber.current + 1) + pageNumber.current);
    calFromDate = calFromDate > fromDate.current ? calFromDate : fromDate.current;
    let calToDate = subBusinessDays(toDate.current, PAGE_SIZE * pageNumber.current + pageNumber.current);
    calToDate = calToDate > calFromDate ? calToDate : calFromDate;
    if (isEqual(calFromDate, calToDate) && !isEqual(fromDate.current, toDate.current)) {
      return;
    }
    if (selectedAccount.type === ACCOUNT_TYPE.DEMO) {
      getDemoProfitLoss();
      return;
    }
    if (selectAccountDerivatives) {
      dispatch(
        kisGetDerEnquiryClientStockStatement({
          accountNo: selectedAccount.selectedSubAccount?.accountNumber,
          fromDate: formatDateToString(fromDate.current),
          toDate: formatDateToString(toDate.current),
        })
      );
    } else {
      dispatch(
        getNAVChange({
          fromDate: formatDateToString(calFromDate) as string,
          toDate: formatDateToString(calToDate) as string,
        })
      );
    }
  };

  const getAccNAV = (fromDate: Date, toDate: Date) => {
    dispatch(
      getAccumulativeNAV({
        subAccount: selectedAccount.selectedSubAccount?.accountNumber ?? '000',
        fromDate: formatDateToString(fromDate) ?? '',
        toDate: formatDateToString(toDate) ?? '',
      })
    );
  };

  const getDemoProfitLoss = () => {
    const demoData = [];
    let current = new Date();
    for (let i = 0; i < 15; i++) {
      if (current < fromDate.current) {
        break;
      }
      demoData.push({
        date: formatDateToString(current, 'yyyyMMdd') ?? '',
        navProfit: 0,
        navProfitRatio: 0,
      });
      current = subBusinessDays(current, 1);
    }
    dispatch({
      type: SUCCESS(EQUITY_GET_NAV_CHANGE),
      payload: { dailyProfitLosses: demoData },
    });
  };

  useEffect(() => {
    return () => resetData();
  }, []);

  const onLoadMore = useCallback(() => {
    if (navChange.data && navChange.previous && navChange.status !== ReducerStatus.LOADING) {
      setPageNumber(pageNumber.current + 1);
      queryDailyProfitLoss();
    }
  }, [navChange]);

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={props.navigation.goBack}
        headerTitle={selectAccountDerivatives ? 'Position Statement' : 'Profit & Loss Report'}
        subAccountVisible={true}
      />
      {!selectAccountDerivatives ? (
        <SheetData3
          ListHeaderComponent={
            <>
              <Text allowFontScaling={false} style={styles.title}>
                {t('Daily P & L')}
              </Text>
              <Chart chartStyle={ChartStyle.BAR} notOnEnterScreen={true} />
              <View style={styles.line} />
              <Text allowFontScaling={false} style={styles.title}>
                {t('History')}
              </Text>
              <View style={[globalStyles.flexDirectionRow, styles.filterContainer]}>
                <View style={[globalStyles.container, styles.fromDateContainer]}>
                  <View style={[globalStyles.container, globalStyles.justifyCenter]}>
                    <DatePicker
                      label={t('From date')}
                      onChange={onChangeFromDate}
                      value={fromDate.current}
                      maxDate={new Date()}
                    />
                  </View>
                </View>
                <View style={[globalStyles.container, styles.toDateContainer]}>
                  <View style={[globalStyles.container, globalStyles.justifyCenter]}>
                    <DatePicker
                      label={t('To date')}
                      onChange={onChangeToDate}
                      value={toDate.current}
                      maxDate={new Date()}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.sumProfitLossContainer}>
                <View style={styles.itemSumProfitLoss}>
                  <Text style={styles.textSumProfitLoss1}>{t('net_profit_loss')}</Text>
                  <Text
                    style={[
                      styles.textSumProfitLoss2,
                      {
                        color:
                          Number(accNav?.accNAVProfitValue) > 0
                            ? Colors.DARK_GREEN
                            : Number(accNav?.accNAVProfitValue) < 0
                            ? Colors.LIGHTRed2
                            : Colors.BLACK,
                      },
                    ]}
                  >
                    {formatNumber(accNav?.accNAVProfitValue) ?? '-'}
                  </Text>
                </View>
                <View style={styles.itemSumProfitLoss}>
                  <Text style={styles.textSumProfitLoss1}>{t('rate_of_profit_loss')}</Text>
                  <Text
                    style={[
                      styles.textSumProfitLoss2,
                      {
                        color:
                          Number(accNav?.accNAVProfitRatio) > 0
                            ? Colors.DARK_GREEN
                            : Number(accNav?.accNAVProfitRatio) < 0
                            ? Colors.LIGHTRed2
                            : Colors.BLACK,
                      },
                    ]}
                  >
                    {accNav?.accNAVProfitRatio
                      ? formatNumber(accNav?.accNAVProfitRatio, 2, undefined, true) + '%'
                      : '-'}
                  </Text>
                </View>
              </View>
              <SheetDataHeader {...ConfigSheetDataHeader} />
            </>
          }
          useFlatList={true}
          RowComponent={ProfitLossRowComponent}
          data={dailyProfitLosses ?? []}
          onEndReached={onLoadMore}
          ListFooterComponent={
            <>
              {pageNumber.current > 1 &&
              navChange.status === ReducerStatus.LOADING &&
              (dailyProfitLosses?.length ?? 0) > 0 ? (
                <View>
                  <Text style={styles.loadingText}>{t('Loading')}...</Text>
                </View>
              ) : (
                <View />
              )}
              {dailyProfitLosses == null && navChange.status === ReducerStatus.SUCCESS ? (
                <View style={styles.noDataCon}>
                  <EmptySymbol />
                  <Text style={styles.noDataText}>{t('There is no data')}</Text>
                </View>
              ) : null}
            </>
          }
        />
      ) : null}

      {selectAccountDerivatives ? (
        <View style={globalStyles.container2}>
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
          <SheetData
            config={configGridClientStockStatement}
            data={derDailyProfitLossesData}
            containerStyle={globalStyles.container}
            ListEmptyComponent={
              derDailyProfitLossesData == null ||
              (derDailyProfitLossesData != null &&
                derDailyProfitLossesData.length === 0 &&
                derDailyProfitLossesStatus === ReducerStatus.SUCCESS) ? (
                <>
                  <SheetDataHeader {...DerConfigSheetDataHeader} />
                  <View style={styles.noDataCon}>
                    {derDailyProfitLossesData == null ? (
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
        </View>
      ) : null}
    </View>
  );
};

export default memo(ProfitLossReport);
