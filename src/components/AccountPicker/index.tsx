import React, { memo, useCallback, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import useStyle from './styles';
import NewModalContent from './NewModalContent';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/useAppSelector';
import Icon from 'components/Icon';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { ACCOUNT_TYPE } from 'global';
import ModalBottom from 'components/ModalBottom';

type AccountPickerProps = {
  disableVirtualAccount?: boolean;
  kisAccountNoSub?: boolean;
  currentScreen?: ScreenNames;
  isNotSubD?: boolean;
};

function AccountPicker({ disableVirtualAccount, kisAccountNoSub, currentScreen, isNotSubD }: AccountPickerProps) {
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const leaderBoardAccountSelector = useAppSelector(state => state.leaderboardAccountSelector);
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyle();

  const isLeaderBoardScreen = currentScreen === ScreenNames.LeaderBoard;

  const normalText = kisAccountNoSub
    ? selectedAccount.username
    : t(selectedAccount.selectedSubAccount?.accountNumber || (selectedAccount.username as string));

  const handleHeaderText = useCallback(() => {
    if (isLeaderBoardScreen) {
      if (leaderBoardAccountSelector === ACCOUNT_TYPE.KIS) {
        return t('Kis Account');
      } else {
        return t('Virtual Account');
      }
    } else {
      return normalText || '';
    }
  }, [isLeaderBoardScreen, normalText, leaderBoardAccountSelector, currentScreen]);

  const openBottomModal = useCallback(() => {
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      {isLeaderBoardScreen ? (
        <TouchableOpacity style={styles.accountTypeContainer} onPress={openBottomModal}>
          <Text allowFontScaling={false} style={styles.accountType}>
            {leaderBoardAccountSelector}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.accountTypeContainer} onPress={openBottomModal}>
          <Text allowFontScaling={false} style={styles.accountType}>
            {selectedAccount.type}
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.accountContainer} onPress={openBottomModal}>
        <Text allowFontScaling={false} style={styles.account}>
          {handleHeaderText()}
        </Text>
        <Icon name={'arrow-down-2'} color={dynamicColors.WHITE} size={16} />
      </TouchableOpacity>
      {visible && (
        <ModalBottom visible={visible} setVisible={setVisible} showCloseButton={false}>
          <NewModalContent
            isSelectedVirtualAccount={
              isLeaderBoardScreen
                ? leaderBoardAccountSelector === ACCOUNT_TYPE.VIRTUAL
                : selectedAccount.type === ACCOUNT_TYPE.VIRTUAL
            }
            kisAccountNoSub={kisAccountNoSub}
            isLeaderBoardScreen={isLeaderBoardScreen}
            isNotSubD={isNotSubD}
            disableVirtualAccount={disableVirtualAccount}
            closeModal={closeModal}
          />
        </ModalBottom>
      )}
    </View>
  );
}
export default memo(AccountPicker);
