/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import useStyles from './styles';
import HeaderScreen from 'components/HeaderScreen';
import globalStyles, { lightColors as Colors } from 'styles';
import { StackScreenProps } from 'screens/RootNavigation';
import IconOk from 'assets/icon/IconOk.svg';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import { RadioButton } from 'react-native-paper';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { ACCOUNT_TYPE, CompaniesLogo, CONNECT_SEC_FLOW } from 'global';
import { scaleSize } from 'styles';
import { setSelectedAccount } from 'components/AccountPicker/actions';
import { IAccount } from 'interfaces/common';
import useUpdateEffect from 'hooks/useUpdateEffect';
import Modal from 'components/Modal';

export enum RealAccountSec {
  KIS = 'KIS',
  // MAS = 'MAS',
  // KBSV = 'KBSV',
  // VCSC = 'VCSC',
  // JBSV = 'JBSV',
  // NHSV = 'NHSV',
}

export type IFakeTradingAccountType = {
  sec: RealAccountSec;
};

const supportedSEC = [ACCOUNT_TYPE.KIS];

const AccountTrading = (props: StackScreenProps<'AccountTrading'>) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();
  // const [connect, setConnect] = useState<number[]>([]);
  // const [connected, setConnected] = useState<number[]>([]);
  const selectedAccount = useSelector((state: IState) => state.selectedAccount);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedSec, _setSelectedSec] = useState<ACCOUNT_TYPE>(selectedAccount.type);
  const accountList = useSelector((state: IState) => state.accountList);
  const previousAccountList = useRef(accountList);

  useUpdateEffect(() => {
    Object.keys(accountList)
      .map(item => item as ACCOUNT_TYPE)
      .forEach(item => {
        if (accountList[item] && !previousAccountList.current[item]) {
          setSelectedSec(item);
        }
      });
    previousAccountList.current = accountList;
  }, [accountList]);

  const setSelectedSec = (newValue: string) => {
    _setSelectedSec(newValue as ACCOUNT_TYPE);
  };

  const goLoginReal = (item: ACCOUNT_TYPE) => {
    props.navigation.navigate(ScreenNames.LoginRealAccount, {
      sec: item as unknown as RealAccountSec,
      flow: CONNECT_SEC_FLOW.AUTH,
    });
  };

  const confirmDisconnect = () => {
    //TODO call disconect api
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const goToUserInfo = () => {
    switch (selectedSec) {
      case ACCOUNT_TYPE.VIRTUAL:
        dispatch(setSelectedAccount(accountList[ACCOUNT_TYPE.VIRTUAL]));
        break;
      default: {
        const selectedAccount = accountList[selectedSec];
        if (selectedAccount == null || selectedAccount.subAccounts == null) {
          goLoginReal(selectedSec);
          break;
        }
        dispatch(
          setSelectedAccount({
            ...selectedAccount,
            selectedSubAccount: selectedAccount.subAccounts[0],
            oldType: selectedAccount.type,
            oldSelectedSubAccount: selectedAccount.selectedSubAccount,
          } as IAccount)
        );
        break;
      }
    }
    goBack();
  };

  const onChooseSecIcon = (sec: ACCOUNT_TYPE, connected: boolean) => {
    if (connected) return () => setSelectedSec(sec);
    return () => goLoginReal(sec);
  };

  const renderItem = (item: ACCOUNT_TYPE, index: number) => {
    const connected = Object.keys(accountList).includes(item);
    return (
      <TouchableOpacity onPress={onChooseSecIcon(item, connected)} key={index}>
        <View style={[styles.boxTradingReal, globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
          <RadioButton.Android value={item} color={Colors.BlueNewColor} disabled={!connected} />
          <View style={[globalStyles.alignCenter, globalStyles.flexDirectionRow]}>
            <View key={index} style={[globalStyles.justifyCenter]}>
              {CompaniesLogo[item]}
            </View>
            <View style={[globalStyles.container, styles.connectContainer]}>
              {/* {!connect.includes(item.id) && (
                <>
                  <TouchableOpacity
                    key={index}
                    onPress={() => confirmLogout(item.id)}
                    style={[globalStyles.centered, styles.connectButton]}
                  >
                    <Text style={[styles.textButton]}>Connect</Text>
                  </TouchableOpacity>
                </>
              )}
              {connect.includes(item.id) && !connected.includes(item.id) && (
                <View style={[globalStyles.centered]}>
                  <View style={[globalStyles.flexDirectionRow, globalStyles.centered]}>
                    <IconOk height={scaleSize(14)} width={scaleSize(14)} />
                    <Text style={[styles.textConnected]}>Connected</Text>
                  </View>
                  <Text style={[styles.textDisconnect]}>(disconnect)</Text>
                </View>
              )} */}

              <View key={index}>
                {connected ? (
                  <View key={index} style={[globalStyles.centered, styles.connectButton]}>
                    <View style={[globalStyles.flexDirectionRow, globalStyles.centered]}>
                      <IconOk height={scaleSize(14)} width={scaleSize(14)} />
                      <Text style={styles.textConnected}>{t('Connected')}</Text>
                    </View>
                    {/* <Text style={styles.textDisconnect}>({t('disconnect')})</Text> */}
                  </View>
                ) : (
                  <View key={index} style={[globalStyles.centered, styles.connectButton]}>
                    <Text style={styles.textButton}>{t('Connect')}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <HeaderScreen leftButtonIcon={true} goBackAction={goBack} headerTitle={'Trading Account'} />
      <View style={globalStyles.container}>
        <RadioButton.Group onValueChange={setSelectedSec} value={selectedSec}>
          <View style={styles.TitleTextContainer2}>
            <Text allowFontScaling={false} style={styles.TitleText}>
              {t('Virtual trading account')}
            </Text>
            <TouchableOpacity onPress={onChooseSecIcon(ACCOUNT_TYPE.VIRTUAL, true)}>
              <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.containerCheckbox]}>
                <RadioButton.Android value={ACCOUNT_TYPE.VIRTUAL} color={Colors.BlueNewColor} />
                <View style={[globalStyles.alignCenter, globalStyles.flexDirectionRow]}>
                  {CompaniesLogo[ACCOUNT_TYPE.VIRTUAL]}
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.border} />
          <View style={styles.TitleTextContainer}>
            <Text allowFontScaling={false} style={styles.TitleText}>
              {t('Real trading account')}
            </Text>
          </View>
          {supportedSEC.map(renderItem)}
        </RadioButton.Group>
      </View>
      <TouchableOpacity
        style={[
          globalStyles.centered,
          styles.executeFormButton,
          selectedSec === selectedAccount.type ? styles.executeFormDisableButton : styles.executeFormEnableButton,
        ]}
        onPress={() => goToUserInfo()}
        disabled={selectedSec === selectedAccount.type}
      >
        <Text style={styles.executeFormButtonText}>{t('Confirm')}</Text>
      </TouchableOpacity>

      {/* MODAL DISCONNECT */}
      {modalVisible && (
        <Modal
          visible={modalVisible}
          onRequestClose={closeModal}
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
                <View style={[globalStyles.centered, styles.modalTitle]}>
                  <Text allowFontScaling={false} style={[styles.modalTitleText]}>
                    {t('Disconnect Account')}
                  </Text>
                </View>

                <View style={[globalStyles.alignCenter, styles.textDisconnectAccountContainer]}>
                  <Text style={[styles.textDisconnectAccoun]}>
                    {t(`Are you sure you want to disconnect your ${selectedSec} trading account?`)}
                  </Text>
                  {/* <Text style={[styles.textDisconnectAccount]}></Text> */}
                </View>

                <View style={[styles.editMarginBottom]}></View>

                <View style={[globalStyles.justifyCenter, styles.modalActionGroup]}>
                  <TouchableOpacity
                    style={[globalStyles.centered, styles.modalConfirmButton]}
                    onPressIn={confirmDisconnect}
                  >
                    <Text allowFontScaling={false} style={styles.executeFormButtonText}>
                      {t('Disconnect')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[globalStyles.centered, styles.modalCancelButton]} onPress={closeModal}>
                    <Text allowFontScaling={false} style={styles.cancelFormButtonText}>
                      {t('Cancel')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }
        />
      )}
    </View>
  );
};

export default AccountTrading;
