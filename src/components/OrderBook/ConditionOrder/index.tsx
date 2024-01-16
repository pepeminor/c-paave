import React, { useEffect, useState, useMemo, useCallback, useContext } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import globalStyles, { Colors, scaleSize } from 'styles';
import {
  ACCOUNT_TYPE,
  ALL_ORDER_STATUS_FILTER_VALUE,
  MARKET,
  OrderBookScreenInitOption,
  SELL_BUY_TYPE,
  SYSTEM_TYPE,
} from 'global';
import { ColumnItem } from '../Table/ColumnItem';
import { Table, TGridList } from '../Table';
import CheckIcon from 'assets/icon/check.svg';
import useStyles from './styles';
import PrimaryButton from 'components/PrimaryButton';
import ActionSheets from 'components/ActionSheets';
import useModalOrder from 'hooks/useModalOrder';
import { formatNumber, isCloseToBottom, alertMessage, isDerivativesAccount } from 'utils';
import { useDispatch } from 'react-redux';
import { IOrderHistoryResponse, IOrderStopHistoryResponse } from 'interfaces/equity';
import { ReducerStatus } from 'interfaces/reducer';
import {
  getActiveOrder,
  getOrderHistory,
  getOrderStopHistory,
  postCancelMultiLO,
  putOrderStopCancelMultiEquity,
  kisGetEqtEnquiryOrder,
  kisGetEqtEnquiryHistoryOrder,
  kisCancelEqtOrder,
  generateNewKisCard,
  generateKisCardFrom,
  resetGenerateNewKisCard,
  resetSelectedCancelList,
  subscribeOrderMatch,
  unSubscribeOrderMatch,
} from 'reduxs/global-actions';
import { useTranslation } from 'react-i18next';
import { FilterOption, OrderBookSearchTextContext } from 'screens/OrderBook/constants';
import {
  IDerOrderCancelInfo,
  IEqtOrderHistoryMappingResponse,
  IEquityOrderCancelItem,
  IKisGetDerEnquiryOrderResponse,
} from 'interfaces/services';
import lodash from 'lodash';
import { ISpecialPriceType } from 'constants/enum';
import { kisVerifyAndSaveOTPFrom } from 'interfaces/authentication';
import { kisVerifyAndSaveOTP } from 'screens/LoginRealAccount/actions';
import { IKisVerifyAndSaveOTPRequest } from 'interfaces/common';
import useUpdateEffect from 'hooks/useUpdateEffect';
import ModalOTPKIS from 'components/ModalOTPKIS';
import config from 'config';
import { useAppSelector, useTypedSelector } from 'hooks/useAppSelector';
import {
  kisCancelDerOrder,
  kisGetDerEnquiryHistoryOrder,
  kisGetDerEnquiryOrder,
} from 'reduxs/global-actions/KisServicesDer';

interface ConditionOrderProps {
  type: OrderBookScreenInitOption;
  filterOption: FilterOption;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onEndReached?: (info: { distanceFromEnd: number }) => void;
  setCurrentFilter: (filterOption: FilterOption) => void;
}

