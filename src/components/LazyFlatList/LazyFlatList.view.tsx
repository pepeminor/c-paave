import React, { forwardRef } from 'react';
import { FlatList } from 'react-native';
import { useLazyFlatListLogic } from './LazyFlatList.logic';
import { IProps } from './LazyFlatList.type';
import withMemo from 'HOC/withMemo';
import useStyles from './LazyFlatList.style';

const LazyFlatList = forwardRef<FlatList, IProps>((props, ref) => {
  const { state, handlers } = useLazyFlatListLogic(props);
  const { ...rest } = props;
  const { styles } = useStyles();

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.container}
      onEndReachedThreshold={0.5}
      onEndReached={handlers.onLoadMore}
      {...rest}
      data={state.dataList}
      ref={ref}
    />
  );
});

export default withMemo(LazyFlatList);
