import React, { useCallback } from 'react';
import { View, ListRenderItemInfo, Text } from 'react-native';
import { useManageWatchlistLogic } from './ManageWatchlist.logic';
import { IProps } from './ManageWatchlist.type';
import withMemo from 'HOC/withMemo';
import WatchListItemComponent from './components/WatchListItem.component';
import { IGetAllWatchlistResponse } from 'interfaces/favorite';
import LazyFlatList from 'components/LazyFlatList';
import useStyles from './ManageWatchlist.style';
import HeaderScreen from 'components/HeaderScreen';
import { useTranslation } from 'react-i18next';
import WatchListPortfolioRowComponent from './components/WatchListPortfolioRow.component';

const ManageWatchlist = (props: IProps) => {
  const { state, handlers, modals } = useManageWatchlistLogic(props);
  const { t } = useTranslation();
  const { ModalEditWatchList } = modals;
  const { styles } = useStyles();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<IGetAllWatchlistResponse>) => {
      const disableDelete = props.watchListList.data == null || props.watchListList.data.length < 2;

      if (item.watchListId === -1) return <WatchListPortfolioRowComponent key={item.watchListId} item={item} />;

      return (
        <WatchListItemComponent
          key={item.watchListId}
          item={item}
          disableDelete={disableDelete}
          onOpenEditModal={handlers.openEditModal}
          onDeleteWatchList={handlers.onDeleteWatchList}
        />
      );
    },
    [props.watchListList]
  );

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={props.navigation.goBack} headerTitle={t('Manage Watchlist')} />
      {props.watchListList.data != null && (
        <LazyFlatList
          limit={20}
          data={props.watchListList.data}
          renderItem={renderItem}
          ListFooterComponent={
            <Text allowFontScaling={false} style={styles.defaultWatchlistNote}>
              {t('manage_watchlist_default_watchlist_note')}
            </Text>
          }
        />
      )}

      {ModalEditWatchList.current && (
        <ModalEditWatchList.current
          isVisible={state.editModal}
          onCloseModal={handlers.onCloseEditModal}
          isEdit={true}
          watchListName={state.watchListName}
          watchListId={state.watchListId}
        />
      )}
    </View>
  );
};

export default withMemo(ManageWatchlist);
