import { View, Text, TouchableOpacity, ViewProps, StyleProp, ViewStyle, TextStyle, FlatList } from 'react-native';
import React, { memo, useCallback, useMemo, useRef } from 'react';
import { useTabSelectorStyles } from './styles';
import { useTranslation } from 'react-i18next';
import useMemoizedStyles from 'hooks/useMemoizedStyles';
import { TAB_SELECTOR_TYPE } from './type';

type TabData = {
  [key: string]: string;
};

interface TabSelectorProps<T extends TabData> extends ViewProps {
  value: keyof T;
  setValue: (v: keyof T, index: number) => void;
  listValue: T;
  selectedContainer?: StyleProp<ViewStyle>;
  unSelectedContainer?: StyleProp<ViewStyle>;
  selectedText?: StyleProp<TextStyle>;
  unSelectedText?: StyleProp<TextStyle>;
  icons?: (JSX.Element | null)[];
  type?: TAB_SELECTOR_TYPE;
  scrollable?: boolean;
}

const TabSelector = <T extends TabData>({
  value,
  setValue,
  listValue,
  style,
  selectedContainer,
  unSelectedContainer,
  selectedText,
  unSelectedText,
  icons = [],
  type = 'SOLID_WITH_WRAPPER',
  scrollable = false,
  ...viewProps
}: TabSelectorProps<T>) => {
  const data = useMemo(() => Object.keys(listValue), [listValue]);
  const flatListRef = useRef<FlatList>(null);

  const defaultStyles = useTabSelectorStyles(type);
  const { containerStyle, selectedContainerStyle, selectedTextStyle, unSelectedContainerStyle, unSelectedTextStyle } =
    useMemoizedStyles({
      containerStyle: [defaultStyles.container, style],
      selectedContainerStyle: [defaultStyles.selectedContainer, selectedContainer],
      unSelectedContainerStyle: [defaultStyles.unselectedContainer, unSelectedContainer],
      selectedTextStyle: [defaultStyles.selectedText, selectedText],
      unSelectedTextStyle: [defaultStyles.unselectedText, unSelectedText],
    });

  const onTabPressed = useCallback(
    (v: keyof T, index: number) => {
      if (flatListRef.current && data.length > 0 && index >= 0 && index < data.length) {
        flatListRef.current.scrollToIndex({ animated: true, index, viewOffset: 100 });
      }
      setValue(v, index);
    },
    [setValue, data.length]
  );

  if (scrollable) {
    return (
      <View>
        <FlatList
          horizontal
          data={data}
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
          contentContainerStyle={containerStyle}
          renderItem={({ item, index }) => (
            <TabMemo
              key={`TabSelector_${index}_${item}`}
              item={item}
              itemValue={listValue[item]}
              setValue={onTabPressed}
              value={value}
              icon={icons[index]}
              selectedContainer={selectedContainerStyle}
              unSelectedContainer={unSelectedContainerStyle}
              selectedText={selectedTextStyle}
              unSelectedText={unSelectedTextStyle}
              index={index}
            />
          )}
          {...viewProps}
        />
      </View>
    );
  }
  return (
    <View style={containerStyle} {...viewProps}>
      {Object.keys(listValue).map((item, index) => (
        <TabMemo
          key={`TabSelector_${index}_${item}`}
          item={item}
          itemValue={listValue[item]}
          setValue={setValue}
          value={value}
          icon={icons[index]}
          selectedContainer={selectedContainerStyle}
          unSelectedContainer={unSelectedContainerStyle}
          selectedText={selectedTextStyle}
          unSelectedText={unSelectedTextStyle}
          index={index}
        />
      ))}
    </View>
  );
};

export default memo(TabSelector) as typeof TabSelector;

type TabProps<T extends TabData> = {
  value: keyof T;
  setValue: (v: keyof T, index: number) => void;
  item: string;
  itemValue: string;
  selectedContainer?: StyleProp<ViewStyle>;
  unSelectedContainer?: StyleProp<ViewStyle>;
  selectedText?: StyleProp<TextStyle>;
  unSelectedText?: StyleProp<TextStyle>;
  icon?: JSX.Element | null;
  index: number;
};

const Tab = <T extends TabData>({
  item,
  itemValue,
  setValue,
  value,
  icon,
  selectedContainer,
  selectedText,
  unSelectedContainer,
  unSelectedText,
  index,
}: TabProps<T>) => {
  const { t } = useTranslation();
  const onPress = useCallback(() => {
    setValue(item, index);
  }, []);
  return (
    <TouchableOpacity onPress={onPress} style={value === item ? selectedContainer : unSelectedContainer}>
      <Text style={value === item ? selectedText : unSelectedText}>{t(itemValue)}</Text>
      {icon}
    </TouchableOpacity>
  );
};

const TabMemo = memo(Tab) as typeof Tab;
