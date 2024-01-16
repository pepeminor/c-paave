import { BottomTabBarProps, BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import withMemo from 'HOC/withMemo';
import React, { useCallback, useEffect } from 'react';
import { TabBarItem } from './TabBarBottom.config';
import { getStylesHook } from 'hooks/useStyles';
import { lightColors as Colors } from 'styles';
import { NavigationHelpers, ParamListBase } from '@react-navigation/native';
import TouchableScale from 'components/TouchableScale';
import { useKeyboard } from 'hooks/useKeyboard/useKeyboard';
import { useDispatch } from 'react-redux';
import { setKeyboardHeight } from 'reduxs/global-actions/SetKeyboardHeight';
import Animated, { FadeOut, FadeIn } from 'react-native-reanimated';
import { Platform } from 'react-native';

const MyTabBar = withMemo((props: BottomTabBarProps) => {
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const { state, navigation } = props;

  const [keyboardHeight] = useKeyboard();

  useEffect(() => {
    dispatch(setKeyboardHeight(keyboardHeight));
  }, [keyboardHeight]);

  if (keyboardHeight !== 0) return null;

  return (
    <Animated.View
      style={styles.tabBarStyle}
      entering={FadeIn.delay(200).duration(200)}
      exiting={FadeOut.duration(200)}
    >
      {state.routes.map((route, index) => {
        const isFocused = index === state.index;
        return (
          <Item
            key={`MyTabBar_routes_${index}`}
            isFocused={isFocused}
            screenName={route.name}
            navigation={navigation}
          />
        );
      })}
    </Animated.View>
  );
});

export default MyTabBar;

interface IItemProps {
  isFocused: boolean;
  screenName: string;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

const Item = withMemo(({ isFocused, screenName, navigation }: IItemProps) => {
  const { styles } = useStyles();

  const onPress = useCallback(() => {
    navigation.navigate(screenName);
  }, [screenName]);

  return (
    <TouchableScale style={styles.container} onPress={onPress} isPreventDoubleClick={false}>
      <TabBarItem
        {...{
          isFocused,
          onPress,
          routeName: screenName,
        }}
      />
    </TouchableScale>
  );
});

export const useStyles = getStylesHook({
  tabBarStyle: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 90 : 80,
    paddingTop: 10,
    backgroundColor: Colors.WHITE,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0.5,
    borderTopColor: Colors.LIGHTGRAY,
  },
  container: {
    flex: 1,
  },
});
