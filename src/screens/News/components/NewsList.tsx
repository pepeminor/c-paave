import React, { useCallback } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import withMemo from 'HOC/withMemo';
import NewsItem from './NewsItem';
import NewSearchItem from './NewsSearchItem';

interface IProps extends FlatListProps<any> {
  flatListRef?: React.LegacyRef<FlatList<any>>;
  keyItem?: string;
  detailItem?: boolean;
}

const News = (props: IProps) => {
  const renderItem = useCallback(
    ({ item }) => {
      if (props.detailItem) {
        return <NewSearchItem newsId={item} key={props.keyItem + item} />;
      }
      return <NewsItem newsId={item} key={props.keyItem + item} />;
    },
    [props.detailItem]
  );

  return <FlatList {...props} renderItem={renderItem} ref={props.flatListRef} />;
};

export default withMemo(News);
