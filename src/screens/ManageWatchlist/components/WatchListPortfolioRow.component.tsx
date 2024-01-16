import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useStyles from '../ManageWatchlist.style';
import withMemo from 'HOC/withMemo';
import { IGetAllWatchlistResponse } from 'interfaces/favorite';
import RemoveWatchlist from 'assets/icon/RemoveWatchlist.svg';
import { useTranslation } from 'react-i18next';
import { RadioButton } from 'components/Radio';
import { DISCOVER_WATCHLIST_SET_DEFAULT } from 'reduxs/actions';
import { useAppSelector } from 'hooks/useAppSelector';
import { store } from 'screens/App';

interface IProps {
  item: IGetAllWatchlistResponse;
}

const WatchListItem = (props: IProps) => {
  const { item } = props;
  const { t } = useTranslation();
  const { styles } = useStyles();
  const isFavorite = useAppSelector(
    state => state.userBasedReducer.data.favoriteWatchlist?.[state.selectedAccount.type] === item.watchListId
  );
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);

  const WatchListItem_onPressRadio = useCallback(() => {
    store.dispatch({
      type: DISCOVER_WATCHLIST_SET_DEFAULT,
      payload: { [selectedAccountType]: item.watchListId },
    });
  }, [item.watchListId, selectedAccountType]);

  return (
    <View style={styles.watchListItemContainer}>
      <TouchableOpacity style={styles.emptyIconContainer}>
        <RemoveWatchlist />
      </TouchableOpacity>
      <Text allowFontScaling={false} style={styles.watchlistNameText}>
        {t(item.watchListName)}
      </Text>
      <RadioButton style={styles.radioContainer} enabled={isFavorite} onPress={WatchListItem_onPressRadio} />
    </View>
  );
};

export default withMemo(WatchListItem);
