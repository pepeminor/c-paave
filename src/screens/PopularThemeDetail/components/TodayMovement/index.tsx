import { View, RefreshControl, ViewToken } from 'react-native';
import React, { memo, useMemo, useRef, useState } from 'react';
import { useStyles } from './styles';
import { ThemeInfo } from './components/ThemeInfo';
import { TodayMovementProps } from './type';
import { useTodayMovementLogic } from './logic';
import SheetDataHeader from 'components/SheetDataHeader';
import SheetData3 from 'components/SheetData3';
import { ThemeRow } from './components/Row';
import globalStyles, { scaleSize } from 'styles';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import { throttle } from 'lodash';
import { SortCell } from './components/SortCell';
import { useTranslation } from 'react-i18next';
import TabSelector from 'components/TabSelector';
import { ThemePeriod } from 'reduxs';

const ItemHeight = scaleSize(52);
const getFlatListLayout = (_: unknown, index: number) => {
  return {
    length: ItemHeight,
    offset: ItemHeight * index,
    index,
  };
};

export const TodayMovement = memo((props: TodayMovementProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation();

  const { state, handlers, themeData, paginatedData, period } = useTodayMovementLogic(props);

  const { onViewableItemsChanged } = useHandleSubscribeViewableItem(state.sortedStocks);

  const HeaderConfig = useMemo(
    () => [
      {
        content: <SortCell text="Symbol" onPress={handlers.onSortNamePressed} sortType={state.sortName} />,
        width: 172,
      },
      [
        {
          content: <SortCell text="Price" onPress={handlers.onSortPricePressed} sortType={state.sortPrice} />,
          width: 110,
        },
        {
          content: (
            <SortCell
              text={`${period}-${t('Change')}`}
              onPress={handlers.onSortRatePressed}
              sortType={state.sortRate}
            />
          ),
          width: 110,
        },
      ],
      [
        {
          content: 'Volume',
          width: 90,
        },
        {
          content: 'Value',
          width: 90,
        },
      ],
    ],
    [state.sortName, state.sortPrice, state.sortRate, period]
  );

  const RowComponent = useMemo(() => ThemeRow({ themeName: props.themeName, period }), [props.themeName, period]);

  return (
    <>
      <TabSelector value={period} setValue={handlers.setThemePeriod} listValue={ThemePeriod} />
      <ThemeInfo
        increase={themeData.noOfIncreases}
        unchanges={themeData.noOfUnchanges}
        decrease={themeData.noOfDecreases}
      />
      <SheetDataHeader height={53} data={HeaderConfig} />
      <View style={styles.container}>
        <SheetData3
          data={paginatedData}
          RowComponent={RowComponent}
          useFlatList
          getItemLayout={getFlatListLayout}
          onViewableItemsChanged={onViewableItemsChanged}
          refreshControl={<RefreshControl refreshing={state.refreshing} onRefresh={handlers.onRefresh} />}
          contentContainerStyle={styles.contentContainer}
          style={globalStyles.container}
          onEndReached={handlers.onEndReached}
        />
      </View>
    </>
  );
});

const useHandleSubscribeViewableItem = (stockList: string[] | undefined) => {
  const [viewableRange, setViewableRange] = useState<[number, number]>([0, Infinity]);

  useSubscribeSymbol(stockList?.slice(...viewableRange), ['QUOTE', 'BID_OFFER'], true);

  const onViewableItemsChanged = useRef(
    throttle(
      ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length < 10) return;
        const firstIndex = viewableItems[0].index ?? 0;
        const lastIndex = (viewableItems[viewableItems.length - 1].index ?? Infinity) + 3;
        setViewableRange([firstIndex, lastIndex]);
      },
      300,
      { trailing: true }
    )
  ).current;

  return { onViewableItemsChanged };
};
