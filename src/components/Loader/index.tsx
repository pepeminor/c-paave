import { memo, useEffect } from 'react';
import React from 'react';
import { View, ActivityIndicator, Platform, BackHandler } from 'react-native';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { IState } from '../../reduxs/global-reducers/index';

const LoaderScreen = () => {
  const loader = useSelector((state: IState) => state.loader);
  const { styles } = useStyles();

  useEffect(() => {
    if (Platform.OS === 'android') {
      const onBackPress = () => {
        if (loader.loading) {
          return true;
        } else {
          return false;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    } else {
      return;
    }
  }, [loader]);

  return loader.loading ? (
    <View style={styles.loader}>
      <ActivityIndicator size="large" />
    </View>
  ) : null;
};

export default memo(LoaderScreen);
