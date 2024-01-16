import { generateAction } from 'utils';
import { PROFILE_GET_TRADING_HISTORY } from 'reduxs/actions';
import { ITradingHistoryParams } from 'interfaces/profile';
import { RESET } from 'reduxs/action-type-utils';

export const getTradingHistory = generateAction<ITradingHistoryParams>(PROFILE_GET_TRADING_HISTORY);

export const resetTradingHistory = generateAction(RESET(PROFILE_GET_TRADING_HISTORY));
