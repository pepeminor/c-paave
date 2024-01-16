import { PriceBoardType } from 'screens/PriceBoardFullScreen';
import { scaleSize } from 'styles';

export interface IProps {
  priceBoardType?: PriceBoardType;
}

export type SortType = 'ASC' | 'DESC' | undefined;
export type PriceChangeType = 'Percent' | 'Value';
export type TotalType = 'Volume' | 'Value';

export const ItemHeight = scaleSize(36);
