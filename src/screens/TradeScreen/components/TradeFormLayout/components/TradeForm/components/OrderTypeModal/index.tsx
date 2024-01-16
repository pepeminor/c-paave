import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import globalStyles from 'styles';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import { ACCOUNT_TYPE, ORDER_TYPE } from 'global';
import Modal from 'components/Modal';
import Icon, { IconWithBackground } from 'components/Icon';
import withMemo from 'HOC/withMemo';
import { useAppSelector } from 'hooks/useAppSelector';
import { LIST_ORDER_TYPE_KIS, LIST_ORDER_TYPE_VIRTUAL } from '../../TradeForm.type';

export interface IOrderTypeModalBaseProps {
  visible: boolean;
  filterSelecting: ORDER_TYPE;

  closeOrderTypeModal: () => void;
  onSelectFilter: (value: ORDER_TYPE) => void;
}

const OrderTypeModal = (props: IOrderTypeModalBaseProps) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);
  const listOrderType = selectedAccountType === ACCOUNT_TYPE.KIS ? LIST_ORDER_TYPE_KIS : LIST_ORDER_TYPE_VIRTUAL;

  return (
    <Modal
      visible={props.visible}
      onRequestClose={props.closeOrderTypeModal}
      childrenContent={
        <View style={styles.modalBackground}>
          <View style={styles.modalContentContainer}>
            <View style={styles.topInfo} />
            <View style={styles.modalTitle}>
              <Text allowFontScaling={false} style={styles.filterText}>
                {t('Type')}
              </Text>

              <IconWithBackground
                name={'close'}
                backgroundColor={dynamicColors.LIGHTBackground}
                iconColor={dynamicColors.BaliHai}
                size={20}
                onPress={props.closeOrderTypeModal}
              />
            </View>
            {listOrderType.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    props.onSelectFilter(item.value);
                    props.closeOrderTypeModal();
                  }}
                  style={styles.filterItemContainer}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      globalStyles.container,
                      styles.filterTextValue,
                      props.filterSelecting === item.value
                        ? styles.filterTextValueSelected
                        : styles.filterTextValueUnselected,
                    ]}
                  >
                    {t(item.label)}
                  </Text>
                  {props.filterSelecting === item.value && (
                    <Icon name={'check'} size={18} color={dynamicColors.Green1} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity style={globalStyles.invisibleBackground} onPress={props.closeOrderTypeModal} />
        </View>
      }
    />
  );
};

export default withMemo(OrderTypeModal);
