import { generateAction } from 'utils';
import { FINANCE_ENTER_SCREEN } from 'reduxs/actions';

export const onEnterFinance = generateAction<string>(FINANCE_ENTER_SCREEN);
