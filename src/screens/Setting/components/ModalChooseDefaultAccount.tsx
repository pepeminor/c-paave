import withMemo from 'HOC/withMemo';
import ModalBottom from 'components/ModalBottom';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import ScrollPicker from 'components/ScrollPicker';
import { useAppSelector } from 'hooks/useAppSelector';
import { getStylesHook } from 'hooks/useStyles';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { SettingActions } from 'reduxs';
import { scaleSize } from 'styles';

export interface IProps {
  isVisible: boolean;
  closeModal: () => void;
}

const ModalChooseDefaultAccount = (props: IProps) => {
  const { isVisible, closeModal } = props;
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const accountListKis = useAppSelector(state => state.accountList.KIS);

  const accountList = useMemo(() => {
    return accountListKis?.subAccounts?.map(account => account.accountNumber) || [];
  }, [accountListKis?.subAccounts]);
  const userName = useAppSelector(state => state.accountList?.KIS?.username ?? '');

  const [chosenIndex, setChosenIndex] = useState(0);
  const confirmCurrentItem = useCallback((index: number) => {
    dispatch(
      SettingActions.setAccountDefault({
        userId: userName,
        sub: accountList[index],
      })
    );
    closeModal();
  }, []);

  return (
    <ModalBottom visible={isVisible} setVisible={closeModal}>
      <View style={styles.modalContainer}>
        <PaaveText type={TEXT_TYPE.BOLD_18} color={dynamicColors.BlueNewColor}>
          {t('choose.default.account')}
        </PaaveText>
      </View>
      <ScrollPicker
        currentItem={chosenIndex}
        setCurrentItem={setChosenIndex}
        data={accountList}
        containerHeight={scaleSize(200)}
        confirmCurrentItem={confirmCurrentItem}
      />
    </ModalBottom>
  );
};

const useStyles = getStylesHook({
  modalContainer: {
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
});

export default withMemo(ModalChooseDefaultAccount);
