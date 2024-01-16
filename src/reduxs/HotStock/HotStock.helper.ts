import APIList from 'config/api';
import { query, deepMapFields } from 'utils';
import { HotStockMapSchema } from './HotStock.schema';
import { HotStockItem, HotStockOrderType, HotStockPeriodType, HotStockSource, HotStockType } from './HotStock.type';
import { hotStockItemSchema } from './HotStock.zod';

export const HotStockHelper = {
  queryHotStock: async (params: {
    type: HotStockType;
    period: HotStockPeriodType;
    order: HotStockOrderType;
    source: HotStockSource;
    pageNumber: number;
    pageSize: number;
  }) => {
    const { type, period, order, source, pageNumber, pageSize } = params;
    const queryParams = QueryHotStockHelper.prepareQueryParams(source, period, order, pageNumber, pageSize);
    const queryApi = QueryHotStockHelper.prepareQueryApi(source, type);
    const response = await query(queryApi, queryParams).then(response => response.data);
    const mappedData = deepMapFields(response, HotStockMapSchema);
    if (!mappedData || !mappedData.stockList || !Array.isArray(mappedData.stockList)) {
      return [];
    }
    mappedData.stockList = mappedData.stockList.filter((item: unknown) => {
      const isHotStockItem = hotStockItemSchema.safeParse(item);
      if (!isHotStockItem.success && __DEV__) {
        // eslint-disable-next-line no-console
        console.log('HotStockItemSchema', isHotStockItem.error.errors);
      }
      return isHotStockItem.success;
    });
    return mappedData.stockList as HotStockItem[];
  },
};

const QueryHotStockHelper = {
  prepareQueryParams: (
    source: HotStockSource,
    period: HotStockPeriodType,
    order: HotStockOrderType,
    pageNumber: number,
    pageSize: number
  ) => {
    if (source === 'KIS') {
      return {
        period,
        partnerId: 'kis',
        rankingType: order,
        pageNumber,
        pageSize,
      };
    }

    return {
      period,
      order,
      pageNumber,
      pageSize,
    };
  },
  prepareQueryApi: (source: HotStockSource, type: HotStockType) => {
    if (source === 'KIS') {
      return {
        MostBought: APIList.getMostBoughtStockForKis,
        MostSold: APIList.getMostSoldStockForKis,
        MostSearched: APIList.getMostSearchedStockForKis,
      }[type];
    }

    return {
      MostBought: APIList.getMostBoughtStock,
      MostSold: APIList.getMostSoldStock,
      MostSearched: APIList.getMostSearchedStock,
    }[type];
  },
};
