import { PriceChangeType, SortType, TotalType } from 'screens/Discover/PriceBoard/PriceBoard.type';
import { MarketCategoriesLiteral, PriceBoardType } from 'screens/PriceBoardFullScreen';

export type PriceBoardState = {
  priceBoardType: PriceBoardType;
  selectedList: MarketCategoriesLiteral;
  priceChangeType: PriceChangeType;
  totalType: TotalType;
  filterSymbol: SortType;
  filterPrice: SortType;
  filterChange: SortType;
  filterVolume: SortType;
};
