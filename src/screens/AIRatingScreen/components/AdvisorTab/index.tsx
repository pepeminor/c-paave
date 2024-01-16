import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import useStyles from './styles';
import LoginRequired from 'components/LoginRequired';
import { useDispatch } from 'react-redux';
import { AdvisorActions } from 'reduxs';
import AdvisorList from './components/AdvisorList';

const AdvisorTab = () => {
  const dispatch = useDispatch();
  const { styles } = useStyles();

  useEffect(() => {
    dispatch(AdvisorActions.initAdvisorData());
  }, []);

  return (
    <View style={styles.container}>
      <AdvisorList />
      <LoginRequired />
    </View>
  );
};

export default memo(AdvisorTab);
