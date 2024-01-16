import React from 'react';
import { IState } from 'reduxs/global-reducers/index';
import { useSelector } from 'react-redux';
import { ITradeTabOption } from 'global/index';
import PortfolioTable from './portfolioTable';
import OrderbookTable from './orderbookTable';
import useSubAccountSelector from 'hooks/useSubAccountSelector';
import DerivativeList from 'components/DerivativeList';
import { SortType } from 'components/StockList/components/TouchCell';
import withMemo from 'HOC/withMemo';

interface ITradeTabProps {
  plViewType: boolean;
  triggerReload: boolean;
  isNotRefresh?: boolean;
  sortType?: SortType;
  setActiveTitleHeader?: (title: string) => void;
  activeTitleHeader?: string;
  getSortType?: (type: SortType) => void;
  scrollToTop: () => void;
}

const TradeTabTable = ({
  plViewType,
  triggerReload,
  isNotRefresh,
  sortType,
  getSortType,
  scrollToTop,
  activeTitleHeader,
}: ITradeTabProps) => {
  const optionSelecting = useSelector((state: IState) => state.tradeTabOption);
  const { isSubD } = useSubAccountSelector();

  switch (optionSelecting) {
    case ITradeTabOption.PORTFOLIO:
      return isSubD ? (
        <DerivativeList isShowHeader={false} isRealizedPortfolio={false} scrollEnabled={true} />
      ) : (
        <PortfolioTable
          sortType={sortType}
          getSortType={getSortType}
          activeTitleHeader={activeTitleHeader}
          plViewType={plViewType}
          triggerReload={triggerReload}
          isNotRefresh={isNotRefresh}
          scrollToTop={scrollToTop}
        />
      );
    case ITradeTabOption.ORDER_BOOK:
    case ITradeTabOption.CONDITION_ORDER:
      return <OrderbookTable triggerReload={triggerReload} />;

    default:
      return (
        <PortfolioTable
          sortType={sortType}
          getSortType={getSortType}
          activeTitleHeader={activeTitleHeader}
          plViewType={plViewType}
          triggerReload={triggerReload}
          isNotRefresh={isNotRefresh}
          scrollToTop={scrollToTop}
        />
      );
  }
};

export default withMemo(TradeTabTable);
