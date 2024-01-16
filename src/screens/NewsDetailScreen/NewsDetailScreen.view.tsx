import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useNewsDetailScreenLogic } from './NewsDetailScreen.logic';
import useStyles from './NewsDetailScreen.style';
import { IProps } from './NewsDetailScreen.type';
import withMemo from 'HOC/withMemo';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import Icon from 'components/Icon';
import { useTranslation } from 'react-i18next';
import ListStockTag from 'components/ListStockTag';
import { isNilOrEmpty, isNotNilOrEmpty } from 'ramda-adjunct';
import { BottomPost } from 'components/SocialPost/component';
import { HitSlop } from 'constants/enum';

const NewsDetailScreen = (props: IProps) => {
  const { handlers } = useNewsDetailScreenLogic(props);
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  if (isNilOrEmpty(props.newsData)) return null;

  return (
    <View>
      <View style={isNilOrEmpty(props.dataPost) ? styles.containerNoPost : styles.container}>
        <PaaveText type={TEXT_TYPE.BOLD_18}>{props.newsData.title}</PaaveText>
        <View style={styles.containerRow}>
          <Icon name={'calendar'} size={12} color={dynamicColors.LIGHTTextDisable} />
          <PaaveText style={styles.date} type={TEXT_TYPE.REGULAR_12} color={dynamicColors.LIGHTTextDisable}>
            {props.newsData.publishDate}
          </PaaveText>
        </View>
        <ListStockTag data={props.newsData.hashtags} showFull={true} />

        <Image source={{ uri: props.newsData.imgUrl }} style={styles.image} />

        <PaaveText style={styles.content} type={TEXT_TYPE.REGULAR_16} color={dynamicColors.LIGHTTextContent}>
          {props.newsData.content}
        </PaaveText>

        <PaaveText type={TEXT_TYPE.BOLD_14} color={dynamicColors.BlueNewColor}>
          {`${t('source')}: `}
          <PaaveText
            type={TEXT_TYPE.REGULAR_14}
            color={dynamicColors.BlueNewColor}
            onPress={handlers.onLink}
            suppressHighlighting={true}
          >
            {props.newsData.url}
          </PaaveText>
        </PaaveText>
      </View>

      {props.dataPost.favouritesCount > 0 && (
        <TouchableOpacity style={styles.containerLikes} hitSlop={HitSlop} onPress={handlers.onViewLiked}>
          <PaaveText type={TEXT_TYPE.BOLD_12} color={dynamicColors.BLACK}>
            {props.dataPost.favouritesCount}
            <PaaveText type={TEXT_TYPE.REGULAR_12} color={dynamicColors.TextDescription}>
              {' ' + t('likes')}
            </PaaveText>
          </PaaveText>
        </TouchableOpacity>
      )}

      {isNotNilOrEmpty(props.dataPost) && (
        <BottomPost
          postId={props.dataPost.id}
          isFavourited={props.dataPost.favourited}
          favouritesCount={props.dataPost.favouritesCount}
          reblogsCount={props.dataPost.reblogsCount}
          repliesCount={props.dataPost.repliesCount}
          containerStyle={styles.containerBottomPost}
          onPressComment={handlers.onPressComment}
          userName={props.dataPost.account.userName}
          showNumber={false}
        />
      )}
    </View>
  );
};

export default withMemo(NewsDetailScreen);
