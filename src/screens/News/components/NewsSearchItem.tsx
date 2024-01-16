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
import globalStyles, { lightColors, scaleSize } from 'styles';
import { useDispatch } from 'react-redux';
import { isNotNilOrEmpty } from 'ramda-adjunct';
import { BottomPost } from 'components/SocialPost/component';

interface IProps {
  newsId: number;
}

const NewSearchItem = (props: IProps) => {
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
        <PublishDate date={newsData?.publishDate ?? ''} />
        <PaaveText type={TEXT_TYPE.BOLD_14} color={dynamicColors.LIGHTTextContent} style={styles.title}>
          {newsData?.title ?? ''}
        </PaaveText>
        <View style={styles.containerRow}>
          <View style={globalStyles.container}>
            <PaaveText
              type={TEXT_TYPE.REGULAR_14}
              color={dynamicColors.LIGHTTextContent}
              style={styles.content}
              numberOfLines={4}
            >
              {newsData?.content ?? ''}
            </PaaveText>
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
          <View style={styles.image}>
            <Image source={{ uri: newsData?.imgUrl }} style={styles.image} />
          </View>
        </View>
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
  },
  title: {
    marginTop: 8,
  },
  content: {
    marginRight: 16,
    marginTop: 8,
    textAlign: 'justify',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,

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
  },
  containerBottomPost: {
    marginTop: 6,
    width: 120,
    justifyContent: 'flex-start',
  },
  containerItemStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default withMemo(NewSearchItem);
