import { takeLeading } from 'redux-saga/effects';
import { getCopyTradeSubscription } from './sagas/GetCopyTrade.saga';
import { CopyTradeAction } from './CopyTrade.redux';
import { EditCopyTradeSubscription } from './sagas/EditCopyTrade.saga';
import { SubscribeCopyTrade } from './sagas/Subscribe.saga';
import { UnsubscribeCopyTrade } from './sagas/Unsubscribe.saga';

export default function* CopyTradeSagas() {
  yield takeLeading(CopyTradeAction.getCopyTradeSubscription.type, getCopyTradeSubscription);
  yield takeLeading(CopyTradeAction.editCopyTradeSubscription.type, EditCopyTradeSubscription);
  yield takeLeading(CopyTradeAction.subscribeCopyTrade.type, SubscribeCopyTrade);
  yield takeLeading(CopyTradeAction.unSubscribeCopyTrade.type, UnsubscribeCopyTrade);
}
