import { Text, TouchableOpacity, View, ViewProps } from 'react-native';
import React, { memo, useCallback } from 'react';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import globalStyles from 'styles';
import useMemoizedStyles from 'hooks/useMemoizedStyles';

type TabData = {
  [key: string]: string;
};

interface TabSelectorProps<T extends TabData> extends ViewProps {
  value: keyof T;
  setValue: (v: keyof T) => void;
  listValue: T;
  tabConfig: (keyof T)[][];
}

const TabSelector = <T extends TabData>({
  value,
  setValue,
  listValue,
  tabConfig,
  style,
  ...viewProps
}: TabSelectorProps<T>) => {
  const { styles } = useStyles();
  const { containerStyle } = useMemoizedStyles({
    containerStyle: [styles.screenOption, style],
  });

  return (
    <View style={containerStyle} {...viewProps}>
      {tabConfig.map((row, index) => (
        <View style={globalStyles.flexDirectionRow} key={`TabSelector3_Row_${index}`}>
          {row.map((item, index) => (
            <MemoTab
              key={`TabSelector3_Item_${index}_${item as string}`}
              item={item}
              value={value}
              setValue={setValue}
              listValue={listValue}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default memo(TabSelector) as typeof TabSelector;

type TabProps<T extends TabData> = {
  item: keyof T;
  value: keyof T;
  setValue: (v: keyof T) => void;
  listValue: T;
};

const Tab = <T extends TabData>({ item, value, listValue, setValue }: TabProps<T>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const onPress = useCallback(() => {
    setValue(item);
  }, [item]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={value === item ? styles.optionContainerSelected : styles.optionContainer}
    >
      <Text style={value === item ? styles.selectedText : styles.text}>{t(listValue[item])}</Text>
    </TouchableOpacity>
  );
};

const MemoTab = memo(Tab) as typeof Tab;
