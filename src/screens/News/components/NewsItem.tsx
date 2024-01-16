import React, { useCallback, useEffect } from 'react';
import { View, Image } from 'react-native';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { useAppSelector } from 'hooks/useAppSelector';
import { NewsSelectors, SocialPostActions, SocialPostSelectors } from 'reduxs';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import ScreenParamList from 'screens/RootNavigation/ScreenParamList';
import TouchableScale from 'components/TouchableScale';
import PublishDate from './PublishDate';
import { lightColors, scaleSize } from 'styles';
import { useDispatch } from 'react-redux';
import { isNotNilOrEmpty } from 'ramda-adjunct';
import { BottomPost } from 'components/SocialPost/component';
import ListStockTag from 'components/ListStockTag';
interface IProps {
  newsId: number;
}

const NewsItem = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const newsData = useAppSelector(NewsSelectors.selectNews(props.newsId));
  const dataPost = useAppSelector(SocialPostSelectors.selectDataPost(newsData?.socialNewsId));

  const navigation = useNavigation<StackNavigationProp<ScreenParamList>>();
  const dispatch = useDispatch();

  const onPress = useCallback(() => {
    navigation.navigate('PostDetailScreen', { newsId: props.newsId, postId: newsData.socialNewsId });
  }, [props.newsId]);

  useEffect(() => {
    dispatch(SocialPostActions.getPostDetailRequest({ postId: newsData.socialNewsId }));
  }, []);

  return (
    <TouchableScale style={styles.container} onPress={onPress} minScale={0.95}>
      <View style={styles.containerContent}>
        <PaaveText type={TEXT_TYPE.BOLD_14} color={dynamicColors.BlueNewColor}>
          {newsData?.title ?? ''}
        </PaaveText>
        <ListStockTag data={newsData.hashtags} showFull={false} containerStyle={styles.containerListStock} />

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
              containerItemStyle={styles.containerItemStyle}
              onPressComment={onPress}
              userName={dataPost.account.userName}
              sizeIcon={scaleSize(14)}
              typeText={TEXT_TYPE.REGULAR_12}
            />
          )}
        </View>
      </View>
      <View style={styles.image}>
        <Image source={{ uri: newsData?.imgUrl }} style={styles.image} />
      </View>
    </TouchableScale>
  );
};

const useStyles = getStylesHook({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: lightColors.BORDER,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    shadowColor: lightColors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  containerContent: {
    flex: 1,
    marginRight: 16,
  },
  containerTag: {
    flexDirection: 'row',
    marginBottom: 8,
    marginTop: 4,
    paddingHorizontal: 16,
    flexWrap: 'wrap',
  },
  containerSymbol: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: lightColors.BORDER,
    borderRadius: 10,
    marginRight: 8,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBottomPost: {
    marginTop: 6,
    marginLeft: 8,
    width: 120,
    justifyContent: 'flex-start',
  },
  containerItemStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  containerListStock: {
    marginTop: 0,
  },
});

export default withMemo(NewsItem);
