import { put, select, takeLatest } from 'redux-saga/effects';
import { refreshSubscribedSymbols } from '../SymbolData.action';
import { DiscoverActions } from 'reduxs/Discover';
import { SymbolDataAction } from '../SymbolData.reducer';
import { IState } from 'reduxs/global-reducers';
import { BidOfferData, QuoteData, SubscribePayload } from '../SymbolData.type';

function* doRefreshSubscribedSymbols() {
  const {
    quoteChannel,
    bidOfferChannel,
  }: {
    quoteChannel: {
      subscribeSymbols: string[];
      symbolMap: { [s: string]: QuoteData | undefined };
    };
    bidOfferChannel: {
      subscribeSymbols: string[];
      symbolMap: { [s: string]: BidOfferData | undefined };
    };
  } = yield select((state: IState) => state.SymbolData);

  if (quoteChannel.subscribeSymbols.length) {
    const handleParams: SubscribePayload = {
      symbols: quoteChannel.subscribeSymbols,
      channelType: ['QUOTE'],
    };
    yield put(SymbolDataAction.unsubscribeSymbols(handleParams));
    yield put(SymbolDataAction.subscribeSymbols(handleParams));
  }

  if (bidOfferChannel.subscribeSymbols.length) {
    const handleParams: SubscribePayload = {
      symbols: bidOfferChannel.subscribeSymbols,
      channelType: ['BID_OFFER'],
    };
    yield put(SymbolDataAction.unsubscribeSymbols(handleParams));
    yield put(SymbolDataAction.subscribeSymbols(handleParams));
  }

  yield put(DiscoverActions.refreshDiscoverScreenFinish({ refreshMarketFinish: true, refreshIndicesFinish: true }));
}

export default function* watchRefreshSubscribedSymbols() {
  yield takeLatest(refreshSubscribedSymbols.type, doRefreshSubscribedSymbols);
}
