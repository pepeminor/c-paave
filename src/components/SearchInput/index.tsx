import React from 'react';
import { StyleProp, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native';
import useStyles from './styles';
import globalStyles from 'styles';
import Icon from 'components/Icon';
import { useTranslation } from 'react-i18next';
import useMemoizedStyles from 'hooks/useMemoizedStyles';

interface SearchInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  hideClearIcon?: boolean;
  onClear?: () => void;
}

const SearchInput = ({ containerStyle, hideClearIcon, onClear, placeholder, ...props }: SearchInputProps) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  const memoizedStyles = useMemoizedStyles({
    container: [globalStyles.flexDirectionRow, styles.container, containerStyle],
  });

  return (
    <View style={memoizedStyles.container}>
      <Icon name="search" size={16} color={dynamicColors.BLACK} onPress={onClear} />
      <TextInput
        placeholder={t(placeholder ?? 'Input symbol')}
        style={styles.inputStyle}
        placeholderTextColor={dynamicColors.LIGHTTextDisable}
        {...props}
      />
      {hideClearIcon ? null : (
        <TouchableOpacity style={styles.closeButton} onPress={onClear}>
          <Icon name="close" size={14} color={dynamicColors.BLACK} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;
