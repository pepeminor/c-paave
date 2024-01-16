import { ISpecialPriceType } from 'constants/enum';
import { TRIGGER_FILL_PRICE } from 'reduxs/actions';

export type ITriggerFillPriceObject = {
  value: number | ISpecialPriceType.ATO | ISpecialPriceType.ATC;
  change: boolean;
};

export const triggerFillPrice = (payload: ITriggerFillPriceObject) => ({
  type: TRIGGER_FILL_PRICE,
  payload,
});
