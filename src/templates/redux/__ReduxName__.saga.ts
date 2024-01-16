import { takeLeading } from 'redux-saga/effects';
import { watch__ReduxName__Saga } from './sagas/__ReduxName__.saga';
import { __ReduxName__Actions } from './__ReduxName__.redux';

export function* WatchListSagas() {
  yield takeLeading(__ReduxName__Actions.__ReduxName__Request.type, watch__ReduxName__Saga);
  yield takeLeading(__ReduxName__Actions.__reduxName__Action.type, watch__ReduxName__Saga);
}
