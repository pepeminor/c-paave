import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { usePostLogic } from './Post.logic';
import useStyles from './Post.style';
import { IProps } from './Post.type';
import withMemo from 'HOC/withMemo';
import { BottomPost, HeaderPost, ImageItems, Poll } from './component';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import LinkPreview from 'components/LinkPreview';
import { isNotNilOrEmpty } from 'ramda-adjunct';
import { findUrl, mapV2 } from 'utils';
import TouchableScale from 'components/TouchableScale';
import { useTranslation } from 'react-i18next';
import { HitSlop } from 'constants/enum';
import TextPost from './component/TextPost';

const Post = (props: IProps) => {
  const { state, handlers, dataTags } = usePostLogic(props);
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();
  const linkPreview = findUrl(props.dataPost.content)?.[0] ?? '';
  const { showLabelBottom = true } = props;

  const renderItemTag = useCallback(({ item, index }) => {
    const symbol = item.name.toUpperCase();
    const onPress = () => {
      handlers.onGoToStockOverView(symbol);
    };
    return (
      <TouchableOpacity key={index} onPress={onPress} style={styles.containerSymbol}>
        <PaaveText type={TEXT_TYPE.REGULAR_14} color={dynamicColors.LIGHTTextContent}>
          {symbol}
        </PaaveText>
      </TouchableOpacity>
    );
  }, []);
  return (
    <TouchableScale
      style={[styles.container, props.containerStyle]}
      minScale={0.95}
      disabled={props.disablePress}
      onPress={handlers.navigateToPostDetail}
    >
      <TouchableOpacity onPress={handlers.navigateToPostDetail}>
        <HeaderPost
          avatar={props.dataPost.account.avatar}
          displayName={props.dataPost.account.displayName}
          userName={props.dataPost.account.userName}
          createdAt={props.dataPost.createdAt}
          onChangeContent={handlers.onTranslateContent}
          postId={props.postId}
        />
      </TouchableOpacity>

      {dataTags.length > 0 && (
        <View style={styles.containerTag}>
          {mapV2(dataTags, (item, index) => {
            return renderItemTag({ item, index });
          })}
        </View>
      )}

      <TextPost
        content={state.contentPost}
        style={styles.textContent}
        type={TEXT_TYPE.REGULAR_14}
        color={dynamicColors.LIGHTText}
      />

      <Poll dataPoll={props.dataPost.poll} postId={props.dataPost.id} />
      <ImageItems imageList={props.dataPost.medias} />
      {props.dataPost.medias.length === 0 && isNotNilOrEmpty(linkPreview) && (
        <LinkPreview linkPreview={linkPreview} postId={props.dataPost.id} />
      )}

      {!showLabelBottom && (
        <TouchableOpacity style={styles.containerLikes} hitSlop={HitSlop} onPress={handlers.onViewLiked}>
          <PaaveText type={TEXT_TYPE.BOLD_12} color={dynamicColors.BLACK}>
            {props.dataPost.favouritesCount}
            <PaaveText type={TEXT_TYPE.REGULAR_12} color={dynamicColors.TextDescription}>
              {' ' + t('likes')}
            </PaaveText>
          </PaaveText>
        </TouchableOpacity>
      )}

      <BottomPost
        postId={props.dataPost.id}
        isFavourited={props.dataPost.favourited}
        favouritesCount={props.dataPost.favouritesCount}
        repliesCount={props.dataPost.repliesCount}
        containerStyle={styles.containerBottomPost}
        onPressComment={handlers.onPressComment}
        userName={props.dataPost.account.userName}
        containerItemStyle={styles.containerItemStyle}
        showNumber={showLabelBottom}
      />
    </TouchableScale>
  );
};

export default withMemo(Post);
