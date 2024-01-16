import React, { memo, useMemo, useCallback, useEffect } from 'react';
import RowWrapper from 'components/SheetData2/components/RowWrapper';
import { useScrollHorizontal } from 'components/SheetData2';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from 'reduxs/global-reducers/index';
import { lightColors, width } from 'styles';
import OrderbookItemRow from './orderbookRowItem';
import OrderbookConditionItemRow from './orderbookConditionRowItem';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { IEqtOrderHistoryMappingResponse } from 'interfaces/services';
import { ACCOUNT_TYPE, ITradeTabOption, SELL_BUY_TYPE, SYSTEM_TYPE } from 'global/index';
import { kisGetEqtEnquiryOrder } from 'reduxs/global-actions/KisServicesEqt';
import { getActiveOrder } from 'reduxs/global-actions';
import { getOrderStopHistory } from 'reduxs/global-actions/Equity';
import { IOrderStopHistoryResponse } from 'interfaces/equity';
import { setSellBuyType } from 'reduxs/global-actions/Market';
import { navigate, isSymbolExist } from 'utils';
import { subscribeOrderMatch, unSubscribeOrderMatch, setOrderBookSymbol } from 'reduxs/global-actions/OrderBook';
import NetInfo from '@react-native-community/netinfo';
import { showModalDisconnectNetwork } from 'reduxs/global-actions/ShowModalDisconnectNetwork';
import { ModalType } from '../../../OrderBook/components/OrderBookModal/index';
import { useIsFocused } from '@react-navigation/core';
import { ReducerStatus } from 'interfaces/reducer';
import { setCurrentSymbol } from 'reduxs/SymbolData';
import { kisGetDerEnquiryOrder } from 'reduxs/global-actions/KisServicesDer';
import { getStylesHook } from 'hooks/useStyles';

type IOrderbookTableProps = {
  triggerReload: boolean;
};

