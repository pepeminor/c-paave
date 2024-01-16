import ImagesLogo from 'components/ImagesLogo';
import { RowComponentProps } from 'components/SheetData3';
import { IGetRealizedProfitLossDetailItem } from 'interfaces/equity';
import React, { memo, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import globalStyles from 'styles';
import { formatNumber, getColor, formatDateStringWithTimezone, formatStringToDateString } from 'utils';
import useStyles from '../styles';
import { useTypedSelector } from 'hooks/useAppSelector';
import withInjectedProps from 'HOC/withInjectProps';

interface AdditionalProps {
  goToStockInfoOverView: (data: IGetRealizedProfitLossDetailItem) => void;
  plViewType: boolean;
  // symbolRemoved?: () => string[] | undefined;
}

const RenderRow = memo(
  ({
    data,
    goToStockInfoOverView,
    plViewType,
  }: // symbolRemoved,
  RowComponentProps<IGetRealizedProfitLossDetailItem> & AdditionalProps) => {
    const {
      stockCode,
      date,
      averageBuyingPrice,
      averageSellingPrice,
      sellingQuantity,
      realizedPLValue,
      realizedPLReturn,
      buyingDate,
    } = data;
    const { styles } = useStyles();
    const symbolList = useTypedSelector(state => state.SymbolData.marketData.symbolMap);
    const isFuturesCode = useMemo(() => symbolList[stockCode]?.symbolType === 'FUTURES', [symbolList, stockCode]);
    // get symbol CW removed file symbol list data
    // const isDisableSymbolRemoved = () => {
    //   const symbolRemovedData = symbolRemoved && symbolRemoved();
    //   if (symbolRemovedData == null) return;
    //   return symbolRemovedData.some(item => item.includes(stockCode));
    // };

    return (
      <TouchableOpacity
        style={[globalStyles.borderBottom1, globalStyles.flexDirectionRow]}
        onPress={() => goToStockInfoOverView(data)}
        // disabled={isDisableSymbolRemoved()}
      >
        <View style={[globalStyles.flexDirectionCol, globalStyles.centered, styles.col1]}>
          <Text allowFontScaling={false}>
            {buyingDate && formatDateStringWithTimezone(buyingDate, 'DD/MM/yyyy', 'DD/MM/YY')}
          </Text>
          <Text allowFontScaling={false}>{date && formatStringToDateString(date, 'dd/MM/yy')}</Text>
        </View>
        <View style={[globalStyles.flexDirectionRow, styles.col2, globalStyles.alignCenter]}>
          <ImagesLogo
            codeLogo={stockCode}
            logoSize={36}
            logoStyle={[globalStyles.overflowHidden, styles.logoContainer]}
          />
          <View>
            <Text allowFontScaling={false} style={styles.stockCode}>
              {stockCode}
            </Text>
          </View>
        </View>
        <View style={[globalStyles.flexDirectionCol, styles.col3]}>
          <View
            style={[
              globalStyles.container,
              globalStyles.fillWidth,
              globalStyles.justifyCenter,
              styles.alignItemEnd,
              styles.paddingRight,
            ]}
          >
            <Text allowFontScaling={false} style={styles.quantity}>
              {isFuturesCode ? formatNumber(averageBuyingPrice, 2) : formatNumber(averageBuyingPrice / 1000, 2)}
            </Text>
          </View>
          <View
            style={[
              globalStyles.container,
              globalStyles.fillWidth,
              globalStyles.justifyCenter,
              styles.alignItemEnd,
              styles.paddingRight,
            ]}
          >
            <Text allowFontScaling={false} style={styles.quantity2}>
              {isFuturesCode ? formatNumber(averageSellingPrice, 1) : formatNumber(averageSellingPrice / 1000, 2)}
            </Text>
          </View>
        </View>
        <View style={[globalStyles.flexDirectionCol, styles.col4]}>
          <View
            style={[
              globalStyles.container,
              globalStyles.fillWidth,
              globalStyles.justifyCenter,
              styles.alignItemEnd,
              styles.paddingRight,
            ]}
          >
            <Text allowFontScaling={false} style={styles.quantity}>
              {formatNumber(sellingQuantity, 2)}
            </Text>
          </View>
          <View
            style={[
              globalStyles.container,
              globalStyles.fillWidth,
              globalStyles.justifyCenter,
              styles.alignItemEnd,
              styles.paddingRight,
            ]}
          >
            <View style={[globalStyles.centered, globalStyles.flexDirectionRow, globalStyles.justifyCenter]}>
              {plViewType ? (
                <Text
                  allowFontScaling={false}
                  style={[styles.quantity2, getColor(realizedPLReturn, 0, undefined, undefined, true).textStyle]}
                >
                  {formatNumber(realizedPLReturn, 2)}%
                </Text>
              ) : (
                <Text
                  allowFontScaling={false}
                  style={[styles.quantity, getColor(realizedPLValue, 0, undefined, undefined, true).textStyle]}
                >
                  {formatNumber(realizedPLValue, 2)}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

export default withInjectedProps<RowComponentProps<IGetRealizedProfitLossDetailItem>, AdditionalProps>(RenderRow);
