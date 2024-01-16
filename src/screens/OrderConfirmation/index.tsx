import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import HeaderScreen from 'components/HeaderScreen';
import DatePicker from 'components/DatePicker';
import SheetData, { ISheetDataConfig } from 'components/SheetData';
import { SELL_BUY_TYPE } from 'global';
import globalStyles, { scaleSize } from 'styles';
import CheckIcon from 'assets/icon/check.svg';
import useStyles from './styles';
import { subDays } from 'date-fns';
import BottomModal from 'components/BottomModal';
import ModalContent from './components/ModalContent';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getOrderConfirmation } from 'reduxs/global-actions';
import { useAppSelector } from 'hooks';
import { formatNumber, formatDateToString, formatTimeToDisplay } from 'utils';
import config from 'config';
import { IGetEnquirySignOrderResponse } from 'interfaces/equity';
import { ReducerStatus } from 'interfaces/reducer';
import { RESET_ORDER_CONFIRMATION } from 'reduxs/actions';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import useRefState from 'hooks/useRefState';

const OrderConfirmation = (props: StackScreenProps<'OrderConfirmation'>) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const [selectedSymbol, setSelectedSymbol] = useState<IGetEnquirySignOrderResponse[]>([]);
  const [fromDate, setFromDate] = useRefState(subDays(new Date(), 7));
  const [toDate, setToDate] = useRefState(new Date());
  const [page, setPage] = useRefState(0, false);

  const accountNo = useAppSelector(state => state.selectedAccount.selectedSubAccount?.accountNumber);
  const orderConfirmation = useAppSelector(state => state.orderConfirmation);
  const data = orderConfirmation.data;

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_ORDER_CONFIRMATION });
    };
  }, []);

  const resetData = () => {
    setPage(0);
    clearSelected();
  };

  useEffect(() => {
    resetData();
    getData();
  }, [accountNo]);

  const getData = () => {
    accountNo != null &&
      dispatch(
        getOrderConfirmation({
          accountNo: accountNo,
          fromDate: formatDateToString(fromDate.current) ?? '',
          toDate: formatDateToString(toDate.current) ?? '',
          stockSymbol: '',
          fetchCount: config.pageSize,
          offset: page.current * config.pageSize,
        })
      );
  };

  const onChangeFromDate = (value: Date) => {
    if (value > toDate.current) {
      setToDate(value);
    }
    setFromDate(value);
    resetData();
    getData();
  };

  const onChangeToDate = (value: Date) => {
    if (value < fromDate.current) {
      setFromDate(value);
    }
    setToDate(value);
    resetData();
    getData();
  };

  const handleCheckVisible = (value: IGetEnquirySignOrderResponse) => {
    return selectedSymbol.findIndex(item => item.refID === value.refID) !== -1;
  };

  const onChangeSelectedSymbol = (value: IGetEnquirySignOrderResponse) => {
    if (handleCheckVisible(value)) {
      setSelectedSymbol(symbols => symbols.filter(item => item.refID !== value.refID));
      return;
    }
    setSelectedSymbol(symbols => [...symbols, value]);
  };

  const onChangeCheckAll = () => {
    setSelectedSymbol(data);
    if (selectedSymbol.length === data.length) {
      setSelectedSymbol([]);
    } else {
      setSelectedSymbol(data);
    }
    if (selectedSymbol.length >= 1 && selectedSymbol.length < data.length) {
      setSelectedSymbol(data);
    }
  };

  const cellStyle = [globalStyles.container2, globalStyles.centered];

  const configOrderConfirmationDataGrid: ISheetDataConfig = {
    columnFrozen: 1,
    maxHeightPerRow: 36,
    header: [
      {
        label: [
          <TouchableOpacity
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              styles.btn,
              selectedSymbol.length === data.length && data.length > 0 && styles.btnIsVisible,
            ]}
            activeOpacity={0.6}
            onPress={onChangeCheckAll}
          >
            {selectedSymbol.length === data.length && data.length > 0 && (
              <CheckIcon width={scaleSize(14)} height={scaleSize(13)} />
            )}
          </TouchableOpacity>,
        ],
        width: 40,
        element: (_key: string, rowData: IGetEnquirySignOrderResponse, index: number) => (
          <View style={cellStyle}>
            <TouchableOpacity
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                styles.btn,
                handleCheckVisible(rowData) && styles.btnIsVisible,
              ]}
              key={index}
              activeOpacity={0.6}
              onPress={() => onChangeSelectedSymbol(rowData)}
            >
              <CheckIcon width={scaleSize(14)} height={scaleSize(13)} />
            </TouchableOpacity>
          </View>
        ),
      },
      {
        label: ['Symbol'],
        width: 88,
        element: (_key: string, rowData: IGetEnquirySignOrderResponse) => (
          <View style={[cellStyle, styles.border]}>
            <Text allowFontScaling={false} style={styles.text}>
              {rowData.stockSymbol}
            </Text>
          </View>
        ),
      },
      {
        label: ['B/S'],
        width: 50,
        element: (_key: string, rowData: IGetEnquirySignOrderResponse) => (
          <View style={[cellStyle, styles.border]}>
            <Text
              allowFontScaling={false}
              style={rowData.orderType === SELL_BUY_TYPE.BUY ? styles.textBuy : styles.textSell}
            >
              {rowData.orderType === SELL_BUY_TYPE.BUY ? 'Buy' : 'Sell'}
            </Text>
          </View>
        ),
      },
      {
        label: ['Qtt'],
        width: 95,
        element: (_key: string, rowData: IGetEnquirySignOrderResponse) => (
          <View style={[cellStyle, styles.border, globalStyles.alignEnd]}>
            <Text allowFontScaling={false} style={[styles.text, styles.textDinOtLight]}>
              {formatNumber(rowData.volume, 2)}
            </Text>
          </View>
        ),
      },
      {
        label: ['Price'],
        width: 105,
        element: (_key: string, rowData: IGetEnquirySignOrderResponse) => (
          <View style={[cellStyle, styles.border, globalStyles.alignEnd]}>
            <Text allowFontScaling={false} style={[styles.text, styles.textDinOtLight]}>
              {formatNumber(rowData.price, 2)}
            </Text>
          </View>
        ),
      },
      {
        label: ['Date'],
        width: 95,
        element: (_key: string, rowData: IGetEnquirySignOrderResponse) => (
          <View style={[cellStyle, styles.border]}>
            <Text allowFontScaling={false} style={styles.text}>
              {formatTimeToDisplay(rowData.date, 'dd/MM/yyyy', 'yyyyMMdd')}
            </Text>
          </View>
        ),
      },
    ],
  };

  const clearSelected = useCallback(() => {
    setSelectedSymbol([]);
  }, []);

  const [Modal, openModal] = BottomModal({
    ModalContent: ModalContent,
    modalContentProps: {
      selectedSymbol: selectedSymbol,
      clearSelected: clearSelected,
    },
  });

  const renderFooter = () => {
    if (orderConfirmation.status === ReducerStatus.LOADING && orderConfirmation.data.length > 0)
      return <Text style={styles.loadingText}>{t('Loading')}...</Text>;
    if (orderConfirmation.status === ReducerStatus.SUCCESS && orderConfirmation.data.length === 0)
      return (
        <View style={styles.noDataCon}>
          <EmptySymbol />
          <Text style={styles.noDataText}>{t('There is no data')}</Text>
        </View>
      );
    return <></>;
  };

  const onLoadMore = () => {
    if (
      orderConfirmation.status === ReducerStatus.SUCCESS &&
      orderConfirmation.data.length > 0 &&
      orderConfirmation.previous.length >= config.pageSize
    ) {
      setPage(pre => pre + 1);
      getData();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <HeaderScreen
          leftButtonIcon={true}
          goBackAction={props.navigation.goBack}
          headerTitle={'Order Confirmation'}
          subAccountVisible={true}
          disableVirtualAccount
        />
        <View style={[globalStyles.flexDirectionRow, globalStyles.fillWidth, styles.marginBottom8, styles.marginTop16]}>
          <View style={[globalStyles.container, styles.marginLeft16, styles.marginRight16]}>
            <DatePicker label={'From date'} onChange={onChangeFromDate} value={fromDate.current} maxDate={new Date()} />
          </View>
          <View style={[globalStyles.container, styles.marginRight16]}>
            <DatePicker label={'To date'} onChange={onChangeToDate} value={toDate.current} maxDate={new Date()} />
          </View>
        </View>
        <SheetData
          data={data}
          config={configOrderConfirmationDataGrid}
          renderFooter={renderFooter}
          requestLoadMore={onLoadMore}
          containerStyle={styles.sheetContainer}
        />
      </View>
      <View style={[globalStyles.alignCenter, styles.titleContainer, styles.executeFormContainer]}>
        <TouchableOpacity
          onPress={openModal}
          disabled={selectedSymbol.length === 0}
          style={[globalStyles.centered, styles.executeFormButton, selectedSymbol.length === 0 && styles.disabledBtn]}
        >
          <Text
            allowFontScaling={false}
            style={[styles.executeFormButtonText, selectedSymbol.length === 0 && styles.executeFormButtonTextDisabled]}
          >
            {t('Confirm')}
          </Text>
        </TouchableOpacity>
      </View>
      {Modal}
    </>
  );
};

export default memo(OrderConfirmation);
