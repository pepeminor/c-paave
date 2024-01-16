import { TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import Icon from 'components/Icon';
import { useStyles } from './styles';
import { scaleSize } from 'styles';

type IconName = 'image-outline' | 'emoji-outline' | 'poll-outline' | 'emoji' | 'poll' | 'hash';

type Props = {
  name: IconName;
  size?: number;
  onPress?(): void;
};

export const AccessoryItem = memo(({ name, size = 16, onPress }: Props) => {
  const { styles, dynamicColors } = useStyles();

  return (
    <TouchableOpacity style={styles.accItemContainer} onPress={onPress}>
      <Icon name={name} size={scaleSize(size)} color={dynamicColors.BlueNewColor} />
    </TouchableOpacity>
  );
});
