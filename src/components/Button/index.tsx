import React, { memo, useMemo } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import useStyles from './styles';
import useMemoizedStyles from 'hooks/useMemoizedStyles';
import { useTranslation } from 'react-i18next';
import { ButtonMeta, ButtonType } from './Button.type';

interface Props extends TouchableOpacityProps {
  label: string;
  buttonType: ButtonType;
}

const Button = ({ label, buttonType, style: touchableStyle, ...props }: Props) => {
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();

  const ButtonMeta: ButtonMeta = useMemo(
    () => ({
      Primary: {
        container: {
          backgroundColor: dynamicColors.BlueNewColor,
        },
        textStyle: {
          color: dynamicColors.WHITE,
        },
      },
      Secondary: {
        container: {
          backgroundColor: dynamicColors.LIGHTBackground,
        },
        textStyle: {
          color: dynamicColors.BLACK,
        },
      },
    }),
    [styles, dynamicColors]
  );

  const memoizedStyles = useMemoizedStyles({
    container: [styles.container, ButtonMeta[buttonType].container, touchableStyle],
    textStyle: [styles.textStyle, ButtonMeta[buttonType].textStyle],
  });

  return (
    <TouchableOpacity style={memoizedStyles.container} {...props}>
      <Text allowFontScaling={false} style={memoizedStyles.textStyle}>
        {t(label)}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(Button);
