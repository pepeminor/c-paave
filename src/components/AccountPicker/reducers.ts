import { Global } from 'constants/main';
import { IAccount, IAction } from 'interfaces/common';

export const SELECTED_ACCOUNT = 'SELECTED_ACCOUNT';

export function SelectedAccount(state: IAccount = Global.paaveDefaultAccount, action: IAction<IAccount>): IAccount {
  switch (action.type) {
    case SELECTED_ACCOUNT:
      return action.payload;
    default:
      return state;
  }
}
