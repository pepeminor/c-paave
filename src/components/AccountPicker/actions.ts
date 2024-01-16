import { IAccount } from 'interfaces/common';
import { generateAction } from 'utils';
import { SELECTED_ACCOUNT } from './reducers';

export const setSelectedAccount = generateAction<IAccount>(SELECTED_ACCOUNT);
