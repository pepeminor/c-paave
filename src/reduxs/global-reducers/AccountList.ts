import { setSelectedAccount } from 'components/AccountPicker/actions';
import { SymbolType } from 'constants/enum';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
import { IAccount, IAccountList, IAction, ISubAccount } from 'interfaces/common';
import { put } from 'redux-saga/effects';

export const GLOBAL_ACCOUNT_LIST = 'GLOBAL_ACCOUNT_LIST';
export const RESET_GLOBAL_ACCOUNT_LIST = 'RESET_GLOBAL_ACCOUNT_LIST';

export function getDerivativesKisAccount(accountList: IAccountList): IAccount | undefined {
  if (accountList[ACCOUNT_TYPE.KIS] != null && accountList[ACCOUNT_TYPE.KIS].subAccounts != null) {
    const subAccountDerivatives = accountList[ACCOUNT_TYPE.KIS].subAccounts.find(item =>
      item.accountSubs[0] != null ? item.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES : undefined
    );
    return {
      type: ACCOUNT_TYPE.KIS,
      username: accountList[ACCOUNT_TYPE.KIS].username,
      subAccounts: accountList[ACCOUNT_TYPE.KIS].subAccounts,
      selectedSubAccount: subAccountDerivatives,
      oldType: ACCOUNT_TYPE.KIS,
    };
  }
  return undefined;
}

export function getEquityKisAccount(accountList: IAccountList): IAccount | undefined {
  if (accountList[ACCOUNT_TYPE.KIS] != null && accountList[ACCOUNT_TYPE.KIS].subAccounts != null) {
    const subAccountEquity = accountList[ACCOUNT_TYPE.KIS].subAccounts.find(item =>
      item.accountSubs[0] != null ? item.accountSubs[0].type === SYSTEM_TYPE.EQUITY : undefined
    );
    return {
      type: ACCOUNT_TYPE.KIS,
      username: accountList[ACCOUNT_TYPE.KIS].username,
      subAccounts: accountList[ACCOUNT_TYPE.KIS].subAccounts,
      selectedSubAccount: subAccountEquity,
      oldType: ACCOUNT_TYPE.KIS,
    };
  }
  return undefined;
}

export function* changeSubAccountDependOnCurrentSymbol(
  currentSymbolType: SymbolType,
  selectedAccountType: ACCOUNT_TYPE,
  accountList: IAccountList,
  selectedSubAccount: ISubAccount | undefined
) {
  if (
    selectedAccountType === ACCOUNT_TYPE.KIS &&
    selectedSubAccount != null &&
    selectedSubAccount.accountSubs[0] != null
  ) {
    if (
      currentSymbolType === SymbolType.FUTURES &&
      selectedSubAccount.accountSubs[0].type !== SYSTEM_TYPE.DERIVATIVES &&
      getDerivativesKisAccount(accountList) != null
    ) {
      yield put(
        setSelectedAccount(getDerivativesKisAccount(accountList) as IAccount, undefined, undefined, undefined, {
          notSetCurrentSymbol: true,
        })
      );
    } else if (
      currentSymbolType !== SymbolType.FUTURES &&
      selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES &&
      getEquityKisAccount(accountList) != null
    ) {
      yield put(
        setSelectedAccount(getEquityKisAccount(accountList) as IAccount, undefined, undefined, undefined, {
          notSetCurrentSymbol: true,
        })
      );
    }
  }
}

export function AccountList(
  state: IAccountList = {
    [ACCOUNT_TYPE.VIRTUAL]: { type: ACCOUNT_TYPE.VIRTUAL, username: 'Virtual Account' },
  },
  action: IAction<IAccountList>
) {
  switch (action.type) {
    case GLOBAL_ACCOUNT_LIST:
      return { ...state, ...action.payload };
    case RESET_GLOBAL_ACCOUNT_LIST:
      return { [ACCOUNT_TYPE.VIRTUAL]: { type: ACCOUNT_TYPE.VIRTUAL, username: 'Virtual Account' } };
    default:
      return state;
  }
}
