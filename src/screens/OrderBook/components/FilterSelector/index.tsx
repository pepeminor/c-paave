import React, { memo, useState, useMemo, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles from 'styles';
import useStyles from './styles';
import {
  ALL_ORDER_STATUS_FILTER_VALUE,
  OrderBookScreenInitOption,
  SELL_BUY_TYPE_FILTER_VALUE,
  SYSTEM_TYPE,
} from 'global';
import { useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import { useTranslation } from 'react-i18next';
import { scaleSize } from 'styles';
import PickerArrowDown2 from 'assets/icon/PickerArrowDown2.svg';
import DatePicker from 'components/DatePicker';
import {
  FilterOption,
  OrderBookSearchTextContext,
  listConditionOrderStatus,
  listOrderHistoryDerStatus,
  listOrderHistoryStatus,
  listTodayOrderDerStatus,
  listTodayOrderStatus,
  sellBuyTypeFilterOption,
} from 'screens/OrderBook/constants';
import { isAfter, isBefore } from 'date-fns';
import { FilterModal } from '../FilterModal';
import SearchInput from 'components/SearchInput';

type FilterSelectorProps = {
  currentFilter: FilterOption;
  setCurrentFilter: (filterOption: FilterOption) => void;
};

export const FilterSelector = memo(({ currentFilter, setCurrentFilter }: FilterSelectorProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const selectedAccount = useSelector((state: IState) => state.selectedAccount);
  const optionSelecting = useSelector((state: IState) => state.orderBookScreenOption);
  const [buySellFilterModalVisible, setBuySellFilterModalVisible] = useState<boolean>(false);
  const [orderStatusFilterModalVisible, setOrderStatusFilterModalVisible] = useState<boolean>(false);
  const { value: textSearchValue, setValue: setTextSearchValue } = useContext(OrderBookSearchTextContext);

  const currentStatusList = useMemo(() => {
    switch (optionSelecting) {
      case OrderBookScreenInitOption.ORDER_BOOK:
        return selectedAccount.selectedSubAccount != null &&
          selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
          ? listTodayOrderDerStatus
          : listTodayOrderStatus[selectedAccount.type];
      case OrderBookScreenInitOption.ORDER_HISTORY:
        return selectedAccount.selectedSubAccount != null &&
          selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
          ? listOrderHistoryDerStatus
          : listOrderHistoryStatus[selectedAccount.type];
      case OrderBookScreenInitOption.CONDITION_ORDER:
        return listConditionOrderStatus[selectedAccount.type];
      default:
        return [];
    }
  }, [optionSelecting, selectedAccount]);

  const onShowBuySellFilterModal = () => {
    setBuySellFilterModalVisible(true);
  };

  const onHideBuySellFilterModal = () => {
    setBuySellFilterModalVisible(false);
  };

  const onShowOrderStatusFilterModal = () => {
    setOrderStatusFilterModalVisible(true);
  };

  const onHideOrderStatusFilterModal = () => {
    setOrderStatusFilterModalVisible(false);
  };

  const onChangeFromDate = (value: Date) => {
    if (currentFilter.toDate != null && isAfter(value, currentFilter.toDate)) {
      setCurrentFilter({ toDate: value });
    }
    setCurrentFilter({ fromDate: value });
  };

  const onChangeToDate = (value: Date) => {
    if (currentFilter.fromDate != null && isBefore(value, currentFilter.fromDate)) {
      setCurrentFilter({ fromDate: value });
    }
    setCurrentFilter({ toDate: value });
  };

  const onClearTextSearch = () => {
    setTextSearchValue('');
  };

  useEffect(() => {
    // Reset current page number
    setCurrentFilter({});
  }, [selectedAccount]);

  const statusLabel = useMemo(() => {
    if (currentFilter.orderStatus === ALL_ORDER_STATUS_FILTER_VALUE.ALL) {
      return t('Status');
    }

    const reg = `^${ALL_ORDER_STATUS_FILTER_VALUE.PENDING_TO_MARKET}|${ALL_ORDER_STATUS_FILTER_VALUE.EXPIRED}$`;

    if (currentFilter.orderStatus?.match(new RegExp(reg))) {
      return t(currentFilter.orderStatus).toUpperCase();
    }

    return currentStatusList.find(item => item.value === currentFilter.orderStatus)?.label;
  }, [currentFilter.orderStatus, currentStatusList]);

  return (
    <>
      <View style={[globalStyles.flexDirectionRow, globalStyles.fillWidth, styles.marginBottom8]}>
        <TouchableOpacity
          onPress={onShowBuySellFilterModal}
          style={[
            globalStyles.container,
            globalStyles.flexDirectionRow,
            globalStyles.alignCenter,
            styles.typePickerContainer,
            styles.marginX16,
          ]}
        >
          <Text allowFontScaling={false} style={[globalStyles.container, styles.colorLightTextContent]}>
            {currentFilter.sellBuyType === SELL_BUY_TYPE_FILTER_VALUE.ALL
              ? t('Buy/ Sell')
              : t(sellBuyTypeFilterOption.find(item => item.value === currentFilter.sellBuyType)?.label as string)}
          </Text>

          <PickerArrowDown2 width={scaleSize(24)} height={scaleSize(24)} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onShowOrderStatusFilterModal}
          style={[
            globalStyles.container,
            globalStyles.flexDirectionRow,
            globalStyles.alignCenter,
            styles.typePickerContainer,
            styles.marginRight16,
          ]}
        >
          <Text allowFontScaling={false} style={[globalStyles.container, styles.colorLightTextContent]}>
            {t(statusLabel as string)}
          </Text>
          <PickerArrowDown2 width={scaleSize(24)} height={scaleSize(24)} />
        </TouchableOpacity>
      </View>
      {optionSelecting !== OrderBookScreenInitOption.ORDER_BOOK && (
        <View style={[globalStyles.flexDirectionRow, globalStyles.fillWidth, styles.marginBottom8]}>
          <View style={[globalStyles.container, styles.marginLeft16, styles.marginRight16]}>
            <DatePicker
              label={'From date'}
              onChange={onChangeFromDate}
              value={currentFilter.fromDate}
              maxDate={optionSelecting === OrderBookScreenInitOption.CONDITION_ORDER ? undefined : new Date()}
            />
          </View>
          <View style={[globalStyles.container, styles.marginRight16]}>
            <DatePicker
              label={'To date'}
              onChange={onChangeToDate}
              value={currentFilter.toDate}
              maxDate={optionSelecting === OrderBookScreenInitOption.CONDITION_ORDER ? undefined : new Date()}
            />
          </View>
        </View>
      )}

      {optionSelecting.match(
        [OrderBookScreenInitOption.ORDER_BOOK, OrderBookScreenInitOption.ORDER_HISTORY].join('|')
      ) ? (
        <SearchInput
          containerStyle={styles.searchInput}
          onChangeText={setTextSearchValue}
          value={textSearchValue}
          hideClearIcon={textSearchValue.length === 0}
          onClear={onClearTextSearch}
        />
      ) : null}

      <FilterModal
        visible={buySellFilterModalVisible}
        hideModal={onHideBuySellFilterModal}
        currentList={sellBuyTypeFilterOption}
        currentSelectedItem={currentFilter.sellBuyType}
        setCurrentFilter={setCurrentFilter}
        type={'Buy/ Sell'}
      />
      <FilterModal
        visible={orderStatusFilterModalVisible}
        hideModal={onHideOrderStatusFilterModal}
        currentList={currentStatusList}
        currentSelectedItem={currentFilter.orderStatus}
        setCurrentFilter={setCurrentFilter}
        type={'Status'}
      />
    </>
  );
});
