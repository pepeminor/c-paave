import { Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { useStyles } from './styles';
import Icon from 'components/Icon';
import { useTranslation } from 'react-i18next';

type Props = {
  addNewPoll: () => void;
};

export const NewPollItem = memo(({ addNewPoll }: Props) => {
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.newItemContent} onPress={addNewPoll}>
      <View style={styles.addOptionIcon}>
        <Icon name="add" size={20} color={dynamicColors.BACKGROUND_MODAL3} />
      </View>
      <Text allowFontScaling={false}>{t('new_post_screen.new_poll_item')}</Text>
    </TouchableOpacity>
  );
});
