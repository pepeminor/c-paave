import { View, Dimensions } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import useStyles from './styles';
import { ITradeTabOption } from 'global';
import { useDispatch } from 'react-redux';
import { HeaderConfig, useScrollHorizontal } from '../../../../components/SheetData2/index';
import CellPL from 'components/StockList/components/CellPL';
import DatePicker from 'components/DatePicker';
import SheetDataHeader from 'components/SheetData2/components/Header';
import RowWrapper from 'components/SheetData2/components/RowWrapper';
import { updateCondOrderFilter } from 'reduxs/global-actions/OrderBook';
import { isAfter, isBefore } from 'date-fns';
import { SymbolType } from 'constants/enum';
import { useAppSelector } from 'hooks/useAppSelector';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import TouchCell, { SortType } from 'components/StockList/components/TouchCell';
import { TitleHeader } from 'components/StockList/components/Header/HeaderUserWall';
import TradeTabTable from '../TradeTabTable';
import { OrderBookModal } from 'screens/OrderBook/components';
import withMemo from 'HOC/withMemo';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface ITabTradeProp {
  scrollToTop: () => void;
  triggerReload: boolean;
  isNotRefresh: boolean;
}

const TabTradeSelector_orderBookHeader = {
  height: 44,
  data: [
    { width: 110, text: 'Symbol' },
    [
      { text: 'Quantity', width: 85 },
      { text: 'Matched Qtt', width: 85 },
    ],
    [
      { text: 'Price', width: 85 },
      { text: 'Matched', width: 85 },
    ],

    { width: 90, text: 'Action' },
  ],
};

const TabTradeSelector_orderBookConditionHeader = {
  height: 44,
  data: [
    { width: 110, text: 'Symbol' },
    { text: 'Quantity', width: 86 },
    [
      { text: 'Stop Price', width: 85 },
      { text: 'Limit Price', width: 85 },
    ],
    { width: 90, text: 'Status' },
  ],
};

const TabTradeSelector = (props: ITabTradeProp) => {
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const optionSelecting = useAppSelector(state => state.tradeTabOption);
  const orderBookFilter = useAppSelector(state => state.orderBookFilter);
  const currentSymbolType = useAppSelector(SymbolDataSelector.selectCurrentSymbolType);
  const [sortType, setSortType] = useState(SortType.DESC);
  const [activeTitle, setActiveTitle] = useState('');
  const [plViewType, setPLViewType] = useState(false);

  const changePLMode = useCallback(() => {
    setPLViewType(prev => !prev);
  }, []);

  const getSortType = useCallback((sortType: SortType) => {
    setSortType(sortType);
  }, []);

  const setActiveTitleHeader = useCallback((title: string) => {
    setActiveTitle(title);
  }, []);

  const portfolioHeader = useMemo(
    (): HeaderConfig => ({
      height: currentSymbolType === SymbolType.FUTURES ? 53 : 38,
      data:
        currentSymbolType === SymbolType.FUTURES
          ? [
              { width: 106, text: 'Symbol' },

              [
                { text: 'Long Qtt', width: 80 },
                { text: 'Short Qtt', width: 80 },
              ],

              [
                { text: 'Avg Price', width: 80 },
                { text: 'Cur Price', width: 80 },
              ],

              { width: 108, text: 'Floating P/L' },
            ]
          : [
              {
                width: 125,
                text: (
                  <TouchCell
                    title="Symbol"
                    sortType={sortType}
                    getSortType={getSortType}
                    onPressCell={() => setActiveTitleHeader?.(TitleHeader.SYMBOL)}
                    isActiveFilter={sortType !== SortType.NONE && activeTitle === TitleHeader.SYMBOL}
                  />
                ),
              },

              { text: 'Sellable', width: 88.67 },

              { text: 'Avg Price', width: 73.67 },

              {
                width: 90,
                text: (
                  <CellPL
                    sortType={sortType}
                    getSortType={getSortType}
                    onPressChangePL={changePLMode}
                    isPLRate={plViewType}
                    onPressCell={() => setActiveTitleHeader?.(TitleHeader.PLPERCENT)}
                    isActiveFilter={
                      sortType !== SortType.NONE &&
                      (activeTitle === TitleHeader.PLPERCENT || activeTitle === TitleHeader.PLVALUE)
                    }
                  />
                ),
              },
            ],
    }),
    [plViewType, currentSymbolType, activeTitle, sortType, getSortType]
  );

  const { scrollStyle, frozenStyle } = useScrollHorizontal(SCREEN_WIDTH);

  const Wrapper = useCallback(RowWrapper({ scrollStyle, frozenStyle }), []);

  const headerTable = useMemo(() => {
    switch (optionSelecting) {
      case ITradeTabOption.CONDITION_ORDER:
        return <SheetDataHeader {...TabTradeSelector_orderBookConditionHeader} Wrapper={Wrapper} />;
      case ITradeTabOption.ORDER_BOOK:
        return <SheetDataHeader {...TabTradeSelector_orderBookHeader} Wrapper={Wrapper} />;
      case ITradeTabOption.PORTFOLIO:
        return <SheetDataHeader {...portfolioHeader} Wrapper={Wrapper} />;
      default:
        return <SheetDataHeader {...portfolioHeader} Wrapper={Wrapper} />;
    }
  }, [optionSelecting, portfolioHeader, Wrapper]);

  const onChangeFromDate = useCallback(
    (value: Date) => {
      if (
        orderBookFilter.conditionOrderFilter.toDate != null &&
        isAfter(value, orderBookFilter.conditionOrderFilter.toDate)
      ) {
        dispatch(updateCondOrderFilter({ fromDate: value, toDate: value }));
      }
      dispatch(updateCondOrderFilter({ fromDate: value }));
    },
    [orderBookFilter.conditionOrderFilter.toDate]
  );

  const onChangeToDate = useCallback(
    (value: Date) => {
      if (
        orderBookFilter.conditionOrderFilter.fromDate != null &&
        isBefore(value, orderBookFilter.conditionOrderFilter.fromDate)
      ) {
        dispatch(updateCondOrderFilter({ fromDate: value, toDate: value }));
      }
      dispatch(updateCondOrderFilter({ toDate: value }));
    },
    [orderBookFilter.conditionOrderFilter.fromDate]
  );

  return (
    <View style={styles.container}>
      {optionSelecting === ITradeTabOption.CONDITION_ORDER && (
        <View style={styles.marginBottom8n}>
          <View style={styles.marginHorizontal16n}>
            <DatePicker
              label={'From date'}
              onChange={onChangeFromDate}
              value={orderBookFilter.conditionOrderFilter.fromDate}
            />
          </View>
          <View style={styles.marginRight16n}>
            <DatePicker
              label={'To date'}
              onChange={onChangeToDate}
              value={orderBookFilter.conditionOrderFilter.toDate}
            />
          </View>
        </View>
      )}
      {headerTable}

      <TradeTabTable
        getSortType={getSortType}
        sortType={sortType}
        plViewType={plViewType}
        activeTitleHeader={activeTitle}
        triggerReload={props.triggerReload}
        isNotRefresh={props.isNotRefresh}
        scrollToTop={props.scrollToTop}
      />

      <OrderBookModal />
    </View>
  );
};

export default withMemo(TabTradeSelector);
