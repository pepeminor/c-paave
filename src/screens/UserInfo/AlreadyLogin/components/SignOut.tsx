import React, { useCallback } from 'react';
import { ISettingItem } from '..';
import withMemo from 'HOC/withMemo';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/useAppSelector';
import useStyles from '../styles';
import globalStyles from 'styles';
import useModalOrder from 'hooks/useModalOrder';

import { logOutAction } from '../actions';
import Icon from 'components/Icon';
import { store } from 'screens/App';

interface IItemProps {
  item: ISettingItem;
}

const Item = withMemo((props: IItemProps) => {
  const { item } = props;
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const sessionVersion: number | undefined = useAppSelector(state => state.authToken.version);

  const signOutConfirm = () => {
    store.dispatch(
      logOutAction({
        version: sessionVersion || 0,
        userLogout: true,
      })
    );
  };

  const onPress = useCallback(() => {
    item.onPress(selectedAccount.selectedSubAccount?.accountName);
    showSignoutModalComponent();
  }, [item.label]);

  const [SignoutModalComponent, showSignoutModalComponent] = useModalOrder({
    title: 'Sign Out',
    onConfirm: signOutConfirm,
    confirmText: 'Confirm',
    ListContentModal: (
      <View style={globalStyles.alignCenter}>
        <Text allowFontScaling={false} style={styles.modalDescription}>
          {t('Are you sure you want to sign out?')}
        </Text>
      </View>
    ),
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.settingContainer,
        item.borderBottom === '1' ? styles.borderBottom1 : item.borderBottom === '5' && styles.borderBottom5,
      ]}
    >
      {item.icon}
      <Text allowFontScaling={false} style={styles.settingItemText}>
        {t(item.label)}
      </Text>
      <Icon name={'arrow-right-2'} color={dynamicColors.LIGHTGRAY} size={24} />
      {SignoutModalComponent}
    </TouchableOpacity>
  );
});

export default Item;
