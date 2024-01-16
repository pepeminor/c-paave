import { TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback } from 'react';
import { useStyles } from './styles';
import TextInput from 'components/TextInput';
import globalStyles from 'styles';
import { useTranslation } from 'react-i18next';
import Icon from 'components/Icon';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { PollData } from 'components/SocialTextInput/types';

type Props = {
  data: PollData;
  updatePolls: (updateItem: PollData) => void;
  drag: () => void;
  isActive: boolean;
};

export const PollItem = memo(({ data, updatePolls, drag, isActive }: Props) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  const onChangeText = useCallback(
    (value: string) => {
      updatePolls({
        data: value,
        id: data.id,
      });
    },
    [data.id, updatePolls]
  );

  return (
    <ScaleDecorator>
      <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <View style={styles.checkCircle} />
          <TextInput
            placeholder={t('new_post_screen.poll_item_placeholder', {
              index: data.id + 1,
            })}
            value={data.data}
            onChangeText={onChangeText}
            multiline
            style={styles.textInputStyle}
            wholeContainerStyle={globalStyles.container}
          />
        </View>
        <TouchableOpacity style={styles.dragIcon} disabled={isActive} onLongPress={drag}>
          <Icon name="drag" size={20} color={dynamicColors.BACKGROUND_MODAL3} />
        </TouchableOpacity>
      </View>
    </ScaleDecorator>
  );
});
