import React, { memo, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import globalStyles from 'styles';
import { formatNumber, getColor, formatTimeToDisplay } from 'utils';
import { LoadingReducer, ReducerStatus } from 'interfaces/reducer';
import { ISymbolQuoteListParams } from 'interfaces/market';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { useAppSelector } from 'hooks/useAppSelector';
import { useIsFocused } from '@react-navigation/native';
import { getQuoteList, QuoteData, SymbolDataSelector } from 'reduxs/SymbolData';
import withRenderCondition from 'HOC/withRenderCondition';

type ITradeQuoteListBaseProps = {
  onAfterInit: () => void;
};

const DEFAULT_COUNT = 6;

const initialQuoteListData = {
  status: ReducerStatus.LOADING,
  data: [],
};

const TradeQuoteList = (props: ITradeQuoteListBaseProps) => {
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
    if (!currentSymbol) return;
    if (quoteListData.status === ReducerStatus.FAILED || quoteListData.data.length > 0) {
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
          handleSuccess(data: QuoteData[]) {
            props.onAfterInit();
            setQuoteListData({
              status: ReducerStatus.SUCCESS,
              data: data ?? [],
            });
          },
          handleFail() {
            props.onAfterInit();
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
    if (!currentSymbol) return;
    if (isFocused) {
      initQuoteList();
    }
  }, [isFocused, currentSymbol?.symbolCode]);

  useUpdateEffect(() => {
    if (
      currentSymbolQuote &&
      currentSymbolQuote.currentPrice > 0 &&
      currentSymbolQuote.matchingVolume > 0 &&
      (quoteListData.data.length === 0 ||
        (Number(currentSymbolQuote.time) >= Number(quoteListData.data[0].time) &&
          (currentSymbol?.market.match(/^(HNX|UPCOM)$/) ||
            currentSymbolQuote.tradingVolume > quoteListData.data[0].tradingVolume)))
    ) {
      const tempQuoteList = [...quoteListData.data];
      tempQuoteList.unshift({ ...currentSymbolQuote });

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
      <View style={[styles.noDataCon, styles.container]}>
        <Text style={styles.noDataText}>{t('No transactions')}</Text>
      </View>
    );
  }

  return (
    <>
      {quoteListData.data.map((item, index) => {
        const tempTime = item.time != null ? item.time.substring(0, 2) : '';
        return (
          <View
            key={index}
            style={[
              globalStyles.flexDirectionRow,
              quoteListData.data.length < DEFAULT_COUNT ? styles.quoteItemContainer2 : styles.quoteItemContainer,
              index + 1 === quoteListData.data.length && styles.borderBottom1,
            ]}
          >
            <View style={[styles.timeContainer, globalStyles.centered]}>
              <Text allowFontScaling={false} style={[globalStyles.textAlignLeft, styles.timeText]}>
                {formatTimeToDisplay(
                  item.time != null
                    ? Number(tempTime) + 7 < 10
                      ? `0${Number(tempTime) + 7}${item.time.substring(2)}`
                      : `${Number(tempTime) + 7}${item.time.substring(2)}`
                    : undefined,
                  'HH:mm',
                  'HHmmss'
                )}
              </Text>
            </View>
            <View style={[globalStyles.container, globalStyles.centered, styles.borderLeft1, styles.borderRight1]}>
              <Text
                allowFontScaling={false}
                style={[
                  globalStyles.textAlignRight,
                  styles.priceText,
                  getColor(
                    item.currentPrice,
                    currentSymbol.referencePrice,
                    currentSymbol.ceilingPrice,
                    currentSymbol.floorPrice
                  ).textStyle,
                ]}
              >
                {currentSymbol.symbolType === 'FUTURES'
                  ? formatNumber(item.currentPrice, 2, undefined, true)
                  : formatNumber(item.currentPrice / 1000, 2, undefined, true)}
              </Text>
            </View>
            <View style={[globalStyles.container, globalStyles.centered]}>
              <Text
                allowFontScaling={false}
                style={[globalStyles.textAlignRight, styles.priceText, styles.padding10, globalStyles.fillWidth]}
              >
                {formatNumber(item.matchingVolume, 2)}
              </Text>
            </View>
          </View>
        );
      })}
    </>
  );
};

export default memo(
  withRenderCondition(TradeQuoteList, s => {
    const symbolType = SymbolDataSelector.selectCurrentSymbol(s)?.symbolType;
    return symbolType != null && symbolType !== 'INDEX';
  })
);
