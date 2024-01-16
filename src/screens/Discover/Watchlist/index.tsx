/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, Text } from 'react-native';
import { useAppSelector } from 'hooks/useAppSelector';
import useStyles from '../styles';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { clearHistoryAndNavigate } from 'utils';
import WatchListItem from 'screens/DiscoverWatchlist/components/Watchlist';
import withMemo from 'HOC/withMemo';
import useHandlers from 'hooks/useHandlers';
import WatchListHeader from 'screens/DiscoverWatchlist/components/WatchListHeader';
import { useDispatch } from 'react-redux';
import { WatchListActions } from 'reduxs';
import config from 'config';

const Watchlist = () => {
  const { t } = useTranslation();

  const { styles } = useStyles();
  const dispatch = useDispatch();
  const accessToken = useAppSelector(state => state.authToken.accessToken);
  const selectedAccount = useAppSelector(state => state.selectedAccount);

  const handlers = useHandlers({
    goToSignInAndClearStack: () => {
      clearHistoryAndNavigate({
        key: ScreenNames.SignIn,
      });
    },
  });

  useEffect(() => {
    dispatch(
      WatchListActions.initWatchList({
        screenId: ScreenNames.Discover,
        pageSize: config.pageSize,
        refresh: false,
      })
    );
  }, [selectedAccount]);

  return (
    <View style={styles.watchListWholeContainer}>
      <WatchListHeader showButtonMore={true} />
      {!accessToken ? (
        <View style={styles.watchListNonLoginContainer}>
          <Text style={styles.requireSignInText}>{t('Please sign in to watch your favorite symbols')}</Text>
          <TouchableOpacity style={styles.watchListNonLoginContainer2} onPress={handlers.goToSignInAndClearStack}>
            <Text style={styles.signInText}>{t('Sign In')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WatchListItem numberRenderItem={10} showButtonAddSymbols={true} />
      )}
    </View>
  );
};

export default withMemo(Watchlist);
