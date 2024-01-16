import { ISpecialPriceType, InputAccessoryViewID } from 'constants/enum';
import { ACCOUNT_TYPE, MARKET, ORDER_TYPE, SYSTEM_TYPE } from 'global';
import { ITempListPriceType } from './TradeForm.type';

export const getTempListPrice = (
  orderType: ORDER_TYPE,
  marketType: keyof typeof MARKET,
  accountType?: ACCOUNT_TYPE,
  systemType?: SYSTEM_TYPE,
  accessoriesViewId?: InputAccessoryViewID
): // price: number
ITempListPriceType[] => {
  // if (price === 0) {
  if (orderType === ORDER_TYPE.NORMAL_ORDER) {
    if (marketType === MARKET.HOSE) {
      return [
        {
          label: 'ATO',
          value: ISpecialPriceType.ATO,
        },
        {
          label: 'ATC',
          value: ISpecialPriceType.ATC,
        },
        {
          label: 'MP',
          value: ISpecialPriceType.MP,
        },
      ];
    } else if (marketType === MARKET.HNX) {
      if (accountType === ACCOUNT_TYPE.KIS) {
        if (systemType === SYSTEM_TYPE.EQUITY) {
          return [
            {
              label: 'MTL',
              value: ISpecialPriceType.MTL,
            },
            {
              label: 'MOK',
              value: ISpecialPriceType.MOK,
            },
            {
              label: 'MAK',
              value: ISpecialPriceType.MAK,
            },
            {
              label: 'ATC',
              value: ISpecialPriceType.ATC,
            },
            {
              label: 'PLO',
              value: ISpecialPriceType.PLO,
            },
          ];
        } else
          return [
            {
              label: 'ATO',
              value: ISpecialPriceType.ATO,
            },
            {
              label: 'MOK',
              value: ISpecialPriceType.MOK,
            },
            {
              label: 'MAK',
              value: ISpecialPriceType.MAK,
            },
            {
              label: 'MTL',
              value: ISpecialPriceType.MTL,
            },
            {
              label: 'ATC',
              value: ISpecialPriceType.ATC,
            },
          ];
      } else {
        return [
          {
            label: 'MTL',
            value: ISpecialPriceType.MTL,
          },
          {
            label: 'ATC',
            value: ISpecialPriceType.ATC,
          },
        ];
      }
    } else {
      return [];
    }
  } else if (orderType === ORDER_TYPE.STOP_LIMIT_ORDER) {
    if (accessoriesViewId === InputAccessoryViewID.LIMIT_PRICE) {
      if (marketType === MARKET.HOSE) {
        return [
          {
            label: 'MP',
            value: ISpecialPriceType.MP,
          },
        ];
      } else if (marketType === MARKET.HNX) {
        return [
          {
            label: 'MTL',
            value: ISpecialPriceType.MTL,
          },
        ];
      } else {
        return [];
      }
    } else {
      return [];
    }
  } else {
    return [];
  }
};
