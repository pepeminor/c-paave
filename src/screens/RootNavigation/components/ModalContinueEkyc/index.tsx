import React, { memo, useCallback } from 'react';
import { navigate } from '../../../../utils';
import { useDispatch } from 'react-redux';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { showModalDisconnectNetwork } from 'reduxs/global-actions';
import useStyles from './styles';
import { useAppSelector } from 'hooks';
import { EkycActions, EkycSelectors } from 'reduxs/Ekyc';

const ModalContinueEkyc = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const isEKYC = useAppSelector(EkycSelectors.selectIsEKYC);
  const stepCurrent = useAppSelector(EkycSelectors.selectStepCurrent);

  const [showModal, setShowModal] = React.useState(isEKYC);

  const closeModal = useCallback(() => {
    dispatch(showModalDisconnectNetwork(false));
    dispatch(EkycActions.clearDataEkycStep());
  }, []);

  const onPressOK = useCallback(() => {
    if (isEKYC) {
      setShowModal(false);
      navigate({ key: stepCurrent });
    }
  }, [isEKYC, stepCurrent]);

  if (!showModal) return null;

  return (
    <Modal visible={showModal} animationType="fade" transparent={true} onRequestClose={closeModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContentContainer}>
          <View style={styles.containerImage}>
            <Text allowFontScaling={false} style={styles.modalNoNetworkText}>
              {t('ekyc.continue')}
            </Text>
            <Text style={styles.checkYourNetworkText} allowFontScaling={false}>
              {t('ekyc.continue.description')}
            </Text>
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity onPress={closeModal} style={styles.modalCancelButton}>
              <Text allowFontScaling={false} style={styles.modalOKButtonText}>
                {t('Cancel')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressOK} style={styles.modalOKButton}>
              <Text allowFontScaling={false} style={styles.modalOKButtonText}>
                {t('OK')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ModalContinueEkyc);
