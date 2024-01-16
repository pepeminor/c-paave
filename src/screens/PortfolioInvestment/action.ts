import { IAccount } from 'interfaces/common';
import { PORTFOLIO_INVESTMENT_REFRESH_SCREEN } from 'reduxs/actions';
import { generateAction } from 'utils';

export const onRefreshPortfolioInvestmentScreen = generateAction<IAccount>(PORTFOLIO_INVESTMENT_REFRESH_SCREEN);
