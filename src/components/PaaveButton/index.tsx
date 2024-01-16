import { isNotNil } from 'ramda-adjunct';
import React, { useCallback, useMemo, Suspense } from 'react';
import { ActivityIndicator, Image, ImageStyle, StyleProp, Text, TextStyle, View } from 'react-native';
import Icon, { IconName } from '../Icon';
import { iconStyles, textStyles, useButtonStyles } from './styles';
import { BUTTON_TYPE, IUtoButton } from './type';
import { scaleSize } from 'styles';
import { insertObjectIf } from 'utils';
import withMemo from 'HOC/withMemo';
import TouchableScale from 'components/TouchableScale';

const onlyTextButtons: BUTTON_TYPE[] = ['ONLY_TEXT', 'ONLY_TEXT_SMALL'];
const outlineButtons: BUTTON_TYPE[] = ['OUTLINE', 'OUTLINE_SMALL'];

const PaaveButton = (props: IUtoButton) => {
  const { styles: buttonStyles, dynamicColors } = useButtonStyles();
  const {
    children,
    type = 'DEFAULT',
    style,
    disabled,
    fullRounded = true,
    color = dynamicColors.BLACK,
    textColor = [...outlineButtons, ...onlyTextButtons].includes(type) ? color : dynamicColors.WHITE,
    textStyle,
    icon,
    iconStyle,
    iconSize = 16,
    isOnlyIcon,
    isScaleButton = true,
    loading,
    disableColor = dynamicColors.LIGHTGRAY,
    ...rest
  } = props;

  const finalButtonStyle = useMemo(() => {
    return [
      {
        ...buttonStyles[BUTTON_TYPE.DEFAULT],
        backgroundColor: color,
        borderColor: color,
        ...buttonStyles[type],
        ...insertObjectIf(fullRounded, { borderRadius: scaleSize(10) }),
        ...insertObjectIf(onlyTextButtons.includes(type), {
          backgroundColor: dynamicColors.Transparent,
        }),
        ...insertObjectIf(isOnlyIcon, {
          paddingHorizontal: 0,
          paddingVertical: 0,
          width: scaleSize(36),
          height: scaleSize(36),
        }),
        ...insertObjectIf(disabled, {
          backgroundColor: onlyTextButtons.includes(type) ? dynamicColors.Transparent : disableColor,
          borderColor: dynamicColors.BORDER,
          opacity: 0.5,
        }),
      },
      style,
    ];
  }, [type, style, color, disabled, fullRounded, buttonStyles, dynamicColors, disableColor]);

  const finalTextStyle = useMemo(() => {
    return [
      {
        ...textStyles[type],
        textAlign: 'center' as TextStyle['textAlign'],
        color: disabled ? dynamicColors.LIGHTGRAY : textColor,
      },
      textStyle,
    ];
  }, [type, textColor, disabled, dynamicColors]);

  const renderIcon = useCallback(() => {
    if (loading) {
      return (
        <ActivityIndicator
          animating={loading}
          size={scaleSize(14)}
          color={textColor}
          style={{ marginRight: isOnlyIcon ? 0 : scaleSize(8) }}
        />
      );
    }
    if (typeof icon === 'string') {
      const finalIconFontStyle = [
        {
          color: disabled ? dynamicColors.LIGHTGRAY : textColor,
          marginRight: scaleSize(8),
          ...insertObjectIf(isOnlyIcon, {
            marginRight: 0,
            margin: 'auto',
          }),
        },
        iconStyle,
      ];

      return <Icon name={icon as IconName} style={finalIconFontStyle} size={iconSize} />;
    }
    if (typeof icon === 'number') {
      const finalIconImageStyle: StyleProp<ImageStyle> = [
        {
          ...iconStyles[type],
          aspectRatio: 1,
          marginRight: scaleSize(8),
          ...insertObjectIf(disabled, { tintColor: dynamicColors.LIGHTGRAY }),
        },
        iconStyle,
      ];

      return <Image resizeMode="contain" source={icon} style={finalIconImageStyle} />;
    }

    return;
  }, [type, icon, textColor, disabled, iconStyle, loading, dynamicColors, iconSize]);

  return (
    <Suspense fallback={<View />}>
      <TouchableScale
        activeOpacity={isScaleButton ? 1 : 0.9}
        {...rest}
        style={finalButtonStyle}
        disabled={loading || disabled}
      >
        {renderIcon()}
        {isNotNil(children) && !isOnlyIcon && <Text style={finalTextStyle}>{children}</Text>}
      </TouchableScale>
    </Suspense>
  );
};

export default withMemo(PaaveButton);
