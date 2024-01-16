import React from 'react';
import TouchCell, { SortType } from '../TouchCell';
import { clone } from 'ramda';
import { comparePL } from '../../helper';
import { IProfitLossItems } from 'interfaces/equity';

interface IProps {
  isPLRate: boolean;
  changePLMode: () => void;
  originDataProfitLoss: IProfitLossItems[];
  originalListStockCodes: string[];
  setDataStocks: (value: string[]) => void;
  isKis?: boolean;
  setActiveTitleHeader?: (value: string) => void;
  activeTitle?: string;
}

export enum TitleHeader {
  SYMBOL = 'Symbol',
  PLVALUE = 'P/L Value',
  PLPERCENT = 'P/L %',
  CURVALUE = 'Cur Value',
}

const HeaderUserWall = ({ originDataProfitLoss, setDataStocks, setActiveTitleHeader, activeTitle }: IProps) => {
  const filterSymbol = (sortType: SortType) => {
    setActiveTitleHeader?.(TitleHeader.SYMBOL);
    const stocks = clone(originDataProfitLoss);
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
        setDataStocks(stocks.map(item => item.stockCode));
        break;
    }
  };

  const filterPLValue = (sortType: SortType) => {
    const stocks = clone(originDataProfitLoss);
    setActiveTitleHeader?.(TitleHeader.PLVALUE);
    switch (sortType) {
      case SortType.ASC:
        const dataASC = stocks.sort((a, b) => comparePL(a, b, false)).map(item => item.stockCode);

        setDataStocks(dataASC);
        break;
      case SortType.DESC:
        const dataDESC = stocks.sort((a, b) => comparePL(b, a, false)).map(item => item.stockCode);

        setDataStocks(dataDESC);
        break;
      default:
        setDataStocks(stocks.map(item => item.stockCode));
        break;
    }
  };

  const filterPL = (sortType: SortType) => {
    const stocks = clone(originDataProfitLoss);
    setActiveTitleHeader?.(TitleHeader.PLPERCENT);
    switch (sortType) {
      case SortType.ASC:
        const dataASC = stocks.sort((a, b) => comparePL(a, b, true)).map(item => item.stockCode);

        setDataStocks(dataASC);
        break;
      case SortType.DESC:
        const dataDESC = stocks.sort((a, b) => comparePL(b, a, true)).map(item => item.stockCode);

        setDataStocks(dataDESC);
        break;
      default:
        setDataStocks(stocks.map(item => item.stockCode));
        break;
    }
  };

  return {
    height: 60,
    data: [
      {
        width: 110,
        content: (
          <TouchCell title="Symbol" onPress={filterSymbol} isActiveFilter={activeTitle === TitleHeader.SYMBOL} />
        ),
      },
      [
        { content: 'Weight', width: 80 },
        { content: 'Days Held', width: 80 },
      ],
      [
        { content: 'Cur Price', width: 80 },
        { content: 'Avg Price', width: 80 },
      ],
      [
        {
          width: 108,
          content: (
            <TouchCell title="P/L Value" onPress={filterPLValue} isActiveFilter={activeTitle === TitleHeader.PLVALUE} />
          ),
        },
        {
          width: 108,
          content: (
            <TouchCell title="P/L %" onPress={filterPL} isActiveFilter={activeTitle === TitleHeader.PLPERCENT} />
          ),
        },
      ],
    ],
  };
};

export default HeaderUserWall;
