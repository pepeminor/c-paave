import React, { memo } from 'react';
import { View, Text, TouchableOpacity, FlatList, ListRenderItemInfo } from 'react-native';
import globalStyles from 'styles';
import useStyles from './styles';
import { ACCOUNT_TYPE, ALL_ORDER_STATUS_FILTER_VALUE, SELL_BUY_TYPE_FILTER_VALUE, SYSTEM_TYPE } from 'global';
import { useTranslation } from 'react-i18next';
import { scaleSize } from 'styles';
import CloseFilter from 'assets/icon/CloseFilter.svg';
import FilterSelectIcon from 'assets/icon/FilterSelectIcon.svg';
import { FilterOption, OrderStatusTypeFilter, SellBuyTypeFilter } from 'screens/OrderBook/constants';
import Modal from 'components/Modal';
import { useAppSelector } from 'hooks/useAppSelector';

type FilterModalProps = {
  currentList: ReadonlyArray<OrderStatusTypeFilter | SellBuyTypeFilter>;
  currentSelectedItem?: ALL_ORDER_STATUS_FILTER_VALUE | ALL_ORDER_STATUS_FILTER_VALUE[] | SELL_BUY_TYPE_FILTER_VALUE;
  setCurrentFilter: (filterOption: FilterOption) => void;
  visible: boolean;
  hideModal: () => void;
  type: string;
};

export const FilterModal = memo(
  ({ currentList, currentSelectedItem, setCurrentFilter, visible, hideModal, type }: FilterModalProps) => {
    const { t } = useTranslation();
    const { styles } = useStyles();
    const selectedAccount = useAppSelector(state => state.selectedAccount);

    const updateOrderFilter = (
      value: ALL_ORDER_STATUS_FILTER_VALUE | ALL_ORDER_STATUS_FILTER_VALUE[] | SELL_BUY_TYPE_FILTER_VALUE
    ) => {
      if (type === 'Status') {
        if (typeof value === 'object') {
          const isDerOrderStatusExpired = (value as ALL_ORDER_STATUS_FILTER_VALUE[]).filter(
            ele => ele === ALL_ORDER_STATUS_FILTER_VALUE.KILLED || ele === ALL_ORDER_STATUS_FILTER_VALUE.FILL_AND_KILL
          );
          const isDerOrderStatusPendingtoMarket = (value as ALL_ORDER_STATUS_FILTER_VALUE[]).filter(
            ele =>
              ele === ALL_ORDER_STATUS_FILTER_VALUE.INACTIVE ||
              ele === ALL_ORDER_STATUS_FILTER_VALUE.OUTSTANDING ||
              ele === ALL_ORDER_STATUS_FILTER_VALUE.READY_TO_SEND ||
              ele === ALL_ORDER_STATUS_FILTER_VALUE.PENDING_APPROVAL ||
              ele === ALL_ORDER_STATUS_FILTER_VALUE.SENDING ||
              ele === ALL_ORDER_STATUS_FILTER_VALUE.PENDING_TO_MARKET
          );
          const isEquityOrderStatusPendingtoMarket = (value as ALL_ORDER_STATUS_FILTER_VALUE[]).filter(
            ele =>
              ele === ALL_ORDER_STATUS_FILTER_VALUE.INACTIVE ||
              ele === ALL_ORDER_STATUS_FILTER_VALUE.READYTOSEND ||
              ele === ALL_ORDER_STATUS_FILTER_VALUE.SENDING ||
              ele === ALL_ORDER_STATUS_FILTER_VALUE.PENDINGAPPROVAL ||
              ele === ALL_ORDER_STATUS_FILTER_VALUE.WAITINGMODIFY ||
              ele === ALL_ORDER_STATUS_FILTER_VALUE.WAITINGCANCEL
          );
          if (
            selectedAccount.type === ACCOUNT_TYPE.KIS &&
            selectedAccount.selectedSubAccount != null &&
            selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
          ) {
            // status Expired Derivatives
            if (isDerOrderStatusExpired.length > 0) {
              setCurrentFilter({
                orderStatus: ALL_ORDER_STATUS_FILTER_VALUE.EXPIRED,
              });
            }
            // status Pending to market Derivatives
            if (isDerOrderStatusPendingtoMarket.length > 0) {
              setCurrentFilter({
                orderStatus: ALL_ORDER_STATUS_FILTER_VALUE.PENDING_TO_MARKET,
              });
            }
          } else {
            // status Pending to market Equity
            if (isEquityOrderStatusPendingtoMarket.length > 0) {
              setCurrentFilter({
                orderStatus: ALL_ORDER_STATUS_FILTER_VALUE.PENDING_TO_MARKET,
              });
            }
          }
        }
        if (typeof value === 'string') {
          setCurrentFilter({
            orderStatus: value as ALL_ORDER_STATUS_FILTER_VALUE,
          });
        }
      }
      if (type === 'Buy/ Sell') {
        setCurrentFilter({
          sellBuyType: value as SELL_BUY_TYPE_FILTER_VALUE,
        });
      }
      hideModal();
    };

    const renderItem = ({ item, index }: ListRenderItemInfo<OrderStatusTypeFilter | SellBuyTypeFilter>) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => updateOrderFilter(item.value)}
          style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.filterItemContainer]}
        >
          <Text
            style={[
              globalStyles.container,
              styles.filterTextValue,
              currentSelectedItem === item.value || currentSelectedItem === item.label
                ? styles.filterTextValueSelected
                : styles.filterTextValueUnselected,
            ]}
          >
            {t(item.label)}
          </Text>
          {(currentSelectedItem === item.value || currentSelectedItem === item.label) && (
            <FilterSelectIcon width={scaleSize(11)} height={scaleSize(18)} />
          )}
        </TouchableOpacity>
      );
    };
    return (
      <Modal
        visible={visible}
        onRequestClose={hideModal}
        childrenContent={
          <View
            style={[
              globalStyles.container,
              globalStyles.centered,
              globalStyles.flexDirectionRow,
              styles.modalBackground,
            ]}
          >
            <View style={[globalStyles.justifyCenter, styles.modalContentContainer]}>
              <View style={styles.topInfo} />
              <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.modalTitle]}>
                <Text allowFontScaling={false} style={[globalStyles.container, styles.filterText]}>
                  {t(type)}
                </Text>
                <TouchableOpacity onPress={hideModal}>
                  <CloseFilter width={scaleSize(24)} height={scaleSize(24)} />
                </TouchableOpacity>
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={currentList}
                renderItem={renderItem}
                style={globalStyles.containerGrow0}
              />
            </View>
            <TouchableOpacity style={globalStyles.invisibleBackground} onPress={hideModal} />
          </View>
        }
      />
    );
  }
);
