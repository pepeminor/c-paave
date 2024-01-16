import { put, select, takeEvery } from 'redux-saga/effects';
import { Action } from '@reduxjs/toolkit';
import { setCurrentSymbol } from '../SymbolData.action';
import { IState } from 'reduxs/global-reducers';
import { SymbolDataAction } from '../SymbolData.reducer';
import { changeSubAccountDependOnCurrentSymbol } from 'reduxs/global-reducers/AccountList';
import { IAccount, IAccountList } from 'interfaces/common';
import { SymbolType } from 'constants/enum';
import { RESET, SUCCESS } from '../../action-type-utils';
import { RESET_SYMBOL_TRADE_INFO } from '../../actions';
import { MarketSymbol } from '../SymbolData.type';
import { isArray, isNotNil } from 'ramda-adjunct';

function findSymbolValid(
  symbol: string[],
  symbolMap: {
    [s: string]: MarketSymbol;
  }
) {
  for (const element of symbol) {
    const symbolValid = symbolMap[element];
    if (isNotNil(symbolValid)) return symbolValid.symbolCode;
  }

  return symbol[0];
}

function* handleSetCurrentSymbol(action: Action) {
  if (!setCurrentSymbol.match(action)) return;
  try {
    const oldSymbol: string = yield select((state: IState) => state.SymbolData.currentSymbolCode);
    const symbolMap: {
      [s: string]: MarketSymbol;
    } = yield select((state: IState) => state.SymbolData.marketData.symbolMap);

    const newSymbol = isArray(action.payload.symbol)
      ? findSymbolValid(action.payload.symbol, symbolMap)
      : action.payload.symbol;

    const isHaveDerivatives: boolean = yield select((state: IState) =>
      state.accountList?.KIS?.subAccounts?.find(item => item.accountSubs[0].type === 'DERIVATIVES')
    );

    const isFutureCode = symbolMap[newSymbol]?.symbolType === SymbolType.FUTURES;

    if (isFutureCode && !isHaveDerivatives) return;

    yield put({
      type: SUCCESS(setCurrentSymbol.type),
      payload: newSymbol,
    });

    yield put({
      type: RESET(RESET_SYMBOL_TRADE_INFO),
    });

    const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
    if (action.meta?.updateSubAccount) {
      const accountList: IAccountList = yield select((state: IState) => state.accountList);
      const symbolType = symbolMap[newSymbol]?.symbolType as SymbolType;
      yield symbolType &&
        changeSubAccountDependOnCurrentSymbol(
          symbolType,
          selectedAccount.type,
          accountList,
          selectedAccount.selectedSubAccount
        );
    }

    yield put(SymbolDataAction.unsubscribeSymbols({ symbols: [oldSymbol], channelType: ['QUOTE', 'BID_OFFER'] }));
  } catch (error) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('SetCurrentSymbolError', error);
  }
}

export default function* watchSetCurrentSymbol() {
  yield takeEvery(setCurrentSymbol.type, handleSetCurrentSymbol);
}
