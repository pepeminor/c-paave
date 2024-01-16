import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { navigate } from 'utils/rootNavigation';
import globalStyles from 'styles';
import useStyles from './styles';
import SheetData3, { HeaderConfig } from 'components/SheetData3';
import renderRow from './components/StockRow';
import { useTypedSelector } from 'hooks/useAppSelector';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import SheetDataHeader from 'components/SheetDataHeader';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { useTranslation } from 'react-i18next';
import HeaderPortfolio from './components/Header/HeaderPortfolio';
import { IProfitLossItems } from 'interfaces/equity';
import withMemo from 'HOC/withMemo';
import { Dropdown } from 'react-native-element-dropdown';

export const STOCK_LIST_TYPE = {
  QUANTITY: 'QUANTITY',
  HOLD_DAYS: 'HOLD_DAYS',
};

type IStockListProps = {
  scrollEnabled: boolean;
  isFullData?: boolean;
  isOtherUser: boolean;
  listItems: IProfitLossItems[];
  listCodes: string[];
  setDataStock?: (data: string[]) => void;
  isOwner?: boolean;
};

const LIMIT_DATA = 5;

const goToTrade = () => navigate({ key: ScreenNames.Trade });

const StockList = (props: IStockListProps) => {
  const {
    scrollEnabled,
    isFullData = false,
    isOtherUser = false,
    listItems = [],
    listCodes = [],
    setDataStock,
    isOwner = true,
  } = props;
  const [isPLRate, setIsPLRate] = useState(true);
  const [activeTitle, setActiveTitle] = useState('');
  const { styles } = useStyles();
  const { t } = useTranslation();
  const data = [
    { label: t('total_quantity_and_sellable_quantity'), value: STOCK_LIST_TYPE.QUANTITY },
    { label: t('stock_weight_and_hold_date'), value: STOCK_LIST_TYPE.HOLD_DAYS },
  ];
  const cwList = useTypedSelector(state => state.SymbolData.marketData.cwList);
  const [type, setType] = useState(isOwner ? data[0] : data[1]);

  const originDataProfitLoss = useMemo(() => {
    if (isFullData) {
      return listItems ?? [];
    }
    return listItems?.slice(0, LIMIT_DATA) ?? [];
  }, [listItems, isFullData]);

  const originalListStockCodes = useMemo(() => {
    if (isFullData) {
      return listCodes ?? [];
    }
    return listCodes?.slice(0, LIMIT_DATA) ?? [];
  }, [listCodes, isFullData]);

  useEffect(() => {
    setDataStocks(originalListStockCodes);
  }, [originalListStockCodes]);

  const [dataStocks, setDataStocks] = useState(originalListStockCodes);

  useSubscribeSymbol(originalListStockCodes, ['BID_OFFER', 'QUOTE']);

  // handle symbol CW removed file symbol list data
  const symbolRemoved = useMemo(() => {
    if (listItems == null) return;
    const symbolDataCode = listItems.map(item => item.stockCode);
    const cwCodeList = cwList.map(item => item.symbolCode);
    return symbolDataCode.filter(item => {
      return cwCodeList.includes(item);
    });
  }, [listItems, cwList]);

  const changePLMode = useCallback(() => {
    setIsPLRate(pre => !pre);
  }, []);

  const setActiveTitleHeader = useCallback((title: string) => {
    setActiveTitle(title);
  }, []);

  const onChangeTypePortfolio = useCallback(value => {
    setType(value);
  }, []);

  const sheetHeaderConfig = useMemo((): HeaderConfig => {
    return HeaderPortfolio({
      originDataProfitLoss,
      originalListStockCodes,
      isPLRate,
      changePLMode,
      setDataStocks: setDataStock ?? setDataStocks,
      setActiveTitleHeader,
      activeTitle,
      type: type.value,
      isOwner,
    });
  }, [
    originDataProfitLoss,
    originalListStockCodes,
    isPLRate,
    changePLMode,
    setDataStock,
    type.value,
    setDataStocks,
    setActiveTitleHeader,
    activeTitle,
    isOwner,
  ]);

  const RenderRow = useMemo(() => {
    return renderRow({ isPLRate, symbolRemoved, isOtherUser, type: type.value, isOwner });
  }, [isPLRate, symbolRemoved, isOtherUser, type, isOwner]);

  if (listItems?.length === 0) {
    return (
      <>
        <Dropdown
          data={data}
          value={type}
          labelField="label"
          valueField="value"
          style={styles.dropdownContainer}
          onChange={onChangeTypePortfolio}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.selectedTextStyle}
        />
        <SheetDataHeader {...sheetHeaderConfig} />
        <View style={styles.noDataSection}>
          <EmptySymbol />
          <Text allowFontScaling={false} style={styles.noDataText}>
            {t('You have not owned any symbols yet.')}
          </Text>
          <TouchableOpacity style={styles.noDataBtn} onPress={goToTrade}>
            <Text allowFontScaling={false} style={styles.noDataBtnText}>
              {t('Trade Now')}
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Dropdown
        data={data}
        value={type}
        labelField="label"
        valueField="value"
        style={styles.dropdownContainer}
        onChange={onChangeTypePortfolio}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.selectedTextStyle}
      />
      <SheetDataHeader {...sheetHeaderConfig} />
      {listItems != null ? (
        <SheetData3 data={dataStocks ?? []} RowComponent={RenderRow} scrollEnabled={scrollEnabled} />
      ) : (
        <View style={styles.skeletonContainer} />
      )}
    </View>
  );
};

export default withMemo(StockList);
