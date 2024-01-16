import { IDerivativesPurchasingPowerRequest, IMaxBuySellRequest } from 'interfaces/common';
import {
  OPEN_EXECUTE_MODAL,
  CLOSE_EXECUTE_MODAL,
  QUERY_MAX_BUY_SELL,
  QUERY_DERIVATIVES_PURCHASING_POWER,
} from 'reduxs/actions';
import { generateAction } from 'utils';
import {
  QUERY_DERIVATIVES_PURCHASING_POWER_FAILED,
  QUERY_DERIVATIVES_PURCHASING_POWER_SUCCESS,
  QUERY_MAX_BUY_SELL_FAILED,
  QUERY_MAX_BUY_SELL_SUCCESS,
} from './reducer';

export const onOpenExecuteModal = generateAction(OPEN_EXECUTE_MODAL);

export const onCloseExecuteModal = generateAction(CLOSE_EXECUTE_MODAL);

export const queryMaxBuySellAction = (payload: IMaxBuySellRequest) => ({
  type: QUERY_MAX_BUY_SELL,
  response: {
    success: QUERY_MAX_BUY_SELL_SUCCESS,
    fail: QUERY_MAX_BUY_SELL_FAILED,
  },
  payload,
});

export const queryDerivativesPurchasingPower = (payload: IDerivativesPurchasingPowerRequest) => ({
  type: QUERY_DERIVATIVES_PURCHASING_POWER,
  response: {
    success: QUERY_DERIVATIVES_PURCHASING_POWER_SUCCESS,
    fail: QUERY_DERIVATIVES_PURCHASING_POWER_FAILED,
  },
  payload,
});
