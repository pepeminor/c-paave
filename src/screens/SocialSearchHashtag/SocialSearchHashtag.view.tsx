import React from 'react';
import { useScreenLogic } from './SocialSearchHashtag.logic';
import useStyles from './SocialSearchHashtag.style';
import { IProps } from './SocialSearchHashtag.type';
import withMemo from 'HOC/withMemo';
import { SocialPostList } from 'components/SocialPostList';
import { View } from 'react-native';
import HeaderScreen from 'components/HeaderScreen';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { useTranslation } from 'react-i18next';

export const SocialSearchHashtag = withMemo((props: IProps) => {
  const { state, handlers, tagInfo } = useScreenLogic(props);
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <HeaderScreen headerTitle={`#${tagInfo.hashtag}`} leftButtonIcon={true} goBackAction={props.navigation.goBack} />
      <View style={styles.tagInfoContainer}>
        <PaaveText type={TEXT_TYPE.BOLD_20} color={dynamicColors.LIGHTTextContent}>
          #{tagInfo.hashtag}
        </PaaveText>
        <View style={styles.moreTagInfo}>
          <View style={styles.tagInfoItem}>
            <PaaveText type={TEXT_TYPE.BOLD_18} color={dynamicColors.LIGHTTextContent}>
              {tagInfo.totalPosts}
            </PaaveText>
            <PaaveText type={TEXT_TYPE.REGULAR_12} color={dynamicColors.LIGHTTextContent}>
              {t('Posts')} {t('in 7 days')}
            </PaaveText>
          </View>
          <View style={styles.tagInfoItem}>
            <PaaveText type={TEXT_TYPE.BOLD_18} color={dynamicColors.LIGHTTextContent}>
              {tagInfo.participants}
            </PaaveText>
            <PaaveText type={TEXT_TYPE.REGULAR_12} color={dynamicColors.LIGHTTextContent}>
              {t('Participants')} {t('in 7 days')}
            </PaaveText>
          </View>
          <View style={styles.tagInfoItem}>
            <PaaveText type={TEXT_TYPE.BOLD_18} color={dynamicColors.LIGHTTextContent}>
              {tagInfo.todayPosts}
            </PaaveText>
            <PaaveText type={TEXT_TYPE.REGULAR_12} color={dynamicColors.LIGHTTextContent}>
              {t('Posts today')}
            </PaaveText>
          </View>
        </View>
      </View>
      <SocialPostList data={state.data} loading={state.loading} onEndReached={handlers.onLoadMore} />
    </View>
  );
});
