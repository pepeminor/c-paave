import { ITradingHistories } from 'interfaces/profile';
import React, { memo } from 'react';
import StockListLeaderActivity1 from './components/StockListLeaderActivity1';
import StockListLeaderActivity2 from './components/StockListLeaderActivity2';

type IStockListLeaderActivityProps = {
  isTradingHistory?: boolean;
  listTradingHistory?: ITradingHistories[];
  isLoadingHistory?: boolean;
};

const StockListLeaderActivity = ({
  isTradingHistory,
  listTradingHistory,
  isLoadingHistory,
}: IStockListLeaderActivityProps) => {
  return (
    <>
      {isTradingHistory ? (
        <StockListLeaderActivity2 listTradingHistory={listTradingHistory} isLoadingHistory={isLoadingHistory} />
      ) : (
        <StockListLeaderActivity1 />
      )}
    </>
  );
};

export default memo(StockListLeaderActivity);
