import { useFocusEffect } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { StackScreenProps } from 'screens/RootNavigation';
import globalStyles from 'styles';

const HorizontalScreen = (props: StackScreenProps<'IntermediateHorizontalScreen'>) => {
  const { nextScreen, nextScreenParams } = props.route.params;
  const firstTimeRender = useRef(false);

  const goToNextScreen = useCallback(() => {
    return props.navigation.navigate(nextScreen, nextScreenParams as any);
  }, [nextScreen]);

  useEffect(() => {
    Orientation.lockToLandscapeLeft();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!firstTimeRender.current) {
        setTimeout(goToNextScreen, 300);
        firstTimeRender.current = true;
      } else {
        setTimeout(props.navigation.goBack, 300);
      }
    }, [])
  );

  return <SafeAreaView style={globalStyles.container}></SafeAreaView>;
};

export default memo(HorizontalScreen);
