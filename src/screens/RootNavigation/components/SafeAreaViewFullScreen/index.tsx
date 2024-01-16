import { memo, useCallback } from 'react';
import React from 'react';
import { View, SafeAreaView, LayoutChangeEvent } from 'react-native';
import useStyles from './styles';
import globalStyles from 'styles';
import { useDispatch } from 'react-redux';
import { SET_SAFE_SCREEN_HEIGHT } from 'reduxs/actions';

const SafeAreaViewFullScreen = () => {
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const onSafeAreaLayout = useCallback((e: LayoutChangeEvent) => {
    dispatch({ type: SET_SAFE_SCREEN_HEIGHT, payload: e.nativeEvent.layout.height });
  }, []);

  return (
    <SafeAreaView style={styles.fullScreen}>
      <View style={globalStyles.container} onLayout={onSafeAreaLayout}></View>
    </SafeAreaView>
  );
};

export default memo(SafeAreaViewFullScreen);
