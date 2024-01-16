import React, { LegacyRef, memo, useCallback, useState } from 'react';
import {
  View,
  Text,
  ViewStyle,
  StyleProp,
  TextStyle,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  TouchableWithoutFeedback,
} from 'react-native';
import EyeIcon from 'assets/icon/Eye.svg';
import ClearTextIcon from 'assets/icon/ClearTextIcon.svg';
import EyeDisableIcon from 'assets/icon/Eye-disable.svg';
import { scaleSize } from 'styles';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';

const HitSlop = { top: 8, bottom: 8, left: 0, right: 0 };

export interface ITextInputProps extends TextInputProps {
  readonly wholeContainerStyle?: StyleProp<ViewStyle>;
  readonly textInputContainerStyle?: StyleProp<ViewStyle>;
  readonly textInputStyle?: StyleProp<TextStyle>;
  readonly labelTextStyle?: StyleProp<TextStyle>;
  readonly labelText?: string;
  readonly icon?: Element;
  readonly iconRight?: Element;
  readonly tickRightIcon?: Element;
  readonly crossRightIcon?: Element;
  readonly eyeIconHeight?: number;
  readonly eyeIconWidth?: number;
  readonly eyeIconStyle?: StyleProp<ViewStyle>;
  readonly error?: boolean;
  readonly errorContent?: string;
  readonly clearTextIcon?: boolean;
  readonly ref1?: LegacyRef<TextInput>;
  readonly styleTextError?: Element;
}

const TextInputComponent = (props: ITextInputProps) => {
  const { styles, dynamicColors } = useStyles();
  const {
    wholeContainerStyle,
    textInputContainerStyle,
    labelTextStyle,
    textInputStyle,
    labelText,
    icon,
    iconRight,
    eyeIconHeight,
    eyeIconWidth,
    eyeIconStyle,
    secureTextEntry,
    error,
    errorContent,
    crossRightIcon,
    styleTextError,
    clearTextIcon,
    placeholder = '',
    placeholderTextColor = dynamicColors.LIGHTTextTitle,
    blurOnSubmit = !props.multiline,
    textContentType = 'none',
    ...textInputProps
  } = props;
  const { t } = useTranslation();

  const [passwordVisible, setPasswordVisible] = useState(!secureTextEntry);
  const [version, setVersion] = useState(0);
  const textInputRef = React.useRef<TextInput>(null);

  const onChangePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onClearText = () => {
    if (props.value == null) {
      // uncontrolled
      setVersion(version + 1);
    }
    props.onChangeText && props.onChangeText('');
  };

  const onPressTextInput = useCallback(() => {
    textInputRef.current?.focus();
  }, []);

  return (
    <View style={wholeContainerStyle}>
      {labelText != null && (
        <Text allowFontScaling={false} style={labelTextStyle}>
          {t(labelText)}
        </Text>
      )}
      <TouchableWithoutFeedback onPress={onPressTextInput}>
        <View style={textInputContainerStyle}>
          {icon}
          <TextInput
            key={version}
            placeholder={t(placeholder)}
            placeholderTextColor={placeholderTextColor}
            style={[styles.defaultInputStyle, textInputStyle]}
            secureTextEntry={!passwordVisible}
            ref={textInputRef}
            blurOnSubmit={blurOnSubmit}
            autoCorrect={false}
            textContentType={textContentType}
            {...textInputProps}
          />
          {iconRight}
          {clearTextIcon === true && (
            <TouchableOpacity onPress={onClearText} hitSlop={HitSlop}>
              <ClearTextIcon height={scaleSize(16)} width={scaleSize(16)} style={styles.marginHorizontal} />
            </TouchableOpacity>
          )}
          {secureTextEntry != null &&
            (passwordVisible === false ? (
              <TouchableOpacity onPress={onChangePasswordVisible} hitSlop={HitSlop}>
                <EyeDisableIcon height={eyeIconHeight} width={eyeIconWidth} style={eyeIconStyle} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={onChangePasswordVisible} hitSlop={HitSlop}>
                <EyeIcon height={eyeIconHeight} width={eyeIconWidth} style={eyeIconStyle} />
              </TouchableOpacity>
            ))}
          {error && crossRightIcon}
        </View>
      </TouchableWithoutFeedback>
      {error && errorContent && (
        <Text allowFontScaling={false} style={styleTextError ?? styles.errorContent}>
          {t(errorContent)}
        </Text>
      )}
    </View>
  );
};

export default memo(TextInputComponent);
