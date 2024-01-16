import React, { memo, useCallback, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import useStyles from './styles';
import { scaleSize } from 'styles';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
import { IState } from 'reduxs/global-reducers';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAccount } from '../actions';
import { IAccount, ISubAccount } from 'interfaces/common';
import { insertObjectIfElse, mapV2, navigate } from 'utils';
import { useTranslation } from 'react-i18next';
import { BaseBottomModalProps } from 'components/BottomModal';
import Icon from 'components/Icon';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { LEADER_BOARD_ACCOUNT_SELECTOR } from 'reduxs/actions';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import Animated, {
  SlideInLeft,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  SlideOutLeft,
  SlideOutRight,
  runOnJS,
} from 'react-native-reanimated';
import Logo from 'assets/logo/LogoPaave.svg';
import LogoKis from 'assets/logo/LogoKis.svg';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { HitSlop } from 'constants/enum';
import LoginRequired from 'components/LoginRequired';
import PaaveButton from 'components/PaaveButton';
import { BUTTON_TYPE } from 'components/PaaveButton/type';
import { isNilOrEmpty } from 'ramda-adjunct';

export interface ModalContentProps extends BaseBottomModalProps {
  disableVirtualAccount?: boolean;
  kisAccountNoSub?: boolean;
  isNotSubD?: boolean;
  isSelectedVirtualAccount: boolean;
  isLeaderBoardScreen: boolean;
}

