import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { memo, useCallback } from 'react';
import useStyles from '../styles';
import { navigate } from 'utils';
import { useAppSelector } from 'hooks';
import globalStyles from 'styles';
import { useDispatch } from 'react-redux';
import { setSelectedAccount } from 'components/AccountPicker/actions';
import { CopyTradeBtnProps } from '../type';
import { store } from 'screens/App';

interface ModalKISRequiredProps extends CopyTradeBtnProps {
  handleModal: () => void;
}

const ModalKISRequired = memo(
  ({ followingType, followingFullName, followingUsername, handleModal }: ModalKISRequiredProps) => {
    const { t } = useTranslation();
    const { styles } = useStyles();
    const dispatch = useDispatch();

    const isEKYCed = useAppSelector(state => state.accountList.KIS?.subAccounts?.[0] != null);
    const userEmail = useAppSelector(state => state.loginData?.userInfo?.email);
    const selectedAccount = useAppSelector(state => state.selectedAccount);

    const handleModalConfirm = useCallback(() => {
      if (isEKYCed) {
        const kisAccountData = store.getState().accountList.KIS;
        const subAcc = kisAccountData?.subAccounts?.[0];
        if (kisAccountData && subAcc) {
          dispatch(
            setSelectedAccount(
              {
                ...kisAccountData,
                selectedSubAccount: subAcc,
                oldType: selectedAccount.type,
                oldSelectedSubAccount: selectedAccount.selectedSubAccount,
              },
              undefined,
              { key: 'CopyTradeScreen', params: { followingType, followingUsername, followingFullName } }
            )
          );
        }
      } else {
        navigate({ key: userEmail ? 'KisEKYCAbout' : 'KisEKYCVerifyEmail', params: { sec: 'KIS', email: userEmail } });
      }
      handleModal();
    }, [isEKYCed, selectedAccount, followingType, followingUsername, followingFullName, userEmail]);

    return (
      <View style={styles.modalContentContainer}>
        <Text allowFontScaling={false} style={styles.modalHeader}>
          {t('Real trading account is required')}
        </Text>
        <View style={globalStyles.centered}>
          <Image style={styles.paaveLogo} source={require('assets/logo-paave-with-shadow.png')} />
        </View>
        <TouchableOpacity style={[styles.modalBtn, styles.btnPrimary]} onPress={handleModalConfirm}>
          <Text allowFontScaling={false} style={[styles.optionText, styles.textPrimary]}>
            {t(isEKYCed ? 'Continue with Real Account' : 'EKYC now')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalBtn} onPress={handleModal}>
          <Text allowFontScaling={false} style={styles.optionText}>
            {t('Cancel')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
);

export default ModalKISRequired;
