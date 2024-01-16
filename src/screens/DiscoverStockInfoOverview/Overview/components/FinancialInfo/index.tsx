import React, { memo, useState } from 'react';
import { TouchableOpacity, View, LayoutAnimation } from 'react-native';
import useStyles from './styles';
// Icon
import globalStyles, { scaleSize } from 'styles';
import { useTranslation } from 'react-i18next';
import Row, { IRowBaseProps } from './Row';
import { RealtimeChannelDataType, SymbolType } from 'constants/enum';
import { formatNumber, formatDateToString, formatStringToDate } from 'utils';
import { useAppSelector } from 'hooks';
import ArrowDownDouble from 'assets/icon/ArrowDownDouble.svg';
import ArrowUpDouble from 'assets/icon/ArrowUpDouble.svg';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import { SymbolDataSelector } from 'reduxs/SymbolData';

const formatValue = (value: string | number | undefined) => {
  if (value == null || value === '') return '-';
  if (typeof value === 'string') return value;
  return formatNumber(value);
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '-';
  const result: Date = formatStringToDate(dateString, 'yyyyMMdd');
  return formatDateToString(result, 'dd/MM/yyyy') ?? '-';
};

type Props = {
  symbolCode: string;
};

/**
 * Stock Info and Financial Info
 */
