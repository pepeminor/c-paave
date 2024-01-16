// import withMemo from 'HOC/withMemo'
import { useColors } from 'hooks/useStyles';
import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { IconProps } from 'react-native-vector-icons/Icon';
import icoMoonConfig from '../config.json';
import { IconName } from '../type';
import withMemo from 'HOC/withMemo';
import { scaleSize } from 'styles';

const IconIcoMoon = createIconSetFromIcoMoon(icoMoonConfig);

interface IProps extends IconProps {
  name: IconName;
  size?: number;
}

const Icon = (props: IProps) => {
  const dynamicColors = useColors();

  const { color = dynamicColors.BLACK, size = scaleSize(12), ...rest } = props;

  return <IconIcoMoon color={color} size={size} {...rest} />;
};

export default withMemo(Icon);
