import { generateAction } from 'utils';
import { FINANCE_GET_FINANCIAL_RATIO, FINANCE_GET_FINANCIAL_STATEMENT, OVERVIEW_FOREIGN_TRADE } from '../actions';
import { IFinanceStatementParams, IFinancialRatioParams, IForeignTradeParams } from '../../interfaces/finance';
import { RESET } from 'reduxs/action-type-utils';

export const queryFinancialRatioData = generateAction<IFinancialRatioParams>(FINANCE_GET_FINANCIAL_RATIO);

export const resetFinancialRatioData = generateAction<IFinancialRatioParams>(RESET(FINANCE_GET_FINANCIAL_RATIO));

export const queryForeignTrade = generateAction<IForeignTradeParams>(OVERVIEW_FOREIGN_TRADE);

export const queryFinanceStatement = generateAction<IFinanceStatementParams>(FINANCE_GET_FINANCIAL_STATEMENT);
