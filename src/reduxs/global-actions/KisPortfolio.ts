import { generateAction } from 'utils';
import { KIS_GET_PROFIT_LOSS } from 'reduxs/actions';
import { IKisProfitLossParams } from '../../interfaces/equity';

export const getKisPortfolio = generateAction<IKisProfitLossParams>(KIS_GET_PROFIT_LOSS);
