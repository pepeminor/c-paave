import { put, select, takeLatest } from 'redux-saga/effects';
import { getLatestOnAppActive, getSymbolLatest } from '../SymbolData.action';
import { IState } from 'reduxs/global-reducers';

function* doGetLatestOnAppActive() {
  try {
    const currentSubscribeQuoteSymbols: string[] = yield select(
      (state: IState) => state.SymbolData.quoteChannel.subscribeSymbols
    );
    const currentSubscribeBidOfferSymbols: string[] = yield select(
      (state: IState) => state.SymbolData.bidOfferChannel.subscribeSymbols
    );
    const allSubscribeSymbols = [...currentSubscribeQuoteSymbols, ...currentSubscribeBidOfferSymbols];

    yield put(
      getSymbolLatest({
        payload: allSubscribeSymbols,
      })
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('GetLatestOnAppActiveError', error);
  }
}

export default function* watchGetLatestOnAppActive() {
  yield takeLatest(getLatestOnAppActive.type, doGetLatestOnAppActive);
}