export const FinancialInfo = memo(({ symbolCode }: Props) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const currentSymbol = useAppSelector(SymbolDataSelector.selectSymbol(symbolCode), {
    underlyingCode: true,
    symbolType: true,
    symbolCode: true,
    highPrice: true,
    lowPrice: true,
    highLowYear: true,
    breakEven: true,
    exercisePrice: true,
    exerciseRatio: true,
    tradingValue: true,
    tradingVolume: true,
    issuerName: true,
    lastTradingDate: true,
    maturityDate: true,
    indexChange: true,
  });

  const symbolVN30 = useAppSelector(SymbolDataSelector.selectSymbol('VN30'), {
    currentPrice: true,
  });

  const financialRatio = useAppSelector(state => state.getFinancialRatioData);
  const underlyingPrice = useAppSelector(state => {
    const data = SymbolDataSelector.selectSymbol(currentSymbol?.underlyingCode ?? '')(state);
    if (data?.currentPrice == null) return '-';
    if (data?.symbolType === 'FUTURES') return formatNumber(data.currentPrice, 1, undefined, true);
    return formatNumber(data.currentPrice / 1000, 2, undefined, true);
  });
  const [isExpand, setIsExpand] = useState(false);

  const isCwSymbol = currentSymbol?.symbolType === SymbolType.CW;
  const isFuturesCode = currentSymbol?.symbolType === SymbolType.FUTURES;
  const isIndex = currentSymbol?.symbolType === SymbolType.INDEX;

  useSubscribeSymbol(
    [currentSymbol?.underlyingCode, isFuturesCode ? 'VN30' : undefined],
    [RealtimeChannelDataType.QUOTE]
  );

  if (!currentSymbol) return null;

  const ROW_HIGHT_LOW = {
    firstItem: {
      label: `High`,
      value:
        currentSymbol.highPrice != null
          ? isFuturesCode || isIndex
            ? formatNumber(currentSymbol.highPrice, 1, undefined, true)
            : formatNumber(currentSymbol.highPrice / 1000, 2, undefined, true)
          : '-',
    },
    secondItem: {
      label: `Low`,
      value:
        currentSymbol.lowPrice != null
          ? isFuturesCode || isIndex
            ? formatNumber(currentSymbol.lowPrice, 1, undefined, true)
            : formatNumber(currentSymbol.lowPrice / 1000, 2, undefined, true)
          : '-',
    },
    thirdItem: {
      label: '52W High',
      value:
        currentSymbol.highLowYear?.[0].highPrice != null
          ? isFuturesCode || isIndex
            ? formatNumber(currentSymbol.highLowYear?.[0].highPrice, 1, undefined, true)
            : formatNumber(currentSymbol.highLowYear?.[0].highPrice / 1000, 2, undefined, true)
          : '-',
    },
    fourthItem: {
      label: '52W Low',
      value:
        currentSymbol.highLowYear?.[0].lowPrice != null
          ? isFuturesCode || isIndex
            ? formatNumber(currentSymbol.highLowYear?.[0].lowPrice, 1, undefined, true)
            : formatNumber(currentSymbol.highLowYear?.[0].lowPrice / 1000, 2, undefined, true)
          : '-',
    },
    hide: isCwSymbol,
  };

  const ROW_VOLUME = {
    firstItem: { label: 'Trading Vol', value: formatValue(currentSymbol.tradingVolume) },
    secondItem: {
      label: 'Trading Val',
      value: `${formatNumber((currentSymbol.tradingValue ?? 0) / 1000000000, 2)} ${t('Bil')}`,
    },
    thirdItem: isFuturesCode
      ? {
          label: 'Deviation',
          value:
            currentSymbol.currentPrice && symbolVN30?.currentPrice != null
              ? `${formatNumber(currentSymbol.currentPrice - symbolVN30?.currentPrice, 2)}`
              : '-',
        }
      : {
          label: 'Market Cap.',
          value:
            financialRatio.data?.marketCap?.valueRatio != null
              ? `${formatNumber(financialRatio.data.marketCap.valueRatio / 1000000000, 2)} ${t('Bil')}`
              : '-',
        },
    hide: isCwSymbol,
  };

  const rowConfigLess: IRowBaseProps[] = [
    ROW_HIGHT_LOW,
    {
      firstItem: {
        label: 'Break Even',
        value: currentSymbol.breakEven != null ? formatNumber(currentSymbol.breakEven / 1000, 2, undefined, true) : '-',
      },
      secondItem: {
        label: 'Exercise Price',
        value:
          currentSymbol.exercisePrice != null
            ? formatNumber(currentSymbol.exercisePrice / 1000, 2, undefined, true)
            : '-',
      },
      thirdItem: {
        label: 'CVN Ratio',
        value: formatValue(currentSymbol.exerciseRatio),
      },
      hide: !isCwSymbol,
    },
    {
      firstItem: {
        label: 'Advances',
        labelStyles: globalStyles.textAlignCenter,
        dataStyles: [styles.indexValueText, globalStyles.colorUp],
        value: currentSymbol.indexChange?.upCount != null ? currentSymbol.indexChange.upCount : '-',
      },
      secondItem: {
        label: 'Declines',
        labelStyles: globalStyles.textAlignCenter,
        dataStyles: [styles.indexValueText, globalStyles.colorDown],
        value: currentSymbol.indexChange?.downCount != null ? currentSymbol.indexChange.downCount : '-',
      },
      thirdItem: {
        label: 'Unchanged',
        labelStyles: globalStyles.textAlignCenter,
        dataStyles: [styles.indexValueText, globalStyles.colorSteady],
        value: currentSymbol.indexChange?.unChangeCount != null ? currentSymbol.indexChange.unChangeCount : '-',
      },
      hide:
        !isIndex ||
        currentSymbol.indexChange?.upCount == null ||
        currentSymbol.indexChange?.downCount == null ||
        currentSymbol.indexChange?.unChangeCount == null,
    },
  ];

  const rowConfigExpand: IRowBaseProps[] = [
    {
      firstItem: {
        label: 'ROE',
        value:
          financialRatio.data?.returnOnEquity?.valueRatio != null
            ? `${formatNumber(financialRatio.data.returnOnEquity.valueRatio, 2, undefined, true)}%`
            : '-',
      },
      secondItem: {
        label: `EPS`,
        value:
          financialRatio != null && financialRatio.data != null
            ? formatNumber(financialRatio.data.earningsPerShare?.valueRatio)
            : '-',
      },
      thirdItem: {
        label: 'PER',
        value: formatNumber(financialRatio.data?.priceToEarningsRatio?.valueRatio, 2, undefined, true),
      },
      fourthItem: {
        label: 'PBR',
        value: formatNumber(financialRatio.data?.priceToBookRatio?.valueRatio, 2, undefined, true),
      },
      hide: isCwSymbol,
    },
    ROW_VOLUME,
    {
      firstItem: {
        label: 'For. Room',
        value:
          currentSymbol.foreignData?.totalRoom != null
            ? `${formatNumber(currentSymbol.foreignData.totalRoom / 1000000, 2, undefined, true)} ${t('Mil')}`
            : '-',
      },
      secondItem: {
        label: 'For. Remaining',
        value:
          currentSymbol.foreignData?.currentRoom != null && currentSymbol.foreignData?.totalRoom != null
            ? `${formatNumber(currentSymbol.foreignData.currentRoom / 1000000, 2, undefined, true)} ${t('Mil')}  (${
                currentSymbol.foreignData.totalRoom > 0
                  ? formatNumber(
                      (currentSymbol.foreignData.currentRoom / currentSymbol.foreignData.totalRoom) * 100,
                      2,
                      undefined,
                      true
                    )
                  : '-'
              }%)`
            : '-',
      },
    },
    {
      firstItem: {
        label: 'Issuers',
        value: formatValue(currentSymbol.issuerName),
      },
      secondItem: {
        label: 'Underlying Stock',
        value: formatValue(currentSymbol.underlyingCode),
      },
      thirdItem: {
        label: 'Underlying Price',
        value: underlyingPrice,
      },

      hide: !isCwSymbol,
    },

    {
      firstItem: {
        label: 'Last Trading Date',
        value: formatDate(currentSymbol.lastTradingDate),
      },
      secondItem: {
        label: 'Expiry Date',
        value: formatDate(currentSymbol.maturityDate),
      },
      hide: !isCwSymbol,
    },
  ];

  const rowConfigFutures: IRowBaseProps[] = [ROW_HIGHT_LOW, ROW_VOLUME];

  const expandData = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpand(pre => !pre);
  };

  const rowConfigNormal = isExpand ? rowConfigLess.concat(rowConfigExpand) : rowConfigLess;
  const rowConfig = isFuturesCode ? rowConfigFutures : rowConfigNormal;

  return (
    <>
      <View style={styles.infoContainer}>
        <View style={globalStyles.container}>
          {rowConfig.map((item, index) => (
            <Row key={index} {...item} />
          ))}
        </View>
      </View>

      {!isIndex && !isFuturesCode && (
        <TouchableOpacity style={[globalStyles.alignCenter, globalStyles.container]} onPress={expandData}>
          {!isExpand ? (
            <ArrowDownDouble width={scaleSize(20)} height={scaleSize(24)} />
          ) : (
            <ArrowUpDouble width={scaleSize(20)} height={scaleSize(24)} />
          )}
        </TouchableOpacity>
      )}
    </>
  );
});