const ConditionOrder = (props: ConditionOrderProps) => {
  const { styles } = useStyles();
  const [selectedCondSymbolCancelOrder, setSelectedCondSymbolCancelOrder] = useState<number[]>([]);
  const [selectedOrderbookSymbolCancelOrder, setSelectedOrderbookSymbolCancelOrder] = useState<
    number[] | IEquityOrderCancelItem[] | IDerOrderCancelInfo[]
  >([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const symbolList = useTypedSelector(state => state.SymbolData.marketData.symbolMap);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const kisOTPToken = useAppSelector(state => state.kisOTPToken);
  const kisCheckOTP = useAppSelector(state => state.kisCheckOTP);
  const generateKisCardResult = useAppSelector(state => state.generateKisCardResult);
  const [isDisableForm, setIsDisableForm] = useState(false);
  const [otpKisValue, setOtpKisValue] = useState('');
  const [valueOTPError, setValueOTPError] = useState(false);
  const [valueOTPErrorContent, setValueOTPErrorContent] = useState('');
  const [loading, setLoading] = useState(false);

  /* Store Data */
  const activeOrderStore = useAppSelector(state => state.ActiveOrder);
  const orderHistoryStore = useAppSelector(state => state.OrderHistory);
  const orderStopHistoryStore = useAppSelector(state => state.OrderStopHistory);
  const kisEquityEnquiryOrder = useAppSelector(state => state.kisEquityEnquiryOrder);
  const kisEqtEnquiryHistoryOrder = useAppSelector(state => state.kisEqtEnquiryHistoryOrder);
  const orderbookResetSelectedTrigger = useAppSelector(state => state.OrderbookResetSelectedTrigger);
  const kisOTPErrorValue = useAppSelector(state => state.kisOTPErrorValue);
  const kisDerEnquiryOrder = useAppSelector(state => state.kisDerEnquiryOrder);
  const kisDerEnquiryHistoryOrder = useAppSelector(state => state.kisDerEnquiryHistoryOrder);
  const cancelMode = useAppSelector(state => state.orderBookCancelMode);
  const { value: searchTextValue } = useContext(OrderBookSearchTextContext);

  const isFuturesCode = useCallback(
    (symbolCode: string) => {
      return symbolList[symbolCode]?.symbolType === 'FUTURES';
    },
    [symbolList]
  );

  useUpdateEffect(() => {
    if (kisCheckOTP.status === ReducerStatus.FAILED) {
      setValueOTPError(true);
      kisOTPErrorValue != null && setValueOTPErrorContent(t(kisOTPErrorValue));
      setIsDisableForm(false);
    } else if (kisCheckOTP.status === ReducerStatus.SUCCESS) {
      resetCancelMode();
      setValueOTPError(false);
      setValueOTPErrorContent('');
      setIsDisableForm(false);
    }
  }, [kisCheckOTP.status, kisOTPErrorValue]);

  useUpdateEffect(() => {
    if (
      orderbookResetSelectedTrigger.reset &&
      (selectedOrderbookSymbolCancelOrder.length > 0 || selectedCondSymbolCancelOrder.length > 0)
    ) {
      resetCancelMode();
      dispatch(resetSelectedCancelList({ reset: false }));
    }
  }, [orderbookResetSelectedTrigger]);

  const currentStorage = useMemo(() => {
    switch (props.type) {
      case OrderBookScreenInitOption.ORDER_BOOK:
        return selectedAccount.type === ACCOUNT_TYPE.KIS &&
          selectedAccount.selectedSubAccount != null &&
          selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY
          ? kisEquityEnquiryOrder
          : selectedAccount.type === ACCOUNT_TYPE.KIS &&
            selectedAccount.selectedSubAccount != null &&
            selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
          ? kisDerEnquiryOrder
          : activeOrderStore;
      case OrderBookScreenInitOption.ORDER_HISTORY:
        return selectedAccount.type === ACCOUNT_TYPE.KIS &&
          selectedAccount.selectedSubAccount != null &&
          selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY
          ? kisEqtEnquiryHistoryOrder
          : selectedAccount.type === ACCOUNT_TYPE.KIS &&
            selectedAccount.selectedSubAccount != null &&
            selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
          ? kisDerEnquiryHistoryOrder
          : orderHistoryStore;
      case OrderBookScreenInitOption.CONDITION_ORDER:
        return orderStopHistoryStore;
      default:
        return activeOrderStore;
    }
  }, [
    props.type,
    activeOrderStore,
    orderHistoryStore,
    orderStopHistoryStore,
    kisEquityEnquiryOrder,
    kisEqtEnquiryHistoryOrder,
    kisDerEnquiryOrder,
    kisDerEnquiryHistoryOrder,
  ]);

  const currentFilterStorage = useMemo(
    () =>
      kisEquityEnquiryOrder.data != null
        ? kisEquityEnquiryOrder.data.filter(
            item =>
              item.orderStatus === ALL_ORDER_STATUS_FILTER_VALUE.PENDING_TO_MARKET ||
              item.orderStatus === ALL_ORDER_STATUS_FILTER_VALUE.WAITINGMODIFY ||
              item.orderStatus === ALL_ORDER_STATUS_FILTER_VALUE.WAITINGCANCEL
          )
        : undefined,
    [kisEquityEnquiryOrder.data]
  );

  const currentFilterPendingToMarketOrder = useMemo(
    () =>
      kisDerEnquiryOrder.data != null
        ? kisDerEnquiryOrder.data.filter(
            item =>
              item.orderStatus === ALL_ORDER_STATUS_FILTER_VALUE.READY_TO_SEND ||
              item.orderStatus === ALL_ORDER_STATUS_FILTER_VALUE.INACTIVE ||
              item.orderStatus === ALL_ORDER_STATUS_FILTER_VALUE.OUTSTANDING ||
              item.orderStatus === ALL_ORDER_STATUS_FILTER_VALUE.PENDING_APPROVAL ||
              item.orderStatus === ALL_ORDER_STATUS_FILTER_VALUE.SENDING
          )
        : undefined,
    [kisDerEnquiryOrder.data]
  );

  const currentFilterExpiredDer = useMemo(
    () =>
      kisDerEnquiryOrder.data != null
        ? kisDerEnquiryOrder.data.filter(
            item =>
              item.orderStatus === ALL_ORDER_STATUS_FILTER_VALUE.KILLED ||
              item.orderStatus === ALL_ORDER_STATUS_FILTER_VALUE.FILL_AND_KILL
          )
        : undefined,
    [kisDerEnquiryOrder.data]
  );

  const getData = useMemo(() => {
    switch (props.type) {
      case OrderBookScreenInitOption.ORDER_BOOK:
        return selectedAccount.type === ACCOUNT_TYPE.KIS &&
          selectedAccount.selectedSubAccount != null &&
          selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY
          ? kisGetEqtEnquiryOrder
          : selectedAccount.type === ACCOUNT_TYPE.KIS &&
            selectedAccount.selectedSubAccount != null &&
            selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
          ? kisGetDerEnquiryOrder
          : getActiveOrder;
      case OrderBookScreenInitOption.ORDER_HISTORY:
        return selectedAccount.type === ACCOUNT_TYPE.KIS &&
          selectedAccount.selectedSubAccount != null &&
          selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY
          ? kisGetEqtEnquiryHistoryOrder
          : selectedAccount.type === ACCOUNT_TYPE.KIS &&
            selectedAccount.selectedSubAccount != null &&
            selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
          ? kisGetDerEnquiryHistoryOrder
          : getOrderHistory;
      case OrderBookScreenInitOption.CONDITION_ORDER:
        return getOrderStopHistory;
      default:
        return selectedAccount.type === ACCOUNT_TYPE.KIS ? kisGetEqtEnquiryOrder : getActiveOrder;
    }
  }, [props.type, selectedAccount]);

  const handleCheckVisibleCancelOrder = (id: number) => {
    return selectedCondSymbolCancelOrder.includes(id);
  };

  const handleSetSelectedSymbolCancelOrder = (id: string) => {
    if (handleCheckVisibleCancelOrder(Number(id))) {
      setSelectedCondSymbolCancelOrder(symbols => symbols.filter(item => item !== Number(id)));
    } else {
      setSelectedCondSymbolCancelOrder(symbols => [...symbols, Number(id)]);
    }
  };

  const handleCheckVisibleOrderbookCancelOrder = (item: IEquityOrderCancelItem | number | object) => {
    if (
      selectedAccount.type === ACCOUNT_TYPE.KIS &&
      selectedAccount.selectedSubAccount != null &&
      selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY
    ) {
      return Boolean(
        (selectedOrderbookSymbolCancelOrder as IEquityOrderCancelItem[]).find(el =>
          lodash.isEqual(el, item as IEquityOrderCancelItem)
        )
      );
    } else if (
      selectedAccount.type === ACCOUNT_TYPE.KIS &&
      selectedAccount.selectedSubAccount != null &&
      selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
    ) {
      return Boolean(
        (selectedOrderbookSymbolCancelOrder as IDerOrderCancelInfo[]).find(el => lodash.isEqual(el, item))
      );
    } else {
      return (selectedOrderbookSymbolCancelOrder as number[]).includes(item as number);
    }
  };

  const handleSetSelectedOrderBookSymbolCancelOrder = (item: IEqtOrderHistoryMappingResponse | IDerOrderCancelInfo) => {
    const itemParam: IEquityOrderCancelItem | number | object =
      selectedAccount.type === ACCOUNT_TYPE.KIS &&
      selectedAccount.selectedSubAccount != null &&
      selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY
        ? {
            orderNo: (item as IEqtOrderHistoryMappingResponse).orderID,
            orderGroupNo: (item as IEqtOrderHistoryMappingResponse).orderGroupNo,
          }
        : selectedAccount.type === ACCOUNT_TYPE.KIS &&
          selectedAccount.selectedSubAccount != null &&
          selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
        ? {
            marketID: (item as IDerOrderCancelInfo).marketID != null ? (item as IDerOrderCancelInfo).marketID : '',
            validity: (item as IDerOrderCancelInfo).validity != null ? (item as IDerOrderCancelInfo).validity : '',
            orderType: (item as IDerOrderCancelInfo).orderType != null ? (item as IDerOrderCancelInfo).orderType : '',
            symbolCode: (item as IDerOrderCancelInfo).stockCode != null ? (item as IDerOrderCancelInfo).stockCode : '',
            orderNumber: (item as IDerOrderCancelInfo).orderID != null ? (item as IDerOrderCancelInfo).orderID : '',
            sellBuyType:
              (item as IDerOrderCancelInfo).sellBuyType != null ? (item as IDerOrderCancelInfo).sellBuyType : '',
            orderGroupID:
              (item as IDerOrderCancelInfo).orderGroupID != null ? (item as IDerOrderCancelInfo).orderGroupID : '',
            validityDate:
              (item as IDerOrderCancelInfo).validityDate != null ? (item as IDerOrderCancelInfo).validityDate : '',
            commodityName:
              (item as IDerOrderCancelInfo).commodityName != null ? (item as IDerOrderCancelInfo).commodityName : '',
            contractMonth:
              (item as IDerOrderCancelInfo).contractMonth != null ? (item as IDerOrderCancelInfo).contractMonth : '',
          }
        : Number((item as IEqtOrderHistoryMappingResponse).orderID);
    if (handleCheckVisibleOrderbookCancelOrder(itemParam)) {
      selectedAccount.type === ACCOUNT_TYPE.KIS
        ? setSelectedOrderbookSymbolCancelOrder(symbols => {
            return (symbols as IEquityOrderCancelItem[]).filter(el => !lodash.isEqual(el, itemParam));
          })
        : setSelectedOrderbookSymbolCancelOrder(symbols => (symbols as number[]).filter(el => el !== itemParam));
    } else {
      selectedAccount.type === ACCOUNT_TYPE.KIS
        ? setSelectedOrderbookSymbolCancelOrder(symbols => [
            ...(symbols as IEquityOrderCancelItem[]),
            itemParam as IEquityOrderCancelItem,
          ])
        : setSelectedOrderbookSymbolCancelOrder(symbols => [...(symbols as number[]), itemParam as number]);
    }
  };

  const onLoadMore = () => {
    if (searchTextValue.length !== 0) return; // prevent load more when search
    if (selectedAccount.type === ACCOUNT_TYPE.KIS) {
      if (currentStorage.previous.length < config.pageSizeKis) return; // prevent load more when data already full
      setLoading(true);
      if (
        currentStorage.data.length === config.pageSizeKis * ((props.filterOption.pageNumber ?? 0) + 1) &&
        currentStorage.status !== ReducerStatus.LOADING
      ) {
        props.setCurrentFilter({ pageNumber: (props.filterOption.pageNumber ?? 0) + 1 });
      }
    } else {
      if (currentStorage.previous.length < config.pageSize) return; // prevent load more when data already full
      setLoading(true);
      if (currentStorage.previous.length === config.pageSize && currentStorage.status !== ReducerStatus.LOADING) {
        props.setCurrentFilter({ pageNumber: (props.filterOption.pageNumber ?? 0) + 1 });
      }
    }
  };

  const configGrid = (): TGridList[] => {
    switch (props.type) {
      case OrderBookScreenInitOption.CONDITION_ORDER:
        return [
          {
            title: 'Symbol',
            width: scaleSize(96),
            column: (item: IOrderStopHistoryResponse) => (
              <ColumnItem style={styles.firstColumn}>
                {item.cancellable && cancelMode && (
                  <TouchableOpacity
                    style={[
                      globalStyles.alignCenter,
                      globalStyles.justifyCenter,
                      styles.btn,
                      handleCheckVisibleCancelOrder(Number(item.stopOrderID)) && styles.btnIsVisible,
                    ]}
                    activeOpacity={0.6}
                    onPress={() => handleSetSelectedSymbolCancelOrder(String(item.stopOrderID))}
                  >
                    <CheckIcon width={scaleSize(14)} height={scaleSize(13)} />
                  </TouchableOpacity>
                )}
                <View style={styles.containerFirstCol}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.boldText, styles.stockTextStyle, styles.largeTextStyle]}
                    numberOfLines={1}
                  >
                    {item.stockCode}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.boldText,
                      styles.fontSize14,
                      { color: item.sellBuyType === SELL_BUY_TYPE.BUY ? Colors.DARK_GREEN : Colors.LIGHTRed },
                    ]}
                  >
                    {t(item.sellBuyType)}
                  </Text>
                </View>
              </ColumnItem>
            ),
          },
          {
            title: 'Quantity',
            width: scaleSize(83),
            column: (item: IOrderStopHistoryResponse) => (
              <ColumnItem style={globalStyles.alignEnd}>
                <Text allowFontScaling={false} style={styles.quantityText2}>
                  {formatNumber(item.orderQuantity, 2)}
                </Text>
              </ColumnItem>
            ),
          },
          {
            title: ['Stop Price', 'Limit Price'],
            width: scaleSize(82),
            column: (item: IOrderStopHistoryResponse) => (
              <ColumnItem style={globalStyles.alignEnd}>
                <Text allowFontScaling={false} style={[styles.quantityText2, globalStyles.textAlignRight]}>
                  {isFuturesCode(item.stockCode)
                    ? formatNumber(item.stopPrice, 1, undefined, true)
                    : formatNumber(item.stopPrice / 1000, 2, undefined, true)}
                  {'\n'}
                  {selectedAccount.type === ACCOUNT_TYPE.KIS
                    ? item.orderPrice
                      ? isFuturesCode(item.stockCode)
                        ? formatNumber(item.orderPrice, 1, undefined, true)
                        : formatNumber(item.orderPrice / 1000, 2, undefined, true)
                      : symbolList && symbolList[item.stockCode]
                      ? symbolList[item.stockCode].market === MARKET.HOSE
                        ? ISpecialPriceType.MP
                        : ISpecialPriceType.MTL
                      : '_'
                    : '_'}
                </Text>
              </ColumnItem>
            ),
          },
          {
            title: 'Status',
            width: scaleSize(111),
            column: (item: IOrderStopHistoryResponse) => (
              <ColumnItem style={globalStyles.alignStart}>
                <Text allowFontScaling={false} style={styles.quantityText2}>
                  {t(item.status)}
                </Text>
              </ColumnItem>
            ),
          },
        ];

      case OrderBookScreenInitOption.ORDER_BOOK:
        return [
          {
            title: 'Symbol',
            width: scaleSize(96),
            column: (item: IEqtOrderHistoryMappingResponse | IDerOrderCancelInfo) => (
              <ColumnItem style={styles.firstColumn}>
                {(item as IEqtOrderHistoryMappingResponse).cancellable && cancelMode && (
                  <TouchableOpacity
                    style={[
                      globalStyles.alignCenter,
                      globalStyles.justifyCenter,
                      styles.btn,
                      handleCheckVisibleOrderbookCancelOrder(
                        selectedAccount.type === ACCOUNT_TYPE.KIS &&
                          selectedAccount.selectedSubAccount != null &&
                          selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY
                          ? {
                              orderNo: (item as IEqtOrderHistoryMappingResponse).orderID,
                              orderGroupNo: (item as IEqtOrderHistoryMappingResponse).orderGroupNo,
                            }
                          : selectedAccount.type === ACCOUNT_TYPE.KIS &&
                            selectedAccount.selectedSubAccount != null &&
                            selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
                          ? {
                              marketID:
                                (item as IDerOrderCancelInfo).marketID != null
                                  ? (item as IDerOrderCancelInfo).marketID
                                  : '',
                              validity:
                                (item as IDerOrderCancelInfo).validity != null
                                  ? (item as IDerOrderCancelInfo).validity
                                  : '',
                              orderType:
                                (item as IDerOrderCancelInfo).orderType != null
                                  ? (item as IDerOrderCancelInfo).orderType
                                  : '',
                              symbolCode:
                                (item as IDerOrderCancelInfo).stockCode != null
                                  ? (item as IDerOrderCancelInfo).stockCode
                                  : '',
                              orderNumber:
                                (item as IDerOrderCancelInfo).orderID != null
                                  ? (item as IDerOrderCancelInfo).orderID
                                  : '',
                              sellBuyType:
                                (item as IDerOrderCancelInfo).sellBuyType != null
                                  ? (item as IDerOrderCancelInfo).sellBuyType
                                  : '',
                              orderGroupID:
                                (item as IDerOrderCancelInfo).orderGroupID != null
                                  ? (item as IDerOrderCancelInfo).orderGroupID
                                  : '',
                              validityDate:
                                (item as IDerOrderCancelInfo).validityDate != null
                                  ? (item as IDerOrderCancelInfo).validityDate
                                  : '',
                              commodityName:
                                (item as IDerOrderCancelInfo).commodityName != null
                                  ? (item as IDerOrderCancelInfo).commodityName
                                  : '',
                              contractMonth:
                                (item as IDerOrderCancelInfo).contractMonth != null
                                  ? (item as IDerOrderCancelInfo).contractMonth
                                  : '',
                            }
                          : Number((item as IEqtOrderHistoryMappingResponse).orderID)
                      ) && styles.btnIsVisible,
                    ]}
                    activeOpacity={0.6}
                    onPress={() => handleSetSelectedOrderBookSymbolCancelOrder(item)}
                  >
                    <CheckIcon width={scaleSize(14)} height={scaleSize(13)} />
                  </TouchableOpacity>
                )}

                <View style={styles.containerFirstCol}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.boldText, styles.stockTextStyle, styles.largeTextStyle]}
                    numberOfLines={1}
                  >
                    {item.stockCode}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.boldText,
                      styles.fontSize14,
                      { color: item.sellBuyType === SELL_BUY_TYPE.BUY ? Colors.DARK_GREEN : Colors.LIGHTRed },
                    ]}
                  >
                    {t(item.sellBuyType)}
                  </Text>
                </View>
              </ColumnItem>
            ),
          },
          {
            title: ['Quantity', 'Matched Qtt'],
            width: scaleSize(82.5),
            column: (item: IOrderHistoryResponse) => (
              <ColumnItem style={globalStyles.alignEnd}>
                <Text allowFontScaling={false} style={styles.quantityText}>
                  {formatNumber(item.orderQuantity, 2)}
                </Text>
                <Text allowFontScaling={false} style={styles.quantityText3}>
                  {formatNumber(item.matchedQuantity, 2)}
                </Text>
              </ColumnItem>
            ),
          },
          {
            title: ['Price', 'Matched'],
            width: scaleSize(82.5),
            column: (item: IOrderHistoryResponse) => (
              <ColumnItem style={globalStyles.alignEnd}>
                <Text allowFontScaling={false} style={styles.quantityText}>
                  {item.orderType.match(/^(LO|ODDLOT)$/)
                    ? isFuturesCode(item.stockCode)
                      ? formatNumber(item.orderPrice, 1, undefined, true)
                      : formatNumber(item.orderPrice / 1000, 2, undefined, true)
                    : item.orderType}
                </Text>
                <Text allowFontScaling={false} style={styles.quantityText3}>
                  {isFuturesCode(item.stockCode)
                    ? formatNumber(item.matchedPrice, 1, undefined, true)
                    : formatNumber(item.matchedPrice / 1000, 2, undefined, true)}
                </Text>
              </ColumnItem>
            ),
          },
          {
            title: 'Status',
            width: scaleSize(111),
            column: (item: IOrderHistoryResponse) => (
              <ColumnItem style={globalStyles.alignStart}>
                <Text allowFontScaling={false} style={styles.quantityText2}>
                  {t(item.orderStatus)}
                </Text>
              </ColumnItem>
            ),
          },
        ];

      default:
        return [
          {
            title: 'Symbol',
            width: scaleSize(96),
            column: (item: IOrderHistoryResponse) => (
              <ColumnItem style={styles.firstColumn}>
                <View style={styles.containerFirstCol}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.boldText, styles.stockTextStyle, styles.largeTextStyle]}
                    numberOfLines={1}
                  >
                    {item.stockCode}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.boldText,
                      styles.fontSize14,
                      { color: item.sellBuyType === SELL_BUY_TYPE.BUY ? Colors.DARK_GREEN : Colors.LIGHTRed },
                    ]}
                  >
                    {t(item.sellBuyType)}
                  </Text>
                </View>
              </ColumnItem>
            ),
          },
          {
            title: ['Quantity', 'Matched Qtt'],
            width: scaleSize(82.5),
            column: (item: IOrderHistoryResponse) => (
              <ColumnItem style={globalStyles.alignEnd}>
                <Text allowFontScaling={false} style={styles.quantityText}>
                  {formatNumber(item.orderQuantity, 2)}
                </Text>
                <Text allowFontScaling={false} style={styles.quantityText3}>
                  {formatNumber(item.matchedQuantity, 2)}
                </Text>
              </ColumnItem>
            ),
          },
          {
            title: ['Price', 'Matched'],
            width: scaleSize(82.5),
            column: (item: IOrderHistoryResponse) => (
              <ColumnItem style={globalStyles.alignEnd}>
                <Text allowFontScaling={false} style={styles.quantityText}>
                  {isFuturesCode(item.stockCode)
                    ? formatNumber(item.orderPrice, 1, undefined, true)
                    : formatNumber(item.orderPrice / 1000, 2, undefined, true)}
                </Text>
                <Text allowFontScaling={false} style={styles.quantityText3}>
                  {isFuturesCode(item.stockCode)
                    ? formatNumber(item.matchedPrice, 1, undefined, true)
                    : formatNumber(item.matchedPrice / 1000, 2, undefined, true)}
                </Text>
              </ColumnItem>
            ),
          },
          {
            title: 'Status',
            width: scaleSize(111),
            column: (item: IOrderHistoryResponse) => (
              <ColumnItem style={globalStyles.alignStart}>
                <Text allowFontScaling={false} style={styles.quantityText2}>
                  {t(item.orderStatus)}
                </Text>
              </ColumnItem>
            ),
          },
        ];
    }
  };

  const handleCancelSelected = () => {
    switch (props.type) {
      case OrderBookScreenInitOption.ORDER_BOOK:
        if (selectedOrderbookSymbolCancelOrder.length) {
          onVisibleModalCancel();
          setIsDisableForm(false);
          setOtpKisValue('');
          setValueOTPError(false);
          setValueOTPErrorContent('');
          if (selectedAccount.type === ACCOUNT_TYPE.KIS && (kisOTPToken == null || kisOTPToken.trim() === '')) {
            dispatch(
              generateNewKisCard({ username: selectedAccount.username ?? '', from: generateKisCardFrom.CANCEL_ORDER })
            );
          }
        } else {
          resetCancelMode();
        }

        break;

      case OrderBookScreenInitOption.CONDITION_ORDER:
        if (selectedCondSymbolCancelOrder.length) {
          onVisibleModalCancel();
          setIsDisableForm(false);
          setOtpKisValue('');
          setValueOTPError(false);
          setValueOTPErrorContent('');
          if (selectedAccount.type === ACCOUNT_TYPE.KIS && (kisOTPToken == null || kisOTPToken.trim() === '')) {
            dispatch(
              generateNewKisCard({ username: selectedAccount.username ?? '', from: generateKisCardFrom.CANCEL_ORDER })
            );
          }
        } else {
          resetCancelMode();
        }
        break;

      default:
        break;
    }
  };

  const handleCancelAll = () => {
    let selectedOrderBookSymbols: number[] | IEquityOrderCancelItem[] | IDerOrderCancelInfo[] = [];

    if (currentStorage.data && currentStorage.data.length > 0) {
      switch (props.type) {
        case OrderBookScreenInitOption.ORDER_BOOK: {
          if (selectedAccount.type === ACCOUNT_TYPE.KIS) {
            if (
              selectedAccount.selectedSubAccount != null &&
              selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY
            ) {
              selectedOrderBookSymbols = (currentStorage.data as IEqtOrderHistoryMappingResponse[])
                .filter(x => x.cancellable === true)
                .map(el => ({
                  orderNo: el.orderID,
                  orderGroupNo: el.orderGroupNo,
                }));
            } else if (
              selectedAccount.selectedSubAccount != null &&
              selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
            ) {
              selectedOrderBookSymbols = (currentStorage.data as unknown as IDerOrderCancelInfo[]).map(el => ({
                marketID: el?.marketID ?? '',
                validity: el?.validity ?? '',
                orderType: el?.orderType ?? '',
                symbolCode: el?.stockCode ?? '',
                orderNumber: el?.orderID ?? '',
                sellBuyType: el?.sellBuyType ?? '',
                orderGroupID: el?.orderGroupID ?? '',
                validityDate: el?.validityDate ?? '',
                commodityName: el?.commodityName ?? '',
                contractMonth: el?.contractMonth ?? '',
              }));
            }
          } else {
            selectedOrderBookSymbols = (currentStorage.data as IEqtOrderHistoryMappingResponse[])
              .filter(x => x.cancellable === true)
              .map(el => Number(el.orderID));
          }

          setSelectedOrderbookSymbolCancelOrder(selectedOrderBookSymbols);
          break;
        }
        case OrderBookScreenInitOption.CONDITION_ORDER: {
          const selectedCondSymbols = (currentStorage.data as IOrderStopHistoryResponse[])
            .filter(x => x.cancellable === true)
            .map(el => Number(el.stopOrderID));
          setSelectedCondSymbolCancelOrder(selectedCondSymbols);
          break;
        }
        default:
          break;
      }
      onVisibleModalCancel();
      setIsDisableForm(false);
      setOtpKisValue('');
      setValueOTPError(false);
      setValueOTPErrorContent('');
      if (selectedAccount.type === ACCOUNT_TYPE.KIS && (kisOTPToken == null || kisOTPToken.trim() === '')) {
        dispatch(
          generateNewKisCard({ username: selectedAccount.username ?? '', from: generateKisCardFrom.CANCEL_ORDER })
        );
      }
    }
  };

  const cancelSelectedOrder = () => {
    switch (props.type) {
      case OrderBookScreenInitOption.ORDER_BOOK:
        selectedAccount.type === ACCOUNT_TYPE.KIS &&
        selectedAccount.selectedSubAccount != null &&
        selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY &&
        selectedAccount.username != null
          ? dispatch(
              kisCancelEqtOrder(
                {
                  accountNo: selectedAccount.selectedSubAccount.accountNumber,
                  orders: (selectedOrderbookSymbolCancelOrder as IEquityOrderCancelItem[]).map(el => ({
                    orderNo: String(el.orderNo),
                    orderGroupNo: String(el.orderGroupNo),
                  })),
                  clientID: selectedAccount.username,
                },
                {
                  message: 'MULTI_ORDERS_CANCEL_SUCCESS',
                },
                undefined,
                true
              )
            )
          : selectedAccount.type === ACCOUNT_TYPE.KIS &&
            selectedAccount.selectedSubAccount != null &&
            selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
          ? dispatch(
              kisCancelDerOrder(
                {
                  accountNumber: selectedAccount.selectedSubAccount.accountNumber,
                  orderInfo: (selectedOrderbookSymbolCancelOrder as IKisGetDerEnquiryOrderResponse[]).map(el => ({
                    marketID: el?.marketID ?? '',
                    validity: el?.validity ?? '',
                    orderType: el?.orderType ?? '',
                    symbolCode: el?.symbolCode ?? '',
                    orderNumber: el?.orderNumber ?? '',
                    sellBuyType: el?.sellBuyType ?? '',
                    orderGroupID: el?.orderGroupID ?? '',
                    validityDate: el?.validityDate ?? '',
                    commodityName: el?.commodityName ?? '',
                    contractMonth: el?.contractMonth ?? '',
                  })),
                },
                {
                  message: 'MULTI_ORDERS_CANCEL_SUCCESS',
                },
                undefined,
                true
              )
            )
          : dispatch(
              postCancelMultiLO(
                { orderIds: selectedOrderbookSymbolCancelOrder as number[] },
                {
                  message: 'MULTI_ORDERS_CANCEL_SUCCESS',
                },
                undefined,
                true
              )
            );
        break;

      case OrderBookScreenInitOption.CONDITION_ORDER:
        dispatch(
          putOrderStopCancelMultiEquity(
            { stopOrderIds: selectedCondSymbolCancelOrder },
            {
              message: 'STOP_ORDER_CANCEL_SUCCESS',
            },
            undefined,
            true
          )
        );
        break;
    }
  };

  const handleConfirmCancel = () => {
    if (
      (props.type === OrderBookScreenInitOption.CONDITION_ORDER && selectedCondSymbolCancelOrder.length > 0) ||
      (props.type === OrderBookScreenInitOption.ORDER_BOOK && selectedOrderbookSymbolCancelOrder.length > 0)
    ) {
      if (selectedAccount.type === ACCOUNT_TYPE.KIS && (kisOTPToken == null || kisOTPToken.trim() === '')) {
        setIsDisableForm(true);
        const params: IKisVerifyAndSaveOTPRequest = {
          expireTime: config.kisOTPTokenExpireTime,
          verifyType: 'MATRIX_CARD',
          wordMatrixId: generateKisCardResult != null ? generateKisCardResult.wordMatrixId : 0,
          wordMatrixValue: otpKisValue,
        };
        dispatch(kisVerifyAndSaveOTP(params, kisVerifyAndSaveOTPFrom.CANCEL_ORDER, cancelSelectedOrder));
      } else {
        cancelSelectedOrder();
      }
    } else {
      alertMessage('danger', 'No items selected');
    }
  };

  const resetCancelMode = () => {
    setSelectedOrderbookSymbolCancelOrder([]);
    setSelectedCondSymbolCancelOrder([]);
    setOtpKisValue('');
    setIsDisableForm(false);
    dispatch(resetGenerateNewKisCard());
  };

  const isDisableCancelSelectedBtn = (): boolean => {
    if (props.type === OrderBookScreenInitOption.ORDER_BOOK) {
      return selectedOrderbookSymbolCancelOrder.length === 0;
    } else if (props.type === OrderBookScreenInitOption.CONDITION_ORDER) {
      return selectedCondSymbolCancelOrder.length === 0;
    }
    return true;
  };

  const isDisableCancelAllBtn = () => {
    if (currentStorage != null && currentStorage.status === ReducerStatus.SUCCESS && currentStorage.data != null) {
      for (const item of currentStorage.data) {
        if (item.cancellable) return true;
      }
    }
    return false;
  };

  const onChangeOtpKisValue = (value: string) => {
    setOtpKisValue(value);
    if (valueOTPError) {
      setValueOTPError(false);
      setValueOTPErrorContent('');
    }
  };

  const [ModalComponentCancel, onVisibleModalCancel] = useModalOrder({
    title: 'Cancel Order',
    onConfirm: handleConfirmCancel,
    onCancel: resetCancelMode,
    confirmText: 'Confirm',
    isDisableWholeForm: isDisableForm,
    ListContentModal: (
      <>
        <View style={globalStyles.alignCenter}>
          <Text allowFontScaling={false} style={styles.quantityText2}>
            {t('Are you sure you want to cancel these orders?')}
          </Text>
        </View>
        {selectedAccount.type === ACCOUNT_TYPE.KIS && (kisOTPToken == null || kisOTPToken.trim() === '') && (
          <ModalOTPKIS
            valueOTP={otpKisValue}
            onChangeValueOTP={onChangeOtpKisValue}
            generateKisCardResult={generateKisCardResult}
            ListContentModal={true}
            valueOTPError={valueOTPError}
            valueOTPErrorContent={valueOTPErrorContent}
            autoFocus={false}
          />
        )}
      </>
    ),
    notHideFormWhenConfirm:
      selectedAccount.type === ACCOUNT_TYPE.KIS && (kisOTPToken == null || kisOTPToken.trim() === ''),
    disabledExecuteButton:
      selectedAccount.type === ACCOUNT_TYPE.KIS &&
      (kisOTPToken == null || kisOTPToken.trim() === '') &&
      (generateKisCardResult == null || otpKisValue.trim() === ''),
  });

  useEffect(() => {
    resetCancelMode();
  }, [cancelMode, selectedAccount]);

  useEffect(() => {
    dispatch(getData(null));
  }, [props.type, props.filterOption]);

  useEffect(() => {
    dispatch(
      subscribeOrderMatch(isDerivativesAccount(selectedAccount) ? kisDerEnquiryOrder.data : kisEquityEnquiryOrder.data)
    );

    return () => {
      dispatch(unSubscribeOrderMatch({}));
      dispatch(unSubscribeOrderMatch({}));
    };
  }, [selectedAccount]);

  useUpdateEffect(() => {
    loading === true && setTimeout(() => setLoading(false), 500); // delay 500ms to turnoff loading
  }, [loading]);

  const renderTable = () => {
    const selectedSubAccount = selectedAccount.selectedSubAccount;
    const isOrderBookScreen = props.type === OrderBookScreenInitOption.ORDER_BOOK;
    const isKisAccount = selectedAccount.type === ACCOUNT_TYPE.KIS;
    const isPendingToMarket = props.filterOption.orderStatus === ALL_ORDER_STATUS_FILTER_VALUE.PENDING_TO_MARKET;
    const isExpired = props.filterOption.orderStatus === ALL_ORDER_STATUS_FILTER_VALUE.EXPIRED;

    let data: Array<IEqtOrderHistoryMappingResponse | IOrderStopHistoryResponse> | undefined = currentStorage.data;

    if (isOrderBookScreen && selectedSubAccount != null && isKisAccount) {
      switch (selectedSubAccount.accountSubs[0].type) {
        case SYSTEM_TYPE.EQUITY:
          // filter Inactive; Ready to send; Sending; Pending Approval (Pending to market), Waiting Cancel; Waiting Modify of real trading in Today Order
          if (isPendingToMarket) {
            data = currentFilterStorage;
          }
          break;

        case SYSTEM_TYPE.DERIVATIVES:
          // filter Outstanding; Ready to send; Sending; Pending Approval, Inactive of real trading derivative in Today Order
          if (isPendingToMarket) {
            data = currentFilterPendingToMarketOrder;
          }

          // filter Killed and Fill and kill of real trading derivative in Today Order
          if (isExpired) {
            data = currentFilterExpiredDer;
          }
          break;
      }
    }

    if (searchTextValue && data != null) {
      data = data.filter(it => it.stockCode.toLowerCase().includes(searchTextValue.toLowerCase())); //filter by stockCode
    }

    return (
      <Table
        containerStyle={globalStyles.container}
        data={data}
        configGrid={configGrid()}
        onScroll={props.onScroll}
        onEndReached={Platform.OS === 'ios' ? onLoadMore : undefined}
        typeScreen={props.type}
        status={currentStorage.status}
        ListFooterComponent={
          Number(props.filterOption.pageNumber) > 0 && loading ? (
            <View style={styles.padding16}>
              <Text style={styles.textLoading}>{t('Loading')}...</Text>
            </View>
          ) : null
        }
      />
    );
  };

  return (
    <View style={globalStyles.container}>
      {/* scrollView fix the bug but error with flatList */}
      {Platform.OS === 'android' ? (
        <ScrollView
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              onLoadMore();
            }
          }}
          scrollEventThrottle={2000}
          style={[globalStyles.container, styles.marginTop8]}
        >
          {renderTable()}
        </ScrollView>
      ) : (
        <View style={[globalStyles.container, styles.marginTop8]}>{renderTable()}</View>
      )}
      {(props.type === OrderBookScreenInitOption.ORDER_BOOK ||
        props.type === OrderBookScreenInitOption.CONDITION_ORDER) &&
        cancelMode && (
          <ActionSheets visible={cancelMode} style={[styles.btnWrapper]}>
            <View>
              <PrimaryButton
                title={'Cancel selected orders'}
                onPress={handleCancelSelected}
                containerStyle={[styles.selectedBtnStyle]}
                styleText={styles.textStyle1}
                disabled={isDisableCancelSelectedBtn()}
              />
              <PrimaryButton
                title={'Cancel all'}
                onPress={handleCancelAll}
                containerStyle={styles.cancelAllBtnStyle}
                styleText={[styles.textStyle]}
                disabled={!isDisableCancelAllBtn()}
              />
            </View>
          </ActionSheets>
        )}
      {ModalComponentCancel}
    </View>
  );
};

export default ConditionOrder;
