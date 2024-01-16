import React from 'react';
import { useNewFeedLogic } from './NewFeed.logic';
import useStyles from './NewFeed.style';
import { IProps } from './NewFeed.type';
import withMemo from 'HOC/withMemo';
import { Text, TouchableOpacity } from 'react-native';
import { SocialPostList } from 'components/SocialPostList';

const NewFeed = (props: IProps) => {
  const { handlers } = useNewFeedLogic(props);
  const { styles } = useStyles();

  return (
    <>
      <SocialPostList
        data={props.listPost}
        loading={props.loading}
        refreshing={props.refreshing}
        onRefresh={handlers.onRefresh}
        onEndReached={handlers.onLoadMore}
      />
      {!props.isPostLimited && (
        <TouchableOpacity style={styles.createPostBtn} onPress={handlers.createPost}>
          <Text allowFontScaling={false} style={styles.createPostBtnText}>
            +
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default withMemo(NewFeed);
