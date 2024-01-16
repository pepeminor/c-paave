import React, { useCallback } from 'react';
import { useCommentListLogic } from './CommentList.logic';
import useStyles from './CommentList.style';
import { IProps } from './CommentList.type';
import withMemo from 'HOC/withMemo';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import CommentItem from '../CommentItem';
import { FlatList, ListRenderItemInfo, TouchableOpacity, View } from 'react-native';
import { IListId } from 'reduxs';
import { useTranslation } from 'react-i18next';

const CommentList = (props: IProps) => {
  const { state, handlers } = useCommentListLogic(props);
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();
  const isShowReplies = state.dataList.length < state.dataOriginalLength;
  const renderItem = useCallback(({ item }: ListRenderItemInfo<IListId>) => {
    return (
      <View style={styles.containerItem} key={item.id + item.indexAnimation}>
        <CommentItem
          isChild={true}
          commentId={item.id}
          onPressComment={props.onPressComment}
          indexAnimation={item.indexAnimation}
          idParent={props.commentId}
        />
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.containerList}
        data={state.dataList}
        renderItem={renderItem}
        keyExtractor={item => item.id + item.indexAnimation}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <>
            <CommentItem
              idParent={props.postId}
              commentId={props.commentId}
              onPressComment={props.onPressComment}
              indexAnimation={0}
            />
            {isShowReplies && (
              <TouchableOpacity style={styles.containerReplies} onPress={handlers.onLoadMore}>
                <PaaveText type={TEXT_TYPE.REGULAR_14} color={dynamicColors.MainBlue}>
                  ...{t('show.replies')}
                </PaaveText>
              </TouchableOpacity>
            )}
          </>
        }
      />
      <View style={styles.bottomList} />
      <View style={styles.bottomListHidden} />
      {props.commentChildList.length > 0 && <View style={styles.line} />}
    </View>
  );
};

export default withMemo(CommentList);
