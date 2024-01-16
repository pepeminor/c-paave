import { memo } from 'react';
import React from 'react';
import { View } from 'react-native';
import useStyles from './styles';

const LoadOpenApp = () => {
  const { styles } = useStyles();
  return <View style={styles.loadOpenApp}>{/* wait for animation loading in future */}</View>;
};

export default memo(LoadOpenApp);
