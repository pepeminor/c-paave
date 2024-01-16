import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { ReducerStatus } from 'interfaces/reducer';
import globalStyles from 'styles';
import useStyles from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { putIncreaseSearch, putIncreaseSearchForKis, getRealizedProfitLoss } from 'reduxs/global-actions';
import { ACCOUNT_TYPE } from 'global';
import { IState } from 'reduxs/global-reducers';
import { useTranslation } from 'react-i18next';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import DatePicker from 'components/DatePicker';
import { formatDateToString, isSymbolExist, navigateToSymbolInfoOverview } from 'utils';
import SheetData3, { HeaderConfig } from 'components/SheetData3';
import SheetDataHeader from 'components/SheetDataHeader';
import CellPL from './CellPL';
import renderRow from './StockRow';
import { IGetRealizedProfitLossDetailItem } from 'interfaces/equity';
import withMemo from 'HOC/withMemo';
import { subWeeks } from 'date-fns';
import { WatchListActions } from 'reduxs';
import SearchInput from 'components/SearchInput';

const StockListLeaderActivity1 = () => {
  const selectedAccount = useSelector((state: IState) => state.selectedAccount);
  const realizedProfitloss = useSelector((state: IState) => state.realizedProfitLoss);
  const [fromDate, setFromDate] = useState<Date>(subWeeks(new Date(), 1));
  const [toDate, setToDate] = useState<Date>(new Date());
  const [plViewType, setPLViewType] = useState(true);
  const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { styles } = useStyles();

  useEffect(() => {
    queryRealizedProfitLoss(fromDate, toDate);
  }, [fromDate, toDate]);

  const queryRealizedProfitLoss = (fd: Date, td: Date) => {
    dispatch(
      getRealizedProfitLoss({
        fromDate: formatDateToString(fd) || '',
        toDate: formatDateToString(td) || '',
      })
    );
  };

  const goToStockInfoOverView = (item: IGetRealizedProfitLossDetailItem) => {
    if (!isSymbolExist(item.stockCode)) return;
    if (selectedAccount.type === ACCOUNT_TYPE.VIRTUAL) {
      dispatch(putIncreaseSearch({ code: item.stockCode }));
    }
    if (selectedAccount.type === ACCOUNT_TYPE.KIS) {
      dispatch(putIncreaseSearchForKis({ code: item.stockCode, partnerId: 'kis' }));
    }
    dispatch(
      WatchListActions.getSymbolIncludeWatchList({
        code: item.stockCode,
      })
    );
    navigateToSymbolInfoOverview(item.stockCode, dispatch);
  };

  const onChangeFromDate = (value: Date) => {
    if (value >= toDate) {
      setToDate(value);
    }
    setFromDate(value);
  };

  const onChangeToDate = (value: Date) => {
    if (value <= fromDate) {
      setFromDate(value);
    }
    setToDate(value);
  };

  const changePLMode = useCallback(() => {
    setPLViewType(pre => !pre);
  }, []);

  const getListRealizedProfitLoss = (() => {
    let stockList: IGetRealizedProfitLossDetailItem[] = [];

    if (
      realizedProfitloss.data != null &&
      realizedProfitloss.data.length > 0 &&
      realizedProfitloss.status === ReducerStatus.SUCCESS
    ) {
      realizedProfitloss.data
        .filter(ele => ele.realizedPLValue !== 0)
        .reverse()
        .map(ele => {
          if (ele.profitLossDetails.length > 0) {
            ele.profitLossDetails.map(item => (stockList = [...stockList, Object.assign(item, { date: ele.date })]));
          }
        });
    }
    if (searchText.length) {
      stockList = stockList.filter(item => item.stockCode.toLowerCase().includes(searchText.toLowerCase()));
    }

    return stockList;
  })();

  const sheetHeaderConfig = useMemo(
    (): HeaderConfig => ({
      height: 60,
      data: [
        [
          { content: 'Buying Date', width: 96 },
          { content: 'Selling Date', width: 96 },
        ],
        { width: 96, content: 'Symbol' },
        [
          { content: 'Buy Price', width: 80 },
          { content: 'Sell Price', width: 80 },
        ],
        [
          { width: 108, content: 'Quantity' },
          { width: 108, content: <CellPL onPress={changePLMode} plViewType={plViewType} /> },
        ],
      ],
    }),
    [plViewType]
  );

  const sheetRowConfig = renderRow({ plViewType, goToStockInfoOverView });

  const onTextSearchChange = (text: string) => {
    setSearchText(text);
  };

  const onClearTextSearch = () => {
    setSearchText('');
  };

  return (
    <View style={[globalStyles.container]}>
      <View style={[globalStyles.flexDirectionRow, globalStyles.fillWidth, styles.dateTimeContainer]}>
        <View style={[globalStyles.container, styles.fromDate]}>
          <DatePicker label={'From Date'} onChange={onChangeFromDate} value={fromDate} maxDate={new Date()} />
        </View>
        <View style={[globalStyles.container, styles.toDate]}>
          <DatePicker label={'To Date'} onChange={onChangeToDate} value={toDate} maxDate={new Date()} />
        </View>
      </View>

      <SearchInput
        containerStyle={styles.searchInput}
        onChangeText={onTextSearchChange}
        value={searchText}
        hideClearIcon={searchText.length === 0}
        onClear={onClearTextSearch}
      />

      <SheetDataHeader {...sheetHeaderConfig} />
      {realizedProfitloss.data != null && realizedProfitloss.status === ReducerStatus.SUCCESS && (
        <View>
          <SheetData3 data={getListRealizedProfitLoss} RowComponent={sheetRowConfig} />
          {getListRealizedProfitLoss.length === 0 && (
            <View style={styles.noDataCon}>
              <EmptySymbol />
              <Text style={styles.noDataText}>{t('There is no data')}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default withMemo(StockListLeaderActivity1);
