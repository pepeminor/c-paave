import React, { useMemo } from 'react';
import { RefreshControl, View } from 'react-native';
import withMemo from 'HOC/withMemo';
import { useScreenLogic } from './StockTheme.logic';
import { IProps } from './StockTheme.type';
import { useStyles } from './StockTheme.style';
import SheetData3 from 'components/SheetData3';
import HeaderButton from './components/HeaderButton';
import SheetDataHeader from 'components/SheetDataHeader';
import Row from './components/Row';
import { useTranslation } from 'react-i18next';
import globalStyles, { scaleSize } from 'styles';
import TabSelector from 'components/TabSelector';
import { ThemePeriod } from 'reduxs';

const ItemHeight = scaleSize(40);
const getFlatListLayout = (_: unknown, index: number) => {
  return {
    length: ItemHeight,
    offset: ItemHeight * index,
    index,
  };
};

const StockTheme = (props: IProps) => {
  const { state, handlers, period, paginatedData } = useScreenLogic(props);
  const { styles } = useStyles();
  const { t } = useTranslation();

  const HeaderConfig = useMemo(
    () => [
      {
        content: <HeaderButton text={t('Theme')} onPress={handlers.onSortNamePressed} sortType={state.sortName} />,
        width: 180,
      },
      {
        content: <HeaderButton text={t('Change')} onPress={handlers.onSortRatePressed} sortType={state.sortRate} />,
        width: 90,
      },
      {
        content: <HeaderButton text={t('Details')} />,
        width: 105,
      },
    ],
    [state.sortName, state.sortRate, t]
  );

  return (
    <View style={styles.container}>
      <TabSelector value={period} setValue={handlers.setThemePeriod} listValue={ThemePeriod} />
      <View style={globalStyles.container}>
        <SheetDataHeader height={44} data={HeaderConfig} />
        <SheetData3
          data={paginatedData}
          RowComponent={Row}
          useFlatList
          getItemLayout={getFlatListLayout}
          initialNumToRender={15}
          maxToRenderPerBatch={15}
          refreshControl={<RefreshControl refreshing={state.refreshing} onRefresh={handlers.onRefresh} />}
          contentContainerStyle={styles.contentContainer}
          onEndReached={handlers.onEndReached}
        />
      </View>
    </View>
  );
};

export default withMemo(StockTheme);
