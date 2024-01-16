import React, { useMemo } from 'react';
import { View, Text, Platform } from 'react-native';
import DatePicker from 'components/DatePicker';
import SheetData from 'components/SheetData';
import { formatNumber, getColor, getIconColor } from 'utils/common';
import { formatStringToDateString } from 'utils/datetime';
import globalStyles, { Colors, lightColors, scaleSize } from 'styles';
import { IDailyProfitLosses, IFollowingDailyProfitLoss } from 'interfaces/equity';

// Icons
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import IconIncrease from 'assets/icon/IconIncrease.svg';
import IconDecrease from 'assets/icon/IconDecrease2.svg';
import { useTranslation } from 'react-i18next';
import { ReducerStatus } from 'interfaces/reducer';
import { getStylesHook } from 'hooks/useStyles';
import config from 'config';
import withMemo from 'HOC/withMemo';
import { subDays } from 'date-fns';

const PAGE_SIZE = config.pageSize;

const PROFIT_LOSS_REPORT_CELL_WRAPPER = [
  globalStyles.justifySpaceEvenly,
  globalStyles.flexDirectionRow,
  globalStyles.alignCenter,
];

interface IProfitLossReportProps {
  followingDailyProfitLoss: IFollowingDailyProfitLoss[];
  followingDailyProfitLossByDate: IFollowingDailyProfitLoss[];
  onChangeFromDate: (value: Date) => void;
  onChangeToDate: (value: Date) => void;
  statusFollowingDailyProfitLossDate: ReducerStatus;
  accNAVProfitValue?: number;
  accNAVProfitRatio?: number;
  fromDate: Date;
  toDate: Date;
}

