import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { IResponse, ToolkitAction } from 'interfaces/common';
import { query, deepMapFields } from 'utils';
import APIList from 'config/api';
import { SubscribePayload, SymbolLatest } from '../SymbolData.type';
import { MapSymbolFieldSchema, symbolLatestSchema } from '../SymbolData.schema';
import { PayloadAction } from '@reduxjs/toolkit';
import { getSymbolLatest, getSymbolLatestTakeLatest } from '../SymbolData.action';
import { SymbolDataAction } from '../SymbolData.reducer';

function* doGetSymbolLatest(symbolCodes: string[]) {
  symbolCodes = symbolCodes.filter(code => code);
  if (!symbolCodes.length) return;
  try {
    const response: IResponse<unknown> = yield call(query, APIList.symbolLatest, {
      symbolList: symbolCodes,
    });
    if (!response || !Array.isArray(response.data)) return;
    const symbols = [] as SymbolLatest[];
    response.data.forEach(unformattedItem => {
      const item = deepMapFields(unformattedItem, MapSymbolFieldSchema.SymbolLatest);
      const isSymbolLatest = symbolLatestSchema.safeParse(item);
      if (isSymbolLatest.success) {
        symbols.push(item);
      } else {
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.log('GetLatestSymbolError', item, JSON.stringify(isSymbolLatest.error.errors));
        }
      }
    });
    yield put({
      type: getSymbolLatest.fulfilled,
      payload: symbols,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('GetLatestSymbolError', error);
  }
}

function* handleSubscribeSideEffect(action: PayloadAction<SubscribePayload>) {
  const { symbols } = action.payload;
  yield put(
    getSymbolLatest({
      payload: symbols,
    })
  );
}

function* handleGetSymbolLatest(action: ToolkitAction<string[]>) {
  const { payload: symbols } = action;
  yield doGetSymbolLatest(symbols);
  yield action.meta.callBack?.handleSuccess?.();
}

export default function* watchGetSymbolLatest() {
  yield takeEvery(getSymbolLatest.type, handleGetSymbolLatest);
  yield takeLatest(getSymbolLatestTakeLatest.type, handleGetSymbolLatest);
  yield takeEvery(SymbolDataAction.subscribeSymbols.type, handleSubscribeSideEffect);
}
