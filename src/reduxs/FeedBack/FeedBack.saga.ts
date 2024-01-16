import { takeLeading } from 'redux-saga/effects';
import { watchFeedBackSaga } from './sagas/FeedBack.saga';
import { FeedBackActions } from './FeedBack.redux';

export function* FeedbackSagas() {
  yield takeLeading(FeedBackActions.feedBackRequest.type, watchFeedBackSaga);
}
