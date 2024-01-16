import { IOnEnterPortfolioScreen } from 'interfaces/portfolio';
import { PORTFOLIO_ENTER_SCREEN } from 'reduxs/actions';
import { generateAction } from 'utils';

export const onEnterPortfolioScreen = generateAction<IOnEnterPortfolioScreen>(PORTFOLIO_ENTER_SCREEN);
