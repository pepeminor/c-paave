import React from 'react';
import TouchCell, { SortType } from '../TouchCell';
import CellPL from '../CellPL';
import { clone } from 'ramda';
import { compareCurrentValue, comparePL } from '../../helper';
import { TitleHeader } from './HeaderUserWall';
import { IProfitLossItems } from 'interfaces/equity';
import { insertObjectIfElse } from 'utils';
interface IProps {
  isPLRate: boolean;
  changePLMode: () => void;
  originDataProfitLoss: IProfitLossItems[];
  originalListStockCodes: string[];
  setDataStocks: (value: string[]) => void;
  setActiveTitleHeader?: (value: string) => void;
  activeTitle?: string;
  type: string;
  isOwner: boolean;
}

const STOCK_LIST_TYPE = {
  QUANTITY: 'QUANTITY',
  HOLD_DAYS: 'HOLD_DAYS',
};

const COL_IS_OWNER = {
  [STOCK_LIST_TYPE.QUANTITY]: [
    { content: 'Total Qtt', width: 80 },
    { content: 'Sellable', width: 80 },
  ],
  [STOCK_LIST_TYPE.HOLD_DAYS]: [
    { content: 'Weight', width: 80 },
    { content: 'Days Held', width: 80 },
  ],
};

const COL_IS_NOT_OWNER = {
  [STOCK_LIST_TYPE.QUANTITY]: [{ content: 'Total Qtt', width: 80 }],
  [STOCK_LIST_TYPE.HOLD_DAYS]: [
    { content: 'Weight', width: 80 },
    { content: 'Days Held', width: 80 },
  ],
};

const HeaderPortfolio = ({
  originDataProfitLoss,
  originalListStockCodes,
  setDataStocks,
  isPLRate,
  changePLMode,
  setActiveTitleHeader,
  activeTitle,
  type,
  isOwner = true,
}: IProps) => {
  const filterSymbol = (sortType: SortType) => {
    const stocks = clone(originDataProfitLoss);
    setActiveTitleHeader?.(TitleHeader.SYMBOL);
    switch (sortType) {
      case SortType.ASC:
        const dataASC = stocks.sort((a, b) => a.stockCode.localeCompare(b.stockCode)).map(item => item.stockCode);
        setDataStocks(dataASC);
        break;
      case SortType.DESC:
        const dataDESC = stocks.sort((a, b) => b.stockCode.localeCompare(a.stockCode)).map(item => item.stockCode);
        setDataStocks(dataDESC);
        break;
      default:
        setDataStocks(originalListStockCodes);
        break;
    }
  };

  const filterPrice = (sortType: SortType) => {
    const stocks = clone(originDataProfitLoss);
    setActiveTitleHeader?.(TitleHeader.CURVALUE);
    switch (sortType) {
      case SortType.ASC:
        const dataASC = stocks.sort((a, b) => compareCurrentValue(a, b)).map(item => item.stockCode);
        setDataStocks(dataASC);
        break;
      case SortType.DESC:
        const dataDESC = stocks.sort((a, b) => compareCurrentValue(b, a)).map(item => item.stockCode);
        setDataStocks(dataDESC);
        break;
      default:
        setDataStocks(originalListStockCodes);
        break;
    }
  };

  const filterPL = (sortType: SortType) => {
    const stocks = clone(originDataProfitLoss);
    isPLRate ? setActiveTitleHeader?.(TitleHeader.PLPERCENT) : setActiveTitleHeader?.(TitleHeader.PLVALUE);
    switch (sortType) {
      case SortType.ASC:
        const dataASC = stocks.sort((a, b) => comparePL(a, b, isPLRate)).map(item => item.stockCode);

        setDataStocks(dataASC);
        break;
      case SortType.DESC:
        const dataDESC = stocks.sort((a, b) => comparePL(b, a, isPLRate)).map(item => item.stockCode);

        setDataStocks(dataDESC);
        break;
      default:
        setDataStocks(originalListStockCodes);
        break;
    }
  };

  return {
    height: 60,
    data: [
      {
        width: 107,
        content: (
          <TouchCell title="Symbol" onPress={filterSymbol} isActiveFilter={activeTitle === TitleHeader.SYMBOL} />
        ),
      },
      insertObjectIfElse(isOwner, COL_IS_OWNER[type], COL_IS_NOT_OWNER[type]) as [],
      [
        { content: 'Cur Price', width: 80 },
        { content: 'Avg Price', width: 80 },
      ],
      [
        {
          width: 108,
          content: (
            <TouchCell title="Cur Value" onPress={filterPrice} isActiveFilter={activeTitle === TitleHeader.CURVALUE} />
          ),
        },
        {
          width: 108,
          content: (
            <CellPL
              onPressChangePL={changePLMode}
              isPLRate={isPLRate}
              onFilter={filterPL}
              isActiveFilter={activeTitle === TitleHeader.PLPERCENT || activeTitle === TitleHeader.PLVALUE}
            />
          ),
        },
      ],
    ],
  };
};

export default HeaderPortfolio;
