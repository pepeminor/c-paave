import React, { memo, useCallback, useEffect, useRef } from 'react';
import { IState } from 'reduxs/global-reducers';
import { navigationRef } from '../../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, AppStateStatus, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTranslation } from 'react-i18next';
import { showModalDisconnectNetwork } from 'reduxs/global-actions';
import useStyles from './styles';

const ModalNetworkDisconnect = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const netInfo = useNetInfo();

  const appState = useRef(AppState.currentState);
  const isShowModalDisconnectNetwork = useSelector((state: IState) => state.showModalDisconnectNetwork);

  useEffect(() => {
    if (netInfo.isConnected === false) {
      dispatch(showModalDisconnectNetwork(true));
    }
  }, [netInfo.isConnected]);

  //when navigate other screen
  useEffect(() => {
    const unsubscribe = navigationRef.addListener('state', () => {
      netInfo.isConnected != null && !netInfo.isConnected && dispatch(showModalDisconnectNetwork(true));
    });
    return unsubscribe;
  }, []);

  //when close app
  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        netInfo.isConnected != null && !netInfo.isConnected && dispatch(showModalDisconnectNetwork(true));
      }
      appState.current = nextAppState;
    };

    const appStateListener = AppState.addEventListener('change', handleAppStateChange);
    return () => appStateListener.remove();
  }, []);

  const closeModal = useCallback(() => {
    dispatch(showModalDisconnectNetwork(false));
  }, []);

  if (!isShowModalDisconnectNetwork) return null;

  return (
    <Modal visible={isShowModalDisconnectNetwork} animationType="fade" transparent={true} onRequestClose={closeModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContentContainer}>
          <View style={styles.containerImage}>
            <Image source={require('assets/networkFailed.png')} resizeMethod={'resize'} resizeMode={'stretch'} />
            <Text allowFontScaling={false} style={styles.modalNoNetworkText}>
              {t('No Network Connection')}
            </Text>
            <Text style={styles.checkYourNetworkText} allowFontScaling={false}>
              {t('Please check your network and try again.')}
            </Text>
          </View>
          <TouchableOpacity onPress={closeModal} style={styles.modalOKButton}>
            <Text allowFontScaling={false} style={styles.modalOKButtonText}>
              {t('OK')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ModalNetworkDisconnect);
