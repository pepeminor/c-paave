import React, { useMemo } from 'react';
import { View, FlatList, ListRenderItemInfo, Dimensions } from 'react-native';
import { useVideosLogic } from './Videos.logic';
import useStyles from './Videos.style';
import { IProps } from './Videos.type';
import withMemo from 'HOC/withMemo';
import ContentLoader, { Rect } from 'react-content-loader/native';
import LoginRequired from 'components/LoginRequired';
import { IVideoItem, VideoTab } from 'reduxs';
import ItemVideo from './components/ItemVideo';
import ItemShortVideo from './components/ItemShortVideo';
import HeaderScreen from 'components/HeaderScreen';
import TabSelector from 'components/TabSelector';
import { VideoTabConfig } from 'screens/Discover/Videos/Videos.type';

const SCREEN_WIDTH = Dimensions.get('window').width;

const RenderItemFullVideo = ({ item }: ListRenderItemInfo<IVideoItem>) => {
  return <ItemVideo item={item} key={`VIDEO_${item.id}`} />;
};

const RenderItemShortVideo = ({ item }: ListRenderItemInfo<IVideoItem>) => {
  return <ItemShortVideo item={item} key={`VIDEO_${item.id}`} />;
};

const VideosDetailScreen = (props: IProps) => {
  const { state, handlers } = useVideosLogic(props);
  const { styles } = useStyles();

  const CONFIG: VideoTabConfig = useMemo(
    () => ({
      FULL_VIDEO: {
        renderItem: RenderItemFullVideo,
        data: props.videosList,
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
    [props.videosList, props.videosShortList, props.videosEducationList]
  );

  const CurrentConfig = CONFIG[state.tab];

  if (props.videosList.length === 0) {
    return (
      <View style={styles.containerEmpty}>
        <HeaderScreen headerTitle={'videos'} />

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
      <HeaderScreen headerTitle={'videos'} leftButtonIcon={true} goBackAction={props.navigation.goBack} />
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
        style={styles.containerList}
        numColumns={state.tab === 'SHORT_VIDEO' ? 2 : 1}
        contentContainerStyle={styles.containerContent}
        showsVerticalScrollIndicator={false}
        key={state.tab}
        onEndReachedThreshold={0.5}
        onEndReached={handlers.onLoadMore}
      />
    </View>
  );
};

export default withMemo(VideosDetailScreen);
