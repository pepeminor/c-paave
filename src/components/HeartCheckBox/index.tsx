import { StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import React, { memo, useState } from 'react';
import { scaleSize } from 'styles';
import Heart from 'assets/icon/Heart.svg';
import NoHeart from 'assets/icon/NoHeart.svg';

export interface IHeartCheckBoxProps<T> {
  readonly defaultValue?: boolean;
  readonly dataToFire: T;
  readonly onChange?: (checked: boolean, data: T) => void;
  readonly style?: StyleProp<ViewStyle>;
}

const HeartCheckBox = <T extends object>(props: IHeartCheckBoxProps<T>) => {
  const [checked, setChecked] = useState<boolean>(props.defaultValue || false);

  const onPress = () => {
    setChecked(!checked);
    props.onChange && props.onChange(!checked, props.dataToFire);
  };

  return (
    <TouchableOpacity onPress={onPress} style={props.style}>
      {checked ? (
        <Heart width={scaleSize(20)} height={scaleSize(19)} />
      ) : (
        <NoHeart width={scaleSize(20)} height={scaleSize(19)} />
      )}
    </TouchableOpacity>
  );
};

export default memo(HeartCheckBox);
