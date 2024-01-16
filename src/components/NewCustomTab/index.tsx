import React from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle, useWindowDimensions } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import { TabView, SceneMap, SceneRendererProps, NavigationState, Route } from 'react-native-tab-view';

export interface ICustomTabProps {
  config: ITabConfig[];
  containerStyles?: StyleProp<ViewStyle>;
  tabViewStyles?: StyleProp<ViewStyle>;
  headerMarginHorizontal?: number;
  headerHeight?: number;
  bodyHeight?: number;
}
export interface ITabConfig {
  header: {
    title: string;
  };
  content: () => JSX.Element;
}

interface IMapScene {
  [s: string]: () => JSX.Element;
}

interface IMapRoute {
  key: string;
  title: string;
}

const NewCustomTab = (props: ICustomTabProps) => {
  const { config } = props;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [renderScene, setRenderScene] = React.useState<IMapScene>({});
  const [routes, setRoutes] = React.useState<{ key: string; title: string }[]>([]);
  const { styles } = useStyles();

  React.useEffect(() => {
    const mapScene: IMapScene = {};
    const mapRoute: IMapRoute[] = [];
    config.forEach((value, key) => {
      mapScene[key.toString()] = value.content;
      mapRoute.push({ key: key.toString(), title: value.header.title });
    });
    if (Object.entries(mapScene).length > 0) setRenderScene(mapScene);
    if (mapRoute.length > 0) setRoutes(mapRoute);
  }, []);

  const onSetIndexScene = (key: number) => {
    setIndex(key);
  };

  const customTabBar = (
    tabBarProps: SceneRendererProps & {
      navigationState: NavigationState<Route>;
    }
  ) => {
    return (
      <View
        style={[
          globalStyles.flexDirectionRow,
          styles.screenOption,
          {
            height: scaleSize(props.headerHeight || 44),
            marginHorizontal: scaleSize(props.headerMarginHorizontal || 16),
          },
        ]}
      >
        {tabBarProps.navigationState.routes.map((value, key) => (
          <TouchableOpacity
            key={key}
            onPress={() => onSetIndexScene(parseInt(value.key))}
            style={[
              globalStyles.centered,
              globalStyles.container,
              styles.optionContainer,
              parseInt(value.key) === index ? styles.optionContainerSelected : {},
            ]}
          >
            <Text
              style={[parseInt(value.key) === index ? styles.selectedText : styles.unselectedText]}
              allowFontScaling={false}
            >
              {value.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={[props.containerStyles]}>
      <TabView
        renderTabBar={customTabBar}
        navigationState={{ index, routes }}
        renderScene={SceneMap(renderScene)}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={[props.tabViewStyles]}
        sceneContainerStyle={{ height: scaleSize(props.bodyHeight || 100) }}
        swipeEnabled={false}
      />
    </View>
  );
};

export default NewCustomTab;
