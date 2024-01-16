import React, { useCallback } from 'react';
import { View, TouchableOpacity, Image, FlatList, ListRenderItemInfo, Dimensions } from 'react-native';
import { useNewsLogic } from './News.logic';
import useStyles from './News.style';
import { IProps } from './News.type';
import withMemo from 'HOC/withMemo';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { useTranslation } from 'react-i18next';
import Icon from 'components/Icon';
import ItemNews from './components/ItemNews';
import TouchableScale from 'components/TouchableScale';
import PublishDate from 'screens/News/components/PublishDate';
import ContentLoader, { Rect } from 'react-content-loader/native';
import LoginRequired from 'components/LoginRequired';
import { BottomPost } from 'components/SocialPost/component';
import { isNotNilOrEmpty } from 'ramda-adjunct';
import { scaleSize } from 'styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

const News = (props: IProps) => {
  const { handlers, listNews } = useNewsLogic(props);
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  const renderItem = useCallback(({ item }: ListRenderItemInfo<number>) => {
    return <ItemNews newsId={item} key={`NEWS_${item}`} />;
  }, []);

  if (props.listNews.length === 0) {
    return (
      <View style={styles.containerEmpty}>
        <View style={styles.containerTitle}>
          <PaaveText type={TEXT_TYPE.BOLD_18} color={dynamicColors.LIGHTTextBigTitle}>
            {t('market_news')}
          </PaaveText>
          <TouchableOpacity
            style={styles.containerSeeAll}
            onPress={handlers.onNavigateNewsList}
            disabled={props.isDemo}
          >
            <PaaveText type={TEXT_TYPE.BOLD_14} color={dynamicColors.BlueNewColor}>
              {t('See all') + '  '}
            </PaaveText>
            <Icon name={'arrow-right-double'} size={16} color={dynamicColors.BlueNewColor} />
          </TouchableOpacity>
        </View>
        <ContentLoader speed={2} width={SCREEN_WIDTH} height={(SCREEN_WIDTH * 3) / 2} viewBox="0 0 400 600">
          {/* Highlight News */}
          <Rect x="16" y="8" rx="0" ry="0" width="368" height="200" />
          <Rect x="16" y="220" rx="0" ry="0" width="320" height="30" />
          <Rect x="16" y="260" rx="0" ry="0" width="220" height="10" />
          <Rect x="16" y="280" rx="0" ry="0" width="368" height="80" />
          <Rect x="16" y="375" rx="0" ry="0" width="368" height="5" />
          {/* Subs new 1 */}
          <Rect x="16" y="395" rx="0" ry="0" width="220" height="130" />
          <Rect x="16" y="540" rx="0" ry="0" width="190" height="20" />
          <Rect x="16" y="570" rx="0" ry="0" width="160" height="10" />
          {/* Subs new 2 */}
          <Rect x="250" y="395" rx="0" ry="0" width="134" height="130" />
          <Rect x="250" y="540" rx="0" ry="0" width="134" height="20" />
          <Rect x="250" y="570" rx="0" ry="0" width="134" height="10" />
        </ContentLoader>
        <LoginRequired top={45} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <PaaveText type={TEXT_TYPE.BOLD_18} color={dynamicColors.LIGHTTextBigTitle}>
          {t('market_news')}
        </PaaveText>
        <TouchableOpacity style={styles.containerSeeAll} onPress={handlers.onNavigateNewsList}>
          <PaaveText type={TEXT_TYPE.BOLD_14} color={dynamicColors.BlueNewColor}>
            {t('See all') + '  '}
          </PaaveText>
          <Icon name={'arrow-right-double'} size={16} color={dynamicColors.BlueNewColor} />
        </TouchableOpacity>
      </View>
      <TouchableScale onPress={handlers.onNavigateNews} style={styles.containerImage} minScale={0.95}>
        <Image
          source={{
            uri: props.newsLatest.imgUrl,
          }}
          style={styles.image}
        />
        <PaaveText type={TEXT_TYPE.BOLD_16} style={styles.textTitle} color={dynamicColors.BlueNewColor}>
          {props.newsLatest.title}
        </PaaveText>
        <View style={styles.containerRow}>
          <PublishDate date={props.newsLatest?.publishDate ?? ''} />
          {isNotNilOrEmpty(props.dataPost) && (
            <BottomPost
              postId={props.dataPost.id}
              isFavourited={props.dataPost.favourited}
              favouritesCount={props.dataPost.favouritesCount}
              reblogsCount={props.dataPost.reblogsCount}
              repliesCount={props.dataPost.repliesCount}
              containerStyle={styles.containerBottomPost}
              onPressComment={handlers.onNavigateNews}
              userName={props.dataPost.account.userName}
              sizeIcon={scaleSize(14)}
              typeText={TEXT_TYPE.REGULAR_12}
            />
          )}
        </View>
      </TouchableScale>

      <FlatList
        data={listNews}
        renderItem={renderItem}
        horizontal={true}
        style={styles.containerList}
        contentContainerStyle={styles.containerContent}
      />
    </View>
  );
};

export default withMemo(News);
