import RotatePhone from 'assets/icon/RotatePhone.svg';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import withMemo from 'HOC/withMemo';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RotatePhoneIcon extends TouchableOpacityProps {
  isLandScape?: boolean;
}

const RotatePhoneIcon = ({ isLandScape, style, ...props }: RotatePhoneIcon) => {
  return (
    <TouchableOpacity
      style={[
        style,
        isLandScape && {
          transform: [{ rotate: '-90deg' }, { scaleY: -1 }],
        },
      ]}
      {...props}
    >
      <RotatePhone />
    </TouchableOpacity>
  );
};

export default withMemo(RotatePhoneIcon);
