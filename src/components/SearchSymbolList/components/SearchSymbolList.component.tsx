import { Text, View } from 'react-native';
import React, { forwardRef, memo, useCallback } from 'react';
import { scaleSize } from 'styles';
import SearchItemComponent from './SearchItem.component';
import { useStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { useControlledSubscribeSymbol } from 'hooks';
import { FlashList, ListRenderItemInfo, ViewToken } from '@shopify/flash-list';
import { throttle } from 'lodash';
import { SearchSymbolFlow } from '../type';

type Props = {
  data?: string[];
  flow: SearchSymbolFlow;
  onPressSymbol?: (code: string) => void;
  isInWatchList?: (code: string) => boolean;
};

const keyExtractor = (item: string, index: number) => `SearchAndAddWatchList_SymbolList_${index}_${item}`;
const ItemHeight = scaleSize(72);

const SearchSymbolList = forwardRef<FlashList<string>, Props>(
  ({ data = [], flow, onPressSymbol, isInWatchList }, ref) => {
    const { styles } = useStyles();
    const { t } = useTranslation();

    const renderSymbolSearchItem = useCallback(
      ({ item }: ListRenderItemInfo<string>) => {
        return (
          <SearchItemComponent onPressSymbol={onPressSymbol} isInWatchList={isInWatchList} code={item} flow={flow} />
        );
      },
      [onPressSymbol]
    );

    const { subscribeRef } = useControlledSubscribeSymbol(data, ['BID_OFFER', 'QUOTE'], 10, true);

    const onViewableItemsChanged = useCallback(
      throttle(
        ({ viewableItems }: { viewableItems: ViewToken[] }) => {
          const length = viewableItems.length;
          if (length > 0) {
            const firstIndex = viewableItems[0].index ?? 0;
            const lastIndex = viewableItems[length - 1].index ?? 0;
            subscribeRef.current(firstIndex, lastIndex + 2);
          }
        },
        200,
        { trailing: true }
      ),
      []
    );

    if (data.length === 0) {
      return (
        <View style={styles.noDataFound}>
          <Text allowFontScaling={false}>{t('There is no data')}</Text>
        </View>
      );
    }

    return (
      <FlashList
        ref={ref}
        bounces={true}
        estimatedItemSize={ItemHeight}
        renderItem={renderSymbolSearchItem}
        data={data}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    );
  }
);

export default memo(SearchSymbolList);
