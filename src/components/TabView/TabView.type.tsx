import { StyleProp, ViewStyle } from 'react-native';

export type ItemRoutes = {
  title: string;
  key: string;
  index?: number;
  icon?: string;
};

export interface IProps {
  routes: ItemRoutes[];
  renderScene: ({ route }: { route: ItemRoutes }) => JSX.Element;
  renderLabel?: ({ route, focused }: { route: ItemRoutes; focused: boolean }) => JSX.Element;
  keyboardDismissMode?: 'auto' | 'none' | 'on-drag' | undefined;
  lazy?: boolean;
  lazyPreloadDistance?: number;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
  renderLazyPlaceholder?: () => null;
  sceneContainerStyle?: StyleProp<ViewStyle>;
  pagerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  swipeEnabled?: boolean;
  tabBarPosition?: 'top' | 'bottom';
  animationEnabled?: boolean;
  onChangeIndex?: (index: number) => void;
  initScreen?: number;

  tabStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
}

export interface TabViewRef {
  reset(): void;
  setTab(index: number): void;
}

export type TabViewReactRef = React.Ref<TabViewRef> | undefined;
