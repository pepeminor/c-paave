import React from 'react';
import { View } from 'react-native';
import useStyles from '../SocialPostDetail.style';
import withMemo from 'HOC/withMemo';

const ItemSeparator = () => {
  const { styles } = useStyles();

  return <View style={styles.separator} />;
};

export default withMemo(ItemSeparator);
