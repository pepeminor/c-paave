import React, { memo, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { StackScreenProps } from 'screens/RootNavigation';
import globalStyles from 'styles';
import SheetData from 'components/SheetData';
import HeaderScreen from 'components/HeaderScreen';
import { formatNumber, getColor, formatTimeToDisplay } from 'utils';
import { ReducerStatus } from 'interfaces/reducer';
import { ISymbolQuoteListParams } from 'interfaces/market';
import useStyles from './styles';

// ICON
import IconRefresh from 'assets/icon/IconRefresh2.svg';
import { useTranslation } from 'react-i18next';
import { LANG } from 'global';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { useAppSelector } from 'hooks/useAppSelector';
import { getQuoteList, QuoteData, SymbolDataSelector } from 'reduxs/SymbolData';
import useAppStateChange from 'hooks/useAppStateChange';

const DEFAULT_COUNT = 100;

interface IQuoteListState {
  status: ReducerStatus | string;
  data: QuoteData[];
  lastTradingVolume: number;
  loadMoreDataLength: number;
}

const initialQuoteListData: IQuoteListState = {
  status: ReducerStatus.LOADING,
  data: [],
  lastTradingVolume: 0,
  loadMoreDataLength: 0,
};

const TradeQuote = (props: StackScreenProps<'TradeQuote'>) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const lang = useAppSelector(state => state.lang);
  const currentSymbol = useAppSelector(SymbolDataSelector.selectCurrentSymbol, {
    ceilingPrice: true,
    floorPrice: true,
    symbolCode: true,
    tradingVolume: true,
    tradingValue: true,
    matchingVolume: true,
    currentPrice: true,
    vietnameseName: true,
    englishName: true,
  });
  const currentSymbolQuote = useAppSelector(SymbolDataSelector.selectCurrentQuote);

  const [quoteListData, setQuoteListData] = useState<IQuoteListState>(initialQuoteListData);
  const prevSelectedSymbol = useRef<string | null>(null);

  const EmptyListMessage = () => (
    <View style={styles.noDataContainer}>
      <View style={styles.noData}>
        <IconRefresh />
        <Text style={styles.noDataText}>
          {t('Cannot fetch data.\nPlease pull down to')}
          <Text style={styles.noDataTextBlue}> {t('refresh')}</Text>
        </Text>
      </View>
    </View>
  );

  const configGrid = {
    columnFrozen: 4,
    maxHeightPerRow: 30,
    headerHeight: 42,
    header: [
      {
        label: ['Time'],
        width: 93,
        element: (key: string, rowData: QuoteData) => (
          <View style={[globalStyles.container2, globalStyles.centered, styles.borderRight]} key={key}>
            <Text
              allowFontScaling={false}
              style={[globalStyles.textAlignCenter, globalStyles.noData, styles.columnText]}
            >
              {formatTimeToDisplay(
                rowData.time != null
                  ? Number(rowData.time != null ? rowData.time.substring(0, 2) : '') + 7 < 10
                    ? `0${Number(rowData.time != null ? rowData.time.substring(0, 2) : '') + 7}${rowData.time.substring(
                        2
                      )}`
                    : `${Number(rowData.time != null ? rowData.time.substring(0, 2) : '') + 7}${rowData.time.substring(
                        2
                      )}`
                  : undefined,
                'HH:mm:ss',
                'HHmmss'
              )}
            </Text>
          </View>
        ),
      },
      {
        label: ['Price'],
        width: 93,
        element: (key: string, rowData: QuoteData) => (
          <View style={[globalStyles.container2, globalStyles.centered, styles.borderRight]} key={key}>
            <Text
              allowFontScaling={false}
              style={[
                globalStyles.textAlignRight,
                styles.columnText,
                rowData.currentPrice === currentSymbol?.ceilingPrice
                  ? globalStyles.colorCeiling
                  : rowData.currentPrice === currentSymbol?.floorPrice
                  ? globalStyles.colorFloor
                  : getColor(rowData.changePrice, 0, undefined, undefined).textStyle,
              ]}
            >
              {currentSymbol?.symbolType === 'FUTURES'
                ? formatNumber(rowData.currentPrice, 1, undefined, true)
                : formatNumber(rowData.currentPrice / 1000, 2, undefined, true)}
            </Text>
          </View>
        ),
      },
      {
        label: ['Volume'],
        width: 93,
        element: (key: string, rowData: QuoteData) => (
          <View style={[globalStyles.container2, globalStyles.centered, styles.borderRight]} key={key}>
            <Text
              allowFontScaling={false}
              style={[globalStyles.textAlignRight, styles.columnText, globalStyles.noData]}
            >
              {formatNumber(rowData.matchingVolume, 2)}
            </Text>
          </View>
        ),
      },
      {
        label: ['B/S'],
        width: 100,
        element: (key: string, rowData: QuoteData) => (
          <View style={[globalStyles.container2, globalStyles.centered]} key={key}>
            {'matchedBy' in rowData && (
              <Text
                allowFontScaling={false}
                style={[
                  globalStyles.textAlignCenter,
                  styles.columnText,
                  styles.boldText,
                  rowData.matchedBy === 'ASK'
                    ? globalStyles.colorDown
                    : rowData.matchedBy === 'BID'
                    ? globalStyles.colorUp
                    : globalStyles.colorSteady,
                ]}
              >
                {rowData.matchedBy === 'BID' ? t('B') : rowData.matchedBy === 'ASK' ? t('S') : '-'}
              </Text>
            )}
          </View>
        ),
      },
    ],
  };

  const initQuoteList = () => {
    if (currentSymbol == null) return;
    setQuoteListData(initialQuoteListData);
    const params: ISymbolQuoteListParams = {
      symbol: currentSymbol.symbolCode,
      fetchCount: DEFAULT_COUNT,
    };
    dispatch(
      getQuoteList({
        payload: params,
        callBack: {
          handleSuccess(response: QuoteData[]) {
            setQuoteListData({
              status: ReducerStatus.SUCCESS,
              data: response || [],
              lastTradingVolume:
                response[response.length - 1] != null ? response[response.length - 1].tradingVolume : 0,
              loadMoreDataLength: response.length ?? 0,
            });
          },
          handleFail() {
            setQuoteListData({
              ...initialQuoteListData,
              status: ReducerStatus.FAILED,
            });
          },
        },
      })
    );
  };

  const requestLoadMore = () => {
    const params: ISymbolQuoteListParams = {
      symbol: currentSymbol?.symbolCode ?? '',
      fetchCount: DEFAULT_COUNT,
      lastTradingVolume: quoteListData.lastTradingVolume || undefined,
    };
    dispatch(
      getQuoteList({
        payload: params,
        callBack: {
          handleSuccess(response: QuoteData[]) {
            if (response.length === 0) return;
            setQuoteListData(prev => ({
              ...prev,
              data: [...prev.data, ...response],
              lastTradingVolume: response[response.length - 1].tradingVolume,
              loadMoreDataLength: response?.length ?? 0,
            }));
          },
        },
      })
    );
  };

  const RenderNoData = () => (
    <View style={styles.noDataCon}>
      <View style={styles.headerCon}>
        <View style={styles.cellCon}>
          <Text style={styles.cellText}>{t('Time')}</Text>
        </View>
        <View style={styles.cellCon}>
          <Text style={styles.cellText}>{t('Price')}</Text>
        </View>
        <View style={styles.cellCon}>
          <Text style={styles.cellText}>{t('Volume')}</Text>
        </View>
        <View style={styles.cellCon}>
          <Text style={styles.cellText}>{t('B/S')}</Text>
        </View>
      </View>
      <View style={styles.noTransCon}>
        <Text style={styles.noTransText}>{t('No transactions')}</Text>
      </View>
    </View>
  );

  useAppStateChange((appState, nextAppState) => {
    if ((appState === 'inactive' || appState === 'background') && nextAppState === 'active') {
      initQuoteList();
    }
  });

  useEffect(() => {
    if (currentSymbol?.symbolCode !== prevSelectedSymbol.current) {
      initQuoteList();
      prevSelectedSymbol.current = currentSymbol?.symbolCode ?? '';
    }
  }, []);

  useUpdateEffect(() => {
    if (
      currentSymbol &&
      currentSymbolQuote &&
      currentSymbol.tradingVolume != null &&
      currentSymbol.currentPrice != null &&
      currentSymbol.currentPrice > 0 &&
      currentSymbol.matchingVolume != null &&
      currentSymbol.matchingVolume > 0 &&
      (quoteListData.data.length === 0 ||
        (Number(currentSymbol.time) >= Number(quoteListData.data[0].time) &&
          (currentSymbol.market.match(/^(HNX|UPCOM)$/) ||
            currentSymbol.tradingVolume > quoteListData.data[0].tradingVolume)))
    ) {
      const tempQuoteList = [...quoteListData.data];
      tempQuoteList.unshift({ ...currentSymbolQuote });
      setQuoteListData(prev => ({ ...prev, data: tempQuoteList }));
    }
  }, [currentSymbolQuote]);

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={props.navigation.goBack}
        headerTitle={
          <View style={[globalStyles.container, globalStyles.alignCenter]}>
            <Text
              allowFontScaling={false}
              style={[globalStyles.headerTitleText, styles.stockCode]}
            >{`${currentSymbol?.symbolCode}`}</Text>
            <Text allowFontScaling={false} style={styles.stockName} numberOfLines={1}>
              {lang === LANG.VI ? currentSymbol?.vietnameseName : currentSymbol?.englishName}
            </Text>
          </View>
        }
      />
      <SheetData
        config={configGrid}
        data={quoteListData.data}
        iniData={DEFAULT_COUNT}
        onRefreshData={initQuoteList}
        requestLoadMore={
          quoteListData.data.length >= DEFAULT_COUNT && quoteListData.loadMoreDataLength >= DEFAULT_COUNT
            ? requestLoadMore
            : undefined
        }
        containerStyle={globalStyles.container}
        contentContainerStyle={quoteListData.data.length === 0 ? globalStyles.container : undefined}
        ListEmptyComponent={
          quoteListData.status === ReducerStatus.FAILED ? (
            <EmptyListMessage />
          ) : quoteListData.status === ReducerStatus.SUCCESS &&
            quoteListData.data != null &&
            quoteListData.data.length === 0 ? (
            <RenderNoData />
          ) : (
            <></>
          )
        }
        scrollEnabled
      />
    </View>
  );
};

export default memo(TradeQuote);
