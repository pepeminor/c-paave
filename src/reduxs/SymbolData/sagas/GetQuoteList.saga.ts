import { call, put, takeLatest } from 'redux-saga/effects';
import { IResponse, ToolkitAction } from 'interfaces/common';
import { query, deepMapFields } from 'utils';
import APIList from 'config/api';
import { QuoteData } from '../SymbolData.type';
import { MapSymbolFieldSchema } from '../SymbolData.schema';
import { ISymbolQuoteListParams } from 'interfaces/market';
import { getQuoteList } from '../SymbolData.action';
import { quoteListItemSchema } from '../schemas/SymbolQuoteList.zod';

function* doGetQuoteList(action: ToolkitAction<ISymbolQuoteListParams>) {
  try {
    const response: IResponse<unknown> = yield call(query, APIList.symbolQuoteList, action.payload);
    if (!response || !Array.isArray(response.data)) return;
    const quotes = [] as QuoteData[];
    response.data.forEach(unformattedItem => {
      const item = deepMapFields(unformattedItem, MapSymbolFieldSchema.SymbolQuoteList);
      const isSymbolQuote = quoteListItemSchema.safeParse(item);
      if (isSymbolQuote.success) {
        quotes.push(item);
      } else {
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.log('GetQuoteList', item, isSymbolQuote.error.errors);
        }
      }
    });
    yield put({
      type: getQuoteList.fulfilled,
      payload: quotes,
    });
    action.meta.callBack?.handleSuccess?.(quotes);
  } catch (error) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('GetQuoteListError', error);
    yield put({
      type: getQuoteList.rejected,
    });
    action.meta.callBack?.handleFail?.(error);
  }
}

export default function* watchGetQuoteList() {
  yield takeLatest(getQuoteList.type, doGetQuoteList);
}
