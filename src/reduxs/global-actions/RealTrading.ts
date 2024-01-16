import { IRealTradingDerOrderParams, IRealTradingEqtOrderParams } from 'interfaces/RealTrading';
import {
  REAL_TRADING_POST_DER_ORDER,
  REAL_TRADING_POST_EQT_ORDER,
  REAL_TRADING_POST_EQT_ORDER_ODD_LOT,
} from 'reduxs/actions';
import { generateAction } from 'utils';

export const realTradingPostEqtOrder = generateAction<IRealTradingEqtOrderParams>(REAL_TRADING_POST_EQT_ORDER);

export const realTradingPostEqtOrderOddLot = generateAction<IRealTradingEqtOrderParams>(
  REAL_TRADING_POST_EQT_ORDER_ODD_LOT
);

export const realTradingPostDerOrder = generateAction<IRealTradingDerOrderParams>(REAL_TRADING_POST_DER_ORDER);
