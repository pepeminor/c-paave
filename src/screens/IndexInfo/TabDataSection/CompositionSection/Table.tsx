import React, { memo, useMemo } from 'react';
import { useAppSelector } from 'hooks/useAppSelector';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import useStyles from './styles';
import TableHeader from 'screens/Discover/HotStock/HotStockTableHeader';
import { ScrollView } from 'react-native';
import SymbolTag from 'components/SymbolTag2';

const CompositionTable = () => {
  const { styles } = useStyles();

  const indexRankList = useAppSelector(state => state.symbolIndexRankList);
  const stockList = useMemo(() => indexRankList.data?.map(el => el.stockCode) ?? [], [indexRankList.data]);

  useSubscribeSymbol(stockList, ['QUOTE']);

  return (
    <>
      <TableHeader />
      <ScrollView style={styles.containerHotStock}>
        {indexRankList?.data?.map(item => (
          <SymbolTag showTotalTrading={true} symbolCode={item.stockCode} key={item.stockCode} />
        ))}
      </ScrollView>
    </>
  );
};

export default memo(CompositionTable);
