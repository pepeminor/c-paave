import RowItem from 'components/RowItem';
import { RealtimeChannelDataType } from 'constants/enum';
// import { RealtimeChannelDataType } from 'constants/enum';
import { ACCOUNT_TYPE, MARKET, OrderBookScreenInitOption, SELL_BUY_TYPE, SYSTEM_TYPE } from 'global';
import { useAppSelector } from 'hooks/useAppSelector';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import { IOrderStopHistoryResponse } from 'interfaces/equity';
import { IAccountBuyableParams, IAccountSellableParams } from 'interfaces/market';
import { IEqtOrderHistoryMappingResponse } from 'interfaces/services';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  kisGetEqtAssetInfoOrderBook,
  kisGetEqtStockInfoOrderBook,
  queryEquityBuyableOrderBook,
  queryEquitySellableOrderBook,
} from 'reduxs/global-actions';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import globalStyles from 'styles';
import { formatNumber, getColor } from 'utils';
import { ModalContentProps } from '..';
import useStyles from '../styles';
import ModalModifyForm from './Form';
import { kisGetDerEnquiryMaxLongShort } from 'reduxs/global-actions/KisServicesDer';

const ModalModify = ({ symbol }: ModalContentProps) => {
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const type = useAppSelector(state => state.orderBookScreenOption);
  const symbolData = useAppSelector(SymbolDataSelector.selectSymbol((symbol as IOrderStopHistoryResponse).stockCode), {
    market: true,
    symbolCode: true,
    currentPrice: true,
    referencePrice: true,
    ceilingPrice: true,
    floorPrice: true,
  });
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const [avlQty, setAvlQty] = useState(0);
  const optionSelecting = useAppSelector(state => state.orderBookScreenOption);
  const currentMarketPrice =
    symbolData != null
      ? symbolData.symbolType === 'FUTURES'
        ? formatNumber(symbolData.currentPrice || symbolData.referencePrice, 1, undefined, true)
        : formatNumber((symbolData.currentPrice || symbolData.referencePrice) / 1000, 2, undefined, true)
      : '-';
  useSubscribeSymbol([symbol.stockCode], [RealtimeChannelDataType.QUOTE]);

  const queryEquityAvailableQuantity = () => {
    if (selectedAccount.type === ACCOUNT_TYPE.KIS) {
      if (
        selectedAccount.selectedSubAccount != null &&
        selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY &&
        selectedAccount.username != null &&
        symbolData != null &&
        symbol.orderPrice
      ) {
        dispatch(
          kisGetEqtStockInfoOrderBook({
            accountNumber: selectedAccount.selectedSubAccount.accountNumber,
            symbolCode: (symbol as IOrderStopHistoryResponse).stockCode,
            market: symbolData.market,
            sellBuyType: symbol.sellBuyType,
            clientID: selectedAccount.username,
            genBuyAllParams: {
              clientID: selectedAccount.username,
              symbolCode: symbolData.symbolCode,
              market: symbolData.market,
              price: symbol.orderPrice,
            },
          })
        );

        selectedAccount.selectedSubAccount.accountNumber.toUpperCase().includes('X') &&
          dispatch(
            kisGetEqtAssetInfoOrderBook({
              accountNumber: selectedAccount.selectedSubAccount.accountNumber,
              clientID: selectedAccount.username,
              sellBuyType: symbol.sellBuyType,
              genBuyAllParams: {
                clientID: selectedAccount.username,
                symbolCode: symbolData.symbolCode,
                market: symbolData.market,
                price: symbol.orderPrice,
              },
            })
          );
      } else if (
        selectedAccount.selectedSubAccount != null &&
        selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES &&
        symbolData != null &&
        symbol.orderPrice != null
      ) {
        dispatch(
          kisGetDerEnquiryMaxLongShort({
            accountNumber: selectedAccount.selectedSubAccount.accountNumber,
            price: symbol.orderPrice,
            sellBuyType: symbol.sellBuyType,
            symbolCode: symbolData.symbolCode,
          })
        );
      }
    } else {
      if (symbol.sellBuyType === SELL_BUY_TYPE.BUY) {
        const params: IAccountBuyableParams = {
          stockCode: (symbol as IOrderStopHistoryResponse).stockCode,
          marketType:
            (symbol as IEqtOrderHistoryMappingResponse).marketType != null
              ? (symbol as IEqtOrderHistoryMappingResponse).marketType
              : MARKET.HNX,
          orderPrice: 1, // buying power không phụ thuộc vào price đang nhập
        };
        dispatch(queryEquityBuyableOrderBook(params));
      } else {
        const params: IAccountSellableParams = {
          stockCode: (symbol as IOrderStopHistoryResponse).stockCode,
        };
        dispatch(queryEquitySellableOrderBook(params));
      }
    }
  };

  useEffect(() => {
    type === OrderBookScreenInitOption.ORDER_BOOK && queryEquityAvailableQuantity();
  }, []);

  return (
    <>
      <RowItem
        title={'Market Price'}
        value={currentMarketPrice}
        valueStyle={
          symbolData
            ? getColor(
                symbolData.currentPrice,
                symbolData.currentPrice === 0 ? 0 : symbolData.referencePrice,
                symbolData.ceilingPrice,
                symbolData.floorPrice,
                false
              ).textStyle
            : undefined
        }
      />

      {optionSelecting !== OrderBookScreenInitOption.CONDITION_ORDER && (
        <RowItem
          title={
            selectedAccount.type === ACCOUNT_TYPE.KIS &&
            selectedAccount.selectedSubAccount != null &&
            selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
              ? symbol.sellBuyType === SELL_BUY_TYPE.BUY
                ? 'Max Buy'
                : 'Max Sell'
              : 'Available Quantity'
          }
          value={avlQty != null ? formatNumber(avlQty, 2) : '-'}
          containerStyle={[globalStyles.flexDirectionRow, globalStyles.justifySpaceBetween, styles.formInfo]}
          titleStyle={styles.title}
          valueStyle={styles.formInfoValue}
        />
      )}

      {symbolData != null && (
        <ModalModifyForm
          symbol={symbol as IOrderStopHistoryResponse}
          currentMarketPrice={symbolData}
          setAvlQty={setAvlQty}
        />
      )}
    </>
  );
};

export default memo(ModalModify);
