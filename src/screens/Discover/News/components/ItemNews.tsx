import React, { useCallback, useEffect } from 'react';
import { Image, View } from 'react-native';
import withMemo from 'HOC/withMemo';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { getStylesHook } from 'hooks/useStyles';
import { navigate } from 'utils';
import { useAppSelector } from 'hooks/useAppSelector';
import { NewsSelectors, SocialPostActions, SocialPostSelectors } from 'reduxs';
import TouchableScale from 'components/TouchableScale';
import PublishDate from 'screens/News/components/PublishDate';
import { useDispatch } from 'react-redux';
import { isNotNilOrEmpty } from 'ramda-adjunct';
import { BottomPost } from 'components/SocialPost/component';
import { scaleSize } from 'styles';

interface IProps {
  newsId: number;
}

const News = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const newsData = useAppSelector(NewsSelectors.selectNews(props.newsId));
  const dataPost = useAppSelector(SocialPostSelectors.selectDataPost(newsData?.socialNewsId));

  const dispatch = useDispatch();
  const onPress = useCallback(() => {
    navigate({
      key: 'PostDetailScreen',
      params: {
        newsId: props.newsId,
        postId: newsData.socialNewsId,
      },
    });
  }, [props.newsId]);

  useEffect(() => {
    dispatch(SocialPostActions.getPostDetailRequest({ postId: newsData.socialNewsId }));
  }, [newsData.socialNewsId]);

  return (
    <TouchableScale style={styles.container} onPress={onPress} minScale={0.95}>
      <Image source={{ uri: newsData?.imgUrl }} style={styles.image} />
      <PaaveText type={TEXT_TYPE.BOLD_14} style={styles.textTitle} color={dynamicColors.BlueNewColor} numberOfLines={2}>
        {newsData?.title ?? ''}
      </PaaveText>

      <View style={styles.containerRow}>
        <PublishDate date={newsData?.publishDate ?? ''} />

        {isNotNilOrEmpty(dataPost) && (
          <BottomPost
            postId={dataPost.id}
            isFavourited={dataPost.favourited}
            favouritesCount={dataPost.favouritesCount}
            reblogsCount={dataPost.reblogsCount}
            repliesCount={dataPost.repliesCount}
            containerStyle={styles.containerBottomPost}
            onPressComment={onPress}
            userName={dataPost.account.userName}
            sizeIcon={scaleSize(14)}
            typeText={TEXT_TYPE.REGULAR_12}
          />
        )}
      </View>
    </TouchableScale>
  );
};

const useStyles = getStylesHook({
  container: {
    width: 214,
    marginRight: 16,
  },
  image: {
    width: 214,
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  textTitle: {
    flex: 1,
    marginTop: 6,
  },
  containerBottomPost: {
    width: 120,
    marginTop: 8,
    justifyContent: 'flex-start',
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default withMemo(News);
