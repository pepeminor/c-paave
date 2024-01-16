import React, { ReactElement, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import { useAppSelector } from 'hooks/useAppSelector';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import { SymbolType } from 'constants/enum';

export interface ICustomTabProps {
  config: ITabConfig[];
  headerStyle: 'Underline' | 'Button';
  headerPaddingHorizontal?: number;
  headerPaddingVertical?: number;
  headerHeight?: number;
  styles?: StyleProp<ViewStyle>;
  setIndex?(index: number): void;
}
export interface ITabConfig {
  header: {
    title: string;
    render?: (selectedTitle: string) => ReactElement;
    Icon?: ReactElement;
  };
  content: ReactElement;
}

const CustomTab = (props: ICustomTabProps) => {
  const [selectedTab, setSelectedTab] = useState(props.config[0]);
  const { t } = useTranslation();
  const { styles } = useStyles();
  const onSelectTab = (el: ITabConfig, index: number) => {
    if (props.setIndex != null) {
      props.setIndex(index);
    }
    setSelectedTab(el);
  };
  const currentSymbolCode = useAppSelector(state => state.SymbolData.currentSymbolCode);

  const currentSymbol = useAppSelector(SymbolDataSelector.selectCurrentSymbol, {
    symbolCode: true,
  });

  const isFuturesCode = currentSymbol?.symbolType === SymbolType.FUTURES;

  const headerRenderer = useCallback(
    (el: ITabConfig, key: number) => {
      switch (props.headerStyle) {
        case 'Button':
          return (
            <TouchableOpacity
              onPress={() => onSelectTab(el, key)}
              key={key}
              style={[
                styles.headerBtn,
                selectedTab.header.title === el.header.title && styles.optionContainerSelectedButton,
              ]}
            >
              <Text style={selectedTab.header.title === el.header.title && styles.selectedTitleButton}>
                {t(el.header.title)}
              </Text>
              {el.header.Icon}
            </TouchableOpacity>
          );

        case 'Underline':
          return (
            <TouchableOpacity
              onPress={() => onSelectTab(el, key)}
              key={key}
              style={[
                styles.headerUnderline,
                selectedTab.header.title === el.header.title && styles.optionContainerSelectedUnderline,
              ]}
            >
              <Text style={selectedTab.header.title === el.header.title && styles.selectedTitleUnderline}>
                {t(el.header.title)}
              </Text>
            </TouchableOpacity>
          );
      }
    },
    [selectedTab.header.title, props.headerStyle]
  );

  const containerStyle = () => {
    switch (props.headerStyle) {
      case 'Button':
        return styles.screenOptionButton;
      case 'Underline':
        return styles.screenOptionUnderline;
    }
  };

  const viewItemStyle = [
    globalStyles.flexDirectionRow,
    containerStyle(),
    { height: scaleSize(props.headerHeight || 44) },
  ];

  const viewStyle = [
    {
      paddingHorizontal: scaleSize(props.headerPaddingHorizontal || 8),
      paddingVertical: scaleSize(props.headerPaddingVertical || 8),
    },
  ];

  const content = selectedTab.content;

  useEffect(() => {
    setSelectedTab(props.config[0]);
  }, [currentSymbolCode]);

  return (
    <View style={props.styles}>
      <View style={viewStyle}>
        {!isFuturesCode && (
          <View style={viewItemStyle}>
            {props.config.map((el, key) => {
              return el.header.render
                ? el.header.render(selectedTab.header.title) || selectedTab.header.Icon
                : headerRenderer(el, key);
            })}
          </View>
        )}
      </View>
      {content}
    </View>
  );
};

export default memo(CustomTab);
