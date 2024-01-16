import { RowComponentProps } from 'components/SheetData2';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import globalStyles, { lightColors } from 'styles';
import { formatNumber } from 'utils';
import { SELL_BUY_TYPE, ACCOUNT_TYPE, MARKET } from 'global';
import { IOrderStopHistoryResponse } from 'interfaces/equity';
import TrashCanBlue from 'assets/icon/TrashCanBlue.svg';
import Edit from 'assets/icon/EditUserIntro.svg';
import { scaleSize } from 'styles/index';
import { ISpecialPriceType } from 'constants/enum';
import { useTypedSelector } from 'hooks/useAppSelector';
import { getStylesHook } from 'hooks/useStyles';
import withMemo from 'HOC/withMemo';
import { IS_IOS } from 'constants/main';

interface AdditionalProps {
  SellOrder(data: IOrderStopHistoryResponse): () => void;
  accountType: ACCOUNT_TYPE;
  showModalCancel(data: IOrderStopHistoryResponse): () => void;
  showModalModify(data: IOrderStopHistoryResponse): () => void;
}

export default withMemo(
  ({
    data,
    Wrapper,
    SellOrder,
    accountType,
    showModalModify,
    showModalCancel,
  }: RowComponentProps<IOrderStopHistoryResponse> & AdditionalProps) => {
    const { t } = useTranslation();
    const { styles } = useStyles();
    const symbolMap = useTypedSelector(state => state.SymbolData.marketData.symbolMap);

    const isFuturesCode = useMemo(() => {
      return symbolMap[data.stockCode]?.symbolType === 'FUTURES';
    }, [symbolMap, data.stockCode]);

    return (
      <View style={globalStyles.borderBottom1}>
        <Wrapper>
          <View style={styles.col1Orderbook}>
            <View style={styles.containerButton}>
              <TouchableOpacity
                style={data.sellBuyType === SELL_BUY_TYPE.BUY ? styles.btnBuyOrderbook : styles.btnSellOrderbook}
                onPress={SellOrder(data)}
              >
                <Text style={styles.textSellBuySymbol}>{data.sellBuyType === SELL_BUY_TYPE.BUY ? t('B') : t('S')}</Text>
              </TouchableOpacity>
              <Text
                allowFontScaling={false}
                style={data.stockCode.length > 5 ? styles.stockCodeTxtSmall : styles.stockCodeTxt}
              >
                {data.stockCode}
              </Text>
            </View>
            <View style={globalStyles.centered}>
              <Text style={styles.symbolStatusText}>{t(data.status)}</Text>
            </View>
          </View>
          <View style={styles.col2Orderbook}>
            <View style={styles.containerText}>
              <Text allowFontScaling={false} style={styles.quantity}>
                {formatNumber(data.orderQuantity, 2)}
              </Text>
            </View>
          </View>
          <View style={styles.col3Orderbook}>
            <View style={styles.containerText}>
              <Text allowFontScaling={false} style={styles.quantity}>
                {isFuturesCode
                  ? formatNumber(data.stopPrice, 1, undefined, true)
                  : formatNumber(data.stopPrice / 1000, 2, undefined, true)}
              </Text>
            </View>
            <View style={styles.containerText}>
              <Text allowFontScaling={false} style={styles.quantity}>
                {accountType === ACCOUNT_TYPE.KIS
                  ? data.orderPrice
                    ? isFuturesCode
                      ? formatNumber(data.orderPrice, 1, undefined, true)
                      : formatNumber(data.orderPrice / 1000, 2, undefined, true)
                    : symbolMap && symbolMap[data.stockCode]
                    ? symbolMap[data.stockCode].market === MARKET.HOSE
                      ? ISpecialPriceType.MP
                      : ISpecialPriceType.MTL
                    : '_'
                  : '_'}
              </Text>
            </View>
          </View>
          <View style={styles.containerText}>
            <TouchableOpacity onPress={showModalModify(data)} disabled={!data.modifiable}>
              <Edit height={scaleSize(24)} width={scaleSize(24)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={showModalCancel(data)} disabled={!data.cancellable}>
              <TrashCanBlue height={scaleSize(24)} width={scaleSize(24)} />
            </TouchableOpacity>
          </View>
        </Wrapper>
      </View>
    );
  }
);

const useStyles = getStylesHook({
  col1Orderbook: {
    width: 111,
    height: 56,
    paddingVertical: 7.5,
    borderRightColor: lightColors.BORDER,
    borderRightWidth: 1,
    borderLeftColor: lightColors.BORDER,
    borderLeftWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnBuyOrderbook: {
    width: 24,
    height: 24,
    backgroundColor: lightColors.DARK_GREEN,
    marginLeft: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  btnSellOrderbook: {
    width: 24,
    height: 24,
    backgroundColor: lightColors.LIGHTRed,
    marginLeft: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  textSellBuySymbol: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 18,
    color: lightColors.WHITE,
    textAlign: 'center',
  },
  stockCodeTxtSmall: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextContent,
    fontSize: 11,
    marginLeft: 5,
    justifyContent: 'center',
    paddingTop: 2,
  },
  stockCodeTxt: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextContent,
    fontSize: 14,
    textAlign: 'center',
    width: 40,
    justifyContent: 'center',
    paddingTop: 2,
  },
  symbolStatusText: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    color: lightColors.LIGHTTextContent,
  },
  col2Orderbook: {
    width: 86,
    height: 56,
    paddingVertical: 7.5,
    borderRightColor: lightColors.BORDER,
    borderRightWidth: 1,
    justifyContent: 'center',
  },
  containerText: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 6,
  },
  quantity: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: IS_IOS ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextContent,
  },
  col3Orderbook: {
    width: 86,
    height: 56,
    paddingVertical: 7.5,
    borderRightColor: lightColors.BORDER,
    borderRightWidth: 1,
    justifyContent: 'center',
  },
});
