import React, { useCallback } from 'react';
import { ISettingItem } from '..';
import withMemo from 'HOC/withMemo';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'components/Icon';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/useAppSelector';
import useStyles from '../styles';

interface IItemProps {
  item: ISettingItem;
}

const Item = (props: IItemProps) => {
  const { item } = props;
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();
  const selectedAccount = useAppSelector(state => state.selectedAccount);

  const onPress = useCallback(() => {
    item.onPress(selectedAccount.selectedSubAccount?.accountName);
  }, [item.label]);

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
    </TouchableOpacity>
  );
};

export default withMemo(Item);
