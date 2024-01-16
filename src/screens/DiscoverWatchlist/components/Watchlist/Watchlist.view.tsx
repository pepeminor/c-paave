import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import WatchlistItem from '../WatchlistItem';
import { useWatchlistLogic } from './Watchlist.logic';
import useStyles from './Watchlist.style';
import { IProps } from './Watchlist.type';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import { useTranslation } from 'react-i18next';
import withMemo from 'HOC/withMemo';
import WatchListType from '../WatchListType';
import IconAddSymbol from 'assets/icon/IconAddSymbol.svg';
import LazyFlashList from 'components/LazyFlashList';

import { ActivityIndicator } from 'react-native-paper';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

const goToTrade = () => navigate({ key: ScreenNames.Trade });

const Watchlist = (props: IProps) => {
  const { handlers } = useWatchlistLogic(props);
  const {
    selectedWatchlistSymbolList,
    selectedWatchList,
    showButtonAddSymbols = false,
    numberRenderItem,
    showEmptySymbol = true,
  } = props;

  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  const renderItem = useCallback(({ item, index }) => {
    return <WatchlistItem item={item} index={index} />;
  }, []);

  const data = useMemo(() => {
    return numberRenderItem != null && numberRenderItem > 0
      ? selectedWatchlistSymbolList.data.slice(0, numberRenderItem)
      : selectedWatchlistSymbolList.data;
  }, [numberRenderItem, selectedWatchlistSymbolList.data]);

  const panGesture = Gesture.Pan()
    .onEnd(e => {
      if (e.translationX > 30) {
        runOnJS(handlers.changeTypeScroll)(false);
      } else if (e.translationX < -30) {
        runOnJS(handlers.changeTypeScroll)(true);
      }
    })
    .activeOffsetX([-30, 30]);

  return selectedWatchlistSymbolList.data != null && selectedWatchList != null ? (
    <GestureDetector gesture={panGesture}>
      <View style={globalStyles.container}>
        {selectedWatchlistSymbolList.data != null && selectedWatchList != null && (
          <WatchListType watchListType={props.watchListType} changeType={handlers.changeType} />
        )}
        <LazyFlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={170}
          bounces={true}
          onViewableItemsChanged={handlers.onViewableItemsChanged}
          scrollEventThrottle={16}
          progressViewOffset={300}
          ListEmptyComponent={
            <View style={styles.containerEmpty}>
              {showEmptySymbol && <EmptySymbol />}
              {selectedWatchList.watchListId !== -1 ? (
                <Text allowFontScaling={false} style={styles.noSymbolsText}>
                  {t('There are no symbol in this watchlist')}.
                </Text>
              ) : (
                <Text allowFontScaling={false} style={styles.noSymbolsText}>
                  {t('You have not owned any symbols yet.')}
                </Text>
              )}
              {showButtonAddSymbols && selectedWatchList.watchListId !== -1 && (
                <View style={globalStyles.fillWidth}>
                  <TouchableOpacity onPress={handlers.goToAddSymbolsToWatchList} style={styles.executeFormButton}>
                    <IconAddSymbol width={scaleSize(24)} height={scaleSize(24)} />
                    <Text allowFontScaling={false} style={styles.executeFormButtonText}>
                      {t('Add Symbols')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {showButtonAddSymbols && selectedWatchList.watchListId === -1 && (
                <View style={globalStyles.fillWidth}>
                  <TouchableOpacity onPress={goToTrade} style={styles.executeFormButton}>
                    <IconAddSymbol width={scaleSize(24)} height={scaleSize(24)} />
                    <Text allowFontScaling={false} style={styles.executeFormButtonText}>
                      {t('Trade Now')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          }
        />
      </View>
    </GestureDetector>
  ) : (
    <View style={globalStyles.container}>
      <ActivityIndicator color={dynamicColors.BLACK} size={'small'} />
    </View>
  );
};

export default withMemo(Watchlist);
