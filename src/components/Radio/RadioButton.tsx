import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React, { memo } from 'react';
import IconChoose from 'assets/icon/IconChooese.svg';
import UnChoose from 'assets/icon/UnChooese.svg';
import { scaleSize } from 'styles';

interface Props extends TouchableOpacityProps {
  enabled?: boolean;
  size?: number;
}

export const RadioButton = memo(({ enabled = false, size = 20, ...touchableProps }: Props) => {
  return (
    <TouchableOpacity {...touchableProps}>
      {enabled ? (
        <IconChoose height={scaleSize(size)} width={scaleSize(size)} />
      ) : (
        <UnChoose height={scaleSize(size)} width={scaleSize(size)} />
      )}
    </TouchableOpacity>
  );
});
