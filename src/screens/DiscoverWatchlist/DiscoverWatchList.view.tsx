import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDiscoverWatchListLogic } from './DiscoverWatchList.logic';
import useStyles from './DiscoverWatchList.style';
import { IProps } from './DiscoverWatchList.type';
import withMemo from 'HOC/withMemo';
import { scaleSize } from 'styles';
import Watchlist from './components/Watchlist';
import IconAddSymbol from 'assets/icon/IconAddSymbol.svg';
import Trash from 'assets/icon/Trash.svg';
import { useTranslation } from 'react-i18next';
import HeaderScreen from 'components/HeaderScreen';
import WatchListHeader from './components/WatchListHeader';
import { navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

const goToTrade = () => navigate({ key: ScreenNames.Trade });

const DiscoverWatchList = (props: IProps) => {
  const { handlers } = useDiscoverWatchListLogic(props);
  const { styles } = useStyles();
  const { t } = useTranslation();

  const isDisableDelete = props.selectedWatchlistSymbolList.data.length === 0;
  const isWatchList = props.selectedWatchList.watchListId !== -1;

  return (
    <View style={styles.watchListWholeContainer}>
      <HeaderScreen headerTitle={'Discover'} leftButtonIcon={true} goBackAction={props.navigation.goBack} />
      <WatchListHeader />
      {/* symbol list */}
      <Watchlist />

      {isWatchList && (
        <View style={styles.watchNoListContainer}>
          <TouchableOpacity onPress={handlers.goToAddSymbolsToWatchList} style={styles.executeFormButton}>
            <IconAddSymbol width={scaleSize(24)} height={scaleSize(24)} />
            <Text allowFontScaling={false} style={styles.executeFormButtonText}>
              {t('Add Symbols')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlers.goToDeleteSymbolsToWatchList}
            style={[styles.removeButton, isDisableDelete && styles.disabledButton]}
            disabled={isDisableDelete}
          >
            <Trash width={scaleSize(24)} height={scaleSize(24)} />
          </TouchableOpacity>
        </View>
      )}
      {!isWatchList && (
        <View style={styles.watchNoListContainer}>
          <TouchableOpacity onPress={goToTrade} style={styles.executeFormButton}>
            <IconAddSymbol width={scaleSize(24)} height={scaleSize(24)} />
            <Text allowFontScaling={false} style={styles.executeFormButtonText}>
              {t('Trade Now')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default withMemo(DiscoverWatchList);
