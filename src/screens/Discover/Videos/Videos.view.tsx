import React, { useMemo } from 'react';
import { View, TouchableOpacity, FlatList, ListRenderItemInfo } from 'react-native';
import { useVideosLogic } from './Videos.logic';
import useStyles from './Videos.style';
import { IProps, VideoTabConfig } from './Videos.type';
import withMemo from 'HOC/withMemo';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { useTranslation } from 'react-i18next';
import Icon from 'components/Icon';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { IVideoItem, VideoTab } from 'reduxs';
import ItemVideo from './components/ItemVideo';
import ItemShortVideo from './components/ItemShortVideo';
import TabSelector from 'components/TabSelector';

const RenderItemFullVideo = ({ item }: ListRenderItemInfo<IVideoItem>) => {
  return <ItemVideo item={item} key={`VIDEO_${item.id}`} />;
};

const RenderItemShortVideo = ({ item }: ListRenderItemInfo<IVideoItem>) => {
  return <ItemShortVideo item={item} key={`VIDEO_${item.id}`} />;
};

const Videos = (props: IProps) => {
  const { state, handlers } = useVideosLogic(props);
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  const CONFIG: VideoTabConfig = useMemo(
    () => ({
      FULL_VIDEO: {
        renderItem: RenderItemFullVideo,
        data: props.videosFullList,
      },
      SHORT_VIDEO: {
        renderItem: RenderItemShortVideo,
        data: props.videosShortList,
      },
      EDUCATION: {
        renderItem: RenderItemFullVideo,
        data: props.videosEducationList,
      },
    }),
    [props.videosFullList, props.videosShortList, props.videosEducationList]
  );

  const CurrentConfig = CONFIG[state.tab];

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <PaaveText type={TEXT_TYPE.BOLD_18} color={dynamicColors.LIGHTTextBigTitle}>
          {t('videos')}
        </PaaveText>
        <TouchableOpacity style={styles.containerSeeAll} onPress={handlers.onNavigateVideoList}>
          <PaaveText type={TEXT_TYPE.BOLD_14} color={dynamicColors.BlueNewColor}>
            {t('See all') + '  '}
          </PaaveText>
          <Icon name={'arrow-right-double'} size={16} color={dynamicColors.BlueNewColor} />
        </TouchableOpacity>
      </View>

      <TabSelector
        type="UNDERLINE"
        value={state.tab}
        setValue={handlers.setTab}
        listValue={VideoTab}
        selectedContainer={styles.noMarginHorizontal}
        unSelectedContainer={styles.noMarginHorizontal}
        selectedText={styles.textSelected}
        unSelectedText={styles.textUnSelected}
      />

      <FlatList
        data={CurrentConfig.data}
        renderItem={CurrentConfig.renderItem}
        horizontal={true}
        style={styles.containerList}
        contentContainerStyle={styles.containerContent}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <ContentLoader
            speed={2}
            width={400}
            height={200}
            viewBox="0 0 400 200"
            backgroundColor={dynamicColors.LIGHTIconDisable}
            foregroundColor={dynamicColors.WHITE}
          >
            <Rect x="0" y="0" rx="0" ry="0" width="270" height="200" />
            <Rect x="282" y="0" rx="0" ry="0" width="270" height="200" />
          </ContentLoader>
        }
      />
    </View>
  );
};

export default withMemo(Videos);
