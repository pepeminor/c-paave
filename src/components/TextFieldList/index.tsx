import React from 'react';
import { Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import useStyles from './styles';
import globalStyles from 'styles';
import Icon from 'components/Icon';
export interface ITextFieldListProps {
  readonly input: string;
  readonly containerStyle?: StyleProp<ViewStyle>;
  readonly disabled?: boolean;

  onChange?(): void;
}

const TextFieldList = ({ input, onChange, containerStyle, disabled }: ITextFieldListProps) => {
  const { styles } = useStyles();
  return (
    <TouchableOpacity
      style={[
        styles.textFiled,
        globalStyles.alignCenter,
        globalStyles.flexDirectionRow,
        disabled === true && globalStyles.disableBackground,
        containerStyle,
      ]}
      onPress={onChange}
      disabled={disabled === true ? true : false}
    >
      <Text numberOfLines={1} allowFontScaling={false} style={styles.filedText}>
        {input}
      </Text>
      <Icon name={'arrow-down-2'} size={20} style={styles.IconDownStyle} />
    </TouchableOpacity>
  );
};

export default TextFieldList;
