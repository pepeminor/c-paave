import SymbolRow from 'components/OrderBook/SymbolRow';
import PrimaryButton from 'components/PrimaryButton';
import { ACCOUNT_TYPE, ALL_ORDER_STATUS_FILTER_VALUE, OrderBookScreenInitOption, SYSTEM_TYPE } from 'global';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, Easing, FlatList, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import globalStyles, { scaleSize } from 'styles';
import { TGridList } from '..';
import UpIcon from 'assets/icon/upIcon.svg';
import useStyles from './styles';

import { IOrderStopHistoryResponse } from 'interfaces/equity';
import { useDispatch } from 'react-redux';
import { IState } from 'reduxs/global-reducers/index';
import { formatNumber, formatDateStringWithTimezone, formatTimeToDisplay } from 'utils';

import { IEqtOrderHistoryMappingResponse } from 'interfaces/services';
import { useTranslation } from 'react-i18next';
import { setOrderBookSymbol, showModalDisconnectNetwork } from 'reduxs/global-actions';
import { ModalType } from 'screens/OrderBook/components/OrderBookModal';
import { DATE_FORMAT_DISPLAY_MOMENT } from 'constants/main';
import NetInfo from '@react-native-community/netinfo';

interface InformationSymbolType {
  title: string;
  value: string | number;
  type?: string;
  hidden?: boolean;
}

export const ColumnTitle = ({ children, style = {} }: { children: any; style?: StyleProp<ViewStyle> }) => {
  const { styles } = useStyles();
  return (
    <View
      style={[globalStyles.container, globalStyles.alignCenter, globalStyles.justifyCenter, styles.columHeader, style]}
    >
      {children}
    </View>
  );
};

interface RenderItemPropsType {
  configGrid: TGridList[];
  index?: number;
  symbol: IEqtOrderHistoryMappingResponse | IOrderStopHistoryResponse;
}

enum InformationSymbolConditionalOrderEnumType {
  ORDER_TIME = 'ORDER_TIME',
  ORDER_ID = 'ORDER_ID',
  TYPE = 'TYPE',
  MTS = 'MTS',
  REJECT = 'REJECT',
  VALID = 'VALID',
  REASON = 'REASON',
}

enum InformationSymbolOrderBookEnumType {
  ORDER_TIME = 'ORDER_TIME',
  ORDER_ID = 'ORDER_ID',
  ORDER_TYPE = 'ORDER_TYPE',
  MATCHED_VALUE = 'MATCHED_VALUE',
  UNMATCHED_QUANTITY = 'UNMATCHED_QUANTITY',
  CHANNEL = 'CHANNEL',
  EXPIRY_DATE = 'EXPIRY_DATE',
  REJECT_REASON = 'REJECT_REASON',
}

enum InformationSymbolOrderHistoryEnumType {
  ORDER_TIME = 'ORDER_TIME',
  ORDER_ID = 'ORDER_ID',
  ORDER_TYPE = 'ORDER_TYPE',
  MATCHED_VALUE = 'MATCHED_VALUE',
  UNMATCHED_QUANTITY = 'UNMATCHED_QUANTITY',
  CHANNEL = 'CHANNEL',
  FEE = 'FEE',
  TAX = 'TAX',
  REJECT = 'REJECT',
}

