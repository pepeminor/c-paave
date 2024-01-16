import { ScrollView, View } from 'react-native';
import React, { memo } from 'react';
import { useAppSelector } from 'hooks';
import { getStylesHook } from 'hooks/useStyles';
import { HotStockAction, HotStockOrderType, HotStockPeriodType, HotStockSource, HotStockType } from 'reduxs/HotStock';
import ItemSelector from 'components/ItemSelector';
import { store } from 'screens/App';

const sourceSelect = {
  Virtual: {
    label: 'Virtual Trading',
    key: 'Virtual',
    abbr: 'V.T',
  },
  KIS: {
    label: 'KIS',
    key: 'KIS',
  },
} as const;

const typeSelect = {
  MostBought: {
    label: 'Most Bought',
    key: 'MostBought',
  },
  MostSold: {
    label: 'Most Sold',
    key: 'MostSold',
  },
  MostSearched: {
    label: 'Most Searched',
    key: 'MostSearched',
  },
};

const dateSelect = {
  DAY: {
    label: 'Daily',
    key: 'DAY',
  },
  WEEK: {
    label: 'Weekly',
    key: 'WEEK',
  },
  MONTH: {
    label: 'Monthly',
    key: 'MONTH',
  },
};

const valueSelect = {
  TOTAL_TRADING_VALUE: {
    label: 'Value',
    key: 'TOTAL_TRADING_VALUE',
  },
  TOTAL_TRADING_VOLUME: {
    label: 'Volume',
    key: 'TOTAL_TRADING_VOLUME',
  },
};

const onChangeHotStockParams = HotStockAction.updateHotStockParams;

const HotStock_onSelectOptionSource = (value: keyof typeof sourceSelect) => {
  store.dispatch(
    onChangeHotStockParams({
      hotStockSource: value as HotStockSource,
    })
  );
};

const HotStock_onSelectOptionType = (value: keyof typeof typeSelect) => {
  store.dispatch(
    onChangeHotStockParams({
      hotStockType: value as HotStockType,
    })
  );
};

const HotStock_onSelectOptionPeriod = (value: keyof typeof dateSelect) => {
  store.dispatch(
    onChangeHotStockParams({
      hotStockPeriodType: value as HotStockPeriodType,
    })
  );
};

const HotStock_onSelectOptionValueType = (value: keyof typeof valueSelect) => {
  store.dispatch(
    onChangeHotStockParams({
      hotStockOrderType: value as HotStockOrderType,
    })
  );
};

const FilterSelector = () => {
  const { styles } = useStyles();

  const hotStockSource = useAppSelector(state => state.HotStock.hotStockSource);
  const hotStockType = useAppSelector(state => state.HotStock.hotStockType);
  const hotStockPeriodType = useAppSelector(state => state.HotStock.hotStockPeriodType);
  const hotStockOrderType = useAppSelector(state => state.HotStock.hotStockOrderType);

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.subContainer}>
        <ItemSelector config={sourceSelect} setValue={HotStock_onSelectOptionSource} value={hotStockSource} />
        <ItemSelector config={typeSelect} setValue={HotStock_onSelectOptionType} value={hotStockType} />
        <ItemSelector config={dateSelect} setValue={HotStock_onSelectOptionPeriod} value={hotStockPeriodType} />
        <ItemSelector config={valueSelect} setValue={HotStock_onSelectOptionValueType} value={hotStockOrderType} />
      </ScrollView>
    </View>
  );
};

export default memo(FilterSelector);

const useStyles = getStylesHook({
  subContainer: {
    marginHorizontal: 5,
  },
});
