import { View } from 'react-native';
import React, { memo, useMemo, useState } from 'react';
import { useStyles } from './styles';
import TabSelector from 'components/TabSelector';
import SheetData3, { HeaderConfig } from 'components/SheetData3';
import SheetDataHeader from 'components/SheetDataHeader';
import Row from './Row';
import { useAppSelector } from 'hooks';
import { ForeignTradingSelector } from 'reduxs';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';

export const ForeignBuySellTab = {
  TopBuy: 'top_foreign_buy',
  TopSell: 'top_foreign_sell',
} as const;
export type ForeignBuySellTab = keyof typeof ForeignBuySellTab;

export const StockList = memo(() => {
  const { styles } = useStyles();

  const [tab, setTab] = useState<ForeignBuySellTab>('TopBuy');
  const data = useAppSelector(ForeignTradingSelector.selectTableData(tab));

  const symbolList = useMemo(() => data.map(item => item.s), [data]);

  useSubscribeSymbol(symbolList, ['BID_OFFER', 'QUOTE'], true);

  return (
    <View style={styles.container}>
      <TabSelector value={tab} setValue={setTab} listValue={ForeignBuySellTab} style={styles.tabContainer} />
      <SheetDataHeader {...StockHeaderConfig} />
      <SheetData3 RowComponent={Row} data={data} style={styles.stockListContainer} />
    </View>
  );
});

const StockHeaderConfig: HeaderConfig = {
  height: 50,
  data: [
    {
      content: 'Stock',
      width: 65,
    },
    [
      {
        content: 'Price',
        width: 110,
      },
      {
        content: 'Change',
        width: 110,
      },
    ],
    [
      {
        content: 'F.Buy (Bil)',
        width: 100,
      },
      {
        content: 'F.Sell (Bil)',
        width: 100,
      },
    ],
    {
      content: 'F.Net Buy (Bil)',
      width: 100,
    },
  ],
};
