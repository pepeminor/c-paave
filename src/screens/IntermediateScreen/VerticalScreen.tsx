import React, { memo, useCallback, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import { useFocusEffect } from '@react-navigation/native';
import globalStyles from 'styles';

const VerticalScreen = (props: StackScreenProps<'IntermediateVerticalScreen'>) => {
  const { nextScreen, nextScreenParams } = props.route.params;
  const firstTimeRender = useRef(false);

  const goToNextScreen = useCallback(() => {
    props.navigation.navigate('IntermediateHorizontalScreen', {
      nextScreen,
      nextScreenParams,
    });
  }, [nextScreen]);

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

export default memo(VerticalScreen);
