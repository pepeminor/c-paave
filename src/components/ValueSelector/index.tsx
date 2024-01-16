import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import TextInputComponent, { ITextInputProps } from 'components/TextInput';
import IconPlus from 'assets/icon/IconPlus.svg';
import IconMinus from 'assets/icon/IconMinus.svg';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';

export interface ValueSelectorProps extends ITextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  buttonLeftStyle?: StyleProp<ViewStyle>;
  buttonRightStyle?: StyleProp<ViewStyle>;
  error: boolean;
  errorContent: string;
  label?: string;
  isMinusDisabled?: boolean;
  isPlusDisabled?: boolean;
  onMinus?: () => void;
  onPlus?: () => void;
  BottomSelector?: React.ReactNode;
}

const ValueSelector = ({
  containerStyle,
  buttonLeftStyle,
  buttonRightStyle,
  error,
  errorContent,
  label,
  isMinusDisabled,
  isPlusDisabled,
  onFocus,
  onBlur,
  onMinus,
  onPlus,
  BottomSelector,
  ...textInputProps
}: ValueSelectorProps) => {
  const [isFocusing, setIsFocusing] = React.useState(false);

  const { t } = useTranslation();
  const { styles } = useStyles();

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocusing(true);
    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocusing(false);
    onBlur?.(e);
  };

  return (
    <View>
      {label != null && (
        <Text allowFontScaling={false} style={[styles.titleStyle, globalStyles.alignCenter]}>
          {t(label)}
        </Text>
      )}
      <View
        style={[
          isFocusing ? styles.rootFocusing : error === true ? styles.errRoot : styles.root,
          globalStyles.flexDirectionRow,
          globalStyles.alignCenter,
          containerStyle,
        ]}
      >
        <TouchableOpacity
          onPress={onMinus}
          style={[styles.buttonLeft, globalStyles.centered, isMinusDisabled && styles.buttonDisabled, buttonLeftStyle]}
          disabled={isMinusDisabled}
        >
          <IconMinus width={scaleSize(14)} height={scaleSize(14)} />
        </TouchableOpacity>
        <TextInputComponent
          wholeContainerStyle={[globalStyles.container, globalStyles.justifyCenter, styles.textInTextInput]}
          textInputContainerStyle={[globalStyles.container, globalStyles.justifyCenter]}
          textInputStyle={[globalStyles.container, error ? styles.errQuantity : styles.quantity]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...textInputProps}
        />
        <TouchableOpacity
          onPress={onPlus}
          style={[styles.buttonRight, globalStyles.centered, isPlusDisabled && styles.buttonDisabled, buttonRightStyle]}
          disabled={isPlusDisabled}
        >
          <IconPlus width={scaleSize(14)} height={scaleSize(14)} />
        </TouchableOpacity>
      </View>
      {BottomSelector}
      {error === true && (
        <Text allowFontScaling={false} style={[styles.errText, globalStyles.alignCenter]}>
          {t(errorContent)}
        </Text>
      )}
    </View>
  );
};

export default memo(ValueSelector);