const RenderItem = ({ configGrid, symbol }: RenderItemPropsType) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const type = useSelector((state: IState) => state.orderBookScreenOption);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const fadeOpacity = useRef(new Animated.Value(0)).current;
  const orderBookFilter = useSelector((state: IState) => state.orderBookFilter);
  const selectedAccount = useSelector((state: IState) => state.selectedAccount);

  useEffect(() => {
    if (isShowDetail) setIsShowDetail(false);
  }, [type, orderBookFilter]);

  const InformationSymbol: InformationSymbolType[] =
    type === OrderBookScreenInitOption.CONDITION_ORDER
      ? [
          {
            title: 'Order time',
            value: formatDateStringWithTimezone((symbol as IOrderStopHistoryResponse).orderDateTime) || '',
            type: InformationSymbolConditionalOrderEnumType.ORDER_TIME,
          },
          {
            title: 'Order ID',
            value: (symbol as IOrderStopHistoryResponse).stopOrderID,
            type: InformationSymbolConditionalOrderEnumType.ORDER_ID,
          },
          {
            title: 'Type',
            value: (symbol.orderType === 'STOP_LIMIT' ? t('Stop Limit Order') : t('Stop Order')) as string,
            type: InformationSymbolConditionalOrderEnumType.TYPE,
          },
          {
            title: 'Channel',
            value: symbol.channel || '',
            type: InformationSymbolConditionalOrderEnumType.MTS,
            hidden: !symbol.channel,
          },
          {
            title: 'Valid',
            value: `${
              (symbol as IOrderStopHistoryResponse).fromDate?.length > 8
                ? (symbol as IOrderStopHistoryResponse).fromDate.substring(8, 20)
                : formatTimeToDisplay((symbol as IOrderStopHistoryResponse).fromDate, 'dd/MM/yyyy', 'yyyyMMdd', true)
            } - ${
              (symbol as IOrderStopHistoryResponse).toDate?.length > 8
                ? (symbol as IOrderStopHistoryResponse).toDate.substring(8, 20)
                : formatTimeToDisplay((symbol as IOrderStopHistoryResponse).toDate, 'dd/MM/yyyy', 'yyyyMMdd', true)
            }`,
            type: InformationSymbolConditionalOrderEnumType.VALID,
          },
          {
            title: 'Reason',
            value:
              (symbol as IOrderStopHistoryResponse).errorMessage != null
                ? (symbol as IOrderStopHistoryResponse).errorMessage
                : '-',
            type: InformationSymbolConditionalOrderEnumType.REASON,
          },
        ]
      : type === OrderBookScreenInitOption.ORDER_BOOK
      ? [
          {
            title: 'Order time',
            value:
              selectedAccount.type === ACCOUNT_TYPE.KIS &&
              selectedAccount.selectedSubAccount != null &&
              selectedAccount.selectedSubAccount.accountSubs[0] != null &&
              selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY
                ? (symbol as IEqtOrderHistoryMappingResponse).orderDateTime
                : formatDateStringWithTimezone((symbol as IEqtOrderHistoryMappingResponse).orderDateTime) || '',
            type: InformationSymbolOrderBookEnumType.ORDER_TIME,
          },
          {
            title: 'Order ID',
            value: (symbol as IEqtOrderHistoryMappingResponse).orderID,
            type: InformationSymbolOrderBookEnumType.ORDER_ID,
          },
          {
            title: 'Order Type',
            value: (symbol as IEqtOrderHistoryMappingResponse).orderType,
            type: InformationSymbolOrderBookEnumType.ORDER_TYPE,
          },
          {
            title: 'Matched Value',
            value: formatNumber(
              (symbol as IEqtOrderHistoryMappingResponse).matchedQuantity *
                (symbol as IEqtOrderHistoryMappingResponse).matchedPrice,
              2
            ),
            type: InformationSymbolOrderBookEnumType.MATCHED_VALUE,
          },
          {
            title: 'Unmatched Quantity',
            value: formatNumber(
              (symbol as IEqtOrderHistoryMappingResponse).orderQuantity -
                (symbol as IEqtOrderHistoryMappingResponse).matchedQuantity,
              2
            ),
            type: InformationSymbolOrderBookEnumType.UNMATCHED_QUANTITY,
          },
          {
            title: 'Expiry Date',
            value:
              (symbol as IEqtOrderHistoryMappingResponse).validity != null
                ? formatDateStringWithTimezone(
                    (symbol as IEqtOrderHistoryMappingResponse).validity as string,
                    'yyyy-MM-DD',
                    DATE_FORMAT_DISPLAY_MOMENT,
                    0
                  ) || '-'
                : '-',
            type: InformationSymbolOrderBookEnumType.EXPIRY_DATE,
            hidden:
              selectedAccount.type !== ACCOUNT_TYPE.KIS ||
              !(symbol as IEqtOrderHistoryMappingResponse).validity ||
              (selectedAccount.type === ACCOUNT_TYPE.KIS &&
                selectedAccount.selectedSubAccount?.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES &&
                (symbol as IEqtOrderHistoryMappingResponse).validity != null),
          },
          {
            title: 'Channel',
            value: (symbol as IEqtOrderHistoryMappingResponse).channel ?? '-',
            type: InformationSymbolOrderBookEnumType.CHANNEL,
          },
          {
            title: 'Reject Reason',
            value:
              typeof (symbol as IEqtOrderHistoryMappingResponse).rejectReason === 'boolean'
                ? '-'
                : ((symbol as IEqtOrderHistoryMappingResponse).rejectReason as string) || '-',
            type: InformationSymbolOrderBookEnumType.REJECT_REASON,
            hidden:
              selectedAccount.type === ACCOUNT_TYPE.KIS &&
              selectedAccount.selectedSubAccount != null &&
              selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY,
          },
        ]
      : [
          {
            title: 'Order time',
            value:
              selectedAccount.type === ACCOUNT_TYPE.KIS
                ? (symbol as IEqtOrderHistoryMappingResponse).orderDateTime
                : formatDateStringWithTimezone((symbol as IEqtOrderHistoryMappingResponse).orderDateTime) || '',
            type: InformationSymbolOrderHistoryEnumType.ORDER_TIME,
          },
          {
            title: 'Order ID',
            value: (symbol as IEqtOrderHistoryMappingResponse).orderID,
            type: InformationSymbolOrderHistoryEnumType.ORDER_ID,
          },
          {
            title: 'Order Type',
            value: (symbol as IEqtOrderHistoryMappingResponse).orderType,
            type: InformationSymbolOrderHistoryEnumType.ORDER_TYPE,
          },
          {
            title: 'Matched Value',
            value: formatNumber(
              (symbol as IEqtOrderHistoryMappingResponse).matchedQuantity *
                (symbol as IEqtOrderHistoryMappingResponse).matchedPrice,
              2
            ),
            type: InformationSymbolOrderHistoryEnumType.MATCHED_VALUE,
          },
          {
            title: 'Unmatched Quantity',
            value: formatNumber(
              (symbol as IEqtOrderHistoryMappingResponse).orderQuantity -
                (symbol as IEqtOrderHistoryMappingResponse).matchedQuantity,
              2
            ),
            type: InformationSymbolOrderHistoryEnumType.UNMATCHED_QUANTITY,
          },
          {
            title: 'Fee',
            value: formatNumber((symbol as IEqtOrderHistoryMappingResponse).tradingFee, 2),
            type: InformationSymbolOrderHistoryEnumType.FEE,
            hidden:
              selectedAccount.type === ACCOUNT_TYPE.KIS &&
              selectedAccount.selectedSubAccount != null &&
              selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY,
          },
          {
            title: 'Tax',
            value:
              symbol.sellBuyType?.toUpperCase() === 'SELL'
                ? formatNumber((symbol as IEqtOrderHistoryMappingResponse).sellingTax, 2)
                : '-',
            type: InformationSymbolOrderHistoryEnumType.TAX,
            hidden:
              selectedAccount.type === ACCOUNT_TYPE.KIS &&
              selectedAccount.selectedSubAccount != null &&
              selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY,
          },
          {
            title: 'Channel',
            value: (symbol as IEqtOrderHistoryMappingResponse).channel ?? '-',
            type: InformationSymbolOrderHistoryEnumType.CHANNEL,
            hidden:
              selectedAccount.type === ACCOUNT_TYPE.KIS &&
              selectedAccount.selectedSubAccount != null &&
              selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY,
          },
          {
            title: 'Reject Reason',
            value:
              typeof (symbol as IEqtOrderHistoryMappingResponse).rejectReason === 'boolean'
                ? '-'
                : ((symbol as IEqtOrderHistoryMappingResponse).rejectReason as string) || '-',
            type: InformationSymbolOrderHistoryEnumType.REJECT,
          },
        ];

  const fadeIn = () => {
    Animated.timing(fadeOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  const handleFadeUp = () => {
    fadeOut();
    setIsShowDetail(pre => !pre);
  };

  const handleShowDetail = () => {
    if (isShowDetail) {
      fadeOut();
      setIsShowDetail(pre => !pre);
    } else {
      fadeIn();
      setIsShowDetail(pre => !pre);
    }
  };

  const showModalCancel = () => {
    NetInfo.fetch().then(netState => {
      if (netState.isConnected) {
        dispatch(setOrderBookSymbol({ symbol: symbol, type: ModalType.CANCEL }));
      } else {
        dispatch(showModalDisconnectNetwork(true));
      }
    });
  };

  const showModalModify = () => {
    NetInfo.fetch().then(netState => {
      if (netState.isConnected) {
        dispatch(setOrderBookSymbol({ symbol: symbol, type: ModalType.MODIFY }));
      } else {
        dispatch(showModalDisconnectNetwork(true));
      }
    });
  };

  const shouldShowModifyCancel = () => {
    switch (type) {
      case OrderBookScreenInitOption.ORDER_BOOK:
        if (!('orderStatus' in symbol)) return false;
        if (selectedAccount.type === ACCOUNT_TYPE.KIS) {
          return (
            symbol.orderStatus !== ALL_ORDER_STATUS_FILTER_VALUE.CANCELLED &&
            symbol.orderStatus !== ALL_ORDER_STATUS_FILTER_VALUE.FILLED_ALL &&
            symbol.orderStatus !== ALL_ORDER_STATUS_FILTER_VALUE.FILLED &&
            symbol.orderStatus !== ALL_ORDER_STATUS_FILTER_VALUE.REJECT &&
            symbol.orderStatus !== ALL_ORDER_STATUS_FILTER_VALUE.EXPIRED &&
            symbol.orderStatus !== ALL_ORDER_STATUS_FILTER_VALUE.PARTIALLY_EXPIRED &&
            symbol.orderStatus !== ALL_ORDER_STATUS_FILTER_VALUE.ACTIVE
          );
        }
        return (
          symbol.orderStatus === ALL_ORDER_STATUS_FILTER_VALUE.PENDING ||
          symbol.orderStatus === ALL_ORDER_STATUS_FILTER_VALUE.RECEIVED
        );
      case OrderBookScreenInitOption.CONDITION_ORDER:
        if ('status' in symbol) return symbol.status === ALL_ORDER_STATUS_FILTER_VALUE.PENDING;
        return false;
      default:
        return false;
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleShowDetail} activeOpacity={0.8}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={configGrid}
          renderItem={({ item }) => {
            return <View style={[styles.col, { width: item.width }]}>{item.column(symbol)}</View>;
          }}
          keyExtractor={(_item, index) => `Table-item-index-${index}`}
          scrollEnabled={false}
        />
      </TouchableOpacity>
      {isShowDetail && (
        <Animated.View style={{ height: isShowDetail ? 'auto' : 0, opacity: fadeOpacity }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.symbolInfoStyle}
            data={InformationSymbol.map(item => item)}
            renderItem={({ item }) => (
              <SymbolRow value={item.value as string} title={item.title} hidden={item.hidden} />
            )}
            keyExtractor={(_item, index) => `key+${index}`}
            scrollEnabled={false}
          />
        </Animated.View>
      )}
      {shouldShowModifyCancel() && (
        <View style={styles.buttons}>
          <PrimaryButton
            title={'Modify'}
            onPress={showModalModify}
            containerStyle={[globalStyles.centered, styles.minWithButton, styles.buttonModify]}
            styleText={styles.largeTextStyle}
          />
          <PrimaryButton
            title={'Cancel'}
            onPress={showModalCancel}
            containerStyle={[globalStyles.centered, styles.minWithButton, styles.buttonCancel]}
            styleText={styles.largeTextStyle}
          />
        </View>
      )}
      {isShowDetail && (
        <TouchableOpacity style={styles.buttonFadeUp} onPress={handleFadeUp}>
          <View style={styles.wrapperIcon}>
            <UpIcon width={scaleSize(16)} height={scaleSize(16)} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(RenderItem);
