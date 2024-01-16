import React, { useCallback, useRef } from 'react';
import useStyles from './SocialPostList.style';
import { IProps } from './SocialPostList.type';
import withMemo from 'HOC/withMemo';
import Post from 'components/SocialPost';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { IListId } from 'reduxs';
import EmptyPost from './EmptyPost';
import LoadingPost from 'components/LoadingPost';
import ButtonScrollToTop from 'components/ButtonScrollToTop';
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl } from 'react-native';
import SeeNewPost, { RefBtnScrollToTop } from './SeeNewPost';
import LoginRequired from 'components/LoginRequired';

const keyExtractor = (item: IListId) => item.id;
// const ViewConfig = {
//   viewAreaCoveragePercentThreshold: 100,
//   waitForInteraction: false,
// };

export const SocialPostList = withMemo(
  ({ refreshing = false, loading, onRefresh, onScroll: _onScroll, ...flashListProps }: IProps) => {
    const { styles, dynamicColors } = useStyles();

    const flashListRef = useRef<FlashList<any>>(null);
    const btnScrollToTopRef = useRef<RefBtnScrollToTop>(null);
    const seeNewPostRef = useRef<RefBtnScrollToTop>(null);

    const onScroll = useCallback(
      (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        btnScrollToTopRef.current?.onScroll(e);
        seeNewPostRef.current?.onScroll(e);
        _onScroll?.(e);
      },
      [_onScroll]
    );

    const renderItem = useCallback(({ item }: ListRenderItemInfo<IListId>) => {
      return <Post postId={item.id} indexAnimation={item.indexAnimation} />;
    }, []);

    return (
      <>
        <LoginRequired />
        <FlashList
          ref={flashListRef}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          onEndReachedThreshold={0.2}
          progressViewOffset={200}
          estimatedItemSize={1000}
          scrollEventThrottle={16}
          bounces={true}
          onScroll={onScroll}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          // viewabilityConfig={ViewConfig}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={dynamicColors.BlueNewColor} />
          }
          ListEmptyComponent={loading ? <LoadingPost /> : <EmptyPost />}
          {...flashListProps}
        />
        <ButtonScrollToTop listRef={flashListRef} ref={btnScrollToTopRef} containerStyle={styles.scrollToTopBtn} />

        <SeeNewPost listRef={flashListRef} ref={seeNewPostRef} />
      </>
    );
  }
);
