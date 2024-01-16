import React, { useCallback } from 'react';
import { View, FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import { useSocialPostDetailLogic } from './SocialPostDetail.logic';
import useStyles from './SocialPostDetail.style';
import { IProps } from './SocialPostDetail.type';
import withMemo from 'HOC/withMemo';
import HeaderScreen from 'components/HeaderScreen';
import SocialPost from 'components/SocialPost';
import { useKeyboard } from 'hooks/useKeyboard/useKeyboard';
import { insertObjectIf } from 'utils';
import { IS_IOS } from 'constants/main';
import Icon from 'components/Icon';
import { scaleSize } from 'styles';
import { IListId } from 'reduxs';
import CommentList from './components/CommentList';
import ItemSeparator from './components/ItemSeparator';
import PaaveText from 'components/PaaveText';
import { useTranslation } from 'react-i18next';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SocialText } from 'components/SocialTextInput';
import InputComment from './components/InputComment';
import { isNotNilOrEmpty } from 'ramda-adjunct';
import NewsDetailScreen from 'screens/NewsDetailScreen';

const keyExtractor = (item: IListId) => item.id;

const SocialPostDetail = (props: IProps) => {
  const { handlers, refs, state } = useSocialPostDetailLogic(props);
  const { styles, dynamicColors } = useStyles();
  const [keyboardHeight] = useKeyboard();
  const { t } = useTranslation();
  const { postId } = props.route.params;
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<IListId>) => {
      return <CommentList postId={postId} key={item.id} commentId={item.id} onPressComment={handlers.onPressComment} />;
    },
    [postId]
  );

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={handlers.goBack} headerTitle={'post.from.user'} />
      <FlatList
        data={props.commentsList}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        keyboardDismissMode={'interactive'}
        contentContainerStyle={insertObjectIf(keyboardHeight > 0 && IS_IOS, {
          paddingBottom: keyboardHeight,
          flexGrow: 0,
        })}
        ListHeaderComponent={
          isNotNilOrEmpty(props.route.params.newsId) ? (
            <NewsDetailScreen
              newsId={props.route.params.newsId!}
              postId={props.route.params.postId}
              onPressComment={handlers.onPressComment}
            />
          ) : (
            <SocialPost
              indexAnimation={0}
              postId={postId}
              containerStyle={styles.containerPost}
              disablePress={true}
              onPressComment={handlers.onPressComment}
              showLabelBottom={false}
            />
          )
        }
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="never"
        refreshControl={
          <RefreshControl
            refreshing={props.loadingComments}
            onRefresh={handlers.onRefresh}
            tintColor={dynamicColors.BlueNewColor}
          />
        }
      />
      <SocialText.Recommendation />

      {!props.isLimitSocial && props.hasPost && (
        <View
          style={[
            styles.containerBottom,
            insertObjectIf(keyboardHeight > 0, { paddingBottom: 4 }),
            insertObjectIf(keyboardHeight > 0 && IS_IOS, { bottom: keyboardHeight }),
          ]}
        >
          {state.userNameReply !== '' && (
            <View style={styles.replyText}>
              <PaaveText type={TEXT_TYPE.REGULAR_14}>
                {t('reply.to')} <PaaveText type={TEXT_TYPE.BOLD_16}>@{state.userNameReply}</PaaveText>
              </PaaveText>
              <TouchableOpacity onPress={handlers.onClearReply}>
                <Icon name={'error'} size={scaleSize(20)} />
              </TouchableOpacity>
            </View>
          )}

          <InputComment
            postIdComment={refs.postIdComment}
            textInputRef={refs.textInputRef}
            onClearReply={handlers.onClearReply}
          />
        </View>
      )}
    </View>
  );
};

export default withMemo(SocialPostDetail);
