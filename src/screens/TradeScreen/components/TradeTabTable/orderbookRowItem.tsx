import { RowComponentProps } from 'components/SheetData2';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import globalStyles, { lightColors } from 'styles';
import { formatNumber, insertObjectIf } from 'utils';
import { SELL_BUY_TYPE } from '../../../../global/index';
import { IEqtOrderHistoryMappingResponse } from '../../../../interfaces/services';
import TrashCanBlue from 'assets/icon/TrashCanBlue.svg';
import Edit from 'assets/icon/EditUserIntro.svg';
import { scaleSize } from '../../../../styles/index';
import { SymbolType } from 'constants/enum';
import { useTypedSelector } from 'hooks/useAppSelector';
import { getStylesHook } from 'hooks/useStyles';
import { IS_IOS } from 'constants/main';
import withMemo from 'HOC/withMemo';

interface AdditionalProps {
  SellOrder(data: IEqtOrderHistoryMappingResponse): () => void;
  showModalModify(data: IEqtOrderHistoryMappingResponse): () => void;
  showModalCancel(data: IEqtOrderHistoryMappingResponse): () => void;
}

export default withMemo(
  ({
    data,
    Wrapper,
    SellOrder,
    showModalModify,
    showModalCancel,
  }: AdditionalProps & RowComponentProps<IEqtOrderHistoryMappingResponse>) => {
    const { t } = useTranslation();
    const { styles } = useStyles();
    const symbolList = useTypedSelector(state => state.SymbolData.marketData.symbolMap);
    const isFuturesCode = symbolList?.[data.stockCode]?.symbolType === SymbolType.FUTURES;

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
              <Text style={styles.symbolStatusText}>{t(data.orderStatus)}</Text>
            </View>
          </View>
          <View style={styles.col2Orderbook}>
            <View style={styles.containerText}>
              <Text allowFontScaling={false} style={styles.quantity}>
                {formatNumber(data.orderQuantity, 2)}
              </Text>
            </View>
            <View style={styles.containerText}>
              <Text allowFontScaling={false} style={styles.quantity}>
                {formatNumber(data.matchedQuantity, 2)}
              </Text>
            </View>
          </View>
          <View style={styles.col3Orderbook}>
            <View style={styles.containerText}>
              <Text allowFontScaling={false} style={styles.quantity}>
                {data.orderType.match(/^(LO|ODDLOT)$/)
                  ? isFuturesCode
                    ? formatNumber(data.orderPrice, 1, undefined, true)
                    : formatNumber(data.orderPrice / 1000, 2, undefined, true)
                  : data.orderType}
              </Text>
            </View>
            <View style={styles.containerText}>
              <Text allowFontScaling={false} style={styles.quantity}>
                {isFuturesCode
                  ? formatNumber(data.matchedPrice, 1, undefined, true)
                  : formatNumber(data.matchedPrice / 1000, 2, undefined, true)}
              </Text>
            </View>
          </View>
          <View style={[styles.col4Orderbook, insertObjectIf(!data.modifiable, styles.btnDisable)]}>
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
  col4Orderbook: {
    width: 90,
    height: 56,
    paddingVertical: 7.5,
    // marginHorizontal: (8),
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnDisable: {
    opacity: 0.5,
  },
});
