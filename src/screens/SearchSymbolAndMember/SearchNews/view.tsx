import React, { forwardRef, memo, useImperativeHandle } from 'react';
import { RefreshControl, View } from 'react-native';
import { useStyles } from './styles';
import { SearchScreenTabRef } from '../type';
import PaaveText from 'components/PaaveText';
import { useTranslation } from 'react-i18next';
import ButtonScrollToTop from 'components/ButtonScrollToTop';
import NewsList from 'screens/News/components/NewsList';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { IProps } from './type';
import { useNewsLogic } from './logic';

export type SearchNews = SearchScreenTabRef;

export const SearchNews = memo(
  forwardRef<SearchNews, IProps>((props, ref) => {
    const { t } = useTranslation();
    const { styles, dynamicColors } = useStyles();
    const { handlers, state, refs } = useNewsLogic(props);

    useImperativeHandle(ref, () => ({
      onSearchTextChange: handlers.onChangeSearchValue,
    }));

    return (
      <View style={styles.container}>
        <NewsList
          flatListRef={refs.flatListRef}
          data={state.searchValue !== '' ? props.listNewsSearch : props.listNewsNotPinned}
          renderItem={undefined}
          style={styles.container}
          contentContainerStyle={styles.containerContent}
          onEndReached={handlers.onLoadMore}
          onEndReachedThreshold={0.5}
          keyboardShouldPersistTaps={'never'}
          detailItem
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={handlers.onRefresh}
              tintColor={dynamicColors.BlueNewColor}
            />
          }
          onScroll={handlers.onScroll}
          keyItem={'NEWS_LIST'}
          ListHeaderComponent={
            <>
              {state.searchValue === '' && props.listNewsNotPinned.length > 0 && (
                <PaaveText type={TEXT_TYPE.BOLD_16} color={dynamicColors.BlueNewColor} style={styles.titleLatestNews}>
                  {t('latest_articles')}
                </PaaveText>
              )}
            </>
          }
        />

        <ButtonScrollToTop listRef={refs.flatListRef} ref={refs.btnScrollToTopRef} />
      </View>
    );
  })
);
