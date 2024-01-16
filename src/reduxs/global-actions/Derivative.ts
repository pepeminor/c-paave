import { IDerivativesPurchasingPowerRequest } from 'interfaces/common';
import { PORTFOLIO_DERIVATIVE } from 'reduxs/actions';
import { generateAction } from 'utils/common';

export const getDerivativePortfolio = generateAction<IDerivativesPurchasingPowerRequest>(PORTFOLIO_DERIVATIVE);
