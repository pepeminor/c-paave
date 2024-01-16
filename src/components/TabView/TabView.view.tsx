import React, { useCallback, forwardRef } from 'react';
import { Text, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { useTabViewLogic } from './TabView.logic';
import useStyles from './TabView.style';
import { IProps, ItemRoutes, TabViewReactRef } from './TabView.type';
import withMemo from 'HOC/withMemo';

const PaaveTabView = forwardRef((props: IProps, ref: TabViewReactRef) => {
  const { styles, dynamicColors } = useStyles();
  const { handlers, state } = useTabViewLogic(props, ref);
  const { index } = state;

  const renderLabelTab = useCallback(({ route, focused }: { route: ItemRoutes; focused: boolean }) => {
    return (
      <View style={[styles.optionContainer, focused && styles.optionContainerSelected]}>
        <Text style={[styles.text, focused && styles.selectedText]}>{route.title}</Text>
      </View>
    );
  }, []);

  const {
    renderScene,
    routes,
    renderLabel = renderLabelTab,
    tabStyle = styles.tabBar,
    indicatorStyle = styles.indicator,
    ...rest
  } = props;

  const renderTabBar = useCallback(
    tabProps => {
      return (
        <TabBar
          {...tabProps}
          style={tabStyle}
          tabStyle={styles.tab}
          renderLabel={renderLabel}
          indicatorStyle={indicatorStyle}
          pressColor={dynamicColors.Transparent}
        />
      );
    },
    [tabStyle, renderLabel, indicatorStyle]
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={handlers.onSetIndex}
      lazy={true}
      swipeEnabled={true}
      {...rest}
    />
  );
});

export default withMemo(PaaveTabView);