const AccountModal = ({
  closeModal,
  disableVirtualAccount = false,
  kisAccountNoSub,
  isNotSubD,
  isSelectedVirtualAccount,
  isLeaderBoardScreen,
}: ModalContentProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles, dynamicColors } = useStyles();

  const selectedAccount = useSelector((state: IState) => state.selectedAccount);

  const accountList = useSelector((state: IState) => state.accountList);

  const [selectedVirtual, setSelectedVirtual] = useState(isSelectedVirtualAccount);

  const selectedAccountList = getSelectedAccountList(
    accountList[selectedVirtual ? ACCOUNT_TYPE.VIRTUAL : ACCOUNT_TYPE.KIS]?.subAccounts ?? [],
    selectedAccount,
    kisAccountNoSub,
    isNotSubD
  );

  const confirmCurrentItem = useCallback(
    (item: number) => () => {
      if (isLeaderBoardScreen) {
        dispatch({ type: LEADER_BOARD_ACCOUNT_SELECTOR, payload: ACCOUNT_TYPE.KIS });
        closeModal();
        return;
      }

      dispatch(
        setSelectedAccount({
          ...accountList[ACCOUNT_TYPE.KIS],
          selectedSubAccount: selectedAccountList[item],
          oldType: selectedAccount.type,
          oldSelectedSubAccount: selectedAccount.selectedSubAccount,
        } as IAccount)
      );
      closeModal();
    },
    [accountList, selectedAccountList, selectedAccount, closeModal, isLeaderBoardScreen, closeModal]
  );

  const onPressVirtualAccount = useCallback(() => {
    if (isLeaderBoardScreen) {
      dispatch({ type: LEADER_BOARD_ACCOUNT_SELECTOR, payload: ACCOUNT_TYPE.VIRTUAL });
      closeModal();
      return;
    }
    dispatch(setSelectedAccount({ ...accountList[ACCOUNT_TYPE.VIRTUAL], oldType: selectedAccount.type }));
    closeModal();
  }, [isLeaderBoardScreen, selectedAccount.type, closeModal, accountList]);

  const onPressVirtual = useCallback(() => {
    if (disableVirtualAccount) return;
    setSelectedVirtual(true);
    offset.value = -100;
  }, [disableVirtualAccount]);

  const onPressReal = useCallback(() => {
    setSelectedVirtual(false);
    offset.value = 100;
  }, []);

  const onPressConnectAccount = useCallback(() => {
    closeModal();
    navigate({ key: ScreenNames.AccountTrading });
  }, [closeModal]);

  const offset = useSharedValue(insertObjectIfElse(selectedVirtual, -100, 100));

  const defaultSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value, {
            damping: 15,
            stiffness: 100,
          }),
        },
      ],
    };
  });

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      if (disableVirtualAccount) return;
      if (e.translationY > 100) {
        runOnJS(closeModal)();

        return;
      }

      if (e.translationX > 20 || e.translationX < -20) {
        offset.value = -e.translationX;
      }
    })
    .onEnd(() => {
      if (offset.value < 0) {
        runOnJS(onPressVirtual)();
        return;
      }
      runOnJS(onPressReal)();
    })
    .hitSlop(HitSlop);

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <View style={styles.modalHeader}>
          <View style={styles.stickHeader} />
          <View style={styles.containerHeader}>
            <View style={styles.tabContainer}>
              <TouchableOpacity style={styles.textContainer} onPress={onPressVirtual} disabled={disableVirtualAccount}>
                <PaaveText
                  type={insertObjectIfElse(selectedVirtual, TEXT_TYPE.BOLD_14, TEXT_TYPE.REGULAR_14)}
                  color={disableVirtualAccount ? dynamicColors.DARKTextDisable : dynamicColors.BlueNewColor}
                >
                  {t('Virtual')}
                </PaaveText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.textContainer} onPress={onPressReal}>
                <PaaveText
                  type={insertObjectIfElse(selectedVirtual, TEXT_TYPE.REGULAR_14, TEXT_TYPE.BOLD_14)}
                  color={dynamicColors.BlueNewColor}
                >
                  {t('Real')}
                </PaaveText>
              </TouchableOpacity>
            </View>
            <Animated.View style={[styles.bottomTab, defaultSpringStyles]} />
          </View>
        </View>

        {selectedAccount.type !== ACCOUNT_TYPE.DEMO && (
          <View style={styles.modalContent}>
            {selectedVirtual && (
              <Animated.View entering={SlideInLeft.duration(400)} exiting={SlideOutLeft.duration(400)}>
                <TouchableOpacity style={styles.containerItem} onPress={onPressVirtualAccount}>
                  <View style={styles.containerIcon}>
                    {!isLeaderBoardScreen && isSelectedVirtualAccount && (
                      <Icon name={'check'} color={dynamicColors.BlueNewColor} size={24} />
                    )}
                  </View>
                  <PaaveText
                    style={styles.textNameAccount}
                    type={insertObjectIfElse(isSelectedVirtualAccount, TEXT_TYPE.BOLD_14, TEXT_TYPE.REGULAR_14)}
                    color={insertObjectIfElse(
                      isSelectedVirtualAccount,
                      dynamicColors.BlueNewColor,
                      dynamicColors.BLACK
                    )}
                  >
                    {t('Virtual Account')}
                  </PaaveText>
                  <View style={styles.containerLogo}>
                    <Logo width={scaleSize(80)} height={scaleSize(34)} />
                  </View>
                </TouchableOpacity>
              </Animated.View>
            )}
            {!selectedVirtual && (
              <>
                {isLeaderBoardScreen && (
                  <Animated.View entering={SlideInRight.duration(400)} exiting={SlideOutRight.duration(400)}>
                    <TouchableOpacity style={styles.containerItem} onPress={confirmCurrentItem(0)}>
                      <View style={styles.containerIcon} />
                      <PaaveText
                        style={styles.textNameAccount}
                        type={insertObjectIfElse(isSelectedVirtualAccount, TEXT_TYPE.REGULAR_14, TEXT_TYPE.BOLD_14)}
                        color={insertObjectIfElse(
                          isSelectedVirtualAccount,
                          dynamicColors.BLACK,
                          dynamicColors.BlueNewColor
                        )}
                      >
                        {t('Kis Account')}
                      </PaaveText>
                      <View style={styles.containerLogo}>
                        <LogoKis width={scaleSize(80)} height={scaleSize(34)} />
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                )}
                {!isLeaderBoardScreen &&
                  mapV2(accountList.KIS?.subAccounts, (item, index) => {
                    const isSelected = selectedAccount.selectedSubAccount?.accountNumber === item.accountNumber;
                    const subNormalAccount = item.accountNumber.match('X') ? t('normal_account') : t('margin_account');
                    return (
                      <Animated.View
                        key={index}
                        entering={SlideInRight.duration(400)}
                        exiting={SlideOutRight.duration(400)}
                      >
                        <TouchableOpacity style={styles.containerItem} onPress={confirmCurrentItem(index)}>
                          <View style={styles.containerIcon}>
                            {isSelected && <Icon name={'check'} color={dynamicColors.BlueNewColor} size={24} />}
                          </View>
                          <View style={styles.textNameAccount}>
                            <PaaveText
                              type={insertObjectIfElse(isSelected, TEXT_TYPE.BOLD_14, TEXT_TYPE.REGULAR_14)}
                              color={insertObjectIfElse(isSelected, dynamicColors.BlueNewColor, dynamicColors.BLACK)}
                            >
                              {item.accountNumber}
                            </PaaveText>
                            <PaaveText type={TEXT_TYPE.REGULAR_12} color={dynamicColors.BaliHai}>
                              {insertObjectIfElse(
                                item.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES,
                                t('derivatives_account'),
                                subNormalAccount
                              )}
                            </PaaveText>
                          </View>

                          <View style={styles.containerLogo}>
                            <LogoKis width={scaleSize(80)} height={scaleSize(34)} />
                          </View>
                        </TouchableOpacity>
                      </Animated.View>
                    );
                  })}
              </>
            )}

            {!selectedVirtual && !isLeaderBoardScreen && isNilOrEmpty(accountList?.KIS?.subAccounts) && (
              <Animated.View
                style={styles.containerEmpty}
                entering={SlideInRight.duration(400)}
                exiting={SlideOutRight.duration(400)}
              >
                <Image style={styles.paaveLogo} source={require('assets/logo-paave-with-shadow.png')} />

                <PaaveText type={TEXT_TYPE.REGULAR_14} color={dynamicColors.BLACK}>
                  {t('connect.real.account.description')}
                </PaaveText>
                <PaaveButton
                  type={BUTTON_TYPE.SOLID}
                  color={dynamicColors.BlueNewColor}
                  textColor={dynamicColors.WHITE}
                  style={styles.buttonConnect}
                  onPress={onPressConnectAccount}
                >
                  {t('Connect to your real accounts')}
                </PaaveButton>
              </Animated.View>
            )}
          </View>
        )}
        {selectedAccount.type === ACCOUNT_TYPE.DEMO && (
          <View style={styles.modalContent}>
            <LoginRequired style={styles.containerRequireLogin} onPressButton={closeModal} />
          </View>
        )}
      </View>
    </GestureDetector>
  );
};

export default memo(AccountModal);

function getSelectedAccountList(
  accountList: ISubAccount[],
  selectedAccount: IAccount,
  kisAccountNoSub?: boolean,
  isNotSubD?: boolean
) {
  if (kisAccountNoSub && selectedAccount.selectedSubAccount != null) {
    return [selectedAccount.selectedSubAccount];
  }

  if (isNotSubD) return accountList.filter(ele => !ele.accountNumber.includes('D'));
  if (kisAccountNoSub && accountList.length > 1) return [accountList[0]];
  return accountList;
}
