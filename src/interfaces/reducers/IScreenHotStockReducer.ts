import { IBoughtStockRanks, ISoldStockRanks } from 'interfaces/equity';
import { ILoadingReducer } from 'interfaces/reducer';
import { IMostSearchStocks } from 'interfaces/search';
import { HotStockOrderType } from './HotStockOrderType';
import { HotStockPeriodType } from './HotStockPeriodType';
import { HotStockSource } from './HotStockSource';
import { HotStockType } from './HotStockType';
import { ILoadingSymbolDataExtend } from './ILoadingSymbolDataExtend';

export interface IScreenHotStockReducer {
  hotStockType: HotStockType;
  hotStockPeriodType: HotStockPeriodType;
  hotStockOrderType: HotStockOrderType;
  hotStockSource: HotStockSource;
  hotStockPageNumber: number | null;
  hotStockPageSize: number | null;
  symbolData: ILoadingReducer<ILoadingSymbolDataExtend<IBoughtStockRanks | ISoldStockRanks | IMostSearchStocks>[]>; // status = true when hot stock load finish only
}
