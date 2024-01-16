import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import useStyles from './styles';
import Modal from 'components/Modal';
import { useAppSelector } from 'hooks/useAppSelector';
import { RESET } from 'reduxs/action-type-utils';
import { REAL_TRADING_POST_EQT_ORDER_ODD_LOT_MODAL } from 'reduxs/actions';
import { store } from 'screens/App';

const handleCloseOddLotModal = () => {
  store.dispatch({ type: RESET(REAL_TRADING_POST_EQT_ORDER_ODD_LOT_MODAL) });
};

const OddLotModal = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const oddLotModal = useAppSelector(state => state.oddLotModal);
  const oddLotOrderDetails = useAppSelector(state => state.oddLotOrderDetails);

  if (!oddLotModal) return null;
  return (
    <Modal
      visible={oddLotModal}
      onRequestClose={handleCloseOddLotModal}
      childrenContent={
        <View style={styles.modalBackground2}>
          <View style={styles.modalContentContainer2}>
            <View style={styles.modalTitle2}>
              <Text allowFontScaling={false} style={styles.modalTitleText}>
                {t('oddLotOrderDetails')}
              </Text>
            </View>
            <View style={styles.executeModalEachItem2}>
              <Text allowFontScaling={false} style={styles.executeLabelText}>
                {t('orderOddLotQuantity')}: {oddLotOrderDetails.oddLot.quantity}{' '}
                <Text style={oddLotOrderDetails.oddLot.status ? styles.successColor : styles.failedColor}>
                  {oddLotOrderDetails.oddLot.status ? t('Success') : t('Failed')}
                </Text>
              </Text>
              <Text allowFontScaling={false} style={styles.executeLabelText}>
                {t('orderLoQuantity')}: {oddLotOrderDetails.LO.quantity}{' '}
                <Text style={oddLotOrderDetails.LO.status ? styles.successColor : styles.failedColor}>
                  {oddLotOrderDetails.LO.status ? t('Success') : t('Failed')}
                </Text>
              </Text>
            </View>
            <View style={styles.paddingHorizontal16}>
              <View style={styles.marginBottom}>
                <TouchableOpacity onPress={handleCloseOddLotModal} style={styles.executeFormButton2}>
                  <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
                    {t('OK')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      }
    />
  );
};

export default memo(OddLotModal);
