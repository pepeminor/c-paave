import React, { useMemo, useRef } from 'react';
import { ViewToken } from 'react-native';
import { usePriceBoardLogic } from './PriceBoard.logic';
import useStyles from './PriceBoard.style';
import { IProps, ItemHeight } from './PriceBoard.type';
import withMemo from 'HOC/withMemo';
import { formatNumber } from 'utils';
import { throttle } from 'lodash';
import { SymbolType } from 'constants/enum';
import SheetData3 from 'components/SheetData3';
import PriceBoardRow from './components/PriceBoardRow';

export const PriceBoardFormatter = {
  formatPrice: (value: unknown, stockType?: keyof typeof SymbolType) => {
    if (typeof value !== 'number') return '-';
    if (stockType === SymbolType.FUTURES) return formatNumber(value, 1, undefined, true);
    return formatNumber(value / 1000, 2, undefined, true);
  },
  formatIndexPrice: (value: unknown) => {
    if (typeof value !== 'number') return '-';
    return formatNumber(value, 2, undefined, true);
  },
  formatPercent: (value: unknown) => {
    if (typeof value !== 'number') return '';
    return formatNumber(value, 2, undefined, true) + '%';
  },
  formatVolume: (value: unknown) => {
    if (typeof value !== 'number') return '';
    return formatNumber(value, 0);
  },
};

const getFlatListLayout = (_: unknown, index: number) => {
  return {
    length: ItemHeight,
    offset: ItemHeight * index,
    index,
  };
};

/**
 * The number of items to render before and after the visible area
 */
const ScrollViewRenderOffset = 4;

const PriceBoard = (props: IProps) => {
  const { styles } = useStyles();
  // eslint-disable-next-line no-empty-pattern
  const { state, handlers, priceChangeType, totalType } = usePriceBoardLogic(props);

  const InjectedPriceBoardRow = useMemo(
    () => PriceBoardRow({ priceChangeType: priceChangeType, totalType: totalType }),
    [priceChangeType, totalType]
  );

  const onViewableItemsChanged = useRef(
    throttle(
      ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        const startIndex = (viewableItems[0]?.index ?? 0) - ScrollViewRenderOffset;
        const endIndex = (viewableItems[viewableItems.length - 1]?.index ?? 0) + ScrollViewRenderOffset;
        handlers.setRenderRange({ startIndex: startIndex > 0 ? startIndex : 0, endIndex });
      },
      200,
      {
        trailing: true,
      }
    )
  ).current;

  return (
    <SheetData3
      data={state.listSymbol}
      RowComponent={InjectedPriceBoardRow}
      useFlatList
      onViewableItemsChanged={onViewableItemsChanged}
      getItemLayout={getFlatListLayout}
      style={styles.container}
    />
  );
};

export default withMemo(PriceBoard);
