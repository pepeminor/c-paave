import React, { memo } from 'react';
import SymbolTag from 'components/SymbolTag2';
import { formatNumber } from 'utils';
import { HotStockItem } from 'reduxs/HotStock';

interface IHotStockItemProps {
  data: HotStockItem;
}

const HotStockRow = ({ data }: IHotStockItemProps) => {
  return (
    <SymbolTag
      totalTradingValue={formatNumber(data.totalTradingValue / 1000000, 2, undefined, true)}
      totalTradingVolume={formatNumber(data.totalTradingVolume)}
      symbolCode={data.stockCode}
    />
  );
};

export default memo(HotStockRow);
