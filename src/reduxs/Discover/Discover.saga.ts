import { takeLeading } from 'redux-saga/effects';
import { DiscoverActions } from './Discover.redux';
import watchRefreshDiscoverScreen from './sagas/OnRefreshScreen.saga';

export function* DiscoverSagas() {
  yield takeLeading(DiscoverActions.refreshDiscoverScreen.type, watchRefreshDiscoverScreen);
}
