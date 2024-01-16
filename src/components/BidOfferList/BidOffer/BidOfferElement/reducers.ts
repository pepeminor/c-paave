import { IAction } from 'interfaces/common';
import { TRIGGER_FILL_PRICE } from 'reduxs/actions';
import { ITriggerFillPriceObject } from './actions';

export function FillPriceTriggered(
  state: ITriggerFillPriceObject = { value: 0, change: false },
  action: IAction<ITriggerFillPriceObject>
) {
  switch (action.type) {
    case TRIGGER_FILL_PRICE:
      return action.payload;
    default:
      return state;
  }
}
