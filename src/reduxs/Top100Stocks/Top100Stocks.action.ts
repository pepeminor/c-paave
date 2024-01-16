import { generateToolkitAction } from 'utils';
import { FinancialRatioRankingParams } from './Top100Stocks.type';

export const getTop100Stocks = generateToolkitAction<FinancialRatioRankingParams>('Top100Stocks/getTop100Stocks');
