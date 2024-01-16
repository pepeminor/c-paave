import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useStyles from '../ManageWatchlist.style';
import withMemo from 'HOC/withMemo';
import { IGetAllWatchlistResponse } from 'interfaces/favorite';
import RemoveWatchlist from 'assets/icon/RemoveWatchlist.svg';
import EditWatchlist from 'assets/icon/EditWatchlist.svg';
import useModalOrder from 'hooks/useModalOrder';
import globalStyles from 'styles';
import { t } from 'i18next';
import { RadioButton } from 'components/Radio';
import { DISCOVER_WATCHLIST_SET_DEFAULT } from 'reduxs/actions';
import { useAppSelector } from 'hooks/useAppSelector';
import { store } from 'screens/App';

interface IProps {
  item: IGetAllWatchlistResponse;
  disableDelete: boolean;
  onDeleteWatchList: (item: IGetAllWatchlistResponse) => () => void;
  onOpenEditModal: (item: IGetAllWatchlistResponse) => void;
}

const WatchListItem = (props: IProps) => {
  const { item, disableDelete, onDeleteWatchList, onOpenEditModal } = props;
  const { styles } = useStyles();
  const [ModalComponentDelete, onVisibleModalDelete] = useModalOrder({
    title: 'Delete WatchList',
    onConfirm: onDeleteWatchList(item),
    confirmText: 'Yes',
    ListContentModal: (
      <View style={globalStyles.alignCenter}>
        <Text allowFontScaling={false}>{t('Do you want to delete this watch list')}?</Text>
      </View>
    ),
  });

  const isFavorite = useAppSelector(
    state => state.userBasedReducer.data.favoriteWatchlist?.[state.selectedAccount.type] === item.watchListId
  );
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);

  const onPressDelete = useCallback(() => {
    onVisibleModalDelete();
  }, [onVisibleModalDelete]);

  const onPressEdit = useCallback(() => {
    onOpenEditModal(item);
  }, [item, onOpenEditModal]);

  const WatchListItem_onPressRadio = useCallback(() => {
    store.dispatch({
      type: DISCOVER_WATCHLIST_SET_DEFAULT,
      payload: { [selectedAccountType]: item.watchListId },
    });
  }, [item.watchListId, selectedAccountType]);

  return (
    <View style={styles.watchListItemContainer}>
      <TouchableOpacity
        style={[styles.removeIconContainer, disableDelete ? styles.disableDeleteContainer : {}]}
        onPress={onPressDelete}
        disabled={disableDelete}
      >
        <RemoveWatchlist />
      </TouchableOpacity>

      <Text allowFontScaling={false} style={styles.watchlistNameText}>
        {item.watchListName}
      </Text>
      <TouchableOpacity style={styles.editIconContainer} onPress={onPressEdit}>
        <EditWatchlist />
      </TouchableOpacity>
      <RadioButton style={styles.radioContainer} enabled={isFavorite} onPress={WatchListItem_onPressRadio} />
      {ModalComponentDelete}
    </View>
  );
};

export default withMemo(WatchListItem);
