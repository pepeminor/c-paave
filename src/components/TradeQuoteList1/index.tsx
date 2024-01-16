import React, { memo, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import globalStyles from 'styles';
import { formatNumber, getColor, getColorBidAsk, formatTimeToDisplay } from 'utils';
import { LoadingReducer, ReducerStatus } from 'interfaces/reducer';
import { BID_ASK_TYPE, ISymbolQuoteListParams } from 'interfaces/market';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/useAppSelector';
import { useIsFocused } from '@react-navigation/native';
import { getQuoteList, QuoteData, SymbolDataSelector, SymbolTypeChecker } from 'reduxs/SymbolData';
import { SymbolType } from 'constants/enum';
const DEFAULT_COUNT = 10;

const initialQuoteListData = {
  status: ReducerStatus.LOADING,
  data: [],
};

const TradeQuoteList1 = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const currentSymbol = useAppSelector(SymbolDataSelector.selectCurrentSymbol, {
    symbolCode: true,
    symbolType: true,
    market: true,
    referencePrice: true,
    ceilingPrice: true,
    floorPrice: true,
  });
  const currentSymbolQuote = useAppSelector(SymbolDataSelector.selectCurrentQuote);
  const [quoteListData, setQuoteListData] = useState<LoadingReducer<QuoteData[]>>(initialQuoteListData);

  const initQuoteList = () => {
    if (currentSymbol == null) return;
    if (quoteListData.status === 'FAILED' || quoteListData.data.length > 0) {
      setQuoteListData(initialQuoteListData);
    }
    const params: ISymbolQuoteListParams = {
      symbol: currentSymbol.symbolCode,
      fetchCount: DEFAULT_COUNT,
    };
    dispatch(
      getQuoteList({
        payload: params,
        callBack: {
          handleSuccess(response?: QuoteData[]) {
            setQuoteListData({
              status: 'SUCCESS',
              data: response ?? [],
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

  useEffect(() => {
    if (isFocused) initQuoteList();
  }, [isFocused]);

  useEffect(() => {
    const didUpdate =
      currentSymbolQuote &&
      currentSymbolQuote.currentPrice > 0 &&
      currentSymbolQuote.matchingVolume > 0 &&
      (quoteListData.data.length === 0 ||
        (Number(currentSymbolQuote.time) >= Number(quoteListData.data[0].time) &&
          currentSymbolQuote.tradingVolume > quoteListData.data[0].tradingVolume));

    if (didUpdate) {
      const tempQuoteList = [...quoteListData.data];
      tempQuoteList.unshift(currentSymbolQuote);

      if (tempQuoteList.length >= DEFAULT_COUNT) {
        tempQuoteList.pop();
      }

      setQuoteListData(prev => ({ ...prev, data: tempQuoteList }));
    }
  }, [currentSymbolQuote]);

  if (currentSymbol == null) return null;

  if (quoteListData.status !== ReducerStatus.SUCCESS) {
    return null;
  }

  if (quoteListData.data.length <= 0) {
    return (
      <View style={styles.containerNoData}>
        <Text style={styles.noDataText}>{t('No transactions')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {quoteListData.data.map((item, index) => {
        const tempTime = item.time != null ? item.time.substring(0, 2) : '';
        const mvQuantity = formatNumber(item.matchingVolume, 2);

        const isFuturesRatio = currentSymbol.symbolType === SymbolType.FUTURES ? 1 : 1000;
        let time = formatTimeToDisplay(undefined, 'HH:mm:ss', 'HHmmss');
        const currentPrice = formatNumber(item.currentPrice / isFuturesRatio, 2, undefined, true);
        let currentPriceColor = getColor(item.currentPrice, undefined, undefined, undefined).textStyle;
        let buySell = t('UNKNOW_QUOTE');
        let buySellColor = globalStyles.noData;

        if (item.time != null) {
          let timeStr = `${Number(tempTime) + 7}${item.time.substring(2)}`;
          if (Number(tempTime) + 7 < 10) {
            timeStr = '0' + timeStr;
          }
          time = formatTimeToDisplay(timeStr, 'HH:mm:ss', 'HHmmss');
        }

        if (currentSymbol != null) {
          currentPriceColor = getColor(
            item.currentPrice,
            currentSymbol.referencePrice,
            currentSymbol.ceilingPrice,
            currentSymbol.floorPrice
          ).textStyle;
        }

        if (
          !SymbolTypeChecker.isIndexQuote(item) &&
          item.matchedBy?.match([BID_ASK_TYPE.BID, BID_ASK_TYPE.ASK].join('|')) != null
        ) {
          buySell = t(item.matchedBy + '_QUOTE');
          buySellColor = getColorBidAsk(item.matchedBy, undefined, undefined).textStyle;
          if (item.matchedBy === BID_ASK_TYPE.BID) {
            buySellColor = getColorBidAsk(item.matchedBy, BID_ASK_TYPE.BID, undefined).textStyle;
          }
          if (item.matchedBy === BID_ASK_TYPE.ASK) {
            buySellColor = getColorBidAsk(item.matchedBy, undefined, BID_ASK_TYPE.ASK).textStyle;
          }
        }

        return (
          <View key={index} style={styles.quoteItemContainer}>
            <View style={styles.timeContainer}>
              <Text allowFontScaling={false} style={styles.timeText}>
                {time}
              </Text>
            </View>

            <View style={styles.currentPriceContainer}>
              <Text
                allowFontScaling={false}
                style={[styles.currentPrice, currentPriceColor]}
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                {currentPrice}
              </Text>
            </View>

            <View style={styles.mvContainer}>
              <Text allowFontScaling={false} numberOfLines={1} style={styles.mvQuantity}>
                {mvQuantity}
              </Text>
            </View>

            <View style={styles.mbContainer}>
              <Text allowFontScaling={false} style={[styles.buySell, buySellColor]}>
                {buySell}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default memo(TradeQuoteList1);
