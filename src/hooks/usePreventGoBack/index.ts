import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenParamList from 'screens/RootNavigation/ScreenParamList';

export const usePreventGoBack = <T extends keyof ScreenParamList>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: StackNavigationProp<ScreenParamList, T, undefined>,
  condition = true
) => {
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', e => {
        condition && e.preventDefault();
      });
      return unsubscribe;
    }, [navigation, condition])
  );
};
