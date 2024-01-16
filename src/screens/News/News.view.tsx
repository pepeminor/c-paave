import React from 'react';
import { RefreshControl, View } from 'react-native';
import { useNewsLogic } from './News.logic';
import useStyles from './News.style';
import { IProps } from './News.type';
import withMemo from 'HOC/withMemo';
import HeaderScreen from 'components/HeaderScreen';
import NewsList from './components/NewsList';
import { useTranslation } from 'react-i18next';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import ButtonScrollToTop from 'components/ButtonScrollToTop';
import PaaveButton from 'components/PaaveButton';
import { scaleSize } from 'styles';

const News = (props: IProps) => {
  const { handlers, state, refs } = useNewsLogic(props);
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  return (
    <View style={styles.container}>
      <HeaderScreen
        headerTitle={'market_news'}
        leftButtonIcon={true}
        goBackAction={props.navigation.goBack}
        rightButtonListIcon={[
          <PaaveButton
            key={'search'}
            iconSize={scaleSize(24)}
            textColor={dynamicColors.WHITE}
            color={dynamicColors.Transparent}
            icon={'search'}
            onPress={handlers.goToSearch}
          />,
        ]}
      />

      <NewsList
        flatListRef={refs.flatListRef}
        data={state.searchValue !== '' ? props.listNewsSearch : props.listNewsNotPinned}
        renderItem={undefined}
        style={styles.container}
        contentContainerStyle={styles.containerContent}
        onEndReached={handlers.onLoadMore}
        onEndReachedThreshold={0.5}
        keyboardShouldPersistTaps={'never'}
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
            {state.searchValue === '' && props.listNewsPinned.length > 0 && (
              <NewsList
                data={props.listNewsPinned}
                renderItem={undefined}
                ListHeaderComponent={
                  <PaaveText style={styles.title} type={TEXT_TYPE.BOLD_16} color={dynamicColors.LIGHTTextContent}>
                    {t('pinned_news')}
                  </PaaveText>
                }
                scrollEnabled={false}
                keyItem={'PINNED_NEWS'}
              />
            )}
            {state.searchValue === '' && props.listNewsNotPinned.length > 0 && (
              <PaaveText type={TEXT_TYPE.BOLD_16} color={dynamicColors.LIGHTTextContent} style={styles.titleLatestNews}>
                {t('latest_articles')}
              </PaaveText>
            )}
          </>
        }
      />

      <ButtonScrollToTop listRef={refs.flatListRef} ref={refs.btnScrollToTopRef} />
    </View>
  );
};

export default withMemo(News);