const OrderbookTable = (props: IOrderbookTableProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const { scrollStyle, frozenStyle } = useScrollHorizontal(width);
  const isFocused = useIsFocused();

  const tradeTabOption = useSelector((state: IState) => state.tradeTabOption);
  const activeOrderStore = useSelector((state: IState) => state.ActiveOrder);
  const conditionOrderFilter = useSelector((state: IState) => state.orderBookFilter.conditionOrderFilter);
  const orderStopHistoryStore = useSelector((state: IState) => state.OrderStopHistory);
  const kisEquityEnquiryOrder = useSelector((state: IState) => state.kisEquityEnquiryOrder);
  const kisDerEnquiryOrder = useSelector((state: IState) => state.kisDerEnquiryOrder);
  const accountType = useSelector((state: IState) => state.selectedAccount.type);
  const selectedSubAccount = useSelector((state: IState) => state.selectedAccount.selectedSubAccount);
  const modifyOrderBookSuccessTrigger = useSelector((state: IState) => state.modifyOrderBookSuccessTrigger);
  const cancelOrderBookSuccessTrigger = useSelector((state: IState) => state.cancelOrderBookSuccessTrigger);

  const currentStorage = useMemo(() => {
    switch (accountType) {
      case ACCOUNT_TYPE.KIS:
        if (
          selectedSubAccount == null ||
          selectedSubAccount.accountSubs[0] == null ||
          selectedSubAccount.accountSubs[0].type !== SYSTEM_TYPE.DERIVATIVES
        ) {
          return kisEquityEnquiryOrder;
        } else {
          return kisDerEnquiryOrder;
        }
      case ACCOUNT_TYPE.VIRTUAL:
        return activeOrderStore;
      default:
        return kisEquityEnquiryOrder;
    }
  }, [accountType, activeOrderStore.data, kisEquityEnquiryOrder.data, selectedSubAccount, kisDerEnquiryOrder.data]);

  const currentFilterConditionStorage = useMemo(
    () => orderStopHistoryStore.data ?? undefined,
    [orderStopHistoryStore.data]
  );

  const getData = useMemo(() => {
    switch (tradeTabOption) {
      case ITradeTabOption.ORDER_BOOK:
        return accountType === ACCOUNT_TYPE.KIS
          ? selectedSubAccount == null ||
            selectedSubAccount.accountSubs[0] == null ||
            selectedSubAccount.accountSubs[0].type !== SYSTEM_TYPE.DERIVATIVES
            ? kisGetEqtEnquiryOrder
            : kisGetDerEnquiryOrder
          : getActiveOrder;
      case ITradeTabOption.CONDITION_ORDER:
        return getOrderStopHistory;
      default:
        return accountType === ACCOUNT_TYPE.KIS ? kisGetEqtEnquiryOrder : getActiveOrder;
    }
  }, [tradeTabOption, accountType, selectedSubAccount]);

  const showModalCancel = useCallback(
    (item: IEqtOrderHistoryMappingResponse | IOrderStopHistoryResponse) => () => {
      NetInfo.fetch().then(netState => {
        if (netState.isConnected) {
          dispatch(setOrderBookSymbol({ symbol: item, type: ModalType.CANCEL }));
        } else {
          dispatch(showModalDisconnectNetwork(true));
        }
      });
    },
    []
  );

  const showModalModify = useCallback(
    (item: IEqtOrderHistoryMappingResponse | IOrderStopHistoryResponse) => () => {
      NetInfo.fetch().then(netState => {
        if (netState.isConnected) {
          dispatch(setOrderBookSymbol({ symbol: item, type: ModalType.MODIFY }));
        } else {
          dispatch(showModalDisconnectNetwork(true));
        }
      });
    },
    []
  );

  const Wrapper = useCallback(RowWrapper({ scrollStyle, frozenStyle }), []);

  const SellOrder = useCallback(
    (item: IEqtOrderHistoryMappingResponse | IOrderStopHistoryResponse) => () => {
      if (!isSymbolExist(item.stockCode)) return;
      dispatch(setCurrentSymbol(item.stockCode));
      dispatch(setSellBuyType(item.sellBuyType as SELL_BUY_TYPE));
      navigate({
        key: 'Trade',
      });
    },
    []
  );

  useEffect(() => {
    if (!isFocused || accountType === ACCOUNT_TYPE.DEMO) return;
    dispatch(getData(null));
  }, [
    isFocused,
    selectedSubAccount,
    getData,
    props.triggerReload,
    conditionOrderFilter,
    modifyOrderBookSuccessTrigger,
    cancelOrderBookSuccessTrigger,
  ]);

  useEffect(() => {
    dispatch(subscribeOrderMatch(kisEquityEnquiryOrder.data));
    dispatch(subscribeOrderMatch(kisDerEnquiryOrder.data));
    return () => {
      dispatch(unSubscribeOrderMatch({}));
      dispatch(unSubscribeOrderMatch({}));
    };
  }, []);

  const orderbookItemMemo = () => {
    const isSuccess = currentStorage.status === ReducerStatus.SUCCESS;
    const isNotNullData = currentStorage.data != null;
    const isNoData = isNotNullData && currentStorage.data.length === 0;
    const isExistedData = isNotNullData && currentStorage.data.length >= 1;

    if (isSuccess && isNoData) {
      return (
        <View style={styles.noDataCon}>
          <EmptySymbol />
          <Text style={styles.noDataText}>{t('There is no data')}</Text>
        </View>
      );
    }

    if (isSuccess && isExistedData) {
      return (
        <View>
          {currentStorage.data.map((item, index) => (
            <OrderbookItemRow
              SellOrder={SellOrder}
              showModalCancel={showModalCancel}
              showModalModify={showModalModify}
              data={item}
              key={index}
              Wrapper={Wrapper}
            />
          ))}
        </View>
      );
    }

    return null;
  };

  const orderbookConditionMemo = () => {
    const isSuccess = orderStopHistoryStore.status === ReducerStatus.SUCCESS;
    const isNotNullData = currentFilterConditionStorage != null;
    const isNoData = isNotNullData && currentFilterConditionStorage.length === 0;
    const isExistedData = isNotNullData && currentFilterConditionStorage.length >= 1;

    if (isSuccess && isNoData) {
      return (
        <View style={styles.noDataCon}>
          <EmptySymbol />
          <Text style={styles.noDataText}>{t('There is no data')}</Text>
        </View>
      );
    }

    if (isSuccess && isExistedData) {
      return (
        <View>
          {currentFilterConditionStorage.map((item, index) => (
            <OrderbookConditionItemRow
              data={item}
              key={index}
              Wrapper={Wrapper}
              SellOrder={SellOrder}
              accountType={accountType}
              showModalModify={showModalModify}
              showModalCancel={showModalCancel}
            />
          ))}
        </View>
      );
    }

    return null;
  };

  switch (tradeTabOption) {
    case ITradeTabOption.ORDER_BOOK:
      return orderbookItemMemo();

    case ITradeTabOption.CONDITION_ORDER:
      return orderbookConditionMemo();

    default:
      return null;
  }
};

export default memo(OrderbookTable);

const useStyles = getStylesHook({
  noDataCon: {
    marginTop: 20,
    // height: Platform.OS === 'ios' ? getResponsiveHeight(height - 390) : getResponsiveHeight(height - 200),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  noDataText: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    color: lightColors.LIGHTTextContent,
  },
});