const FollowingDailyProfitLossComponent = ({
  followingDailyProfitLossByDate,
  onChangeFromDate,
  onChangeToDate,
  statusFollowingDailyProfitLossDate,
  accNAVProfitValue,
  accNAVProfitRatio,
  fromDate,
  toDate,
}: IProfitLossReportProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const previousDate = useMemo(() => subDays(new Date(), 1), []);

  const configGrid = {
    columnFrozen: 2,
    maxHeightPerRow: 44,
    labelSize: 14,
    header: [
      {
        label: 'Date',
        width: 130,
        element: (_key: string, rowData: IDailyProfitLosses) => (
          <View style={styles.borderRightTable}>
            <Text allowFontScaling={false} style={styles.dateText}>
              {formatStringToDateString(rowData.date, 'dd/MM/yyyy')}
            </Text>
          </View>
        ),
      },
      {
        label: 'Profit (Return Rate)',
        width: 243,
        element: (_key: string, rowData: IDailyProfitLosses) => (
          <View style={PROFIT_LOSS_REPORT_CELL_WRAPPER}>
            <Text
              allowFontScaling={false}
              style={[
                styles.quantity,
                styles.marginRight8,
                getColor(rowData.navProfit, 0, undefined, undefined, true).textStyle,
              ]}
            >
              {formatNumber(rowData.navProfit, 2)}
            </Text>
            <View style={styles.iconContainer}>
              {getIconColor(
                rowData.navProfit,
                0,
                undefined,
                undefined,
                <IconIncrease width={scaleSize(12)} height={scaleSize(10)} style={styles.iconStyle} />,
                <IconDecrease width={scaleSize(12)} height={scaleSize(10)} style={styles.iconStyle} />
              )}
            </View>
            <Text
              allowFontScaling={false}
              style={[
                styles.quantity2,
                styles.paddingRight16,
                getColor(rowData.navProfit, 0, undefined, undefined, true).textStyle,
              ]}
            >
              {`${formatNumber(rowData.navProfitRatio, 2, undefined, true)}%`}
            </Text>
          </View>
        ),
      },
    ],
  };

  const renderLoading = () => {
    return statusFollowingDailyProfitLossDate &&
      followingDailyProfitLossByDate.length % PAGE_SIZE == 0 &&
      followingDailyProfitLossByDate.length >= PAGE_SIZE ? (
      <Text style={styles.loadingText}>{t('Loading')}...</Text>
    ) : (
      <></>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text allowFontScaling={false} style={styles.titleText}>
          {t('P/L History')}
        </Text>
      </View>
      <View style={styles.filterContainer}>
        <DatePicker
          stylesContainer={styles.fromDateContainer}
          label={t('From date')}
          onChange={onChangeFromDate}
          value={fromDate}
          maxDate={previousDate}
        />
        <DatePicker
          stylesContainer={styles.toDateContainer}
          label={t('To date')}
          onChange={onChangeToDate}
          value={toDate}
          maxDate={previousDate}
        />
      </View>
      <View style={styles.netAndRatePLContainer}>
        <View style={styles.netAndRatePLItemContainer}>
          <Text style={styles.netAndRatePLTitle}>Net Profit/Loss</Text>
          <Text
            style={[styles.netAndRatePLValue, getColor(accNAVProfitValue, 0, undefined, undefined, true).textStyle]}
          >
            {accNAVProfitValue ? formatNumber(accNAVProfitValue, 2) : '-'}
          </Text>
        </View>
        <View style={styles.netAndRatePLItemContainer}>
          <Text style={styles.netAndRatePLTitle}>Rate of Profit/Loss</Text>
          <Text
            style={[styles.netAndRatePLValue, getColor(accNAVProfitRatio, 0, undefined, undefined, true).textStyle]}
          >
            {accNAVProfitRatio ? `${formatNumber(accNAVProfitRatio, 2)}%` : '-'}
          </Text>
        </View>
      </View>
      <View style={followingDailyProfitLossByDate.length === 0 ? styles.noDataHeight : globalStyles.container}>
        <SheetData
          config={configGrid}
          data={followingDailyProfitLossByDate}
          iniData={PAGE_SIZE}
          containerStyle={styles.sheetContainer}
          renderFooter={renderLoading}
        />
      </View>
      {followingDailyProfitLossByDate?.length === 0 && statusFollowingDailyProfitLossDate === ReducerStatus.SUCCESS ? (
        <View style={styles.noDataCon}>
          <EmptySymbol />
          <Text style={styles.noDataText}>{t('There is no data')}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default withMemo(FollowingDailyProfitLossComponent);

const useStyles = getStylesHook({
  titleContainer: {
    height: 44,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextBigTitle,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  iconContainer: {
    ...globalStyles.centered,
    ...globalStyles.flexDirectionRow,
    width: 35,
  },
  filterContainer: {
    height: 101,
    flexDirection: 'row',
  },
  fromDateContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 8,
    justifyContent: 'center',
  },
  toDateContainer: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 16,
    justifyContent: 'center',
  },
  headerTitleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 18,
  },
  titleCashTransactionContainer: {
    backgroundColor: Colors.WHITE,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    borderRadius: 5,
  },
  titleCashTransaction: {
    paddingHorizontal: 7,
    paddingVertical: 1,
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.BlueNewColor,
  },
  smallTitle: {
    marginHorizontal: 3,
    color: Colors.WHITE,
    fontSize: 12,
    width: 118,
    textAlign: 'center',
  },
  dateText: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 18,
  },
  middleIcon: {
    marginLeft: 21,
    marginRight: 16,
  },
  leftText: {
    fontSize: 16,
    fontWeight: '600',
  },
  rightText: {
    fontSize: 16,
  },
  iconStyle: {
    marginRight: 6,
  },
  quantity: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    width: 120,
    textAlign: 'right',
    paddingRight: 30,
    lineHeight: 20,
  },
  quantity2: {
    flex: 1,
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    width: 50,
    textAlign: 'right',
    lineHeight: 20,
    paddingTop: Platform.OS === 'ios' ? 3 : 1,
  },
  marginRight8: {
    paddingRight: 20,
  },
  paddingRight16: {
    marginRight: 16,
  },
  color: {
    width: 35,
  },

  // fix border table
  borderRightTable: {
    ...globalStyles.container2,
    ...globalStyles.centered,
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
  },

  // Skeleton Layout
  labelPlaceHolderContainer1: {
    height: 40,
    width: 106,
  },
  labelPlaceHolderContainer2: {
    height: 40,
    width: 270,
  },
  marginHorizontal: {
    marginHorizontal: 2,
  },
  marginTop8: {
    marginTop: 8,
  },
  borderSkeleton: {
    width: '100%',
    height: 1,
    marginTop: 6,
    color: Colors.BORDER,
  },

  // issue 727 nodata
  noDataCon: {
    width: 375,
    height: 162,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataHeight: {
    height: 60,
  },
  noDataText: {
    fontFamily: 'Roboto',
    marginTop: 16,
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    color: Colors.LIGHTTextDisable,
  },
  sheetContainer: {
    paddingBottom: 2,
  },

  // netProfitLoss
  netAndRatePLContainer: {
    height: 40,
    flexDirection: 'row',
    marginBottom: 15,
  },
  netAndRatePLItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  netAndRatePLTitle: {
    color: Colors.LIGHTTextTitle,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  netAndRatePLValue: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 18,
  },
});
