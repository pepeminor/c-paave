import React from 'react';
import { useCommentItemLogic } from './CommentItem.logic';
import useStyles from './CommentItem.style';
import { IProps } from './CommentItem.type';
import withMemo from 'HOC/withMemo';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { BottomPost, HeaderPost, ImageItems, Poll } from 'components/SocialPost/component';
import Animated from 'react-native-reanimated';
import { View } from 'react-native';
import TextPost from 'components/SocialPost/component/TextPost';

const CommentItem = (props: IProps) => {
  const { handlers, state } = useCommentItemLogic(props);
  const { styles, dynamicColors } = useStyles();
  return (
    <Animated.View style={styles.container}>
      <HeaderPost
        avatar={props.dataComment.account.avatar}
        displayName={props.dataComment.account.displayName}
        userName={props.dataComment.account.userName}
        createdAt={props.dataComment.createdAt}
        onChangeContent={handlers.onTranslateContent}
        postId={props.dataComment.id}
        containerStyle={styles.containerHeader}
        containerImage={styles.containerImageAvatar}
        isComment={true}
        postParentId={props.idParent}
      />

      <View style={styles.containerContent}>
        <TextPost
          content={state.content}
          style={styles.textContent}
          type={TEXT_TYPE.REGULAR_14}
          color={dynamicColors.LIGHTTextContent}
        />

        <Poll dataPoll={props.dataComment.poll} postId={props.dataComment.id} />
        <View style={styles.containerImage}>
          <ImageItems imageList={props.dataComment.medias} resizeMode="contain" />
        </View>

        <BottomPost
          postId={props.dataComment.id}
          isFavourited={props.dataComment.favourited}
          favouritesCount={props.dataComment.favouritesCount}
          reblogsCount={props.dataComment.reblogsCount}
          repliesCount={props.dataComment.repliesCount}
          containerStyle={styles.containerBottomPost}
          onPressComment={handlers.onPressComment}
          userName={props.dataComment.account.userName}
          containerItemStyle={styles.containerItemStyle}
        />
      </View>
    </Animated.View>
  );
};

export default withMemo(CommentItem);
